# **Arquitetura do Sistema - MonitoraBSB**

<p align="justify">

## **Introdução**
    
O **MonitoraBSB** é um sistema de monitoramento e análise voltado para acompanhar diversos indicadores da cidade de Brasília. O objetivo é fornecer uma plataforma web onde os usuários possam visualizar, analisar e reportar dados relacionados a diferentes aspectos da cidade. Este documento descreve a arquitetura do sistema, abordando os principais componentes e a interação entre eles.
</p>

---

## **Diagrama de Arquitetura**

![Arquitetura de software](New_architeture.png)

---

## Componentes Principais
O sistema é dividido em três camadas principais:

1. **Front-end**
2. **Back-end**
3. **Banco de Dados**
   
Cada uma dessas camadas possui subcomponentes específicos, como informado abaixo:

### 1. Front-end

- **Client (Web)**: O front-end é responsável por fornecer a interface do usuário (UI), permitindo que os usuários interajam com o sistema. No MonitoraBSB, o cliente web é responsável por permitir que os usuários visualizem, filtrem e analisem os dados de monitoramento.
  
### 2. Back-end

A camada de back-end é onde a lógica de negócio reside. Ela gerencia as requisições feitas pelo front-end e acessa o banco de dados para fornecer dados ou salvar novas informações. O back-end é dividido nos seguintes subcomponentes:

- **API**: A API expõe endpoints para que o front-end possa interagir com o sistema. É responsável por receber e processar as requisições do cliente web.
  - **Users**: Gerencia informações de usuários, autenticação e autorização.
  - **Indicators**: Lida com a busca e visualização dos indicadores de obras monitoradas, permitindo que os usuários filtrem e analisem dados específicos.
  - **Reports**: Gerencia o registro e as atualizações das requisições gerados pelos usuários, incluindo detalhes sobre o indicador e o status.

### 3. Banco de Dados

- **PostgreSQL**: O banco de dados utilizado para armazenar informações sobre as obras realizadas, indicadores e relatórios.

---

## Tecnologias Utilizadas

O sistema utiliza uma variedade de tecnologias para garantir escalabilidade, modularidade e facilidade de manutenção:

- **DevOps**:
  - **Docker**: Docker é utilizado para containerizar o back-end, facilitando a implantação e a gestão de dependências em ambientes diferentes.
    
- **Design/Front-end**:
  - **Figma**: Ferramenta de design utilizada para criar protótipos e garantir uma UI consistente.
  - **Bibliotecas CSS**: Utilizadas para estilizar a aplicação e garantir que a interface seja responsiva e fácil de usar.
  
- **Back-end**:
  - **PostgreSQL**: Banco de dados relacional utilizado para armazenamento de dados, garantindo confiabilidade e segurança.

---

## Fluxo de Dados e Comunicação

1. **Interação do Usuário com o Front-end**: O usuário acessa o **Client (Web)** para visualizar, filtrar e analisar os dados de obras em andamento. A interface foi projetada para ser intuitiva e fácil de navegar.
2. **Gerenciamento com Docker**: Todo o back-end está containerizado usando **Docker**, permitindo fácil implantação e isolamento de dependências.

---

## **Conclusão**

A arquitetura do MonitoraBSB foi desenvolvida para ser modular, escalável e de fácil manutenção, utilizando tecnologias amplamente adotadas no mercado. Com o uso do Django, PostgreSQL e Docker, o sistema é robusto o suficiente para suportar o volume de usuários esperado e flexível para evoluir conforme a necessidade dos usuários. A separação clara entre front-end, API e banco de dados permite um desenvolvimento colaborativo eficiente e facilita a futura expansão da plataforma.

<center> Autores: Daniel Nunes Duarte </center>
