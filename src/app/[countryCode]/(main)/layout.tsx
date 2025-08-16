import { getBaseURL } from "@/lib/util/env"
import { AuthProvider } from "@/lib/context/auth-context"
import Footer from "@/modules/layout/templates/footer"
import ClientNavigationWrapper from "@/modules/layout/components/client-navigation-wrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider initialCustomer={null}>
      <ClientNavigationWrapper />
      {props.children}
      <Footer />
    </AuthProvider>
  )
}
