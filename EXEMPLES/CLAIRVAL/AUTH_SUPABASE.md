# Connexion Supabase — Clairval

Le site en ligne (`dist/index.html`) exige une session Supabase vérifiée par `auth.getUser()` avant de charger le jeu. Toutes les rubriques par fragment (#carte, #carnet, #personnages, #quetes, #inventaire, #univers) passent par cet écran. Une session absente, invalide ou une panne de réseau laisse le carnet fermé. Connexion, inscription avec confirmation par e-mail, renouvellement de session et déconnexion locale sont pris en charge.

Projet : `clairval`, région Paris, référence `rtfcqbzqoledtteirzer`.
[Tableau de bord](https://supabase.com/dashboard/project/rtfcqbzqoledtteirzer).

## Mise en ligne

Servir tout le dossier `dist/` en HTTPS (ou localhost pour le développement), pas en file://. Auth utilise Supabase et le module supabase-js 2.49.8 sur esm.sh ; une connexion Internet est nécessaire. La clé publiée est une clé **publishable**, utilisable dans le navigateur. Ne jamais y placer de clé secret ou service_role.

Dans Authentication > URL Configuration, régler Site URL sur l'adresse finale de Clairval et autoriser uniquement ses URL de retour nécessaires. L'hébergement final n'est pas encore défini. Dans Authentication > Providers, vérifier Email et la confirmation d'adresse ; configurer SMTP pour un usage régulier. Créer son compte depuis l'écran, suivre la confirmation reçue puis revenir se connecter. Aucun compte n'a été créé automatiquement.

## Limites de protection

Il s'agit d'une protection de navigation côté navigateur. HTML, JavaScript, illustrations et démonstration restent publics dans ce dépôt et peuvent être téléchargés directement. Le site statique ne peut pas protéger ces fichiers côté serveur. Aucun secret MJ ou document privé ne doit y être ajouté.

Aucune table métier ni sauvegarde cloud n'est créée par cette intégration. Les sauvegardes existantes restent locales ; se connecter sur un autre appareil ne les transfère pas. Avant d'ajouter des données privées à Supabase, créer des tables avec RLS et des politiques d'appartenance vérifiées pour chaque utilisateur. Un compte connecté seul ne garantit pas cette autorisation.

L'export `Clairval-site-medieval.html` généré par `node build-clairval.mjs` reste une démonstration publique hors ligne, sans Auth. Il utilise `clairval-offline-index.html`. Le build conserve l'écran Auth dans `dist/index.html`.

## Vérification

`node check-auth.mjs` contrôle l'accès sans session, le refus serveur, la panne réseau, l'accès authentifié, la perte de session, l'inscription avec confirmation et la déconnexion. `node check-clairval.mjs` et `node check-campaign.mjs` couvrent le jeu existant. Un test réel inscription / confirmation e-mail / connexion reste à effectuer avec le propriétaire après réglage de l'URL finale.
