"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["guest", "owner"], { required_error: "Please select a role" }),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  const selectedRole = watch("role")

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual registration API call
      console.log("Registration data:", data)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsSuccess(true)
    } catch (error) {
      console.error("Registration failed:", error)
      // TODO: Show error message
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full border-2 border-[#2E2E3A]/20">
        <CardContent className="p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-[#2E2E3A]">Registration Successful!</h2>
          <p className="mb-6 text-[#2E2E3A]/70">
            Check your email to verify your account and get started.
          </p>
          <Link href="/login">
            <Button className="w-full rounded-lg bg-[#66CCFF] text-white hover:bg-[#4ECDC4]">
              Go to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-2 border-[#2E2E3A]/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-[#2E2E3A]">
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-1">
                First Name
              </label>
              <Input
                {...register("firstName")}
                placeholder="John"
                className={`border-2 ${errors.firstName ? "border-red-300" : "border-[#2E2E3A]/20"}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-1">
                Last Name
              </label>
              <Input
                {...register("lastName")}
                placeholder="Doe"
                className={`border-2 ${errors.lastName ? "border-red-300" : "border-[#2E2E3A]/20"}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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
              placeholder="Min 8 characters"
              className={`border-2 ${errors.password ? "border-red-300" : "border-[#2E2E3A]/20"}`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2E2E3A] mb-1">
              I want to
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setValue("role", value as "guest" | "owner")}
            >
              <SelectTrigger className={`border-2 ${errors.role ? "border-red-300" : "border-[#2E2E3A]/20"}`}>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guest">Rent Properties (Guest)</SelectItem>
                <SelectItem value="owner">List Properties (Owner)</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
              className="mt-1"
            />
            <div className="text-sm">
              <label htmlFor="terms" className="text-[#2E2E3A]/70">
                I agree to the{" "}
                <a href="#" className="text-[#66CCFF] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#66CCFF] hover:underline">
                  Privacy Policy
                </a>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-xs text-red-600">{errors.termsAccepted.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#66CCFF] py-3 text-white hover:bg-[#4ECDC4] disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#2E2E3A]/70">
            Already have an account?{" "}
            <Link href="/login" className="text-[#66CCFF] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}