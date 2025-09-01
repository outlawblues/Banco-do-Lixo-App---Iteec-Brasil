
import React, { useState, useCallback } from 'react';
import type { ViewType } from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/views/Dashboard';
import WasteManagement from './components/views/WasteManagement';
import SocialManagement from './components/views/SocialManagement';
import FinancialManagement from './components/views/FinancialManagement';
import Logistics from './components/views/Logistics';
import Login from './components/views/Login';
import { MenuIcon } from './components/ui/Icons';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (username: string) => setCurrentUser(username);
  const handleLogout = () => setCurrentUser(null);

  const renderView = useCallback(() => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'waste':
        return <WasteManagement />;
      case 'social':
        return <SocialManagement />;
      case 'finance':
        return <FinancialManagement />;
      case 'logistics':
        return <Logistics />;
      default:
        return <Dashboard />;
    }
  }, [activeView]);

  if (!currentUser) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      <Sidebar 
        currentUser={currentUser}
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen} 
        setOpen={setSidebarOpen}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header>
           <button 
             onClick={() => setSidebarOpen(true)} 
             className="md:hidden p-2 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
             <MenuIcon className="h-6 w-6" />
           </button>
        </Header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
        <footer className="text-center p-4 text-xs text-gray-400 bg-gray-50 border-t border-gray-200">
          © 2025 Banco Brasileiro do Lixo - BBL. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
};

export default App;