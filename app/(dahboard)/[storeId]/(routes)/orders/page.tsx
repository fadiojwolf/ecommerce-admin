import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { OrderClient } from "./components/client";
import { format } from "date-fns";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({
    params
} : {
    params: Promise<{ storeId: string }> 
}) => {
    const resolvedParams = await params; 
    
    const orders = await prismadb.order.findMany({
        where: {
            storeId: resolvedParams.storeId 
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => { 
            return total + Number(item.product.price);
        }, 0)),
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(", "),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders}/>
            </div>
        </div>
    )
}

export default OrdersPage;