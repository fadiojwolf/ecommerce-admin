"use client"

import { Plus } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { use } from "react"

export const BillboardsClient = () => { 
    const route = useRouter();
    const params = useParams();
    return(
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title="Billboards (0)"
                description="Manage billboards for your store"

              />
           <Button onClick={() => route.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
           </Button>    
        </div>
        <Separator />
        </>
    )
}
