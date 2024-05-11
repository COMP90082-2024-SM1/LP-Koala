"use client"
import React, {useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Trash, Edit } from "lucide-react";
import ConfirmModal from '@/components/confirm-modal';
import Cookies from "js-cookie";
import { getUserRole } from "@/lib/utils";

const ForumPost = ({ forum, onDelete, onEdit }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(Cookies.get('token'));
      setUserRole(role);
    };
  
    fetchUserRole();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
            <img src={forum.image} alt="Forum" className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
            <h2 className="text-xl font-bold">{forum.title}</h2>
            <p className="text-sm text-gray-500">Posted by {forum.username}</p>
            <p className="mt-2 text-gray-700">{forum.description}</p>
            </div>
            {userRole !== 'rater' && (
              <>
                <Edit size={18} onClick={onEdit} className="text-blue-500 m-1 cursor-pointer" />
                <Trash size={18} onClick={onDelete} className="text-red-500 m-1 cursor-pointer"/>
              </> 
            )}
        </div>
        <div className="mt-4">
            <textarea
            className="w-full p-2 border rounded"
            placeholder="Write a reply..."
            rows={4}
            ></textarea>
            <Button className="mt-2">Reply</Button>
        </div>
    </div>
  );
};

const ForumPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [editingForumId, setEditingForumId] = useState(null);

  const requestDelete = (forumId) => {
    setSelectedForumId(forumId);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    console.log("Deleting Forum with ID:", selectedForumId);
    setShowConfirmModal(false);
  };

  const onEdit = (forumId) => {
    setEditingForumId(forumId);
    // Navigate to the edit page or open an edit modal
    console.log("Editing Forum with ID:", forumId);
  };

  const forums = [
    {
      username: "JohnDoe",
      title: "Understanding React Hooks",
      description: "Let's discuss React Hooks and their best practices for functional components!",
      image: "https://via.placeholder.com/150"
    },
    {
      username: "JaneSmith",
      title: "Why TailwindCSS?",
      description: "Why do you prefer TailwindCSS over other CSS frameworks?",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
        <Link href='/projects/${projectId}/forums'>
            <Button style={{ width: '100px', position: 'relative', zIndex: 1 }} className="mt-auto mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </Button>
        </Link>
        {forums.map((forum, index) => (
            <ForumPost key={index} forum={forum} onDelete={() => requestDelete(forum.id)} onEdit={() => onEdit(forum.id)}/>
        ))}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
        />
    </div>
  );
};

export default ForumPage;
