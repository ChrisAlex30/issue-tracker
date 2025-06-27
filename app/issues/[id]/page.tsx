import { prisma } from '@/lib/prisma'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
    <Grid columns={{initial:"1",md:"2"}} gap="5">
          <Box>
            <IssueDetails issue={issue}/>
          </Box>
          <Box>
                <EditIssueButton issueId={issue.id}/>
          </Box>
    </Grid>
    
  )
}

export default IssueDetailPage
