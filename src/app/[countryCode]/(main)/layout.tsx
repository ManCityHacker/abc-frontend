import React from "react"
import { Metadata } from "next"
import { getBaseURL } from "@/lib/util/env"
import { AuthProvider } from "@/lib/context/auth-context"
import Footer from "@/modules/layout/templates/footer"
import { NavigationHeader } from "@/modules/layout/templates/nav"
import ClientCartProvider from "@/modules/cart/components/client-cart-provider"
import { retrieveCustomer } from "@/lib/data/customer"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()

  return (
    <AuthProvider initialCustomer={customer}>
      <ClientCartProvider>
        <NavigationHeader />
        {props.children}
        <Footer />
      </ClientCartProvider>
    </AuthProvider>
  )
}
