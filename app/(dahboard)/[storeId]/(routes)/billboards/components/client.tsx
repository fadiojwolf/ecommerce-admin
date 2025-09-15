"use client"

import { Hand, Plus } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

import { Billboard } from "@prisma/client"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { use } from "react"
import { ApiList } from "@/components/ui/api-list"

import { BillboardColumn, columns } from "./columns"

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> =  ({
    data 
  }) => {    
    const route = useRouter();
    const params = useParams();
    return(
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Billboards (${data.length})`}
                description="Manage billboards for your store"

              />
           <Button onClick={() => route.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
           </Button>    
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={data} />
        <Heading title="API" description="API calls for Billbords " />
        <Separator />
        <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}
