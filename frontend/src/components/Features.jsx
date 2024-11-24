import React from 'react'
import { ChevronRight, Package, Car, Users, Clock, MapPin, Shield } from 'lucide-react'

const features = [
    { icon: Package, title: "Crowdsourced Deliveries", description: "Connect with local couriers for quick and efficient deliveries." },
    { icon: Car, title: "Community Ride-Sharing", description: "Share rides with community members going your way." },
    { icon: Users, title: "Build Your Network", description: "Grow your local connections as you deliver or ride." },
    { icon: Clock, title: "Flexible Scheduling", description: "Choose when you want to deliver or ride, on your terms." },
    { icon: MapPin, title: "Local Focus", description: "Support and strengthen your local community." },
    { icon: Shield, title: "Trust & Safety", description: "Verified users and secure transactions for peace of mind." }
  ]



function Features() {
  return (
    <div>
       <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How CommunityGo Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                  <feature.icon className="mx-auto text-orange-500 mb-6" size={56} />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  )
}

export default Features
