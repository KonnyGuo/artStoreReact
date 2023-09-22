import { ReactNode, createContext, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
  const [isOpen, setIsOpen] = useState(false)

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id ===id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id ===id) == null) {
        return [...currItems, {id, quantity: 1}]
      } else {
        return currItems.map(item => {
          if (item.id ===id) {
          return { ...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
      } 
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id ===id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id ===id) {
          return { ...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      } 
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
  <ShoppingCartContext.Provider 
    value={{
      getItemQuantity, 
      increaseCartQuantity, 
      decreaseCartQuantity, 
      removeFromCart,
      cartItems,
      cartQuantity,
      openCart,
      closeCart
      }}>
    {children}
    <ShoppingCart isOpen={isOpen} />
  </ShoppingCartContext.Provider>
  )
}

// This ShoppingCartProvider component handles creating the shopping cart context and managing the cart state:

// Creates a ShoppingCartContext using React's context API.
// Exports a useShoppingCart hook to access the context.
// Uses the useLocalStorage hook to persist cart items to localStorage.
// Manages an isOpen state to track if cart sidebar is open.
// Calculates total cart quantity for badge.
// Defines functions like openCart, closeCart to update state.
// Functions to add, remove, update quantities of items.
// Uses cartItems state and dispatches actions like setCartItems to update it.
// All state and actions put into ShoppingCartContext value.
// Provider makes context available to children components.
// Cart persistent in localStorage across sessions.
// So in summary, it provides global access to cart state and dispatch functions via React context. Components can use the useShoppingCart hook to access them. State is persisted locally.