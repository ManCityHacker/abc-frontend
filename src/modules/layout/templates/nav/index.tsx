import { retrieveCustomer } from "@/lib/data/customer"
import NavigationContent from "@/modules/layout/components/navigation-content"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  return <NavigationContent customer={customer} />
}
