# EB Tire Repair App

## Logo Setup
To display the custom logo, please upload your image file named `logo.png` to the **root directory** of this project.
The root directory is the folder containing `index.html`, `package.json`, and `vite.config.ts`.

## How to Run locally

### 1. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 2. Configure API Key
This app uses Google Gemini API for tire analysis.
1. Create a new file named `.env` in the root directory.
2. Add your API key to it:
```
API_KEY=your_actual_google_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`) to view the app.
