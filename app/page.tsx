import Link from "next/link"
import { Check, CreditCard, Shield, Smartphone, Users, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F2]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#2E2E3A]/10 bg-[#FFF8F2]/80 backdrop-blur supports-[backdrop-filter]:bg-[#FFF8F2]/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#66CCFF]">
              <span className="text-lg font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold text-[#2E2E3A]">PulsePal</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-[#2E2E3A] transition-colors hover:text-[#66CCFF]"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#2E2E3A] transition-colors hover:text-[#66CCFF]"
            >
              How it works
            </Link>
            <Link href="#contact" className="text-sm font-medium text-[#2E2E3A] transition-colors hover:text-[#66CCFF]">
              Contact
            </Link>
          </nav>

          <Button className="rounded-full bg-[#1A73E8] px-6 text-white transition-colors hover:bg-[#1557B0]">
            Get started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full bg-[#66CCFF]/10 px-4 py-2 text-sm font-medium text-[#2E2E3A]">
            AI-Powered CRM & Booking Platform
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#2E2E3A] sm:text-5xl lg:text-6xl">
            Smarter gym & leisure centre management starts here
          </h1>

          <p className="mb-8 text-lg text-[#2E2E3A]/80 sm:text-xl">
            All-in-one AI-powered platform for bookings, CRM, access control, and payments—designed for multi-site
            centres, councils, and community operators.
          </p>

          <p className="mb-10 text-base text-[#2E2E3A]/70 sm:text-lg">
            Say goodbye to spreadsheets and clunky software. PulsePal unifies everything you need into one sleek,
            affordable system. Built for busy teams. Loved by managers. Powered by automation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full rounded-full bg-[#1A73E8] px-8 text-white transition-colors hover:bg-[#1557B0] sm:w-auto"
            >
              Get started now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-2 border-[#1A73E8] bg-transparent text-[#1A73E8] transition-colors hover:bg-[#B3E5FC]/20 sm:w-auto"
            >
              Book demo
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#2E2E3A]/60">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#4ECDC4]" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#4ECDC4]" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#4ECDC4]" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#2E2E3A] sm:text-4xl">Sound familiar?</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="rounded-2xl border-2 border-red-200 bg-red-50/50 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Tired of juggling multiple systems?</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Managing bookings in one place, payments in another, and member data in spreadsheets is exhausting.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-2 border-red-200 bg-red-50/50 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Spending hours on manual admin?</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Chasing payments, sending reminders, and updating records manually takes time away from what matters.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-2 border-red-200 bg-red-50/50 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Losing customers due to poor booking experiences?</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Clunky booking systems and slow processes frustrate members and drive them away.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#2E2E3A] sm:text-4xl">PulsePal gives you</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Online bookings & payments in one place",
              "Built-in CRM to track and engage members",
              "Access control for doors, turnstiles, and facilities",
              "Automation that saves hours every week",
              "Multi-site support that scales with you",
              "Simple design for non-technical staff and older users",
            ].map((feature, index) => (
              <Card
                key={index}
                className="rounded-2xl border-2 border-green-200 bg-green-50/50 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-start gap-3 p-6">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-[#2E2E3A]">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PulsePal Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#2E2E3A] sm:text-4xl">Why choose PulsePal?</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#66CCFF]/10">
                  <Smartphone className="h-6 w-6 text-[#66CCFF]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Cloud-based, works on any device</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Access PulsePal from desktop, tablet, or mobile. No installations required.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4ECDC4]/10">
                  <Zap className="h-6 w-6 text-[#4ECDC4]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">AI automation for smart scheduling & reminders</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Let AI handle routine tasks like booking confirmations and payment reminders.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#66CCFF]/10">
                  <Shield className="h-6 w-6 text-[#66CCFF]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">GDPR-compliant and secure</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Your members' data is protected with enterprise-grade security and compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4ECDC4]/10">
                  <CreditCard className="h-6 w-6 text-[#4ECDC4]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Affordable for council and community budgets</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Transparent pricing designed for public sector and community operators.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#66CCFF]/10">
                  <Zap className="h-6 w-6 text-[#66CCFF]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Integrates with Stripe, GoCardless & more</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Connect with the payment providers and tools you already use.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4ECDC4]/10">
                  <Users className="h-6 w-6 text-[#4ECDC4]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#2E2E3A]">Built for real people</h3>
                <p className="text-sm text-[#2E2E3A]/70">
                  Intuitive interface designed for staff of all technical abilities and ages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8" id="how-it-works">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#2E2E3A] sm:text-4xl">Simple setup, powerful results</h2>
          <p className="mb-12 text-lg text-[#2E2E3A]/70">
            Get up and running in minutes, not months. PulsePal grows with your centre.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#66CCFF]/20 text-2xl font-bold text-[#66CCFF]">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#2E2E3A]">Quick setup</h3>
              <p className="text-sm text-[#2E2E3A]/70">
                Import your existing member data and configure your facilities in under 30 minutes.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4ECDC4]/20 text-2xl font-bold text-[#4ECDC4]">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#2E2E3A]">Smart learning</h3>
              <p className="text-sm text-[#2E2E3A]/70">
                PulsePal learns your patterns and preferences, getting smarter with every booking.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A73E8]/20 text-2xl font-bold text-[#1A73E8]">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#2E2E3A]">Happy members</h3>
              <p className="text-sm text-[#2E2E3A]/70">
                Watch satisfaction soar as families enjoy seamless bookings and personalized experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-[#66CCFF] sm:text-5xl">15+</div>
              <div className="text-sm font-medium text-[#2E2E3A]/70">Hours saved weekly</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-[#4ECDC4] sm:text-5xl">98%</div>
              <div className="text-sm font-medium text-[#2E2E3A]/70">Member satisfaction</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-[#1A73E8] sm:text-5xl">35%</div>
              <div className="text-sm font-medium text-[#2E2E3A]/70">Increase in bookings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-[#2E2E3A] sm:text-4xl">
            Ready to simplify your operations and boost member satisfaction?
          </h2>
          <p className="mb-8 text-lg text-[#2E2E3A]/70">
            Book a free demo today and see how PulsePal works for your centre.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full rounded-full bg-[#1A73E8] px-8 text-white transition-colors hover:bg-[#1557B0] sm:w-auto"
            >
              Get started now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-2 border-[#1A73E8] bg-transparent text-[#1A73E8] transition-colors hover:bg-[#B3E5FC]/20 sm:w-auto"
            >
              Book demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-[#2E2E3A]/60">Free demo • No commitment • See results in 15 minutes</p>
        </div>
      </section>

      {/* Footer with Contact Form */}
      <footer className="border-t border-[#2E2E3A]/10 bg-[#2E2E3A] text-white" id="contact">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Company Info */}
            <div>
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66CCFF]">
                  <span className="text-xl font-bold text-white">P</span>
                </div>
                <span className="text-2xl font-bold">PulsePal</span>
              </div>
              <p className="mb-6 text-white/80">
                The smart, simple system for leisure centres. Built for real people, powered by AI.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <p className="flex items-center gap-2">
                  <span>hello@pulsepal.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>+44 20 7946 0958</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>London, UK</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="mb-6 text-xl font-semibold">Get in touch</h3>
              <p className="mb-6 text-sm text-white/70">
                Ready to see PulsePal in action? Let's schedule a demo and show you how we can help your centre.
              </p>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#66CCFF]"
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#66CCFF]"
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#66CCFF]"
                />
                <Input
                  type="text"
                  placeholder="Leisure Centre Name"
                  className="rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#66CCFF]"
                />
                <Textarea
                  placeholder="Tell us about your needs..."
                  className="min-h-[100px] rounded-lg border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#66CCFF]"
                />
                <Button
                  type="submit"
                  className="w-full rounded-full bg-[#66CCFF] text-white transition-colors hover:bg-[#4ECDC4]"
                >
                  Send message
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>© 2025 PulsePal. All rights reserved. Made with care for leisure centres everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
