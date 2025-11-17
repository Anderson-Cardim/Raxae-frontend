import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; 

interface ProofAttachmentFormProps {
  onUpload: (file: File) => Promise<void>; 
}

const ProofAttachmentForm: React.FC<ProofAttachmentFormProps> = ({ onUpload }) => {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!fileToUpload) {
      alert("Por favor, selecione um arquivo para anexar.");
      return;
    }

    try {
      setIsLoading(true);
      await onUpload(fileToUpload); 
      alert(`Comprovante "${fileToUpload.name}" enviado com sucesso!`);
      
      setFileToUpload(null);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Ocorreu um erro ao tentar anexar o comprovante.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl lg:ml-30 lg:mr-30 ">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Anexar comprovante</h3>
      
      <label className="relative block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors ">
        
        <input 
          type="file" 
          className="absolute inset-0 opacity-0 cursor-pointer lg:pt-15 lg:pb-15"
          onChange={handleFileChange}
          accept="image/*,application/pdf" 
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center h-full text-gray-500 ">
          <FaPlus size={30} className="mb-2" />
          <span className="text-sm">
            {fileToUpload 
              ? `Selecionado: ${fileToUpload.name}` 
              : 'Clique para selecionar o arquivo'
            }
          </span>
        </div>
        
        <button 
          type="button"
          onClick={handleSave}
          disabled={!fileToUpload || isLoading}
          className={`absolute  bottom-2 right-2 px-3 py-1 text-white text-xs rounded-lg font-bold transition-opacity duration-300 ${
            !fileToUpload || isLoading 
              ? 'bg-[#14879E] cursor-not-allowed' 
              : 'bg-[#14879E] hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'ENVIANDO...' : 'SALVAR'}
        </button>
      </label>
    </div>
  );
};

export default ProofAttachmentForm;