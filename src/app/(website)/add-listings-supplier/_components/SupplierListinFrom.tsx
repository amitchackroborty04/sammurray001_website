// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import { toast } from 'sonner'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Card } from '@/components/ui/card'
// import { Upload } from 'lucide-react'
// import Image from 'next/image'
// import MapModal from './MapModal'
// import { useSession } from 'next-auth/react'

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Checkbox } from '@/components/ui/checkbox'

// interface SupplierListingFormData {
//   propertyName: string
//   country: string
//   city: string
//   propertyType: string
//   areaSuburb: string
//   exactAddress: string
//   approxSize: string
//   indicativeRentFrom: string
//   month: string
//   description: string
//   supplierIdCreateIdAgent?: string
//   managedByThisAgency?: boolean
// }

// interface PropertyType {
//   name: string
//   _id: string
// }

// interface Supplier {
//   _id: string
//   supplierId: {
//     _id: string
//     fullName: string
//   }
// }

// export function SupplierListingForm() {
//   const { data: session } = useSession()
//   const token = session?.user?.accessToken as string | undefined
//   const role = session?.user?.role

//   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
//   const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null)
//   const [isMapOpen, setIsMapOpen] = useState(false)
//   const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<SupplierListingFormData>({
//     defaultValues: {
//       propertyName: '',
//       country: '',
//       city: '',
//       propertyType: '',
//       areaSuburb: '',
//       exactAddress: '',
//       approxSize: '',
//       indicativeRentFrom: '',
//       month: '',
//       description: '',
//       supplierIdCreateIdAgent: '',
//       managedByThisAgency: false,
//     },
//   })

//   // FETCH PROPERTY TYPES - FIXED & SAFE
//   const { data: propertyTypesRaw, isLoading: isPropertyTypesLoading } = useQuery({
//     queryKey: ['propertyTypes'],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/propertytype/`)
//       if (!res.ok) throw new Error('Failed to fetch property types')
//       const json = await res.json()
//       return json.data ?? json ?? [] // Handles { data: [...] }, [...] or fallback
//     },
//   })

//   const propertyTypes: PropertyType[] = Array.isArray(propertyTypesRaw) ? propertyTypesRaw : []

//   // FETCH SUPPLIERS (ONLY FOR AGENT) - ALSO SAFE
//   const { data: suppliersRaw, isLoading: isSuppliersLoading } = useQuery({
//     enabled: role === 'AGENT',
//     queryKey: ['suppliers', token],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hire-agent/supplier`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       if (!res.ok) throw new Error('Failed to fetch suppliers')
//       const json = await res.json()
//       return json.data ?? json ?? []
//     },
//   })

//   const suppliers: Supplier[] = Array.isArray(suppliersRaw) ? suppliersRaw : []

//   // SUBMIT MUTATION
//   const mutation = useMutation({
//     mutationFn: async (formData: FormData) => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       })

//       const result = await res.json()
//       if (!res.ok) throw new Error(result.message || 'Failed to add listing')
//       return result
//     },
//     onSuccess: (data) => {
//       toast.success(data.message || 'Property added successfully!')
//       reset()
//       setUploadedImage(null)
//       setUploadedImageFile(null)
//       setSelectedLocation(null)
//     },
//     onError: (error: any) => {
//       toast.error(error.message || 'Upload failed. Please try again.')
//     },
//   })

//   // SUBMIT FUNCTION
//   const onSubmit = (data: SupplierListingFormData) => {
//     if (!token) return toast.error('You must be logged in!')

//     const formData = new FormData()

