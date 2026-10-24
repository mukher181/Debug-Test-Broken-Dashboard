# ⚡ Enterprise Performance Dashboard — Debug & Test

A high-fidelity, production-grade enterprise React dashboard built to diagnose, document, and resolve 6 critical software bugs while maintaining rigorous testing coverage with Vitest and React Testing Library.

---

## 📌 Project Overview
This project simulates a real-world engineering task: maintaining, debugging, and testing an existing codebase rather than building from scratch. The application displays live client transactions, revenue streams, and operational metrics with interactive search, category tab filters, and accessible components.

---

## 🛠️ Features & Technical Highlights
* **Responsive Layout:** Adaptive sidebar and CSS grid layout supporting seamless viewing across mobile, tablet, and desktop viewports.
* **Interactive Client Filtering:** Live search and tabbed categories (`All`, `Enterprise`, `Standard`) with case-insensitive matching.
* **A11y & Semantic HTML:** Built with accessibility landmarks (`<main>`, `<aside>`), explicit labels, and dynamic `aria-live="polite"` regions.
* **Automated Regression Prevention:** Comprehensive test suite written with Vitest and React Testing Library asserting rendering, interaction, and error behaviors.

---

## 🐛 Bug Diagnostics & Resolution
The project systematically identifies and resolves 6 distinct bug categories:

| # | Bug Category | Issue Description | Root Cause | Fix Implemented |
|---|---|---|---|---|
| **1** | **API Request** | Metrics failed to load due to 404 endpoint | Incorrect URL endpoint `/api/v1/bad-metrics` | Updated endpoint to a stable mock API source |
| **2** | **Runtime Error** | Application crashed on initial render | Unsafe access to deeply nested properties before fetch complete | Implemented conditional loading states & safe array mapping |
| **3** | **State Update** | UI failed to update upon data mutation | Direct array mutation (`push`) bypassing React state | Replaced with immutable state updater functions |
| **4** | **Layout & CSS** | Fixed-width card overflow on mobile views | Hardcoded pixel widths without responsive rules | Refactored with responsive CSS Grid (`repeat(auto-fit, minmax(...))`) |
| **5** | **Form Validation** | Filtering crashed when entering special characters | Missing null-checks and case normalization | Added string sanitization and `.toLowerCase()` checks |
| **6** | **Accessibility** | Interactive inputs flagged by screen readers | Missing associated `<label>` and `aria-label` tags | Added explicit HTML labels and accessibility attributes |

*(Detailed root cause analysis available in [`BUG_REPORT.md`](./BUG_REPORT.md))*

---

## 🧪 Testing Suite

Automated tests are located in `src/Dashboard.test.jsx` adhering to React Testing Library's core guiding principle: **"Test behavior, not implementation."**

### Test Coverage Highlights:
1. **Rendering Behavior:** Verifies loading screen appears and metric data correctly populates the DOM.
2. **State & Interaction:** Asserts typing into search filter updates visible table rows immutably.
3. **Error & Edge Case:** Confirms user-friendly error banner (`role="alert"`) displays when API requests fail.

---

## 🚀 Local Setup & Installation Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.
