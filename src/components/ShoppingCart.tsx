import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart ({isOpen}: ShoppingCartProps) {
  const {closeCart, cartItems} = useShoppingCart()
  return (
  <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>
      Cart
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Stack gap={3}>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item}/>
          ))}
        <div className="ms-auto fw-bold fs-5">
          Total {formatCurrency(cartItems.reduce((total, cartItem) => {
            const item = storeItems.find(i => i.id ===cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
          } ,0
          ))}
        </div>
      </Stack>
    </Offcanvas.Body>
  </Offcanvas>
  )
}

// This ShoppingCart component renders the cart sidebar that displays the items in the cart.:

// Gets cartItems array and closeCart function from the shopping cart context.
// Renders a Bootstrap Offcanvas component as the sidebar.
// show and onHide props control open/closed state based on isOpen prop.
// Loops through cartItems array using .map().
// Renders a <CartItem> component for each item, passing id and quantity.
// CartItem handles displaying item info, quantity, price etc.
// Calculates total price by reducing cartItems array.
// Finds item price via id lookup on each iteration.
// Multiplies by quantity and accumulates total.
// Formats total with formatCurrency function.
// Display total price in the sidebar.
// So in summary, it renders an Offcanvas sidebar that displays all the CartItem components along with a total price calculated from the cart contents.

// The CartItem component encapsulates item display, while ShoppingCart handles the sidebar and total price.