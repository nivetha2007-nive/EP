# 💰 WHERE TO SET YOUR BUDGET

## 🎯 Quick Answer:

**The budget setter is on your Dashboard page!**

---

## 📍 Step-by-Step Guide:

### **Step 1: Make Sure You're Logged In**
- If not logged in → Go to http://localhost:5173/login
- Login with any email/password (e.g., `user@test.com` / `123`)

### **Step 2: Go to Dashboard**
- Click **"Dashboard"** in the sidebar (left side)
- Or go directly to: http://localhost:5173/dashboard

### **Step 3: Find the Budget Setter**

Look at the **LEFT side** of the dashboard:

```
┌─────────────────────────┐
│    TOTAL               │
│    ₹0.00              │  ← Your running total
└─────────────────────────┘

┌─────────────────────────┐
│  BUDGET PROGRESS       │
│  ₹0 / ₹1000           │  ← Progress bar
│  [=========>          ]│
└─────────────────────────┘

┌─────────────────────────┐
│  Set Budget Limit      │  ← **THIS IS WHERE YOU ENTER BUDGET!**
│  [     1500      ] [Set]│
└─────────────────────────┘

┌─────────────────────────┐
│    🛒 Checkout         │
└─────────────────────────┘
```

### **Step 4: Set Your Budget**

1. Find the box labeled **"Set Budget Limit"**
2. Enter your budget amount (e.g., `2000`)
3. Click **"Set Budget"** button
4. ✅ Done! The progress bar updates automatically

---

## 🖼️ Visual Guide:

### **What You Should See:**

**Dashboard Layout:**
```
┌─────────────────────────────────────────────────────┐
│  Shopping Dashboard          Device Offline    ●   │
│  Track your budget in real-time                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────┐  ┌──────────────────────────┐
│                     │  │   Shopping Bill          │
│  TOTAL              │  │                          │
│  ₹0.00             │  │   No items scanned yet   │
│                     │  │                          │
│  BUDGET PROGRESS    │  │                          │
│  ₹0 / ₹1000        │  │                          │
│  [==========       ]│  │                          │
│                     │  │                          │
│  Set Budget Limit   │  │                          │  👈 LEFT SIDE
│  [   1500    ] [Set]│  │                          │
│                     │  │                          │
│  🛒 Checkout       │  │                          │
│                     │  │                          │
└─────────────────────┘  └──────────────────────────┘
```

---

## 💡 How to Use Budget Setter:

### **Example 1: Set Budget to ₹2000**

1. Type `2000` in the input box
2. Click "Set Budget"
3. ✅ Budget updated!

**You'll see:**
- Progress bar shows: `₹0 / ₹2000`
- Input placeholder changes to: `Current: ₹2000`

---

### **Example 2: Change Budget to ₹500**

1. Type `500` in the input box
2. Click "Set Budget"
3. ✅ New budget applied!

**You'll see:**
- Progress bar shows: `₹0 / ₹500`
- Bar color may change (green → amber → red as you approach limit)

---

## 🎨 Budget Progress Colors:

### **Green** (Safe Zone)
- When total < 80% of budget
- Example: ₹600 / ₹1000 = 60% → Green

### **Amber** (Warning Zone)
- When total = 80-100% of budget
- Example: ₹850 / ₹1000 = 85% → Amber

### **Red + Pulse** (Over Budget!)
- When total > 100% of budget
- Example: ₹1100 / ₹1000 = 110% → Red + animated pulse
- Alert banner appears at top

---

## 🔄 Testing It:

### **Quick Test:**

1. **Set budget to ₹500**
   - Enter: `500`
   - Click: "Set Budget"
   - See: Progress bar shows `₹0 / ₹500`

2. **Simulate scanning items** (Dev Tools at bottom)
   - Click: "🛒 Simulate Scan" 3 times
   - Watch: Total increases, progress bar fills up

3. **Watch the colors change!**
   - Under ₹400 → Green
   - ₹400-₹500 → Amber
   - Over ₹500 → Red + alert banner appears!

---

## ⚠️ Troubleshooting:

### **Issue 1: "I don't see the budget setter!"**

**Solution:**
1. Refresh the page: Press **Ctrl+R** or **F5**
2. Make sure you're logged in
3. Make sure you're on the **Dashboard** page
4. Check the **left side** of the screen

---

### **Issue 2: "Nothing happens when I click Set Budget"**

**Possible reasons:**

**A) Empty Input:**
- ✗ Input box is empty
- ✓ Enter a number first

**B) Invalid Number:**
- ✗ Entered: "abc" or negative number
- ✓ Enter positive number like: `1000`

**C) Firebase Not Connected:**
- Budget won't save to Firebase (database not enabled)
- But input should still clear after clicking
- Budget will reset to ₹1000 on page refresh

---

### **Issue 3: "Budget resets to ₹1000 on refresh"**

**Reason:**
- Firebase Realtime Database not enabled
- Data not persisting to cloud

**To fix:**
1. Enable Firebase Realtime Database
2. Budget will then persist across refreshes

**For now:**
- Budget only exists in current session
- Will reset if you refresh page
- This is normal without Firebase

---

## 🎯 Current vs Target Budget Display:

### **Before Setting Budget:**
```
Input placeholder: "Current: ₹1000"
Progress bar: ₹0 / ₹1000
```

### **After Setting to ₹2500:**
```
Input placeholder: "Current: ₹2500"
Progress bar: ₹0 / ₹2500
Input box: [empty]
```

### **After Scanning Items:**
```
Input placeholder: "Current: ₹2500"
Progress bar: ₹350 / ₹2500
```

---

## 📱 Mobile View:

On mobile/small screens:
- Budget setter stacks vertically
- Still in the same location
- Scroll down to see it if running total is large

---

## ✅ Success Checklist:

After setting budget, you should see:
- [ ] Progress bar shows new budget limit
- [ ] Input placeholder updates to new amount
- [ ] Input box clears
- [ ] Progress bar percentage recalculates
- [ ] Color may change based on new budget

---

## 🚀 Quick Start:

```
1. Login: http://localhost:5173/login
   ↓
2. Dashboard: Click "Dashboard" in sidebar
   ↓
3. Find: "Set Budget Limit" section (left side)
   ↓
4. Enter: Your budget amount (e.g., 1500)
   ↓
5. Click: "Set Budget" button
   ↓
6. ✅ Budget updated! Progress bar shows new limit
   ↓
7. Test: Click "🛒 Simulate Scan" to add items
   ↓
8. Watch: Progress bar fills up as items are scanned!
```

---

## 📊 Budget Amounts You Can Try:

**Small Budget (to test alert):**
```
Set: ₹200
Scan 3-4 items → Goes over budget → Red alert!
```

**Medium Budget:**
```
Set: ₹1000
Scan 10-15 items → Slowly fills up
```

**Large Budget:**
```
Set: ₹5000
Scan many items → Stays green for a while
```

---

## 🎉 You're All Set!

**To set your budget right now:**

1. Open: http://localhost:5173/dashboard
2. Look at the **left side** below the progress bar
3. See the box labeled **"Set Budget Limit"**
4. Enter your budget amount
5. Click **"Set Budget"**
6. Done! 🎉

---

**The budget setter is already there - just refresh your browser if you don't see it!** (Ctrl+R)

Your app was just updated to show the budget setter properly. 🚀
