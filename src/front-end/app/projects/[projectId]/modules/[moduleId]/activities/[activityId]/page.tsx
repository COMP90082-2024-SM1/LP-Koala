'use client';
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import he from "he";
import RateModal from '@/components/rate-modal';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getUserRole } from "@/lib/utils";

const ActivityIdPage = ({
                          params
                        }: {
  params: { projectId: string; activityId: string }
}) => {

  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [ratings, setRatings] = useState([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const openRateModal = () => setRateModalOpen(true);
  const closeRateModal = () => setRateModalOpen(false);
  const [currentUser, setCurrentUser] = useState(null);

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
          // console.log(currentUser.id);
          setContent(decoded);
          setDescription(activity.description);
          activity.ratings.forEach(rating => {
            console.log("Rater ID:", rating.rater._id);
          });
          
          if(currentUser) {
            const userRatings = activity.ratings.filter(rating => rating.rater._id === currentUser._id);
            const lastUserRating = userRatings.length > 0 ? userRatings[userRatings.length - 1] : null;
            setRatings(lastUserRating);
          }
          console.log(activity.ratings[activity.ratings.length - 1]);
        }
      });


    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getActivity()
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(Cookies.get('token'));
      setUserRole(role);
    };
  
    fetchUserRole();
  }, []);

  useEffect(() => {
    const token = Cookies.get('token')!;
    const fetchUser = async () => {
      if (token) {
        try {
          const user = await getCurrentUser(token);
          setCurrentUser(user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, []);
  
  const handleRateSubmit = async (rating: number) => {
    if (!currentUser) {
      console.error("No user data available.");
      return;
    }

    const token = Cookies.get('token')!;
    const raterId = currentUser.id;
    const response = await fetch(`https://lp-koala-backend-c0a69db0f618.herokuapp.com/activity/${params.activityId}/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ 
            rater: raterId,
            rating: rating
       })
    });

    if (response.ok) {
      console.log("Rating submitted successfully");
    } else {
      console.error("Failed to submit rating");
    }

    closeRateModal();
  };

  const renderStars = (rating) => {
    const totalStars = 5; // Adjust the total number of stars if needed
    const stars = [];
  
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <Star
          key={i}
          color={i <= rating ? '#FFD700' : '#CCCCCC'} // Gold for filled stars, grey for empty
          fill={i <= rating ? '#FFD700' : 'none'} // Fill color for filled stars
          style={{ display: 'inline-block', marginRight: '2px' }}
        />
      );
    }
  
    return stars;
  };

  return (
    <>
      <div className='p-20'>
          <p className='text-center'>{description}</p>
          <div
              className='m-20 h-full '
              dangerouslySetInnerHTML={{ __html: content }}
              // style={{ wordBreak: "break-word" }}
          />
      </div>
      {ratings && renderStars(ratings.rating)}<br></br><br></br>
      {userRole !== 'rater' && (
        <Button className='w-48' onClick={openRateModal}>
          <Star className="h-4 w-4 mr-2" />
          Rate
        </Button>
      )}
      {rateModalOpen && <RateModal isOpen={rateModalOpen} onClose={closeRateModal} onSubmit={handleRateSubmit} />}
    </>
  );
}

export default ActivityIdPage;