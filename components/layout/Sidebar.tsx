
import React from 'react';
import type { ViewType } from '../../types';
import { DashboardIcon, WasteIcon, SocialIcon, FinanceIcon, LogisticsIcon, CloseIcon, BancoDoLixoLogo, LogoutIcon } from '../ui/Icons';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onLogout: () => void;
  currentUser: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  view: ViewType;
  isActive: boolean;
  onClick: () => void;
}

const userDisplayNames: { [key: string]: string } = {
  admin: 'Valteir Cabral',
  MarcioTortorelli: 'Marcio Tortorelli',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const NavItem: React.FC<NavItemProps> = ({ icon, label, view, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setOpen, onLogout, currentUser }) => {
  const handleNavClick = (view: ViewType) => {
    setActiveView(view);
    if(window.innerWidth < 768) {
      setOpen(false);
    }
  };

  const navItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="h-6 w-6" /> },
    { view: 'waste', label: 'Gestão de Resíduos', icon: <WasteIcon className="h-6 w-6" /> },
    { view: 'social', label: 'Gestão Social', icon: <SocialIcon className="h-6 w-6" /> },
    { view: 'finance', label: 'Gestão Financeira', icon: <FinanceIcon className="h-6 w-6" /> },
    { view: 'logistics', label: 'Operação & Logística', icon: <LogisticsIcon className="h-6 w-6" /> },
  ];
  
  const displayName = userDisplayNames[currentUser] || capitalize(currentUser);

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
      <aside className={`absolute md:relative flex-shrink-0 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out z-40 h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
          <div className="flex items-center">
             <BancoDoLixoLogo className="h-10 w-auto text-gray-800" />
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-gray-600">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.view}
                icon={item.icon}
                label={item.label}
                view={item.view}
                isActive={activeView === item.view}
                onClick={() => handleNavClick(item.view)}
              />
            ))}
          </ul>
        </nav>
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="h-12 w-12 rounded-full object-cover" src="https://cdn.estadaomatogrosso.com.br/storage/webdisco/2025/06/05/800x600/036deb95c1cde52ae60358df73f18315.jpeg" alt="User profile" />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">{displayName}</p>
                <p className="text-sm text-gray-500">Administrador</p>
              </div>
            </div>
            <button onClick={onLogout} className="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-colors" title="Sair">
              <LogoutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;