# BudgetCart Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account and project setup

## Installation Steps

### 1. Install Dependencies

Due to SSL certificate issues on your system, you may need to use one of these approaches:

**Option A: Standard install**
```bash
cd budgetcart
npm install
```

**Option B: If SSL issues persist**
```bash
npm install --legacy-peer-deps
```

**Option C: Configure npm to use system CA**
```bash
npm config set strict-ssl false
npm install
npm config set strict-ssl true
```

**Option D: Use Node with system CA**
```bash
node --use-system-ca $(npm bin)/npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Realtime Database** (not Firestore)
4. Set database rules for testing (you can restrict later):

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

5. Get your Firebase configuration from Project Settings > General > Your apps

### 3. Environment Configuration

Create a `.env` file in the `budgetcart` directory:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

Replace all values with your actual Firebase configuration.

### 4. Initialize Firebase Data (Optional)

You can manually add initial data to your Firebase Realtime Database at path `/trolley/session1`:

```json
{
  "trolley": {
    "session1": {
      "items": [],
      "runningTotal": 0,
      "budgetLimit": 1000,
      "budgetExceeded": false,
      "deviceStatus": "online",
      "lastUpdated": 1721452800000
    }
  }
}
```

Or simply use the **Simulate Scan** button in the Dev Tools after starting the app.

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

The production files will be in the `dist` directory.

## Quick Test

Once the dev server is running:

1. Open `http://localhost:5173` in your browser
2. You should see the BudgetCart dashboard with:
   - Empty bill panel
   - Running total of ₹0.00
   - Budget bar at 0%
   - Device status indicator
3. Scroll to the bottom and click **"🛒 Simulate Scan"**
4. Watch the dashboard update in real-time:
   - New item appears in the bill panel (highlighted)
   - Running total increases
   - Budget bar progresses
   - Alert appears if budget is exceeded

## Features to Test

### ✅ Real-Time Sync
- Open the app in multiple browser tabs
- Click "Simulate Scan" in one tab
- Watch all tabs update automatically

### ✅ Budget Setter
- Enter a budget amount (e.g., 500)
- Click "Set Budget"
- Scan items until you exceed the budget
- Watch the alert banner appear

### ✅ Budget Bar Colors
- Under 80%: Green
- 80-100%: Amber/Yellow
- Over 100%: Red with pulse animation

### ✅ Device Status
- Status shows "Online" when data is fresh
- Wait 10+ seconds without updates
- Status changes to "Offline"

### ✅ Reset Session
- Click "🔄 Reset Session"
- Confirm in the dialog
- All items cleared, total reset to ₹0

## Troubleshooting

### SSL Certificate Errors
If you encounter SSL errors during `npm install`:
- Try using `--legacy-peer-deps` flag
- Configure npm with `npm config set strict-ssl false` (temporarily)
- Check if your system's proxy or antivirus is interfering

### Firebase Connection Issues
- Verify all environment variables are set correctly in `.env`
- Check Firebase console for database rules
- Ensure Realtime Database (not Firestore) is enabled
- Check browser console for detailed error messages

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
budgetcart/
├── src/
│   ├── components/         # UI components
│   │   ├── AlertBanner.jsx/css
│   │   ├── BillPanel.jsx/css
│   │   ├── BudgetBar.jsx/css
│   │   ├── BudgetSetter.jsx/css
│   │   ├── DeviceStatus.jsx/css
│   │   ├── DevTools.jsx/css
│   │   └── RunningTotal.jsx/css
│   ├── hooks/
│   │   └── useTrolleyData.js  # Firebase real-time hook
│   ├── App.jsx                # Main app component
│   ├── App.css
│   ├── firebase.js            # Firebase config
│   ├── index.css
│   └── main.jsx               # Entry point
├── .env                       # Your environment variables (create this)
├── .env.example              # Template for environment variables
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js

```

## Next Steps

1. **Remove Dev Tools for Production**: Edit `src/App.jsx` and remove the `<DevTools />` component
2. **Secure Firebase Rules**: Update your Firebase Realtime Database rules to add authentication
3. **Add Multiple Sessions**: Extend the app to support multiple trolley sessions
4. **Custom Branding**: Update colors, logo, and styling in CSS files
5. **Deploy**: Deploy to Firebase Hosting, Vercel, or Netlify

## Support

For issues or questions:
- Check Firebase Console for database activity
- Review browser console for errors
- Verify `.env` configuration
- Test Firebase connection separately

Happy coding! 🛒
