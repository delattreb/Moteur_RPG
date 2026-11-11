# Sauvegarde Supabase de Clairval

## Utilisation

La synchronisation est **manuelle** et conserve une sauvegarde par compte, avec le parcours libre et la projection publique de campagne (missions, inventaire, état narratif, reprise). Les secrets du MJ et la conversation ne sont pas synchronisés.

- Sur l'appareil où se trouve la progression : cliquer **Sauvegarder en ligne** et attendre « Sauvegarde en ligne vérifiée ».
- Sur un autre appareil : se connecter au même compte et cliquer **Récupérer ma sauvegarde**. Une confirmation précède le remplacement de la progression locale.
- Après la première mise à jour, cliquer **Récupérer mon ancien carnet local** si la progression venait de l'ancienne version du site, puis la sauvegarder en ligne. Cet import demande confirmation et ne supprime pas l'ancienne copie.
- Conserver l'export JSON de campagne si l'on veut garder plusieurs versions. Une seule version en ligne est disponible par compte ; il n'y a pas encore d'historique ni de fusion automatique.

Les boutons demandent confirmation quand les deux copies diffèrent. Le serveur refuse une écriture si un autre appareil a enregistré entre la lecture et l'envoi. Le refus ou une panne réseau ne remplace pas la progression locale. Ne pas quitter l'appareil avant le message de vérification.

## Accès et stockage

La table `public.clairval_saves` possède RLS : lecture, insertion et mise à jour limitées au propriétaire par `auth.uid() = user_id`. Aucun accès anonyme ni suppression via l'API. La fonction `save_clairval` est SECURITY INVOKER, reçoit une version attendue et effectue une écriture atomique. Les données sont limitées à 6 Mo en base.

Les caches locaux de l'édition en ligne sont séparés par identifiant de compte. Le navigateur garde ses copies après déconnexion : utiliser un appareil de confiance ou effacer ses données sur un appareil partagé. Cette séparation ne constitue pas un chiffrement du stockage local. L'édition autonome hors ligne conserve ses clés historiques.

Le SQL de référence appliqué via la migration Supabase `clairval_account_saves` est conservé dans `sql/clairval-account-saves.sql`. Il ne doit pas être réexécuté sur une base où cette migration est déjà présente.

## Vérification

`node check-cloud.mjs`, `node check-auth.mjs` et `node check-campaign.mjs`.
Les tests JavaScript simulent le réseau ; les tests SQL ont également exercé les rôles authenticated/anon, deux comptes fictifs, le refus des accès croisés et le conflit de version dans une transaction annulée. Aucun compte fictif ni sauvegarde de test n'est conservé.

Après déploiement, vérifier un transfert réel entre deux navigateurs avec le même compte.
