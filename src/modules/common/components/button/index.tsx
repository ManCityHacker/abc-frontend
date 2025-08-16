import { clx, Button as MedusaButton } from "@medusajs/ui"
type ButtonProps = React.ComponentProps<typeof MedusaButton>

const Button = ({
  children,
  className: classNameProp,
  ...props
}: ButtonProps): React.ReactNode => {
  const variant = props.variant ?? "primary"

  const className = clx(classNameProp, {
    "!shadow-borders-base !border-none bg-gray-400 text-white":
      props.disabled,
    "!shadow-none bg-abc-red text-white hover:bg-abc-accent hover:text-abc-red":
      variant === "primary" && !props.disabled,
    "!shadow-none bg-transparent text-neutral-900": variant === "transparent",
    "!shadow-borders-base !border-none": 
      variant === "secondary" && !props.disabled,
  })
  console.log(className)
  return (
    <MedusaButton
      className={`!rounded-full text-sm font-normal ${className}`}
      variant={variant}
      {...props}
    >
      {children}
    </MedusaButton>
  )
}

export default Button
