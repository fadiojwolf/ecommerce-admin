import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
    params
} : {
    params: Promise<{ CategoryId: string, storeId: string }> 
} ) => {

    const {CategoryId} = await params;
    
    const category = await prismadb.category.findUnique({
        where: {
            id: CategoryId
        }
    })

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: (await params).CategoryId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm 
                    billboards={billboards}
                    initialData={category} />
           
           </div>
        </div>
    )
}

export default CategoryPage;