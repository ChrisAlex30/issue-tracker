import { prisma } from '@/lib/prisma'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import ClientOnlyIssueForm from '../../components/ClientOnlyIssueForm'


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
    <ClientOnlyIssueForm issue={issue}/>
  )
}

export default EditIssuePage