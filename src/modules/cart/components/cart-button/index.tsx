import { CartProvider } from "@/lib/context/cart-context"
import CartDrawer from "@/modules/cart/components/cart-drawer"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { B2BCustomer, B2BCart } from "@/types/global"

interface CartButtonProps {
  cart?: B2BCart | null
  customer?: B2BCustomer | null
  freeShippingPrices?: StoreFreeShippingPrice[]
}

export default function CartButton({ 
  cart = null, 
  customer = null, 
  freeShippingPrices = [] 
}: CartButtonProps = {}) {
  return (
    <CartProvider cart={cart}>
      <CartDrawer customer={customer} freeShippingPrices={freeShippingPrices} />
    </CartProvider>
  )
}
