"use client";

import * as z from "zod";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import Allocation from '@/components/allocate-rater';

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

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await axios.post("/api/courses", values);
//       router.push(`/teacher/courses/${response.data.id}`);
//       toast.success("Course created");
//     } catch {
//       toast.error("Something went wrong");
//     }
//   }
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirm = () => {
        console.log("Allocation confirmed");
        // Perform your allocation logic here or redirect
        setModalOpen(false);
    };

  return ( 
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your project
        </h1>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            {/* Project Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Project title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this project?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Project Description Field */}
            {/* <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Project description
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      disabled={isSubmitting}
                      placeholder="Describe what your project is about"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Project image
                  </FormLabel><br></br>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isSubmitting}
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an image for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /><br></br>
            {/* Allocate Users Button */}
            <Button onClick={handleOpenModal}>
                Allocate Rater
                <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
            <Allocation
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
            />
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
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>

   );
}
 
export default CreatePage;