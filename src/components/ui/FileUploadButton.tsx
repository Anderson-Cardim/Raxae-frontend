import React, { forwardRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

interface FileUploadButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  previewUrl?: string | null;
  className?: string;
}

const FileUploadButton = forwardRef<HTMLInputElement, FileUploadButtonProps>(({ previewUrl, className, ...props }, ref) => {
  return (
    <div className={`flex items-center justify-center cursor-pointer relative overflow-hidden ${className || "w-full bg-white border-2 border-gray-400 rounded-xl h-40 mb-6"}`}>

      <label
        htmlFor="file-upload"
        className="w-full h-full flex items-center justify-center p-2"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Pré-visualização do grupo" className="w-full h-full object-contain rounded-lg" />
        ) : (
          <PlusIcon className="h-16 w-16 text-gray-400" />
        )}
      </label>

      <input
        id="file-upload"
        type="file"
        ref={ref}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        {...props}
      />
    </div>
  );
});

export default FileUploadButton;


