'use client'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function RiderPanelComponent() {
    const [assignments, setassignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchassignments = async () => {
            try {
                const data = await axios.get('/api/rider/getriderassignment');
                setassignments(data.data);
            } catch (error) {
                console.log('rider assignment ka error: ', error);
            } finally {
                setLoading(false);
            }
        }
        fetchassignments();
    }, []);

  return (
<div className="min-h-screen bg-gray-50 text-gray-900 p-6 mt-10">
  
  <div className="max-w-5xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-900 text-sm font-bold hover:text-gray-600 transition active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
    </div>

    <div className="mb-8">
      <h1 className="text-3xl font-black text-gray-900">
        Delivery <span className="text-yellow-500">Assignments</span>
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Manage and respond to incoming delivery requests
      </p>
    </div>
    {loading ? (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="space-y-4">
        {assignments.map((a) => (
          <div
            key={a._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span className="text-yellow-500 font-bold text-lg">
                <span className="text-gray-900">Order</span> #{a.order._id.slice(-6)}
              </span>

              <span className="text-gray-600 text-sm flex items-center gap-2">
                📍{a.order?.adress?.fulllocation}
              </span>
            </div>

            <div className="flex gap-3">
              <button className="bg-yellow-500 text-gray-900 px-5 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition shadow-sm">
                Accept
              </button>

              <button className="bg-gray-100 text-gray-700 border border-gray-300 px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
</div>
  )
}

export default RiderPanelComponent