import { HomeIcon, UserGroupIcon, ClockIcon, UsersIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Início', icon: HomeIcon, isActive: true, path: '/home' },
  { label: 'Grupos', icon: UsersIcon, isActive: false, path: '/grupo' },
  { label: 'Amigos', icon: UserGroupIcon, isActive: false, path: '/adicionar-amigos' },
  { label: 'Histórico', icon: ClockIcon, isActive: false, path: '/history' },
  { label: 'Perfil', icon: UserCircleIcon, isActive: false, path: '/editar-perfil' },
];


function FooterNav() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-around items-center text-center text-xs font-medium z-10">
      
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        
        const activeColor = 'text-[#000]'; 
        const defaultColor = 'text-gray-500';

        return (
        
          <Link 
            key={index} 
            to={item.path} 
            className="flex flex-col items-center space-y-1 p-2 transition-colors duration-200"
          >
            <item.icon 
              className={`h-6 w-6 ${isActive ? activeColor : defaultColor}`} 
            />
            <span 
              className={`text-xs ${isActive ? `${activeColor} font-bold` : defaultColor}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </footer>
  );
}

export default FooterNav;