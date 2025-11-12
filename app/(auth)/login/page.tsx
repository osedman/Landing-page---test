"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  const rememberMe = watch("rememberMe")

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement actual login API call
      console.log("Login data:", data)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For MVP, simulate different user redirects based on email
      if (data.email.includes("owner")) {
        // Redirect to owner dashboard
        window.location.href = "/dashboard/properties"
      } else if (data.email.includes("admin")) {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
      } else {
        // Redirect to property browsing for guests
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-2 border-[#2E2E3A]/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-[#2E2E3A]">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2E2E3A] mb-1">
              Email Address
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className={`border-2 ${errors.email ? "border-red-300" : "border-[#2E2E3A]/20"}`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2E2E3A] mb-1">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className={`border-2 ${errors.password ? "border-red-300" : "border-[#2E2E3A]/20"}`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-[#2E2E3A]/70">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#66CCFF] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#66CCFF] py-3 text-white hover:bg-[#4ECDC4] disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#2E2E3A]/70">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#66CCFF] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-[#2E2E3A]/10">
          <p className="text-xs text-[#2E2E3A]/50 text-center">
            Demo accounts:
          </p>
          <div className="mt-2 space-y-1 text-xs text-[#2E2E3A]/40">
            <p>Owner: owner@example.com</p>
            <p>Guest: guest@example.com</p>
            <p>Admin: admin@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}