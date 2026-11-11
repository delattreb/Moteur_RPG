# Carnet personnel illustré

Spécification du carnet consultable sur le futur site de campagne. Le format retenu est un carnet personnel, adapté à l'univers validé : journal de voyage, grimoire, dossier d'agent, journal de bord ou autre traitement cohérent. Aucun site, portrait ou système de mise à jour n'est implémenté par ce document.

## Pages
| Page | Contenu public | Images prévues |
| --- | --- | --- |
| Identité | Nom, origine, rôle, motivation et présentation validée | Portrait de référence et éléments de tenue connus |
| État actuel | Santé, fatigue, effets temporaires et conséquences concrètes | Annotations et symboles lisibles adaptés à l'univers |
| Savoir-faire | Capacités établies et approches qu'elles rendent possibles | Symboles et petites illustrations cohérentes |
| Possessions | Équipement, objets, argent et documents réellement obtenus | Objets importants illustrés, détails connus uniquement |
| Engagements | Objectifs acceptés, promesses, dettes et responsabilités | Notes, marques et annotations thématiques |

Les rubriques ressemblent à des pages annotées, sans sacrifier la lecture aux effets de texture ou d'écriture manuscrite. Les informations utiles restent du texte sélectionnable, consultable indépendamment des images. Sur mobile, adapter la disposition des pages sans imposer une double page minuscule.

## Évolution par les faits
Actualiser la fiche à partir des événements réellement joués. Pour chaque changement important, indiquer le fait d'origine, la session si connue et l'effet concret. Ne pas inventer de score de santé, de compétence ou de moral pour remplir la page.

Exemple de formulation, sans fait de campagne : « Épaule blessée pendant la traversée : porter une charge devient difficile. » Un rétablissement exige une cause établie ; une absence réelle ne guérit pas automatiquement le personnage.

Le [prototype d’état du personnage Clairval](EXEMPLES/CLAIRVAL/ETAT_PERSONNAGE.md) implémente ces annotations narratives à partir d’un registre public d’événements importés : blessures, fatigue, effets temporaires, évolutions et levées confirmées. La consultation et le rechargement n’entraînent aucune récupération automatique ; les anciennes conséquences restent consultables dans le journal.

Les possessions distinguent porté, transporté, stocké, prêté et perdu lorsque ces positions sont établies. Les transferts et quantités restent cohérents. Un montant inconnu reste inconnu. Une propriété cachée ou le contenu d'un document non lu ne doit pas être illustré ou décrit.

Le [prototype d’inventaire Clairval](EXEMPLES/CLAIRVAL/INVENTAIRE_CAMPAGNE.md) implémente les possessions et monnaies par un registre public de mouvements importés. Il contrôle les quantités connues et préserve les quantités inconnues. Les prêts et emplacements de stockage de cette spécification restent à implémenter.

Afficher seulement les engagements acceptés. Une proposition de mission n'est pas un objectif actif ; une promesse n'est pas réputée tenue par une intention future.

## Identité visuelle
Le carnet partage la direction graphique du lore et de l'atlas : palette, typographies, matières, symboles et traitement des images. Le questionnaire d'univers valide cette direction commune ; il ne redemande pas le choix de présentation du carnet personnel, déjà retenu.

Conserver les invariants du portrait, de la tenue et des objets : traits, proportions, matériaux et signes distinctifs établis. Utiliser les références validées pour les nouvelles images. Une nouvelle illustration reste proposée jusqu'à validation ; elle ne modifie pas les faits de jeu.

Privilégier les images utiles : portrait et objets importants, puis changements significatifs. Ne pas bloquer le jeu par une génération à chaque geste. Une image indisponible laisse le contenu textuel accessible et n'est pas annoncée comme produite.

## Publication et consultation
Le carnet est une vue publique dérivée ; la consultation ne fait pas avancer la fiction. Les annotations expriment des faits connus ou des paroles réellement formulées, sans inventer pensées et sentiments du personnage.

Filtrer les contenus avant envoi au navigateur, y compris noms de fichiers, légendes, textes alternatifs et images. Ne pas intégrer de source MJ complète pour la masquer dans l'interface. Distinguer préparation, modification locale et publication vérifiée ; ne promettre aucune synchronisation automatique.

## Vérifications lors de l'implémentation
1. Portrait, tenue et objets cohérents avec les références validées.
2. Pages lisibles avec ou sans images, sur téléphone et ordinateur.
3. Blessure, objet acquis ou engagement accepté reflété avec son origine connue.
4. Quantités et transferts cohérents ; inconnues explicites.
5. Aucun secret dans les données, images ou métadonnées publiques.
6. Consultation sans effet sur les compteurs ou le temps fictif.

Ces contrôles restent à effectuer sur un site construit. Aucun système de progression chiffré ni nombre de compétences n'est ajouté par cette spécification.

## Répertoire des rencontres
La galerie de portraits ouvre les pages individuelles définies dans PNJ_ET_RELATIONS.md. Les affaires communes renvoient aux engagements connus du personnage. Utiliser MODELES/PNJ_PUBLIC.md pour les pages publiques, sans divulguer les fiches privées des acteurs.

## Missions et reprise
Intégrer les onglets En cours, Possibilités et Historique selon MISSIONS_ET_GUIDAGE.md. Le résumé public de SAUVEGARDE_ET_REPRISE.md expose les changements, l'objectif courant et la décision en attente, sans secrets. Aucun enregistrement automatique n'est actuellement implémenté.
