# Firebase Database Security Rules Setup

## 📋 Instructions

1. Go to your Firebase Console:
   https://console.firebase.google.com/project/budgetcart-trolley/database

2. Click on the **"Rules"** tab

3. Replace the existing rules with the contents of `firebase-rules.json`

4. Click **"Publish"**

## 🔒 Security Rules Explanation

### /trolleys/{trolleyId}
- **Read/Write**: Only the owner (matching ownerUid) OR admins can access
- Prevents customers from viewing or modifying other customers' trolleys
- Admins can see all trolleys for monitoring

### /products
- **Read**: Any authenticated user can read products
- **Write**: Only admins can add/edit/delete products
- Allows customers to see product data but not modify it

### /users/{uid}
- **Read/Write**: Only the user themselves OR admins can access
- Prevents users from viewing other users' data
- Admins can see all users for management

### /sessionHistory/{trolleyId}
- **Read/Write**: Only the trolley owner OR admins can access
- Links to trolley ownership through ownerUid
- Keeps shopping history private to each customer

## 🎯 Key Features

1. **Role-based access** using `root.child('users').child(auth.uid).child('role')`
2. **Owner validation** checking `ownerUid` matches current user
3. **Admin bypass** allowing admins full access for management
4. **Authentication required** all paths require `auth != null`

## ⚠️ Important Notes

- These rules use root-reference lookups to check roles outside the current path
- All operations require authentication (no anonymous access)
- Admin role must be set manually in Firebase Console
- To promote a user to admin, update `/users/{uid}/role` to `"admin"`

## 🧪 Testing Rules

After publishing, test that:

1. ✅ Customers can only see their own trolley data
2. ✅ Customers can read products but not modify them
3. ✅ Customers can only see their own history
4. ✅ Admins can access all data
5. ✅ Unauthenticated users are denied access

## 🔧 Setting First Admin

1. Create a user account through the app
2. Go to Firebase Console > Realtime Database
3. Navigate to `/users/{uid}`
4. Edit the `role` field from `"customer"` to `"admin"`
5. Refresh the app and you'll see the Admin menu

## 📚 Firebase Rules Documentation

For more details on security rules:
https://firebase.google.com/docs/database/security
