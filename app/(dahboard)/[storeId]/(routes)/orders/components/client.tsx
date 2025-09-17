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

import { OrderColumn, columns } from "./columns"

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> =  ({
    data 
  }) => {    
    return(
        <>
        
            <Heading 
                title={`Orders (${data.length})`}
                description="Manage orders for your store"

              />
        <Separator />
        <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}
