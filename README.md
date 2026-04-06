# Fintrack — Personal Finance Dashboard

A responsive, AI-powered financial tracking dashboard built as a frontend assignment. It lets users track income and expenses, visualize spending patterns, manage transactions with role-based access, and get AI-generated financial advice.

**Live Demo**: [fintrack-my.vercel.app](https://fintrack-my.vercel.app)



## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Approach](#approach)
- [Role-Based UI](#role-based-ui)
- [State Management](#state-management)
- [AI Insights](#ai-insights)
- [Deployment](#deployment)



## Overview

Fintrack is a single-page React application that simulates a personal finance dashboard. It includes a public landing page, a main dashboard, a transactions manager, and an insights page. The app is built with a focus on clean UI, responsive design, meaningful data visualizations, and a smooth user experience across all screen sizes.

All data is seeded with 40 realistic mock transactions and persisted to localStorage so changes survive page refreshes. No backend is required everything runs in the browser.



## Features

### Core

**Dashboard Overview**
The main dashboard shows four summary cards — Total Balance, Total Income, Total Expenses, and Savings Rate. Below the cards is a 6-month balance trend line chart and a spending breakdown donut chart grouped by category. Both charts are fully responsive and adapt to dark and light themes.

**Transactions**
A full transaction table with every entry showing date, description, category, type badge, and amount. Users can search by description or category, filter by type (income/expense) or category, and sort any column in ascending or descending order. The table shows a count of visible results and an empty state when filters return nothing.

**Role-Based UI**
A dropdown in the navbar lets you switch between Viewer and Admin roles without any login flow. Viewer mode is read-only — all add, edit, and delete controls are hidden. Admin mode reveals the Add Transaction button, Edit and Delete actions on every row, and a modal form with full validation.

**Insights**
The insights page shows four metric cards — top spending category, monthly savings rate, expense change vs last month, and total months tracked. Below the cards is a grouped bar chart comparing income vs expenses month by month, and a category progress bar breakdown showing each category's share of total spending.

**AI Financial Insights**
A dedicated section on the Insights page powered by Groq's Llama 3.1 model. Clicking "Analyze my finances" sends your summarized financial data to the AI and returns 4 specific, actionable observations in plain English. The call is routed through a Vercel serverless function to avoid CORS issues in production.

### Additional

**Monthly Spending Limit**
An input field on the Dashboard lets you set a monthly budget in ₹. A live progress bar tracks current month expenses against the limit — green under 80%, amber from 80–100%, and red when exceeded. When the limit is breached, a warning banner appears and the entire page background transitions to a subtle red tint to provide an immediate visual alert. The limit persists in localStorage.

**Dark Mode**
The app defaults to dark mode. A sun/moon toggle in the navbar switches between dark and light themes. The preference is applied instantly via a class on the document root.

**Data Persistence**
Every transaction add, edit, or delete is saved to localStorage. The monthly limit and theme preference are also persisted. Refreshing the page restores everything exactly as it was.

**Landing Page**
A standalone marketing page at the root route with an animated hero section, a live mini-dashboard preview, animated stat counters, a feature grid, a how-it-works section, and a footer. Built entirely with inline CSS and React — no extra libraries.

**Responsive Design**
The sidebar collapses on mobile and is replaced by a bottom navigation bar. All grids and charts reflow gracefully on small screens. Cards stack vertically on mobile and expand to 4 columns on desktop.



## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| Tailwind CSS v3 | Utility-first styling |
| React Context + useReducer | Application state management |
| React Router v6 | Client-side routing |
| Recharts | Data visualizations |
| Groq API (Llama 3.1) | AI-powered financial insights |
| Vercel | Hosting and serverless functions |



## Project Structure

fintrack/
├── api/
│   └── groq.js                     # Vercel serverless function — proxies Groq API calls
├── src/
│   ├── context/
│   │   └── AppContext.jsx           # Global state with useReducer
│   ├── data/
│   │   └── mockData.js              # 40 seed transactions, categories, colors
│   ├── utils/
│   │   └── helpers.js               # Pure helper functions (format, filter, sort, aggregate)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Top bar with theme toggle and role switcher
│   │   │   ├── Sidebar.jsx          # Desktop navigation
│   │   │   └── BottomNav.jsx        # Mobile navigation
│   │   ├── ui/
│   │   │   ├── Badge.jsx            # Income / expense type pill
│   │   │   └── EmptyState.jsx       # Empty state for no data
│   │   ├── dashboard/
│   │   │   ├── SummaryCards.jsx     # Balance, income, expense, savings rate
│   │   │   ├── BalanceTrend.jsx     # 6-month line chart
│   │   │   └── SpendingPie.jsx      # Category donut chart
│   │   ├── transactions/
│   │   │   ├── FiltersBar.jsx       # Search, filters, add button
│   │   │   ├── TransactionTable.jsx # Sortable data table
│   │   │   └── TransactionModal.jsx # Add / edit form with validation
│   │   └── insights/
│   │       ├── InsightCards.jsx     # Key metric cards
│   │       ├── MonthlyBar.jsx       # Income vs expense bar chart
│   │       ├── CategoryBars.jsx     # Category progress bars
│   │       └── AIInsights.jsx       # Groq AI analysis component
│   └── pages/
│       ├── Landing.jsx              # Public marketing page
│       ├── Dashboard.jsx            # Overview + spending limit widget
│       ├── Transactions.jsx         # Transaction table page
│       └── Insights.jsx             # Insights and AI analysis page
├── vercel.json                      # SPA routing config for Vercel
├── vite.config.js                   # Vite config with Groq proxy for local dev
└── .env                             # Local environment variables (never committed)




## Setup Instructions

### Prerequisites

- Node.js v18 or higher — download from [nodejs.org](https://nodejs.org)
- A free Groq API key from [console.groq.com](https://console.groq.com) (for AI insights)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Rishavrishav00/fintrack.git
cd fintrack

# 2. Install dependencies
npm install

# 3. Create environment file
touch .env


Add your Groq API key to `.env`:

VITE_GROQ_API_KEY=your_groq_key_here

bash
# 4. Start the development server
npm run dev


Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |



## Approach

### Component Design
The app is broken into small, single-responsibility components. Each chart, card, table, and modal is its own file. Pages are thin — they compose components together and manage local UI state (like modal open/close) but do not handle data logic directly.

### Data Flow
All shared state lives in `AppContext`. Components read from context using the `useApp` hook and dispatch actions to mutate state. Pure helper functions in `utils/helpers.js` handle all data transformations — filtering, sorting, aggregating, and formatting — keeping components clean and logic testable.

### Styling
Tailwind CSS utility classes are used throughout. Dark mode is implemented using Tailwind's `class` strategy — a single `dark` class on the document root controls all theme variants. The landing page uses inline CSS to avoid Tailwind class purging issues with dynamically generated class names.

### Routing
React Router v6 handles navigation. The landing page (`/`) is a standalone route outside the main app shell. All dashboard routes (`/dashboard`, `/transactions`, `/insights`) are nested inside `AppShell` which renders the navbar, sidebar, and bottom nav.



## Role-Based UI

Roles are simulated entirely on the frontend — no authentication or backend logic is involved.

| Feature | Viewer | Admin |
|---|---|---|
| View all pages | ✅ | ✅ |
| Search and filter | ✅ | ✅ |
| Set monthly spending limit | ✅ | ✅ |
| View AI insights | ✅ | ✅ |
| Add transactions | ❌ | ✅ |
| Edit transactions | ❌ | ✅ |
| Delete transactions | ❌ | ✅ |

Switching roles via the navbar dropdown instantly shows or hides the relevant UI controls without any page reload.



## State Management

State is managed with React Context and `useReducer`. A single `AppContext` holds all shared application state:

| State | Description |
|---|---|
| transactions | Array of all transaction objects |
| filters | Current search query, type, category, sort key and direction |
| role | Current active role — `viewer` or `admin` |
| theme | Current theme — `dark` or `light` |
| monthlyLimit | Monthly spending limit set by the user |

Every state change goes through a well-defined action type in the reducer, making all mutations predictable and easy to trace. React Context was chosen over Redux because the state shape is flat and the app does not need middleware, time-travel debugging, or complex async flows.



## AI Insights

The AI insights feature works as follows:

1. The app summarizes the user's transaction data — total income, expenses, savings rate, recent monthly figures, and top spending categories
2. This summary is sent as a prompt to Groq's Llama 3.1 model via the `/api/groq` serverless function
3. The model returns 4 numbered, actionable insights in plain English
4. The response is parsed line by line and displayed as individual insight cards

In local development, the request is proxied through Vite's dev server to avoid CORS issues. In production on Vercel, it goes through a serverless function in `api/groq.js` which safely attaches the API key server-side.


## Deployment

The app is deployed on Vercel at [fintrack-my.vercel.app](https://fintrack-my.vercel.app).

To deploy your own copy:

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. Add `VITE_GROQ_API_KEY` in **Settings → Environment Variables**
4. Click **Deploy**

Every subsequent push to `main` triggers an automatic redeployment.