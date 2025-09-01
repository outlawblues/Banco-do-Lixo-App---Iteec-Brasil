
import React, { useState } from 'react';
import { BancoDoLixoLogo } from '../ui/Icons';
import Button from '../ui/Button';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

const validUsers: { [key: string]: string } = {
  admin: 'password',
  Cabral: 'senhacabral321',
  Karina: 'senhakarina321',
  Felipe: 'senhafelipe321',
  Irene: 'senhairene321',
  MarcioTortorelli: 'senhaMarcioTortorelli321'
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validUsers[username] && validUsers[username] === password) {
      setError('');
      onLoginSuccess(username);
    } else {
      setError('Credenciais inválidas. Verifique seu usuário e senha.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex justify-center">
          <BancoDoLixoLogo />
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Acessar o Painel
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label 
              htmlFor="username" 
              className="text-sm font-medium text-gray-700"
            >
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition text-gray-900 placeholder-gray-500"
              placeholder="Digite seu usuário"
            />
          </div>
          <div>
            <label 
              htmlFor="password" 
              className="text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition text-gray-900 placeholder-gray-500"
              placeholder="Digite sua senha"
            />
          </div>
          
          {error && (
            <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          <div>
            <Button type="submit" className="w-full justify-center py-3">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;