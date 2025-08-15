import CartButton from "@/modules/cart/components/cart-button"
import { retrieveCustomer } from "@/lib/data/customer"
import NavigationContent from "./navigation-content"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <NavigationContent
      customer={customer}
      cartButton={<CartButton customer={customer} />}
    />
  )
}

export default NavigationHeader
