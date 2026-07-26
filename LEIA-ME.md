# Matrícula Online — Colégio Oswaldo Cruz

Sistema completo de pré-matrícula com banco de dados e painel administrativo.

**Tudo funciona sem servidor e sem programação.** Você só precisa criar uma conta gratuita no Supabase (o banco de dados) e colar 2 chaves em um arquivo.

---

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | A página de matrícula (o que o aluno vê) |
| `admin.html` | O painel da secretaria, com login |
| `config.js` | **O único arquivo que você edita.** Chaves, cursos, PIX, WhatsApp |
| `styles.css` | Aparência (azul-marinho + dourado) |
| `banco-de-dados.sql` | Script que cria o banco. Roda uma vez só |

---

## Passo 1 — Criar o banco de dados (10 minutos)

1. Acesse **https://supabase.com** e clique em **Start your project**. Entre com sua conta Google.
2. Clique em **New project**.
   - **Name:** `colegio-oswaldo-cruz`
   - **Database Password:** clique em *Generate a password* e **guarde essa senha** num lugar seguro
   - **Region:** `South America (São Paulo)`
3. Clique em **Create new project** e espere uns 2 minutos.
4. No menu da esquerda, abra **SQL Editor** → **New query**.
5. Abra o arquivo `banco-de-dados.sql`, copie **tudo** e cole na tela.
6. Clique em **Run**. Deve aparecer *Success*.

Pronto — as tabelas, o local de armazenamento dos documentos e as regras de segurança já estão criados.

---

## Passo 2 — Pegar as duas chaves

1. No Supabase, vá em **Settings** (engrenagem) → **API**.
2. Copie os dois valores:
   - **Project URL** — algo como `https://abcdefgh.supabase.co`
   - **anon public** — um texto bem comprido começando com `eyJ...`
3. Abra o arquivo `config.js` no Bloco de Notas e cole nos lugares indicados:

```js
SUPABASE_URL:      'https://abcdefgh.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGciOi.....',
```

> Pode colar sem medo: essa chave é **pública por natureza**. Pelas regras que o script criou, quem tem essa chave só consegue **enviar** uma matrícula — nunca ler os dados de nenhum aluno.

---

## Passo 3 — Criar o login da secretaria

1. No Supabase: **Authentication** → **Users** → **Add user** → **Create new user**.
2. Preencha o e-mail e a senha da secretaria.
3. **Marque a opção “Auto Confirm User”** e confirme.

Depois, feche a porta para estranhos:

4. Vá em **Authentication** → **Sign In / Providers** → **Email**.
5. **Desligue** a opção **“Allow new users to sign up”** e salve.

Agora só as contas que você criar manualmente conseguem entrar no painel.

---

## Passo 4 — Publicar o site

### Opção A — Replit (você já usa)

1. Abra seu Repl e **apague os arquivos antigos**.
2. Arraste `index.html`, `admin.html`, `config.js`, `styles.css` para dentro do Repl.
3. Clique em **Deploy** → escolha **Static** → **Deploy**.

O Replit entrega o endereço final (ex.: `https://matricula-coc.replit.app`).

### Opção B — Netlify (mais simples ainda, e gratuito)

1. Coloque os 4 arquivos numa pasta.
2. Acesse **https://app.netlify.com/drop** e **arraste a pasta** para a página.
3. Pronto. Site no ar em 20 segundos, com HTTPS.

Em qualquer uma das opções:

- Página do aluno: `seusite.com/`
- Painel da secretaria: `seusite.com/admin.html`

---

## Passo 5 — Ajustes finais no `config.js`

```js
ESCOLA: {
  cidadePix: 'SAO PAULO',   // cidade da conta bancária (sem acento, máx. 15 letras)
  whatsapp:  '5511999999999', // WhatsApp da secretaria, com 55 na frente
  logo:      'logo.png'     // envie a imagem junto e escreva o nome aqui
},
TAXA_MATRICULA: 45.00,
```

> **Importante:** confira o campo `cidadePix`. Ele precisa ser a cidade cadastrada na conta bancária que recebe o PIX, senão alguns bancos recusam o QR Code. O botão “COPIAR CHAVE PIX” funciona de qualquer jeito.

Para **adicionar ou tirar cursos**, edite a lista `CURSOS` no mesmo arquivo. A regra de horários é o campo `horarios`:

- `['manha','tarde','noite','sabado']` → mostra os 4 turnos (hoje só o Técnico em Enfermagem)
- `['noite']` → mostra só a noite (todos os outros)

---

## Como a secretaria usa o painel

1. Entra em `seusite.com/admin.html` com e-mail e senha.
2. Vê o total de matrículas, quantas estão pendentes, aprovadas e rejeitadas.
3. Busca por nome, CPF, e-mail ou protocolo; filtra por curso e por status.
4. Clica em **Ver** para abrir a ficha completa, o RG/CNH e o comprovante do PIX.
5. Clica em **Aprovar** ou **Rejeitar**, e pode deixar uma observação interna.
6. **Exportar CSV** baixa a planilha para abrir no Excel.

---

## Segurança dos dados (resumo)

- Todo o tráfego é criptografado (HTTPS).
- Os documentos ficam num armazenamento **privado**. Nem com o link direto alguém de fora consegue abrir — o painel gera um link temporário que expira em 1 hora.
- Visitante do site: **só pode inserir** uma matrícula. Não lê, não altera, não apaga nada.
- Só usuários logados (criados por você) leem e alteram os dados.
- Aceita apenas JPG, PNG e PDF, com no máximo 10 MB por arquivo.
- Senhas ficam guardadas com criptografia pelo próprio Supabase — nem você consegue vê-las.

**Cuidados que dependem de você:**

- Nunca publique a chave `service_role` do Supabase (a que aparece marcada como *secret*). Use somente a `anon public`.
- Use uma senha forte e diferente para cada pessoa da secretaria.
- Ative a verificação em duas etapas na sua conta do Supabase.
- Como você guarda CPF, documentos e endereço, isso é tratamento de dados pessoais sob a **LGPD**. Vale ter na página um aviso de privacidade dizendo por que os dados são coletados e por quanto tempo ficam guardados. (Isto é uma orientação geral, não uma consultoria jurídica.)

---

## Custos

O plano gratuito do Supabase cobre 500 MB de banco e 1 GB de arquivos — dá tranquilamente para alguns milhares de matrículas. Replit e Netlify hospedam sites estáticos de graça.

---

## Problemas comuns

| Sintoma | Solução |
|---|---|
| Aparece a tarja “Modo demonstração” | As chaves em `config.js` não foram coladas, ou foram coladas erradas |
| “E-mail ou senha incorretos” | O usuário não foi criado, ou não foi marcado *Auto Confirm User* |
| Documento não abre no painel | O script SQL não foi executado por inteiro — rode de novo |
| Nada é salvo ao finalizar | Abra o site, tecle **F12** → aba *Console* e veja a mensagem de erro |
