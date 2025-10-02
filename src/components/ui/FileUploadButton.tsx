// src/components/FileUploadButton.tsx
import React, { useState, forwardRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const FileUploadButton = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className=" bg-white border-2 border-gray-400 rounded-xl h-40 flex items-center justify-center mb-6 cursor-pointer relative overflow-hidden">
        
      <label
        htmlFor="file-upload">
        {previewUrl ? (
          <img src={previewUrl} alt="Pré-visualização do grupo" className="h-full w-full object-cover" />
        ) : (
          <PlusIcon className="h-16 w-16 text-gray-400" />
        )}
      </label>
      
      <input id="file-upload" type="file" accept="image/*" ref={ref}  onChange={handleFileChange} className="hidden"
        {...props} 
      />
    </div>
  );
});

export default FileUploadButton;


