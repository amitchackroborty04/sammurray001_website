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

interface ListingFormData {
    country: string
    city: string
    propertyType: string
    areaSuburb: string
    exactAddress: string
    showExactAddress: boolean
    approxSize: string
    budgetFrom: string
    budgetTo: string
    requiredFromDate: string
    description: string
}

export function ListingFrom() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const { control, register, handleSubmit } = useForm<ListingFormData>({
        defaultValues: {
            country: '',
            city: '',
            propertyType: '',
            areaSuburb: '',
            exactAddress: '',
            showExactAddress: false,
            approxSize: '',
            budgetFrom: '',
            budgetTo: '',
            requiredFromDate: '',
            description: '',
        },
    })

    const onSubmit = (data: ListingFormData) => {
        console.log('Form Data:', data)
    }

    return (
        <div className="min-h-screen">
            <div className="mx-auto container px-5 py-8">

                <div className="mb-8 flex items-start justify-between md:mb-12">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-white md:text-5xl">
                            Add Your Listing
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Share your property with thousands of potential tenants
                        </p>
                    </div>
                </div>

                <Card className="border-none bg-white/10 p-4 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Row 1 */}
                        <div className="grid gap-6 md:grid-cols-2 items-center">

                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Country (NZ or AU)
                                </label>

                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md px-3 bg-transparent">
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

                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    City
                                </label>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md px-3 bg-transparent">
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

                        {/* Row 2 */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Property Type
                                </label>
                                <Controller
                                    name="propertyType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white rounded-md px-3 bg-transparent">
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

                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Area/Suburb
                                </label>
                                <Input
                                    {...register('areaSuburb')}
                                    placeholder="Sydney"
                                    className="h-[51px] border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md px-3 bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid gap-6 md:grid-cols-3">

                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Exact Address (Optional)
                                </label>

                                <Controller
                                    name="exactAddress"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-[51px] border border-[#BFBFBF] text-white rounded-md px-3 bg-transparent">
                                                <SelectValue placeholder="Address" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="address1">123 Main St</SelectItem>
                                                <SelectItem value="address2">456 Oak Ave</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* Show exact address radio */}
                            <div className="flex items-end">
                                <div className="w-full space-y-3">
                                    <label className="text-base font-medium text-white">
                                        Show exact address on map?
                                    </label>

                                    <div className="flex items-center gap-4 border border-[#BFBFBF] rounded-md p-2 h-[51px]">
                                        <label className="flex items-center gap-2 text-white">
                                            <input
                                                type="radio"
                                                {...register('showExactAddress')}
                                                value="true"
                                                className="accent-cyan-500"
                                            />
                                            <span className="text-gray-300">show exact</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-white">
                                            <input
                                                type="radio"
                                                {...register('showExactAddress')}
                                                value="false"
                                                className="accent-cyan-500"
                                            />
                                            <span className="text-gray-300">city-level only</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Approx. Size (sqm)
                                </label>

                                <Input
                                    {...register('approxSize')}
                                    placeholder="eg. 1500sqm"
                                    className="h-[51px] border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md px-3 bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Budget Range
                                </label>

                                <div className="flex gap-2">
                                    <Input
                                        {...register("budgetFrom")}
                                        type="number"
                                        placeholder="$0"
                                        className="no-spinner h-[51px] border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md px-3 bg-transparent"
                                    />

                                    <span className="flex items-center text-white">To</span>

                                    <Input
                                        {...register("budgetTo")}
                                        type="number"
                                        placeholder="$0"
                                        className="no-spinner h-[51px] border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md px-3 bg-transparent"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                    Required From Date
                                </label>
                                <Input
                                    {...register("requiredFromDate")}
                                    type="date"
                                    className="h-[51px] w-full border border-[#BFBFBF] text-white rounded-md px-3 bg-transparent"
                                    style={{
                                        colorScheme: "dark",
                                        paddingRight: "40px",
                                        backgroundPosition: "right 12px end",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "20px 20px",
                                    }}
                                />

                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                Description / Notes
                            </label>

                            <Textarea
                                {...register('description')}
                                placeholder="Type here..."
                                className="min-h-32 border border-[#BFBFBF] text-white placeholder-[#BFBFBF] rounded-md bg-transparent p-3"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className='pb-10'>
                            <label className="mb-3 flex items-center gap-2 text-base font-medium text-white">
                                Image
                            </label>

                            <div className="relative">
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#BFBFBF] bg-transparent py-12">
                                    {uploadedImage ? (
                                        <div className="relative w-full">
                                            <Image
                                                src={uploadedImage}
                                                alt="Uploaded"
                                                width={1000}
                                                height={1000}
                                                className="h-48 w-full rounded object-cover"
                                            />
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
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500 bg-transparent">
                                                <Upload className="h-6 w-6 text-cyan-400" />
                                            </div>
                                            <p className="mt-4 text-center text-gray-400">
                                                Drag & drop image or click to upload
                                            </p>
                                        </>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            const reader = new FileReader()
                                            reader.onload = (event) =>
                                                setUploadedImage(event.target?.result as string)
                                            reader.readAsDataURL(file)
                                        }
                                    }}
                                    className="absolute inset-0 opacity-0"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full rounded bg-gradient h-[50px] font-semibold text-white "
                        >
                            Add listing
                        </Button>

                    </form>
                </Card>
            </div>
        </div>
    )
}
