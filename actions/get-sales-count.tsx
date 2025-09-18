import prismadb from "@/lib/prismadb";
import { includes } from "zod";

export const getSalesCount = async (storeId: string) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true
        },
     
    });

    return salesCount;
}