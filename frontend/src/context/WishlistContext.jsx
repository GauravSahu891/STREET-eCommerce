import React, { createContext, useContext, useReducer, useEffect } from 'react'

// =====================================================
// WISHLIST CONTEXT
// =====================================================

const WishlistContext = createContext(null)

const WISHLIST_ACTIONS = {
  LOAD: 'LOAD',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  TOGGLE: 'TOGGLE',
  CLEAR: 'CLEAR',
}

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.LOAD:
      return { ...state, items: action.payload }

    case WISHLIST_ACTIONS.ADD: {
      const exists = state.items.find((p) => p.id === action.payload.id)
      if (exists) return state
      return { ...state, items: [...state.items, action.payload] }
    }

    case WISHLIST_ACTIONS.REMOVE:
      return { ...state, items: state.items.filter((p) => p.id !== action.payload) }

    case WISHLIST_ACTIONS.TOGGLE: {
      const exists = state.items.find((p) => p.id === action.payload.id)
      if (exists) {
        return { ...state, items: state.items.filter((p) => p.id !== action.payload.id) }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case WISHLIST_ACTIONS.CLEAR:
      return { ...state, items: [] }

    default:
      return state
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('street_wishlist')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          dispatch({ type: WISHLIST_ACTIONS.LOAD, payload: parsed })
        }
      }
    } catch (e) {
      console.error('Error loading wishlist:', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('street_wishlist', JSON.stringify(state.items))
    } catch (e) {
      console.error('Error saving wishlist:', e)
    }
  }, [state.items])

  const addToWishlist = (product) =>
    dispatch({ type: WISHLIST_ACTIONS.ADD, payload: product })

  const removeFromWishlist = (id) =>
    dispatch({ type: WISHLIST_ACTIONS.REMOVE, payload: id })

  const toggleWishlist = (product) =>
    dispatch({ type: WISHLIST_ACTIONS.TOGGLE, payload: product })

  const clearWishlist = () =>
    dispatch({ type: WISHLIST_ACTIONS.CLEAR })

  const isWishlisted = (id) => state.items.some((p) => p.id === id)

  const wishlistCount = state.items.length

  const value = {
    wishlistItems: state.items,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isWishlisted,
  }

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export const useWishlistContext = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlistContext must be used within a WishlistProvider')
  }
  return context
}

export default WishlistContext
