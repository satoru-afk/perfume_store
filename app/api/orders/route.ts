import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Define types for better type safety
type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
}

type OrderStatus = 'pending' | 'verified' | 'shipped' | 'rejected'

type Order = {
    id: string
    fullName: string | null
    address: string | null
    shippingProvider: string | null
    contact: string | null
    cartTotal: number
    cartItems: CartItem[]
    paymentProof: string | null
    createdAt: string
    status: OrderStatus
}

const ORDERS_FILE_PATH = path.join(process.cwd(), 'data', 'orders.json')

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        await fs.mkdir(path.dirname(ORDERS_FILE_PATH), { recursive: true })

        let orders: Order[] = []
        try {
            const existingData = await fs.readFile(ORDERS_FILE_PATH, 'utf-8')
            orders = JSON.parse(existingData)
        } catch (error) {
            console.log(error)
        }

        const paymentProof = formData.get('paymentProof') as File | null
        let proofFileName = null

        if (paymentProof) {
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
            await fs.mkdir(uploadsDir, { recursive: true })

            proofFileName = `proof_${Date.now()}_${paymentProof.name}`
            const filePath = path.join(uploadsDir, proofFileName)

            const bytes = await paymentProof.arrayBuffer()
            const buffer = Buffer.from(bytes)
            await fs.writeFile(filePath, buffer)
        }

        const newOrder: Order = {
            id: `order_${Date.now()}`,
            fullName: formData.get('fullName') as string,
            address: formData.get('address') as string,
            shippingProvider: formData.get('shippingProvider') as string,
            contact: formData.get('contact') as string,
            cartTotal: parseFloat(formData.get('cartTotal') as string),
            cartItems: JSON.parse(formData.get('cartItems') as string) as CartItem[],
            paymentProof: proofFileName ? `/uploads/${proofFileName}` : null,
            createdAt: new Date().toISOString(),
            status: 'pending',
        }

        orders.push(newOrder)
        await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2))

        return NextResponse.json({
            success: true,
            orderId: newOrder.id
        })

    } catch (error) {
        console.error('Error saving order:', error)
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to save order' },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        const { orderId, status } = await request.json() as { orderId: string, status: OrderStatus }

        if (!['verified', 'shipped', 'rejected'].includes(status)) {
            throw new Error('Invalid status')
        }

        const existingData = await fs.readFile(ORDERS_FILE_PATH, 'utf-8')
        const orders: Order[] = JSON.parse(existingData)

        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status } : order
        )

        await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(updatedOrders, null, 2))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating order:', error)
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to update order' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const data = await fs.readFile(ORDERS_FILE_PATH, 'utf-8')
        const orders: Order[] = JSON.parse(data)
        return NextResponse.json({ orders })
    } catch (error) {
        console.error('Error reading orders:', error)
        return NextResponse.json({ orders: [] })
    }
}