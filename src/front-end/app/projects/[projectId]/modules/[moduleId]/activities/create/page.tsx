"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomEditor from "@/components/custom-editor";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import Cookies from "js-cookie";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  image: z.string().min(1, {
    message: "image is required",
  }),
});

const CreateActivityPage = ({params}:{params:{projectId: string, moduleId:string}}) => {



  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const onClick = async ()=> {
    const token = Cookies.get('token')!
    const response = await fetch("http://localhost:3000/activity", {
      method: "POST",
      body: JSON.stringify({description, content}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': token
      }
    })

    if (response.ok){
      const result = await response.json();
      console.log(result);
      router.push(`/projects/${params.projectId}/modules/${params.moduleId}`);
    }
  }

  return ( 

  <div className='p-6 h-full'>

    <div className='my-4 items-center gap-1.5'>
      <p className='text-center text-xl'>Creat Activity</p>
      <Label>Description</Label>
      <Input required value={description} onChange={(event)=>setDescription(event.target.value)}/>
    </div>
    <CustomEditor onUpdate={(content)=>{
        setContent(content);
      }}/>
    <Button type='button' onClick={onClick}>
      Create
    </Button>
  </div>
   );
}
 
export default CreateActivityPage;