//     const payload: any = {
//       type: data.propertyType,
//       title: data.propertyName,
//       description: data.description || undefined,
//       country: data.country,
//       city: data.city,
//       areaya: data.areaSuburb || undefined,
//       address: data.exactAddress || data.areaSuburb || undefined,
//       size: data.approxSize ? `${data.approxSize.trim()} sqft` : undefined,
//       price: data.indicativeRentFrom ? Number(data.indicativeRentFrom) : 0,
//       mounth: data.month || undefined,
//       extraLocation: selectedLocation
//         ? {
//             type: 'Point',
//             coordinates: [selectedLocation.lng, selectedLocation.lat],
//           }
//         : undefined,
//     }

//     if (role === 'AGENT') {
//       if (data.supplierIdCreateIdAgent)
//         payload.supplyerIdCreateIdAgent = data.supplierIdCreateIdAgent
//       payload.managedByThisAgency = !!data.managedByThisAgency
//     }

//     const cleanPayload = Object.fromEntries(
//       Object.entries(payload).filter(([, v]) => v !== undefined)
//     )

//     formData.append('data', JSON.stringify(cleanPayload))

//     if (uploadedImageFile) {
//       formData.append('thumble', uploadedImageFile, uploadedImageFile.name)
//     }

//     mutation.mutate(formData)
//   }

//   // IMAGE UPLOAD
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('Image must be under 10MB')
//       return
//     }

//     setUploadedImageFile(file)
//     const reader = new FileReader()
//     reader.onload = (ev) => setUploadedImage(ev.target?.result as string)
//     reader.readAsDataURL(file)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#1a2745] via-[#0f1f3f] to-[#0a1428] p-4 md:p-8">
//       <div className="mx-auto container">
//         <div className="text-center pb-10">
//           <h1 className="text-4xl font-bold text-white md:text-5xl">Add Your Property</h1>
//           <p className="mt-2 text-gray-400">
//             Share your property with thousands of potential tenants
//           </p>
//         </div>

//         <Card className="border-none bg-white/10 backdrop-blur-lg p-6 md:p-10 shadow-2xl">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

//             {/* PROPERTY NAME */}
//             <div>
//               <label className="text-sm font-semibold text-white mb-2 block">
//                 Property Name *
//               </label>
//               <Input
//                 {...register('propertyName', { required: 'Required' })}
//                 placeholder="Property Name"
//                 className="h-12 border border-[#BFBFBF] text-white placeholder-gray-400 bg-transparent"
//               />
//               {errors.propertyName && (
//                 <p className="text-red-400 text-xs mt-1">{errors.propertyName.message}</p>
//               )}
//             </div>

//             {/* COUNTRY & CITY */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">Country</label>
//                 <Input {...register('country')} className="h-12 text-white bg-transparent" placeholder="Country" />
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">City</label>
//                 <Input {...register('city')} className="h-12 text-white bg-transparent" placeholder="City" />
//               </div>
//             </div>

//             {/* AGENT-ONLY FIELDS */}
//             {role === 'AGENT' && (
//               <>
//                 <div>
//                   <label className="text-sm font-semibold text-white mb-2 block">Supplier *</label>
//                   <Select
//                     onValueChange={(val) => setValue('supplierIdCreateIdAgent', val)}
//                     disabled={isSuppliersLoading}
//                   >
//                     <SelectTrigger className="h-12 border text-white bg-transparent">
//                       <SelectValue placeholder={isSuppliersLoading ? 'Loading...' : 'Select Supplier'} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {suppliers.map((sup: Supplier) => (
//                         <SelectItem key={sup._id} value={sup.supplierId._id}>
//                           {sup.supplierId.fullName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     checked={!!watch('managedByThisAgency')}
//                     onCheckedChange={(val) => setValue('managedByThisAgency', val === true)}
//                   />
//                   <label className="text-white text-sm">Managed By This Agency</label>
//                 </div>
//               </>
//             )}

