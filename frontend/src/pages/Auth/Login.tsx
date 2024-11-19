import React from 'react'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className='flex-1 flex flex-col items-center pt-20'>
        <div className='flex flex-col bg-[#D9D9D9] p-8 w-full max-w-md items-center rounded-md h-[380px] gap-4'>  
          <h1 className='text-4xl my-3'>Login</h1>
          <form className="flex flex-col gap-3 w-full">
            <div>
              <input 
                className='bg-[#224957] h-10 w-full rounded-lg px-4 placeholder:text-white'
                placeholder="Email" 
                type="text" 
              />
            </div>
            <div>
              <input 
                className='bg-[#224957] h-10 w-full rounded-lg px-4 placeholder:text-white'
                placeholder='Password' 
                type="password" 
              />
            </div>
            <button className="bg-[#4BEC6B] text-grey-500 py-2 rounded-lg mt-[20px] shadow-md hover:shadow-lg transition-shadow duration-300">
              ENTRAR 
            </button>
            <small className="flex items-center justify-center gap-2">
              Não tem uma conta? <a href="/register" className="ml-1">Cadastre-se</a>
            </small>
          </form>
        </div>
      </div>
    </div>
  )
}