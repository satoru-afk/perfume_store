'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { Perfume } from '@/constants/perfumes'

interface CartItem extends Perfume {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Perfume) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isHydrated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'little_scent_cart_v2' // Versioned key for future migrations

// Custom error class for cart operations
class CartStorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CartStorageError'
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Safe storage operations with error handling
  const getStoredCart = useCallback((): CartItem[] => {
    try {
      const storedData = sessionStorage.getItem(CART_STORAGE_KEY)
      if (!storedData) return []
      
      const parsed = JSON.parse(storedData)
      if (!Array.isArray(parsed)) {
        throw new CartStorageError('Invalid cart format')
      }
      
      // Basic validation of cart items
      return parsed.filter((item) => (
        item?.id &&
        item?.name &&
        typeof item?.price === 'number' &&
        typeof item?.quantity === 'number' &&
        item?.quantity > 0
      ))
    } catch (error) {
      console.error('Failed to load cart from storage:', error)
      sessionStorage.removeItem(CART_STORAGE_KEY)
      return []
    }
  }, [])

  const persistCart = useCallback((items: CartItem[]) => {
    try {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to persist cart:', error)
      // Consider falling back to in-memory only or showing user notification
    }
  }, [])

  // Hydrate from storage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedCart = getStoredCart()
      setCartItems(storedCart)
      setIsHydrated(true)
    }, 0) // Small delay to avoid hydration flash

    return () => clearTimeout(timer)
  }, [getStoredCart])

  // Persist only when cart changes (not during hydration)
  useEffect(() => {
    if (isHydrated) {
      persistCart(cartItems)
    }
  }, [cartItems, isHydrated, persistCart])

  // Memoized cart operations to prevent unnecessary re-renders
  const addToCart = useCallback((product: Perfume) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      const newItems = existingItem
        ? prevItems.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }  
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }]
      
      return newItems
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCartItems([])
    sessionStorage.removeItem(CART_STORAGE_KEY)
  }, [])

  // Memoized derived values
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isHydrated
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}