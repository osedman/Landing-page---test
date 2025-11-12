"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Upload, X, Home, Wifi, Car, Utensils, Wind, Tv, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const propertySchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(1, "Property name is required").max(100, "Name must be less than 100 characters"),
  type: z.enum(["apartment", "house", "office", "studio", "other"], { required_error: "Property type is required" }),
  addressStreet: z.string().min(1, "Street address is required"),
  addressCity: z.string().min(1, "City is required"),
  addressState: z.string().min(1, "State is required"),
  addressZip: z.string().min(1, "ZIP code is required"),
  addressCountry: z.string().min(1, "Country is required"),
  bedrooms: z.number().min(0, "Must be at least 0").max(20, "Must be less than 20"),
  bathrooms: z.number().min(0, "Must be at least 0").max(20, "Must be less than 20"),
  maxGuests: z.number().min(1, "Must accommodate at least 1 guest").max(20, "Must be less than 20"),

  // Step 2: Details
  description: z.string().max(1000, "Description must be less than 1000 characters"),
  houseRules: z.string().optional(),
  amenities: z.array(z.string()).optional(),

  // Step 3: Pricing & Availability
  baseRate: z.number().min(1, "Base rate must be at least $1"),
  minNights: z.number().min(1, "Minimum nights must be at least 1"),
  maxNights: z.number().optional(),
  cleaningFee: z.number().min(0, "Cleaning fee cannot be negative").default(0),
})

type PropertyFormData = z.infer<typeof propertySchema>

const amenities = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "ac", label: "Air Conditioning", icon: Wind },
  { id: "heating", label: "Heating", icon: Wind },
  { id: "tv", label: "TV", icon: Tv },
  { id: "washer", label: "Washer" },
  { id: "dryer", label: "Dryer" },
  { id: "pool", label: "Pool", icon: Waves },
]

