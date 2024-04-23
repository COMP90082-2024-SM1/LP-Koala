"use client";

// import * as z from "zod";
// import React, { useState } from 'react';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react"
// import AllocationRater from '@/components/allocate-rater';
// import AllocationResearcher from '@/components/allocate-researcher';
// import Cookies from "js-cookie";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormLabel,
//   FormMessage,
//   FormItem,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {cn} from "@/lib/utils";

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "Title is required",
//   }),
//   image: z.string().min(1, {
//     message: "image is required",
//   }),
// });
// type FormData = z.infer<typeof formSchema>;

// const CreatePage = () => {
//   const router = useRouter();
//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       image: ""
//     },
//   });

//   const {formState: { isSubmitting, isValid }, reset } = form;
//   const [isRaterModalOpen, setRaterModalOpen] = useState(false);
//   const [isResearcherModalOpen, setResearcherModalOpen] = useState(false);
//   const [selectedRaters, setSelectedRaters] = useState<string[]>([]);
//   const [selectedResearchers, setselectedResearchers] = useState<string[]>([]);
//   const handleOpenRaterModal = (e: React.MouseEvent<HTMLButtonElement>) => {
//       e.preventDefault();
//       setRaterModalOpen(true);
//   };

//   const handleOpenResearcherModal = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setResearcherModalOpen(true);
// };

//   const handleRaterCloseModal = () => {
//       setRaterModalOpen(false);
//   };

//   const handleResearcherCloseModal = () => {
//     setResearcherModalOpen(false);
//   };

//   const handleConfirm = () => {
//       console.log("Allocation confirmed");
//       updateRaters(selectedRaters);
//       setRaterModalOpen(false);
//   };

//   const handleConfirm2 = () => {
//     console.log("Allocation confirmed");
//     updateResearchers(selectedResearchers);
//     setResearcherModalOpen(false);
// };

//   const updateRaters = (raters: string[]) => {
//     setSelectedRaters(raters);
//   };

//   const updateResearchers = (researchers: string[]) => {
//     setselectedResearchers(researchers);
//   };

//   const onSubmit = async (data: FormData) => {
//     const fullData = {
//       title: data.title,
//       image: data.image,
//       researchers: selectedResearchers,
//       raters: selectedRaters
//     };
//       console.log(fullData);

//     try {
//       const response = await fetch('http://localhost:3000/projects/createProject', {
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//             'Authorization': Cookies.get('token')!
//         },
//         body: JSON.stringify(fullData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create project');
//       }

//       const result = await response.json();
//       console.log(result);
//       reset();
//       router.push('/projects'); // Redirect user to the projects page
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return ( 
//     <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
//       <div>
//         <h1 className="text-2xl">
//           Name your project {projectId && ` - ID: ${projectId}`}
//         </h1>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-8 mt-8"
//           >
//             {/* Project Title Field */}
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Project title
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="e.g., 'Advanced web development'"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     What will you teach in this project?
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Image Upload Field */}
//             <FormField
//               control={form.control}
//               name="image"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Project image
//                   </FormLabel><br></br>
//                   <FormControl>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       disabled={isSubmitting}
//                       onChange={(e) => {
//                         if (e.target.files && e.target.files[0]) {
//                             const reader = new FileReader()

//                             reader.readAsDataURL(e.target.files[0])

//                             reader.onload = () => {
//                                 console.log('called: ', reader)
//                                 // console.log(reader.result)
//                                 field.onChange(reader.result)
//                             }
//                           field.onChange(e.target.files[0]);
//                         } else {
//                           field.onChange(null); // Set field value to null if no file is selected
//                         }
//                       }}
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     Upload an image for your project.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /><br></br>
//             {/* Allocate Raters Button */}
//             <Button onClick={handleOpenRaterModal}>
//                 Allocate Rater
//                 <ArrowRight className="h-4 w-4 mr-2" />
//             </Button>
//             <AllocationRater
//                 isOpen={isRaterModalOpen}
//                 onClose={handleRaterCloseModal}
//                 onConfirm={handleConfirm}
//                 onUpdateRaters={updateRaters}
//             /><br></br>
//             {/* Allocate Researchers Button */}
//             <Button onClick={handleOpenResearcherModal}>
//                 Allocate Researcher
//                 <ArrowRight className="h-4 w-4 mr-2" />
//             </Button>
//             <AllocationResearcher
//                 isOpen={isResearcherModalOpen}
//                 onClose={handleResearcherCloseModal}
//                 onConfirm={handleConfirm2}
//                 onUpdateResearchers={updateResearchers}
//             />
//             {/* Form Buttons */}
//             <div className="flex items-center gap-x-2">
//               <Link href="/projects">
//                 <Button
//                   type="button"
//                   variant="ghost"
//                 >
//                   Cancel
//                 </Button>
//               </Link>
//               <Button
//                 type="submit"
//                 disabled={!isValid || isSubmitting || isRaterModalOpen || isResearcherModalOpen}
//                 className={cn((isRaterModalOpen || isResearcherModalOpen) && 'z-[-10]')}
//               >
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//    );
// }
 
