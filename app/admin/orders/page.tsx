'use client'

import { useEffect, useState, useCallback } from 'react'
import { FiDownload,  FiTruck, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import LoadingSkeleton from '@/components/LoadingSkeleton'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  fullName: string
  address: string
  shippingProvider: string
  contact: string
  cartTotal: number
  cartItems: CartItem[]
  paymentProof: string | null
  createdAt: string
  status: 'pending' | 'verified' | 'shipped' | 'rejected'
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Memoized fetch function
  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/orders', {
        next: { revalidate: 60 } // Revalidate cache every 60 seconds
      })
      if (!response.ok) throw new Error('Failed to fetch orders')
      const { orders } = await response.json()
      setOrders(orders)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // Memoized status update
  const updateOrderStatus = useCallback(async (orderId: string, status: 'verified' | 'shipped' | 'rejected') => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      ))

      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      })
    } catch (error) {
      console.error('Update error:', error)
      // Revert on error
      fetchOrders()
    }
  }, [fetchOrders])

  const toggleOrderExpand = useCallback((orderId: string) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Order Dashboard</h1>
        <span className="text-sm bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No orders found
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="hover:bg-gray-50 transition-colors">
                {/* Order Header */}
                <div 
                  className="grid grid-cols-12 p-4 items-center cursor-pointer"
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div className="col-span-3 md:col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Order ID</div>
                    <div className="font-mono text-sm font-medium text-gray-800">
                      #{order.id.slice(-6)}
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-3">
                    <div className="text-xs text-gray-500 mb-1">Customer</div>
                    <div className="text-sm font-medium text-gray-800 truncate">
                      {order.fullName}
                    </div>
                  </div>

                  <div className="hidden md:block col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Shipping</div>
                    <div className="flex items-center">
                      <FiTruck className="text-rose-400 mr-1" size={14} />
                      <span className="text-sm text-gray-700">{order.shippingProvider}</span>
                    </div>
                  </div>

                  <div className="hidden md:block col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Total</div>
                    <div className="text-sm font-medium text-gray-800">
                      ${order.cartTotal.toFixed(2)}
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                          order.status === 'verified' ? 'bg-blue-50 text-blue-700' :
                          order.status === 'shipped' ? 'bg-green-50 text-green-700' :
                          order.status === 'rejected' ? 'bg-red-50 text-red-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {expandedOrder === order.id ? (
                          <FiChevronUp size={18} />
                        ) : (
                          <FiChevronDown size={18} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedOrder === order.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Customer Details
                          </h3>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Contact:</span> {order.contact}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Shipping:</span> {order.shippingProvider}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Delivery Address
                          </h3>
                          <p className="text-sm text-gray-700">{order.address}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="md:col-span-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Order Items
                        </h3>
                        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                          {order.cartItems.map((item) => (
                            <div key={item.id} className="p-3 flex justify-between">
                              <div className="text-sm font-medium text-gray-800">
                                {item.quantity} × {item.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                          <div className="p-3 flex justify-between bg-gray-50">
                            <div className="font-medium text-gray-800">Total</div>
                            <div className="font-medium text-gray-800">
                              ${order.cartTotal.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        {order.paymentProof && (
                          <a
                            href={order.paymentProof}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-rose-600 hover:text-rose-800"
                          >
                            <FiDownload className="mr-1" size={14} />
                            View Payment Proof
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'verified')}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              Verify Payment
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'rejected')}
                              className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Reject Order
                            </button>
                          </>
                        )}
                        {order.status === 'verified' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                          >
                            Mark as Shipped
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}