# Mise en ligne de Clairval

## Préparation

Le workflow `Publier Clairval` est manuel : aucun push ne publie le site automatiquement et aucune release n'est créée. Il teste Auth et les campagnes avant de publier uniquement `EXEMPLES/CLAIRVAL/dist/`. Les documents MJ et les modèles du dépôt ne sont pas copiés sur le site.

1. Intégrer la branche Auth dans la branche par défaut après revue.
2. Dans le dépôt, ouvrir Settings > Pages > Build and deployment et choisir GitHub Actions.
3. Dans Actions > Publier Clairval > Run workflow, lancer la publication.
4. Attendre le succès de la tâche deploy et utiliser l'URL retournée par GitHub.

Adresse attendue sans domaine personnalisé : https://delattreb.github.io/Moteur_RPG/ (à confirmer après publication ; cette préparation n'active pas le site).

## Relier Supabase

Dans le [tableau de bord Auth](https://supabase.com/dashboard/project/rtfcqbzqoledtteirzer/auth/url-configuration), régler Site URL sur l'adresse exacte retournée par GitHub, avec le chemin du dépôt et le slash final. Ajouter cette URL exacte aux Redirect URLs. Éviter les jokers larges. Vérifier que la confirmation d'adresse du fournisseur Email est active.

L'accès au tableau de bord exige une connexion du propriétaire ; le connecteur utilisé ici n'expose pas la modification des réglages Auth.

## Vérification réelle

Ouvrir le site sans session, y compris un lien #carnet : seul l'écran de connexion doit apparaître. Créer un compte avec sa propre adresse, confirmer l'e-mail puis revenir au site. Vérifier la connexion, un rechargement et la déconnexion. Les tests automatisés utilisent un client Auth simulé ; ils ne remplacent pas ce test avec Supabase réel.

Consulter [les limites de protection](AUTH_SUPABASE.md) avant d'ajouter des données. Les sauvegardes restent dans le navigateur et ne sont pas encore synchronisées entre appareils.
