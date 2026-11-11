# Relier la carte aux faits joués

Dans **Carte → Ma campagne**, aucun clic de voyage n’avance la partie. Le site affiche la projection publique importée après la session. Le **Parcours libre** conserve son propre trajet ; il ne modifie jamais la campagne.

## Après une session de Clairval

1. Fournir au MJ la dernière projection publique intégrée, si elle existe. Sans accès à cette projection, ne pas reconstituer son historique de mémoire.
2. Demander une mise à jour au format du [modèle public](../../MODELES/MISE_A_JOUR_CARTE_CLAIRVAL.json). Le modèle vierge ne représente pas une session jouée : remplacer ses indications avant import.
3. Conserver le même `campaignId`, incrémenter `revision` et conserver les événements précédents sans modification. Ajouter seulement les déplacements réellement accomplis.
4. Copier le JSON dans **Mettre à jour après une partie**, puis choisir **Intégrer les faits joués**. La carte, les trajets, les observations, les rencontres et la reprise sont alors recalculés depuis cet historique.

Une intention (« je veux partir »), un voyage interrompu avant l’arrivée ou une simple consultation ne créent aucun déplacement. Le site n’avance ni le jour fictif ni les quêtes : `moment`, `objective` et `pending` reprennent les derniers éléments confirmés en conversation. Une session sans déplacement peut actualiser ces trois champs dans une nouvelle révision.

## Format

Les champs de premier niveau acceptés sont les suivants. Le format 2 ajoute `quests`, le format 3 ajoute `inventory` et le format 4 ajoute `characterState` ; les anciennes projections restent lisibles :

| Champ | Contenu |
| --- | --- |
| `version` | `4` pour carte, missions, inventaire et état du personnage ; les formats `1`, `2` et `3` restent lisibles |
| `campaignId` | Identifiant stable de cette campagne de Clairval, 80 caractères maximum |
| `revision` | Entier positif, strictement supérieur à la révision intégrée pour une modification |
| `start` | `vaucombe`, point de départ de ce prototype |
| `events` | Liste ordonnée des déplacements accomplis, vide si aucun déplacement confirmé |
| `moment` | Dernier moment fictif connu, 160 caractères maximum |
| `objective` | Objectif connu, 600 caractères maximum |
| `pending` | Décision laissée en attente, 600 caractères maximum |
| `quests` | Formats 2 à 4 : liste complète des missions connues, ou `[]` |
| `inventory` | Formats 3 et 4 : objet contenant `items` et `movements` |
| `characterState` | Format 4 : objet contenant `events`, le journal public de l’état du personnage |

Voir le [format des missions](MISSIONS_CAMPAGNE.md), le [registre d’inventaire](INVENTAIRE_CAMPAGNE.md) et l’[état du personnage](ETAT_PERSONNAGE.md). Après une migration, ne pas revenir à un ancien format : conserver toutes les données intégrées dans les révisions suivantes.

Chaque événement contient exactement `id`, `from`, `to`, `summary`, `people`. L’identifiant `id` est stable et unique ; `summary` rapporte uniquement les observations publiques de cette arrivée (1 200 caractères maximum). `people` contient les identifiants des personnages rencontrés **au lieu d’arrivée pendant cet événement**, ou `[]`. Pour ce prototype, seuls `ysilde`, `garin` et `perrin` sont reconnus. Une personne ne doit pas être ajoutée parce que son nom est seulement cité.

Les chemins reconnus sont parcourables dans les deux sens :

| Départ | Arrivée |
| --- | --- |
| `vaucombe` | `forest` |
| `vaucombe` | `tower` |
| `vaucombe` | `moulin` |
| `forest` | `clairiere` |
| `forest` | `valestre` |
| `moulin` | `pierrefont` |

Exemple de structure d’événement, à utiliser **seulement si ce déplacement a réellement eu lieu** :

```json
{
  "id": "session-001-deplacement-001",
  "from": "vaucombe",
  "to": "forest",
  "summary": "Remplacer par les observations publiques réellement confirmées à l’arrivée.",
  "people": []
}
```

## Intégrité et limites

Réimporter une même révision ne rejoue rien. Les doublons, chemins impossibles, retours vers une ancienne révision, changements de campagne ou modifications d’un historique intégré sont refusés. Les propriétés supplémentaires sont refusées : ne jamais importer une sauvegarde canonique ou privée du MJ. Le format ne peut pas déterminer si un secret a été copié par erreur dans un texte public ; le MJ doit préparer cette projection séparément.

L’enregistrement est relu avant d’intégrer la révision à l’écran. En cas d’échec, le site conserve l’état affiché précédent et indique de garder le JSON pour réessayer. L’[export depuis l’interface et la restauration depuis un fichier](EXPORT_ET_REPRISE.md) permettent de conserver la dernière projection publique en dehors du navigateur. Il n’existe pas encore de synchronisation automatique avec ChatGPT, de stockage partagé, de changement de campagne ou de procédure de correction d’un événement déjà intégré. Ce stockage local ne constitue pas la sauvegarde privée complète de la partie.

Les autres rubriques de la démonstration ne sont pas utilisées pour inventer des faits de campagne : le carnet de reprise est issu de l’import, les rencontres sont issues des déplacements, les quêtes proviennent du format 2 ou ultérieur, l’inventaire du format 3 ou ultérieur et l’état du personnage du format 4. L’univers reste en attente de son raccordement.

Vérification : `node check-campaign.mjs` ; les contrôles du parcours libre restent dans `node check-clairval.mjs`.
