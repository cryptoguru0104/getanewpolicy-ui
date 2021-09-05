import React from 'react'
import { ReactComponent as Arrow } from 'icons/arrow-right-white.svg'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ArrowButton: React.FC<Props> = ({
  className,
  children,
  ...props
}) => (
  <button className={`${className} with-arrow`} {...props}>
    {children}
    <Arrow />
  </button>
)

export default ArrowButton
