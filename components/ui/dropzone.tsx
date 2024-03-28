import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import { upload } from '@/lib/upload';
// Define the props expected by the Dropzone component
interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  fileExtension?: string;
  value: string;
  onClientUploadComplete: (res: any) => void;
  onUploadError: (err: Error) => void;
}

// Create the Dropzone component receiving props
export function Dropzone({
  onChange,
  className,
  fileExtension,
  value,
  onClientUploadComplete,
  onUploadError,
  ...props
}: DropzoneProps) {
  // Initialize state variables using the useState hook
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input element
  const [fileInfo, setFileInfo] = useState<string | null>(null); // Information about the uploaded file
  const [error, setError] = useState<string | null>(null); // Error message state


  // Function to handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };
  const [image, setImage] = useState<File | null>(null);

  // Function to handle file input change event
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0]; 
      if (files) {
        handleFiles(files);
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        setImage(file);
      };
      reader.readAsDataURL(file); 
    }
  };

  // Function to handle processing of uploaded files
  const handleFiles = (files: FileList) => {
    const uploadedFile = files[0];

    // Check file extension
    if (fileExtension && !uploadedFile.name.endsWith(`.${fileExtension}`)) {
      setError(`Invalid file type. Expected: .${fileExtension}`);
      return;
    }

    const fileSizeInKB = Math.round(uploadedFile.size / 1024); // Convert to KB

    const fileList = Array.from(files).map((file) => URL.createObjectURL(file));
    onChange((prevFiles) => [...prevFiles, ...fileList]);

    // Display file information
    setFileInfo(`Uploaded file: ${uploadedFile.name} (${fileSizeInKB} KB)`);
    setError(null); // Reset error state
  };

  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Function handle upload image
  const handleUpload = async () => {
    const data = new FormData();
   {/* @ts-expect-error Server Component */}
    data.append('file', image);
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    });
  
    // Log the response from the server
    const responseData = await response.json();
    console.log(responseData);
    onClientUploadComplete(responseData.data.url);
    //value = responseData.data.url;
  };
  
  return (
    <Card
      className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center text-muted-foreground">
          
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
              onClick={handleButtonClick}
            >
            <span className="font-medium">Kéo tệp để upload hoặc</span>

              Nhấn vào đây
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="*/*" // allow all file types
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />
          
        </div>
        {image && (
          <div className="space-y-8 px-6">
                <img src={URL.createObjectURL(image)} alt="Preview" />
            <Button variant="primary"  onClick={handleUpload}>Upload</Button>
          </div>
         )}
        {fileInfo && <p className="text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  );
}