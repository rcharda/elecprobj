-- Schéma initial ElecPro (v1)
create extension if not exists "pgcrypto";

create table if not exists utilisateurs (
  id uuid primary key,
  email text unique not null,
  role text not null check (role in ('admin','formateur','apprenant','boutique')),
  nom text not null,
  prenom text not null,
  photo_url text,
  telephone text,
  actif boolean default true,
  created_at timestamptz default now()
);

create table if not exists formations (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  description text,
  duree_standard_mois integer,
  created_at timestamptz default now()
);

create table if not exists centres (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  adresse text,
  responsable_id uuid references utilisateurs(id),
  created_at timestamptz default now()
);

create table if not exists apprenants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  id_unique text unique not null,
  nom text not null,
  prenom text not null,
  date_naissance date not null,
  lieu_naissance text not null,
  derniere_classe text,
  adresse text,
  nationalite text,
  photo_profil_url text,
  photo_cip_url text,
  contrat_url text,
  acte_naissance_url text,
  formateur_id uuid references utilisateurs(id),
  statut text default 'actif' check (statut in ('actif','suspendu','termine','restreint')),
  created_at timestamptz default now()
);

create table if not exists inscriptions (
  id uuid primary key default gen_random_uuid(),
  apprenant_id uuid not null references apprenants(id),
  formation_id uuid not null references formations(id),
  centre_id uuid references centres(id),
  date_debut date not null,
  date_fin date not null,
  duree_mois integer not null,
  cout_total numeric(10,2) not null,
  montant_paye numeric(10,2) default 0,
  solde_restant numeric(10,2) generated always as (cout_total - montant_paye) stored,
  tranche_montant numeric(10,2),
  statut_paiement text default 'a_jour' check (statut_paiement in ('a_jour','en_retard','solde')),
  prochaine_echeance date,
  valide_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists paiements (
  id uuid primary key default gen_random_uuid(),
  inscription_id uuid not null references inscriptions(id),
  apprenant_id uuid not null references apprenants(id),
  montant numeric(10,2) not null,
  mode_paiement text not null check (mode_paiement in ('fedapay','especes')),
  reference_fedapay text,
  recu_url text,
  statut text default 'valide' check (statut in ('valide','en_attente','echoue')),
  notes text,
  created_at timestamptz default now()
);

alter table utilisateurs enable row level security;
alter table apprenants enable row level security;
alter table inscriptions enable row level security;
alter table paiements enable row level security;
