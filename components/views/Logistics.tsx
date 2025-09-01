import React, { useState } from 'react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { LogisticsIcon } from '../ui/Icons';
import type { Route } from '../../types';
import OperationsMap from '../maps/OperationsMap';

const dummyRoutes: Route[] = [
  { id: '1', name: 'Rota Centro-Sul', driver: 'Carlos A.', vehicle: 'Caminhão A-01', status: 'Em Rota', stops: 12 },
  { id: '2', name: 'Rota Norte', driver: 'Mariana B.', vehicle: 'Caminhão B-02', status: 'Concluída', stops: 8 },
  { id: '3', name: 'Coleta Avulsa - Empresa X', driver: 'Roberto C.', vehicle: 'Van C-01', status: 'Pendente', stops: 1 },
  { id: '4', name: 'Rota Leste', driver: 'Ana D.', vehicle: 'Caminhão A-02', status: 'Em Rota', stops: 15 },
  { id: '5', name: 'Rota Oeste', driver: 'João E.', vehicle: 'Caminhão B-01', status: 'Pendente', stops: 10 },
];

const statusBadge = (status: 'Em Rota' | 'Concluída' | 'Pendente') => {
    const colors = {
        'Em Rota': 'bg-blue-100 text-blue-800',
        'Concluída': 'bg-green-100 text-green-800',
        'Pendente': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>
}

const routeColumns: { header: string; accessor: keyof Route | ((item: Route) => React.ReactNode) }[] = [
    { header: 'Rota', accessor: 'name' },
    { header: 'Motorista', accessor: 'driver' },
    { header: 'Veículo', accessor: 'vehicle' },
    { header: 'Paradas', accessor: 'stops' },
    { header: 'Status', accessor: (item: Route) => statusBadge(item.status) },
];

const Logistics: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Operação & Logística</h1>
        <p className="mt-1 text-gray-500">Gerenciamento de rotas, coletas e frota de veículos.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Rotas Ativas" value="2" icon={<LogisticsIcon className="w-6 h-6"/>} />
        <Card title="Coletas Hoje" value="28" icon={<LogisticsIcon className="w-6 h-6"/>} />
        <Card title="Veículos em Operação" value="4 / 5" icon={<LogisticsIcon className="w-6 h-6"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Table 
                title="Status das Rotas"
                columns={routeColumns} 
                data={dummyRoutes}
                actions={<Button onClick={() => setModalOpen(true)}>Nova Rota</Button>}
            />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <h3 className="text-lg font-semibold text-gray-800 mb-4">Mapa de Operações</h3>
             <div className="w-full h-96">
                <OperationsMap />
             </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Criar Nova Rota">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome da Rota</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motorista</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Veículo</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="mr-2">Cancelar</Button>
            <Button type="submit">Criar Rota</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Logistics;