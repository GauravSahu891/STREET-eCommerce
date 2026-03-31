import React, { createContext, useContext, useReducer, useEffect } from 'react'

// =====================================================
// CART CONTEXT
// =====================================================

const CartContext = createContext(null)

const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload }

    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1, size, color } = action.payload
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      )

      if (existingIndex >= 0) {
        const updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        return { ...state, items: updatedItems }
      }

      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        size: size || (product.sizes && product.sizes[0]) || 'M',
        color: color || (product.colors && product.colors[0]) || '#1a1a1a',
        colorName: product.colorNames ? product.colorNames[0] : 'Default',
        quantity,
      }

      return { ...state, items: [...state.items, newItem] }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { id, size, color } = action.payload
      const updatedItems = state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
      return { ...state, items: updatedItems }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, size, color, quantity } = action.payload
      if (quantity <= 0) {
        const updatedItems = state.items.filter(
          (item) => !(item.id === id && item.size === size && item.color === color)
        )
        return { ...state, items: updatedItems }
      }
      const updatedItems = state.items.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
      return { ...state, items: updatedItems }
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] }

    default:
      return state
  }
}

const initialState = {
  items: [],
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('street_cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart })
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('street_cart', JSON.stringify(state.items))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [state.items])

  // Computed values
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const cartSubtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartSavings = state.items.reduce(
    (total, item) =>
      total + (item.originalPrice - item.price) * item.quantity,
    0
  )

  const shippingCost = cartSubtotal > 100 ? 0 : 9.99
  const cartTotal = cartSubtotal + shippingCost

  // Actions
  const addToCart = (product, quantity = 1, size = null, color = null) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, quantity, size, color },
    })
  }

  const removeFromCart = (id, size, color) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { id, size, color },
    })
  }

  const updateQuantity = (id, size, color, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, size, color, quantity },
    })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const isInCart = (id) => state.items.some((item) => item.id === id)

  const getItemCount = (id) => {
    const items = state.items.filter((item) => item.id === id)
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems: state.items,
    cartCount,
    cartSubtotal,
    cartSavings,
    cartTotal,
    shippingCost,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

export default CartContext
