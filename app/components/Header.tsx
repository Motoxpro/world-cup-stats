// make a header component

import { Link } from '@remix-run/react';

interface HeaderProps {
  hideLogin?: boolean;
}
const Header: React.FC<HeaderProps> = ({ hideLogin }) => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <h4 className="text-lg font-bold text-white">World Cup Stats</h4>
          </Link>
        </div>
        {!hideLogin && (
          <div className="flex lg:flex-1 justify-end">
            <Link to="/login" className="-m-1.5 p-1.5">
              <h4 className="text-lg font-bold text-white">LOG IN</h4>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
