'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller,SubmitHandler } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


const NewIssuePage = () => {
  const {register,handleSubmit,control}=useForm()
  const router=useRouter()
  const [error,setError]=useState('')
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
    onSubmit={handleSubmit(
      async(data)=>{
        try{
          await axios.post('/api/issues',data)
          router.push('/issues')
        }
        catch(error){
          setError('An unexpected error occured!')
        }
      }
    )}
    >
        <TextField.Root placeholder="Title" {...register('title')} />
        <Controller
        name="desc"
        control={control}
        render={({field})=>
        <SimpleMDE placeholder="Description" {...field} />
        }
        />
            <Button>Submit New Issue</Button>
        
    </form>
    </div>
  )
}

export default NewIssuePage