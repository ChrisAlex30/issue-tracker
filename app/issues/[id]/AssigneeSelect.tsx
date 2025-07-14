'use client'

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import IssueFormSkeleton from "../components/IssueFormSkeleton"
import {toast,Toaster} from 'react-hot-toast'

const AssigneeSelect = ({issue}:{issue:Issue}) => {
  
  const {data:users,error,isLoading}=useQuery<User[]>({
    queryKey:['users'],
    queryFn:()=>axios.get('/api/users').then(res=>res.data),
    staleTime:60000,
    retry:3
  })

  if(isLoading) return <IssueFormSkeleton/>

  if(error) return null
    
  return (
    <>
    <Select.Root defaultValue={issue.assignedToUserId || "unassigned"} onValueChange={
        (userId)=>{
            console.log({userId})
            axios.patch(`/api/issues/${issue.id}`,{assignedToUserId:userId || null})
            .then(() => toast.success("Assignee updated"))
            .catch((err)=>{
                console.log(err)
                toast.error("Changes could not be saved!!!")
            })
        }
    }>
        <Select.Trigger placeholder="Assign..."/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestion</Select.Label>
                <Select.Item value="unassigned">Unassigned</Select.Item>
                {
                    users?.map(user=>
                            (
                                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                            )
                    )
                }
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  )
}

export default AssigneeSelect