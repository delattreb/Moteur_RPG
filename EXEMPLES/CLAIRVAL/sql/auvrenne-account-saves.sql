create table public.auvrenne_saves (
 user_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null check (jsonb_typeof(payload)='object' and coalesce(payload->>'world'='auvrenne',false) and octet_length(payload::text)<=6000000),
 version integer not null check(version>0),
 updated_at timestamptz not null default now()
);
alter table public.auvrenne_saves enable row level security;
revoke all on public.auvrenne_saves from anon, authenticated;
grant select,insert,update on public.auvrenne_saves to authenticated;
create policy auvrenne_read on public.auvrenne_saves for select to authenticated using((select auth.uid())=user_id);
create policy auvrenne_insert on public.auvrenne_saves for insert to authenticated with check((select auth.uid())=user_id);
create policy auvrenne_update on public.auvrenne_saves for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create function public.save_auvrenne(p_payload jsonb,p_expected_version integer)
returns public.auvrenne_saves language plpgsql security invoker set search_path='' as $$
declare saved public.auvrenne_saves;
begin
 if auth.uid() is null then raise exception 'authentication_required'; end if;
 if p_expected_version=0 then
  insert into public.auvrenne_saves(user_id,payload,version) values(auth.uid(),p_payload,1)
  on conflict(user_id) do nothing returning * into saved;
 else
  update public.auvrenne_saves set payload=p_payload,version=version+1,updated_at=now()
  where user_id=auth.uid() and version=p_expected_version returning * into saved;
 end if;
 if saved.user_id is null then raise exception 'save_conflict'; end if;
 return saved;
end; $$;
revoke all on function public.save_auvrenne(jsonb,integer) from public,anon;
grant execute on function public.save_auvrenne(jsonb,integer) to authenticated;
