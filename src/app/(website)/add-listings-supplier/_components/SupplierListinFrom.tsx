'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Upload } from 'lucide-react'
import Image from 'next/image'

interface SupplierListingFormData {
  country: string
  city: string
  propertyName: string
  propertyType: string
  areaSuburb: string
  exactAddress: string
  showExactAddress: string
  approxSize: string
  status: string
  indicativeRentFrom: string
  indicativeRentTo: string
  month: string
  addressOrArea: string
  description: string
}

export function SupplierListingForm() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const { control, register, handleSubmit } = useForm<SupplierListingFormData>({
    defaultValues: {
      country: '',
      city: '',
      propertyName: '',
      propertyType: '',
      areaSuburb: '',
      exactAddress: '',
      showExactAddress: 'true',
      approxSize: '',
      status: '',
      indicativeRentFrom: '',
      indicativeRentTo: '',
      month: '',
      addressOrArea: '',
      description: '',
    },
  })

  const onSubmit = (data: SupplierListingFormData) => {
    console.log('Form Data:', data)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setUploadedImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2745] via-[#0f1f3f] to-[#0a1428] p-4 md:p-8">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start justify-between md:mb-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Add Your Listing
            </h1>
            <p className="mt-2 text-gray-400">
              Share your property with thousands of potential tenants
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-none bg-white/10 p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: Country & City */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">
                  Country (NZ or AU)
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nz">New Zealand</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">City</label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sydney">Sydney</SelectItem>
                        <SelectItem value="melbourne">Melbourne</SelectItem>
                        <SelectItem value="auckland">Auckland</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Row 2: Property Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-white mb-[12px]">Property Name</label>
              <Input
                {...register('propertyName')}
                placeholder="Property Name"
                className="h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
              />
            </div>

            {/* Row 3: Property Type & Area/Suburb */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">Property Type</label>
                <Controller
                  name="propertyType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">Area/Suburb</label>
                <Input
                  {...register('areaSuburb')}
                  placeholder="Area/Suburb"
                  className="h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 4: Exact Address, Toggle, Approx Size */}
            <div className="grid gap-6 md:grid-cols-3 items-center">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">Exact Address (Optional)</label>
                <Controller
                  name="exactAddress"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white">
                        <SelectValue placeholder="Select Address" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="address1">123 Main St</SelectItem>
                        <SelectItem value="address2">456 Oak Ave</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">
                  Show exact address on map?
                </label>
                <div className="flex items-center gap-4 border border-[#BFBFBF] h-[51px] rounded-md px-3">
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="radio" {...register('showExactAddress')} value="true" className="accent-cyan-500" />
                    Show Exact
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="radio" {...register('showExactAddress')} value="false" className="accent-cyan-500" />
                    City-Level Only
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">Approx. Size (sqm)</label>
                <Input
                  {...register('approxSize')}
                  placeholder="e.g. 1500sqm"
                  className="h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 5: Status */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-white mb-[12px]">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Row 6: Indicative Rent & Month */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">Indicative Rent (Optional)</label>
                <div className="flex gap-2">
                  <Input
                    {...register('indicativeRentFrom')}
                    type="number"
                    placeholder="$0"
                    className="no-spinner  h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
                  />
                  <span className="flex items-center text-white">To</span>
                  <Input
                    {...register('indicativeRentTo')}
                    type="number"
                    placeholder="$0"
                    className="no-spinner  h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-[12px]">Month</label>
                <Input
                  {...register('month')}
                  type="date"
                  className="h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 7: Address or Area */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-white mb-[12px]">Address or Area</label>
              <Input
                {...register('addressOrArea')}
                placeholder="Type here"
                className="h-[51px] border border-[#BFBFBF] text-white placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-white mb-[12px]">Description / Notes</label>
              <Textarea
                {...register('description')}
                placeholder="Type here..."
                className="min-h-32 border border-[#BFBFBF] text-white placeholder-gray-400"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col pb-10">
              <label className="text-sm font-semibold text-white mb-[12px]">Image</label>
              <div className="relative">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 py-12">
                  {uploadedImage ? (
                    <div className="relative w-full">
                      <Image src={uploadedImage} alt="Uploaded" width={1000} height={1000} className="h-48 w-full rounded object-cover" />
                      <button
                        type="button"
                        onClick={() => setUploadedImage(null)}
                        className="absolute right-2 top-2 rounded bg-red-500 p-1 text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-500 bg-cyan-500/20">
                        <Upload className="h-6 w-6 text-cyan-400" />
                      </div>
                      <p className="mt-4 text-center text-gray-400">
                        Drag and drop image here, or click to upload
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded bg-gradient  h-[51px] font-semibold text-white hover:from-cyan-600 hover:to-cyan-700"
            >
              Add Listing
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
