# SAGA - Programa Corporativo de Segurança de IA

> **O seu escudo corporativo automatizado contra vulnerabilidades em Inteligência Artificial.**

Bem-vindo ao repositório do **Programa Corporativo de Segurança de IA (SAGA - Adversarial Attacks)**. Este projeto fornece uma arquitetura completa, do backend ao frontend, para automatizar testes de intrusão (Red Team) em modelos de Inteligência Artificial usando o framework MITRE ATLAS, pipelines de CI/CD e um Dashboard executivo.

---

## 🎯 O que este projeto faz?
Em vez de testar modelos de IA manualmente, este projeto:
1. **Ataca automaticamente** seus modelos de IA buscando falhas (Jailbreaks, Vazamento de Dados, Execução de Código).
2. **Orquestra esses ataques** todos os dias (ou a cada atualização de código) via o GitHub Actions.
3. **Mede a maturidade** de segurança da IA e exibe tudo de forma clara em um **Dashboard no navegador**.

---

## 🏗️ Arquitetura e Fluxo de Dados

A arquitetura do projeto é dividida em três pilares principais. O fluxo de dados caminha da execução dos ataques, passa pela automação e termina na visualização web.

```mermaid
graph TD
    A[Scripts Python & PyRIT\n(Ferramentas de Ataque)] -->|Gera Resultados em JSON| B(GitHub Actions\nPipeline DevOps)
    B -->|Armazena Artefatos e JSON| C[Frontend Dashboard\nNext.js + Tailwind]
    C -->|Renderiza| D((Maturidade e Findings))
```

### 1. Módulo Backend (Motor de Ataque)
* **Pilha de Tecnologia:** Python 3.11+, PyRIT, AdvBench.
* **Fluxo:** Scripts conectam-se às APIs dos modelos de IA alvo. Eles injetam prompts hostis configurados nos YAMLs do diretório `scenarios/` (baseado no framework ATLAS). Se o modelo burlar as próprias barreiras de segurança, o teste é marcado como *Falhou* (`failed`), caso contrário, *Passou* (`passed`). O resultado é exportado para um arquivo JSON estruturado.

### 2. Módulo DevOps (Automação CI/CD)
* **Pilha de Tecnologia:** GitHub Actions (Scripts `.yml`).
* **Fluxo:** Funciona como o "maestro". Pipelines são ativados via Pull Requests (`security-gates.yml`) ou diariamente durante a noite (`nightly-redteam.yml`). Eles garantem um ambiente conteinerizado para rodar os ataques em Python de forma controlada.

### 3. Módulo Frontend (Visualização e Dashboard)
* **Pilha de Tecnologia:** React, Next.js, Tailwind CSS.
* **Fluxo:** O aplicativo web lê o arquivo YAML/JSON gerado nas etapas anteriores. Com base na severidade e na quantidade de quebras de segurança, ele calcula automaticamente o fluxo da **Maturidade de Segurança**:
  * 🏆 **Elite:** Acima de 95% de sucesso contra os ataques.
  * 🟢 **Alta:** Entre 80% e 94%.
  * 🟡 **Média:** Entre 51% e 79%.
  * 🔴 **Baixa:** Igual ou Menor a 50%.
* O dashboard foi construído para ser corporativo: fundo claro, tabelas expansíveis e cores institucionais sólidas.

---

## 🚀 Como Implementar (Passo a Passo)

Para ter esta máquina de testes de IA funcionando no seu próprio ambiente local, siga a linguagem simples abaixo.

### Passo 1: Preparando o Terreno (Requisitos)
Antes de começar, certifique-se de que sua máquina possui instalados:
- **Node.js** (Versão 18+ ou superior) para o Dashboard.
- **Python** (Versão 3.11+) para as ferramentas de Red Team.
- Clone o repositório na sua máquina:
  ```bash
  git clone https://github.com/sua-org/saga-ai-security.git
  cd saga-ai-security
  ```

### Passo 2: Testando o Frontend (O Dashboard Executivo)
O Dashboard já vem com **dados mockados** (fictícios) de testes falhos e bem-sucedidos para você ver como ele se comporta antes mesmo de conectar a um motor de IA.
1. Navegue até a pasta do painel:
   ```bash
   cd frontend-dashboard
   ```
2. Instale todas as dependências do projeto web:
   ```bash
   npm install
   ```
3. Rode o painel de visualização:
   ```bash
   npm run dev
   ```
4. Abra no seu navegador o endereço: `http://localhost:3000`

### Passo 3: Configurando as Ferramentas de Teste (Backend)
Na pasta raiz do seu projeto, encontram-se as ferramentas de auditoria.
1. Crie um ambiente virtual para não bagunçar o seu computador:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Ou "venv\Scripts\activate" se estiver usando Windows
   ```
2. *(No futuro)* Instale as dependências com `pip install -r requirements.txt` dentro de pastas como `tools/llm-vuln-scanner/`.

---

## ⚙️ Como Configurar os Workflows no GitHub Actions

O mais importante deste projeto é garantir que as validações ocorram *sozinhas*. O GitHub Actions faz exatamente isso rodando nossos testes em máquinas na nuvem.

### O Que Já Existe?
Dentro da pasta `.github/workflows/`, nós temos:
* `redteam-ci.yml`: Roda ataques parciais (rápidos) sempre que um código novo é aberto num *Pull Request*.
* `nightly-redteam.yml`: Roda o arsenal **pesado** inteiro toda madrugada para não atrasar a vida dos desenvolvedores de dia.
* `security-gates.yml`: Age como uma barreira. Se a maturidade ficar muito baixa, ele proíbe o botão de "Merge" no GitHub.

### O Passo a Passo no GitHub
Para ativar na sua conta do GitHub corporativa:

1. **Suba o código para o GitHub:** 
   Seu repositório precisa estar online na plataforma. As *Actions* só funcionam por lá.
2. **Defina os Segredos (Secrets):** 
   Cenários de IA normalmente precisam de *Tokens* ou chaves de API locais (Ex.: API Keys da OpenAI, Azure, ou da própria rede interna). 
   Vá no GitHub em `Settings` > `Secrets and Variables` > `Actions` > Clique em **New repository secret**.
   - Adicione `AI_API_KEY` (Chave da sua IA alvo, se aplicável).
3. **Habilitar o Workflow:**
   Vá na aba principal de **Actions** na parte de cima do Repositório.
   Clique no botão verde: `I understand my workflows, go ahead and enable them`.
4. **Ver a Mágica Acontecer:**
   A cada vez que os seus robôs tentarem subir novas lógicas de IA num Pull Request, você verá o *Action* do Red Team girar e validar as vulnerabilidades na hora.

---

> *"Documentação é um presente para você no futuro e para toda a sua equipe. Mantenha os seus modelos de IA seguros!"*
