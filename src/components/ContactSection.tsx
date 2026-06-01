import { useState, FormEvent } from 'react'
import FadeIn from './ui/FadeIn'

const SERVICES = [
  'Bókun Setup & Architecture',
  'OTA Optimization (Viator / GetYourGuide)',
  'Rejection Recovery',
  'Multi-Channel Distribution',
  'Direct Booking Website',
  'Full Account Management',
  'Other',
]

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', service: '', message: '' }

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setErrorMsg(data.error || `Server error ${res.status}`)
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg('Could not reach the server. Make sure you ran npm run dev (not just vite).')
      setStatus('error')
    }
  }

  const inputCls = `w-full bg-white/5 border border-[#D7E2EA]/15 rounded-2xl
    px-5 py-4 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA]/30
    focus:outline-none focus:border-[#D7E2EA]/50 transition-colors duration-200
    font-kanit`

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-10
        px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 sm:mb-20">
          <FadeIn y={40} className="flex-1">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 7.5vw, 100px)' }}
            >
              Let&apos;s<br />Work
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} y={20} className="lg:max-w-sm">
            <p
              className="text-[#D7E2EA] font-light leading-relaxed opacity-60"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
            >
              Ready to scale your tour operation to Page 1? Fill in the form and I'll get back to you within 24 hours.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — contact info */}
          <FadeIn delay={0.1} y={30} className="flex flex-col gap-8">
            {[
              { label: 'Email', value: 'shadabsayyed1932@gmail.com' },
              { label: 'Specialization', value: 'Bókun · Viator · GetYourGuide' },
              { label: 'Availability', value: 'Mon – Fri, 9am – 6pm CET' },
              { label: 'Response Time', value: 'Within 24 hours' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-b border-[#D7E2EA]/10 pb-6">
                <span
                  className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40"
                  style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[#D7E2EA] font-medium"
                  style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={0.2} y={30}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-20 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  ✓
                </div>
                <h3 className="text-[#D7E2EA] font-black uppercase text-2xl">Message Sent!</h3>
                <p className="text-[#D7E2EA] opacity-50 font-light">
                  I'll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-[#D7E2EA] opacity-50 hover:opacity-100 font-light uppercase tracking-widest text-sm underline transition-opacity"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                    autoComplete="name"
                    className={inputCls}
                    style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                  />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    autoComplete="email"
                    className={inputCls}
                    style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    autoComplete="tel"
                    className={inputCls}
                    style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                  />
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputCls} ${!form.service ? 'text-[#D7E2EA]/30' : ''}`}
                    style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                  >
                    <option value="" disabled className="bg-[#0C0C0C]">Select a Service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-[#0C0C0C] text-[#D7E2EA]">{s}</option>
                    ))}
                  </select>
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project *"
                  required
                  rows={5}
                  className={`${inputCls} resize-none`}
                  style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                />

                {status === 'error' && (
                  <div className="rounded-2xl border border-red-400/30 bg-red-400/5 px-4 py-3">
                    <p className="text-red-400 font-light text-sm">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full font-kanit font-medium uppercase tracking-widest text-white
                    px-12 py-4 text-sm cursor-pointer self-start
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-opacity duration-200"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
