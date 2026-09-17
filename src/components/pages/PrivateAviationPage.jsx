import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPinned,
  Phone,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

const iconMap = {
  clock: Clock3,
  shield: ShieldCheck,
  route: Route,
  briefcase: Briefcase,
  timer: Clock3,
  support: Phone,
  star: Star,
  map: MapPinned,
  users: Users,
  plane: Plane,
  sparkle: Sparkles,
};

export function PrivateAviationPage({
  title,
  header,
  eyebrow,
  description,
  breadcrumb = [],
  trustHighlights = [],
  introTitle,
  introParagraphs = [],
  introPoints = [],
  benefits = [],
  fleet = [],
  process = [],
  whyChoose = [],
  useCases = [],
  destinations = [],
  faqs = [],
  internalLinks = [],
  heroImage = '/images/airplane_sunset_bg_1788159475386-optimized.webp',
  introImage = '/images/flystar_vip_charter_1788161931733.webp',
  faqTitle = 'Frequently Asked Questions',
  sectionLabel = 'PRIVATE AVIATION SERVICE',
}) {
  return (
    <div className="w-full bg-[#F3E9D0] text-[#6B4E3D]">
      <section className="relative overflow-hidden border-b border-[#A67C52]/20 bg-[#D9C7B8] pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-[#1d120f]/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F3E9D0]/85">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            {breadcrumb.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3 text-[#F3E9D0]/70" />
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="max-w-3xl">
            <span className="mb-4 block text-[11px] font-bold tracking-[0.24em] text-[#F3E9D0] uppercase">
              {eyebrow}
            </span>
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
              {header}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#F3E9D0]/90 sm:text-base">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-xs border border-[#A67C52] bg-[#A67C52] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-[#8B6639]"
              >
                <span>Request a Charter Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+919355611996"
                className="inline-flex items-center gap-2 rounded-xs border border-[#F3E9D0]/30 bg-[#F3E9D0]/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#F3E9D0]/20"
              >
                <Phone className="h-4 w-4" />
                <span>Call Our Charter Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#A67C52]/20 bg-[#D9C7B8] py-5">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 md:px-10 lg:grid-cols-5 lg:px-12">
          {trustHighlights.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-xs border border-[#A67C52]/20 bg-[#E6D5C1]/55 px-3 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B4E3D]">
              <ShieldCheck className="h-4 w-4 text-[#A67C52]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 md:px-10 lg:px-12 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-sm border border-[#A67C52]/15 bg-[#E6D5C1] p-2 shadow-[0_10px_30px_rgba(107,78,61,0.08)]">
            <div className="relative h-[420px] overflow-hidden rounded-sm">
              <Image src={introImage} alt={introTitle} fill className="object-cover object-center" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>

          <div>
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
              {sectionLabel}
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl lg:text-5xl">
              {introTitle}
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-[#6B4E3D]/90">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {introPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm text-[#6B4E3D]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A67C52]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#A67C52]/20 bg-[#E6D5C1] py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
              SERVICE ADVANTAGES
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
              Why travellers choose this charter service
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = iconMap[benefit.icon] || Plane;
              return (
                <div key={benefit.title} className="rounded-sm border border-[#A67C52]/20 bg-[#D9C7B8] p-6 transition-transform duration-200 hover:-translate-y-1">
                  <div className="mb-4 inline-flex rounded-xs border border-[#A67C52]/25 bg-[#F3E9D0] p-3 text-[#6B4E3D]">
                    <Icon className="h-5 w-5 text-[#A67C52]" />
                  </div>
                  <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-[#6B4E3D]">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B4E3D]/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 md:px-10 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
            FLEET OPTIONS
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
              Aircraft categories matched to the trip
            </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {fleet.map((item, index) => (
            <div key={item.name} className="overflow-hidden rounded-sm border border-[#A67C52]/20 bg-[#D9C7B8]">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={index % 3 === 0 ? '/images/airplane_sunset_bg_1788159475386-optimized.webp' : index % 3 === 1 ? '/images/flystar_himalayan_fleet_1788161946820.webp' : '/images/flystar_vip_charter_1788161931733.webp'}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d120f]/60 to-transparent" />
                <div className="absolute left-4 top-4 rounded-xs bg-[#F3E9D0]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B4E3D]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#6B4E3D]">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6B4E3D]/80">{item.description}</p>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A67C52]">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#A67C52]/20 bg-[#E6D5C1] py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
              BOOKING PROCESS
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
              How charter booking works
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-sm border border-[#A67C52]/20 bg-[#D9C7B8] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67C52]">Step {index + 1}</span>
                  <span className="text-xl font-black text-[#6B4E3D]">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-[#6B4E3D]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6B4E3D]/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 md:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
              WHY BOOKMYCHARDHAM
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
              Premium charter support with practical aviation expertise
            </h2>
            <div className="mt-6 space-y-4">
              {whyChoose.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-sm border border-[#A67C52]/20 bg-[#E6D5C1] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A67C52]" />
                  <p className="text-sm leading-relaxed text-[#6B4E3D]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#A67C52]/20 bg-[#D9C7B8] p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">WHO IT IS FOR</span>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xs border border-[#A67C52]/15 bg-[#F3E9D0] px-3 py-3 text-sm font-semibold text-[#6B4E3D]">
                  <Users className="h-4 w-4 text-[#A67C52]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {destinations.length > 0 && (
        <section className="border-y border-[#A67C52]/20 bg-[#E6D5C1] py-18 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="mb-10 max-w-2xl">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
                DESTINATIONS & ROUTES
              </span>
              <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
                Charter travel can be arranged to and from these routes
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {destinations.map((destination) => (
                <div key={destination} className="flex items-center gap-3 rounded-xs border border-[#A67C52]/15 bg-[#D9C7B8] px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#6B4E3D]">
                  <MapPinned className="h-4 w-4 text-[#A67C52]" />
                  <span>{destination}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 md:px-10 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
            {faqTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-sm border border-[#A67C52]/20 bg-[#E6D5C1] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9C7B8] text-sm font-black text-[#6B4E3D]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#6B4E3D]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B4E3D]/80">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {internalLinks.length > 0 && (
        <section className="border-t border-[#A67C52]/20 bg-[#D9C7B8] py-18 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
                  RELATED LINKS
                </span>
                <h2 className="text-3xl font-black uppercase leading-tight text-[#6B4E3D] sm:text-4xl">
                  Explore more private aviation options
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center justify-between gap-2 rounded-xs border border-[#A67C52]/20 bg-[#F3E9D0] px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B4E3D] transition-colors hover:bg-[#A67C52] hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#6B4E3D] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#E6D5C1]">
                READY TO PLAN YOUR FLIGHT?
              </span>
              <h2 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
                Share your route, date, and passenger requirements with our charter team.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-xs border border-[#A67C52] bg-[#A67C52] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8B6639]"
              >
                <span>Request a Charter Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+919355611996"
                className="inline-flex items-center gap-2 rounded-xs border border-white/20 bg-white/5 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                <span>Call Charter Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
