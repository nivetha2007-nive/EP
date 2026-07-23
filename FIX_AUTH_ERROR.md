# 🔧 Fix "Failed to create account" Error

## Problem
You're getting "Failed to create account" because Firebase Authentication is not enabled in your Firebase project.

## ✅ Solution (2 minutes)

### Step 1: Enable Firebase Authentication

1. **Open Firebase Console:**
   👉 https://console.firebase.google.com/project/budgetcart-trolley/authentication

2. **Click "Get Started"** (if you see it)

3. **Go to "Sign-in method" tab**

4. **Click on "Email/Password"**

5. **Toggle "Enable"** to ON

6. **Click "Save"**

### Step 2: Try Signing Up Again

1. **Go back to:** http://localhost:5173/signup

2. **Enter:**
   - Email: `nivethasriram46@gmail.com` (or any email)
   - Password: (your password - at least 6 characters)
   - Confirm Password: (same password)

3. **Click "Sign Up"**

4. ✅ Should work now!

## 🎯 Quick Visual Guide

```
Firebase Console
    ↓
Authentication (left sidebar)
    ↓
Get Started (if first time)
    ↓
Sign-in method (tab at top)
    ↓
Email/Password (click on it)
    ↓
Enable toggle → ON
    ↓
Save
```

## 📸 What You Should See

**Before enabling:**
- Authentication page shows "Get started" button

**After enabling:**
- Email/Password shows as "Enabled" in the list
- Green checkmark next to it

## ✅ Verify It Worked

After enabling and signing up:
1. You'll see "Account created successfully!" message
2. Automatically logged in
3. Redirected to Dashboard
4. Can see your email in sidebar

## 🔐 Also Check (If Still Doesn't Work)

### Issue: Invalid API Key
**Check `.env` file has correct Firebase credentials**

Your current config:
```
VITE_FIREBASE_API_KEY=AIzaSyACdiEE4yeMtyaAg1VzDrEM-20Nz6y3ygE
VITE_FIREBASE_AUTH_DOMAIN=budgetcart-trolley.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=budgetcart-trolley
```

### Issue: App Domain Not Authorized
1. Go to: Firebase Console > Authentication > Settings
2. Check "Authorized domains"
3. Make sure `localhost` is in the list
4. Add if missing

## 🆘 Still Having Issues?

Check browser console (F12) for detailed error:

**Common errors:**

1. **"auth/operation-not-allowed"**
   - Email/Password not enabled → Follow Step 1 above

2. **"auth/invalid-api-key"**
   - Wrong API key in `.env` → Check Firebase Console

3. **"auth/email-already-in-use"**
   - Try logging in instead → Click "Login" link

4. **"auth/weak-password"**
   - Use password with 6+ characters

## ✨ After Authentication Works

You can:
1. **Sign up** multiple users
2. **Login/Logout**
3. **Test dashboard** features
4. **Promote to admin** (in Firebase Console)

## 🚀 Next Step After This

Once signup works, follow the main **QUICK_TEST_GUIDE.md** to test all features!

---

**Quick Link:** https://console.firebase.google.com/project/budgetcart-trolley/authentication/providers
