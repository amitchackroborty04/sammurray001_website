import React, { useState } from 'react'
import { Edit } from 'lucide-react'

function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'Bessie',
    lastName: 'Edwards',
    email: 'darrellsteward@gmail.com',
    phone: '(307) 555-0133',
    country: 'USA',
    cityState: 'Alabama',
    roadArea: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Personal Information Card */}
        <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
              <span className="font-medium">Edit</span>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Country and City/State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  City/State
                </label>
                <input
                  type="text"
                  name="cityState"
                  value={formData.cityState}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Road/Area */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Road/Area
              </label>
              <textarea
                name="roadArea"
                value={formData.roadArea}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage