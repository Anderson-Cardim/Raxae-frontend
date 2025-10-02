import { BellIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  userName: string;
  profilePic: string;
}

function Header({ userName, profilePic }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 py-15 text-white" style={{ backgroundColor: '#14879E' }}>
      <div className="flex items-center space-x-4">
        <img
          src={profilePic}
          alt={`Foto de perfil de ${userName}`}
className="w-16 h-16 rounded-full border-4 border-gray-400  shadow-lg shadow-gray-700/50 "/>
        <div>
          <span className="text-sm font-medium">Bom dia,</span>
          <h2 className="text-xl font-black">{userName}</h2>
        </div>
      </div>
      
      <div className="relative">
        <BellIcon className="w-8 h-8" />
      </div>
    </header>
  );
}

export default Header;