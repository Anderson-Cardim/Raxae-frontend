import { BellIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';

interface HeaderProps {
  userName: string;
  profilePic: string;
}

function Header({ userName, profilePic }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pt-12 pb-24 text-white bg-[#14879E] rounded-b-[40px] shadow-lg">
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <BellIcon className="w-7 h-7" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#F34403] rounded-full"></span>
        </button>

        <div className="relative">
          <img
            src={profilePic}
            alt={`Foto de perfil de ${userName}`}
            className="w-16 h-16 rounded-full border-4 border-white/20 shadow-md object-cover"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-[#14879E] rounded-full"></div>
        </div>
        <div>
          <span className="text-sm font-medium opacity-90">Bom dia,</span>
          <h2 className="text-2xl font-bold tracking-tight">{userName}</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;