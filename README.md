# Moteur RPG

**Version du dépôt : 1.4.0** — [Première release : 1.3.0](https://github.com/delattreb/Moteur_RPG/releases/tag/1.3.0)

Moteur de jeu de rôle narratif pour un joueur et un maître du jeu humain ou assistant. Il fournit les règles et les modèles pour créer un univers, préparer une campagne et faire évoluer l'histoire selon les décisions du joueur. Cette édition est un référentiel utilisable en conversation ; elle ne contient pas encore d'application exécutable.

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

**Le site et la carte restent à construire après validation de l'univers.** La version 1.3.0 fournit leur spécification ; elle ne publie pas encore de site et ne réalise aucune synchronisation automatique.

## Carnet personnel illustré

La fiche du personnage prend la forme d'un carnet personnel : identité et portrait, état actuel, savoir-faire, possessions et engagements. Les pages comportent des annotations et des images stylisées selon l'univers, avec une continuité de visage, de tenue et d'objets. Le texte reste accessible indépendamment des illustrations.

Voir [la spécification du carnet](CARNET_PERSONNAGE.md) et [le modèle public vierge](MODELES/CARNET_PERSONNAGE.md). Comme le site de lore et l'atlas, ce carnet reste à implémenter ; ses contenus suivent uniquement les faits joués et connus.

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
| 1.0.0 | Première base propre : intentions, conséquences, monde actif et modèles de jeu |
| 1.1.0 | Démarches complètes, missions qui aboutissent et choix numérotés |
| 1.2.0 | Campagne de 60 sessions de 10 à 15 minutes sur trente jours fictifs |
| 1.4.0 | Carnet personnel illustré adapté à l'univers : spécification et modèle public |
| 1.3.1 | Parcours réutilisable : nouvelle campagne, questionnaire interrompu, validation et reprise |
| 1.3.0 | Construction de campagne, questionnaire d'univers, lore et spécification de carte progressive |

Voir [l'historique détaillé](CHANGELOG.md) et [la release 1.3.0](https://github.com/delattreb/Moteur_RPG/releases/tag/1.3.0).

## État de validation

Un essai conversationnel court a permis d'améliorer le rythme. Les fichiers, les liens internes et le découpage des soixante sessions ont été contrôlés. Le nouveau scénario d'exemple et une campagne complète restent à éprouver en partie.

Le dépôt contient le moteur générique, des modèles vierges et des exemples de préparation. Il ne contient aucune sauvegarde de partie, ancienne campagne ou donnée personnelle. La continuité entre conversations n'est pas automatique.
