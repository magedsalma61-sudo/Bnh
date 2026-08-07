'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import StatCard from '../../components/admin/StatCard'
import SectionCard from '../../components/admin/SectionCard'
import { auth, db } from '../../src/lib/firebase'
import { addCategory, addCustomer, addOrder, addProduct, deleteCategory, deleteProduct, uploadImage, type CategoryDoc, type CustomerDoc, type OrderDoc, type ProductDoc } from '../../lib/firebase-admin'

const initialProductForm = {
  name: '',
  price: '',
  category: 'المكملات الغذائية',
  description: '',
  badge: 'جديد',
  imageUrl: ''
}

const initialCategoryForm = {
  name: ''
}

const initialOrderForm = {
  customerName: '',
  total: '',
  status: 'قيد التنفيذ'
}

const initialCustomerForm = {
  name: '',
  email: '',
  orders: 1
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<ProductDoc[]>([])
  const [categories, setCategories] = useState<CategoryDoc[]>([])
  const [orders, setOrders] = useState<OrderDoc[]>([])
  const [customers, setCustomers] = useState<CustomerDoc[]>([])
  const [productForm, setProductForm] = useState(initialProductForm)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [orderForm, setOrderForm] = useState(initialOrderForm)
  const [customerForm, setCustomerForm] = useState(initialCustomerForm)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const firebaseAuth = auth()

  useEffect(() => {
    if (!firebaseAuth) {
      setAuthLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [firebaseAuth])

  useEffect(() => {
    const firestore = db()
    if (!firestore) return

    const productsQueryRef = query(collection(firestore, 'products'), orderBy('createdAt', 'desc'))
    const categoriesQueryRef = query(collection(firestore, 'categories'), orderBy('createdAt', 'desc'))
    const ordersQueryRef = query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'))
    const customersQueryRef = query(collection(firestore, 'customers'), orderBy('createdAt', 'desc'))

    const unsubscribeProducts = onSnapshot(productsQueryRef, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ProductDoc) })))
    })
    const unsubscribeCategories = onSnapshot(categoriesQueryRef, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as CategoryDoc) })))
    })
    const unsubscribeOrders = onSnapshot(ordersQueryRef, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as OrderDoc) })))
    })
    const unsubscribeCustomers = onSnapshot(customersQueryRef, (snapshot) => {
      setCustomers(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as CustomerDoc) })))
    })

    return () => {
      unsubscribeProducts()
      unsubscribeCategories()
      unsubscribeOrders()
      unsubscribeCustomers()
    }
  }, [])

  const allowedEmails = useMemo(() => {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
  }, [])

  const isAuthorized = useMemo(() => {
    if (!user?.email) return false
    if (!allowedEmails.length) return true
    return allowedEmails.includes(user.email.toLowerCase())
  }, [allowedEmails, user])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!firebaseAuth) {
      setAuthError('لم يتم تكوين Firebase بعد. أضف متغيرات البيئة أولًا.')
      return
    }

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
      setAuthError('')
    } catch (error: any) {
      setAuthError(error?.message || 'فشل تسجيل الدخول')
    }
  }

  const handleLogout = async () => {
    if (!firebaseAuth) return
    await signOut(firebaseAuth)
  }

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    let imageUrl = productForm.imageUrl

    if (imageFile) {
      imageUrl = await uploadImage(imageFile)
    }

    const payload: ProductDoc = {
      name: productForm.name,
      price: productForm.price,
      category: productForm.category,
      description: productForm.description,
      badge: productForm.badge,
      imageUrl
    }

    if (editingProductId) {
      await updateDoc(doc(db() as any, 'products', editingProductId), payload)
    } else {
      await addProduct(payload)
    }

    setProductForm(initialProductForm)
    setEditingProductId(null)
    setImageFile(null)
  }

  const handleEditProduct = (product: ProductDoc) => {
    setEditingProductId(product.id || null)
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      badge: product.badge || 'جديد',
      imageUrl: product.imageUrl || ''
    })
  }

  const handleDeleteProduct = async (id?: string) => {
    if (!id) return
    await deleteProduct(id)
  }

  const handleAddCategory = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!categoryName.trim()) return
    await addCategory({ name: categoryName.trim() })
    setCategoryName('')
  }

  const handleDeleteCategory = async (id?: string) => {
    if (!id) return
    await deleteCategory(id)
  }

  const handleAddOrder = async (event: React.FormEvent) => {
    event.preventDefault()
    await addOrder({
      customerName: orderForm.customerName,
      total: orderForm.total,
      status: orderForm.status
    })
    setOrderForm(initialOrderForm)
  }

  const handleOrderStatusChange = async (id: string | undefined, status: string) => {
    if (!id) return
    const firestore = db()
    if (!firestore) return
    await updateDoc(doc(firestore, 'orders', id), { status })
  }

  const handleCustomerUpdate = async (id: string | undefined, orders: number) => {
    if (!id) return
    const firestore = db()
    if (!firestore) return
    await updateDoc(doc(firestore, 'customers', id), { orders })
  }

  const handleAddCustomer = async (event: React.FormEvent) => {
    event.preventDefault()
    await addCustomer({
      name: customerForm.name,
      email: customerForm.email,
      orders: customerForm.orders
    })
    setCustomerForm(initialCustomerForm)
  }

  if (authLoading) {
    return <div className="rounded-[24px] border border-gray-200 bg-white p-8 text-center text-gray-600">جاري التحقق من الوصول...</div>
  }

  if (!firebaseAuth || !user || !isAuthorized) {
    return (
      <div className="mx-auto max-w-lg rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">تسجيل دخول الإدارة</h1>
        <p className="mt-3 text-gray-600">أدخل بياناتك للوصول إلى لوحة الإدارة وإدارة المتجر.</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-3 text-right outline-none"
            placeholder="البريد الإلكتروني"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-3 text-right outline-none"
            placeholder="كلمة المرور"
          />
          {authError ? <div className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{authError}</div> : null}
          <button className="w-full rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-red-700">
            تسجيل الدخول
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-gray-200 bg-gradient-to-br from-white via-[#fff8f8] to-[#fef2f2] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              لوحة الإدارة
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">لوحة تحكم BNH Egypt</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              إدارة المنتجات والطلبات والفئات والعملاء مع تحديثات مباشرة على المتجر.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white px-3 py-2 text-sm text-gray-600">{user.email}</span>
            <button onClick={handleLogout} className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="إجمالي المنتجات" value={String(products.length)} hint="منتجات نشطة في المتجر" />
        <StatCard title="الطلبات" value={String(orders.length)} hint="طلبات خلال هذا الأسبوع" />
        <StatCard title="العملاء" value={String(customers.length)} hint="عملاء مسجلين" />
        <StatCard title="الفئات" value={String(categories.length)} hint="فئات متاحة" />
      </section>

      <SectionCard title="إدارة المنتجات" description="إضافة، تعديل، وحذف المنتجات مع دعم رفع الصور مباشرة إلى Firebase Storage.">
        <form onSubmit={handleProductSubmit} className="mb-6 grid gap-4 rounded-[20px] border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
          <input required value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="اسم المنتج" />
          <input required value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="السعر" />
          <input value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="الفئة" />
          <input value={productForm.badge} onChange={(event) => setProductForm({ ...productForm, badge: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="الشارة" />
          <textarea value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} className="rounded-[20px] border border-gray-300 bg-white px-4 py-3 text-right md:col-span-2" placeholder="وصف المنتج" rows={3} />
          <div className="md:col-span-2">
            <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full rounded-full border border-dashed border-gray-300 bg-white px-4 py-3" />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white">{editingProductId ? 'تحديث المنتج' : 'إضافة منتج'}</button>
            {editingProductId ? <button type="button" onClick={() => { setEditingProductId(null); setProductForm(initialProductForm) }} className="rounded-full border border-gray-300 px-5 py-3 font-semibold text-gray-700">إلغاء</button> : null}
          </div>
        </form>

        <div className="overflow-hidden rounded-[20px] border border-gray-200">
          <table className="min-w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3">المنتج</th>
                <th className="px-4 py-3">الفئة</th>
                <th className="px-4 py-3">السعر</th>
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-200">
                  <td className="px-4 py-3 font-semibold text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-gray-600">{product.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditProduct(product)} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">تعديل</button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="إدارة الفئات" description="إضافة أو حذف فئات المنتجات الصحية.">
          <form onSubmit={handleAddCategory} className="flex flex-col gap-3 rounded-[20px] border border-gray-200 bg-gray-50 p-4 md:flex-row">
            <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="اسم الفئة" />
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white">إضافة فئة</button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category.id} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                {category.name}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="رفع الصور" description="الصور المرفوعة ستظهر مباشرة في المتجر عند توفر Firebase Storage.">
          <div className="rounded-[20px] border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
            <div className="mb-3 text-4xl">📷</div>
            <div className="font-semibold text-gray-900">اسحب وأفلت الصور هنا</div>
            <div className="mt-2 text-sm">أو اختر صورة للمنتج من خلال النموذج أعلاه</div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="إدارة الطلبات" description="إضافة أو متابعة الطلبات الحالية.">
          <form onSubmit={handleAddOrder} className="mb-4 grid gap-3 rounded-[20px] border border-gray-200 bg-gray-50 p-4">
            <input required value={orderForm.customerName} onChange={(event) => setOrderForm({ ...orderForm, customerName: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="اسم العميل" />
            <input required value={orderForm.total} onChange={(event) => setOrderForm({ ...orderForm, total: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="الإجمالي" />
            <input value={orderForm.status} onChange={(event) => setOrderForm({ ...orderForm, status: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="الحالة" />
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white">إضافة طلب</button>
          </form>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[16px] border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">{order.id}</div>
                  <select value={order.status || 'New'} onChange={(event) => handleOrderStatusChange(order.id, event.target.value)} className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm">
                    <option value="New">New</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="mt-2 text-sm text-gray-600">العميل: {order.customerName}</div>
                <div className="mt-1 text-sm text-gray-600">الإجمالي: {order.total}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="إدارة العملاء" description="إضافة بيانات العملاء وإدارتها.">
          <form onSubmit={handleAddCustomer} className="mb-4 grid gap-3 rounded-[20px] border border-gray-200 bg-gray-50 p-4">
            <input required value={customerForm.name} onChange={(event) => setCustomerForm({ ...customerForm, name: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="اسم العميل" />
            <input required type="email" value={customerForm.email} onChange={(event) => setCustomerForm({ ...customerForm, email: event.target.value })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="البريد الإلكتروني" />
            <input required type="number" min="0" value={customerForm.orders} onChange={(event) => setCustomerForm({ ...customerForm, orders: Number(event.target.value) })} className="rounded-full border border-gray-300 bg-white px-4 py-3 text-right" placeholder="عدد الطلبات" />
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white">إضافة عميل</button>
          </form>
          <div className="space-y-3">
            {customers.map((customer) => (
              <div key={customer.id} className="rounded-[16px] border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">{customer.name}</div>
                  <input type="number" min="0" value={customer.orders} onChange={(event) => handleCustomerUpdate(customer.id, Number(event.target.value))} className="w-20 rounded-full border border-gray-300 bg-white px-3 py-2 text-center" />
                </div>
                <div className="mt-2 text-sm text-gray-600">{customer.email}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
