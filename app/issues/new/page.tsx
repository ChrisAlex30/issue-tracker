'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller,SubmitHandler } from "react-hook-form"


const NewIssuePage = () => {
  const {register,handleSubmit,control}=useForm()
  return (
    <form onSubmit={handleSubmit((data)=>console.log(data))}
    className="max-w-xl space-y-3">
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
  )
}

export default NewIssuePage