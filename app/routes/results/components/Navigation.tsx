import { useSearchParams } from '@remix-run/react';
import React, { MouseEvent } from 'react';
import { useNavigation } from '~/providers/NavigationProvider';

export type NavigationItem = { id: string; label: string };
export type NavigationType = 'race' | 'category' | 'day';
interface NavigationProps {
  navigationItems: NavigationItem[];
  type: NavigationType;
}
const Navigation: React.FC<NavigationProps> = ({ navigationItems, type }) => {
  const { currentPath, setCurrentPath } = useNavigation();

  const handleClick = (item: NavigationItem, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Update the search params with new selected item
    setCurrentPath((currentPath) => ({
      ...currentPath,
      [type]: item.id,
    }));
  };

  const navItem = currentPath[type]

  return (
    <nav className="flex overflow-x-auto border-b border-white/10 py-4">
      <ul
        role="list"
        className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
      >
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={navItem === item.id ? 'text-sky-400' : ''}
              onClick={(e) => handleClick(item, e)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
