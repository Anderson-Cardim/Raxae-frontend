import React, { useState, forwardRef, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

interface FileUploadButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (event: {
    target: { name: string; value: string | null };
  }) => void;
}

const FileUploadButton = forwardRef<HTMLInputElement, FileUploadButtonProps>(
  ({ onChange, name, value, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);

    useEffect(() => {
      setPreviewUrl(value || null);
    }, [value]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          const base64String = reader.result as string;
          const formatedBase64 = base64String.split(",")[1];

          if (onChange && name) {
            onChange({
              target: {
                name: name,
                value: formatedBase64,
              },
            });
          }
        };
      } else {
        if (onChange && name) {
          onChange({ target: { name: name, value: null } });
        }
      }
    };

    return (
      <div className="w-full bg-white border-2 border-gray-400 rounded-xl h-40 flex items-center justify-center mb-6 cursor-pointer relative overflow-hidden">
        <label htmlFor={`file-upload-${name}`}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Pré-visualização do grupo"
              className="w-full h-full object-cover"
            />
          ) : (
            <PlusIcon className="h-16 w-16 text-gray-400" />
          )}
        </label>

        <input
          id={`file-upload-${name}`}
          type="file"
          accept="image/*"
          name={name}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          {...props}
        />
      </div>
    );
  }
);

export default FileUploadButton;
