# Moteur RPG 1.9.0 — Clairval : connexion et synchronisation entre appareils

Clairval dispose désormais d’une connexion Supabase et d’une sauvegarde synchronisée entre appareils.

## Nouveautés

- Inscription par e-mail, confirmation d’adresse, connexion et déconnexion. Session vérifiée avant l’accès au carnet.
- Sauvegarde du parcours libre et de la projection publique de campagne : carte, missions, inventaire, état narratif et reprise.
- Enregistrement automatique après modification ; récupération à l’ouverture et au retour sur l’onglet.
- Reprise après coupure réseau. Une divergence entre deux appareils suspend la synchronisation et demande quelle copie conserver.
- Accès aux sauvegardes limité à leur propriétaire par RLS ; écritures concurrentes protégées par un numéro de version.
- Commandes manuelles conservées, import de l’ancien carnet local et séparation du cache par compte.
- Déploiement GitHub Pages manuel, corrections des boutons recouverts par le décor et amélioration du contraste et du chargement des styles.

## Validation

Tests automatisés Auth, cloud, synchronisation, campagnes, inventaire, état narratif et export / reprise réussis. Isolation entre comptes et conflits d’écriture vérifiés en base. Connexion et transferts manuel puis automatique confirmés par le joueur sur deux appareils.

## Limites

Une seule sauvegarde cloud par compte, sans historique ni fusion automatique. La récupération s’effectue à l’ouverture ou au retour sur l’onglet ; ce n’est pas une mise à jour en temps réel. La projection publique ne remplace pas la sauvegarde privée du MJ et ne synchronise pas la conversation. L’export HTML autonome reste une démonstration publique hors ligne.

## Historique

| Version | Évolution |
| --- | --- |
| 1.9.0 | Connexion Supabase, sauvegardes par compte et synchronisation automatique entre appareils |
| 1.8.0 | Progression, campagne publique et export / reprise |
| 1.7.0 | Démonstration médiévale et distribution WebP |
| 1.6.0 | Missions et sauvegarde : spécifications |
| 1.5.0 | PNJ et relations : spécification |
| 1.4.0 | Carnet illustré : spécification |
| 1.3.1 | Parcours de création et de reprise |
| 1.3.0 | Univers, lore, carte et construction de campagne |
| 1.2.0 | Campagne de 60 sessions sur trente jours fictifs |
| 1.1.0 | Rythme, démarches complètes et choix numérotés |
| 1.0.0 | Base du moteur narratif |

[Jouer à Clairval](https://delattreb.github.io/Moteur_RPG/) · [Guide de sauvegarde](https://github.com/delattreb/Moteur_RPG/blob/1.9.0/EXEMPLES/CLAIRVAL/SAUVEGARDE_CLOUD.md)
