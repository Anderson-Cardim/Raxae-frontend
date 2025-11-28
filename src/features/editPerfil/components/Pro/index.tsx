import ActionButton from "../../../../components/ui/ActionButton";

interface ProModalProps {
  isOpen: boolean;    // Recebe o estado para saber se deve mostrar
  onClose: () => void; // Função para fechar (usada no botão Cancelar e no overlay)
  onConfirm: () => void; // Função para confirmar (usada no botão Sim, Quero Ser PRO)
}

const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Se isOpen for falso, não renderiza nada

  return (
    // ... (Estrutura visual do modal) ...
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      {/* Container do Modal */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100">
        
        {/* ... (Conteúdo) ... */}

        <div className="flex justify-end space-x-4">
          <ActionButton 
            text="Cancelar"
            type="button"
            onClick={onClose} // Fecha o modal
            // ... (className) ...
          />
          <ActionButton 
            text="Sim, Quero Ser PRO"
            type="button"
            onClick={onConfirm} // Chama a função de confirmação
            // ... (className) ...
          />
        </div>
      </div>
    </div>
  );
};

export default ProModal;