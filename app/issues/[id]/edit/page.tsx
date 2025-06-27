import React from 'react'
import IssueForm from '../../components/IssueForm'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

const EditIssuePage = async( {
  params,
}: {
  params: Promise<{ id: string }>
}) => {

const { id } = await params
  
  const parsedId = Number(id)
  if (!Number.isInteger(parsedId) || parsedId <= 0) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id:parseInt(id) }
  })

  if (!issue) notFound()

  return (
    <IssueForm issue={issue}/>
  )
}

export default EditIssuePage