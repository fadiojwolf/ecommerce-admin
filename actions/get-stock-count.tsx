import prismadb from "@/lib/prismadb";
import { includes } from "zod";

export const getStockCount = async (storeId: string) => {
    const stockCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false
        },
     
    });

    return stockCount;
}