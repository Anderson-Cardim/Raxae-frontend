import { HomeIcon, UserGroupIcon, ClockIcon, UsersIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const navItems = [
  { label: 'Início', icon: HomeIcon, isActive: true },
  { label: 'Grupos', icon: UsersIcon, isActive: false },
  { label: 'Amigos', icon: UserGroupIcon, isActive: false },
  { label: 'Histórico', icon: ClockIcon, isActive: false },
  { label: 'Perfil', icon: UserCircleIcon, isActive: false },
];

function FooterNav() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-around items-center text-center text-xs font-medium z-10">
      {navItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-1">
          <item.icon className={`h-6 w-6 ${item.isActive ? 'text-black' : 'text-gray-500'}`} />
          <span className={`${item.isActive ? 'text-black font-bold' : 'text-gray-500'}`}>{item.label}</span>
        </div>
      ))}
    </footer>
  );
}

export default FooterNav;