
import React, { useState, useEffect } from 'react';

interface CardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isEditable?: boolean;
  onValueChange?: (newValue: string) => void;
}

const Card: React.FC<CardProps> = ({ title, value, change, changeType, icon, children, className = '', isEditable = false, onValueChange }) => {
  const changeColor = changeType === 'positive' ? 'text-green-500' : 'text-red-500';
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    if (onValueChange) {
      onValueChange(editValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };
  
  return (
    <div className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isEditing && isEditable ? (
             <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
                className="text-3xl font-bold text-gray-800 mt-1 bg-transparent border-b-2 border-primary-500 focus:outline-none w-full"
              />
          ) : (
            <p 
              className={`text-3xl font-bold text-gray-800 mt-1 ${isEditable ? 'cursor-pointer hover:text-primary-600' : ''}`}
              onClick={() => isEditable && setIsEditing(true)}
            >
              {value}
            </p>
          )}
          {change && (
            <div className="flex items-center mt-2 text-xs">
              <span className={`font-semibold ${changeColor}`}>{change}</span>
              <span className="text-gray-400 ml-1">vs mês passado</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-50 text-primary-500 rounded-full">
          {icon}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;
