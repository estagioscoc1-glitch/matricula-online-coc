-- =====================================================================
--  COLÉGIO OSWALDO CRUZ — EDUCAÇÃO PROFISSIONAL
--  Banco de dados do sistema de Matrícula Online
--  Plataforma: Supabase (PostgreSQL)
--
--  COMO USAR:
--  1. Entre no painel do Supabase -> menu lateral "SQL Editor"
--  2. Clique em "New query"
--  3. Cole TODO este arquivo e clique em "Run"
--  4. Pronto. Não precisa rodar de novo.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. TABELA PRINCIPAL DE MATRÍCULAS
-- ---------------------------------------------------------------------
create table if not exists public.matriculas (
  id                uuid primary key default gen_random_uuid(),
  protocolo         text unique not null,
  criado_em         timestamptz not null default now(),
  atualizado_em     timestamptz not null default now(),

  -- ----- Dados do aluno -----
  nome              text not null,
  cpf               text not null,
  data_nascimento   date,
  estado_civil      text,
  email             text not null,
  telefone          text not null,
  whatsapp          text,
  cep               text,
  endereco          text,
  numero            text,
  bairro            text,
  cidade            text,
  estado            text,

  -- ----- Dados da matrícula -----
  curso             text not null,
  horario           text not null,

  -- ----- Documentos (caminho dentro do bucket "documentos") -----
  doc_identidade    text,
  comprovante_pix   text,

  -- ----- Controle administrativo -----
  status            text not null default 'pendente'
                    check (status in ('pendente','aprovada','rejeitada','cancelada')),
  valor_taxa        numeric(10,2) not null default 45.00,
  observacoes       text
);

comment on table public.matriculas is 'Pré-matrículas enviadas pelo site';

-- Índices para o painel administrativo ficar rápido
create index if not exists idx_matriculas_criado_em on public.matriculas (criado_em desc);
create index if not exists idx_matriculas_status    on public.matriculas (status);
create index if not exists idx_matriculas_curso     on public.matriculas (curso);
create index if not exists idx_matriculas_cpf       on public.matriculas (cpf);


-- ---------------------------------------------------------------------
-- 2. ATUALIZAR "atualizado_em" AUTOMATICAMENTE
-- ---------------------------------------------------------------------
create or replace function public.tocar_atualizado_em()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists trg_matriculas_atualizado_em on public.matriculas;
create trigger trg_matriculas_atualizado_em
  before update on public.matriculas
  for each row execute function public.tocar_atualizado_em();


-- ---------------------------------------------------------------------
-- 3. SEGURANÇA (Row Level Security)
--
--    Regra de ouro deste sistema:
--    - Visitante do site  -> SÓ PODE INSERIR uma matrícula. Não lê nada.
--    - Admin logado       -> pode ler, alterar e apagar.
--
--    Isso significa que, mesmo que alguém descubra a chave pública do
--    site, essa pessoa NÃO consegue ler os dados de nenhum aluno.
-- ---------------------------------------------------------------------
alter table public.matriculas enable row level security;

drop policy if exists "site pode inserir matricula"        on public.matriculas;
drop policy if exists "admin pode ler matriculas"           on public.matriculas;
drop policy if exists "admin pode atualizar matriculas"     on public.matriculas;
drop policy if exists "admin pode apagar matriculas"        on public.matriculas;

create policy "site pode inserir matricula"
  on public.matriculas for insert
  to anon, authenticated
  with check (true);

create policy "admin pode ler matriculas"
  on public.matriculas for select
  to authenticated
  using (true);

create policy "admin pode atualizar matriculas"
  on public.matriculas for update
  to authenticated
  using (true) with check (true);

create policy "admin pode apagar matriculas"
  on public.matriculas for delete
  to authenticated
  using (true);


-- ---------------------------------------------------------------------
-- 4. ARMAZENAMENTO DE ARQUIVOS (RG/CNH e comprovante do PIX)
--
--    Bucket PRIVADO: os arquivos não ficam acessíveis por link público.
--    O painel admin gera um link temporário (assinado) para visualizar.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documentos',
  'documentos',
  false,
  10485760,  -- 10 MB por arquivo
  array['image/jpeg','image/jpg','image/png','application/pdf']
)
on conflict (id) do update
  set public             = false,
      file_size_limit    = 10485760,
      allowed_mime_types = array['image/jpeg','image/jpg','image/png','application/pdf'];

drop policy if exists "site pode enviar documento"   on storage.objects;
drop policy if exists "admin pode ler documentos"    on storage.objects;
drop policy if exists "admin pode apagar documentos" on storage.objects;

-- Visitante pode ENVIAR arquivo, mas não pode listar nem baixar nada.
create policy "site pode enviar documento"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'documentos');

create policy "admin pode ler documentos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'documentos');

create policy "admin pode apagar documentos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'documentos');


-- ---------------------------------------------------------------------
-- 5. VISÃO RESUMIDA PARA RELATÓRIOS (opcional, usada no painel)
-- ---------------------------------------------------------------------
create or replace view public.resumo_matriculas as
select
  curso,
  horario,
  status,
  count(*) as total
from public.matriculas
group by curso, horario, status;


-- =====================================================================
--  FIM. Agora crie o usuário administrador em:
--  Authentication -> Users -> Add user -> Create new user
--  (marque "Auto Confirm User")
-- =====================================================================
