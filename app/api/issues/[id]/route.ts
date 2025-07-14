import { IssueSchema, PatchIssueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body= await req.json()
    const validation=PatchIssueSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})

    const {title,desc,assignedToUserId}=body
    if(assignedToUserId && assignedToUserId!=="unassigned"){
      const user=await prisma.user.findUnique({
        where:{
          id:assignedToUserId
        }
      })
      if(!user)
        return NextResponse.json({ error: "Invalid User" }, { status: 401 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id:parseInt(params.id) }
      })
    
      if (!issue) 
        return NextResponse.json({error:"Issue not found"},{status:404})

      const assignedToUserIdParam=assignedToUserId==="unassigned"?null:assignedToUserId
      const updatedIssue=await prisma.issue.update({
        where:{id:parseInt(params.id)},
        data:{
            title,
            desc,
            assignedToUserId:assignedToUserIdParam
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