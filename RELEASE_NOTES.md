# Moteur RPG 1.8.0 — Clairval : progression et reprise

Le prototype passe de la consultation à une progression publique conservée entre les sessions.

## Nouveautés de la 1.8.0

- Carte explorable : sept lieux, position et chemins parcourus ; parcours libre séparé du mode campagne.
- Campagne actualisée par import des faits joués : missions, inventaire, monnaies, blessures, fatigue et effets temporaires.
- Export JSON et restauration avec aperçu, contrôle des révisions et retour à la décision en attente, sans doublons.
- Format public 4 ; lecture des formats 1 à 3 conservée. Modèle vierge et guides inclus.
- Illustration WebP partagée ; HTML autonome généré localement pour garder un dépôt léger.

## Versions dans l’ordre — de la plus récente à la plus ancienne

Ce tableau retrace les versions du dépôt. Les versions 1.3.1 à 1.7.0 n’avaient pas de release GitHub dédiée.

| Version | Évolution |
| --- | --- |
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

## Validation et limites

Contrôles automatisés du parcours libre, des missions, de l’inventaire, des états et de l’export / restauration réussis. Une courte scène effectivement jouée a été exportée et restaurée dans un stockage de test isolé, sans altérer ses résultats. Les dépenses sont couvertes par les tests automatisés ; aucun achat n’a été joué dans cette scène.

Le rendu visuel et le téléchargement natif dans le navigateur restent à vérifier. L’import reste manuel ; ce carnet public ne remplace pas la sauvegarde privée du MJ et ne synchronise pas automatiquement la conversation. Aucune progression de partie réelle ou de test n’est ajoutée au dépôt.

Historique détaillé : [CHANGELOG.md](https://github.com/delattreb/Moteur_RPG/blob/main/CHANGELOG.md).
