# 🧪 Quick Test Guide for BudgetCart v2.0

## ✅ Your App is Running!

**URL:** http://localhost:5173

## 🎯 Quick Testing Steps

### Step 1: Create First User (Customer)

1. **Open:** http://localhost:5173
2. You'll be redirected to login page
3. **Click:** "Sign up" link
4. **Enter:**
   - Email: `customer@test.com`
   - Password: `password123` (or your choice)
5. **Click:** "Sign Up"
6. ✅ You'll be logged in and see Dashboard

### Step 2: Test Customer Features

#### A) Dashboard & Shopping
1. Scroll to **DEV TOOLS** section (bottom)
2. **Click:** "🛒 Simulate Scan" multiple times
3. Watch items appear with **yellow highlight**
4. See **running total** update
5. See **budget bar** progress

#### B) Budget Alerts
1. **Enter budget:** 200 (in Budget Setter)
2. **Click:** "Set Budget"
3. **Scan more items** until total exceeds ₹200
4. See **red alert banner** appear!
5. Budget bar turns **red with pulse**

#### C) Checkout
1. After adding several items
2. **Click:** "🛒 Checkout" button (left column)
3. **Confirm** in dialog
4. ✅ Items cleared, total reset

#### D) History
1. **Click:** "📜 History" in sidebar
2. See your completed session
3. **Click** to expand and see items
4. Check **final total** and **budget status**

#### E) Analytics
1. **Click:** "📈 Analytics" in sidebar
2. See your **spending stats**
3. View **spend per session chart**
4. View **top products chart**

### Step 3: Create Admin User

#### Option A: Promote Existing User
1. **Open Firebase Console:**
   https://console.firebase.google.com/project/budgetcart-trolley/database

2. **Navigate to:** `/users`
3. **Find your user ID** (long string)
4. **Edit:** `role` field
5. **Change from:** `"customer"` to `"admin"`
6. **Save**
7. **Refresh app** - Admin menu appears!

#### Option B: Create New Admin
1. **Logout** (sidebar button)
2. **Sign up** with: `admin@test.com`
3. **Follow Option A** to promote to admin

### Step 4: Test Admin Features

After promoting to admin, you'll see new "⚙️ Admin" menu:

#### A) Product Manager
1. **Click:** "⚙️ Admin" in sidebar
2. **Click:** "📦 Products" tab
3. **Click:** "+ Add Product"
4. **Enter:**
   - RFID Tag: `TAG001`
   - Name: `Chocolate Bar`
   - Price: `25`
   - Category: `Snacks`
5. **Click:** "Add"
6. ✅ Product appears in table
7. **Try:** Edit (✏️) and Delete (🗑️) buttons

#### B) Live Trolley Monitor
1. **Click:** "🛒 Live Trolleys" tab
2. See **all trolleys** system-wide
3. Shows **owner email, total, device status**
4. **Open new tab** → Login as different user
5. Watch **both trolleys** appear!

#### C) User List
1. **Click:** "👥 Users" tab
2. See **all registered users**
3. View **roles** (customer/admin badges)
4. Note: Read-only (promote in Firebase Console)

#### D) Store Analytics
1. **Click:** "📊 Store Analytics" tab
2. See **aggregate stats** across all customers
3. View **revenue over time** chart
4. View **top 10 products** bar chart

## 🔐 Test Security

### Test 1: Customer Can't Access Admin
1. **Login as customer** (non-admin)
2. **Try to access:** http://localhost:5173/admin
3. ✅ Should redirect to dashboard

### Test 2: Logout Works
1. **Click:** "🚪 Logout" in sidebar
2. ✅ Redirected to login page
3. **Try to access:** http://localhost:5173/dashboard
4. ✅ Redirected to login page

### Test 3: Protected Routes
1. **While logged out**, try accessing:
   - http://localhost:5173/dashboard
   - http://localhost:5173/history
   - http://localhost:5173/analytics
2. ✅ All should redirect to login

## 📱 Test Mobile Responsive

1. **Press F12** (open DevTools)
2. **Click** mobile device icon (top-left)
3. **Select:** iPhone 12 or similar
4. **Check:**
   - Hamburger menu appears (☰)
   - Sidebar slides in/out
   - All content adapts
   - Forms are usable

## 🎯 Feature Checklist

- [ ] User signup works
- [ ] User login works
- [ ] Dashboard shows items
- [ ] Simulate scan adds items
- [ ] Budget bar changes colors
- [ ] Alert appears when budget exceeded
- [ ] Checkout saves to history
- [ ] History shows past sessions
- [ ] Analytics shows charts
- [ ] Admin can add products
- [ ] Admin sees all trolleys
- [ ] Admin sees all users
- [ ] Admin sees store analytics
- [ ] Logout works
- [ ] Protected routes work
- [ ] Mobile menu works
- [ ] Real-time sync works (test with 2 tabs)

## 🚀 Advanced Tests

### Test Real-Time Sync
1. **Open 2 browser tabs**
2. **Login as same user** in both
3. **In Tab 1:** Click "Simulate Scan"
4. ✅ **Tab 2** updates instantly!

### Test Multi-User
1. **Create 2 users** (customer1, customer2)
2. **Login as customer1** in Tab 1
3. **Login as customer2** in Tab 2
4. Each user has **separate trolley**
5. **Login as admin** in Tab 3
6. Admin sees **both trolleys** in monitor!

### Test Device Status
1. **Scan an item** → Status: "Online" (green)
2. **Wait 15 seconds** without doing anything
3. ✅ Status changes to "Offline" (red)
4. **Scan another item**
5. ✅ Status returns to "Online"

## 🐛 If Something Doesn't Work

### Firebase Not Connecting?
1. Check `.env` file has correct credentials
2. Verify Firebase Realtime Database is enabled
3. Check browser console (F12) for errors

### Login Fails?
1. Enable **Email/Password** in Firebase Authentication
2. Go to: Console > Authentication > Sign-in method
3. Enable Email/Password provider

### Rules Error?
1. **Copy rules** from `firebase-rules.json`
2. **Paste** in Firebase Console > Database > Rules
3. **Click:** Publish

### Page is Blank?
1. **Check browser console** (F12)
2. Look for error messages
3. Verify all dependencies installed: `npm install`

## 📚 Next Steps

1. **Apply Firebase Security Rules** (see FIREBASE_RULES_SETUP.md)
2. **Remove Dev Tools** for production (edit Dashboard.jsx)
3. **Add more products** via Admin panel
4. **Test with real users**
5. **Deploy** to production!

## 🎉 Success Criteria

If all these work, you're ready for production:

✅ Users can sign up and login
✅ Customers can scan items and checkout
✅ History tracking works
✅ Analytics display correctly
✅ Admins can manage products
✅ Admin sees all trolleys live
✅ Security rules enforce access control
✅ Mobile responsive design works
✅ Real-time sync functions properly

---

**Your BudgetCart v2.0 is ready!** 🚀

Need help? Check:
- UPGRADE_COMPLETE.md - Full feature documentation
- FIREBASE_RULES_SETUP.md - Security rules guide
- README.md - Original documentation
