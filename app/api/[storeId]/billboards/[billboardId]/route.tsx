import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params } : {params: Promise<{billboardId: string}>} 
) {
    try {
        const resolvedParams = await params; 
        
        if(!resolvedParams.billboardId){ 
            return new NextResponse("BillboardId is required",{status: 400})
        }

        const billboard = await prismadb.billboard.findUnique({
            where : {
                id: resolvedParams.billboardId, 
            }
        })

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[Billboard_GET]',error);
        return new NextResponse("Internal error",{status: 500})
    }
}

export async function PATCH (
    req: Request,
    { params } : {params: Promise<{storeId: string, billboardId: string}>} 
) {
    try {
        const resolvedParams = await params; 
        const {userId} = await auth();
        const body = await req.json();

        const {label, imageUrl} = body;
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401})
        }
        if(!label){
            return new NextResponse("Label is required", {status: 400})
        }
        if(!imageUrl){
            return new NextResponse("ImageURL is required", {status: 400})
        }

        if(!resolvedParams.billboardId){ 
            return new NextResponse("BillboardId is required",{status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: resolvedParams.storeId, 
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403});
        }

        const billboard = await prismadb.billboard.update({
            where : {
                id: resolvedParams.billboardId, 
            }, 
            data : {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_PATCH]',error);
        return new NextResponse("Internal error",{status: 500})
    }
}

export async function DELETE (
    req: Request,
    { params } : {params: Promise<{storeId: string, billboardId: string}>} 
) {
    try {
        const resolvedParams = await params; 
        const {userId} = await auth();

        if(!userId){
            return new NextResponse("Unauthenticated",{status:401})
        }

        if(!resolvedParams.billboardId){ 
            return new NextResponse("BillboardId is required",{status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: resolvedParams.storeId, 
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403});
        }

        const billboard = await prismadb.billboard.delete({
            where : {
                id: resolvedParams.billboardId, 
            }
        })

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[Billboard_DELETE]',error);
        return new NextResponse("Internal error",{status: 500})
    }
}