'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  oldPrice?: number
  category: string
  imageUrl?: string
  quantity: number
}

type CartContextValue = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const CART_STORAGE_KEY = 'bnh-cart'

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  // ================= LOAD CART =================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)

      if (saved) {
        const parsed = JSON.parse(saved)

        if (Array.isArray(parsed)) {
          setCart(parsed)
        }
      }
    } catch {
      setCart([])
    }

    setReady(true)
  }, [])

  // ================= SAVE CART =================

  useEffect(() => {
    if (!ready) return

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    )
  }, [cart, ready])

  // ================= ADD TO CART =================

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (cartItem) => cartItem.id === item.id
      )

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + item.quantity,
              }
            : cartItem
        )
      }

      return [
        ...prev,
        {
          ...item,
          quantity: Math.max(1, item.quantity),
        },
      ]
    })
  }

  // ================= REMOVE =================

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  // ================= UPDATE QUANTITY =================

  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    )
  }

  // ================= CLEAR =================

  const clearCart = () => {
    setCart([])
  }

  // ================= TOTAL ITEMS =================

  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  }, [cart])

  // ================= SUBTOTAL =================

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    )
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}