//             {/* PROPERTY TYPE & AREA */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">Property Type *</label>
//                 <Select
//                   onValueChange={(val) => setValue('propertyType', val)}
//                   disabled={isPropertyTypesLoading}
//                 >
//                   <SelectTrigger className="h-12 border text-white bg-transparent">
//                     <SelectValue placeholder={isPropertyTypesLoading ? 'Loading...' : 'Select Type'} />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {propertyTypes.map((type: PropertyType) => (
//                       <SelectItem key={type._id} value={type._id}>
//                         {type.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">Area / Suburb</label>
//                 <Input
//                   {...register('areaSuburb')}
//                   placeholder="Area / Suburb"
//                   className="h-12 text-white bg-transparent"
//                 />
//               </div>
//             </div>

//             {/* ADDRESS & MAP */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">
//                   Exact Address (Optional)
//                 </label>
//                 <Input
//                   {...register('exactAddress')}
//                   placeholder="Exact Address"
//                   className="h-12 text-white bg-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">
//                   Location on Map
//                 </label>
//                 <Button
//                   type="button"
//                   className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
//                   onClick={() => setIsMapOpen(true)}
//                 >
//                   {selectedLocation ? 'Change Location' : 'Pick Location'}
//                 </Button>

//                 {selectedLocation && (
//                   <p className="mt-2 text-green-400 text-xs">
//                     Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* SIZE & RENT */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">
//                   Size (sqft)
//                 </label>
//                 <Input
//                   {...register('approxSize')}
//                   placeholder="e.g. 1200"
//                   className="h-12 text-white bg-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-white mb-2 block">
//                   Monthly Rent (BDT)
//                 </label>
//                 <Input
//                   {...register('indicativeRentFrom')}
//                   type="number"
//                   placeholder="e.g. 25000"
//                   className="h-12 text-white bg-transparent"
//                 />
//               </div>
//             </div>

//             {/* AVAILABLE MONTH */}
//             <div>
//               <label className="text-sm font-semibold text-white mb-2 block">Available From</label>
//               <Input
//                 {...register('month')}
//                 placeholder="e.g. December 2025"
//                 className="h-12 text-white bg-transparent"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <label className="text-sm font-semibold text-white mb-2 block">Description</label>
//               <Textarea
//                 {...register('description')}
//                 rows={5}
//                 placeholder="Describe your property..."
//                 className="text-white bg-transparent border-[#BFBFBF]"
//               />
//             </div>

//             {/* IMAGE UPLOAD */}
//             <div>
//               <label className="text-sm font-semibold text-white mb-2 block">
//                 Property Image
//               </label>

//               <div className="relative border-2 border-dashed border-white/30 rounded-xl p-10 text-center cursor-pointer hover:border-white/50 transition">
//                 {uploadedImage ? (
//                   <div className="relative">
//                     <Image
//                       src={uploadedImage}
//                       alt="Thumbnail"
//                       width={800}
//                       height={400}
//                       className="mx-auto rounded-lg max-h-80 object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setUploadedImage(null)
//                         setUploadedImageFile(null)
//                       }}
//                       className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <Upload className="mx-auto h-16 w-16 text-cyan-400 mb-4" />
//                     <p className="text-gray-300">Click to upload image (max 10MB)</p>
//                   </>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//               </div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <Button
//               type="submit"
//               className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-xl transition"
//               disabled={mutation.isPending}
//             >
//               {mutation.isPending ? 'Uploading...' : 'Add Property Listing'}
//             </Button>
//           </form>
//         </Card>

