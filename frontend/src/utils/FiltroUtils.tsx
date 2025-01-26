export const filterObras = (obras, state) => {
    return obras.filter(obra => {
      const matchTipo = !state.tipo || obra.tipo === state.tipo;
      const matchSituacao = !state.situacao || obra.situacao === state.situacao;
  
      const valueConditions = {
        cem: (valor) => valor <= 100000,
        duzentos: (valor) => valor <= 200000,
        trezentos: (valor) => valor <= 300000,
        quinhentos: (valor) => valor <= 500000,
        setecentos: (valor) => valor <= 700000,
        novecentos: (valor) => valor <= 900000,
        milhao: (valor) => valor > 1000000,
      };
  
      const matchValor = !state.valores || state.valores.some(value => {
        const valor = obra.valorInvestimentoPrevisto;
        return valueConditions[value] ? valueConditions[value](valor) : false;
      });
  
      return matchTipo && matchSituacao && matchValor;
    });
  };