import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/lib/prisma'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

const IssueDetailPage = async (
    {
  params,
}: {
  params: Promise<{ id: string }>
}
) => {
  const { id } = await params
  
  const parsedId = Number(id)
  if (!Number.isInteger(parsedId) || parsedId <= 0) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id:parseInt(id) }
  })

  if (!issue) notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex my='2' gap='3'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt="4">
        <Markdown>{issue.desc}</Markdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage
