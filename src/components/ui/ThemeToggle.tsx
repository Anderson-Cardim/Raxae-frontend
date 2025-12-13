import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            title={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
            {theme === 'light' ? (
                <MoonIcon className="w-6 h-6 text-gray-600" />
            ) : (
                <SunIcon className="w-6 h-6 text-yellow-400" />
            )}
        </button>
    );
}
