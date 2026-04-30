'use client'
import { getsocket } from '@/config/socketio';
import axios from 'axios'
import { ArrowLeft, MapPin, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

function RiderPanelComponent() {
    const { data: session } = useSession();
    const [assignments, setassignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user) return;

        const socket = getsocket();
        const currentRiderId = (session.user as any).id;

        socket.on('new-assignment', (data) => {
            const isForMe = data.riderIds?.includes(currentRiderId);
            if (isForMe) {
                setassignments((prev) => [data.assignment, ...prev]);
            }
        });

        socket.on('assignment-accepted', (data) => {
            setassignments((prev) => prev.filter((a) => a._id !== data.assignmentId));
        });

        return () => {
            socket.off('new-assignment');
            socket.off('assignment-accepted');
        }
    }, [session]);

    useEffect(() => {
        const fetchassignments = async () => {
            try {
                const res = await axios.get('/api/rider/getriderassignment');
                setassignments(res.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchassignments();
    }, []);

    const handleResponse = async (assignment: any, action: 'accepted' | 'rejected') => {
        try {
            const res = await axios.post('/api/rider/responsdingassignment', {
                assignmentId: assignment._id,
                orderId: assignment.order._id,
                action: action
            });

            if (res.data.success) {
                setassignments((prev) => prev.filter((a) => a._id !== assignment._id));
            }
        } catch (error: any) {
            alert(error.response?.data?.error || "Failed to respond");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 mt-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-sm hover:text-yellow-600 transition">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Link>
                </div>

                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tight">
                        Delivery <span className="text-yellow-500">Assignments</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage your real-time delivery requests</p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                        <p className="font-bold text-gray-400">Loading Assignments...</p>
                    </div>
                ) : assignments.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl py-24 flex flex-col items-center justify-center text-center px-6">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <Package className="w-12 h-12 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800">No Orders Available</h2>
                        <p className="text-gray-500 max-w-xs mt-2 font-medium">
                            Everything is up to date! New assignments will appear here in real-time.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-500 text-white">
                                        <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider">Order Details</th>
                                        <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider">Location</th>
                                        <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {assignments.map((a) => (
                                        <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-yellow-500 font-black text-lg leading-none">
                                                        #{a.order?._id.slice(-6).toUpperCase()}
                                                    </span>
                                                    <span className="text-gray-400 text-xs font-bold mt-1 uppercase">ID: {a.order?._id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-start gap-2 max-w-md">
                                                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 font-semibold leading-snug">
                                                        {a.order?.adress?.fulllocation || "Location not specified"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        onClick={() => handleResponse(a, 'accepted')}
                                                        className="bg-yellow-500 text-gray-900 px-6 py-2.5 rounded-xl font-black text-sm hover:bg-yellow-400 hover:shadow-md transition-all active:scale-95"
                                                    >
                                                        ACCEPT
                                                    </button>
                                                    <button 
                                                        onClick={() => handleResponse(a, 'rejected')}
                                                        className="bg-white text-gray-500 border-2 border-gray-100 px-6 py-2.5 rounded-xl font-black text-sm hover:bg-gray-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
                                                    >
                                                        REJECT
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RiderPanelComponent;