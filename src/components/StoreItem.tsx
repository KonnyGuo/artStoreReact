import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/shoppingCartContext"


type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  const quantity = getItemQuantity(id)
  return (
  <Card className="h-100">
    <Card.Img 
      variant="top" 
      src={imgUrl} 
      height="400px" 
      style={{ objectFit: "cover" }} />
  <Card.Body className="d-flex flex-column">
    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
      <span className="fs-2">{name}</span>
      <span className="ms-2 text-muted">{formatCurrency(price)}</span>
    </Card.Title>
    <div className="mt-auto">
      {quantity === 0 ? (
        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
      ) : <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
        <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
          <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
          <span className="fs-3">{quantity}</span> in Cart
          <Button onClick={() => increaseCartQuantity(id)}>+</Button>
        </div>
        <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
      </div>
      }
    </div>
  </Card.Body>
  </Card>
  )
}

// This StoreItem component displays information and add to cart buttons for a single store item:

// Gets item info (id, name, price, imgUrl) and shopping cart functions from props and context.
// Calls getItemQuantity to get current quantity in cart for this item.
// Conditionally shows "Add to Cart" button if quantity is 0.
// Otherwise renders the quantity with increment/decrement buttons.
// Allows increasing or decreasing quantity by calling the appropriate context functions.
// Remove from cart button calls removeFromCart function.
// Card component displays image, name, price nicely.
// Formats price using the formatCurrency utility.
// Utilizes Bootstrap Card and Button components for styling.
// So in summary, it displays the item info along with buttons to add to cart or adjust quantity if already in cart.

// The shopping cart context handles the underlying data changes.