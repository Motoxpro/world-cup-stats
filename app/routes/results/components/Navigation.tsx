import { useSearchParams } from '@remix-run/react';
import React, { MouseEvent } from 'react';

type NavigationItem = { id: string; label: string };
type NavigationType = 'race' | 'category' | 'day';
interface NavigationProps {
  navigationItems: NavigationItem[];
  type: NavigationType;
}
const Navigation: React.FC<NavigationProps> = ({ navigationItems, type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get(type);

  const handleClick = (item: NavigationItem, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Update the search params with new selected item
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(type, item.id);
    setSearchParams(newSearchParams);
  };

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
              className={current === item.id ? 'text-sky-400' : ''}
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
