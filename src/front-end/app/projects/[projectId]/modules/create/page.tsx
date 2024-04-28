"use client";

import * as z from "zod";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

import {
  Form,
  FormControl,
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
});
type FormData = z.infer<typeof formSchema>;

interface ProjectProps  {
    params: {projectId: string}
}

function CreatePage({params}:ProjectProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const {formState: { isSubmitting, isValid }, reset } = form;

  const onSubmit = async (data: FormData) => {
    const fullData = {
      title: data.title,
      projectId: params.projectId
    };
      console.log(fullData);

    try {
      const response = await fetch('http://localhost:3000/modules/createModule', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': Cookies.get('token')!
        },
        body: JSON.stringify(fullData)
      });

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error('Failed to create module');
      }

      try {
        reset();
        location.replace(`/projects/${params.projectId}/modules/${responseBody.data._id}`)
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          throw new Error('Server error: Expected JSON response, received something else.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return ( 
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Create your module
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            {/* Module Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Module title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., 'Module 1'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Form Buttons */}
            <div className="flex items-center gap-x-2">
              <Link href={`/projects/${params.projectId}`}>
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
                className={cn()}
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