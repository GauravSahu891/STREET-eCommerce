import { useCartContext } from '../context/CartContext'

// =====================================================
// USECART CUSTOM HOOK
// =====================================================

const useCart = () => {
  return useCartContext()
}

export default useCart
