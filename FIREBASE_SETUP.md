# 🔥 Firebase Setup Instructions

## ✅ Current Status

Your BudgetCart app is **RUNNING** at: **http://localhost:5173**

## 🚨 IMPORTANT: Enable Firebase Database NOW!

Your Firebase credentials are configured, but you need to enable the Realtime Database:

### Step 1: Go to Firebase Console

**Click this link:** 
https://console.firebase.google.com/project/budgetcart-trolley/database

### Step 2: Create Realtime Database

1. You'll see the Database page
2. Look for **"Realtime Database"** section (NOT Firestore!)
3. Click **"Create Database"** button

### Step 3: Choose Location

- Select: **Asia Southeast 1** (Singapore)
- This matches your database URL

### Step 4: Security Rules

1. Start in **"test mode"** for now
2. Or choose "locked mode" and then add these rules:

```json
{
  "rules": {
    "trolley": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. Click **"Enable"** or **"Publish"**

### Step 5: Verify Database URL

Make sure your database URL is:
```
https://budgetcart-trolley-default-rtdb.asia-southeast1.firebasedatabase.app
```

This is already configured in your `.env` file! ✅

---

## 🧪 Test Your App (After Firebase is Enabled)

1. **Open browser:** http://localhost:5173
2. **You should see:** BudgetCart dashboard
3. **Scroll to bottom:** Find "DEV TOOLS" section
4. **Click:** "🛒 Simulate Scan"
5. **Watch:** Item appears in real-time!

### Testing Real-Time Sync

1. Open **2 browser tabs** with http://localhost:5173
2. Click "Simulate Scan" in one tab
3. Watch **BOTH tabs update instantly!** 🎉

---

## 🎯 Features to Test

### 1. Add Items
- Click "🛒 Simulate Scan" 
- Random items appear with yellow highlight
- Running total updates automatically

### 2. Set Budget
- Enter amount (e.g., 200)
- Click "Set Budget"
- Scan items to exceed it

### 3. Budget Colors
- **Green**: Under 80%
- **Yellow**: 80-100%
- **Red** (pulsing): Over 100%

### 4. Alert Banner
- Appears when budget exceeded
- Click ✕ to dismiss
- Reappears when you add more items

### 5. Device Status
- Shows "Online" when active
- Wait 11+ seconds → changes to "Offline"
- Scan an item → returns to "Online"

### 6. Reset Session
- Click "🔄 Reset Session"
- Confirm the dialog
- All items cleared, total = ₹0

---

## 📱 Test on Mobile

The dashboard is mobile-responsive!

### Option 1: Resize Browser
1. Press F12 (DevTools)
2. Click mobile device icon
3. Select phone size
4. Layout adapts!

### Option 2: Access from Phone
1. Find your computer's local IP:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address"

2. Start dev server with host flag:
   ```bash
   npm run dev -- --host
   ```

3. On your phone, visit:
   ```
   http://YOUR_IP:5173
   ```

---

## ❌ If Firebase Connection Fails

### Check Browser Console

1. Press **F12** to open DevTools
2. Click **Console** tab
3. Look for error messages

### Common Issues

**Error: "Firebase: Error (auth/invalid-api-key)"**
- Check `.env` file has correct `VITE_FIREBASE_API_KEY`

**Error: "PERMISSION_DENIED"**
- Database rules are too strict
- Set rules as shown above

**Error: "Can't find variable: firebase"**
- Refresh the page (Ctrl + R)
- Check that all dependencies installed

**Blank page / Nothing loads**
- Check Firebase Realtime Database is enabled (NOT Firestore)
- Verify database URL matches in `.env`
- Check browser console for errors

---

## 🎨 Your Dashboard Features

| Component | Location | What it Does |
|-----------|----------|--------------|
| **Device Status** | Top right | Online/offline indicator |
| **Alert Banner** | Top (when triggered) | Budget exceeded warning |
| **Running Total** | Left column, top | Current shopping total |
| **Budget Bar** | Left column, middle | Visual progress indicator |
| **Budget Setter** | Left column, bottom | Change budget limit |
| **Bill Panel** | Right column | Live list of items |
| **Dev Tools** | Bottom | Test buttons (remove for production) |

---

## 🚀 You're All Set!

Your BudgetCart dashboard is:
- ✅ Code complete
- ✅ Dependencies installed  
- ✅ Dev server running at http://localhost:5173
- ⏳ Waiting for Firebase to be enabled

**Next:** Enable Firebase Realtime Database and start testing! 🎉

---

## 🔗 Quick Links

- **Firebase Console:** https://console.firebase.google.com/project/budgetcart-trolley
- **Database Page:** https://console.firebase.google.com/project/budgetcart-trolley/database
- **Local App:** http://localhost:5173
- **Documentation:** See README.md, QUICK_START.md, FEATURES_CHECKLIST.md

Happy testing! 🛒
