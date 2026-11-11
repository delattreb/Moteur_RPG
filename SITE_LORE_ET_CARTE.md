# Site de lore et carte progressive

Spécification du futur site de campagne, pas une application déjà implémentée. La création et la publication du site interviennent après validation de l'univers. Le moteur générique et les exemples restent séparés de ses contenus.

## Lore consultable
Le site comprend une présentation de l'univers, un atlas, les cultures et factions connues et un glossaire. Le joueur peut consulter ces éléments sans interrompre une session. Écrire des articles courts, reliés entre eux et compréhensibles sans tout lire. Les rumeurs sont attribuées et distinguées des faits établis.

Le lore initial reflète ce que le personnage peut connaître. Après découverte en jeu, enrichir les articles concernés à partir des faits réellement révélés. Ni secrets MJ, ni intentions cachées, ni événements futurs préparés ne sont publiés. Une rubrique vide ne justifie pas d'inventer une connaissance.

## Carte stable, révélation progressive
La carte maîtresse fixe les lieux, connexions et positions avant leur exposition. Compléter les régions encore indéfinies de manière cohérente ; ne pas déplacer un lieu établi pour adapter une intrigue. Les chemins, distances et obstacles gouvernent les déplacements, pas une image improvisée.

Statuts distincts : inconnu, connu de nom ou par information, visité. Un repère connu de nom peut être montré sans détails seulement si son emplacement est effectivement connu. Un lieu visité expose sa fiche et ses abords perceptibles. Connaître une destination ne dessine pas un trajet non parcouru.

Un déplacement accompli révèle uniquement le trajet et ce qui a pu être perçu : corridor de voyage, lieux traversés, repères visibles. Il ne découvre pas automatiquement toute une région ni ses intérieurs. Les découvertes à distance par observation ou carte reçue sont possibles si jouées et justifiées ; leur source est indiquée. Les lieux secrets restent masqués même dans une zone visitée.

Un voyage prévu ou interrompu ne révèle pas l'arrivée. Conserver position actuelle, trajet réellement effectué et lieux visités ; l'absence réelle n'avance pas le marqueur. Zoom, déplacement de carte, recentrage, légende et fiches de lieux rendent l'atlas consultable sur le site. Sur mobile ou sans interaction graphique, fournir aussi une liste accessible des lieux connus.

## Graphisme issu de l'univers
À partir du questionnaire validé, définir palette, typographies, matières, symboles, cadre et traitement des illustrations. Adapter le site et l'atlas à la même direction : pas d'habillage médiéval imposé à un univers spatial. Conserver contraste, textes lisibles et symboles distincts sans dépendre seulement de la couleur.

La carte stylisée représente une géographie contrôlée : les coordonnées et connexions structurées font foi. Un fond illustré ne doit pas inventer de routes, déplacer les lieux ou révéler les secrets. Si une illustration est produite, la vérifier avant usage. Les décorations des zones inconnues ne contiennent aucun indice involontaire.

## Séparation technique à respecter lors de l'implémentation
Construire la vue publique par sélection explicite des seuls champs autorisés. Ne jamais charger la carte maîtresse ou le lore privé dans le navigateur pour les masquer par CSS, brouillard ou JavaScript. Les sources, données embarquées, cartes SVG, infobulles, textes alternatifs et médias téléchargés doivent tous être publics.

Le brouillard est un effet de présentation sur des données déjà filtrées. Aucune coordonnée, aucun nom ou lien secret ne doit être accessible dans les ressources du site. Afficher une date ou référence de mise à jour seulement si elle correspond à une publication effectivement vérifiée ; ne pas promettre une synchronisation inexistante.

## Vérifications avant publication
1. La page d'univers correspond aux choix validés.
2. Une visite révèle le bon lieu et le trajet accompli, pas les zones voisines cachées.
3. Un projet de voyage ne change ni position ni découverte.
4. Un repère connu de nom ne devient pas automatiquement visité.
5. Les données et médias publics ne contiennent aucun secret, même après inspection.
6. Le thème correspond à l'univers et reste lisible sur écran étroit.
7. La consultation du lore ne fait pas avancer le temps de jeu.

Ces critères seront vérifiés sur le site construit ; leur présence dans le référentiel ne vaut pas validation d'une implémentation.

## Carnet du personnage
Le site comprend aussi le carnet personnel illustré défini dans CARNET_PERSONNAGE.md : identité, état, savoir-faire, possessions et engagements. Utiliser MODELES/CARNET_PERSONNAGE.md comme modèle public. Le carnet, le lore et la carte partagent la même direction graphique ; leur consultation n'avance pas la fiction. Cette intégration reste à implémenter.

## Galerie de PNJ et relations
Intégrer la galerie et les pages individuelles selon PNJ_ET_RELATIONS.md, avec MODELES/PNJ_PUBLIC.md. Les personnes rencontrées sont illustrées selon les références connues ; les personnes seulement évoquées portent le statut « connue de nom ». Les relations et dernières nouvelles restent observables, sans position actuelle ni loyauté omnisciente. Cette intégration reste à implémenter.
