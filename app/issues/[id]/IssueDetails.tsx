import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import Markdown from 'react-markdown'

const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <>
        <Heading>{issue.title}</Heading>
        <Flex my='2' gap='3'>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt="4">
            <Markdown>{issue.desc}</Markdown>
        </Card>
    </>
  )
}

export default IssueDetails