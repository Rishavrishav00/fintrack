# Fintrack - Personal finance dashboard

Fintrack is a progressional personal finance dashboard built using React 18 with styling accomplished using Tailwind CSS; as well as, charts using Recharts and AI powered insights/Groq.

🔗 *Live Demo*: [fintrack-my.vercel.app](https://fintrack-my.vercel.app/).

## Pages

| Page | Description |
|---|---|
| Landing | A marketing page that describes the features of Fintrack and has an animated dashboard preview. |
| Dashboard | The dashboard displays a summary of all transactions in summary cards, a balance trend graph, a spending chart, a monthly budget limit, and buttons to access all other pages. |
| Transactions | Transactions can be searched, sorted, and filtered using a variety of filters to narrow down the list of transactions. |
| Insights | The Insights page provides an analysis of the user's spending habits based on AI analysis. In addition, users will see how much they spent compared to the previous months and a breakdown of how much they spent by category. |

## Features

- *Role-Based UI* - Only admin users have the ability to add/edit/delete transactions. All users have read only access via a toggle on the nav bar between the two roles. 
- *AI Insights* - Groq Llama 3.1 analyzes the user's spending habits and gives them actionable insights to improve them. 
- *Set a Monthly Spending Limit* - Users can set a budget every month, and the page will turn from green to red when the budget has been exceeded.
- *Dark Mode* - Fintrack is built with a default dark theme, which can be toggled from the nav bar. 
- *Data Persistence* - All data changes made on the Fintrack app are saved to localStorage. 
- *Responsive* - React sidebar on desktop, React bottom nav on mobile devices. 

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 & Vite | Frontend framework and build tool. |
| Tailwind CSS v3 | Styling. |
| React Context and useReducer | State management. |
| React Router v6 | Navigation. |
| Recharts | Distributed charts. |
| Groq (Llama 3.1) | AI powered financial insights. |
| Vercel | Hosting and serverless functions. |

## Project Structure
fintrack/
├── api/
│   └── groq.js                    # Vercel serverless function for Groq API
├── src/
│   ├── context/AppContext.jsx      # Global state
│   ├── data/mockData.js            # Seed transactions and category config
│   ├── utils/helpers.js            # Formatting and data helpers
│   ├── components/
│   │   ├── layout/                 # Navbar, Sidebar, BottomNav
│   │   ├── ui/                     # Badge, EmptyState
│   │   ├── dashboard/              # SummaryCards, BalanceTrend, SpendingPie
│   │   ├── transactions/           # FiltersBar, TransactionTable, TransactionModal
│   │   └── insights/               # InsightCards, MonthlyBar, CategoryBars, AIInsights
│   └── pages/                      # Landing, Dashboard, Transactions, Insights
├── vercel.json                     # Vercel routing config
└── .env                            # Local only
## Quick start:
bash
npm install
npm run dev


You will need to create a .env file in the root folder for AI powered insights.