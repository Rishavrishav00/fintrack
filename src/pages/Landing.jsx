import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb, ShieldCheck,
  TrendingUp, Bell, ChevronRight, BarChart2, Sparkles
} from 'lucide-react'

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ value, label, prefix = '', suffix = '', delay = 0 }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const count = useCountUp(value, 1500, visible)
  return (
    <div ref={ref} className="ft-stat" style={{ animationDelay: `${delay}ms` }}>
      <div className="ft-stat-value">{prefix}{count.toLocaleString()}{suffix}</div>
      <div className="ft-stat-label">{label}</div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc, accent, delay }) {
  return (
    <div className="ft-feature-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="ft-feature-icon" style={{ background: accent + '18', color: accent }}>
        <Icon size={20} />
      </div>
      <h3 className="ft-feature-title">{title}</h3>
      <p className="ft-feature-desc">{desc}</p>
    </div>
  )
}

function MockDashboard() {
  return (
    <div className="ft-mock">
      <div className="ft-mock-bar">
        <div className="ft-mock-dot" style={{ background: '#ef4444' }} />
        <div className="ft-mock-dot" style={{ background: '#f59e0b' }} />
        <div className="ft-mock-dot" style={{ background: '#10b981' }} />
        <span className="ft-mock-title">Fintrack Dashboard</span>
      </div>
      <div className="ft-mock-body">
        <div className="ft-mock-cards">
          {[
            { label: 'Balance', value: '₹3,24,500', color: '#10b981' },
            { label: 'Income', value: '₹85,000', color: '#10b981' },
            { label: 'Expenses', value: '₹14,838', color: '#f43f5e' },
            { label: 'Savings', value: '83%', color: '#38bdf8' },
          ].map(c => (
            <div key={c.label} className="ft-mock-card">
              <div className="ft-mock-card-label">{c.label}</div>
              <div className="ft-mock-card-value" style={{ color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div className="ft-mock-chart">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="ft-mock-bar-wrap">
              <div className="ft-mock-bar-fill" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
            </div>
          ))}
        </div>
        <div className="ft-mock-rows">
          {[
            { name: 'Monthly Salary', cat: 'Salary', amt: '+₹85,000', color: '#10b981' },
            { name: 'Amazon Shopping', cat: 'Shopping', amt: '-₹3,200', color: '#f43f5e' },
            { name: 'Electricity Bill', cat: 'Utilities', amt: '-₹1,800', color: '#f43f5e' },
          ].map(r => (
            <div key={r.name} className="ft-mock-row">
              <div className="ft-mock-row-dot" />
              <span className="ft-mock-row-name">{r.name}</span>
              <span className="ft-mock-row-cat">{r.cat}</span>
              <span className="ft-mock-row-amt" style={{ color: r.color }}>{r.amt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const features = [
    { icon: LayoutDashboard, title: 'Live Dashboard',       desc: 'Summary cards, balance trends, and spending breakdowns — all updating in real time as you log transactions.',           accent: '#10b981', delay: 0   },
    { icon: ArrowLeftRight,  title: 'Smart Transactions',   desc: 'Full transaction history with powerful search, multi-column sorting, and category filters to find anything instantly.', accent: '#38bdf8', delay: 100 },
    { icon: Lightbulb,       title: 'AI-Powered Insights',  desc: 'Groq Llama 3.1 analyzes your spending patterns and delivers actionable financial advice in plain language.',             accent: '#a78bfa', delay: 200 },
    { icon: Bell,            title: 'Budget Alerts',        desc: 'Set a monthly spending limit. The dashboard turns red the moment you exceed it — you will never overspend blindly again.', accent: '#f43f5e', delay: 300 },
    { icon: ShieldCheck,     title: 'Role-Based Access',    desc: 'Switch between Viewer and Admin roles. Admins can add, edit, and delete transactions. Viewers get a read-only view.',    accent: '#f59e0b', delay: 400 },
    { icon: TrendingUp,      title: 'Monthly Comparisons',  desc: 'Bar charts compare income vs expenses month by month so you can spot trends and make smarter decisions.',               accent: '#10b981', delay: 500 },
  ]

  return (
    <div className="ft-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ft-root {
          min-height: 100vh;
          background: #050a0e;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* Grid background */
        .ft-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* Navbar */
        .ft-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 64px;
          transition: all 0.3s;
        }
        .ft-nav.scrolled {
          background: rgba(5,10,14,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(16,185,129,0.15);
        }
        .ft-nav-brand {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 18px; color: #fff; text-decoration: none;
        }
        .ft-nav-logo {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; color: #fff;
        }
        .ft-nav-links {
          display: flex; align-items: center; gap: 32px;
        }
        .ft-nav-link {
          font-size: 14px; color: #94a3b8; text-decoration: none;
          transition: color 0.2s; cursor: pointer; background: none; border: none;
        }
        .ft-nav-link:hover { color: #e2e8f0; }
        .ft-nav-cta {
          padding: 8px 20px; border-radius: 8px;
          background: #10b981; color: #fff;
          font-size: 14px; font-weight: 500;
          border: none; cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .ft-nav-cta:hover { background: #059669; transform: translateY(-1px); }

        /* Hero */
        .ft-hero {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          padding: 120px 24px 80px;
        }
        .ft-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 100px;
          border: 1px solid rgba(16,185,129,0.3);
          background: rgba(16,185,129,0.08);
          font-size: 12px; color: #10b981; font-weight: 500;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
        }
        .ft-hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981; animation: pulse 2s infinite;
        }
        .ft-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 7vw, 88px);
          font-weight: 800; line-height: 1.0;
          color: #fff; margin: 0 0 24px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .ft-hero-title-accent {
          background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ft-hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: #64748b; line-height: 1.7;
          max-width: 560px; margin: 0 auto 40px;
          font-weight: 300;
          animation: fadeUp 0.6s 0.2s ease both;
        }
        .ft-hero-actions {
          display: flex; align-items: center; gap: 12px;
          justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.6s 0.3s ease both;
          margin-bottom: 80px;
        }
        .ft-btn-primary {
          display: flex; align-items: center; gap-8px; gap: 8px;
          padding: 14px 28px; border-radius: 10px;
          background: #10b981; color: #fff;
          font-size: 15px; font-weight: 500;
          border: none; cursor: pointer;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .ft-btn-primary:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(16,185,129,0.3); }
        .ft-btn-secondary {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 10px;
          background: transparent; color: #94a3b8;
          font-size: 15px; font-weight: 500;
          border: 1px solid rgba(148,163,184,0.2); cursor: pointer;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .ft-btn-secondary:hover { border-color: rgba(148,163,184,0.4); color: #e2e8f0; }

        /* Mock dashboard */
        .ft-mock-wrap {
          animation: fadeUp 0.8s 0.4s ease both;
          width: 100%; max-width: 700px;
          filter: drop-shadow(0 40px 80px rgba(16,185,129,0.12));
        }
        .ft-mock {
          border-radius: 16px;
          border: 1px solid rgba(16,185,129,0.2);
          overflow: hidden;
          background: #0d1117;
        }
        .ft-mock-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 16px;
          background: #111827;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ft-mock-dot { width: 10px; height: 10px; border-radius: 50%; }
        .ft-mock-title {
          font-size: 12px; color: #4b5563;
          margin-left: 8px; font-family: 'DM Sans', sans-serif;
        }
        .ft-mock-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .ft-mock-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .ft-mock-card {
          background: #111827; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 10px 12px;
        }
        .ft-mock-card-label { font-size: 10px; color: #4b5563; margin-bottom: 4px; }
        .ft-mock-card-value { font-size: 13px; font-weight: 600; font-family: 'Syne', sans-serif; }
        .ft-mock-chart {
          display: flex; align-items: flex-end; gap: 6px;
          height: 80px; padding: 8px;
          background: #111827; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .ft-mock-bar-wrap { flex: 1; height: 100%; display: flex; align-items: flex-end; }
        .ft-mock-bar-fill {
          width: 100%; border-radius: 4px 4px 0 0;
          background: linear-gradient(180deg, #10b981 0%, #059669 100%);
          animation: growUp 0.8s ease both;
          opacity: 0.8;
        }
        .ft-mock-rows { display: flex; flex-direction: column; gap: 6px; }
        .ft-mock-row {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; border-radius: 8px;
          background: #111827; border: 1px solid rgba(255,255,255,0.04);
        }
        .ft-mock-row-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #334155; flex-shrink: 0;
        }
        .ft-mock-row-name { font-size: 11px; color: #94a3b8; flex: 1; }
        .ft-mock-row-cat {
          font-size: 10px; color: #4b5563;
          background: #1e293b; padding: 2px 8px; border-radius: 100px;
        }
        .ft-mock-row-amt { font-size: 11px; font-weight: 600; font-family: 'Syne', sans-serif; }

        /* Stats */
        .ft-stats-section {
          position: relative; z-index: 1;
          padding: 80px 24px;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(16,185,129,0.02);
        }
        .ft-stats-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 40px; max-width: 900px; margin: 0 auto; text-align: center;
        }
        .ft-stat { animation: fadeUp 0.6s ease both; }
        .ft-stat-value {
          font-family: 'Syne', sans-serif; font-size: 44px;
          font-weight: 800; color: #10b981; line-height: 1;
          margin-bottom: 8px;
        }
        .ft-stat-label { font-size: 14px; color: #475569; font-weight: 300; }

        /* Features */
        .ft-features-section {
          position: relative; z-index: 1;
          padding: 100px 24px;
          max-width: 1100px; margin: 0 auto;
        }
        .ft-section-label {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 12px; color: #10b981; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ft-section-title {
          font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 44px);
          font-weight: 800; color: #fff; text-align: center;
          margin: 0 0 16px; line-height: 1.1;
        }
        .ft-section-sub {
          text-align: center; font-size: 16px; color: #475569;
          max-width: 500px; margin: 0 auto 64px; font-weight: 300;
        }
        .ft-features-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1px; background: rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .ft-feature-card {
          padding: 32px; background: #050a0e;
          animation: fadeUp 0.6s ease both;
          transition: background 0.2s;
        }
        .ft-feature-card:hover { background: #0d1117; }
        .ft-feature-icon {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .ft-feature-title {
          font-family: 'Syne', sans-serif; font-size: 16px;
          font-weight: 700; color: #e2e8f0; margin: 0 0 10px;
        }
        .ft-feature-desc { font-size: 14px; color: #475569; line-height: 1.7; margin: 0; font-weight: 300; }

        /* Steps */
        .ft-steps-section {
          position: relative; z-index: 1;
          padding: 100px 24px;
          background: rgba(16,185,129,0.015);
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .ft-steps-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 40px; max-width: 900px; margin: 0 auto;
        }
        .ft-step { text-align: center; animation: fadeUp 0.6s ease both; }
        .ft-step-num {
          width: 56px; height: 56px; border-radius: 50%;
          border: 1px solid rgba(16,185,129,0.3);
          background: rgba(16,185,129,0.06);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 20px;
          font-weight: 800; color: #10b981;
          margin: 0 auto 20px;
        }
        .ft-step-title {
          font-family: 'Syne', sans-serif; font-size: 18px;
          font-weight: 700; color: #e2e8f0; margin: 0 0 10px;
        }
        .ft-step-desc { font-size: 14px; color: #475569; line-height: 1.7; font-weight: 300; }

        /* CTA */
        .ft-cta-section {
          position: relative; z-index: 1;
          padding: 100px 24px; text-align: center;
        }
        .ft-cta-box {
          max-width: 640px; margin: 0 auto;
          padding: 64px 40px;
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 24px;
          background: rgba(16,185,129,0.04);
          position: relative; overflow: hidden;
        }
        .ft-cta-glow {
          position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 150px;
          background: radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .ft-cta-title {
          font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 40px);
          font-weight: 800; color: #fff; margin: 0 0 16px; line-height: 1.1;
        }
        .ft-cta-sub { font-size: 16px; color: #475569; margin: 0 0 36px; font-weight: 300; }

        /* Footer */
        .ft-footer {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding: 32px 40px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .ft-footer-brand {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 15px; color: #fff;
        }
        .ft-footer-links { display: flex; gap: 24px; }
        .ft-footer-link { font-size: 13px; color: #475569; text-decoration: none; transition: color 0.2s; }
        .ft-footer-link:hover { color: #94a3b8; }
        .ft-footer-copy { font-size: 13px; color: #334155; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        @keyframes growUp {
          from { height: 0 !important; opacity: 0; }
          to   { opacity: 0.8; }
        }

        @media (max-width: 640px) {
          .ft-nav { padding: 0 20px; }
          .ft-nav-links { display: none; }
          .ft-mock-cards { grid-template-columns: repeat(2, 1fr); }
          .ft-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`ft-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="ft-nav-brand">
          <div className="ft-nav-logo">F</div>
          Fintrack
        </div>
        <div className="ft-nav-links">
          <button className="ft-nav-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
          <button className="ft-nav-link" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>How it works</button>
        </div>
        <button className="ft-nav-cta" onClick={() => navigate('/dashboard')}>
          Open Dashboard
        </button>
      </nav>

      {/* Hero */}
      <section className="ft-hero">
        <div className="ft-hero-badge">
          <div className="ft-hero-badge-dot" />
          AI-Powered Finance Tracking
        </div>
        <h1 className="ft-hero-title">
          Know where your<br />
          <span className="ft-hero-title-accent">money goes.</span>
        </h1>
        <p className="ft-hero-sub">
          Fintrack gives you a real-time view of your finances — track income, expenses, and spending patterns with AI-powered insights.
        </p>
        <div className="ft-hero-actions">
          <button className="ft-btn-primary" onClick={() => navigate('/dashboard')}>
            Open Dashboard <ChevronRight size={16} />
          </button>
          <button className="ft-btn-secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            See features
          </button>
        </div>
        <div className="ft-mock-wrap">
          <MockDashboard />
        </div>
      </section>

      {/* Stats */}
      <section className="ft-stats-section">
        <div className="ft-stats-grid">
          <StatCard value={40}  label="Sample transactions"   suffix="+"  delay={0}   />
          <StatCard value={6}   label="Months of trend data"  suffix=" mo" delay={100} />
          <StatCard value={9}   label="Spending categories"               delay={200} />
          <StatCard value={100} label="Free to use"           suffix="%"  delay={300} />
        </div>
      </section>

      {/* Features */}
      <section className="ft-features-section" id="features">
        <div className="ft-section-label">
          <BarChart2 size={14} /> Everything you need
        </div>
        <h2 className="ft-section-title">Built for clarity, not complexity</h2>
        <p className="ft-section-sub">Every feature is designed to give you clear answers about your financial health.</p>
        <div className="ft-features-grid">
          {features.map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="ft-steps-section" id="how">
        <div className="ft-section-label">
          <Sparkles size={14} /> Simple by design
        </div>
        <h2 className="ft-section-title" style={{ textAlign: 'center', marginBottom: 16 }}>Up and running in seconds</h2>
        <p className="ft-section-sub" style={{ margin: '0 auto 64px' }}>No complex setup. No accounts. Just open and start tracking.</p>
        <div className="ft-steps-grid">
          {[
            { n: '01', title: 'Open the dashboard',  desc: 'Hit "Open Dashboard" and you land directly on a pre-loaded overview with 40 real-looking transactions ready to explore.' },
            { n: '02', title: 'Switch to Admin',      desc: 'Toggle the role switcher in the top navbar from Viewer to Admin to unlock the ability to add, edit, and delete transactions.' },
            { n: '03', title: 'Get AI insights',      desc: 'Head to the Insights page, click "Analyze my finances", and get 4 specific, actionable observations powered by Llama 3.1.' },
          ].map((s, i) => (
            <div key={s.n} className="ft-step" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="ft-step-num">{s.n}</div>
              <h3 className="ft-step-title">{s.title}</h3>
              <p className="ft-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ft-cta-section">
        <div className="ft-cta-box">
          <div className="ft-cta-glow" />
          <h2 className="ft-cta-title">Ready to take control<br />of your finances?</h2>
          <p className="ft-cta-sub">Your dashboard is already set up and waiting for you.</p>
          <button className="ft-btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}
            onClick={() => navigate('/dashboard')}>
            Open Dashboard <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="ft-footer">
        <div className="ft-footer-brand">
          <div className="ft-nav-logo" style={{ width: 24, height: 24, fontSize: 10 }}>F</div>
          Fintrack
        </div>
        <div className="ft-footer-links">
          <button className="ft-footer-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="ft-footer-link" onClick={() => navigate('/transactions')}>Transactions</button>
          <button className="ft-footer-link" onClick={() => navigate('/insights')}>Insights</button>
        </div>
        <div className="ft-footer-copy">Built with React + Tailwind + Groq</div>
      </footer>
    </div>
  )
}