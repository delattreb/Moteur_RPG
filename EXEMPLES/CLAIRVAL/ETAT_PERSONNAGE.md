# État narratif du personnage

Dans **Ma campagne → Carnet**, l’état du personnage présente les blessures, la fatigue et les effets temporaires consignés dans la partie. Les conséquences restent concrètes et narratives : aucune jauge de santé, fatigue, gravité ou durée n’est inventée.

La page distingue les états actifs, les récupérations / effets levés et le journal des évolutions. Une conséquence non précisée reste non précisée. Une liste vide ne constitue pas un bilan complet et ne signifie pas automatiquement que le personnage est en bonne santé.

## Mise à jour publique au format 4

Le [modèle de session](../../MODELES/MISE_A_JOUR_CARTE_CLAIRVAL.json) ajoute `characterState: { "events": [] }` aux données de carte, missions et inventaire. Les formats 1, 2 et 3 restent lisibles ; leur absence de registre d’état ne crée aucun état fictif. Passer au format 4 dans une nouvelle révision, conserver les données précédentes, puis ne pas revenir à un ancien format.

Chaque événement de `characterState.events` contient exactement :

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant unique et stable de l’événement, 100 caractères maximum |
| `conditionId` | Identifiant stable de l’état concerné, 100 caractères maximum |
| `kind` | `injury` pour une blessure, `fatigue` ou `effect` pour un effet temporaire |
| `action` | `onset` pour la première consignation, `update` pour une évolution ou `resolve` pour la levée confirmée |
| `title` | Désignation publique de l’état, 160 caractères maximum |
| `consequences` | Liste des conséquences actuellement connues, ou `[]` si elles ne sont pas précisées ; maximum 20 textes de 600 caractères |
| `recovery` | Conditions de récupération connues, 1 200 caractères maximum ; chaîne vide si elles ne sont pas établies |
| `source` | Fait joué justifiant cette apparition, évolution ou récupération, 1 200 caractères maximum |
| `session` | Repère de session réellement connu, 160 caractères maximum |

À la première migration, un état déjà existant peut être consigné par `onset` en précisant dans `source` qu’il était déjà établi avant le registre. Ne pas inventer une nouvelle blessure ou un numéro de session pour remplir un champ : indiquer explicitement que le repère n’est pas établi si nécessaire.

## Évolution par les faits

Un `update` conserve le `conditionId` et la catégorie de l’état actif. Il fournit ses conséquences et conditions de récupération **actuelles**, qui remplacent les précédentes dans la vue active ; les anciennes formulations restent dans le journal. Le titre peut être précisé selon ce qui est appris.

Un `resolve` exige une cause confirmée dans `source`, `consequences: []` et `recovery: ""`. L’état quitte alors la vue active et rejoint l’historique. Un repos projeté, un soin envisagé, l’achat d’un remède, le rechargement du site ou le temps réel passé hors du jeu ne suffisent jamais à lever un état. Le registre ne déduit rien automatiquement d’une durée, d’un déplacement ou d’un objet consommé.

Lorsqu’une consommation et une récupération ont effectivement été jouées ensemble, inclure le mouvement d’inventaire et l’événement d’état dans la même révision. Le site les enregistre ensemble, mais ne prétend pas pouvoir vérifier leur relation narrative : la projection publique doit être préparée à partir des faits réellement confirmés.

Une rechute après une levée confirmée reçoit un nouvel identifiant d’état. Les anciens états ne sont pas rouverts ni effacés silencieusement. Les identifiants d’événement sont uniques ; une même révision réimportée ne rejoue pas la récupération.

## Exemple de structure

Exemple de forme uniquement, à adapter à une blessure réellement confirmée :

```json
{
  "events": [
    {
      "id": "session-001-etat-001",
      "conditionId": "epaule-blessee-001",
      "kind": "injury",
      "action": "onset",
      "title": "Épaule blessée",
      "consequences": ["Porter une charge devient difficile."],
      "recovery": "",
      "source": "Remplacer par le fait réellement confirmé en scène.",
      "session": "Remplacer par le repère de session connu"
    }
  ]
}
```

Le registre est limité à 2 000 événements ; les trente derniers sont affichés dans le journal, l’ensemble reste conservé dans la projection. La consultation ne fait avancer aucun compteur. Les champs supplémentaires sont refusés ; aucun état privé ou diagnostic inconnu du joueur ne doit être inclus dans les textes. Ce registre public local ne remplace pas la sauvegarde canonique privée du MJ.

Vérification : `node check-campaign.mjs` couvre apparition, évolution, récupération confirmée, historique, rechute distincte, migration, rechargement sans guérison automatique, refus des changements d’historique et maintien de l’état affiché si l’enregistrement échoue.
