
import React, { useState } from 'react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { SocialIcon } from '../ui/Icons';
import type { Beneficiary } from '../../types';

const dummyBeneficiaries: Beneficiary[] = [
  { id: '1', name: 'Família Silva', familySize: 4, credits: 150, lastDelivery: '2023-10-25' },
  { id: '2', name: 'Família Santos', familySize: 3, credits: 85, lastDelivery: '2023-10-22' },
  { id: '3', name: 'Família Oliveira', familySize: 5, credits: 210, lastDelivery: '2023-10-26' },
  { id: '4', name: 'Família Pereira', familySize: 2, credits: 50, lastDelivery: '2023-10-19' },
  { id: '5', name: 'Família Costa', familySize: 6, credits: 320, lastDelivery: '2023-10-27' },
];

const SocialManagement: React.FC = () => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  const handleOpenDetails = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setDetailsModalOpen(true);
  };

  const beneficiaryColumns: { header: string; accessor: keyof Beneficiary | ((item: Beneficiary) => React.ReactNode) }[] = [
      { header: 'Família', accessor: 'name' },
      { header: 'Membros', accessor: 'familySize' },
      { header: 'Créditos (C$)', accessor: 'credits' },
      { header: 'Última Entrega', accessor: 'lastDelivery' },
      { header: 'Ações', accessor: (item) => <Button onClick={() => handleOpenDetails(item)} variant="secondary" className="py-1 px-3 text-xs">Ver Detalhes</Button> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gestão Social</h1>
        <p className="mt-1 text-gray-500">Administração de famílias beneficiárias e créditos sociais.</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total de Famílias" value="1,240" icon={<SocialIcon className="w-6 h-6"/>} />
        <Card title="Créditos em Circulação" value="C$ 89,450" icon={<SocialIcon className="w-6 h-6"/>} />
        <Card title="Novas Famílias (Mês)" value="15" icon={<SocialIcon className="w-6 h-6"/>} />
        <Card title="Engajamento Médio" value="85%" icon={<SocialIcon className="w-6 h-6"/>} />
      </div>

      <div>
        <Table 
            title="Famílias Beneficiárias"
            columns={beneficiaryColumns} 
            data={dummyBeneficiaries}
            actions={<Button onClick={() => setAddModalOpen(true)}>Cadastrar Família</Button>}
        />
      </div>

      {selectedBeneficiary && (
        <Modal isOpen={isDetailsModalOpen} onClose={() => setDetailsModalOpen(false)} title={`Detalhes de ${selectedBeneficiary.name}`}>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">ID:</span> {selectedBeneficiary.id}</p>
            <p><span className="font-semibold">Membros:</span> {selectedBeneficiary.familySize}</p>
            <p><span className="font-semibold">Saldo de Créditos:</span> C$ {selectedBeneficiary.credits}</p>
            <p><span className="font-semibold">Última Entrega de Resíduos:</span> {selectedBeneficiary.lastDelivery}</p>
          </div>
        </Modal>
      )}

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Cadastrar Nova Família">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome da Família</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nº de Membros</label>
            <input type="number" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="button" variant="secondary" onClick={() => setAddModalOpen(false)} className="mr-2">Cancelar</Button>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SocialManagement;
