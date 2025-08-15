import { CartProvider } from "@/lib/context/cart-context"
import { retrieveCart } from "@/lib/data/cart"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import CartDrawer from "@/modules/cart/components/cart-drawer"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"

export default async function CartButton({ customer }: { customer: any }) {
  const cart = await retrieveCart().catch(() => null)
  let freeShippingPrices: StoreFreeShippingPrice[] = []

  if (cart) {
    freeShippingPrices = await listCartFreeShippingPrices(cart.id)
  }

  return (
    <CartProvider cart={cart}>
      <CartDrawer customer={customer} freeShippingPrices={freeShippingPrices} />
    </CartProvider>
  )
}
