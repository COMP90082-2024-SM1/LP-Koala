"use client"
import React, {useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import he from "he";
import Link from "next/link";
import { ArrowLeft, Trash, Edit } from "lucide-react";
import ConfirmModal from '@/components/confirm-modal';
import Cookies from "js-cookie";
import { getUserRole } from "@/lib/utils";

// const ForumPost = ({ forum, onDelete }) => {
//   const [userRole, setUserRole] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const role = await getUserRole(Cookies.get('token'));
//       setUserRole(role);
//     };
  
//     fetchUserRole();
//   }, []);

//   return (
//     <div className="bg-white shadow rounded-lg p-6 mb-6">
//         <div className="flex items-start space-x-4">
//             {/* <img src={forum.image} alt="Forum" className="w-16 h-16 rounded-full object-cover" /> */}
//             <div className="flex-1">
//             <h2 className="text-xl font-bold">{forum.title}</h2>
//             <p className="text-sm text-gray-500">Posted by {forum.username}</p>
//             <p className="mt-2 text-gray-700">{forum.description}</p>
//             </div>
//             {userRole !== 'rater' && (
//               <>
//                 {/* <Edit size={18} onClick={onEdit} className="text-blue-500 m-1 cursor-pointer" /> */}
//                 <Trash size={18} onClick={onDelete} className="text-red-500 m-1 cursor-pointer"/>
//               </> 
//             )}
//         </div>
//         <div className="mt-4">
//             <textarea
//             className="w-full p-2 border rounded"
//             placeholder="Write a reply..."
//             rows={4}
//             ></textarea>
//             <Button className="mt-2">Reply</Button>
//         </div>
//     </div>
//   );
// };
interface Post {
  _id: string;
  content: string;
  user: string;
}

interface User {
  _id: string;
  name: string;
}

const ThreadIdPage = ({
                        params
                      }: {
  params:{ projectId: string; threadId: string}
                      }) => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openConfirmModal = () => setShowConfirmModal(true);
  const closeConfirmModal = () => setShowConfirmModal(false);
  const [threadIdToDelete, setThreadIdToDelete] = useState(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllUsers = async () => {
    const token = Cookies.get('token')!
    const response = await fetch('https://lp-koala-backend-c0a69db0f618.herokuapp.com/users/getUsers', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token!
        }
    })

    const responseObject = await response.json()
    setAllUsers(responseObject.data.users);
  }

  const getThread = async ()=> {
    try {
      const token = Cookies.get('token')!;

      const response = await fetch(`localhost:3000/projects/${params.projectId}/forums/threads/${params.threadId}`,{
        method: "GET",
        headers: {
          "Authorization": token!
        }
      }).then(async r => {
        if (r.ok) {
          const result = await r.json();
          const thread = result.data.data;
          setTitle(thread.title);
          setDescription(thread.description);
          setUser(thread.user);
          setPosts(thread.posts);
        }
      });
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUsers();
    getThread();
  }, [params.threadId]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(Cookies.get('token'));
      setUserRole(role);
    };
  
    fetchUserRole();
  }, []);

  const findUserNameById = (userId) => {
    const user = allUsers.find(user => user._id === userId);
    return user ? user.name : 'Unknown';
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting thread with ID:", threadIdToDelete);
    setShowConfirmModal(false);

    const token = Cookies.get('token')!;
    const user = Cookies.get('user')!
    try {
      const response = await fetch(`localhost:3000/projects/${params.projectId}/forums/threads/${id}`,{
          method: 'DELETE',
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              'authorization': token
          },
          body: `{"user": ${user}}`
      })

      if (response.status === 204) {
          console.log('thread',id,' deleted');
          location.reload();
      }
    } catch (error){
        console.log(error)
    }
  };

  const handleInputChange = (event) => {
      setReply(event.target.value);
  };

  const submitReply = async () => {
      const token = Cookies.get('token');
      try {
          const response = await fetch(`localhost:3000/projects/${params.projectId}/forums/threads/${params.threadId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
              },
              body: JSON.stringify({ content: reply })
          });
          if (response.ok) {
              console.log("Reply submitted successfully");
              setReply('');
          } else {
              throw new Error('Failed to submit reply');
          }
      } catch (error) {
          console.error('Error submitting reply:', error);
      }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
        <Link href='/projects/${projectId}/forums'>
            <Button style={{ width: '100px', position: 'relative', zIndex: 1 }} className="mt-auto mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </Button>
        </Link>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-4">
              {/* <img src={forum.image} alt="Forum" className="w-16 h-16 rounded-full object-cover" /> */}
              <div className="flex-1">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-gray-500">Posted by {findUserNameById(user)}</p>
              <p className="mt-2 text-gray-700">{description}</p>
              </div>
              {userRole !== 'rater' && (
                <>
                  {/* <Edit size={18} onClick={onEdit} className="text-blue-500 m-1 cursor-pointer" /> */}
                  <Trash size={18} onClick={openConfirmModal} className="text-red-500 m-1 cursor-pointer"/>
                </> 
              )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Posts</h3>
            {posts.map((post) => (
              <div key={post._id} className="bg-gray-100 p-3 rounded my-2">
                <p className="text-sm text-gray-800">{post.content}</p>
                <p className="text-xs text-gray-500">Posted by {findUserNameById(post.user)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
              <textarea
              className="w-full p-2 border rounded"
              placeholder="Write a reply..."
              rows={4}
              value={reply}
              onChange={handleInputChange}
              ></textarea>
              <Button className="mt-2" onClick={submitReply}>Reply</Button>
          </div>
        </div>
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => closeConfirmModal}
          onConfirm= {() => threadIdToDelete && handleDelete(threadIdToDelete)}
        />
    </div>
  );
};

export default ThreadIdPage;
