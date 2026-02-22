# FaceVault — PWA Setup Guide

## Deploy to GitHub Pages (Free, 5 minutes)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up if you don't have an account.

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it: `facevault`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload the files
1. In your new repo, click **Add file → Upload files**
2. Upload ALL of these files/folders:
   ```
   index.html
   manifest.json
   sw.js
   icons/
     icon-192.png
     icon-512.png
     apple-touch-icon.png
   ```
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

### Step 5 — Open on your phone
After ~1 minute, your app will be live at:
```
https://YOUR_GITHUB_USERNAME.github.io/facevault/
```

Open this URL in **Chrome (Android)** or **Safari (iOS)**.

---

## Install on Home Screen

### Android (Chrome)
- A banner will appear asking to install
- Or tap the **⋮ menu → Add to Home screen**

### iPhone (Safari)
- Tap the **Share button** (box with arrow)
- Scroll down and tap **Add to Home Screen**
- Tap **Add**

The app icon will appear on your home screen like a native app!

---

## Features
- 📷 Live camera face detection with front/back camera flip
- 📁 Upload photos from camera roll for registration & identification  
- 💾 IndexedDB storage — faces stored permanently in browser, no expiry
- 🔒 100% offline after first load — no data sent to any server
- ⚡ Works offline (service worker caches AI models)
- 📱 Installable as home screen app on iOS and Android

## Notes
- First load requires internet to download AI models (~5MB), cached after that
- For best accuracy, use well-lit, front-facing photos
- Face data is stored per-device per-browser (not synced across devices)
