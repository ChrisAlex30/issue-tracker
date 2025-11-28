import { ArrowUpIcon } from "@radix-ui/react-icons"
import { Table } from "@radix-ui/themes"
import Link from "next/link"
import { IssueStatusBadge } from "../components"
import { StatusFilter } from "@/lib/types"
import { Issue } from "@prisma/client"
import NextLink from "next/link"


interface Props{
  searchParams:{
                status:StatusFilter,
                orderBy:keyof Issue,
                page:string
            },
  issues:Issue[]
}
type Cols = {
  label: string;
  value: keyof Issue;
  className?: string;
}[];
const columns:Cols=[
  {label:"Issue",value:"title"},
  {label:"Status",value:"status",className:"hidden md:table-cell"},
  {label:"Created",value:"createdAt",className:"hidden md:table-cell"},
]

const IssueTable = ({searchParams,issues}:Props) => {
  return (
    <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {
              columns.map(col=>
                <Table.ColumnHeaderCell key={col.value} className={col.className}>
                  <NextLink href={{
                    query:{status:searchParams.status,orderBy:col.value}
                  }}>{col.label}</NextLink>
                  {col.value===searchParams.orderBy && <ArrowUpIcon className='inline'/>}
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
  )
}

export default IssueTable