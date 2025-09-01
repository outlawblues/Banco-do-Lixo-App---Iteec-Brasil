
import React, { useState } from 'react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { FinanceIcon } from '../ui/Icons';
import type { Transaction } from '../../types';

const dummyFinancialTransactions: Transaction[] = [
  { id: '1', type: 'Entrada', material: 'Venda de Plástico', weightKg: 1200, date: '2023-10-27', origin: 'Recicladora A', destination: 'R$ 1800.00' },
  { id: '2', type: 'Saída', material: 'Combustível Frota', weightKg: 0, date: '2023-10-26', origin: 'Posto X', destination: 'R$ -350.00' },
  { id: '3', type: 'Entrada', material: 'Venda de Papelão', weightKg: 3200, date: '2023-10-25', origin: 'Recicladora B', destination: 'R$ 1440.00' },
  { id: '4', type: 'Saída', material: 'Manutenção Equipamento', weightKg: 0, date: '2023-10-24', origin: 'Oficina Y', destination: 'R$ -800.00' },
  { id: '5', type: 'Entrada', material: 'Venda de Alumínio', weightKg: 450, date: '2023-10-23', origin: 'Recicladora A', destination: 'R$ 2475.00' },
];

const financialColumns: { header: string; accessor: keyof Transaction | ((item: Transaction) => React.ReactNode) }[] = [
    { header: 'Data', accessor: 'date' },
    { header: 'Descrição', accessor: 'material' },
    { header: 'Tipo', accessor: 'type' },
    { header: 'Valor', accessor: (item: Transaction) => (
        <span className={item.type === 'Entrada' ? 'text-green-600' : 'text-red-600'}>
            {item.destination}
        </span>
    ) },
];

const FinancialManagement: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gestão Financeira</h1>
        <p className="mt-1 text-gray-500">Acompanhamento de receitas, despesas e fluxo de caixa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Receita Bruta (Mês)" value="R$ 45.8k" change="+8.1%" changeType="positive" icon={<FinanceIcon className="w-6 h-6"/>} />
        <Card title="Despesas (Mês)" value="R$ 21.2k" change="+3.5%" changeType="negative" icon={<FinanceIcon className="w-6 h-6"/>} />
        <Card title="Lucro Líquido (Mês)" value="R$ 24.6k" change="+12.3%" changeType="positive" icon={<FinanceIcon className="w-6 h-6"/>} />
      </div>

      <div>
        <Table 
            title="Fluxo de Caixa Recente"
            columns={financialColumns} 
            data={dummyFinancialTransactions}
            actions={<Button onClick={() => setModalOpen(true)}>Adicionar Lançamento</Button>}
        />
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Adicionar Lançamento">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor (R$)</label>
            <input type="number" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option>Entrada</option>
                <option>Saída</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="mr-2">Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FinancialManagement;
