# Vercel Environment Variables Setup Guide

This guide explains how to add Firebase environment variables to your Vercel deployment.

## Why Environment Variables?

Environment variables keep sensitive configuration (like Firebase credentials) secure and separate from your code. This allows you to:
- Keep credentials out of version control
- Use different configurations for development and production
- Share code publicly without exposing sensitive data

---

## Step 1: Access Vercel Project Settings

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `marathi-biodata-maker`
3. Click on **Settings** tab at the top
4. Click on **Environment Variables** in the left sidebar

---

## Step 2: Add Environment Variables

Add each of the following environment variables one by one:

### Variable 1: Firebase API Key
- **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
- **Value:** (Get from Firebase Console > Project Settings > Your apps)
- **Environments:** Check all (Production, Preview, Development)

### Variable 2: Firebase Auth Domain
- **Key:** `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- **Value:** `your-project-id.firebaseapp.com`
- **Environments:** Check all

### Variable 3: Firebase Project ID
- **Key:** `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- **Value:** (Your Firebase project ID)
- **Environments:** Check all

### Variable 4: Firebase Storage Bucket
- **Key:** `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- **Value:** `your-project-id.firebasestorage.app`
- **Environments:** Check all

### Variable 5: Firebase Messaging Sender ID
- **Key:** `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** (Your messaging sender ID)
- **Environments:** Check all

### Variable 6: Firebase App ID
- **Key:** `NEXT_PUBLIC_FIREBASE_APP_ID`
- **Value:** (Your Firebase app ID)
- **Environments:** Check all

### Variable 7: Firebase Measurement ID (Optional)
- **Key:** `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- **Value:** (Your Google Analytics measurement ID)
- **Environments:** Check all

---

## Step 3: Where to Find Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `marathi-biodata-maker`
3. Click **Project Settings** (gear icon near "Project Overview")
4. Scroll down to **Your apps** section
5. Find your web app or click "Add app" if none exists
6. Copy the `firebaseConfig` object values

Example Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "project.firebaseapp.com",  // → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "project-id",         // → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "project.firebasestorage.app",  // → NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456",     // → NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123:web:abc",         // → NEXT_PUBLIC_FIREBASE_APP_ID
  measurementId: "G-ABC123"        // → NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

---

## Step 4: Save and Redeploy

1. After adding all variables, click **Save** for each one
2. Variables are automatically applied to new deployments
3. **Trigger a new deployment:**
   - Option A: Push a new commit to your GitHub repository
   - Option B: Go to Deployments tab → Click ⋯ on latest deployment → Click "Redeploy"
   - Option C: Click "Redeploy" button in the Vercel dashboard

---

## Step 5: Verify Deployment

1. Wait for deployment to complete (usually 1-2 minutes)
2. Visit your deployed site: `https://your-project.vercel.app`
3. Check browser console for any Firebase errors
4. Test authentication (Google sign-in, email sign-in)
5. Verify Firestore operations (save/load biodata)

---

## Troubleshooting

### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution:** Check that `NEXT_PUBLIC_FIREBASE_API_KEY` is set correctly in Vercel

### Issue: "Firebase: No Firebase App '[DEFAULT]' has been created"
**Solution:** Verify all environment variables are present and redeploy

### Issue: Environment variables not loading
**Solution:**
1. Make sure all variable names start with `NEXT_PUBLIC_`
2. Environment variables are only loaded during build time
3. Redeploy after adding variables

### Issue: Works locally but not on Vercel
**Solution:**
1. Check that `.env.local` matches Vercel environment variables
2. Ensure no variables are missing in Vercel
3. Clear Vercel cache and redeploy

---

## Security Best Practices

✅ **DO:**
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep `.env.local` in `.gitignore`
- Use different Firebase projects for development and production
- Regularly rotate API keys if exposed

❌ **DON'T:**
- Commit `.env.local` or `.env` files to Git
- Share Firebase credentials in public forums
- Use production credentials in development
- Hardcode credentials in source code

---

## Local Development Setup

For local development, create `.env.local` in project root:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
# Get credentials from Firebase Console as described above
```

The `.env.local` file is already in `.gitignore` and will not be committed.

---

## Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Firebase Project Settings](https://console.firebase.google.com/project/_/settings/general)

---

## Summary Checklist

- [ ] Access Vercel project settings
- [ ] Add all 7 Firebase environment variables
- [ ] Set variables for all environments (Production, Preview, Development)
- [ ] Verify values match Firebase Console
- [ ] Save all variables
- [ ] Trigger new deployment
- [ ] Test deployed application
- [ ] Verify authentication works
- [ ] Verify Firestore operations work

---

**Need Help?** Check the troubleshooting section or contact support at [Vercel Support](https://vercel.com/support)
