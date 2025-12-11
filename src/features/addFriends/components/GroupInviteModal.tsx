import { useEffect, useRef } from 'react';
import ActionButton from '../../../components/ui/ActionButton';


interface GroupDetails {
  id: string;
  name: string;
  description: string;
  adminName: string;
  cod: string;
}

interface GroupInviteModalProps {
  isOpen: boolean;
  group: GroupDetails;
  onClose: () => void;
  onConfirm: () => void;
}

const GroupInviteModal: React.FC<GroupInviteModalProps> = ({ isOpen, group, onClose, onConfirm }) => {
     
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
        if (isOpen) {
            openDialog();
        } else {
            closeDialog();
        }
    }, [isOpen])

    useEffect(() => {
        const dialog = dialogRef.current;
        dialog?.addEventListener('close', onClose); 
        return () => {
            dialog?.removeEventListener('close', onClose);
        }
    }, [onClose])

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    }; 

  return (
    <dialog ref={dialogRef} className="m-auto rounded-xl shadow-2xl w-full max-w-sm">
      
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300">
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Entrar em: {group.name}
        </h2>
        
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-600">
            <span className='text-[#000] font-semibold'>Administrador</span>: <span className="font-semibold">{group.adminName}</span>
          </p>
          <p className="text-sm text-gray-600">
            <span className='text-[#000] font-semibold'>Descrição</span>: {group.description || 'Sem descrição fornecida.'}
          </p>
          
          <p className="pt-2 text-md font-medium text-gray-900">
            Você confirma que deseja participar deste grupo?
          </p>
        </div>

        <div className="flex justify-between space-x-3">
          
          <button 
            onClick={closeDialog} 
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          
          <ActionButton
            text="Confirmar Entrada"
            onClick={onConfirm}
            className="flex-1 py-3 text-white bg-[#F34403] hover:bg-orange-600 rounded-xl font-bold transition-colors"
          />
        </div>

      </div>
    </dialog>
  );
};

export default GroupInviteModal;