
import React, { useState } from 'react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { WasteIcon } from '../ui/Icons';
import type { Material } from '../../types';

const dummyMaterials: Material[] = [
  { id: '1', name: 'Garrafa PET', category: 'Plástico', stockKg: 1250.5, pricePerKg: 1.50 },
  { id: '2', name: 'Papelão Ondulado', category: 'Papel', stockKg: 3480.0, pricePerKg: 0.45 },
  { id: '3', name: 'Vidro (Garrafas)', category: 'Vidro', stockKg: 850.2, pricePerKg: 0.20 },
  { id: '4', name: 'Latinhas de Alumínio', category: 'Metal', stockKg: 450.8, pricePerKg: 5.50 },
  { id: '5', name: 'Resíduos Orgânicos', category: 'Orgânico', stockKg: 2100.0, pricePerKg: 0.10 },
  { id: '6', name: 'Plástico Rígido', category: 'Plástico', stockKg: 780.3, pricePerKg: 1.20 },
];

const WasteManagement: React.FC = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

    const handleOpenEditModal = (material: Material) => {
        setSelectedMaterial(material);
        setEditModalOpen(true);
    };

    const materialColumns: { header: string; accessor: keyof Material | ((item: Material) => React.ReactNode) }[] = [
        { header: 'Material', accessor: 'name' },
        { header: 'Categoria', accessor: 'category' },
        { header: 'Estoque (kg)', accessor: 'stockKg' },
        { header: 'Preço/kg (R$)', accessor: (item: Material) => item.pricePerKg.toFixed(2) },
        { header: 'Ações', accessor: (item: Material) => <Button onClick={() => handleOpenEditModal(item)} variant="secondary" className="py-1 px-3 text-xs">Editar</Button> },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Gestão de Resíduos</h1>
                <p className="mt-1 text-gray-500">Controle de estoque e classificação de materiais recicláveis.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Plástico" value="2.0 T" icon={<WasteIcon className="w-6 h-6"/>} />
                <Card title="Papel" value="3.5 T" icon={<WasteIcon className="w-6 h-6"/>} />
                <Card title="Vidro" value="0.9 T" icon={<WasteIcon className="w-6 h-6"/>} />
                <Card title="Metal" value="0.5 T" icon={<WasteIcon className="w-6 h-6"/>} />
            </div>

            <div>
                <Table 
                    title="Estoque de Materiais"
                    columns={materialColumns} 
                    data={dummyMaterials}
                    actions={<Button onClick={() => setAddModalOpen(true)}>Adicionar Material</Button>}
                />
            </div>

            <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Adicionar Novo Material">
                 <form className="space-y-4">
                    {/* Form fields for adding material */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Material</label>
                        <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                            <option>Plástico</option>
                            <option>Papel</option>
                            <option>Vidro</option>
                            <option>Metal</option>
                            <option>Orgânico</option>
                        </select>
                    </div>
                     <div className="flex justify-end pt-2">
                        <Button type="button" variant="secondary" onClick={() => setAddModalOpen(false)} className="mr-2">Cancelar</Button>
                        <Button type="submit">Adicionar</Button>
                    </div>
                </form>
            </Modal>

            {selectedMaterial && (
                 <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title={`Editar ${selectedMaterial.name}`}>
                     <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estoque (kg)</label>
                            <input type="number" defaultValue={selectedMaterial.stockKg} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preço/kg (R$)</label>
                            <input type="number" step="0.01" defaultValue={selectedMaterial.pricePerKg} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button type="button" variant="secondary" onClick={() => setEditModalOpen(false)} className="mr-2">Cancelar</Button>
                            <Button type="submit">Salvar Alterações</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default WasteManagement;
