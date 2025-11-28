import { prisma } from '@/lib/prisma'
import { Table } from '@radix-ui/themes'
import {IssueStatusBadge,Link} from '@/app/components'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'
import { StatusFilter } from '@/lib/types'
import NextLink from "next/link"
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '../components/Pagination'

interface Props{
  searchParams:Promise<{status:StatusFilter,orderBy:keyof Issue,page:string}>
}
type Cols = {
  label: string;
  value: keyof Issue;
  className?: string;
}[];


const IssuesPage = async({searchParams}:Props) => {

const { status: rawStatus,orderBy,page:paramsPage } = await searchParams;

const statuses = Object.values(Status) as Status[];

const isStatus=(v: unknown): v is Status => typeof v === "string" && statuses.includes(v as Status);

const status: Status | undefined = isStatus(rawStatus) ? rawStatus : undefined;

const columns:Cols=[
  {label:"Issue",value:"title"},
  {label:"Status",value:"status",className:"hidden md:table-cell"},
  {label:"Created",value:"createdAt",className:"hidden md:table-cell"},
]

const order_by=columns.map(col=>col.value).includes(orderBy)?{[orderBy]:'asc'}:undefined

const page=parseInt(paramsPage) || 1;
const pageSize=10;
const issues =await prisma.issue.findMany({
    where:{
      status,
    },
    orderBy:order_by,
    skip:(page-1)*pageSize,
    take:pageSize
})

const issueCount =await prisma.issue.count({
    where:{
      status,
    }
})
  return (
    <div>
      <IssueActions/>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {
              columns.map(col=>
                <Table.ColumnHeaderCell key={col.value} className={col.className}>
                  <NextLink href={{
                    query:{status:rawStatus,orderBy:col.value}
                  }}>{col.label}</NextLink>
                  {col.value===orderBy && <ArrowUpIcon className='inline'/>}
                </Table.ColumnHeaderCell>
                
              )
            }
            {/* <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell> */}
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

      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </div>
  )
}

export default IssuesPage