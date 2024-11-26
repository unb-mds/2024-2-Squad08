# Estudo sobre os Dados da API

## Documentação da API
- [Acesse a documentação oficial da API](https://api.obrasgov.gestao.gov.br/obrasgov/api/swagger-ui/index.html#/Execu%C3%A7%C3%A3o%20Financeira)

## Endpoints Importantes

### 1. **Método GET para Projetos de Investimento**
- URL: [https://api-obrasgov.dth.api.gov.br/obrasgov/api/projeto-investimento?idUnico=01.52-52&page=0&size=10](https://api-obrasgov.dth.api.gov.br/obrasgov/api/projeto-investimento?idUnico=01.52-52&page=0&size=10)

**Observações:**
- Ideal para buscar dados de uma obra específica usando o `idUnico`.

---

### 2. **Filtrando Obras por Unidade Federativa**
- URL: [https://api-obrasgov.dth.api.gov.br/obrasgov/api/projeto-investimento?uf=DF](https://api-obrasgov.dth.api.gov.br/obrasgov/api/projeto-investimento?uf=DF)

**Uso:**
- Retorna somente as obras relacionadas ao Distrito Federal (UF: `DF`).

---

## Possíveis Problemas Identificados
1. Nem todas as obras possuem **CEP** registrado.
   - Sugestão: Utilize a **geometria do local** para buscas em mapas e endereços.
2. Para buscar informações de uma obra específica:
   - Recomendação: Use o **ID único** (`idUnico`) da obra.

---

## Ferramentas Utilizadas
- **Postman**:
  - Todos os métodos GET principais e derivados foram testados usando o Postman.
  - O Postman pode continuar auxiliando no processo com a checagem e validação dos dados.
  - Disponível para todas as plataformas.

---

Closes #17
