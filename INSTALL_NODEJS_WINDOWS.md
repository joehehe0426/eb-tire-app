# Install Node.js on Windows 10

## 🚀 Quick Install (Recommended)

### Method 1: Official Installer (Easiest)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the **LTS version** (recommended)
   - Choose **Windows Installer (.msi)** - 64-bit

2. **Install:**
   - Run the downloaded `.msi` file
   - Click **Next** through the installer
   - ✅ Check "Automatically install the necessary tools" (optional but recommended)
   - Click **Install**
   - Wait for installation to complete

3. **Verify Installation:**
   - Close and reopen your terminal/PowerShell
   - Run:
     ```powershell
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., `v20.11.0` and `10.2.4`)

### Method 2: Using Chocolatey (If you have it)

```powershell
choco install nodejs
```

### Method 3: Using Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## ✅ After Installation

1. **Close and reopen** your terminal/PowerShell
2. **Navigate to your project:**
   ```powershell
   cd C:\Users\PC\Desktop\EB_girl_app\eb-tire-app
   ```

3. **Install Supabase package:**
   ```powershell
   npm install @supabase/supabase-js
   ```

4. **Create `.env.local` file** (see `FINAL_SETUP_STEPS.md`)

## 🆘 Troubleshooting

**"node is not recognized" after installation?**
- Close and reopen your terminal
- Restart your computer if needed
- Check if Node.js is in PATH:
  - Search "Environment Variables" in Windows
  - Check if `C:\Program Files\nodejs\` is in PATH

**Still not working?**
- Try installing from: https://nodejs.org/
- Make sure to download the **Windows Installer (.msi)**
- During installation, check "Add to PATH" option

## 📝 What You Get

After installing Node.js, you get:
- ✅ `node` - JavaScript runtime
- ✅ `npm` - Package manager (comes with Node.js)

---

**Once Node.js is installed, you can run all npm commands!** 🎉


