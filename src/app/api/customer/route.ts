import { NextResponse } from "next/server"
import { retrieveCustomer } from "@/lib/data/customer"

export async function GET() {
  try {
    const customer = await retrieveCustomer()
    return NextResponse.json({ customer })
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve customer" }, { status: 500 })
  }
}
