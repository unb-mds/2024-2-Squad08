## **Metodologia**
<p align="justify">Para elicitarmos os requisitos utilizamos a técnica de Introspecção que consiste na criação de uma simulação onde mostra a forma como os usuários interagem com o site. Através da elaboração de uma narrativa de um usuário, são analisados seus objetivos, tarefas e preferências, permitindo a identificação dos diferentes caminhos que os usuários podem seguir. Com base nessa análise, são definidos os requisitos funcionais e não funcionais do sistema. 
</p>

## **Requisitos Elicitados**
<p align="justify">Legenda da tabela: 
<li> RF (Requisitos Funcionais): descrevem as funcionalidades e operações que o sistema deve realizar para atender às necessidades dos usuários. </li>
<li> RNF (Requisitos Não Funcionais): definem a qualidade e o desempenho de um sistema. </li>
<li> Identificação (R + N°) : Requisito Elicitado pela Introspecção + Número
</p>
<p align="justify">A tabela abaixo representa os Requisitos Elicitados:
</p>

---


| **ID**  | **Descrição**                                                                 | **Tipo**               |
|---------|-------------------------------------------------------------------------------|------------------------|
| PBI-01  | Desenvolver a exibição de obras no mapa interativo, com ícones clicáveis.    | Requisito Funcional    |
| PBI-02  | Implementar filtro de seleção por região para visualização de obras.        | Requisito Funcional    |
| PBI-03  | Implementar filtro de seleção por tipo para visualização de obras.          | Requisito Funcional    |
| PBI-04  | Implementar filtro de seleção por valor para visualização de obras.         | Requisito Funcional    |
| PBI-05  | Implementar filtro de seleção por status para visualização de obras.        | Requisito Funcional    |
| PBI-06  | Criar página de detalhes da obra com informações específicas (endereço, orçamento, etc.). | Requisito Funcional |
| PBI-07  | Permitir a filtragem de obras diretamente no mapa interativo.               | Funcionalidade         |
| PBI-08  | Integrar funcionalidade de login para salvar dados personalizados.          | Requisito Não Funcional|
| PBI-09  | Integrar funcionalidade de cadastro de usuário.                             | Requisito Não Funcional|
| PBI-10  | Integrar funcionalidade de cadastrar endereço do usuário.                   | Requisito Não Funcional|
| PBI-11  | Integrar funcionalidade de redefinição de senha pelo usuário.               | Requisito Não Funcional|
| PBI-12  | Acessar a localização em tempo real do usuário para mapa personalizado.     | Funcionalidade         |
| PBI-13  | Acessar a localização em tempo real do usuário para notícias personalizadas. | Funcionalidade         |
| PBI-14  | Desenvolver extração automática de dados de diários oficiais.               | Funcionalidade         |
| PBI-15  | Processar e filtrar dados extraídos para selecionar informações relevantes.  | Funcionalidade         |
| PBI-16  | Implementar busca e filtros avançados por tipo, status, região e valores.   | Funcionalidade         |
| PBI-17  | Otimizar o desempenho da aplicação para suportar grandes volumes de dados.  | Requisito Não Funcional|
| PBI-18  | Exibição de notícias de obras.                                              | Funcionalidade         |
| PBI-19  | Garantir responsividade do site em dispositivos móveis.                     | Requisito Não Funcional|
| PBI-20  | Garantir responsividade do site em dispositivos desktop.                    | Requisito Não Funcional|

---

### Requisitos Funcionais (Refinados)

1. **Listagem de Obras no Mapa Interativo**  
   O site deve exibir obras em andamento em uma determinada região em um mapa interativo.  
   Cada obra no mapa deve estar representada por um ícone ou marcador clicável, permitindo ao usuário ver mais detalhes da obra ao clicar.  
   **Critérios de aceitação**: O mapa deve carregar corretamente as obras e apresentar pop-ups com informações básicas ao clicar nos marcadores.

