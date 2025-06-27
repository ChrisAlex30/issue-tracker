'use client'
import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type IssueForm=z.infer<typeof createIssueSchema>
const SimpleMDE=dynamic(()=>
import('react-simplemde-editor'),
{ssr:false}
)

const NewIssuePage = () => {
  const {register,handleSubmit,control,formState:{errors}}=useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  })
  const router=useRouter()
  const [error,setError]=useState('')
  const [isSubmitting,setSubmitting]=useState(false)
  const onSubmit=handleSubmit(
      async(data)=>{
        try{
          setSubmitting(true)
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
        <TextField.Root placeholder="Title" {...register('title')} />
        {/* {errors.title && <Text color="red" as='p'>{errors.title?.message}</Text>} */}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
        name="desc"
        control={control}
        render={({field})=>
        <SimpleMDE placeholder="Description" {...field} />
        }
        />
        {/* {errors.desc && <Text color="red" as='p'>{errors.desc?.message}</Text>} */}
        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
        
    </form>
    </div>
  )
}

export default NewIssuePage