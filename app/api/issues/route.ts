import {prisma} from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { IssueSchema } from '../../validationSchemas'
import { auth } from '@/auth'

export async function POST(req:NextRequest){
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body= await req.json()
    const validation=IssueSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})

    const newIssue=await prisma.issue.create({
        data:{
            title:body.title,
            desc:body.desc
        }
    })

    return NextResponse.json(newIssue,{status:201})
    
}