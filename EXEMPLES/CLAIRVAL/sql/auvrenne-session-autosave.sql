-- Append one actually played session. No browser secret or new access role.
create or replace function public.record_auvrenne_session(
 p_entry jsonb, p_session_number integer, p_expected_version integer
) returns public.auvrenne_saves
language plpgsql security invoker set search_path = '' as $$
declare
 saved public.auvrenne_saves;
 c jsonb; entries jsonb; journey jsonb; entry jsonb;
 total integer; day_number integer; summary_text text;
begin
 if auth.uid() is null then raise exception 'authentication_required'; end if;
 if jsonb_typeof(p_entry) is distinct from 'object' then raise exception 'invalid_session'; end if;
 if (select count(*) from jsonb_object_keys(p_entry))<>4
    or not (p_entry ?& array['day','place','summary','mission'])
    or jsonb_typeof(p_entry->'day') is distinct from 'number'
    or (p_entry->>'day') !~ '^[0-9]+$'
    or jsonb_typeof(p_entry->'summary') is distinct from 'string'
    or jsonb_typeof(p_entry->'place') is distinct from 'string'
    or jsonb_typeof(p_entry->'mission') is distinct from 'string'
    or p_session_number is null or p_session_number<1 or p_session_number>1000
    or p_expected_version is null or p_expected_version<1 then raise exception 'invalid_session'; end if;
 summary_text=regexp_replace(p_entry->>'summary','^\s+|\s+$','','g');
 if (p_entry->>'day')::numeric not between 1 and 100000
    or length(summary_text)=0 or length(p_entry->>'summary')>4000
    or p_entry->>'place' not in ('valcroix','lande','ormeval','pont','gue','ordan','rochebrune','mareuil')
    or p_entry->>'mission' not in ('proposed','accepted','completed','declined') then raise exception 'invalid_session'; end if;
 day_number=(p_entry->>'day')::integer;
 entry=jsonb_set(p_entry,'{summary}',to_jsonb(summary_text));
 select * into saved from public.auvrenne_saves where user_id=auth.uid() for update;
 if not found then raise exception 'save_not_found'; end if;
 if saved.payload->>'world' is distinct from 'auvrenne' or saved.payload->>'version' is distinct from '2'
    or jsonb_typeof(saved.payload->'campaign') is distinct from 'object'
    or jsonb_typeof(saved.payload->'journey') is distinct from 'array' then raise exception 'initialize_campaign_first'; end if;
 c=saved.payload->'campaign'; entries=c->'log'; journey=saved.payload->'journey';
 if jsonb_typeof(entries) is distinct from 'array' then raise exception 'invalid_saved_state'; end if;
 total=jsonb_array_length(entries);
 if c->>'sessions' is distinct from total::text
    or c->>'day' is null or c->>'day' !~ '^[0-9]+$'
    or c->>'mission' is null or c->>'mission' not in ('proposed','accepted','completed','declined')
    or jsonb_array_length(journey)=0 or journey->>0 is distinct from 'valcroix' then raise exception 'invalid_saved_state'; end if;
 -- Same ordinal and same public content: a retry, not a second session.
 if p_session_number<=total then
  if entries->(p_session_number-1)=entry then return saved; end if;
  raise exception 'session_conflict';
 end if;
 if saved.version<>p_expected_version then raise exception 'save_conflict'; end if;
 if p_session_number<>total+1 then raise exception 'session_out_of_order'; end if;
 if day_number<(c->>'day')::numeric then raise exception 'day_regression'; end if;
 if entry->>'mission'='completed' and c->>'mission' not in ('accepted','completed') then raise exception 'mission_not_accepted'; end if;
 if journey->>(jsonb_array_length(journey)-1) is distinct from entry->>'place' then
  journey=journey || jsonb_build_array(entry->>'place');
 end if;
 c=jsonb_build_object('day',day_number,'sessions',total+1,'mission',entry->>'mission','log',entries||jsonb_build_array(entry));
 update public.auvrenne_saves
 set payload=jsonb_set(jsonb_set(payload,'{campaign}',c),'{journey}',journey),version=version+1,updated_at=now()
 where user_id=auth.uid() and version=p_expected_version returning * into saved;
 if not found then raise exception 'save_conflict'; end if;
 return saved;
end; $$;
revoke all on function public.record_auvrenne_session(jsonb,integer,integer) from public,anon;
grant execute on function public.record_auvrenne_session(jsonb,integer,integer) to authenticated;
