# Sauvegarde automatique Supabase de Clairval

La synchronisation concerne le parcours libre et la projection publique de campagne (missions, inventaire, état narratif, reprise). Elle ne transfère ni la conversation ni les secrets du MJ.

## Usage

Après connexion, le site compare les copies locale et en ligne. Sur un nouvel appareil sans progression, il récupère la sauvegarde automatiquement. Un déplacement libre ou un import de campagne déclenche un envoi après 800 ms sans nouvelle modification. Au retour sur l'onglet ou du réseau, le site vérifie à nouveau la sauvegarde.

Attendre le message **Sauvegarde automatique en ligne vérifiée** ou **Synchronisation automatique vérifiée** avant de fermer l'appareil. Si l'envoi n'est pas terminé, le navigateur peut demander confirmation avant de quitter la page. La fermeture forcée ne garantit pas l'envoi ; la copie locale est conservée.

La reprise après rechargement s'appuie sur une empreinte SHA-256 de la dernière version acceptée, conservée par compte dans le navigateur. Si le suivi est absent et que deux copies non vides diffèrent, aucun choix n'est fait automatiquement.

## Conflits et commandes manuelles

Si les copies ont toutes les deux changé depuis leur version commune, le site suspend la synchronisation. Il ne fusionne pas les événements et n'écrase aucune copie automatiquement.

- **Sauvegarder en ligne** : conserver la progression de cet appareil ; un remplacement différent demande confirmation.
- **Récupérer ma sauvegarde** : conserver la copie en ligne et remplacer la locale après confirmation.
- **Récupérer mon ancien carnet local** : rattacher, après confirmation, les données de l'ancienne version au compte actuel. La synchronisation reprend ensuite.

Un choix manuel accepté réactive la synchronisation. L'export JSON permet de conserver séparément plusieurs versions de campagne. Une seule sauvegarde en ligne est conservée par compte, sans historique cloud. Il n'y a pas de surveillance permanente : la récupération se fait à l'ouverture et au retour sur l'onglet ; une écriture concurrente déclenche un conflit.

## Accès et stockage

La table `public.clairval_saves` utilise RLS : accès limité au propriétaire par `auth.uid() = user_id`. Aucun accès anonyme ni suppression via l'API. La fonction `save_clairval` est SECURITY INVOKER et vérifie atomiquement la version attendue. La taille est limitée à 6 Mo en base.

Les caches et l'empreinte de synchronisation sont séparés par compte. Les copies locales restent après déconnexion et ne sont pas chiffrées. L'édition autonome hors ligne conserve son fonctionnement local.

Le SQL de référence appliqué par la migration `clairval_account_saves` reste dans `sql/clairval-account-saves.sql` ; ne pas le réexécuter sur une base déjà migrée.

## Vérification

`node check-autosave.mjs`, `node check-cloud.mjs`, `node check-auth.mjs` et `node check-campaign.mjs`.

Tests automatisés avec réseau simulé : récupération, envoi, rechargement, reprise réseau, conflits, changements pendant l'envoi, arrêt de session et commandes manuelles. Les politiques RLS et le conflit de version ont également été testés en base lors de l'intégration manuelle. Le transfert manuel réel a été confirmé sur deux appareils.

Après publication de cette évolution, le transfert **automatique** réel reste à vérifier sur les deux appareils.
