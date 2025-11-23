"use client"

import { StatusFilter } from "@/lib/types"
import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"



const statuses:{label:String,value:StatusFilter | "ALL"}[]=[
    {label:"All", value:"ALL"},
    {label:"Open", value:"OPEN"},
    {label:"Closed",value:"CLOSED"},
    {label:"In Progress",value:"IN_PROGRESS"}
]
const IssueStatusFilter = () => {

  const router=useRouter() ;
  const searchParams=useSearchParams()

  return (
    <Select.Root 
    defaultValue={searchParams.get("status") || "ALL"}
    onValueChange={(status)=>{
        const params=new URLSearchParams();
        if(status) params.append('status',status);
        if(searchParams.get('orderBy')) params.append('orderBy',searchParams.get('orderBy')!)
        const query=params.size? `?${params.toString()}`:""
        router.push(`/issues${query}`);
    }}>
        <Select.Trigger placeholder="Filter by Status..."/>
            <Select.Content>
                    {
                        statuses.map(st=>(
                            <Select.Item key={st.value}
                            value={st.value}>
                                {st.label}
                            </Select.Item>
                        ))
                    }
            </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter