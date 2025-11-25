



'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import { Loader2 } from 'lucide-react'
import MapModal from '../../add-listings-supplier/_components/MapModal'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

interface PropertyType {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  createBy: string
  __v: number
}

interface ListingFormData {
  country: string
  city: string
  propertyType: string
  areaSuburb: string
  exactAddress?: string
  approxSize: string
  budgetFrom: string
  budgetTo: string
  requiredFromDate: string
  description?: string
}

interface data {
  type: string
  address: string
  size: string
  price: number
  title: string
  description: string
  country: string
  city: string
  areaya: string
  mounth: string
  extraLocation?: { type: string; coordinates: number[] }
}

export function ListingForm() {
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  const { data: session } = useSession()
  const token = session?.user?.accessToken

  // Country → Cities mapping
  const cityList = {
    nz: [
      "Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga",
      "Dunedin", "Palmerston North", "Napier", "Rotorua", "Nelson",
      "Queenstown", "New Plymouth", "Invercargill", "Whanganui"
    ],
    au: [
      "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide",
      "Canberra", "Hobart", "Darwin", "Gold Coast", "Newcastle",
      "Wollongong", "Sunshine Coast", "Townsville", "Cairns",
      "Toowoomba", "Ballarat", "Bendigo", "Geelong"
    ]
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ListingFormData>({
    defaultValues: {
      country: '',
      city: '',
      propertyType: '',
      areaSuburb: '',
      exactAddress: '',
      approxSize: '',
      budgetFrom: '',
      budgetTo: '',
      requiredFromDate: '',
      description: '',
    },
  })

  const selectedCountry = watch("country")

  // Fetch Property Types
  const {
    data: propertyTypes = [],
    isLoading: isLoadingPropertyTypes,
    isError: propertyTypesError,
  } = useQuery<PropertyType[]>({
    queryKey: ['propertyTypes'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/propertytype`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Failed to fetch property types' }))
        throw new Error(error.message || 'Failed to load property types')
      }
      const result = await res.json()
      return result.data || []
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  })

  // Create Listing Mutation
  const mutation = useMutation({
    mutationFn: async (data: data) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Something went wrong' }))
        throw new Error(error.message || 'Failed to create listing')
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success('Listing created successfully!')
      reset()
      setSelectedLocation(null)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create listing')
    },
  })

  const onSubmit = (formData: ListingFormData) => {
    const payload: data = {
      type: formData.propertyType,
      address: formData.exactAddress || `${formData.areaSuburb}, ${formData.city}`,
      size: formData.approxSize,
      price: Math.round((Number(formData.budgetFrom) + Number(formData.budgetTo)) / 2),
      title: `${propertyTypes.find(t => t._id === formData.propertyType)?.name || 'Property'} wanted in ${formData.areaSuburb || formData.city}`,
      description: formData.description || "",
      country: formData.country.toUpperCase(),
      city: formData.city,
      areaya: formData.areaSuburb,
      mounth: formData.requiredFromDate,
      extraLocation: selectedLocation
        ? { type: 'Point', coordinates: [selectedLocation.lng, selectedLocation.lat] }
        : undefined
    }
    mutation.mutate(payload)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto container px-5 py-8">
        {/* Title */}
        <div className="mb-8 flex items-start justify-center text-center md:mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white md:text-5xl">Add Your Listing</h1>
            <p className="mt-2 text-gray-400">Share your property requirements with thousands of landlords</p>
          </div>
        </div>

        <Card className="border-none bg-white/10 p-4 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Country + City */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* COUNTRY */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">Country (NZ or AU)</label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: 'Country is required' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-[51px] border border-[#BFBFBF] bg-transparent text-white">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nz">New Zealand</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>}
              </div>

              {/* CITY (Dynamic) */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">City</label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!selectedCountry}
                    >
                      <SelectTrigger className="h-[51px] border border-[#BFBFBF] bg-transparent text-white">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCountry && cityList[selectedCountry as "nz" | "au"].map(city => (
                          <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>}
              </div>
            </div>

            {/* Property Type & Area/Suburb */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-base font-medium text-white">Property Type</label>
                {isLoadingPropertyTypes ? (
                  <div className="h-[51px] flex items-center justify-center border border-[#BFBFBF] rounded-md bg-transparent">
                    <Loader2 className="animate-spin text-white mr-2" />
                    <span className="text-sm text-gray-300">Loading types...</span>
                  </div>
                ) : propertyTypesError ? (
                  <div className="h-[51px] flex items-center justify-center border border-red-500/50 rounded-md bg-red-500/10 text-red-400 text-sm">Failed to load types</div>
                ) : propertyTypes.length === 0 ? (
                  <div className="h-[51px] flex items-center justify-center border border-amber-500/50 rounded-md bg-amber-500/10 text-amber-400 text-sm">No property types available</div>
                ) : (
                  <Controller
                    name="propertyType"
                    control={control}
                    rules={{ required: 'Property type is required' }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-[51px] border border-[#BFBFBF] bg-transparent text-white">
                          <SelectValue placeholder="Select Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map(type => <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
                {errors.propertyType && <p className="mt-1 text-sm text-red-400">{errors.propertyType.message}</p>}
              </div>

              <div>
                <label className="mb-3 block text-base font-medium text-white">Area/Suburb</label>
                <Input {...register('areaSuburb')} placeholder="e.g. CBD, Parramatta" className="h-[51px] border border-[#BFBFBF] bg-transparent text-white placeholder-[#BFBFBF]" />
              </div>
            </div>

            {/* Address, Map, Size */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-3 block text-base font-medium text-white">Exact Address (Optional)</label>
                <Input {...register('exactAddress')} placeholder="123 Example St" className="h-[51px] border border-[#BFBFBF] bg-transparent text-white placeholder-[#BFBFBF]" />
              </div>

              <div className="flex flex-col">
                <label className="mb-3 text-base font-medium text-white">Location on Map {selectedLocation && '(Selected)'}</label>
                <Button type="button" variant="outline" className="h-[51px] bg-gradient hover:bg-gradient/80 hover:text-white text-white border-0" onClick={() => setIsMapOpen(true)}>
                  {selectedLocation ? 'Change Location' : 'Pick Location'}
                </Button>
                {selectedLocation && <p className="mt-2 text-xs text-green-400">Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</p>}
              </div>

              <div>
                <label className="mb-3 block text-base font-medium text-white">Approx. Size (sqm)</label>
                <Input {...register('approxSize', { required: 'Size is required' })} placeholder="e.g. 1500" className="h-[51px] border border-[#BFBFBF] bg-transparent text-white placeholder-[#BFBFBF]" />
                {errors.approxSize && <p className="mt-1 text-sm text-red-400">{errors.approxSize.message}</p>}
              </div>
            </div>

            {/* Budget & Date */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-base font-medium text-white">Budget Range (per month)</label>
                <div className="flex gap-3 items-center">
                  <Input {...register('budgetFrom', { required: 'Budget from is required' })} type="number" placeholder="$ From" className="no-spinner h-[51px] border border-[#BFBFBF] bg-transparent text-white" />
                  <span className="text-white">to</span>
                  <Input {...register('budgetTo', { required: 'Budget to is required' })} type="number" placeholder="$ To" className="no-spinner h-[51px] border border-[#BFBFBF] bg-transparent text-white" />
                </div>
                {(errors.budgetFrom || errors.budgetTo) && <p className="mt-1 text-sm text-red-400">Both budget fields are required</p>}
              </div>

              <div>
                <label className="mb-3 block text-base font-medium text-white">Required From Date</label>
                <Input {...register('requiredFromDate', { required: 'Date is required' })} type="date" className="h-[51px] border border-[#BFBFBF] bg-transparent text-white" />
                {errors.requiredFromDate && <p className="mt-1 text-sm text-red-400">{errors.requiredFromDate.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">Description / Notes</label>
              <Textarea {...register('description')} rows={6} placeholder="Tell landlords what you're looking for..." className="border border-[#BFBFBF] bg-transparent text-white placeholder-[#BFBFBF] p-4" />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={mutation.isPending || isLoadingPropertyTypes} className="w-full h-[56px] text-lg font-semibold bg-gradient hover:bg-gradient/80 text-white rounded-xl flex items-center justify-center gap-2">
              {mutation.isPending ? <><Loader2 className="animate-spin" /> Submitting...</> : 'Submit Listing'}
            </Button>

          </form>
        </Card>

        {/* Map Modal */}
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          initialLat={-33.8688}
          initialLng={151.2093}
          onLocationSelect={(lat, lng) => {
            setSelectedLocation({ lat, lng })
            setIsMapOpen(false)
            toast.success('Location selected!')
          }}
        />

      </div>
    </div>
  )
}