// export default CreatePage;

import * as z from "zod";
import React, {useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import AllocationRater from '@/components/allocate-rater';
import AllocationResearcher from '@/components/allocate-researcher';
import Cookies from "js-cookie";

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

interface PageProps {
  params: { projectId: string };
  form: any;
}

interface Project {
  title: string;
  image: string;
  researchers: string[];
  raters: string[];
}

const EditPage: React.FC<PageProps> = ({ params, form }) => {
  const [project, setProject] = useState<Project | null>(null);
  const isSubmitting = form?.isSubmitting;
  const handleSubmit = form?.handleSubmit;
  const isValid = form?.formState?.isValid;
  const [isRaterModalOpen, setRaterModalOpen] = useState(false);
  const [isResearcherModalOpen, setResearcherModalOpen] = useState(false);
  const [selectedRaters, setSelectedRaters] = useState<string[]>([]);
  const [selectedResearchers, setselectedResearchers] = useState<string[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`https://localhost:3000/projects/${params.projectId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': Cookies.get('token')!
        },
      });
      const data = await response.json();
      setProject(data);
    };

    fetchProject();
  }, [params.projectId]);

  const handleOpenRaterModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRaterModalOpen(true);
  };

  const handleOpenResearcherModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResearcherModalOpen(true);
  };

  const handleRaterCloseModal = () => {
    setRaterModalOpen(false);
  };

  const handleResearcherCloseModal = () => {
    setResearcherModalOpen(false);
  };
  const handleConfirm = () => {
    console.log("Rater allocation confirmed");
    updateRaters(selectedRaters);
    setRaterModalOpen(false);
  };

  const handleConfirm2 = () => {
    console.log("Researcher allocation confirmed");
    updateResearchers(selectedResearchers);
    setResearcherModalOpen(false);
  };

  const updateRaters = (raters: string[]) => {
    setSelectedRaters(raters);
  };

  const updateResearchers = (researchers: string[]) => {
    setselectedResearchers(researchers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (project) {
      setProject({ ...project, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit updated project data
    const response = await fetch(`https://localhost:3000/projects/${params.projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('token')!
      },
      body: JSON.stringify(project),
    });

    if (response.ok) {
      console.log('Project updated successfully!');
    } else {
      console.error('Failed to update the project');
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your project</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
           <label>
             Title:
             <input type="text" name="title" value={project.title} onChange={handleInputChange} />
           </label>
           <label>
             Image URL:
             <input type="text" name="image" value={project.image} onChange={handleInputChange} />
           </label>
           <Button onClick={handleOpenRaterModal}>
                Allocate Rater
                <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
            <AllocationRater
                isOpen={isRaterModalOpen}
                onClose={handleRaterCloseModal}
                onConfirm={handleConfirm}
                onUpdateRaters={updateRaters}
            /><br></br>
            {/* Allocate Researchers Button */}
            <Button onClick={handleOpenResearcherModal}>
                Allocate Researcher
                <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
            <AllocationResearcher
                isOpen={isResearcherModalOpen}
                onClose={handleResearcherCloseModal}
                onConfirm={handleConfirm2}
                onUpdateResearchers={updateResearchers}
            />
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
                disabled={!isValid || isSubmitting || isRaterModalOpen || isResearcherModalOpen}
                className={cn((isRaterModalOpen || isResearcherModalOpen) && 'z-[-10]')}
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

export default EditPage;