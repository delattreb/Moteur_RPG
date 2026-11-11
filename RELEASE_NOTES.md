# Moteur RPG 1.10.0 — Auvrenne : carnet illustré et sauvegarde des séances

Auvrenne dispose désormais de son carnet de campagne, d’une carte illustrée et d’un journal pouvant être enregistré directement depuis le chat de jeu.

## Nouveautés

- Charte médiévale chaude : bois sombre, parchemin doré, navigation illustrée, portraits de Corbec et d’Alix.
- Besace et quatre fiches d’équipement : dague, arc court, mule et bagage léger. Aucun objet supplémentaire ajouté au scénario.
- Carte publique avec huit repères cliquables, zoom et défilement ; noms sur cartouches et typographie médiévale avec polices de repli.
- Distinction entre lieux connus, positions consignées et position actuelle ; observations publiques accessibles dans les fiches.
- Initialisation à Valcroix, jour 1, zéro séance ; journal des séances, jour fictif, lieu de fin et état de la mission.
- Lecture des anciens carnets préparatoires avec conservation des notes et favoris.
- Fonction serveur `record_auvrenne_session` : enregistrement depuis le chat, contrôle de version, protection contre les doublons et accès limité au compte du joueur.
- Statut de synchronisation visible ; commandes manuelles regroupées dans « Options de sauvegarde » et saisie manuelle présentée comme secours.
- Démonstration Clairval et sauvegardes Auvrenne séparées.

## Validation

Contrôles automatisés du carnet, des fiches, du journal, de la restauration, de l’isolation et du placement des noms réussis. Tests SQL de l’ajout, des doublons, des conflits, des accès et des résumés vides réalisés en transactions annulées ; aucune séance de test conservée dans la partie.

## Utilisation et limites

Le jeu se déroule dans « Auvrenne — Partie de Corbec ». Le chat doit charger le [protocole de sauvegarde](https://github.com/delattreb/Moteur_RPG/blob/1.10.0/EXEMPLES/AUVRENNE/SAUVEGARDE_CHAT.md) et disposer du connecteur Supabase. Il n’existe pas d’observateur automatique de toutes les conversations. L’usage depuis le chat de jeu reste à confirmer lors d’une vraie séance.

Le site récupère la progression à l’ouverture ou au retour sur l’onglet, sauf conflit local ; il ne s’actualise pas en continu. La position structurée est limitée aux huit lieux existants et au lieu de fin de séance. Argent, flèches, provisions et blessures restent dans les résumés, sans compteurs dédiés.

La police gothique dépend des polices disponibles sur l’appareil. La vérification géométrique des cartouches ne remplace pas une revue visuelle sur chaque écran.

Les sources SQL sont incluses ; une installation neuve doit les appliquer après la création des sauvegardes. GitHub Pages se déploie toujours par lancement manuel du workflow. La création de cette release ne déploie pas le site.

## Historique

| Version | Évolution |
| --- | --- |
| 1.10.0 | Auvrenne : carnet illustré, journal et sauvegarde depuis le chat |
| 1.9.0 | Connexion et synchronisation entre appareils |
| 1.8.0 | Progression publique et export / reprise |
| 1.7.0 | Démonstration médiévale et distribution WebP |
| 1.6.0 | Missions et sauvegarde : spécifications |
| 1.5.0 | PNJ et relations : spécification |
| 1.4.0 | Carnet illustré : spécification |
| 1.3.1 | Parcours de création et de reprise |
| 1.3.0 | Univers, lore et construction de campagne |
| 1.2.0 | Campagne de trente jours fictifs |
| 1.1.0 | Rythme, démarches et choix numérotés |
| 1.0.0 | Base du moteur narratif |

Les versions 1.3.1 à 1.7.0 n’ont pas de release GitHub dédiée.

[Ouvrir le site](https://delattreb.github.io/Moteur_RPG/) · [Historique détaillé](https://github.com/delattreb/Moteur_RPG/blob/1.10.0/CHANGELOG.md)
