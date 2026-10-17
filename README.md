# Student Feedback Automation System

A React feedback form connected to an n8n workflow that validates submissions,
stores them in Google Sheets, flags low ratings and emails the student a thank-you.

## How it works
1. Student submits the form (React + Fetch API, client-side validation).
2. n8n Webhook receives the POST request.
3. A Code node re-validates the data; invalid requests get a 400 response.
4. An IF node checks the rating: 2 or below is "Needs Attention", above 2 is "Positive".
5. The row is appended to Google Sheets.
6. Gmail sends a thank-you email, then the webhook responds with success.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set `VITE_WEBHOOK_URL` to your n8n production webhook URL.
3. `npm run dev`
4. Import `student-feedback-workflow.json` into n8n, connect your Google credentials, activate it.

## Tech
React (Vite), n8n, Google Sheets, Gmail

created by Nezokuhle Tshukulwana || Git repo: https://github.com/nezokuhle1-arch/Student-Feedback-Automation-project.git || video: 