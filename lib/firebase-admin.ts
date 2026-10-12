import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  updateDoc,
  where,
  type Firestore
} from 'firebase/firestore'

import {
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'

import { db, storage } from '../src/lib/firebase'

/* =========================================================
   PRODUCT / STORE TYPES
========================================================= */

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

/* =========================================================
   CLINIC / BRANCH TYPES
========================================================= */

export type BranchType =
  | 'direct'
  | 'whatsapp'

export type BranchDoc = {
  id: string
  name: string
  address: string
  locationUrl: string
  type: BranchType
  firstVisitPrice: number
  followUpPrice: number
  day?: string
  schedule?: string
  everyWeek?: boolean
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'

export type BookingDoc = {
  id?: string

  patientName: string
  phone: string

  branchId: string
  branchName: string

  date: string
  time: string

  visitType: 'first_visit' | 'follow_up'

  price: number

  status: BookingStatus

  source: 'website' | 'whatsapp' | 'admin'

  notes?: string

  createdAt?: string
  updatedAt?: string

  countsTowardCapacity?: boolean
}

/* =========================================================
   ONLINE CONSULTATION
========================================================= */

export type OnlineConsultationDoc = {
  id?: string

  patientName: string
  phone: string

  age: string
  weight: string
  healthCondition: string

  pregnancy: string
  breastfeeding: string

  symptoms?: string
  medications?: string
  notes?: string

  paymentMethod?: 'instapay' | 'vodafone_cash'
  paymentReceiptUrl?: string

  price: number

  status:
    | 'pending'
    | 'under_review'
    | 'contacted'
    | 'completed'
    | 'cancelled'

  createdAt?: string
  updatedAt?: string
}

/* =========================================================
   MEDICINE ORDERS
========================================================= */

export type MedicineCustomerType =
  | 'existing'
  | 'new'

export type MedicineOrderStatus =
  | 'pending'
  | 'under_review'
  | 'contacted'
  | 'confirmed'
  | 'cancelled'
  | 'completed'

export type MedicineOrderDoc = {
  id?: string

  customerName: string
  phone: string

  customerType: MedicineCustomerType

  age?: string
  weight?: string
  healthCondition?: string

  pregnancy?: string
  breastfeeding?: string

  products?: string[]

  notes?: string

  status: MedicineOrderStatus

  createdAt?: string
  updatedAt?: string
}

/* =========================================================
   CONSTANTS
========================================================= */

export const ONLINE_CONSULTATION_PRICE = 750

export const WHATSAPP_NUMBER = '201281441562'

export const INSTAPAY_NUMBER = '01141336908'

export const VODAFONE_CASH_NUMBER = '01000225449'

export const MAX_BOOKINGS_PER_SLOT = 4

/* =========================================================
   BRANCHES
========================================================= */

export const BRANCHES: BranchDoc[] = [
  {
    id: 'shobra',
    name: 'Shobra',
    address:
      'تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا، 3 دقائق من مترو روض الفرج',
    locationUrl:
      'https://maps.app.goo.gl/FNrmpeFMkCua4jjn7',
    type: 'direct',
    firstVisitPrice: 500,
    followUpPrice: 120,
    day: 'Saturday',
    schedule: '2:00 PM - 7:00 PM',
    everyWeek: false
  },

  {
    id: 'nasr-city',
    name: 'Nasr City',
    address:
      '46 شارع محمد النادي، مصطفى النحاس، محطة الهيثم، بجوار ماركت بيم',
    locationUrl:
      'https://bit.ly/3wfo32Z',
    type: 'direct',
    firstVisitPrice: 650,
    followUpPrice: 150,
    day: 'Sunday',
    schedule: '2:00 PM - 7:00 PM',
    everyWeek: false
  },

  {
    id: 'helmia',
    name: 'Helmeyet El-Zeitoun',
    address:
      'ميدان حلمية الزيتون، أعلى عصير أفوكادو وبجوار بنزينة التعاون',
    locationUrl:
      'https://bit.ly/3Fwsw5F',
    type: 'direct',
    firstVisitPrice: 500,
    followUpPrice: 120,
    day: 'Saturday',
    schedule: '2:00 PM - 7:00 PM',
    everyWeek: false
  },

  {
    id: 'el-obour',
    name: 'El Obour',
    address:
      'العبور، الحي السادس، قطعة 52، الدور الثاني، أعلى ميديكال هاوس',
    locationUrl:
      'https://goo.gl/maps/QWJj7f1dmQVQp3cH9',
    type: 'direct',
    firstVisitPrice: 650,
    followUpPrice: 150,
    day: 'Monday',
    schedule: '2:00 PM - 7:00 PM',
    everyWeek: false
  },

  {
    id: 'el-haram',
    name: 'El Haram',
    address:
      '236 شارع الهرم، بجوار سنترال الهرم، الدور الثالث، شقة 6',
    locationUrl:
      'https://maps.app.goo.gl/AWumxoRCiRcfJaoq6?g_st=aw',
    type: 'direct',
    firstVisitPrice: 650,
    followUpPrice: 150,
    day: 'Tuesday',
    schedule: '2:00 PM - 7:00 PM',
    everyWeek: false
  },

  {
    id: '6-october',
    name: '6th of October',
    address:
      'ميدان الحصري، عمارة 3، المحور المركزي، أعلى راية ستور، الدور الثالث',
    locationUrl:
      'https://maps.app.goo.gl/4dN6EwYtuespmcTw8',
    type: 'direct',
    firstVisitPrice: 650,
    followUpPrice: 150,
    day: 'Thursday',
    schedule: '2:00 PM - 7:00 PM',
    everyWeek: false
  },

  {
    id: 'el-maadi',
    name: 'El Maadi',
    address:
      '101 شارع 9، المعادي، أمام البنك الأهلي وبجوار مترو المعادي',
    locationUrl:
      'https://bit.ly/3RPH9X6',
    type: 'whatsapp',
    firstVisitPrice: 300,
    followUpPrice: 75
  },

  {
    id: 'imbaba',
    name: 'Imbaba',
    address:
      'شارع الوحدة، أمام كوك دور وكنتاكي',
    locationUrl:
      'https://maps.google.com/maps?q=30.0863294%2C31.2213284&z=17&hl=ar',
    type: 'whatsapp',
    firstVisitPrice: 300,
    followUpPrice: 60
  },

  {
    id: 'fayoum',
    name: 'Fayoum',
    address:
      'أمام المستشفى العام، باب الشؤون الصحية بالمستشفى، برج الأطباء، مدخل الإداري الثاني، الدور الثالث',
    locationUrl:
      'https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7',
    type: 'whatsapp',
    firstVisitPrice: 300,
    followUpPrice: 70
  }
]

export const getBranch = (
  branchId: string
): BranchDoc | undefined => {
  return BRANCHES.find(branch => branch.id === branchId)
}

/* =========================================================
   WHATSAPP
========================================================= */

export const createWhatsAppUrl = (
  message: string
): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`
}

export const createBookingWhatsAppUrl = (
  branchName: string
): string => {
  return createWhatsAppUrl(
    `مرحبًا، أريد حجز كشف في فرع ${branchName}.`
  )
}

export const createFollowUpWhatsAppUrl = (
  branchName: string
): string => {
  return createWhatsAppUrl(
    `مرحبًا، أريد حجز متابعة مع الدكتور في فرع ${branchName}.`
  )
}

export const createOnlineConsultationWhatsAppUrl = (
  patientName: string
): string => {
  return createWhatsAppUrl(
    `مرحبًا، أنا ${patientName} وقد أرسلت طلب الكشف الأونلاين. أرجو التواصل معي من الفريق الطبي خلال 24 ساعة.`
  )
}

export const createMedicineWhatsAppUrl = (
  customerName: string
): string => {
  return createWhatsAppUrl(
    `مرحبًا، أنا ${customerName} وأريد طلب أدوية. أرجو التواصل معي من الفريق الطبي خلال 24 ساعة.`
  )
}

/* =========================================================
   STORE FUNCTIONS
========================================================= */

export const addProduct = async (
  data: ProductDoc
) => {
  const firestore = db()

  if (!firestore) return null

  const refDoc = await addDoc(
    collection(firestore, 'products'),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  )

  return refDoc.id
}

export const updateProduct = async (
  id: string,
  data: Partial<ProductDoc>
) => {
  const firestore = db()

  if (!firestore) return

  await updateDoc(
    doc(firestore, 'products', id),
    data
  )
}

export const deleteProduct = async (
  id: string
) => {
  const firestore = db()

  if (!firestore) return

  await deleteDoc(
    doc(firestore, 'products', id)
  )
}

export const addCategory = async (
  data: CategoryDoc
) => {
  const firestore = db()

  if (!firestore) return null

  const refDoc = await addDoc(
    collection(firestore, 'categories'),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  )

  return refDoc.id
}

export const updateCategory = async (
  id: string,
  data: Partial<CategoryDoc>
) => {
  const firestore = db()

  if (!firestore) return

  await updateDoc(
    doc(firestore, 'categories', id),
    data
  )
}

export const deleteCategory = async (
  id: string
) => {
  const firestore = db()

  if (!firestore) return

  await deleteDoc(
    doc(firestore, 'categories', id)
  )
}

export const addOrder = async (
  data: OrderDoc
) => {
  const firestore = db()

  if (!firestore) return null

  const refDoc = await addDoc(
    collection(firestore, 'orders'),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  )

  return refDoc.id
}

export const addCustomer = async (
  data: CustomerDoc
) => {
  const firestore = db()

  if (!firestore) return null

  const refDoc = await addDoc(
    collection(firestore, 'customers'),
    {
      ...data,
      createdAt: new Date().toISOString()
    }
  )

  return refDoc.id
}

export const uploadImage = async (
  file: File
) => {
  const storageInstance = storage()

  if (!storageInstance) return ''

  const imageRef = ref(
    storageInstance,
    `products/${Date.now()}-${file.name}`
  )

  await uploadBytes(
    imageRef,
    file
  )

  return await getDownloadURL(imageRef)
}

/* =========================================================
   STORE QUERIES
========================================================= */

export const productsQuery = () => {
  const firestore = db()

  if (!firestore) return null

  return query(
    collection(firestore, 'products'),
    orderBy('createdAt', 'desc')
  )
}

export const categoriesQuery = () => {
  const firestore = db()

  if (!firestore) return null

  return query(
    collection(firestore, 'categories'),
    orderBy('createdAt', 'desc')
  )
}

export const ordersQuery = () => {
  const firestore = db()

  if (!firestore) return null

  return query(
    collection(firestore, 'orders'),
    orderBy('createdAt', 'desc')
  )
}

export const customersQuery = () => {
  const firestore = db()

  if (!firestore) return null

  return query(
    collection(firestore, 'customers'),
    orderBy('createdAt', 'desc')
  )
}

/* =========================================================
   BOOKING SLOT HELPERS
========================================================= */

const createSlotId = (
  branchId: string,
  date: string,
  time: string
) => {
  return `${branchId}_${date}_${time}`
}

/* =========================================================
   CREATE DIRECT BOOKING
   MAX 4 ACTIVE BOOKINGS PER SLOT
========================================================= */

export const createBooking = async (
  data: Omit<
    BookingDoc,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'status'
    | 'countsTowardCapacity'
  >
) => {
  const firestore = db()

  if (!firestore) {
    throw new Error('Firebase is not configured.')
  }

  const branch = getBranch(data.branchId)

  if (!branch) {
    throw new Error('الفرع غير موجود.')
  }

  if (branch.type !== 'direct') {
    throw new Error(
      'هذا الفرع متاح للحجز عن طريق واتساب فقط.'
    )
  }

  const slotId = createSlotId(
    data.branchId,
    data.date,
    data.time
  )

  const bookingRef = doc(
    collection(firestore, 'bookings')
  )

  const slotRef = doc(
    firestore,
    'bookingSlots',
    slotId
  )

  await runTransaction(
    firestore,
    async transaction => {
      const slotSnapshot =
        await transaction.get(slotRef)

      const currentCount =
        slotSnapshot.exists()
          ? Number(
              slotSnapshot.data().currentCount || 0
            )
          : 0

      if (
        currentCount >=
        MAX_BOOKINGS_PER_SLOT
      ) {
        throw new Error(
          'هذا الموعد مكتمل. من فضلك اختاري موعدًا آخر.'
        )
      }

      const now =
        new Date().toISOString()

      transaction.set(
        bookingRef,
        {
          ...data,
          status: 'pending',
          countsTowardCapacity: true,
          createdAt: now,
          updatedAt: now
        }
      )

      transaction.set(
        slotRef,
        {
          branchId: data.branchId,
          branchName: data.branchName,
          date: data.date,
          time: data.time,
          currentCount:
            currentCount + 1,
          updatedAt: now
        }
      )
    }
  )

  return bookingRef.id
}

/* =========================================================
   UPDATE BOOKING
========================================================= */

export const updateBooking = async (
  id: string,
  data: Partial<BookingDoc>
) => {
  const firestore = db()

  if (!firestore) {
    throw new Error('Firebase is not configured.')
  }

  const bookingRef = doc(
    firestore,
    'bookings',
    id
  )

  await updateDoc(
    bookingRef,
    {
      ...data,
      updatedAt:
        new Date().toISOString()
    }
  )
}

/* =========================================================
   CANCEL BOOKING
   DO NOT DELETE
========================================================= */

export const cancelBooking = async (
  id: string
) => {
  const firestore = db()

  if (!firestore) {
    throw new Error('Firebase is not configured.')
  }

  const bookingRef = doc(
    firestore,
    'bookings',
    id
  )

  await runTransaction(
    firestore,
    async transaction => {
      const bookingSnapshot =
        await transaction.get(bookingRef)

      if (!bookingSnapshot.exists()) {
        throw new Error(
          'الحجز غير موجود.'
        )
      }

      const booking =
        bookingSnapshot.data()

      if (
        booking.status === 'cancelled'
      ) {
        return
      }

      const slotId = createSlotId(
        booking.branchId,
        booking.date,
        booking.time
      )

      const slotRef = doc(
        firestore,
        'bookingSlots',
        slotId
      )

      const slotSnapshot =
        await transaction.get(slotRef)

      const currentCount =
        slotSnapshot.exists()
          ? Number(
              slotSnapshot.data().currentCount || 0
            )
          : 0

      const now =
        new Date().toISOString()

      transaction.update(
        bookingRef,
        {
          status: 'cancelled',
          countsTowardCapacity: false,
          updatedAt: now
        }
      )

      if (
        slotSnapshot.exists()
      ) {
        transaction.update(
          slotRef,
          {
            currentCount:
              Math.max(
                0,
                currentCount - 1
              ),
            updatedAt: now
          }
        )
      }
    }
  )
}

/* =========================================================
   CONFIRM BOOKING
========================================================= */

export const confirmBooking = async (
  id: string
) => {
  const firestore = db()

  if (!firestore) {
    throw new Error('Firebase is not configured.')
  }

  await updateDoc(
    doc(
      firestore,
      'bookings',
      id
    ),
    {
      status: 'confirmed',
      updatedAt:
        new Date().toISOString()
    }
  )
}

/* =========================================================
   BOOKINGS QUERY
========================================================= */

export const bookingsQuery = () => {
  const firestore = db()

  if (!firestore) return null

  return query(
    collection(
      firestore,
      'bookings'
    ),
    orderBy(
      'createdAt',
      'desc'
    )
  )
}

/* =========================================================
   GET BOOKINGS FOR A SLOT
========================================================= */

export const getSlotBookingCount = async (
  branchId: string,
  date: string,
  time: string
) => {
  const firestore = db()

  if (!firestore) {
    throw new Error('Firebase is not configured.')
  }

  const slotId = createSlotId(
    branchId,
    date,
    time
  )

  const slotSnapshot =
    await getDocs(
      query(
        collection(
          firestore,
          'bookingSlots'
        ),
        where(
          '__name__',
          '==',
          slotId
        )
      )
    )

  if (
    slotSnapshot.empty
  ) {
    return 0
  }

  return Number(
    slotSnapshot.docs[0].data()
      .currentCount || 0
  )
}

/* =========================================================
   ONLINE CONSULTATION
========================================================= */

export const createOnlineConsultation =
  async (
    data: Omit<
      OnlineConsultationDoc,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'price'
      | 'status'
    >
  ) => {
    const firestore = db()

    if (!firestore) {
      throw new Error(
        'Firebase is not configured.'
      )
    }

    const now =
      new Date().toISOString()

    const refDoc =
      await addDoc(
        collection(
          firestore,
          'onlineConsultations'
        ),
        {
          ...data,
          price:
            ONLINE_CONSULTATION_PRICE,
          status: 'pending',
          createdAt: now,
          updatedAt: now
        }
      )

    return refDoc.id
  }

/* =========================================================
   ONLINE CONSULTATION RECEIPT
========================================================= */

export const uploadOnlineReceipt =
  async (
    file: File,
    consultationId: string
  ) => {
    const storageInstance =
      storage()

    if (!storageInstance) {
      throw new Error(
        'Firebase Storage is not configured.'
      )
    }

    const fileRef = ref(
      storageInstance,
      `online-consultations/${consultationId}/${Date.now()}-${file.name}`
    )

    await uploadBytes(
      fileRef,
      file
    )

    return await getDownloadURL(
      fileRef
    )
  }

/* =========================================================
   ONLINE CONSULTATIONS QUERY
========================================================= */

export const onlineConsultationsQuery =
  () => {
    const firestore = db()

    if (!firestore) return null

    return query(
      collection(
        firestore,
        'onlineConsultations'
      ),
      orderBy(
        'createdAt',
        'desc'
      )
    )
  }

/* =========================================================
   UPDATE ONLINE CONSULTATION
========================================================= */

export const updateOnlineConsultation =
  async (
    id: string,
    data: Partial<
      OnlineConsultationDoc
    >
  ) => {
    const firestore = db()

    if (!firestore) {
      throw new Error(
        'Firebase is not configured.'
      )
    }

    await updateDoc(
      doc(
        firestore,
        'onlineConsultations',
        id
      ),
      {
        ...data,
        updatedAt:
          new Date().toISOString()
      }
    )
  }

/* =========================================================
   MEDICINE ORDER
========================================================= */

export const createMedicineOrder =
  async (
    data: Omit<
      MedicineOrderDoc,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'status'
    >
  ) => {
    const firestore = db()

    if (!firestore) {
      throw new Error(
        'Firebase is not configured.'
      )
    }

    const now =
      new Date().toISOString()

    const refDoc =
      await addDoc(
        collection(
          firestore,
          'medicineOrders'
        ),
        {
          ...data,
          status: 'pending',
          createdAt: now,
          updatedAt: now
        }
      )

    return refDoc.id
  }

/* =========================================================
   MEDICINE ORDERS QUERY
========================================================= */

export const medicineOrdersQuery =
  () => {
    const firestore = db()

    if (!firestore) return null

    return query(
      collection(
        firestore,
        'medicineOrders'
      ),
      orderBy(
        'createdAt',
        'desc'
      )
    )
  }

/* =========================================================
   UPDATE MEDICINE ORDER
========================================================= */

export const updateMedicineOrder =
  async (
    id: string,
    data: Partial<
      MedicineOrderDoc
    >
  ) => {
    const firestore = db()

    if (!firestore) {
      throw new Error(
        'Firebase is not configured.'
      )
    }

    await updateDoc(
      doc(
        firestore,
        'medicineOrders',
        id
      ),
      {
        ...data,
        updatedAt:
          new Date().toISOString()
      }
    )
  }

/* =========================================================
   DASHBOARD STATS
========================================================= */

export const getDashboardStats =
  async () => {
    const firestore = db()

    if (!firestore) {
      return {
        bookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        onlineConsultations: 0,
        medicineOrders: 0,
        customers: 0
      }
    }

    const [
      bookingsSnapshot,
      onlineSnapshot,
      medicineSnapshot,
      customersSnapshot
    ] = await Promise.all([
      getDocs(
        collection(
          firestore,
          'bookings'
        )
      ),

      getDocs(
        collection(
          firestore,
          'onlineConsultations'
        )
      ),

      getDocs(
        collection(
          firestore,
          'medicineOrders'
        )
      ),

      getDocs(
        collection(
          firestore,
          'customers'
        )
      )
    ])

    const bookings =
      bookingsSnapshot.docs.map(
        item => item.data()
      )

    return {
      bookings:
        bookingsSnapshot.size,

      confirmedBookings:
        bookings.filter(
          item =>
            item.status ===
            'confirmed'
        ).length,

      cancelledBookings:
        bookings.filter(
          item =>
            item.status ===
            'cancelled'
        ).length,

      onlineConsultations:
        onlineSnapshot.size,

      medicineOrders:
        medicineSnapshot.size,

      customers:
        customersSnapshot.size
    }
  }

/* =========================================================
   UPDATE GENERIC BOOKING STATUS
========================================================= */

export const updateBookingStatus =
  async (
    id: string,
    status: BookingStatus
  ) => {
    if (status === 'cancelled') {
      await cancelBooking(id)
      return
    }

    if (status === 'confirmed') {
      await confirmBooking(id)
      return
    }

    const firestore = db()

    if (!firestore) {
      throw new Error(
        'Firebase is not configured.'
      )
    }

    await updateDoc(
      doc(
        firestore,
        'bookings',
        id
      ),
      {
        status,
        updatedAt:
          new Date().toISOString()
      }
    )
  }

/* =========================================================
   BRANCH QUERY
========================================================= */

export const getBranches =
  (): BranchDoc[] => {
    return BRANCHES
  }

export const getDirectBookingBranches =
  (): BranchDoc[] => {
    return BRANCHES.filter(
      branch =>
        branch.type === 'direct'
    )
  }

export const getWhatsAppBranches =
  (): BranchDoc[] => {
    return BRANCHES.filter(
      branch =>
        branch.type === 'whatsapp'
    )
  }

  