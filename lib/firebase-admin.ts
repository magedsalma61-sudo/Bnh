import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../src/lib/firebase'

export type ProductDoc = {
  id?: string
  name: string
  price: string
  category: string
  description: string
  imageUrl?: string
  badge?: string
  createdAt?: string
}

export type CategoryDoc = {
  id?: string
  name: string
  createdAt?: string
}

export type OrderDoc = {
  id?: string
  customerName: string
  total: string
  status: string
  createdAt?: string
}

export type CustomerDoc = {
  id?: string
  name: string
  email: string
  orders: number
  createdAt?: string
}

export const addProduct = async (data: ProductDoc) => {
  const firestore = db()
  if (!firestore) return null
  const refDoc = await addDoc(collection(firestore, 'products'), {
    ...data,
    createdAt: new Date().toISOString()
  })
  return refDoc.id
}

export const updateProduct = async (id: string, data: Partial<ProductDoc>) => {
  const firestore = db()
  if (!firestore) return
  await updateDoc(doc(firestore, 'products', id), data)
}

export const deleteProduct = async (id: string) => {
  const firestore = db()
  if (!firestore) return
  await deleteDoc(doc(firestore, 'products', id))
}

export const addCategory = async (data: CategoryDoc) => {
  const firestore = db()
  if (!firestore) return null
  const refDoc = await addDoc(collection(firestore, 'categories'), {
    ...data,
    createdAt: new Date().toISOString()
  })
  return refDoc.id
}

export const updateCategory = async (id: string, data: Partial<CategoryDoc>) => {
  const firestore = db()
  if (!firestore) return
  await updateDoc(doc(firestore, 'categories', id), data)
}

export const deleteCategory = async (id: string) => {
  const firestore = db()
  if (!firestore) return
  await deleteDoc(doc(firestore, 'categories', id))
}

export const addOrder = async (data: OrderDoc) => {
  const firestore = db()
  if (!firestore) return null
  const refDoc = await addDoc(collection(firestore, 'orders'), {
    ...data,
    createdAt: new Date().toISOString()
  })
  return refDoc.id
}

export const addCustomer = async (data: CustomerDoc) => {
  const firestore = db()
  if (!firestore) return null
  const refDoc = await addDoc(collection(firestore, 'customers'), {
    ...data,
    createdAt: new Date().toISOString()
  })
  return refDoc.id
}

export const uploadImage = async (file: File) => {
  const storageInstance = storage()
  if (!storageInstance) return ''
  const imageRef = ref(storageInstance, `products/${Date.now()}-${file.name}`)
  await uploadBytes(imageRef, file)
  return await getDownloadURL(imageRef)
}

export const productsQuery = () => {
  const firestore = db()
  if (!firestore) return null
  return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'))
}

export const categoriesQuery = () => {
  const firestore = db()
  if (!firestore) return null
  return query(collection(firestore, 'categories'), orderBy('createdAt', 'desc'))
}

export const ordersQuery = () => {
  const firestore = db()
  if (!firestore) return null
  return query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'))
}

export const customersQuery = () => {
  const firestore = db()
  if (!firestore) return null
  return query(collection(firestore, 'customers'), orderBy('createdAt', 'desc'))
}
