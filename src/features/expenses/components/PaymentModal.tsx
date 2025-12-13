import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ActionButton from "../../../components/ui/ActionButton";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    expenseName: string;
    expenseValue: string;
    onConfirm: (file: File) => Promise<void>;
}

export default function PaymentModal({ isOpen, onClose, expenseName, expenseValue, onConfirm }: PaymentModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (!validTypes.includes(selectedFile.type)) {
                alert("Formato inválido. Apenas imagens (JPEG, PNG, GIF) são aceitas.");
                return;
            }

            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Por favor, anexe o comprovante.");
            return;
        }

        try {
            setLoading(true);
            await onConfirm(file);
            onClose(); // Close on success
        } catch (error) {
            console.error("Payment failed", error);
            alert("Erro ao enviar pagamento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">

                {/* Header */}
                <div className="bg-[#14879E] p-4 flex justify-between items-center text-white">
                    <h3 className="text-xl font-bold">Pagar Despesa</h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 text-center">
                        <p className="text-gray-500 text-sm">Você está pagando</p>
                        <h4 className="text-2xl font-bold text-gray-800">{expenseName}</h4>
                        <p className="text-xl font-bold text-blue-600 mt-1">{expenseValue}</p>
                    </div>

                    {/* File Upload Area */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comprovante de Pagamento</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors cursor-pointer relative bg-gray-50">
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/gif, image/jpg"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {previewUrl ? (
                                <div className="relative h-40 w-full">
                                    <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                                </div>
                            ) : (
                                <div className="py-8 text-gray-400">
                                    <p>Clique para selecionar ou arraste o arquivo</p>
                                    <p className="text-xs mt-1">(JPEG, PNG, GIF)</p>
                                </div>
                            )}
                        </div>
                        {file && <p className="text-sm text-green-600 mt-2 text-center truncate">Selecionado: {file.name}</p>}
                    </div>

                    <div className="space-y-3">
                        <ActionButton
                            text={loading ? "Enviando..." : "Enviar Comprovante"}
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || !file}
                            className={`w-full py-3 text-white rounded-lg text-lg font-bold transition-all
                                ${loading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}
                            `}
                        />
                        <button
                            onClick={onClose}
                            className="w-full text-gray-500 font-medium hover:text-gray-700 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
