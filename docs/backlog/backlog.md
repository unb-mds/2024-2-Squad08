
<p align="justify">Nesta página, você encontrará o Product Backlog, uma lista organizada e priorizada que descreve as funcionalidades e melhorias necessárias para o desenvolvimento do produto. Além disso, abordaremos o processo de Elicitação de Requisitos, que envolve identificar, documentar e alinhar as necessidades do projeto com os objetivos do negócio.</p>

<p align="justify">Os requisitos de um sistema são classificados em dois tipos principais:</p>

- **Requisitos Funcionais**: Descrevem as funcionalidades específicas que o sistema deve realizar. Exemplos incluem exibir obras em um mapa interativo, implementar filtros para seleção por tipo ou região e criar páginas de detalhes das obras.
  
- **Requisitos Não Funcionais**: Referem-se às restrições ou qualidades do sistema, como desempenho, segurança, escalabilidade e usabilidade. Por exemplo, garantir que o site seja responsivo em dispositivos móveis ou que os dados do usuário sejam armazenados de forma segura.

<p align="justify">Compreender e diferenciar esses tipos de requisitos é essencial para garantir que o sistema atenda tanto às expectativas funcionais quanto às necessidades técnicas e de qualidade.</p>

---


Aqui está a tabela corrigida na ordem de prioridade:

| **ID**  | **Descrição**                                                                 | **Tipo**               | **Prioridade** |
|---------|-------------------------------------------------------------------------------|------------------------|----------------|
| PBI-01  | Desenvolver a exibição de obras no mapa interativo, com ícones clicáveis.    | Requisito Funcional    | 🔴 Alta        |
| PBI-02  | Implementar filtro de seleção por região para visualização de obras.        | Requisito Funcional    | 🔴 Alta        |
| PBI-03  | Implementar filtro de seleção por tipo para visualização de obras.          | Requisito Funcional    | 🔴 Alta        |
| PBI-04  | Implementar filtro de seleção por valor para visualização de obras.         | Requisito Funcional    | 🔴 Alta        |
| PBI-05  | Implementar filtro de seleção por status para visualização de obras.        | Requisito Funcional    | 🔴 Alta        |
| PBI-06  | Criar página de detalhes da obra com informações específicas (endereço, orçamento, etc.). | Requisito Funcional | 🔴 Alta        |
| PBI-07  | Permitir a filtragem de obras diretamente no mapa interativo.               | Funcionalidade         | 🔴 Alta        |
| PBI-08  | Integrar funcionalidade de login para salvar dados personalizados.          | Requisito Não Funcional| 🔴 Alta        |
| PBI-09  | Integrar funcionalidade de cadastro de usuário.                             | Requisito Não Funcional| 🔴 Alta        |
| PBI-12  | Acessar a localização em tempo real do usuário para mapa personalizado.     | Funcionalidade         | 🔴 Alta        |
| PBI-14  | Desenvolver extração automática de dados de diários oficiais.               | Funcionalidade         | 🔴 Alta        |
| PBI-15  | Processar e filtrar dados extraídos para selecionar informações relevantes.  | Funcionalidade         | 🔴 Alta        |
| PBI-16  | Implementar busca e filtros avançados por tipo, status, região e valores.   | Funcionalidade         | 🔴 Alta        |
| PBI-17  | Otimizar o desempenho da aplicação para suportar grandes volumes de dados.  | Requisito Não Funcional| 🔴 Alta        |
| PBI-19  | Garantir responsividade do site em dispositivos móveis.                     | Requisito Não Funcional| 🔴 Alta        |
| PBI-21  | Desenvolver todas as telas do front-end para visualização das obras.        | Requisito Funcional    | 🔴 Alta        |
| PBI-22  | Implementar sistema de autenticação de usuário para login, cadastro e redefinição de senha. | Requisito Não Funcional| 🔴 Alta        |
| PBI-23  | Armazenar os dados do usuário (como localização, preferências) no back-end de forma segura. | Requisito Não Funcional| 🔴 Alta        |
| PBI-24  | Criar endpoints para salvar, editar e excluir dados das obras no back-end.  | Funcionalidade         | 🔴 Alta        |
| PBI-26  | Implementar sistema de armazenamento de IP do usuário para acessar localização. | Requisito Não Funcional| 🔴 Alta        |
| PBI-27  | Implementar integração com serviços de geolocalização para capturar a localização do usuário em tempo real. | Funcionalidade | 🔴 Alta        |
| PBI-30  | Garantir que todos os dados inseridos pelo usuário sejam validados no front-end antes de serem enviados para o back-end. | Requisito Não Funcional| 🔴 Alta        |
| PBI-31  | Implementar testes automatizados para as principais funcionalidades.       | Requisito Não Funcional| 🔴 Alta        |
| PBI-10  | Integrar funcionalidade de cadastrar endereço do usuário.                   | Requisito Não Funcional| 🟡 Média       |
| PBI-11  | Integrar funcionalidade de redefinição de senha pelo usuário.               | Requisito Não Funcional| 🟡 Média       |
| PBI-13  | Acessar a localização em tempo real do usuário para notícias personalizadas. | Funcionalidade         | 🟡 Média       |
| PBI-18  | Exibição de notícias de obras.                                              | Funcionalidade         | 🟡 Média       |
| PBI-25  | Criar sistema de cache para otimizar a exibição das obras no mapa interativo. | Funcionalidade         | 🟡 Média       |
| PBI-28  | Criar página de histórico de ações do usuário (como login, registros de obras). | Funcionalidade         | 🟡 Média       |
| PBI-29  | Desenvolver sistema de notificações por push ou e-mail para alertar sobre novas obras ou mudanças. | Funcionalidade | 🟡 Média       |
| PBI-20  | Garantir responsividade do site em dispositivos desktop.                    | Requisito Não Funcional| 🟢 Baixa       |


**Legenda:**  
🔴 Alta — Crítica para o funcionamento do sistema.  
🟡 Média — Necessária, mas pode ser implementada após os itens críticos.  
🟢 Baixa — Menor impacto ou melhorias incrementais.  

---

### **Critérios de Aceitação para alguns PBIs**  

1. **PBI-21**:  
   Todas as telas de visualização de obras devem ser desenvolvidas, incluindo a tela de listagem, de detalhes e a tela de filtros.  

2. **PBI-22**:  
   O sistema de autenticação deve permitir login, cadastro e redefinição de senha com envio de e-mail de confirmação.  
   A senha deve ser criptografada.  

3. **PBI-23**:  
   Os dados do usuário (como IP, preferências, localização) devem ser armazenados de maneira segura, utilizando criptografia onde necessário.  

4. **PBI-24**:  
   O back-end deve permitir salvar, editar e excluir as obras de maneira eficiente, com validações de dados.  

5. **PBI-26**:  
   O IP do usuário deve ser capturado e armazenado para uso em funcionalidades de localização, com total respeito à privacidade.  

6. **PBI-27**:  
   O sistema deve conseguir acessar a localização em tempo real do usuário por meio de geolocalização, desde que o usuário tenha autorizado o acesso.  

---

Os itens do backlog devem ser constantemente revisados e priorizados pelo Product Owner, de acordo com as necessidades do projeto e feedbacks obtidos.

<center>Autora: Beatriz Lins </center>