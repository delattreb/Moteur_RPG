-- Run with the authorized player's request.jwt.claims already set.
-- Requires an initialized v2 Auvrenne save with a proposed mission.
-- All test writes are rolled back. Do not substitute real played facts here.
begin;
set local role authenticated;
do $$
declare
 b public.auvrenne_saves; a public.auvrenne_saves; retry public.auvrenne_saves;
 e jsonb; n integer;
begin
 if auth.uid() is null then raise exception 'Test needs authorized user claims'; end if;
 select * into strict b from public.auvrenne_saves where user_id=auth.uid();
 if b.payload#>>'{campaign,mission}' is distinct from 'proposed' then raise exception 'Test requires proposed mission'; end if;
 n=(b.payload#>>'{campaign,sessions}')::integer+1;
 e=jsonb_build_object('day',(b.payload#>>'{campaign,day}')::integer,
   'place',b.payload->'journey'->>-1,
   'summary',E'\n TEST ONLY - rolled back \n',
   'mission','proposed');
 a=public.record_auvrenne_session(e,n,b.version);
 if a.version<>b.version+1 or a.payload#>>array['campaign','log',(n-1)::text,'summary'] is distinct from 'TEST ONLY - rolled back' then raise exception 'append_failed'; end if;
 if a.payload->'notes' is distinct from b.payload->'notes' or a.payload->'bookmarks' is distinct from b.payload->'bookmarks' then raise exception 'personal_data_changed'; end if;
 retry=public.record_auvrenne_session(e,n,b.version);
 if retry is distinct from a then raise exception 'duplicate_failed'; end if;
 begin
  perform public.record_auvrenne_session(jsonb_set(e,'{summary}','"different"'),n,a.version);
  raise exception 'conflict_not_detected';
 exception when others then if sqlerrm<>'session_conflict' then raise; end if; end;
 begin
  perform public.record_auvrenne_session(e,n+1,b.version);
  raise exception 'stale_write_not_detected';
 exception when others then if sqlerrm<>'save_conflict' then raise; end if; end;
 begin
  perform public.record_auvrenne_session(jsonb_set(e,'{summary}',to_jsonb(E'\n\t '::text)),n+1,a.version);
  raise exception 'blank_summary_accepted';
 exception when others then if sqlerrm<>'invalid_session' then raise; end if; end;
 begin
  perform public.record_auvrenne_session(jsonb_set(e,'{mission}','"completed"'),n+1,a.version);
  raise exception 'mission_validation_failed';
 exception when others then if sqlerrm<>'mission_not_accepted' then raise; end if; end;
end $$;
rollback;