//         {/* MAP MODAL */}
//         <MapModal
//           isOpen={isMapOpen}
//           onClose={() => setIsMapOpen(false)}
//           initialLat={23.8103}
//           initialLng={90.4125}
//           onLocationSelect={(lat, lng) => {
//             setSelectedLocation({ lat, lng })
//             setIsMapOpen(false)
//             toast.success('Location selected!')
//           }}
//         />
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload, X } from 'lucide-react'
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

  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedImageFiles, setUploadedImageFiles] = useState<File[]>([])
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  const MAX_IMAGES = 10

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
      country: 'Bangladesh',
      city: 'Dhaka',
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

  // FETCH PROPERTY TYPES - SAFE
  const { data: propertyTypesRaw, isLoading: isPropertyTypesLoading } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/propertytype/`)
      if (!res.ok) throw new Error('Failed to fetch property types')
      const json = await res.json()
      return json.data ?? json ?? []
    },
  })
  const propertyTypes: PropertyType[] = Array.isArray(propertyTypesRaw) ? propertyTypesRaw : []

  // FETCH SUPPLIERS - SAFE
  const { data: suppliersRaw, isLoading: isSuppliersLoading } = useQuery({
    enabled: role === 'AGENT',
    queryKey: ['suppliers', token],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hire-agent/supplier`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to fetch suppliers')
      const json = await res.json()
      return json.data ?? json ?? []
    },
  })
  const suppliers: Supplier[] = Array.isArray(suppliersRaw) ? suppliersRaw : []

  // SUBMIT - Sends thumble as ARRAY
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
      setUploadedImages([])
      setUploadedImageFiles([])
      setSelectedLocation(null)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Upload failed. Please try again.')
    },
  })

  const onSubmit = (data: SupplierListingFormData) => {
    if (!token) return toast.error('You must be logged in!')
    if (uploadedImageFiles.length === 0) return toast.error('Please upload at least one image')

    const formData = new FormData()

    const payload: any = {
      type: data.propertyType,
      title: data.propertyName,
      description: data.description || undefined,
      country: data.country || undefined,
      city: data.city || undefined,
      areaya: data.areaSuburb || undefined,
      address: data.exactAddress || data.areaSuburb || undefined,
      size: data.approxSize ? `${data.approxSize.trim()} sqft` : undefined,
      price: data.indicativeRentFrom ? Number(data.indicativeRentFrom) : undefined,
      mounth: data.month || undefined,
      extraLocation: selectedLocation
        ? { type: 'Point', coordinates: [selectedLocation.lng, selectedLocation.lat] }
        : undefined,
    }

    if (role === 'AGENT') {
      if (data.supplierIdCreateIdAgent)
        payload.supplyerIdCreateIdAgent = data.supplierIdCreateIdAgent
      payload.managedByThisAgency = !!data.managedByThisAgency
    }

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    )

    formData.append('data', JSON.stringify(cleanPayload))

    // SEND ALL IMAGES AS "thumble" ARRAY
    uploadedImageFiles.forEach((file) => {
      formData.append('thumble', file) // This will create thumble[] array
    })

    mutation.mutate(formData)
  }

  // MULTIPLE IMAGE UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
    const remaining = MAX_IMAGES - uploadedImageFiles.length

    if (newFiles.length > remaining) {
      toast.warning(`Only ${remaining} more images allowed.`)
      newFiles.splice(remaining)
    }

    newFiles.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB`)
        return
      }

      const reader = new FileReader()
      reader.onload = (ev) => {
        setUploadedImages(prev => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
      setUploadedImageFiles(prev => [...prev, file])
    })

    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
    setUploadedImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2745] via-[#0f1f3f] to-[#0a1428] p-4 md:p-8">
      <div className="mx-auto container max-w-5xl">
        <div className="text-center pb-10">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Add Your Property</h1>
          <p className="mt-2 text-gray-400">Share your property with thousands of potential tenants</p>
        </div>

        <Card className="border-none bg-white/10 backdrop-blur-lg p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Your existing fields (unchanged) */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Property Name *</label>
              <Input
                {...register('propertyName', { required: 'Required' })}
                placeholder="e.g. Luxury Flat in Gulshan"
                className="h-12 bg-transparent border-white/20 text-white placeholder-gray-400"
              />
              {errors.propertyName && <p className="text-red-400 text-xs mt-1">{errors.propertyName.message}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Country</label>
                <Input {...register('country')} defaultValue="Bangladesh" className="h-12 bg-transparent border-white/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">City</label>
                <Input {...register('city')} placeholder="e.g. Dhaka" className="h-12 bg-transparent border-white/20 text-white" />
              </div>
            </div>

            {role === 'AGENT' && (
              <>
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">Supplier *</label>
                  <Select onValueChange={(val) => setValue('supplierIdCreateIdAgent', val)}>
                    <SelectTrigger className="h-12 bg-transparent border-white/20 text-white">
                      <SelectValue placeholder={isSuppliersLoading ? 'Loading...' : 'Select Supplier'} />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((sup) => (
                        <SelectItem key={sup._id} value={sup.supplierId._id}>
                          {sup.supplierId.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={!!watch('managedByThisAgency')}
                    onCheckedChange={(v) => setValue('managedByThisAgency', v === true)}
                  />
                  <label className="text-white text-sm font-medium">Managed by this agency</label>
                </div>
              </>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Property Type *</label>
                <Select onValueChange={(val) => setValue('propertyType', val)}>
                  <SelectTrigger className="h-12 bg-transparent border-white/20 text-white">
                    <SelectValue placeholder={isPropertyTypesLoading ? 'Loading...' : 'Select Type'} />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Area / Suburb</label>
                <Input {...register('areaSuburb')} placeholder="e.g. Banani" className="h-12 bg-transparent border-white/20 text-white" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Exact Address (Optional)</label>
                <Input {...register('exactAddress')} placeholder="House 12, Road 5" className="h-12 bg-transparent border-white/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Location on Map</label>
                <Button type="button" onClick={() => setIsMapOpen(true)} className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600">
                  {selectedLocation ? 'Change Location' : 'Pick Location'}
                </Button>
                {selectedLocation && (
                  <p className="text-green-400 text-xs mt-2">
                    Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Size (sqft)</label>
                <Input {...register('approxSize')} placeholder="e.g. 1800" className="h-12 bg-transparent border-white/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Monthly Rent (BDT)</label>
                <Input {...register('indicativeRentFrom')} type="number" placeholder="e.g. 45000" className="h-12 bg-transparent border-white/20 text-white" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Available From</label>
              <Input {...register('month')} placeholder="e.g. January 2026" className="h-12 bg-transparent border-white/20 text-white" />
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Description</label>
              <Textarea
                {...register('description')}
                rows={5}
                placeholder="Describe your property..."
                className="bg-transparent border-white/20 text-white placeholder-gray-400"
              />
            </div>

            {/* MULTIPLE IMAGE UPLOAD - Sends as thumble[] */}
            <div>
              <label className="text-sm font-semibold text-white mb-3 block">
                Property Images * (Up to {MAX_IMAGES})
              </label>

              <div className="relative border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-white/50 transition cursor-pointer">
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                    {uploadedImages.map((src, i) => (
                      <div key={i} className="relative group">
                        <Image
                          src={src}
                          alt={`Image ${i + 1}`}
                          width={400}
                          height={400}
                          className="rounded-lg object-cover w-full h-48 border border-white/20"
                        />
                        {i === 0 && (
                          <div className="absolute bottom-2 left-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded">
                            Cover
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedImages.length < MAX_IMAGES && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="py-8">
                      <Upload className="mx-auto h-16 w-16 text-cyan-400 mb-4" />
                      <p className="text-gray-300 text-lg">
                        {uploadedImages.length === 0
                          ? 'Click to upload up to 10 images'
                          : `Add ${MAX_IMAGES - uploadedImages.length} more`}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Max 10MB per image</p>
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {uploadedImages.length}/{MAX_IMAGES} images selected
              </p>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending || uploadedImageFiles.length === 0}
              className="w-full h-14 text-lg font-bold bg-gradient hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-xl"
            >
              {mutation.isPending ? 'Uploading...' : 'Add Property Listing'}
            </Button>
          </form>
        </Card>

        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          initialLat={23.8103}
          initialLng={90.4125}
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