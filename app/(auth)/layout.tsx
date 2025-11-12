export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#66CCFF]">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <span className="text-xl font-bold text-[#2E2E3A]">RentalHub</span>
          </div>
          <p className="text-sm text-[#2E2E3A]/70">
            Property rental management platform
          </p>
        </div>
        {children}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#2E2E3A]/60">
            Need help?{" "}
            <a href="#" className="text-[#66CCFF] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}