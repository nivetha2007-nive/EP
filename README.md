# BudgetCart - Smart Shopping Trolley Dashboard

A real-time web dashboard for tracking shopping cart items, running totals, and budget limits using React, Vite, and Firebase Realtime Database.

## Features

- **Live Bill Panel**: Real-time scrolling list of scanned items with highlight animation for new items
- **Running Total**: Prominent display of current shopping total
- **Budget Bar**: Visual progress bar with color coding (green/amber/red)
- **Budget Setter**: Update budget limits on the fly
- **Alert Banner**: Dismissible alert when budget is exceeded
- **Device Status**: Online/offline indicator based on last update timestamp
- **Dev Tools**: Simulate item scans and reset sessions (development only)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

Create a `.env` file in the project root with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

See `.env.example` for the required variable names.

### 3. Firebase Database Structure

The app expects data at the path: `/trolley/{sessionId}`

Currently hardcoded to `session1`. Example structure:

```json
{
  "items": [
    { "uid": "A1B2C3", "name": "Milk 1L", "price": 55, "timestamp": 1234567890 }
  ],
  "runningTotal": 210,
  "budgetLimit": 1000,
  "budgetExceeded": false,
  "deviceStatus": "online",
  "lastUpdated": 1234567890
}
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Usage

### Dev Tools (Development Only)

The dev tools panel at the bottom provides two functions:

1. **Simulate Scan**: Adds a random item from a predefined product list
2. **Reset Session**: Clears all items and resets the running total (keeps budget limit)

### Setting Budget

Use the "Set Budget Limit" input to update the shopping budget in real-time.

### Real-Time Sync

All data syncs automatically via Firebase Realtime Database using `onValue()` listeners. No manual refresh needed.

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Firebase SDK v9+** - Realtime Database with modular syntax
- **Plain CSS** - Lightweight styling

## Mobile Friendly

The dashboard is responsive and optimized for mobile viewing, suitable for:
- Phone display via QR code while shopping
- Mounted screen on the shopping trolley
- Desktop monitoring

## Device Status

The device status indicator shows:
- **Online**: Last update within 10 seconds
- **Offline**: No updates for more than 10 seconds

Status is checked every 3 seconds automatically.

## Project Structure

```
src/
├── firebase.js              # Firebase initialization
├── hooks/
│   └── useTrolleyData.js   # Custom hook for Firebase data
├── components/
│   ├── BillPanel.jsx       # Scrolling item list
│   ├── RunningTotal.jsx    # Total display
│   ├── BudgetBar.jsx       # Progress bar
│   ├── BudgetSetter.jsx    # Budget input
│   ├── AlertBanner.jsx     # Budget alert
│   ├── DeviceStatus.jsx    # Online/offline indicator
│   └── DevTools.jsx        # Development tools
├── App.jsx                 # Main layout
└── main.jsx               # Entry point
```

## Removing Dev Tools

To remove the dev tools for production:

1. Remove the `<DevTools />` component from `src/App.jsx`
2. Optionally delete `src/components/DevTools.jsx` and `src/components/DevTools.css`

## License

MIT
