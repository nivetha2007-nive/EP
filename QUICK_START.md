# BudgetCart - Quick Start Guide

## ✅ Your Firebase Configuration

Your `.env` file has been created with your Firebase credentials:
- **Project**: budgetcart-trolley
- **Database Region**: Asia Southeast 1
- **Database URL**: https://budgetcart-trolley-default-rtdb.asia-southeast1.firebasedatabase.app

## 🚀 Getting Started

### Step 1: Install Dependencies

You're experiencing network issues with npm. Try these solutions:

**Option 1: Check your internet connection and try again**
```bash
cd budgetcart
npm install
```

**Option 2: Use a different registry (if behind corporate firewall)**
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

**Option 3: Use yarn instead**
```bash
npm install -g yarn
yarn install
```

**Option 4: Install packages individually (fallback)**
```bash
npm install react@18.2.0 react-dom@18.2.0 firebase@10.7.1
npm install -D vite@5.0.8 @vitejs/plugin-react@4.2.1
npm install -D @types/react@18.2.43 @types/react-dom@18.2.17
```

### Step 2: Set Up Firebase Database

1. Go to [Firebase Console](https://console.firebase.google.com/project/budgetcart-trolley/database/budgetcart-trolley-default-rtdb/data)

2. Enable Realtime Database (not Firestore)

3. Set initial test rules:
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

4. (Optional) Add initial data at path `/trolley/session1`:
```json
{
  "items": [],
  "runningTotal": 0,
  "budgetLimit": 1000,
  "budgetExceeded": false,
  "deviceStatus": "online",
  "lastUpdated": 1721452800000
}
```

### Step 3: Start Development Server

Once dependencies are installed:

```bash
npm run dev
```

The app will open at: **http://localhost:5173**

### Step 4: Test the App

1. You'll see the BudgetCart dashboard with an empty bill
2. Scroll to the bottom to the **DEV TOOLS** section
3. Click **"🛒 Simulate Scan"** to add a random item
4. Watch the dashboard update in real-time:
   - Item appears in the bill panel (highlighted)
   - Running total increases
   - Budget bar progresses
   - If you exceed budget, an alert appears

### Step 5: Test Real-Time Sync

1. Open the app in **2 browser tabs** at the same time
2. Click "Simulate Scan" in one tab
3. Watch **both tabs update instantly** - this proves Firebase real-time sync is working!

## 🎯 Key Features to Test

### Budget Management
1. Set a small budget (e.g., ₹200)
2. Scan multiple items
3. Watch the budget bar change colors:
   - **Green** when under 80%
   - **Yellow/Amber** between 80-100%
   - **Red with pulse** over 100%

### Device Status
1. After scanning an item, you'll see "Device Online" (green dot)
2. Wait 11+ seconds without any activity
3. Status will change to "Device Offline" (red dot)
4. Scan again to see it return to "Online"

### Reset Session
1. Add several items
2. Click **"🔄 Reset Session"**
3. Confirm in the dialog
4. All items cleared, total returns to ₹0

## 📱 Mobile Testing

The dashboard is mobile-responsive. To test:

1. Open in Chrome/Edge
2. Press **F12** to open DevTools
3. Click the **mobile device toggle** icon
4. Select a phone size (iPhone, Pixel, etc.)
5. The layout adapts to single-column view

## 🔧 Troubleshooting

### If dependencies won't install:
- Check if you're behind a corporate firewall/proxy
- Try using a mobile hotspot temporarily
- Use `yarn` instead of `npm`
- Ask your IT department about npm registry access

### If Firebase doesn't connect:
- Check browser console (F12) for errors
- Verify `.env` file exists in `budgetcart` folder
- Make sure Realtime Database is enabled (not Firestore)
- Check Firebase database rules allow read/write

### If the page is blank:
- Open browser console (F12) for error messages
- Check that `npm run dev` shows no errors
- Verify all files are present in `src/` folder

## 📚 Project Files

All files are ready:
- ✅ 6 UI components (BillPanel, RunningTotal, BudgetBar, etc.)
- ✅ DevTools component for testing
- ✅ Firebase integration with real-time sync
- ✅ Custom hook for data management
- ✅ Mobile-responsive CSS
- ✅ Complete documentation

## 🎨 Customization

### Change Colors
Edit `src/components/*.css` files to change:
- Budget bar colors
- Background gradients
- Button styles

### Remove Dev Tools (for production)
In `src/App.jsx`, remove this line:
```jsx
<DevTools />
```

### Change Session ID
In `src/hooks/useTrolleyData.js` and `src/components/DevTools.jsx`:
```javascript
const SESSION_ID = 'session1';  // Change to 'session2', etc.
```

### Add More Products
In `src/components/DevTools.jsx`, edit the `SAMPLE_PRODUCTS` array:
```javascript
const SAMPLE_PRODUCTS = [
  { name: 'Your Product', price: 99 },
  // Add more...
];
```

## 🚀 Deploy to Production

### Build the project:
```bash
npm run build
```

### Deploy options:
1. **Firebase Hosting** (recommended for Firebase users)
2. **Vercel** - Connect your Git repo
3. **Netlify** - Drag and drop the `dist` folder
4. **GitHub Pages** - Free static hosting

See README.md for detailed deployment instructions.

## 💡 Next Steps

1. Install dependencies (resolve npm access issues)
2. Enable Realtime Database in Firebase Console
3. Run `npm run dev`
4. Test all features using Dev Tools
5. Open in multiple tabs to see real-time sync
6. Test on mobile device or emulator

Everything is ready - you just need to get `npm install` working and you're good to go! 🎉

## 📞 Need Help?

- Firebase docs: https://firebase.google.com/docs/database
- Vite docs: https://vitejs.dev
- React docs: https://react.dev

The complete project is in the `budgetcart` folder with all source code ready to run!
