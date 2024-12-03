import React from 'react';

const UserProfileForm = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Informações pessoais</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Luis Inacio Lula da Silva"
                  defaultValue="Luis Inacio Lula da Silva"
                  disabled
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="seuemail@email.com"
                />
              </div>

              <div>
                <label htmlFor="cep" className="block text-gray-700 font-medium mb-2">CEP *</label>
                <input
                  type="text"
                  id="cep"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00000-000"
                />
              </div>

              <div>
                <label htmlFor="cidade" className="block text-gray-700 font-medium mb-2">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label htmlFor="uf" className="block text-gray-700 font-medium mb-2">UF</label>
                <input
                  type="text"
                  id="uf"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="UF"
                />
              </div>

              <div>
                <label htmlFor="rua" className="block text-gray-700 font-medium mb-2">Rua</label>
                <input
                  type="text"
                  id="rua"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rua"
                />
              </div>

              <div>
                <label htmlFor="bairro" className="block text-gray-700 font-medium mb-2">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Bairro"
                />
              </div>

              <div>
                <label htmlFor="numero" className="block text-gray-700 font-medium mb-2">Número</label>
                <input
                  type="text"
                  id="numero"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Número"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label htmlFor="complemento" className="block text-gray-700 font-medium mb-2">Complemento</label>
                <input
                  type="text"
                  id="complemento"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Complemento"
                />
              </div>

              <div className="col-span-1 md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