export default function CreatePropertyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      minNights: 1,
      cleaningFee: 0,
      amenities: [],
    },
  })

  const selectedAmenities = watch("amenities") || []

  const steps = [
    { id: 1, title: "Basic Info", description: "Property details and location" },
    { id: 2, title: "Details", description: "Description and amenities" },
    { id: 3, title: "Pricing", description: "Rates and availability" },
    { id: 4, title: "Photos", description: "Property images" },
  ]

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB.`)
        return false
      }
      return true
    })

    if (uploadedPhotos.length + validFiles.length > 10) {
      alert("You can upload a maximum of 10 photos.")
      return
    }

    setUploadedPhotos(prev => [...prev, ...validFiles])
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const onNext = async () => {
    const fields = currentStep === 1 ? [
      "name", "type", "addressStreet", "addressCity", "addressState",
      "addressZip", "addressCountry", "bedrooms", "bathrooms", "maxGuests"
    ] : currentStep === 2 ? ["description"] : ["baseRate", "minNights", "cleaningFee"]

    const isStepValid = await trigger(fields as any)
    if (isStepValid) {
      setCurrentStep(prev => Math.min(4, prev + 1))
    }
  }

  const onPrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const onSubmit = async (data: PropertyFormData) => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
      return
    }

    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        photos: uploadedPhotos,
      }
      console.log("Creating property:", formData)

      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Redirect to properties list
      window.location.href = "/dashboard/properties"
    } catch (error) {
      console.error("Failed to create property:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleAmenity = (amenityId: string) => {
    const current = selectedAmenities || []
    const updated = current.includes(amenityId)
      ? current.filter(id => id !== amenityId)
      : [...current, amenityId]
    setValue("amenities", updated)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/properties">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#2E2E3A]">Create Property</h1>
          <p className="text-[#2E2E3A]/70">Add a new rental property to your portfolio</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="border-2 border-[#2E2E3A]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= step.id
                      ? "border-[#66CCFF] bg-[#66CCFF] text-white"
                      : "border-[#2E2E3A]/20 bg-white text-[#2E2E3A]/50"
                  }`}>
                    {currentStep > step.id ? "✓" : step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-[#2E2E3A]" : "text-[#2E2E3A]/50"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-[#2E2E3A]/40">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step.id ? "bg-[#66CCFF]" : "bg-[#2E2E3A]/10"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-2 border-[#2E2E3A]/20">
          <CardContent className="p-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#2E2E3A] mb-2">Basic Information</h2>
                  <p className="text-[#2E2E3A]/70">Tell us about your property</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Property Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Cozy Beach House"
                      className={`mt-1 ${errors.name ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="type">Property Type *</Label>
                    <Select
                      value={watch("type")}
                      onValueChange={(value) => setValue("type", value as any)}
                    >
                      <SelectTrigger className={`mt-1 ${errors.type ? "border-red-300" : "border-[#2E2E3A]/20"}`}>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Address *</Label>
                  <div className="grid gap-4 mt-2">
                    <Input
                      {...register("addressStreet")}
                      placeholder="123 Main Street"
                      className={errors.addressStreet ? "border-red-300" : "border-[#2E2E3A]/20"}
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                      <Input
                        {...register("addressCity")}
                        placeholder="City"
                        className={errors.addressCity ? "border-red-300" : "border-[#2E2E3A]/20"}
                      />
                      <Input
                        {...register("addressState")}
                        placeholder="State"
                        className={errors.addressState ? "border-red-300" : "border-[#2E2E3A]/20"}
                      />
                      <Input
                        {...register("addressZip")}
                        placeholder="ZIP Code"
                        className={errors.addressZip ? "border-red-300" : "border-[#2E2E3A]/20"}
                      />
                    </div>
                    <Input
                      {...register("addressCountry")}
                      placeholder="Country"
                      className={errors.addressCountry ? "border-red-300" : "border-[#2E2E3A]/20"}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      {...register("bedrooms", { valueAsNumber: true })}
                      placeholder="2"
                      className={`mt-1 ${errors.bedrooms ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                    />
                    {errors.bedrooms && (
                      <p className="mt-1 text-xs text-red-600">{errors.bedrooms.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      {...register("bathrooms", { valueAsNumber: true })}
                      placeholder="2"
                      className={`mt-1 ${errors.bathrooms ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                    />
                    {errors.bathrooms && (
                      <p className="mt-1 text-xs text-red-600">{errors.bathrooms.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="maxGuests">Max Guests *</Label>
                    <Input
                      id="maxGuests"
                      type="number"
                      {...register("maxGuests", { valueAsNumber: true })}
                      placeholder="4"
                      className={`mt-1 ${errors.maxGuests ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                    />
                    {errors.maxGuests && (
                      <p className="mt-1 text-xs text-red-600">{errors.maxGuests.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#2E2E3A] mb-2">Property Details</h2>
                  <p className="text-[#2E2E3A]/70">Describe your property and available amenities</p>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Describe your property, what makes it special, and what guests can expect..."
                    rows={6}
                    className={`mt-1 ${errors.description ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                  />
                  <p className="mt-1 text-xs text-[#2E2E3A]/50">
                    {1000 - (watch("description")?.length || 0)} characters remaining
                  </p>
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="houseRules">House Rules</Label>
                  <Textarea
                    id="houseRules"
                    {...register("houseRules")}
                    placeholder="List any rules guests should follow (e.g., no smoking, no pets, quiet hours...)"
                    rows={4}
                    className="mt-1 border-[#2E2E3A]/20"
                  />
                </div>

                <div>
                  <Label>Amenities</Label>
                  <div className="grid gap-4 mt-2 md:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((amenity) => {
                      const Icon = amenity.icon
                      return (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() => toggleAmenity(amenity.id)}
                          />
                          <label
                            htmlFor={amenity.id}
                            className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            <span>{amenity.label}</span>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Availability */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#2E2E3A] mb-2">Pricing & Availability</h2>
                  <p className="text-[#2E2E3A]/70">Set your rates and booking requirements</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="baseRate">Base Nightly Rate *</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E3A]/70">$</span>
                      <Input
                        id="baseRate"
                        type="number"
                        {...register("baseRate", { valueAsNumber: true })}
                        placeholder="150"
                        className={`pl-8 ${errors.baseRate ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                      />
                    </div>
                    {errors.baseRate && (
                      <p className="mt-1 text-xs text-red-600">{errors.baseRate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cleaningFee">Cleaning Fee</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E3A]/70">$</span>
                      <Input
                        id="cleaningFee"
                        type="number"
                        {...register("cleaningFee", { valueAsNumber: true })}
                        placeholder="50"
                        className="pl-8 border-[#2E2E3A]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="minNights">Minimum Nights Stay *</Label>
                    <Input
                      id="minNights"
                      type="number"
                      {...register("minNights", { valueAsNumber: true })}
                      placeholder="1"
                      className={`mt-1 ${errors.minNights ? "border-red-300" : "border-[#2E2E3A]/20"}`}
                    />
                    {errors.minNights && (
                      <p className="mt-1 text-xs text-red-600">{errors.minNights.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="maxNights">Maximum Nights Stay</Label>
                    <Input
                      id="maxNights"
                      type="number"
                      {...register("maxNights", { valueAsNumber: true })}
                      placeholder="30"
                      className="mt-1 border-[#2E2E3A]/20"
                    />
                    <p className="mt-1 text-xs text-[#2E2E3A]/50">Leave empty for no maximum limit</p>
                  </div>
                </div>

                <div className="bg-[#66CCFF]/10 border border-[#66CCFF]/20 rounded-lg p-4">
                  <h3 className="font-medium text-[#2E2E3A] mb-2">Estimated Monthly Revenue</h3>
                  <p className="text-sm text-[#2E2E3A]/70">
                    Based on your rate of ${watch("baseRate") || 0} per night, you could earn approximately:
                  </p>
                  <p className="text-2xl font-bold text-[#66CCFF] mt-2">
                    ${((watch("baseRate") || 0) * 20).toLocaleString()} per month
                  </p>
                  <p className="text-xs text-[#2E2E3A]/50 mt-1">Assuming 20 nights/month occupancy</p>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#2E2E3A] mb-2">Property Photos</h2>
                  <p className="text-[#2E2E3A]/70">Add photos to showcase your property (max 10, 5MB each)</p>
                </div>

                <div className="border-2 border-dashed border-[#2E2E3A]/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-[#2E2E3A]/40 mx-auto mb-4" />
                  <p className="text-[#2E2E3A]/70 mb-2">
                    Drag and drop photos here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photo-upload")?.click()}
                  >
                    Select Photos
                  </Button>
                </div>

                {uploadedPhotos.length > 0 && (
                  <div>
                    <h3 className="font-medium text-[#2E2E3A] mb-3">Uploaded Photos ({uploadedPhotos.length}/10)</h3>
                    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Property photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="mt-1 text-xs text-[#2E2E3A]/60">
                            {photo.name.length > 20 ? `${photo.name.substring(0, 20)}...` : photo.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            type={currentStep === 4 ? "submit" : "button"}
            onClick={currentStep < 4 ? onNext : undefined}
            disabled={isSubmitting}
            className="bg-[#66CCFF] text-white hover:bg-[#4ECDC4]"
          >
            {isSubmitting ? (
              "Creating..."
            ) : currentStep === 4 ? (
              "Create Property"
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}