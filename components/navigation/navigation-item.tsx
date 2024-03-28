"use client"
import Image from 'next/image'
import { useParams,useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ActionTooltip } from '../ui/action-tooltip';

interface  NavigationItemProps {
    id:string;
    imageUrl:string;
    name:string;
}

const NavigationItem = ({
    id,imageUrl,name
}:NavigationItemProps) => {
    
    const params = useParams();
    const router = useRouter();

    return ( 
        <ActionTooltip side='right'
        align='center'
        label={name}>
            <button 
                onClick={()=>{}}
                className='group relative flex items-center h-10 w-10'
                >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" :"h-[8px]"
                )}>
                    <div className={
                        cn(
                            "relative group flex mx-3 w-[48px] rounded-[24px] group-hover:rounded-[16px] trainsition-all overflow-hidden",
                            params?.serverId === id ? "bg-primary/10 text-primary rounded-[16px] " : "h-[40px]"
                            )
                    }>
                        <img
                            fill
                            src={imageUrl}
                            alt='Channel'
                            className='h-[48px]'
                        />
                    </div>
                </div>
            </button >
        </ActionTooltip>
    );
}
 
export default NavigationItem;