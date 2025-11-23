import { prisma } from '@/lib/prisma'
import { Table } from '@radix-ui/themes'
import {IssueStatusBadge,Link} from '@/app/components'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'
import { StatusFilter } from '@/lib/types'

interface Props{
  searchParams:Promise<{status:StatusFilter}>
}


const IssuesPage = async({searchParams}:Props) => {

//TS doesnt let prisma use the code just below  
// const statuses=Object.values(Status);
// const status=statuses.includes(searchParams.status as Status)?searchParams.status:undefined;

const { status: rawStatus } = await searchParams;

const statuses = Object.values(Status) as Status[];

const isStatus=(v: unknown): v is Status => typeof v === "string" && statuses.includes(v as Status);

const status: Status | undefined = isStatus(rawStatus) ? rawStatus : undefined;

const issues =await prisma.issue.findMany({
    where:{
      status
    }
})
  return (
    <div>
      <IssueActions/>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
             {
              issues.map(issue=>(
                <Table.Row key={issue?.id}>
                    <Table.Cell>
                      <Link href={`/issues/${issue?.id}`}>
                      {issue?.title}
                      </Link>
                      <div className='block md:hidden'>
                          {issue?.status}
                      </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                      <IssueStatusBadge status={issue?.status}/>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              ))
             }   
        </Table.Body>

      </Table.Root>
    </div>
  )
}

export default IssuesPage