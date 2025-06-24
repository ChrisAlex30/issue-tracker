'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import { useState, ChangeEvent } from "react";
import { createNewIssueType } from "@/lib/types";
import { useRouter } from "next/navigation";



const NewIssuePage = () => {
    const router = useRouter();
   const [issue,setIssue]= useState<createNewIssueType>(
    {
        title:'',
        desc:''
    }
   )
   const  handleChange = (
    e: ChangeEvent<HTMLInputElement> | string,
    field?: keyof createNewIssueType
   ) => {
    if (typeof e === "string" && field) {
      // SimpleMDE (just value and field name)
      setIssue(prev => ({
        ...prev,
        [field]: e
      }));
    } else if (typeof e !== "string") {
      const { name, value } = e.target;
      setIssue(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit =async (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();

  if(!issue.title || !issue.desc){
      alert('Plz fill all fields!!!')
      return
  }
  
  try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      console.log("Submitted successfully:", data);
      router.push('/')

    } catch (error) {
      console.error("Error submitting form:", error);
    }

};
  return (
    <div className="max-w-xl space-y-3">
        <TextField.Root name="title" value={issue.title} placeholder="Title" onChange={handleChange} />
        <SimpleMDE value={issue.desc}  placeholder="Description" onChange={(value:string)=>handleChange(value,"desc")}/>
            <Button onClick={handleSubmit}>Submit New Issue</Button>
        
    </div>
  )
}

export default NewIssuePage