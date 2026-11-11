# Missions de campagne

Dans **Ma campagne → Quêtes**, les trois onglets présentent uniquement les missions de la projection publique importée : **En cours**, **Possibilités**, **Historique**. Ouvrir une fiche ou consulter un lieu ne fait avancer ni la mission ni le temps fictif. Aucun bouton ne permet d’accepter ou de terminer une mission depuis le carnet : le changement doit correspondre aux faits joués et arriver dans la prochaine révision de session.

## Import de fin de session

Utiliser le [modèle public au format 2](../../MODELES/MISE_A_JOUR_CARTE_CLAIRVAL.json), qui ajoute `quests` à la projection de carte. Conserver le même identifiant de campagne, tous les déplacements déjà intégrés et toutes les missions connues ; incrémenter `revision`. Une session sans déplacement peut mettre à jour uniquement les missions et le résumé. La carte et les missions sont validées et enregistrées ensemble : si un champ est refusé, aucune partie de la mise à jour n’est intégrée à l’écran.

Les anciennes projections au format `version: 1` restent lisibles et n’affichent aucune mission inventée. Pour ajouter les missions, passer au format 2 ou ultérieur, augmenter la révision et ajouter `quests`. Le format 3 inclut aussi l’inventaire, et le format 4 l’état du personnage. Après migration, ne pas revenir à un ancien format afin de préserver toutes les données intégrées.

## Fiche publique

Chaque entrée de `quests` contient exactement les champs ci-dessous :

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant stable et unique, 100 caractères maximum |
| `title` | Titre connu, 160 caractères maximum |
| `status` | `possible`, `active`, `completed`, `refused`, `abandoned` ou `failed` |
| `origin` | Origine publique de la mission, 600 caractères maximum |
| `objective` | But concret connu, 600 caractères maximum |
| `stakes` | Enjeu connu, ou chaîne vide si inconnu |
| `facts` | Liste des faits acquis, ou `[]` |
| `leads` | Liste des pistes connues, ou `[]` |
| `deadline` | Échéance réellement connue, ou chaîne vide |
| `commitments` | Liste des engagements réellement acceptés, ou `[]` |
| `people` | Identifiants de personnages déjà rencontrés dans les événements importés |
| `places` | Identifiants de lieux déjà atteints, ou le point de départ |
| `nextDecision` | Décision accessible au joueur, ou chaîne vide si aucune / mission clôturée |
| `outcome` | Issue réellement jouée pour une mission clôturée ; chaîne vide pour une mission ouverte |
| `consequences` | Liste des conséquences connues, ou `[]` |

Les textes libres sans limite spécifique ci-dessus sont limités à 1 200 caractères. Les listes de textes contiennent au maximum 30 entrées. La projection contient au maximum 200 missions. Tous les champs sont publics : ne pas y inclure une solution, une intention secrète ou un événement futur préparé.

## Statuts et conservation

| Statut | Onglet | Conditions |
| --- | --- | --- |
| `possible` | Possibilités | Offre ou piste découverte, sans acceptation automatique |
| `active` | En cours | Au moins un engagement accepté consigné |
| `completed` | Historique | Mission accomplie ; issue renseignée |
| `refused` | Historique | Proposition refusée ; issue renseignée |
| `abandoned` | Historique | Abandon confirmé ; issue renseignée |
| `failed` | Historique | Échec confirmé ; issue renseignée |

Une possibilité peut rester ouverte, être acceptée, refusée, abandonnée ou devenir caduque par un échec confirmé. Une mission acceptée peut rester en cours, être accomplie, abandonnée ou échouer. Une mission déjà acceptée ne redevient pas une simple possibilité. Les statuts historiques sont conservés : pas de réouverture ni de suppression silencieuse. Une nouvelle proposition ultérieure reçoit un nouvel identifiant. La première projection peut inclure des missions déjà clôturées si elles ont effectivement été jouées.

Une mission clôturée doit avoir `nextDecision: ""` et une issue non vide. Une mission ouverte doit avoir `outcome: ""`. Les conséquences peuvent rester inconnues et donc être une liste vide. Résoudre une mission n’exige pas d’inventer la résolution de tous les mystères secondaires.

## Exemple de structure

Cet exemple est un gabarit, pas une nouvelle mission jouée. Remplacer ses indications avant de l’ajouter à `quests` :

```json
{
  "id": "mission-001",
  "title": "Titre public à renseigner",
  "status": "possible",
  "origin": "Origine connue à renseigner",
  "objective": "But connu à renseigner",
  "stakes": "",
  "facts": [],
  "leads": [],
  "deadline": "",
  "commitments": [],
  "people": [],
  "places": [],
  "nextDecision": "Accepter ou refuser cette proposition ?",
  "outcome": "",
  "consequences": []
}
```

Les lieux référencés ouvrent leur fiche de carte ; les personnages sont indiqués par leur nom connu. Une référence à un lieu non découvert ou à un personnage absent des rencontres importées est refusée. Pour l’instant, les rencontres du format sont liées à un événement de déplacement : le site ne permet pas encore de consigner indépendamment une nouvelle rencontre sans déplacement.

Vérification : `node check-campaign.mjs`, qui couvre aussi le passage d’une offre à une mission acceptée, les clôtures, la conservation de l’historique, la migration depuis le format 1 et le rechargement sans doublon.
