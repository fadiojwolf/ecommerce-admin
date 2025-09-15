import prismadb from "@/lib/prismadb"
interface DashbordPageProps{
    params: Promise<{storeId:string}>;
}

const DashboardPage = async ({ params }: DashbordPageProps)  => {
    const {storeId} = await params;

    const store = await prismadb.store.findFirst({
        where: {
            id:storeId,
        }
    })
    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage;