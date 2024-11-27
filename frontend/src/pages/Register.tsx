import React, { useState } from "react";
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [signUp, user] = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setError(''); 

    if (!username || !email || !password || !confirmpassword) {
      setError('Preencha todos os campos'); 
      return;
    }

    if ( password !== confirmpassword) {
      setError('As senhas não coincidem'); 
      return;
    }

    try {
      const response = await signUp(username, email, password);
      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      setError('Erro ao cadastrar');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className='flex-1 flex flex-col items-center pt-20'>
      <div className='flex flex-col bg-[#D9D9D9] p-8 w-full max-w-md items-center rounded-md h-[500px] gap-4'>  
        <h1 className='text-4xl my-3'>Cadastre-se</h1>
          <form onSubmit={handleSignIn} className="flex flex-col gap-3 w-full">
            <div className='gap-1 text-white-700'>
              <input 
                className='bg-[#224957] h-10 w-full rounded-lg px-4 placeholder:text-white' 
                placeholder="Username" 
                type="text" 
                id='username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input 
                className='bg-[#224957] h-10 w-full rounded-lg px-4 placeholder:text-white'
                placeholder="Email" 
                type="text" 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                className='bg-[#224957] h-10 w-full rounded-lg px-4 placeholder:text-white'
                placeholder='Password' 
                type="password" 
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input 
                className='bg-[#224957] h-10 w-full rounded-lg px-4 placeholder:text-white'
                placeholder='Confirm Password' 
                type="password"
                id='confirmpassword'
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-[#4BEC6B] text-grey-500 py-2 rounded-lg mt-[20px] shadow-md hover:shadow-lg transition-shadow duration-300">
              CADASTRE-SE 
            </button>
            <small className="flex items-center justify-center gap-2">
              Já tem uma conta? <a href="/login" className="ml-1">Entrar</a>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}