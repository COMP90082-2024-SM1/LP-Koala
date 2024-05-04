'use client';


import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import he from "he";

const ActivityIdPage = ({
                          params
                        }: {
  params: { projectId: string; activityId: string }
}) => {

  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const getActivity = async ()=> {
    try {
      const token = Cookies.get('token')!;

      const response = await fetch(`https://lp-koala-backend-c0a69db0f618.herokuapp.com/activity/${params.activityId}`,{
        method: "GET",
        headers: {
          "Authorization": token!
        }
      }).then(async r => {
        if (r.ok) {
          const result = await r.json();
          const activity = result.data.data;
          const decoded = he.decode(activity.content);
          console.log(decoded);
          setContent(decoded);
          setDescription(activity.description);
        }
      });


    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getActivity()
  }, []);
  // const isComplete = requiredFields.every(Boolean);

  return (
      <div className='p-20'>
        <p className='text-center'>{description}</p>
        <div
            className='m-20 h-full '
            dangerouslySetInnerHTML={{ __html: content }}
            // style={{ wordBreak: "break-word" }}
        />
      </div>
  );
}

export default ActivityIdPage;