# Moteur RPG

**Version du dépôt : 1.9.0** — [Première release : 1.3.0](https://github.com/delattreb/Moteur_RPG/releases/tag/1.3.0)

Moteur de jeu de rôle narratif pour un joueur et un maître du jeu humain ou assistant. Il fournit les règles et les modèles pour créer un univers, préparer une campagne et faire évoluer l'histoire selon les décisions du joueur. Cette édition est un référentiel utilisable en conversation ; elle comprend une démonstration statique du site Clairval.

## Une campagne de trente jours

| Paramètre | Format retenu |
| --- | --- |
| Durée de l'histoire | 30 jours fictifs |
| Calendrier visé | 30 jours réels de jeu |
| Sessions | 60, à raison de deux par jour |
| Durée d'une session | 10 à 15 minutes |
| Temps quotidien | Environ 20 à 30 minutes |
| En cas d'absence | Pause de l'histoire et décalage du calendrier réel |

Les deux sessions d'une journée réelle couvrent ensemble une journée fictive. Le scénario prépare une progression jusqu'au dénouement et à l'épilogue, avec une échéance au jour 30. Les décisions restent ouvertes : une réussite rapide est conservée, les refus sont respectés et aucune scène n'est ajoutée pour remplir artificiellement la durée.

Voir [le cadre de campagne](CAMPAGNE_30_JOURS.md).

## Une boucle de jeu qui avance

**Intention → résolution → conséquences → réaction du monde → prochaine décision.**

- Une démarche comprend les gestes et questions ordinaires nécessaires, sans validation à chaque étape.
- Les preuves débouchent sur des actions et des issues concrètes, au lieu d'une chaîne d'interrogatoires.
- Les missions aboutissent avec un bénéfice, un coût ou une conséquence perceptible.
- Les PNJ poursuivent leurs objectifs selon les événements et le temps fictif.
- Les choix de réponse sont numérotés, action libre comprise ; un numéro seul suffit pour répondre.
- Le jeu alterne pression, exploration, relations et respiration, sans combat ni cliffhanger obligatoire.

Le mode narratif est disponible, ainsi qu'une option de dés à choisir explicitement avant usage. Voir [les règles](REGLES.md).

## Créer l'univers et son identité visuelle

Le [questionnaire progressif](QUESTIONNAIRE_UNIVERS.md) définit l'univers une question à la fois : ambiance, échelle, magie ou technologie, société, pouvoirs, géographie, place du personnage, connaissances initiales et direction graphique.

Le [modèle d'univers](MODELES/UNIVERS.md) distingue les choix validés, le lore public et les éléments privés du MJ. Palette, typographies, symboles et illustrations sont adaptés à l'univers créé.

## Lore et carte sur le site

La [spécification du site](SITE_LORE_ET_CARTE.md) prévoit :

- Un lore consultable : présentation du monde, histoire connue, cultures, factions et glossaire.
- Une carte stylisée avec zoom, déplacement, position actuelle, trajets et fiches de lieux.
- Une découverte progressive au fil des déplacements accomplis et des informations réellement obtenues.
- Une distinction entre lieux inconnus, connus de nom et visités.
- Une géographie stable et des ressources publiques excluant les secrets du MJ.

La version 1.3.0 a posé cette spécification. Le prototype Clairval implémente désormais la carte et l’import des déplacements publics ; l’adaptation à un autre univers, le zoom et la synchronisation automatique restent à réaliser.

## Carnet personnel illustré

La fiche du personnage prend la forme d'un carnet personnel : identité et portrait, état actuel, savoir-faire, possessions et engagements. Les pages comportent des annotations et des images stylisées selon l'univers, avec une continuité de visage, de tenue et d'objets. Le texte reste accessible indépendamment des illustrations.

Voir [la spécification du carnet](CARNET_PERSONNAGE.md) et [le modèle public vierge](MODELES/CARNET_PERSONNAGE.md). Le prototype Clairval implémente la reprise, les missions, les possessions et l’état narratif ; l’identité complète et les savoir-faire restent à intégrer. Ses contenus de campagne suivent les faits publics importés.

## PNJ et relations

Une galerie de portraits ouvre les pages individuelles du carnet : identité connue, rencontres marquantes, relation observable, affaires en cours et dernière nouvelle. Les personnes seulement évoquées restent « connues de nom », sans portrait inventé. Les relations sont décrites par les faits, sans jauge de loyauté secrète.

Voir [PNJ et relations](PNJ_ET_RELATIONS.md) et [le modèle public de PNJ](MODELES/PNJ_PUBLIC.md). La galerie illustrée existe dans la démonstration ; le mode campagne affiche les rencontres importées. Les fiches de relation dynamiques restent à intégrer.

## Missions et continuité

Les [missions du carnet](MISSIONS_ET_GUIDAGE.md) sont réparties entre En cours, Possibilités et Historique. Le guidage léger présente les faits et une suggestion discrète si nécessaire, sans dévoiler de solution. Un [modèle public](MODELES/MISSION_PUBLIQUE.md) décrit chaque mission.

La [sauvegarde et la reprise](SAUVEGARDE_ET_REPRISE.md) prévoient un enregistrement automatique vérifié à la fin d'une session ou lors d'une interruption, avec état MJ privé, projection publique et résumé dans le carnet. Une réparation ne rejoue ni ne recompte les événements. **La sauvegarde privée complète et son déclenchement automatique restent à implémenter.** Le prototype implémente les pages de mission, la projection publique locale et son export / import manuel.

## Construire un scénario adaptable

Le [guide de construction](CONSTRUIRE_UNE_CAMPAGNE.md) organise :

- Un conflit central, une échéance et plusieurs issues possibles.
- Quatre à six personnages moteurs aux objectifs distincts.
- Deux intrigues secondaires facultatives.
- Des décisions dont les effets persistent dans les situations suivantes.
- Une préparation détaillée des deux prochaines sessions, révisée après le jeu.
- Un point de contrôle tous les cinq jours fictifs.

Utiliser le [modèle de campagne](MODELES/CAMPAGNE.md) et le [modèle de situation](MODELES/SITUATION.md). L'exemple privé [Le passage des Hautes-Eaux](EXEMPLES/CAMPAGNE_TEST.md) présente cinq acteurs et deux sessions conditionnelles préparées. Il reste à jouer et ne fixe pas l'univers par défaut du moteur.

## Création et reprise

Le [parcours de campagne](PARCOURS_CAMPAGNE.md) distingue la maintenance du moteur, la création d'une nouvelle campagne et sa reprise. Chaque nouvelle campagne reçoit son questionnaire ; une reprise retrouve l'univers validé et les réponses existantes. La validation précède la préparation du scénario et du site. Le début du jeu reste une demande distincte.

## Commencer

1. Lire [les règles](REGLES.md) et [le démarrage](DEMARRER.md).
2. Créer l'univers avec le [questionnaire](QUESTIONNAIRE_UNIVERS.md), en réutilisant les réponses déjà données.
3. Valider le cadre et remplir les modèles d'univers et de campagne.
4. Préparer les deux premières sessions avec le guide de construction.
5. Pour un assistant, fournir les fichiers et copier [les instructions MJ](INSTRUCTIONS_MJ.md) dans le projet.
6. Commencer la première session sur demande du joueur.

Les modèles et notes d'exemple destinés au MJ restent privés. Seuls les contenus publics autorisés sont destinés au futur site.

## Évolutions

| Version | Évolution |
| --- | --- |
| 1.9.0 | Connexion Supabase, sauvegardes par compte et synchronisation automatique entre appareils |
| 1.8.0 | Carte explorable, campagne publique, missions, inventaire, état narratif et export / reprise |
| 1.7.0 | Démonstration médiévale Clairval, interactions et distribution WebP allégée |
| 1.6.0 | Missions à guidage léger et sauvegarde automatique : spécifications |
| 1.5.0 | Galerie de PNJ et relations observables : spécification et modèle |
| 1.4.0 | Carnet personnel illustré : spécification et modèle public |
| 1.3.1 | Parcours réutilisable : questionnaire interrompu, validation et reprise |
| 1.3.0 | Construction de campagne, univers, lore et spécification de carte progressive |
| 1.2.0 | 60 sessions sur trente jours fictifs |
| 1.1.0 | Démarches complètes, missions qui aboutissent et choix numérotés |
| 1.0.0 | Première base propre du moteur narratif |

Voir [l'historique détaillé](CHANGELOG.md) et [la release 1.3.0](https://github.com/delattreb/Moteur_RPG/releases/tag/1.3.0).

## État de validation

Un essai conversationnel court a permis d'améliorer le rythme. Les fichiers, les liens internes et le découpage des soixante sessions ont été contrôlés. Le nouveau scénario d'exemple et une campagne complète restent à éprouver en partie.

Le dépôt contient le moteur générique, des modèles vierges et des exemples de préparation. Il ne contient aucune sauvegarde de partie, ancienne campagne ou donnée personnelle. La continuité entre conversations n'est pas automatique.

## Site médiéval Clairval

Carte sur parchemin, menus illustrés, portraits et fiches consultables : [ouvrir la documentation Clairval](EXEMPLES/CLAIRVAL/README.md).

Depuis la version 1.8.0 : exploration depuis Vaucombe, découverte de sept lieux, chemins parcourus et progression conservée dans le navigateur. Le parcours libre et la campagne publique restent séparés.

Le mode **Ma campagne** permet aussi d’importer une projection publique des déplacements confirmés et du résumé de reprise, avec contrôle des révisions. Il reste séparé du parcours libre, sans synchronisation automatique avec la conversation. Voir le [guide d’import](EXEMPLES/CLAIRVAL/MISE_A_JOUR_CAMPAGNE.md).

Le format public 3 relie aussi les missions et l’[inventaire de campagne](EXEMPLES/CLAIRVAL/INVENTAIRE_CAMPAGNE.md) : réceptions, consommations, transferts, pertes et dépenses sont conservés sans double décompte entre les sessions. Ces fonctions sont incluses dans la version 1.8.0.

Le format public 4 ajoute l’[état du personnage](EXEMPLES/CLAIRVAL/ETAT_PERSONNAGE.md) dans le carnet : blessures, fatigue et effets temporaires, avec conséquences narratives et récupérations confirmées. Aucun score ni rétablissement automatique n’est ajouté.

L’[export et la reprise de progression](EXEMPLES/CLAIRVAL/EXPORT_ET_REPRISE.md) permettent de transférer la projection publique vers un autre navigateur : fichier JSON, aperçu avant intégration et retour au carnet. Cette fonction conserve le format existant et ne remplace pas la sauvegarde privée du MJ.

## Sauvegarde automatique — Supabase

L’édition en ligne propose une [synchronisation automatique par compte](EXEMPLES/CLAIRVAL/SAUVEGARDE_CLOUD.md) du parcours libre et de la projection publique de campagne. Les modifications locales sont envoyées et la copie en ligne est récupérée à l’ouverture ou au retour sur l’onglet. Une divergence suspend le transfert et demande de choisir la copie à conserver. Les commandes manuelles, l’export JSON et l’édition autonome restent disponibles.

## Auvrenne — Le passage des vivants

Le [carnet préparatoire d’Auvrenne](EXEMPLES/AUVRENNE/README.md) adapte le site au royaume et à Corbec Le Varn : charte chaude de bois et de parchemin, portrait, carte initiale, lore public et appel d’Alix. Aucun fait de partie n’est joué par la navigation. Les notes personnelles et repères favoris sont synchronisés séparément de Clairval. La démonstration Clairval reste accessible via `clairval.html`.
