
export type ViewType = 'dashboard' | 'waste' | 'social' | 'finance' | 'logistics';

export interface Material {
  id: string;
  name: string;
  category: 'Plástico' | 'Papel' | 'Vidro' | 'Metal' | 'Orgânico';
  stockKg: number;
  pricePerKg: number;
}

export interface Transaction {
  id: string;
  type: 'Entrada' | 'Saída';
  material: string;
  weightKg: number;
  date: string;
  origin: string;
  destination: string;
}

export interface Beneficiary {
  id:string;
  name: string;
  familySize: number;
  credits: number;
  lastDelivery: string;
}

export interface Route {
    id: string;
    name: string;
    driver: string;
    vehicle: string;
    status: 'Em Rota' | 'Concluída' | 'Pendente';
    stops: number;
}


export interface ChartData {
  name: string;
  value: number;
}
