import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

// Login.tsx
export default function Login() {
  const auth = useAuth(); // Get entire context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 
  
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await auth.login(email, password);
      if (result.ok) {
        navigate('/'); 
      } else {
        setError(result.error || 'Error logging in');
      }
    } catch (error) {
      console.error('Login error:', error); 
      setError('Error logging in');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className='flex-1 flex flex-col items-center pt-20'>
        <div className='flex flex-col bg-[#D9D9D9] p-8 w-full max-w-md items-center rounded-md h-[380px] gap-4'>  
          <h1 className='text-4xl my-3'>Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full">
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
            <button type='submit' className="bg-[#4BEC6B] text-grey-500 py-2 rounded-lg mt-[20px] shadow-md hover:shadow-lg transition-shadow duration-300">
              ENTRAR 
            </button>
            <small className="flex items-center justify-center gap-2">
              Não tem uma conta? <a href="/register" className="ml-1">Cadastre-se</a>
            </small>
          </form>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}