interface LiveProjectButtonProps {
  href?: string
  label?: string
}

export default function LiveProjectButton({ href, label = 'Case Study' }: LiveProjectButtonProps) {
  const cls = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
    font-kanit font-medium uppercase tracking-widest
    px-8 py-3 sm:px-10 sm:py-3.5
    text-sm sm:text-base whitespace-nowrap
    hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    )
  }

  return <button className={cls}>{label}</button>
}
