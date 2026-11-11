# Campagne en trente jours — 1.3.0

## Format retenu
- 60 sessions de 10 à 15 minutes de jeu actif, hors préparation et opérations techniques.
- Deux sessions par jour réel joué, couvrant ensemble une journée fictive.
- 30 journées fictives et un objectif de 30 journées réelles consécutives si les séances ont lieu comme prévu.
- Une absence réelle met en pause ; la fin du calendrier se décale sans consommer de session ou de temps fictif. Aucun rappel ni automatisation n'est créé par ces règles.

La session 1 et la session 2 appartiennent au jour fictif 1 ; les sessions 59 et 60 au jour 30. Formule : jour = partie entière de (numéro de session - 1) / 2 + 1. La première session de la paire développe la journée ; la seconde mène à sa clôture et au passage à la suivante. Matin/soir ne sont pas imposés : les horaires et durées fictives dépendent des actions.

## Architecture du scénario
| Sessions | Jours fictifs | Fonction dramatique |
| --- | --- | --- |
| 1–10 | 1–5 | Action immédiate, personnages récurrents, enjeux et premiers engagements |
| 11–24 | 6–12 | Exploration, alliances, premiers résultats et conséquences |
| 25–36 | 13–18 | Bascule du conflit selon les décisions et initiatives des acteurs |
| 37–48 | 19–24 | Initiatives décisives du joueur et préparation du dénouement |
| 49–58 | 25–29 | Résolution du conflit principal, selon les voies réellement ouvertes |
| 59–60 | 30 | Derniers choix, conséquences et épilogue |

Ces plages orientent la préparation ; elles n'interdisent pas de résoudre un conflit plus tôt. Préparer une intrigue centrale, deux ou trois intrigues secondaires facultatives et des personnages aux objectifs distincts. Ne pas attribuer d'avance une décision, un succès ou un échec au joueur.

Donner au jour 30 une échéance fictionnelle compréhensible : jugement, départ, succession ou événement équivalent adapté à l'univers. L'échéance ne garantit aucun résultat et ne devient pas automatiquement une catastrophe. Si le conflit est résolu tôt, développer ses conséquences et les enjeux encore choisis ; aucun nouvel antagoniste obligatoire pour remplir les sessions. Si le joueur veut conclure plus tôt, respecter sa demande plutôt que meubler.

## Préparation progressive
Avant le lancement, préparer les tensions, acteurs, échéances et plusieurs issues possibles jusqu'au jour 30. Détailler uniquement les deux prochaines sessions : situation, objectif perceptible, obstacle, décisions possibles, résultat atteignable et transition. Adapter la suite après les événements joués. Les éléments non joués restent conditionnels.

Tous les cinq jours fictifs, vérifier l'avancée des enjeux, la variété, les pistes choisies ou abandonnées et le temps restant. Réduire les démarches administratives ou les pistes secondaires avant de sacrifier les décisions importantes. Si l'intrigue principale avance peu, rendre une action décisive accessible ; ne pas augmenter seulement les dialogues ou les indices.

## Session de 10 à 15 minutes
Ouvrir par un bref rappel public et une situation immédiatement jouable. Résoudre les démarches complètes, présenter les conséquences et laisser des choix numérotés. Viser un résultat concret, sans quota de messages ou de scènes. Une information répétée ne constitue pas un résultat.

La durée est une cible souple : ne pas interrompre une décision intéressante pour atteindre dix minutes, ni meubler jusqu'à quinze. Si le temps réel n'est pas mesurable, ne pas prétendre le chronométrer ; utiliser la progression observée et le retour du joueur.

Une scène peut traverser les deux sessions du jour si elle évolue. Un trajet ou une attente peut être résumé jusqu'à une décision utile dans la journée prévue. Ne pas sauter plusieurs jours fictifs pour compresser une mission, ni ajouter un obstacle pour empêcher une résolution rapide.

Le passage au jour suivant respecte l'action et les décisions en attente : proposer la transition plutôt que l'imposer. Si une scène majeure exige de dépasser le découpage prévu, signaler l'écart et convenir d'un ajustement ; ne pas modifier silencieusement les faits pour conserver le calendrier.

Un arrêt anticipé est une interruption de la session courante, pas une session achevée de plus. À la reprise, continuer au choix en attente ; ne pas avancer le jour fictif pour compenser l'absence. Ce référentiel ne fournit toujours aucune sauvegarde automatique.

## Conclusion
Préparer le dénouement avant les dernières sessions. La session 60 conclut ce qui a été joué : issue, coût, relations et devenir du personnage. Distinguer les mystères secondaires volontairement laissés ouverts d'une intrigue principale abandonnée faute de préparation. Aucun cliffhanger ne doit rendre une autre campagne obligatoire.

## Continuité de campagne
Le fonctionnement de sauvegarde automatique retenu est décrit dans SAUVEGARDE_ET_REPRISE.md. Il respecte les interruptions sans compter de nouvelle session et demeure à implémenter ; aucun service n'est activé par ce référentiel.
