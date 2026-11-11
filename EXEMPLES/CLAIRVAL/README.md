# Clairval — démonstration médiévale

Exemple fictif indépendant. Ouvrir dist/index.html ou servir dist/ avec un serveur statique. Générer le HTML autonome localement avec node build-clairval.mjs ; il est exclu du dépôt.

Carte centrale sur parchemin, six rubriques illustrées, portraits de Ysilde, Garin et Perrin, sept lieux et quatre objets consultables. Quêtes filtrables et recherche des personnages.

Construction : `node build-clairval.mjs`.
Vérification : `node check-clairval.mjs`.

Illustration dans `dist/assets/medieval-art.webp`, intégrée au fichier autonome. Aucun accès Drive, sauvegarde de campagne ou secret MJ. La découverte progressive fonctionne dans le parcours libre décrit ci-dessous. La synchronisation automatique des progressions publiques via Supabase est disponible dans l’édition en ligne ; la sauvegarde privée du MJ reste à implémenter.

Distribution légère : illustration WebP unique, fichiers HTML/CSS/JS séparés ; PNG source et HTML autonome exclus du dépôt.

## Carte explorable — version 1.8.0

Le parcours commence à Vaucombe. Choisir une direction dans le panneau sous la carte révèle un lieu à l’arrivée. Seuls les lieux atteints sont marqués ; les chemins parcourus restent tracés. Les fiches présentent les observations connues et les personnages rencontrés à Vaucombe. Les vingt dernières étapes apparaissent sous la carte.

La progression de démonstration est enregistrée dans le stockage local du navigateur, avec vérification après écriture. Elle revient au rechargement sur la même origine. Un stockage bloqué ou plein laisse le parcours utilisable et affiche son caractère temporaire. Des données invalides ramènent au point de départ avec un avertissement. Effacer les données du navigateur efface cette progression ; changer de navigateur ou d’adresse ne la transfère pas.

Le bouton « Recommencer le parcours » demande confirmation. Cette exploration libre ne résout pas les quêtes, ne fait pas avancer le temps fictif et ne modifie aucune sauvegarde de campagne. Les noms et positions de la démonstration sont présents dans ses sources publiques : le voile est une mécanique de découverte, pas une protection de secrets MJ.

## Carte de campagne — version 1.8.0

Le mode **Ma campagne** utilise une mise à jour publique importée après la session. Les déplacements libres y sont désactivés. La position, les lieux découverts, les chemins et le carnet de reprise proviennent des faits confirmés importés. L’historique est contrôlé et les doublons sont refusés. Il n’y a pas de liaison automatique avec la conversation, ni de sauvegarde canonique du MJ dans ce site.

Voir le [guide de mise à jour de campagne](MISE_A_JOUR_CAMPAGNE.md) et le [modèle JSON public](../../MODELES/MISE_A_JOUR_CARTE_CLAIRVAL.json). Vérification : `node check-campaign.mjs`.

Les **quêtes de campagne** sont aussi reliées à cet import au format 2 : En cours, Possibilités et Historique, avec faits, pistes, engagements, personnages, lieux et prochaine décision ou issue confirmée. Les anciennes projections au format 1 restent lisibles. Voir le [guide des missions](MISSIONS_CAMPAGNE.md).

L’**inventaire de campagne** utilise le format 3 : quantités calculées depuis les réceptions, consommations, transferts, pertes et dépenses. Les monnaies sont suivies séparément, les quantités inconnues restent inconnues et les mouvements déjà intégrés ne sont pas rejoués. Les formats 1 et 2 restent lisibles. Voir le [guide de l’inventaire](INVENTAIRE_CAMPAGNE.md).

L’**état du personnage** apparaît dans le carnet au format 4 : blessures, fatigue et effets temporaires, conséquences concrètes et récupération confirmée, sans jauges. Le journal est conservé ; aucun état n’évolue automatiquement pendant une absence. Les formats précédents restent lisibles. Voir le [guide de l’état du personnage](ETAT_PERSONNAGE.md).

L’**export et la reprise** permettent de télécharger cette progression publique en JSON et de la restaurer dans un autre navigateur. L’aperçu précède l’intégration ; le carnet retrouve ensuite la dernière décision en attente. Voir le [guide d’export et de reprise](EXPORT_ET_REPRISE.md). Le fichier ne remplace pas la sauvegarde privée complète du MJ.

## Connexion du site en ligne

Le site `dist/index.html` utilise désormais Supabase Auth avant l’ouverture du carnet. Voir [la configuration et les limites de protection](AUTH_SUPABASE.md). La [synchronisation automatique Supabase](SAUVEGARDE_CLOUD.md) transfère le parcours et la projection publique entre appareils, avec suspension en cas de divergence. L’export HTML autonome reste une démonstration hors ligne sans authentification.
