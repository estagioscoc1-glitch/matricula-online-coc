/* =====================================================================
   CONFIGURAÇÃO DO SISTEMA — COLÉGIO OSWALDO CRUZ
   ---------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR.
   Leia o arquivo LEIA-ME.md para o passo a passo com imagens.
   ===================================================================== */

window.CONFIG = {

  /* ------------------------------------------------------------------
     1) CHAVES DO BANCO DE DADOS (Supabase)
     Onde achar: painel do Supabase -> Settings -> API
        - "Project URL"    -> cole em SUPABASE_URL
        - "anon public"    -> cole em SUPABASE_ANON_KEY
     Enquanto estiver "COLE_AQUI", o site funciona em MODO DEMONSTRAÇÃO
     (nada é salvo, serve só para você ver o visual).
     ------------------------------------------------------------------ */
  SUPABASE_URL:      'https://lnmxkfmbohctvqlfpbmt.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_RLPSR2Z1z2AD2Tbpy23leA_IJqLkLIm',


  /* ------------------------------------------------------------------
     2) DADOS DA INSTITUIÇÃO
     ------------------------------------------------------------------ */
  ESCOLA: {
    nome:      'COLÉGIO OSWALDO CRUZ',
    subtitulo: 'Educação Profissional',
    razao:     'Colégio Oswaldo Cruz Educação Profissional Ltda',
    cnpj:      '53.753.608/0001-53',
    // Use apenas números — é o que será copiado como chave PIX
    chavePix:  '53753608000153',
    // Nome que aparece no QR Code do PIX. Sem acento, MÁXIMO 25 letras.
    nomePix:   'COLEGIO OSWALDO CRUZ',
    // ATENÇÃO: cidade da conta bancária, sem acento, máx. 15 letras.
    cidadePix: 'GOIANIA',
    // WhatsApp da secretaria (só números, com 55 na frente).
    // Deixe '' para desativar o botão de WhatsApp.
    whatsapp:  '',
    logo:      '' // opcional: 'logo.png' ou uma URL de imagem
  },


  /* ------------------------------------------------------------------
     3) VALOR DA TAXA DE MATRÍCULA
     ------------------------------------------------------------------ */
  TAXA_MATRICULA: 45.00,


  /* ------------------------------------------------------------------
     4) CURSOS E HORÁRIOS
     Para adicionar/remover cursos, edite a lista abaixo.
     'horarios' aceita: 'manha', 'tarde', 'noite', 'sabado'
     ------------------------------------------------------------------ */
  CURSOS: [
    {
      id: 'tec-enfermagem',
      nome: 'Técnico em Enfermagem',
      tipo: 'Curso Técnico',
      duracao: '18 meses',
      icone: 'M12 2a3 3 0 0 0-3 3H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3a3 3 0 0 0-3-3Zm-1.5 9h3v2.5H16v3h-2.5V19h-3v-2.5H8v-3h2.5V11Z',
      horarios: ['manha', 'tarde', 'noite', 'sabado']
    },
    {
      id: 'tec-radiologia',
      nome: 'Técnico em Radiologia',
      tipo: 'Curso Técnico',
      duracao: '18 meses',
      icone: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.5a6.5 6.5 0 0 1 6.5 6.5H12V5.5Zm0 13A6.5 6.5 0 0 1 5.5 12H12v6.5Z',
      horarios: ['noite']
    },
    {
      id: 'tec-seguranca',
      nome: 'Técnico em Segurança do Trabalho',
      tipo: 'Curso Técnico',
      duracao: '18 meses',
      icone: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 5.5c1.9 0 3.5 1 3.5 2.2V17h-7v-1.3c0-1.2 1.6-2.2 3.5-2.2Z',
      horarios: ['noite']
    },
    {
      id: 'esp-instrumentacao',
      nome: 'Especialização em Instrumentação Cirúrgica',
      tipo: 'Especialização',
      duracao: '6 meses',
      icone: 'M14.5 2 22 9.5 19.5 12 12 4.5 14.5 2ZM10.6 5.9l7.5 7.5-8.2 8.2a3 3 0 0 1-4.2-4.2l4.9-4.9-1.4-1.4-4.9 4.9a5 5 0 0 0 7 7l8.2-8.2',
      horarios: ['noite']
    },
    {
      id: 'esp-enf-trabalho',
      nome: 'Especialização em Enfermagem do Trabalho',
      tipo: 'Especialização',
      duracao: '6 meses',
      icone: 'M9 2h6v2h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4V2Zm1.5 7v2.5H8v3h2.5V17h3v-2.5H16v-3h-2.5V9h-3Z',
      horarios: ['noite']
    },
    {
      id: 'reciclagem-ead',
      nome: 'Reciclagem em Enfermagem (EAD)',
      tipo: 'Atualização • EAD',
      duracao: '2 meses',
      icone: 'M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-6v2h3v2H7v-2h3v-2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2 3v7h12V7H6Z',
      horarios: ['noite']
    }
  ],

  HORARIOS: {
    manha:  { nome: 'Manhã',   faixa: '07h30 — 11h00' },
    tarde:  { nome: 'Tarde',   faixa: '13h30 — 17h00' },
    noite:  { nome: 'Noite',   faixa: '18h50 — 21h50' },
    sabado: { nome: 'Sábado',  faixa: '08h00 — 17h00' }
  }
};
