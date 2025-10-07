import { ChevronLeftIcon } from '@heroicons/react/24/solid';

interface HeaderFormProps{
  title: string;
  onBack?: () => void;
}

function HeaderForm({ title, onBack}: HeaderFormProps) {

  return (
    <header className="p-4 flex items-center justify-between relative bg-white">
      <button  onClick={onBack} className="absolute left-4">
        <ChevronLeftIcon className="w-6 h-6 text-black" />
      </button>

      <h1 className="flex-grow text-center text-lg font-bold">
        {title}
      </h1>

      <div className="w-6 h-6" />
    </header>
  );
}

export default HeaderForm;