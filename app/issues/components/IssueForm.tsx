'use client'

import { ErrorMessage } from "@/app/components"
import { IssueSchema } from "@/app/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import SimpleMDE from 'react-simplemde-editor'
import z from "zod"

type IssueFormData=z.infer<typeof IssueSchema>


const IssueForm = ({issue}:{issue?:Issue}) => {
  const {register,handleSubmit,control,formState:{errors}}=useForm<IssueFormData>({
    resolver:zodResolver(IssueSchema)
  })
  const router=useRouter()
  const [error,setError]=useState('')
  const [isSubmitting,setSubmitting]=useState(false)
  const onSubmit=handleSubmit(
      async(data)=>{
        try{
          setSubmitting(true)
          if(issue)
            await axios.post(`/api/issues/${issue.id}`,data)  
          else
            await axios.post('/api/issues',data)
          router.push('/issues')
        }
        catch(error){
          setSubmitting(false)
          setError('An unexpected error occured!')
        }
      }
    )
  return (
    <div className="max-w-xl">
      {
        error && (
          <Callout.Root color="red" className="mb-5">
              <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )
      }
    <form className="space-y-3"
    onSubmit={onSubmit}
    >
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')} />
        {/* {errors.title && <Text color="red" as='p'>{errors.title?.message}</Text>} */}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
        name="desc"
        control={control}
        defaultValue={issue?.desc}
        render={({field})=>
        <SimpleMDE placeholder="Description" {...field} />
        }
        />
        {/* {errors.desc && <Text color="red" as='p'>{errors.desc?.message}</Text>} */}
        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>{issue?'Update Issue':'Submit New Issue'} {' '} {isSubmitting && <Spinner/>}</Button>
        
    </form>
    </div>
  )
}

export default IssueForm