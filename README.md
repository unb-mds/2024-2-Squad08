# Mapeamento de Obras e Serviços Públicos

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/unb-mds/MOSP-G8)](https://img.shields.io/github/issues/unb-mds/MOSP-G8)
[![GitHub contributors](https://img.shields.io/github/contributors/unb-mds/MOSP-G8)](https://img.shields.io/github/contributors/unb-mds/MOSP-G8)
[![GitHub stars](https://img.shields.io/github/stars/unb-mds/MOSP-G8)](https://img.shields.io/github/stars/unb-mds/MOSP-G8)
[![Hit Counter](https://views.whatilearened.today/views/github/unb-mds/MOSP-G8.svg)](https://views.whatilearened.today/views/github/unb-mds/MOSP-G8.svg)
</br>
[![Python version](https://img.shields.io/badge/python-3.11.6-blue)](https://www.python.org/downloads/release/python-3116/)
[![React version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![Django version](https://img.shields.io/badge/django-4.2.5-blue)](https://www.djangoproject.com/download/)
[![Docker version](https://img.shields.io/badge/docker-24.0.7-blue)](https://docs.docker.com/engine/install/)
[![Docker Compose version](https://img.shields.io/badge/docker_compose-2.21.0-blue)](https://docs.docker.com/compose/install/)

## 📋 Descrição
O projeto de Mapeamento de Obras e Serviços Públicos é um sistema de mapeamento interativo que extrai e apresenta informações sobre obras e serviços públicos anunciados nos diários oficiais. Ele permite que cidadãos acompanhem o progresso, a localização e os detalhes dessas iniciativas, promovendo transparência e facilitando o acesso a informações sobre o uso de recursos públicos em suas regiões.

## 📎 Funcionalidades
- **Extração de Dados:** Captura de informações sobre obras e serviços dos diários oficiais.
- **Processamento e Filtragem:** Análise de dados para selecionar as informações mais relevantes, como local, tipo de obra, status e valor investido.
- **Exibição em Mapa:** Integração com um mapa interativo, onde os cidadãos podem visualizar as obras e serviços por localização geográfica.
- **Acompanhamento de Status:** Atualizações sobre o andamento de cada obra ou serviço, categorizadas por status (Planejamento, Em Execução, Concluída).
- **Busca e Filtros Avançados:** Permite que usuários filtrem obras por tipo, região, status e valores envolvidos.
  
## 📋 Pré-requisitos
Para rodar o projeto, você precisa instalar as dependências globais:
 
- Docker
- Docker Compose
- Git

## 💻 Ambiente
Para configurar o ambiente, siga os passos:

1. Clone o repositório:
```bash
git clone https://github.com/unb-mds/MDS-MonitoraBSB/
cd MDS-MonitoraBSB
```

2. Crie o arquivo `.env` na raiz do projeto:
```bash
touch .env
```

3. Adicione as seguintes variáveis de configuração no arquivo `.env`:
```env
# Configurações de Banco de Dados
SECRET_KEY=sua_chave_secreta_aqui
POSTGRES_DB=nome_do_banco
POSTGRES_USER=usuario_do_banco
POSTGRES_PASSWORD=senha_do_banco
POSTGRES_PORT=5432
POSTGRES_HOST=postgres
DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco
```

**Importante:** Substitua os valores de exemplo pelas suas próprias configurações

## 💾 Execução
Para executar o projeto, use o seguinte comando:

```bash
docker compose up --build

# Se for necessário deletar os volumes
docker compose down -v 
```

## 🖱️ Acesso aos serviços
| Serviço  |                      URL                       |
| :------- | :--------------------------------------------: |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend  | [http://localhost:5000](http://localhost:5000) |

## 📚 Documentação
A documentação do projeto pode ser encontrada clicando [aqui](https://unb-mds.github.io/MDS-MonitoraBSB/).

## 👥 Equipe
<table>
  <tr>
    <td align="center"><a href="https://github.com/erickaalves"><img style="border-radius: 50%;" src="https://github.com/erickaalves.png" width="100px;" alt=""/><br/><sub><b>Erick Alves</b></sub></a><br/>
    <td align="center"><a href="https://github.com/Beatriz-ge"><img style="border-radius: 50%;" src="https://github.com/Beatriz-ge.png" width="100px;" alt=""/><br/><sub><b>Beatriz Lins</b></sub></a><br/>
    <td align="center"><a href="https://github.com/CerqPaulo"><img style="border-radius: 50%;" src="https://github.com/CerqPaulo.png" width="100px;" alt=""/><br/><sub><b>Paulo Cerqueira</b></sub></a><br/>
    <td align="center"><a href="https://github.com/Mach1r0"><img style="border-radius: 50%;" src="https://github.com/Mach1r0.png" width="100px;" alt=""/><br/><sub><b>Danie Ferreira Nunes</b></sub></a><br/>
    <td align="center"><a href="https://github.com/DanNunes777"><img style="border-radius: 50%;" src="https://github.com/DanNunes777.png" width="100px;" alt=""/><br/><sub><b>Daniel Nunes Duarte</b></sub></a><br/>
      <td align="center"><a href="https://github.com/gustavolima973"><img style="border-radius: 50%;" src="https://github.com/gustavolima973.png" width="100px;" alt=""/><br/><sub><b>Gustavo Lima Menezes</b></sub></a><br/>
  </tr>
  </tr>
</table>

## 📍 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

