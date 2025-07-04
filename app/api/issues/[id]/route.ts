import { IssueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body= await req.json()
    const validation=IssueSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})

    const issue = await prisma.issue.findUnique({
        where: { id:parseInt(params.id) }
      })
    
      if (!issue) 
        return NextResponse.json({error:"Issue not found"},{status:404})

      const updatedIssue=await prisma.issue.update({
        where:{id:parseInt(params.id)},
        data:{
            title:body.title,
            desc:body.desc
        }
      })
      return NextResponse.json(updatedIssue,{status:201})

    
}


export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){

   const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const issue = await prisma.issue.findUnique({
        where: { id:parseInt(params.id) }
      })
    
      if (!issue) 
        return NextResponse.json({error:"Issue not found"},{status:404})

    await prisma.issue.delete({
        where:{id:issue.id}
      })
    return NextResponse.json("Deleted Successfully",{status:201})
}