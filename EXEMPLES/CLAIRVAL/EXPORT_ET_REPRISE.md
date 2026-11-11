# Exporter et reprendre la progression publique

L’export permet de déplacer le carnet public de Clairval vers un autre navigateur ou un autre ordinateur. Il contient la projection effectivement intégrée : déplacements, missions, inventaire, état narratif du personnage et dernière décision en attente, selon le format de la campagne.

Ce fichier ne contient ni le parcours libre ni la sauvegarde canonique privée du MJ. Il ne crée pas de synchronisation automatique avec la conversation et ne reconstitue pas des faits qui n’ont jamais été importés.

## Exporter

1. Dans **Carte → Ma campagne** ou **Carnet**, choisir **Exporter la progression**.
2. Vérifier la situation affichée, puis cliquer sur le lien **Télécharger**.
3. Vérifier la présence du fichier `.json` dans les téléchargements et le conserver pour la prochaine session.

Le nom comprend l’identifiant de campagne et la révision, par exemple `clairval-ma-campagne-r12.json`. Le navigateur décide du dossier de destination. Afficher le lien ne signifie pas que le fichier a déjà été enregistré : le téléchargement dépend du clic et des réglages du navigateur.

Le fichier conserve le registre complet, même lorsque une page du site ne montre que les trente dernières opérations. L’export ne modifie ni la révision, ni les quantités, ni les effets actifs, ni les compteurs. Il ne comprend pas un texte collé mais non encore intégré dans le formulaire de mise à jour. Aucune progression de campagne ne peut être exportée avant sa première intégration.

## Restaurer dans un autre navigateur

1. Ouvrir le même prototype Clairval dans le navigateur de destination.
2. Aller dans **Carte → Ma campagne → Restaurer depuis un fichier**.
3. Choisir le fichier `.json`. La lecture reste locale ; aucun fichier n’est envoyé à un serveur.
4. Vérifier l’aperçu : identifiant, révision, lieu, moment, objectif et décision en attente. La lecture du fichier ne remplace encore aucune donnée.
5. Choisir **Intégrer et reprendre**. Après validation et vérification de l’enregistrement local, le site ouvre le carnet à la situation restaurée.

La carte, les missions, les objets, les monnaies et les états restent tels qu’ils figurent dans la projection. Le parcours libre du navigateur de destination reste séparé. Pour reprendre ensuite avec le MJ, fournir aussi cette dernière projection publique à la conversation ; sa sauvegarde privée complète doit rester gérée séparément.

Le même formulaire accepte toujours une mise à jour publique collée en texte après la session. Modifier le texte après la lecture d’un fichier efface son aperçu pour ne pas laisser croire que cet aperçu décrit encore le contenu modifié.

## Protection de la progression existante

La restauration utilise les mêmes contrôles que les mises à jour de session :

- Une révision identique et de même contenu n’ajoute aucun événement en double.
- Une révision plus ancienne ou contradictoire est refusée.
- Un fichier d’une autre campagne ne remplace pas la campagne présente. Utiliser un navigateur ou profil sans campagne intégrée pour consulter cette autre campagne ; il n’existe pas encore de sélecteur de campagnes.
- Les historiques déjà intégrés ne peuvent pas être supprimés ou réécrits silencieusement.
- Les formats 1 à 4 restent lisibles, sans inventer les rubriques absentes des anciens formats.
- Un fichier illisible, un format invalide ou un échec d’enregistrement laisse la progression affichée précédente en place.

La lecture est limitée à 16 Mo, et le texte à quatre millions de caractères, comme les mises à jour collées. Les exports produits par le site sont compacts et compatibles avec cette limite. La validation vérifie la cohérence du format ; elle ne certifie pas l’authenticité des faits racontés dans un texte. Toujours choisir une projection publique préparée à partir des faits joués, jamais une sauvegarde privée du MJ.

Le stockage local reste effaçable par le navigateur. Garder un export effectivement téléchargé avant de changer d’appareil ou d’effacer les données du site. Il n’y a pas d’export automatique en arrière-plan.

## Validation

`node check-campaign.mjs` vérifie le contenu JSON du fichier produit dans un Blob, la restauration exacte dans un stockage vide, l’aperçu sans mutation, la reprise, les doublons, les fichiers anciens / étrangers / invalides, les lectures concurrentes et les échecs de stockage. La destination du téléchargement et la boîte de sélection de fichiers dépendent du navigateur et ne sont pas simulées comme une sauvegarde réellement effectuée.
