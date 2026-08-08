'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type CartItem = {
  id: string
  name: string
  price: string
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
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('bnh-cart')

    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch {
        setCart([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bnh-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id)

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        )
      }

      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}