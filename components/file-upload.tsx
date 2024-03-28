"use client"
import { X } from "lucide-react";
import  Image  from "next/image";
import {Dropzone} from "@/components/ui/dropzone"
import { useState } from 'react';

interface FileUploadProps {
    onChange: (url?: string) => void;
    value:string;
    endpoint: "messageFile" | "severImage"
}

export const FileUpload = ({onChange,value,endpoint}:FileUploadProps) => {
    const [files, setFiles] = useState<string[]>([]);
    const fileTypes = value?.split(".").pop();
    if(value && fileTypes !== "pdf"){
        return (
            <div className="relative h-40 w-40">
                <img 
                    
                    src={value}
                    alt="upload"
                    className="rounded-full object-cover w-full h-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }
    return (
        <div>
            <Dropzone 
                onChange={setFiles}
                className="w-full"
                value = {value}
                onClientUploadComplete={(res) => {
                    onChange(res);
                }}
                onUploadError={(err:Error) => {
                    console.error(err);
                }}
            />
        </div>
    )
}