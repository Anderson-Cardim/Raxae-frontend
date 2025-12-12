import React, { useState } from 'react';
import { BsLink45Deg, BsCheckCircleFill } from 'react-icons/bs'; 

interface CopyToClipboardButtonProps {
    textToCopy: string;
}

export function CopyToClipboardButton({ textToCopy }: CopyToClipboardButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!navigator.clipboard) {
            alert('Seu navegador não suporta a cópia automática.');
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            
            setCopied(true);
            
            setTimeout(() => setCopied(false), 2000); 
            
        } catch (err) {
            console.error('Falha ao copiar:', err);
            alert('Não foi possível copiar o código. Tente novamente.');
        }
    };

    return (
        <button
            onClick={handleCopy}
            title="Copiar código de convite"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
            {copied ? (
                <BsCheckCircleFill 
                    size={20} 
                    className="text-green-500" 
                />
            ) : (
                <BsLink45Deg 
                    size={20} 
                    className="text-gray-600 cursor-pointer hover:text-gray-800" 
                />
            )}
        </button>
    );
}