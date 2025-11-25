'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import MapModal from './MapModal'
import { useSession } from 'next-auth/react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface SupplierListingFormData {
  propertyName: string
  country: string
  city: string
  propertyType: string
  areaSuburb: string
  exactAddress: string
  approxSize: string
  indicativeRentFrom: string
  month: string
  description: string
  supplierIdCreateIdAgent?: string
  managedByThisAgency?: boolean
}

interface PropertyType {
  name: string
  _id: string
}

interface Supplier {
  _id: string
  supplierId: {
    _id: string
    fullName: string
  }
}

export function SupplierListingForm() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken as string | undefined
  const role = session?.user?.role

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SupplierListingFormData>({
    defaultValues: {
      propertyName: '',
      country: '',
      city: '',
      propertyType: '',
      areaSuburb: '',
      exactAddress: '',
      approxSize: '',
      indicativeRentFrom: '',
      month: '',
      description: '',
      supplierIdCreateIdAgent: '',
      managedByThisAgency: false,
    },
  })

  // FETCH PROPERTY TYPES
  const { data: propertyTypes = [], isLoading: isPropertyTypesLoading } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/propertytype/`)
      if (!res.ok) throw new Error('Failed to fetch property types')
      const json = await res.json()
      return json.data || []
    },
  })

  // FETCH SUPPLIERS (ONLY FOR AGENT)
  const { data: suppliers = [], isLoading: isSuppliersLoading } = useQuery({
    enabled: role === 'AGENT',
    queryKey: ['suppliers'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hire-agent/supplier`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch suppliers')
      const json = await res.json()
      return json.data || []
    },
  })

  // SUBMIT MUTATION
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Failed to add listing')
      return result
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Property added successfully!')
      reset()
      setUploadedImage(null)
      setUploadedImageFile(null)
      setSelectedLocation(null)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Upload failed. Please try again.')
    },
  })

  // SUBMIT FUNCTION
  const onSubmit = (data: SupplierListingFormData) => {
    if (!token) return toast.error('You must be logged in!')

    const formData = new FormData()

    // Base payload
    const payload: any = {
      type: data.propertyType,
      title: data.propertyName,
      description: data.description || undefined,
      country: data.country,
      city: data.city,
      areaya: data.areaSuburb || undefined,
      address: data.exactAddress || data.areaSuburb || undefined,
      size: data.approxSize ? `${data.approxSize.trim()} sqft` : undefined,
      price: data.indicativeRentFrom ? Number(data.indicativeRentFrom) : 0,
      mounth: data.month || undefined,
      extraLocation: selectedLocation
        ? {
            type: 'Point',
            coordinates: [selectedLocation.lng, selectedLocation.lat],
          }
        : undefined,
    }

    // Add AGENT-specific fields only if role is AGENT
    if (role === 'AGENT') {
      if (data.supplierIdCreateIdAgent)
        payload.supplyerIdCreateIdAgent = data.supplierIdCreateIdAgent

      payload.managedByThisAgency = !!data.managedByThisAgency
    }

    // Remove undefined fields
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    )

    formData.append('data', JSON.stringify(cleanPayload))

    if (uploadedImageFile) {
      formData.append('thumble', uploadedImageFile, uploadedImageFile.name)
    }

    mutation.mutate(formData)
  }

  // IMAGE UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB')
      return
    }

    setUploadedImageFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2745] via-[#0f1f3f] to-[#0a1428] p-4 md:p-8">
      <div className="mx-auto container">
        <div className="text-center pb-10">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Add Your Property</h1>
          <p className="mt-2 text-gray-400">
            Share your property with thousands of potential tenants
          </p>
        </div>

        <Card className="border-none bg-white/10 backdrop-blur-lg p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

            {/* PROPERTY NAME */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">
                Property Name *
              </label>
              <Input
                {...register('propertyName', { required: 'Required' })}
                placeholder="Property Name"
                className="h-12 border border-[#BFBFBF] text-white placeholder-gray-400"
              />
              {errors.propertyName &&
                <p className="text-red-400 text-xs mt-1">{errors.propertyName.message}</p>}
            </div>

            {/* COUNTRY & CITY */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Country</label>
                <Input {...register('country')} className="h-12 text-white" placeholder="Country" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">City</label>
                <Input {...register('city')} className="h-12 text-white" placeholder="City" />
              </div>
            </div>

            {/* AGENT FIELDS */}
            {role === 'AGENT' && (
              <>
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">Supplier *</label>
                  <Select
                    onValueChange={(val) => setValue('supplierIdCreateIdAgent', val)}
                    disabled={isSuppliersLoading}
                  >
                    <SelectTrigger className="h-12 border text-white">
                      <SelectValue placeholder="Select Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((sup: Supplier) => (
                        <SelectItem key={sup._id} value={sup.supplierId._id}>
                          {sup.supplierId.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* FIXED CHECKBOX */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={!!watch("managedByThisAgency")}
                    onCheckedChange={(val) => setValue("managedByThisAgency", val === true)}
                  />
                  <label className="text-white text-sm">Managed By This Agency</label>
                </div>
              </>
            )}

            {/* PROPERTY TYPE & AREA */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Property Type *</label>
                <Select
                  onValueChange={(val) => setValue('propertyType', val)}
                  disabled={isPropertyTypesLoading}
                >
                  <SelectTrigger className="h-12 border text-white">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type: PropertyType) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Area / Suburb</label>
                <Input
                  {...register('areaSuburb')}
                  placeholder="Area / Suburb"
                  className="h-12 text-white"
                />
              </div>
            </div>

            {/* ADDRESS & MAP */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Exact Address (Optional)
                </label>
                <Input
                  {...register('exactAddress')}
                  placeholder="Exact Address"
                  className="h-12 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Location on Map
                </label>

                <Button
                  type="button"
                  className="w-full h-12 bg-gradient"
                  onClick={() => setIsMapOpen(true)}
                >
                  {selectedLocation ? 'Change Location' : 'Pick Location'}
                </Button>

                {selectedLocation && (
                  <p className="mt-2 text-green-400 text-xs">
                    Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            {/* SIZE & RENT */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Size (sqft)
                </label>
                <Input
                  {...register('approxSize')}
                  placeholder="size"
                  className="h-12 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Monthly Rent (BDT)
                </label>
                <Input
                  {...register('indicativeRentFrom')}
                  type="number"
                  placeholder="Monthly Rent"
                  className="h-12 text-white"
                />
              </div>
            </div>

            {/* AVAILABLE MONTH */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Available From</label>
              <Input
                {...register('month')}
                placeholder="Available From"
                className="h-12 text-white"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Description</label>
              <Textarea
                {...register('description')}
                rows={5}
                placeholder="Description..."
                className="text-white"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">
                Property Image
              </label>

              <div className="relative border-2 border-dashed border-white/30 rounded-xl p-10 text-center">
                {uploadedImage ? (
                  <div className="relative">
                    <Image
                      src={uploadedImage}
                      alt="Thumbnail"
                      width={800}
                      height={400}
                      className="mx-auto rounded-lg max-h-80 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage(null)
                        setUploadedImageFile(null)
                      }}
                      className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-16 w-16 text-cyan-400 mb-4" />
                    <p className="text-gray-300">Click to upload</p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient text-white rounded-xl shadow-xl"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Uploading...' : 'Add Property Listing'}
            </Button>
          </form>
        </Card>

        {/* MAP MODAL */}
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          initialLat={23.8103}
          initialLng={90.4125}
          onLocationSelect={(lat, lng) => {
            setSelectedLocation({ lat, lng })
            toast.success('Location selected!')
          }}
        />
      </div>
    </div>
  )
}
