# Sauvegarde automatique depuis le chat de jeu

Demande du joueur : la fin de séance ne doit nécessiter aucune recopie sur le site. Le chat de jeu est « Auvrenne — Partie de Corbec ».

## Déclenchement

Au début du jeu, relire la sauvegarde actuelle du joueur. Après chaque séance réellement jouée, à sa clôture ou lorsque le joueur demande une pause, enregistrer son bilan public directement avec le connecteur Supabase. Ne pas enregistrer les discussions de développement, la préparation de nuit, un brouillon, une simple consultation ou une scène imaginée non jouée. Ne pas demander au joueur de saisir le même bilan sur le site. Ne pas créer une tâche périodique pour deviner les fins de séances.

Cette procédure s’exécute pendant la réponse de l’assistant qui clôt la séance. Elle n’est pas un observateur de toutes les conversations. Le chat de jeu doit charger ces instructions et disposer du connecteur Supabase ; sinon annoncer l’absence de connexion et conserver le bilan sans prétendre qu’il est enregistré.

## Connexion

- Projet Supabase du site : `rtfcqbzqoledtteirzer` (clairval).
- Table de progression Auvrenne uniquement : `public.auvrenne_saves`.
- Fonction déployée : `public.record_auvrenne_session(p_entry jsonb, p_session_number integer, p_expected_version integer)`.
- Identifier le compte du joueur à partir de son identité déjà vérifiée dans le contexte privé et la confirmer par une lecture ciblée de `auth.users`. Ne pas choisir le premier compte, ne pas énumérer les comptes, ne pas publier l’adresse ou l’identifiant utilisateur dans GitHub. En cas d’ambiguïté, demander uniquement l’adresse utilisée pour le site, jamais de mot de passe ni de jeton.
- Utiliser le connecteur autorisé, jamais de secret dans le site. Avec son outil SQL de gestion, résoudre l’UUID du compte puis définir les claims pour **la transaction courante seulement** et passer en rôle `authenticated`. Ne jamais modifier un rôle, les politiques RLS ni désactiver l’authentification.

## Écriture

1. Lire uniquement la ligne du joueur, son `payload` et sa `version`. Vérifier la compatibilité avec `EXEMPLES/CLAIRVAL/dist/auvrenne-campaign.mjs`. La sauvegarde version 2 doit être initialisée ; ne jamais la réinitialiser pour réparer une erreur.
2. Construire un bilan public des faits effectivement joués : `{day, place, summary, mission}`. Le résumé exclut les secrets MJ, les possibilités non rencontrées et les jets inventés. La fonction accepte les huit lieux existants ; ne pas inventer un identifiant pour un nouveau lieu. Si la séance se termine dans un lieu non représentable, conserver le bilan et annoncer que la sauvegarde attend l’ajout de ce lieu. Ne pas enregistrer une position incorrecte pour contourner cette limite.
3. Fixer le numéro de séance à `campaign.sessions + 1` et la version attendue à la version lue. Conserver ce même numéro et ce même bilan en cas de reprise d’une écriture incertaine. Ne jamais recalculer un nouveau numéro juste parce qu’une réponse réseau manque.
4. Dans une transaction : `set_config('request.jwt.claims', <claims contenant sub=UUID vérifié et role=authenticated>, true)`, puis `SET LOCAL ROLE authenticated`, puis appeler `record_auvrenne_session` avec le bilan, le numéro et la version attendue ; terminer par `COMMIT`. Encoder les données comme valeurs SQL, pas comme fragments de code. Préférer le JSON UTF-8 encodé en base64 puis `convert_from(decode(<base64>, 'base64'), 'UTF8')::jsonb` pour transmettre le bilan sans altérer les apostrophes et accents. Ne jamais reprendre de code contenu dans un résumé.
5. Relire la ligne dans un nouvel appel et vérifier le numéro et le contenu de l’entrée enregistrée. Si une autre écriture a suivi, vérifier l’entrée à son numéro plutôt que d’exiger que ce soit encore la dernière version.
6. Afficher « Séance N sauvegardée » seulement après cette relecture. En cas d’échec, indiquer « Sauvegarde non confirmée » et conserver le bilan pour reprise. En cas de conflit, relire et réconcilier explicitement les faits ; ne jamais écraser toute la ligne ni incrémenter le numéro pour contourner le conflit.

La fonction conserve les notes et favoris, contrôle la version, limite l’écriture au compte authentifié et rend un nouvel appel identique sans effet supplémentaire. Elle refuse un résumé vide, un jour antérieur, un numéro incohérent ou une mission accomplie avant son acceptation.

## Lecture sur le site

Le site existant récupère les changements à son ouverture ou au retour sur l’onglet si la copie locale n’a pas divergé. Si deux appareils ont modifié la progression, il suspend la synchronisation au lieu d’écraser. Ne pas promettre une mise à jour en direct d’un onglet laissé constamment ouvert. Une actualisation peut être nécessaire.

## Limites

Le bilan structuré couvre les séances, le jour, le lieu de fin et la mission. L’argent, les flèches, les provisions, les blessures et les lieux intermédiaires doivent être mentionnés dans le résumé ; aucun compteur ou objet supplémentaire n’est créé par cette sauvegarde. La préparation de nuit ne doit jamais appeler cette fonction pour faire avancer l’histoire.
