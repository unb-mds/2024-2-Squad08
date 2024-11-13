<hr style="border: 0; height: 1px; background-color: #000000;">

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

| **Identificador** | **Requisito** | **Categoria** | 
|-------------------|---------------|---------------|
| R01 | Listagem de Obras no Mapa Interativo com pop-up ao clicar no marcador. | RF |
| R02 | Filtro de Região e filtragem direta no mapa interativo. | RF |
| R03 | Página de Detalhes da Obra com informações completas (endereço, orçamento, responsável, etc.). | RF |
| R04 | Login para acessar funcionalidades personalizadas, como salvar regiões de interesse e monitorar progresso de obras. | RNF |
| R05 | Marcação de Local para Necessidade de Obra, com seleção de localização, upload de imagem e tipo de obra necessária. | RNF |
| R06 | Busca e Filtros Avançados por tipo, status, região e valores. | RF |
| R07 | Categorização e Atualização Automática de Status de Obras (Planejamento, Execução, Concluída). | RF |

### Requisitos Funcionais (Refinados)

1. **Listagem de Obras no Mapa Interativo**
    
    - O site deve exibir obras em andamento em uma determinada região em um mapa interativo.
    - Cada obra no mapa deve estar representada por um ícone ou marcador clicável, permitindo ao usuário ver mais detalhes da obra ao clicar.
    
2. **Filtro de Região**
    
    - O site deve oferecer um filtro de seleção por região para que o usuário possa visualizar obras apenas na área de interesse.

3. **Página de Detalhes da Obra**
    
    - O site deve ter uma página detalhada para cada obra, exibindo as seguintes informações:
        - Endereço da obra
        - Orçamento da obra
        - Responsável pela obra
        - Data de início e data prevista de término

4. **Filtro de Obras por Região no Mapa**
    
    - O mapa interativo deve permitir filtragem das obras por diferentes regiões, com a possibilidade de ajustar o zoom e visualizar obras apenas na área selecionada.

---

### Requisitos Não Funcionais (Refinados)

1. **Login para Dados Personalizados**
    
    - O site deve exigir login para usuários que desejam salvar dados personalizados, como:
        - Exibição de obras planejadas ou futuras em regiões de interesse
        - Progresso das obras próximas à residência do usuário
2. **Marcação de Local para Necessidade de Obra**
    
    - Usuários autenticados devem poder indicar locais que necessitam de obras, preenchendo um formulário com as seguintes informações:
        - Localização geográfica (pode incluir um marcador no mapa ou endereço)
        - Foto do local (upload de imagem)
        - Tipo de obra necessária (ex: pavimentação, iluminação, drenagem, etc.)

<p align="justify">Os requisitos refinados acima foram elaborados para garantir que o sistema atenda às necessidades dos usuários de forma eficiente e eficaz. Os requisitos funcionais detalham as funcionalidades essenciais que o sistema deve oferecer, enquanto os requisitos não funcionais especificam as qualidades e características que o sistema deve possuir para proporcionar uma boa experiência ao usuário. A combinação desses requisitos assegura que o sistema seja completo, funcional e de alta qualidade.</p>

<center>Autor: Daniel Ferreira Nunes </center>

