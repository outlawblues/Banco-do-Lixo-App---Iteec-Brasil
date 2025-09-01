
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import { WasteIcon, SocialIcon, FinanceIcon } from '../ui/Icons';
import type { Transaction } from '../../types';
import WasteCompositionChart from '../charts/WasteCompositionChart';

const dummyTransactions: Transaction[] = [
  { id: '1', type: 'Entrada', material: 'PET', weightKg: 150.5, date: '2023-10-27', origin: 'Coleta Seletiva A', destination: 'Central' },
  { id: '2', type: 'Saída', material: 'Papelão', weightKg: 320.0, date: '2023-10-27', origin: 'Central', destination: 'Recicladora Parceira' },
  { id: '3', type: 'Entrada', material: 'Vidro', weightKg: 85.2, date: '2023-10-26', origin: 'Ponto de Coleta B', destination: 'Central' },
  { id: '4', type: 'Entrada', material: 'Alumínio', weightKg: 45.8, date: '2023-10-26', origin: 'Coleta Seletiva C', destination: 'Central' },
  { id: '5', type: 'Saída', material: 'PET', weightKg: 120.0, date: '2023-10-25', origin: 'Central', destination: 'Recicladora Parceira' },
];

const transactionColumns: { header: string; accessor: keyof Transaction | ((item: Transaction) => React.ReactNode) }[] = [
  { header: 'Tipo', accessor: 'type' },
  { header: 'Material', accessor: 'material' },
  { header: 'Peso (kg)', accessor: 'weightKg' },
  { header: 'Data', accessor: 'date' },
  { header: 'Origem/Destino', accessor: (item: Transaction) => item.type === 'Entrada' ? item.origin : item.destination },
];

const initialStats = {
  totalCollected: '12.5 T',
  familiesServed: '1,240',
  monthlyRevenue: 'R$ 45.8k',
  creditsDistributed: 'C$ 18,920',
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(() => {
    try {
      const savedStats = window.localStorage.getItem('dashboardStats');
      return savedStats ? JSON.parse(savedStats) : initialStats;
    } catch (error) {
      console.error("Failed to parse stats from localStorage", error);
      return initialStats;
    }
  });

  useEffect(() => {
    window.localStorage.setItem('dashboardStats', JSON.stringify(stats));
  }, [stats]);


  const handleStatChange = (key: keyof typeof stats, newValue: string) => {
    setStats(prev => ({ ...prev, [key]: newValue }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-1 text-gray-500">Visão geral do sistema Eco Lixo Brasil. Clique nos valores para editar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Total Coletado (Mês)" 
          value={stats.totalCollected} 
          change="+5.2%" 
          changeType="positive" 
          icon={<WasteIcon className="w-6 h-6"/>}
          isEditable={true}
          onValueChange={(newValue) => handleStatChange('totalCollected', newValue)} 
        />
        <Card 
          title="Famílias Atendidas" 
          value={stats.familiesServed} 
          change="+15" 
          changeType="positive" 
          icon={<SocialIcon className="w-6 h-6"/>}
          isEditable={true}
          onValueChange={(newValue) => handleStatChange('familiesServed', newValue)} 
        />
        <Card 
          title="Receita (Mês)" 
          value={stats.monthlyRevenue}
          change="+8.1%" 
          changeType="positive" 
          icon={<FinanceIcon className="w-6 h-6"/>}
          isEditable={true}
          onValueChange={(newValue) => handleStatChange('monthlyRevenue', newValue)} 
        />
        <Card 
          title="Créditos Distribuídos" 
          value={stats.creditsDistributed}
          change="-2.3%" 
          changeType="negative" 
          icon={<SocialIcon className="w-6 h-6"/>}
          isEditable={true}
          onValueChange={(newValue) => handleStatChange('creditsDistributed', newValue)} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Table 
                title="Últimas Transações"
                columns={transactionColumns} 
                data={dummyTransactions}
                actions={<Button variant="secondary">Ver Tudo</Button>}
            />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <h3 className="text-lg font-semibold text-gray-800 mb-4">Composição de Resíduos</h3>
             <WasteCompositionChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;