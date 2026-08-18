import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
}

const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  )
}

let firebaseApp: FirebaseApp | undefined
let firebaseAuth: Auth | undefined
let firebaseFirestore: Firestore | undefined
let firebaseStorage: FirebaseStorage | undefined

/**
 * Initialize Firebase once and reuse the same app instance.
 */
export const initFirebase = (): FirebaseApp | undefined => {
  if (!isFirebaseConfigured()) {
    console.warn(
      'Firebase is not configured. Check your NEXT_PUBLIC_FIREBASE_* environment variables.'
    )
    return undefined
  }

  if (!firebaseApp) {
    const existingApps = getApps()

    firebaseApp =
      existingApps.length > 0
        ? existingApps[0]
        : initializeApp(firebaseConfig)
  }

  return firebaseApp
}

/**
 * Firebase Authentication
 */
export const auth = (): Auth | undefined => {
  if (!isFirebaseConfigured()) {
    return undefined
  }

  if (!firebaseAuth) {
    const app = initFirebase()

    if (!app) {
      return undefined
    }

    firebaseAuth = getAuth(app)
  }

  return firebaseAuth
}

/**
 * Cloud Firestore
 */
export const db = (): Firestore | undefined => {
  if (!isFirebaseConfigured()) {
    return undefined
  }

  if (!firebaseFirestore) {
    const app = initFirebase()

    if (!app) {
      return undefined
    }

    firebaseFirestore = getFirestore(app)
  }

  return firebaseFirestore
}

/**
 * Firebase Storage
 */
export const storage = (): FirebaseStorage | undefined => {
  if (!isFirebaseConfigured()) {
    return undefined
  }

  if (!firebaseStorage) {
    const app = initFirebase()

    if (!app) {
      return undefined
    }

    firebaseStorage = getStorage(app)
  }

  return firebaseStorage
}

/**
 * Check whether Firebase is configured.
 */
export const isFirebaseReady = (): boolean => {
  return isFirebaseConfigured()
}