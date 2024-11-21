"use client";
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (password !== confirmpassword){
      setError('As senhas não são iguais');
      return;
    }

    try {
    } catch (error) {
      setError('Error ao cadastrar usuario');
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
            <button className="bg-[#4BEC6B] text-grey-500 py-2 rounded-lg mt-10 shadow-md hover:shadow-lg transition-shadow duration-300">
              CADASTRE-SE 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}