2. **Filtro de Região**  
   O site deve oferecer um filtro de seleção por região para que o usuário possa visualizar obras apenas na área de interesse.  
   **Critérios de aceitação**: O filtro de região deve ser acessível e permitir que o usuário veja apenas obras na área selecionada.

3. **Página de Detalhes da Obra**  
   O site deve ter uma página detalhada para cada obra, exibindo as seguintes informações: 

    - Endereço da obra  
    - Orçamento da obra  
    - Responsável pela obra  
    - Data de início e data prevista de término 

    **Critérios de aceitação**: A página deve exibir corretamente as informações da obra cadastrada e permitir navegação de volta para o mapa interativo.

4. **Filtro de Obras por Região no Mapa**  
   O mapa interativo deve permitir filtragem das obras por diferentes regiões, com a possibilidade de ajustar o zoom e visualizar obras apenas na área selecionada.  
   **Critérios de aceitação**: O mapa deve ser interativo e permitir filtragem dinâmica sem a necessidade de recarregar a página.

5. **Busca e Filtros Avançados por Tipo, Status, Região e Valores**  
   O site deve permitir que o usuário filtre obras por múltiplos critérios, como tipo de obra, status, região e valor.  
   **Critérios de aceitação**: Os filtros devem ser aplicados simultaneamente e os resultados devem ser exibidos em até 2 segundos após a aplicação dos filtros.

6. **Categorização e Atualização Automática de Status de Obras**  
   As obras devem ser categorizadas com status atualizados automaticamente (ex.: Planejamento, Execução, Concluída).  
   **Critérios de aceitação**: O status das obras deve ser atualizado conforme o progresso e exibido corretamente na interface do usuário.

7. **Exibição de Notícias de Obras**  
   O site deve exibir notícias relacionadas às obras, com base na região de interesse do usuário.  
   **Critérios de aceitação**: As notícias devem ser apresentadas de maneira clara e estar relacionadas ao progresso ou status das obras.

---

### Requisitos Não Funcionais (Refinados)

1. **Login para Dados Personalizados**  
O site deve exigir login para usuários que desejam salvar dados personalizados, como: 
    - Exibição de obras planejadas ou futuras em regiões de interesse  
    - Progresso das obras próximas à residência do usuário  

    **Critérios de aceitação**: Após login, os dados personalizados devem ser carregados automaticamente e permitir interação com o conteúdo.

2. **Marcação de Local para Necessidade de Obra**  
   Usuários autenticados devem poder indicar locais que necessitam de obras, preenchendo um formulário com as seguintes informações:  
    - Localização geográfica (pode incluir um marcador no mapa ou endereço)  
    - Foto do local (upload de imagem)  
    - Tipo de obra necessária (ex.: pavimentação, iluminação, drenagem, etc.)  
    **Critérios de aceitação**: O formulário deve ser fácil de preencher, e a localização, imagem e tipo de obra devem ser salvos corretamente.

3. **Responsividade do Site**  
   O site deve ser totalmente responsivo, funcionando corretamente em dispositivos móveis e desktop, adaptando-se aos diferentes tamanhos de tela.  
   **Critérios de aceitação**: O layout e funcionalidades devem ser usáveis tanto em dispositivos móveis quanto em desktops, sem problemas de usabilidade.

---

<p align="justify">Os requisitos refinados acima foram elaborados para garantir que o sistema atenda às necessidades dos usuários de forma eficiente e eficaz. Os requisitos funcionais detalham as funcionalidades essenciais que o sistema deve oferecer, enquanto os requisitos não funcionais especificam as qualidades e características que o sistema deve possuir para proporcionar uma boa experiência ao usuário. A combinação desses requisitos assegura que o sistema seja completo, funcional e de alta qualidade.</p>

<center>Autor: Daniel Ferreira Nunes </center>
<center>Atualizações: Beatriz Lins </center>


