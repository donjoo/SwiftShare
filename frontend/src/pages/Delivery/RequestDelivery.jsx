import React, { useState } from 'react'
import { MapPin, Package } from 'lucide-react'

export default function DeliveryPage() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    details: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Delivery Details:', formData)
    // Implement form submission logic here (e.g., API call)
    alert('Delivery request submitted successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-orange-500">CommunityGo</div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">
                Deliveries
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">
                About Us
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Delivery Form Section */}
      <main className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Create a Delivery Request</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="from" className="block text-gray-800 font-semibold mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute text-gray-400 top-1/2 transform -translate-y-1/2 left-3" size={20} />
                <input
                  type="text"
                  id="from"
                  name="from"
                  placeholder="Enter pickup location"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="to" className="block text-gray-800 font-semibold mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute text-gray-400 top-1/2 transform -translate-y-1/2 left-3" size={20} />
                <input
                  type="text"
                  id="to"
                  name="to"
                  placeholder="Enter drop-off location"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="details" className="block text-gray-800 font-semibold mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                id="details"
                name="details"
                rows="4"
                placeholder="Enter any specific instructions or package details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 transform"
            >
              Submit Request
              <Package className="ml-2" size={24} />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
