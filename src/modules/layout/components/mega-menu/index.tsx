import MegaMenu from "./mega-menu"

interface MegaMenuWrapperProps {
  categories?: any[]
}

export function MegaMenuWrapper({ categories = [] }: MegaMenuWrapperProps = {}) {
  return <MegaMenu categories={categories} />
}

export default MegaMenuWrapper
