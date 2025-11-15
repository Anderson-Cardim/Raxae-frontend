import React, { useState, ChangeEvent } from 'react';
import { FaCamera } from 'react-icons/fa'; 

const PhotoUploader: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Arquivo pronto para upload:', selectedFile.name);
      alert('Upload simulado! Verifique o console.');
    } else {
      alert('Selecione uma foto primeiro.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden mb-4 relative">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Pré-visualização" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <FaCamera className="text-gray-500 h-8 w-8" />
        )}

        <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer flex items-center justify-center bg-[#14879E] bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-full">
            <FaCamera className="text-white h-6 w-6" />
        </label>
        <input
            id="file-upload"
            type="file"
            accept="image/*" 
            className="hidden"
            onChange={handleFileChange}
        />
      </div>

      {selectedFile && (
          <button 
              onClick={handleUpload}
              className="px-4 py-2 bg-[#14879E] text-white rounded-lg hover:bg-[#106a8c] transition-colors"
          >
              Salvar Foto
          </button>
      )}
    </div>
  );
};

export default PhotoUploader;