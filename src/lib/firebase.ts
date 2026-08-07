import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
}

const hasFirebaseConfig = () => Boolean(
  clientCredentials.apiKey &&
    clientCredentials.authDomain &&
    clientCredentials.projectId &&
    clientCredentials.appId
)

let appInstance: FirebaseApp | undefined
let authInstance: Auth | undefined
let dbInstance: Firestore | undefined
let storageInstance: FirebaseStorage | undefined

export const initFirebase = () => {
  if (!hasFirebaseConfig()) {
    return undefined
  }

  if (!appInstance) {
    appInstance = getApps().length ? getApps()[0] : initializeApp(clientCredentials as any)
  }

  return appInstance
}

export const auth = () => {
  if (!hasFirebaseConfig()) return undefined
  if (!authInstance) {
    authInstance = getAuth(initFirebase() as FirebaseApp)
  }
  return authInstance
}

export const db = () => {
  if (!hasFirebaseConfig()) return undefined
  if (!dbInstance) {
    dbInstance = getFirestore(initFirebase() as FirebaseApp)
  }
  return dbInstance
}

export const storage = () => {
  if (!hasFirebaseConfig()) return undefined
  if (!storageInstance) {
    storageInstance = getStorage(initFirebase() as FirebaseApp)
  }
  return storageInstance
}
