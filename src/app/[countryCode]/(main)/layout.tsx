import { getBaseURL } from "@/lib/util/env"
import { AuthProvider } from "@/lib/context/auth-context"
import Footer from "@/modules/layout/templates/footer"
import { NavigationHeader } from "@/modules/layout/templates/nav"
import ClientCartProvider from "@/modules/cart/components/client-cart-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider initialCustomer={null}>
      <ClientCartProvider>
        <NavigationHeader />
        {props.children}
        <Footer />
      </ClientCartProvider>
    </AuthProvider>
  )
}
