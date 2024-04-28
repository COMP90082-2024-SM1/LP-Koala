'use client';
import { Star, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation";
import RateModal from '@/components/rate-modal';
import {useState } from 'react';
import ActivityList from "./activities/_components/activity-list";


function Page({params}:{params:{projectId: string, moduleId: string}}) {

    const router = useRouter();
    const {projectId, moduleId} = params;
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
                <Button className='w-48' onClick={openRateModal}>
                    <Star className="h-4 w-4 mr-2" />
                    Rate
                </Button>
            </div>
            <ActivityList />
            {rateModalOpen && <RateModal isOpen={rateModalOpen} onClose={closeRateModal} onSubmit={handleRateSubmit} />}
        </div>
    );
}

export default Page;