import FadeIn from './ui/FadeIn'
import ContactButton from './ui/ContactButton'

const PLANS = [
  {
    name: 'Hourly Rate',
    price: '€15',
    unit: '/ hour',
    tag: 'Flexible',
    billing: 'billed weekly / monthly',
    description: 'Perfect for ongoing maintenance, quick tasks, and flexible day-to-day support.',
    features: [
      'OTA listing audits & quick fixes',
      'Bókun troubleshooting & updates',
      'Resource & availability adjustments',
      'Platform health monitoring',
      'Ad-hoc consulting calls',
      'No long-term commitment',
    ],
    highlight: false,
  },
  {
    name: 'Fixed Project',
    price: 'By Quote',
    unit: '',
    tag: 'Most popular',
    billing: 'one-off project fee',
    description: 'Best for well-defined projects with a specific scope of work and set deadlines.',
    features: [
      'Full Bókun setup & architecture',
      'OTA channel integration & optimisation',
      'Product listings & resource mapping',
      'Rejection recovery & DSA compliance',
      'Page 1 ranking strategy',
      'Multi-channel distribution setup',
      'Delivery within agreed timeline',
    ],
    highlight: true,
  },
  {
    name: 'Custom Retainer',
    price: 'Tailored',
    unit: '',
    tag: 'Long-term',
    billing: 'monthly flat rate',
    description: 'Designed for long-term partnerships or unique business workflows.',
    features: [
      'Everything in Fixed Project',
      'Dedicated ongoing account management',
      'All OTA platforms managed',
      'Direct booking website maintenance',
      'B2B agent network & payment gateways',
      'Monthly automated reporting',
      'Priority support & strategy calls',
    ],
    highlight: false,
  },
]

export default function PricingSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 110px)' }}
        >
          Pricing
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-[#0C0C0C] font-light text-center mb-16 sm:mb-20 md:mb-28 opacity-50 uppercase tracking-widest"
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
        >
          Transparent pricing — no hidden fees
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PLANS.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 0.1} y={40}>
            <div
              className={`relative rounded-[32px] p-8 md:p-10 h-full flex flex-col gap-8
                ${plan.highlight
                  ? 'bg-[#0C0C0C] text-[#D7E2EA]'
                  : 'bg-[#F5F5F5] text-[#0C0C0C] border border-[#0C0C0C]/10'
                }`}
            >
              {plan.highlight && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2
                    rounded-full px-4 py-1 text-white font-medium uppercase tracking-widest text-xs whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  {plan.tag}
                </span>
              )}

              <div className="flex flex-col gap-3">
                <span
                  className={`font-medium uppercase tracking-widest text-sm
                    ${plan.highlight ? 'opacity-60' : 'opacity-50'}`}
                >
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                  >
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span
                      className={`font-light ${plan.highlight ? 'opacity-50' : 'opacity-40'}`}
                      style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                    >
                      {plan.unit}
                    </span>
                  )}
                </div>
                <span
                  className={`italic font-light ${plan.highlight ? 'opacity-40' : 'opacity-35'}`}
                  style={{ fontSize: 'clamp(0.72rem, 1vw, 0.875rem)' }}
                >
                  {plan.billing}
                </span>
                <p
                  className={`font-light leading-relaxed ${plan.highlight ? 'opacity-70' : 'opacity-60'}`}
                  style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                >
                  {plan.description}
                </p>
              </div>

              <div className={`h-px w-full ${plan.highlight ? 'bg-white/10' : 'bg-[#0C0C0C]/10'}`} />

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black
                        ${plan.highlight ? 'bg-white/15 text-white' : 'bg-[#0C0C0C]/10 text-[#0C0C0C]'}`}
                    >
                      ✓
                    </span>
                    <span
                      className={`font-light leading-snug ${plan.highlight ? 'opacity-80' : 'opacity-70'}`}
                      style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)' }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={plan.highlight ? '' : 'flex justify-start'}>
                {plan.highlight ? (
                  <ContactButton />
                ) : (
                  <a
                    href="#contact"
                    className="inline-block rounded-full border-2 border-[#0C0C0C] text-[#0C0C0C]
                      font-kanit font-medium uppercase tracking-widest
                      px-8 py-3 text-sm
                      hover:bg-[#0C0C0C] hover:text-white transition-colors duration-200"
                  >
                    Get Started
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
