import React from 'react'
import Link from 'next/link'


interface Props{
    href: string
    title: string
}
const Button = ({href,title}: Props) => {
  return (
    <Link className="bg-rose-500 hover:bg-rose-300 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-rose-300/50 " href={href}>{title}</Link>
  )
}

export default Button