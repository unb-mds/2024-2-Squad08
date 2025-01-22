<p align="justify"> No projeto **MonitoraBSB**, utilizaremos a **API Obras.gov** como uma ferramenta central para acessar dados abertos sobre os investimentos federais em infraestrutura. Essa API é essencial para o acompanhamento e monitoramento de projetos de infraestrutura, permitindo uma análise detalhada e transparente dos investimentos realizados.</p>

---

## **Sobre o ObrasGov.br**

<p align="justify"> O **ObrasGov.br** é uma plataforma criada para melhorar a governança dos investimentos em infraestrutura do Governo Federal. Ela permite o acompanhamento da execução de projetos de infraestrutura, reunindo informações sobre geolocalização, execução física e financeira, além de viabilizar a integração com outros sistemas de fiscalização e controle.</p>

<p align="justify"> Outros entes federativos, como estados, municípios e o Distrito Federal, também podem optar por cadastrar seus investimentos na plataforma, fortalecendo a transparência e otimizando o acesso dos cidadãos às informações sobre o uso de recursos públicos.</p>

---

## **Por que usar os Dados Abertos do ObrasGov.br?**

A disponibilização de dados abertos pelo ObrasGov.br oferece diversas vantagens, como:

- **Transparência:** Acesso a informações detalhadas e atualizadas sobre projetos de infraestrutura.
- **Controle social:** Viabiliza a fiscalização do uso de recursos públicos pela sociedade.
- **Inovação:** Incentiva o desenvolvimento de pesquisas e soluções tecnológicas com base nos dados disponibilizados.
- **Integração:** Permite que os dados sejam utilizados em sistemas complementares para otimizar processos de fiscalização e controle.

---

## **Dados Disponíveis na API Obras.gov**

A API oferece acesso a informações essenciais, como:

1. **Projetos de investimentos em infraestrutura:** Dados detalhados sobre cada projeto.
2. **Georreferenciamento:** Localização geográfica dos investimentos.
3. **Execução física:** Monitoramento do progresso físico dos projetos.
4. **Execução financeira:** Dados sobre a aplicação dos recursos financeiros.

---

## **Como Utilizar a API Obras.gov**

<p align="justify"> A API é de acesso público e retorna informações no formato JSON. As consultas podem ser realizadas por meio de requisições **GET**, utilizando URLs específicas com parâmetros para filtragem e paginação.</p>

**Exemplo de Endereço Base da API:**
```
https://api-obrasgov.dth.api.gov.br/obrasgov/api
```

#### Exemplos de Consultas:
1. Buscar um projeto de investimento específico:
```
https://api-obrasgov.dth.api.gov.br/obrasgov/api/projeto-investimento?idUnico=01.52-52&page=0&size=10
```

2. Consultar a execução física de um projeto:
```
https://api-obrasgov.dth.api.gov.br/obrasgov/api/execucao-fisica?idUnico=01.52-52&page=0&size=10
```

## **Parâmetros Comuns:**
- **idUnico:** Identificador único do projeto de investimento.
- **page:** Número da página para paginação.
- **size:** Quantidade de itens por página.

Para informações detalhadas sobre os métodos disponíveis e a estrutura de dados, consulte a [documentação oficial da API](https://www.gov.br/transferegov/pt-br/obrasgov/sobre).

<center>Autora: Beatriz Lins</center>

