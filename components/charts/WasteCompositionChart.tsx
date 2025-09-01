import React, { useState } from 'react';
import type { ChartData } from '../../types';

const initialData: (ChartData & { color: string })[] = [
  { name: 'Papel', value: 39, color: '#38A169' }, // green
  { name: 'Orgânico', value: 23, color: '#A0522D' }, // sienna
  { name: 'Plástico', value: 23, color: '#3182CE' }, // blue
  { name: 'Vidro', value: 10, color: '#D69E2E' }, // yellow
  { name: 'Metal', value: 5, color: '#718096' }, // gray
];

const WasteCompositionChart: React.FC = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  let cumulativePercentage = 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
        {initialData.map((slice, index) => {
          const strokeDasharray = `${(slice.value / 100) * circumference} ${circumference}`;
          const strokeDashoffset = (-cumulativePercentage / 100) * circumference;
          cumulativePercentage += slice.value;

          return (
            <circle
              key={index}
              r={radius}
              cx="100"
              cy="100"
              fill="transparent"
              stroke={slice.color}
              strokeWidth="40"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
              style={{ transformOrigin: 'center', transform: hoveredSlice === slice.name ? 'scale(1.05)' : 'scale(1)' }}
              onMouseEnter={() => setHoveredSlice(slice.name)}
              onMouseLeave={() => setHoveredSlice(null)}
            />
          );
        })}
         <text x="100" y="105" textAnchor="middle" className="rotate-90 fill-current text-gray-700 text-2xl font-bold" style={{ transformOrigin: 'center' }}>
            {hoveredSlice ? `${initialData.find(d => d.name === hoveredSlice)?.value}%` : ''}
        </text>
         <text x="100" y="85" textAnchor="middle" className="rotate-90 fill-current text-gray-500 text-xs" style={{ transformOrigin: 'center' }}>
            {hoveredSlice || 'Total'}
        </text>
      </svg>
      <div className="mt-4 w-full grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {initialData.map((slice) => (
          <div key={slice.name} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: slice.color }}></span>
            <span className="font-medium text-gray-600">{slice.name}</span>
            <span className="ml-auto text-gray-500">{slice.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasteCompositionChart;
