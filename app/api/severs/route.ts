import {v4 as uuidv4} from "uuid";
import { NextRequest, NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";

export async function POST(req:Request)
{
    try{
        const {name,imageUrl} = await req.json()
        const profile = await currentProfile();

        if(!profile)
        {
            return new Response("Unauthorized",{status:401})
        }

        const server = await db.sever.create({
            data:{
                profileId:profile.id,
                name,
                imageUrl,
                inviteCode:uuidv4(),
                channels:{
                    create:[
                        {name:"general",profileId:profile.id,type:ChannelType.TEXT},
                    ]
                },
                members:{
                    create:[
                        {
                            profileId:profile.id,
                            role:MemberRole.ADMIN
                        }
                    ]
                }
            }
        })
        return NextResponse.json(server);
    }
    catch(err){
        console.log("[SEVER_POST_ERROR]",err)
        return new NextResponse("Internal Erro",{status:500})
    }
}