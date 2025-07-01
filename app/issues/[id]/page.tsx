import { prisma } from '@/lib/prisma'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { auth } from '@/auth'


const IssueDetailPage = async (
    {
  params,
}: {
  params: Promise<{ id: string }>
}
) => {

  const session = await auth()

  const { id } = await params
  
  const parsedId = Number(id)
  if (!Number.isInteger(parsedId) || parsedId <= 0) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id:parseInt(id) }
  })

  if (!issue) notFound()

  return (
    <Grid columns={{initial:"1",sm:"5"}} gap="5">
          <Box className='md:col-span-4'>
            <IssueDetails issue={issue}/>
          </Box>
          {session && (<Box>
                <Flex direction="column" gap="4">
                  <EditIssueButton issueId={issue.id}/>
                  <DeleteIssueButton issueId={issue.id}/>
                </Flex>
          </Box>)}
    </Grid>
    
  )
}

export default IssueDetailPage
