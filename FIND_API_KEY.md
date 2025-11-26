# How to Find Your Supabase API Key

## Method 1: Settings → API (Recommended)

1. **In your Supabase dashboard**, look at the left sidebar
2. Click on **Settings** (⚙️ gear icon at the bottom)
3. Click on **API** (under "Project Settings")
4. You'll see a section called **"Project API keys"**
5. Look for the key labeled:
   - **"anon"** or **"public"** key
   - It's a very long string starting with `eyJ...`
   - It's safe to use in frontend code

**What it looks like:**
```
Project API keys
┌─────────────────────────────────────────────────────────┐
│ anon / public                                            │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh... │
│ [Click to reveal] or [Copy] button                       │
└─────────────────────────────────────────────────────────┘
```

## Method 2: Project Settings → API

1. Click on your **project name** at the top
2. Go to **Project Settings**
3. Click **API** in the left menu
4. Find **"anon public"** key

## Method 3: Direct URL

If you're already in your project, try this URL:
```
https://supabase.com/dashboard/project/[your-project-id]/settings/api
```

Replace `[your-project-id]` with your project ID (from your URL: `svnxwaozxmrakshnsfdg`)

## What You're Looking For

- **Key name**: "anon" or "anon public" or "public"
- **Format**: Very long string (200+ characters)
- **Starts with**: `eyJ` (JWT token format)
- **Location**: Under "Project API keys" section
- **Button**: May say "Reveal" or "Copy" or "Show"

## ⚠️ Important Notes

- **Use the "anon" key** (NOT the "service_role" key)
- The anon key is safe for frontend use
- The service_role key is secret - never use it in frontend!

## Still Can't Find It?

1. **Check you're in the right project**
   - Your project URL: `https://svnxwaozxmrakshnsfdg.supabase.co`
   - Make sure you're viewing this project in dashboard

2. **Try refreshing the page**
   - Sometimes the keys don't load immediately

3. **Check if project is fully set up**
   - Wait a few minutes if project was just created
   - Keys appear after project initialization

4. **Alternative**: Use the Supabase client library
   - If you can't find the key, we can use a different approach
   - But the anon key should definitely be there!

## Screenshot Guide

The API page should show:
```
┌─────────────────────────────────────────┐
│ Project API keys                         │
│                                          │
│ anon public                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [Copy]                                   │
│                                          │
│ service_role (secret)                    │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [Copy] (DO NOT USE THIS ONE)            │
└─────────────────────────────────────────┘
```

---

**Need more help?** Let me know what you see on the API settings page!


