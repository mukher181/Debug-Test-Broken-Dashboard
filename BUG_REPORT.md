# Bug Report — The Broken Dashboard

## Bug 1: Broken API Request
- **How it was found:** Network tab showed a 404 Not Found error when fetching metrics from `/api/v1/bad-metrics`.
- **Root Cause:** Hardcoded invalid endpoint URL pointing to a non-existent server route.
- **The Fix:** Updated fetch endpoint to a stable mock source (`https://jsonplaceholder.typicode.com/users`).
- **Verification:** Verified via Network tab and test suite that data fetches successfully with HTTP 200.

## Bug 2: JavaScript Runtime Error (Unsafe Property Access)
- **How it was found:** Console threw `TypeError: Cannot read properties of undefined (reading 'stats')` on initial render.
- **Root Cause:** Component attempted to read deeply nested properties (`metrics.data.stats.revenue`) before asynchronous data was available.
- **The Fix:** Implemented conditional loading state handling and safe data mapping logic.
- **Verification:** Browser console is free of runtime errors and loading states render cleanly.

## Bug 3: Incorrect State Update (Mutative State Modification)
- **How it was found:** UI failed to re-render when new items were added.
- **Root Cause:** Direct array mutation (`metricsList.push(newItem)`) instead of using immutable state updater (`setMetrics`).
- **The Fix:** Replaced mutations with immutable state update patterns (`setMetrics([...prev, newItem])`).
- **Verification:** Verified state changes trigger immediate and correct React component re-renders.

## Bug 4: Layout / Responsive Bug
- **How it was found:** Mobile viewport testing caused card contents to overflow and clip text.
- **Root Cause:** Fixed pixel width (`width: 400px`) on grid cards without responsive breakpoints or flex/grid wrapper rules.
- **The Fix:** Replaced fixed widths with a responsive CSS grid (`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`).
- **Verification:** Tested across multiple breakpoints; layout adapts fluidly without overflow.

## Bug 5: Form Validation / Filtering Problem
- **How it was found:** Typing uppercase characters or special symbols into the search filter threw runtime filter crashes.
- **Root Cause:** Lack of safe string conversion (`.toLowerCase()`) and missing null-checks on filter values.
- **The Fix:** Added lowercase conversion and safe string checking during filter computations.
- **Verification:** Tested filter inputs with mixed cases and symbols; filtering works smoothly without errors.

## Bug 6: Accessibility Issue
- **How it was found:** axe DevTools reported missing form labels and interactive control names.
- **Root Cause:** Filter input element lacked an associated `<label>` or explicit `aria-label`.
- **The Fix:** Added an explicit `<label>` paired via `htmlFor` and an `aria-label="Filter metrics"` attribute.
- **Verification:** Re-ran axe DevTools scan; accessibility violation for form labels resolved completely.