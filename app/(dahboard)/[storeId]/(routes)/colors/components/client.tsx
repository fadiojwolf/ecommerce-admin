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

import { ColorColumn, columns } from "./columns"

interface ClorsClientProps {
    data: ColorColumn[]
}

export const ColorsClient: React.FC<ClorsClientProps> =  ({
    data 
  }) => {    
    const route = useRouter();
    const params = useParams();
    return(
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Colors (${data.length})`}
                description="Manage colors for your store"

              />
           <Button onClick={() => route.push(`/${params.storeId}/colors/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
           </Button>    
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="API" description="API calls for Colors " />
        <Separator />
        <ApiList entityName="colors" entityIdName="ColorId" />
        </>
    )
}
