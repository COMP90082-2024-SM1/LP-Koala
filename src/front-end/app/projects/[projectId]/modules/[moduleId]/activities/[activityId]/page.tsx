'use client';


import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { getUserRole } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import RateModal from '@/components/rate-modal';
import he from "he";

// import { ActivityTitleForm } from "./_components/activity-title-form";
// import { ActivityDescriptionForm } from "./_components/activity-description-form";
// import { ActivityAccessForm } from "./_components/activity-access-form";
// import { ActivityVideoForm } from "./_components/activity-video-form";
// import { ActivityActions } from "./_components/activity-actions";

const ActivityIdPage = ({
  params
}: {
  params: { projectId: string; activityId: string }
}) => {
  const [content, setContent] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserRole = async () => {
        const role = await getUserRole(Cookies.get('token'));
        setUserRole(role);
    };
    
    fetchUserRole();
  }, []);

  const [rateModalOpen, setRateModalOpen] = useState(false);
  const openRateModal = () => setRateModalOpen(true);
  const closeRateModal = () => setRateModalOpen(false);
  const handleRateSubmit = (rating: number) => {
    console.log('Rating Submitted:', rating);
    closeRateModal();
  };
  const [description, setDescription] = useState('');
  const getActivity = async ()=> {
    try {
      const token = Cookies.get('token')!;

      const response = await fetch(`http://localhost:3000/activity/${params.activityId}`,{
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
      <>
      <div className='p-20'>
        <p className='text-center'>{description}</p>
            <div
                className='m-20 h-full '
                dangerouslySetInnerHTML={{ __html: content }}
                // style={{ wordBreak: "break-word" }}
            />
      </div><br></br>
      <div>
        {userRole !== 'rater' && (
          <Button className='w-48' onClick={openRateModal}>
              <Star className="h-4 w-4 mr-2" />
              Rate
          </Button>
        )}
      </div>
      {rateModalOpen && <RateModal isOpen={rateModalOpen} onClose={closeRateModal} onSubmit={handleRateSubmit} />}
      </>
   );
}
 
export default ActivityIdPage;