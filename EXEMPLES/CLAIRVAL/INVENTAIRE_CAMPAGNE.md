# Inventaire de campagne

Dans **Ma campagne → Inventaire**, les possessions et monnaies proviennent uniquement de la projection publique importée après la session. La démonstration du parcours libre garde ses propres objets ; ils ne sont jamais copiés dans la campagne.

L’inventaire affiche chaque objet, sa quantité actuelle, sa description connue et l’origine de son décompte. Le journal présente les trente derniers mouvements, du plus récent au plus ancien ; le registre complet reste conservé dans la projection. Les objets épuisés ou remis ne disparaissent pas de l’historique. Consulter une possession ne la consomme pas.

## Mise à jour de session au format 3

Le [modèle public](../../MODELES/MISE_A_JOUR_CARTE_CLAIRVAL.json) inclut `inventory` depuis le format 3. Il contient deux listes : `items` et `movements`. Le format 4 ajoute aussi l’état du personnage sans changer le registre d’inventaire. Conserver le même `campaignId`, augmenter `revision` et inclure les déplacements, missions et mouvements précédents. Une session sans voyage peut ajouter un mouvement d’inventaire.

Les anciennes projections aux formats 1 et 2 restent lisibles. Lors de la première importation d’un inventaire au format 3 ou 4, établir les quantités initiales à partir d’un état réellement confirmé, sans recompter ensuite les acquisitions déjà comprises dans cet état. Après migration, ne pas revenir à un ancien format et conserver le registre complet. Carte, missions et inventaire sont intégrés ensemble : une quantité incohérente refuse toute la mise à jour.

## Objets et monnaies

Chaque entrée de `items` contient exactement :

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant stable et unique, 100 caractères maximum |
| `name` | Nom connu, 160 caractères maximum |
| `description` | Description publique connue, 1 200 caractères maximum, ou chaîne vide |
| `kind` | `item` pour un objet, `currency` pour une monnaie |
| `unit` | Unité de décompte explicite, 80 caractères maximum |
| `openingQuantity` | Quantité initiale entière positive ou nulle ; `null` si elle est inconnue |
| `openingSource` | Fait public établissant cette quantité initiale, 600 caractères maximum |

Le nom et la description peuvent évoluer lorsque de nouvelles informations publiques sont acquises. L’identifiant, le type, l’unité, la quantité initiale et sa source restent stables. Les quantités actuelles ne sont jamais saisies directement : elles sont recalculées depuis le registre.

Après la première projection d’inventaire, tout nouvel objet commence avec `openingQuantity: 0` et son acquisition est ajoutée dans `movements`. Le prototype ne gère pas encore l’ajout ultérieur d’un nouvel objet dont la quantité reçue est inconnue. Une quantité initiale déjà inconnue reste `null` après les mouvements : le site ne déduit pas un solde exact d’informations incomplètes et ne peut pas vérifier la suffisance de ce stock inconnu.

Les quantités sont des entiers. Pour une monnaie fractionnable, choisir sa plus petite unité connue et l’exprimer explicitement dans `unit`. Deux monnaies ou dénominations différentes ont des identifiants distincts ; aucune conversion ni taux de change n’est inventé.

## Mouvements réellement joués

Chaque entrée de `movements` contient exactement :

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant stable et unique du mouvement, 100 caractères maximum |
| `itemId` | Identifiant d’un objet ou d’une monnaie de `items` |
| `type` | `receive`, `use`, `give`, `lose` ou `spend` |
| `quantity` | Entier strictement positif, exprimé dans l’unité de l’objet |
| `summary` | Fait d’origine public, 1 200 caractères maximum |
| `session` | Repère de session réellement connu, 160 caractères maximum |
| `counterparty` | Destinataire / interlocuteur public, 160 caractères maximum ; chaîne vide si aucun |

| Type | Effet sur la quantité | Usage |
| --- | --- | --- |
| `receive` | Augmentation | Objet reçu, achat effectivement livré ou monnaie obtenue |
| `use` | Diminution | Consommation effective d’un objet |
| `give` | Diminution | Objet ou monnaie remis ; destinataire obligatoire |
| `lose` | Diminution | Perte confirmée d’un objet ou de monnaie |
| `spend` | Diminution | Paiement effectif d’une monnaie |

Utiliser une clé sans la perdre ne consomme pas une unité. Une offre d’achat ou une intention de don ne crée aucun mouvement. Un achat réalisé peut entraîner deux mouvements : dépense de monnaie et réception d’un objet ; les deux doivent figurer dans la même révision lorsque ces deux effets ont été joués. Il n’y a pas encore de gestion des prêts, emplacements de stockage ou réservations : `give` indique une sortie des possessions affichées, pas un suivi du patrimoine prêté.

Exemple de structure, à adapter uniquement à une réception réellement jouée :

```json
{
  "items": [
    {
      "id": "objet-001",
      "name": "Nom connu à renseigner",
      "description": "",
      "kind": "item",
      "unit": "exemplaire(s)",
      "openingQuantity": 0,
      "openingSource": "L’objet n’était pas possédé avant sa réception."
    }
  ],
  "movements": [
    {
      "id": "session-001-reception-001",
      "itemId": "objet-001",
      "type": "receive",
      "quantity": 1,
      "summary": "Remplacer par la réception réellement confirmée.",
      "session": "Remplacer par le repère de session connu",
      "counterparty": ""
    }
  ]
}
```

## Contrôles

Le registre est ordonné et conservé intégralement. Un mouvement déjà intégré ne peut pas être supprimé, réordonné ou modifié. Réimporter la même révision ne consomme rien une seconde fois. Les identifiants dupliqués, objets absents, quantités nulles, négatives ou fractionnaires, dépenses sur un objet, consommations sur une monnaie et transferts sans destinataire sont refusés. Chaque étape doit laisser un solde connu positif ou nul ; une acquisition future ne peut pas financer rétroactivement une dépense impossible.

Les objets connus restent dans la projection même lorsqu’ils ne sont plus possédés. Les valeurs dépassant la précision entière sûre du navigateur sont refusées. Limites du prototype : 300 objets / monnaies et 5 000 mouvements. Comme pour les autres imports, les champs supplémentaires sont refusés et les textes doivent être préparés à partir des seules connaissances publiques.

Le stockage reste local au navigateur ; il ne remplace pas la sauvegarde canonique privée de la partie. Garder la dernière projection publique pour la prochaine session. Vérification : `node check-campaign.mjs`.
