"use client";

import * as z from "zod";
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {cn} from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
  // image: z.string().min(1, {
  //   message: "image is required",
  // }),
});
type FormData = z.infer<typeof formSchema>;

function CreatePage({params}: {params:{projectId: string}}) {
  const router = useRouter();
  const {projectId} = params;
  const [currentUser, setCurrentUser] = useState(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content:"",
      // image: ""
    },
  });
  const {formState: { isSubmitting, isValid }, reset } = form;

  const fetchUser = async () => {
    const token = Cookies.get('token')!;
    if (token) {
      try {
        const user = await getCurrentUser(token);
        console.log(user)
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data: FormData) => {
    const fullData = {
      user: currentUser.id,
      title: data.title,
      content: data.content,
      // image: data.image,
    };
      console.log(fullData);

    try {
      const response = await fetch('localhost:3000/projects/${projectId}/forums/6641bef75ace9cf438c45c36', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': Cookies.get('token')!
        },
        body: JSON.stringify(fullData)
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const result = await response.json();
      console.log(result);
      reset();
      router.push('/projects/${projectId}/forums');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return ( 
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <Link href='/projects/${projectId}/forums'>
          <Button style={{ width: '100px', position: 'relative', zIndex: 1 }} className="mt-auto mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
          </Button>
        </Link>
        <h1 className="text-2xl">
          Create your Thread
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            {/* Project Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Forum title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., 'Advanced Spanish'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Content Upload Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Forum Content
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter detailed project content"
                      rows={10}
                      className="w-full p-2 border rounded"
                    />
                  </FormControl>
                  <FormMessage>
                  </FormMessage>
                </FormItem>
              )}
            />
            {/* Image Upload Field */}
            {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Forum image
                  </FormLabel><br></br>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isSubmitting}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader()
                            reader.readAsDataURL(e.target.files[0])
                            reader.onload = () => {
                                console.log('called: ', reader)
                                // console.log(reader.result)
                                field.onChange(reader.result)
                            }
                          field.onChange(e.target.files[0]);
                        } else {
                          field.onChange(null); // Set field value to null if no file is selected
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /><br></br> */}
            {/* Form Buttons */}
            <div className="flex items-center gap-x-2">
              <Link href="/projects">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={cn('z-[-10]')}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;