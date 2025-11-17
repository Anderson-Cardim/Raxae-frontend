// import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { FaArrowLeftLong } from "react-icons/fa6";


interface HeaderFormProps{
  title: string;
  onBack?: () => void;
}

function HeaderForm({ title, onBack}: HeaderFormProps) {

  return (
    <header className="p-5.5 flex items-center justify-between relative bg-white">
      <button  onClick={onBack} className="absolute left-4">
        <FaArrowLeftLong className="w-6 h-6 text-black"/>
      </button>

      <h1 className="flex-grow pl-20 text-2xl font-bold  ">
        {title}
      </h1>

      <div className="w-6 h-6" />
    </header>
  );
}

export default HeaderForm;