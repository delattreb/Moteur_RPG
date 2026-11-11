# Auvrenne — Le passage des vivants

Carnet préparatoire public pour Corbec Le Varn : royaume médiéval réaliste, printemps, guerre des provinces et appel d’Alix. La partie n’a pas commencé ; aucun déplacement, jet, engagement ni dépense n’est créé par la navigation.

## Ouvrir le site

Après publication, [Auvrenne](https://delattreb.github.io/Moteur_RPG/) est l’entrée principale. Le même compte Supabase est conservé. La démonstration [Clairval](https://delattreb.github.io/Moteur_RPG/clairval.html) reste accessible avec sa sauvegarde existante.

L’édition propose carnet, carte consultable avec agrandissement et fiches des lieux, Corbec, relation avec Alix, proposition de mission et lore du royaume. Le portrait est une illustration générée du personnage ; il n’ajoute pas de faits de partie.

Les noms secondaires, distances et géographie sont issus du [cadre public préparé](CADRE_PUBLIC.md). Les lieux connus de mémoire ou de nom ne sont pas marqués comme visités. Les informations actuelles inconnues restent inconnues.

## Sauvegardes séparées

Auvrenne utilise `auvrenne_saves`, `save_auvrenne`, `auvrenne.journal.v1.<user-id>` et `auvrenne.sync.<user-id>`. Clairval conserve ses table, fonction et clés. Aucune sauvegarde Clairval n’est migrée ou écrasée.

À ce stade, les notes personnelles et repères favoris d’Auvrenne sont synchronisés. Le journal de déplacements est vide et verrouillé ; la mission reste non acceptée. Une vraie projection des faits joués sera ajoutée lors d’une étape distincte, après le début demandé par le joueur.

La table Auvrenne utilise RLS et une fonction SECURITY INVOKER à contrôle de version. Aucun accès anonyme aux sauvegardes.

## Sources et vérification

## Charte restaurée

À la demande du joueur, la charte froide est remplacée par le style médiéval chaud de Clairval : décor, bois, parchemin doré, menus à miniatures, portraits et fiches de personnages. Une besace et une rubrique Inventaire rendent de nouveau les objets consultables (dague, arc court, mule, bagage léger). Le scénario, les connaissances initiales, les quantités inconnues et les sauvegardes sont conservés.

Les fichiers d’application sont dans `../CLAIRVAL/dist/auvrenne-*`. Le modèle HTML principal est `../CLAIRVAL/auvrenne-index.html`. Le build conserve aussi `clairval.html` et l’export autonome Clairval.

`node check-auvrenne.mjs`, `node check-autosave.mjs`, `node check-cloud.mjs`, `node check-auth.mjs`, `node check-campaign.mjs`. Les vérifications s’exécutent depuis `EXEMPLES/CLAIRVAL`.

La préparation MJ privée reste hors du dépôt et des ressources du site. Le dossier public ne contient ni initiatives secrètes ni résultats futurs.
