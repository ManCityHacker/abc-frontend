import NavigationContent from "@/modules/layout/components/navigation-content"
import { B2BCustomer } from "@/types/global"

interface NavigationHeaderProps {
  customer?: B2BCustomer | null
}

export async function NavigationHeader({ customer = null }: NavigationHeaderProps = {}) {
  return <NavigationContent customer={customer} />
}
