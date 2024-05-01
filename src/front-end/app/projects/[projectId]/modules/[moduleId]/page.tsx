'use client';
import { Star, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation";
import RateModal from '@/components/rate-modal';
import {useEffect, useState} from 'react';
import ActivityList from "./_components/activity-list";
import Cookies from "js-cookie";
import { getUserRole } from "@/lib/utils";


function Page({params}:{params:{projectId: string, moduleId: string}}) {
    const router = useRouter();
    const {projectId, moduleId} = params;
    const [activities, setActivities] = useState([])
    const [userRole, setUserRole] = useState<string | null>(null);
    const getActivities = async ()=> {
        try {
            const token = Cookies.get('token')!;

            const response = await fetch(`http://localhost:3000/modules/${moduleId}`,{
                method: "GET",
                headers: {
                    "Authorization": token!
                }
            }).then(async r => {
                if (r.ok) {
                    const result = await r.json();
                    console.log(result.data.data.activities)
                    setActivities(result.data.data.activities);
                }
            });


        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getActivities();
    }, []);

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

    return (
        <div className="p-6 space-y-4">
            <div className="flex flex-row justify-between">
                <Button className='w-48' onClick={()=>router.push(`/projects/${projectId}/modules/${moduleId}/activities/create`)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Activity
                </Button>
                {userRole !== 'rater' && (
                    <Button className='w-48' onClick={openRateModal}>
                        <Star className="h-4 w-4 mr-2" />
                        Rate
                    </Button>
                )}
            </div>
            <ActivityList activities={activities} projectId={projectId} moduleId={moduleId} />
            {rateModalOpen && <RateModal isOpen={rateModalOpen} onClose={closeRateModal} onSubmit={handleRateSubmit} />}
        </div>
    );
}

export default Page;