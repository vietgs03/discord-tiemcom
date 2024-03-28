import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";
const SetupPage = async() => {

    const profile = await initialProfile();

    const sever = await db.sever.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })

    if(sever){
        return redirect(`/servers/${sever.id}`)
    }

    return (<InitialModal />);
}
 
export default SetupPage;