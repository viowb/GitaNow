Overview
This repository contains a Playwright automation framework built from scratch using JavaScript. It supports UI, API, and performance smoke testing with a focus on scalability, maintainability, and Shift Left testing practices.

Tech Stack
Playwright

Node.js
Cross-browser testing (Chromium, Firefox, WebKit)
Project Structure
tests/ui – UI automation tests
tests/api – API automation tests
tests/performance – Performance smoke checks
pages – Page Object Model
utils – Reusable helpers
fixtures – Test data
Installation
npm install
npx playwright install

Running Tests
Run all tests:
npx playwright test

Run UI tests only:
npx playwright test tests/ui

Run API tests only:
npx playwright test tests/api

Run performance smoke tests:
npx playwright test tests/performance

Reporting

HTML reports generated after execution

Screenshots and traces captured on failure

Shift Left Approach

API and performance tests execute before UI regression

Tests designed during story refinement

Fast feedback in CI/CD pipelines

Future Enhancements

Contract testing

Visual regression testing

Advanced performance thresholds


Architecture Diagram (Markdown-Friendly)

```md
## Architecture Overview

+------------------+
|  CI/CD Pipeline  |
+--------+---------+
         |
         v
+-----------------------------+
| Playwright Test Runner      |
+-------------+---------------+
              |
   +----------+----------+
   |                     |
   v                     v
UI Tests              API Tests
(Page Objects)        (Request Context)
   |                     |
   +----------+----------+
              |
              v
     Performance Smoke Tests
              |
              v
       HTML Reports / Traces
