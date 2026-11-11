# Historique

Versions du dépôt, classées de la plus récente à la plus ancienne. Les versions 1.3.1 à 1.7.0 étaient documentées sur main sans release GitHub dédiée.

## À venir

- Auvrenne : fonction serveur record_auvrenne_session pour enregistrer depuis le chat une séance réellement jouée, sans recopie sur le site. Contrôle de version, protection contre les doublons et conservation des notes et favoris.
- Protocole de fin de séance et documentation du chat mis à jour ; tests SQL reproductibles en transaction annulée. L’accès au connecteur reste nécessaire dans le chat de jeu.


- Carte Auvrenne : noms replacés sur des cartouches de parchemin, typographie gothique avec polices de repli, zoom minimal lisible et défilement horizontal. Contrôles de chevauchement des noms et repères.


- Journal de partie Auvrenne : départ initialisé à Valcroix, séances publiques, jour fictif, position consignée et état de la mission.
- Carte : distinction entre repères connus, positions consignées et position actuelle ; observations publiques accessibles dans les fiches.
- Lecture des anciens carnets version 1 avec conservation des notes et favoris ; sauvegarde version 2, restauration et validation testées.
- Ressources chiffrées non définies : argent, flèches, provisions et blessures restent à suivre dans les résumés. Aucune scène créée automatiquement.


- Charte d’Auvrenne restaurée dans le style chaud de la version précédente : bois, parchemin, menus illustrés, portraits et fiches de personnages.
- Retour de la besace, de l’inventaire et de quatre fiches d’équipement, sans modifier le scénario ni les sauvegardes.

- Adaptation préparatoire à Auvrenne : carnet médiéval chaleureux, portrait de Corbec, carte initiale, lore et appel d’Alix.
- Notes et repères favoris synchronisés dans un espace de sauvegarde distinct ; la démonstration Clairval et sa sauvegarde sont conservées.
- Aucune scène, mission acceptée ou déplacement joué créé par cette adaptation. Pas de nouvelle release pour cette étape.

## 1.9.0 — 11 novembre 2026

- Supabase Auth : inscription, confirmation par e-mail, connexion et déconnexion ; accès au carnet après vérification de session.
- Sauvegarde par compte du parcours et de la projection publique, avec RLS et contrôle atomique de version.
- Synchronisation automatique après modification, récupération à l’ouverture et au retour sur l’onglet, reprise réseau.
- Divergences conservées sans écrasement automatique ; commandes de choix manuel et import de l’ancien carnet.
- Cache local séparé par compte ; export autonome hors ligne conservé.
- Hébergement GitHub Pages par workflow manuel ; correction de la superposition du décor et du contraste des commandes.

Validation : tests Auth, cloud, synchronisation et campagne réussis ; RLS et concurrence testées en base. Le joueur a confirmé la connexion et les transferts manuel puis automatique sur deux appareils.

Limites : une sauvegarde cloud sans historique, pas de fusion automatique ni de synchronisation de la conversation ou des secrets du MJ. La récupération se fait à l’ouverture et au retour sur l’onglet.

## 1.8.0 - 11 novembre 2026
- Carte explorable depuis Vaucombe : sept lieux, chemins parcourus, position et progression locale.
- Mode campagne séparé du parcours libre, alimenté par les faits publics confirmés importés en fin de session.
- Missions : En cours, Possibilités et Historique, engagements acceptés, faits connus, décisions et issues confirmées.
- Inventaire : réceptions, consommations, transferts, pertes et dépenses ; quantités inconnues conservées et soldes connus négatifs refusés.
- État narratif du personnage : blessures, fatigue, effets temporaires, conséquences concrètes et récupérations confirmées, sans jauges ni guérison automatique.
- Export JSON et restauration avec aperçu, retour au carnet et conservation des registres sans doublons.
- Format public 4 ; lecture des formats 1, 2 et 3 conservée. Un modèle vierge et les guides sont fournis.
- Distribution légère : illustration WebP partagée ; HTML autonome généré localement, PNG source et HTML généré exclus du dépôt.
- Historique des versions du README remis dans l’ordre décroissant ; correction de l’entrée 1.6.0 qui avait été attribuée à tort à la 1.7.0.

Validation : contrôles automatisés du parcours libre et de la campagne réussis. Une courte scène jouée a été rejouée dans le moteur de validation, exportée puis restaurée dans un stockage isolé : position, mission accomplie, objets, monnaie et blessure conservés sans double décompte. Aucune dépense n’a été jouée pendant cette scène ; les dépenses sont couvertes par les tests automatisés. Le rendu visuel et le téléchargement natif dans le navigateur restent à vérifier.

Limites : projection publique locale, import manuel, aucune synchronisation automatique avec la conversation ni sauvegarde canonique privée du MJ. L’export de la partie de test reste hors du dépôt générique.

## 1.7.0 - 11 novembre 2026
- Distribution allégée : illustration WebP de 358 Ko ; PNG source et HTML autonome exclus du dépôt.
- Ajout de la démonstration médiévale Clairval validée : carte peinte, menus illustrés et portraits de Ysilde, Garin et Perrin.
- Six rubriques, sept lieux, quatre objets, recherche de personnages et filtres de quêtes.
- Livraison des sources, de l'illustration WebP et des scripts ; HTML autonome généré localement.
- Documentation mise à jour ; sauvegarde de campagne et découverte automatique de la carte restent à implémenter.

Validation : contrôles automatisés Clairval réussis. Mise à jour de main sans nouvelle release GitHub.

## 1.6.0 — 11 novembre 2026
- Missions réparties entre En cours, Possibilités et Historique, avec modèle public vierge.
- Guidage léger : faits connus et suggestion discrète si nécessaire, sans solution révélée.
- Sauvegarde automatique prévue à chaque fin de session et interruption détectée.
- Révision vérifiée, état MJ séparé, projection publique et résumé de reprise.
- Interruptions sans progression fictive ; réparations sans rejouer ni compter deux fois.
- Échecs d'enregistrement et de publication distingués explicitement.

Validation documentaire : liens internes et cohérence des références. Aucune sauvegarde réelle ajoutée ; persistance, site et reprise automatique non implémentés. Mise à jour de main sans nouvelle release GitHub.

## 1.5.0 — 11 novembre 2026
- Présentation validée : galerie de portraits ouvrant les pages individuelles du carnet.
- Identité connue, rencontres, relation observable, affaires en cours et dernière nouvelle.
- Personnes seulement évoquées distinguées comme connues de nom, sans portrait inventé.
- Relations décrites par leurs causes, sans jauge chiffrée ni révélation de loyauté secrète.
- Modèle public vierge, continuité visuelle et cohérence avec les engagements du personnage.

Validation documentaire : liens et références vérifiés. Galerie et pages non encore implémentées. Le suivi des missions n'est pas inclus ; aucune nouvelle release GitHub créée.

## 1.4.0 — 11 novembre 2026
- Carnet personnel illustré retenu pour la fiche du personnage sur le site.
- Cinq rubriques : identité, état, savoir-faire, possessions et engagements.
- Portraits, objets et annotations adaptés à l'univers avec continuité graphique.
- Modèle public vierge et règles de mise à jour fondées sur les faits joués.
- Texte accessible indépendamment des images ; lisibilité mobile et exclusion des secrets.
- Questionnaire, instructions MJ et spécification du site alignés sur ce choix.

Validation documentaire : liens internes, cohérence des versions et modèle sans données de partie. Site, images et carnet non encore implémentés. Mise à jour de main ; aucune nouvelle release GitHub créée.

## 1.3.1 — 11 novembre 2026
- Parcours explicite séparant maintenance du moteur, nouvelle campagne et reprise.
- Questionnaire propre à chaque nouvelle campagne ; reprise des réponses accessibles sans répétition.
- Validation du cadre avant préparation du scénario et du site ; début de partie demandé séparément.
- Changement de mode Chat/Work sans effet sur la campagne.
- Tableau de contrôle des parcours, sans ajout de sauvegarde ni d'application.

Validation documentaire des liens et cohérence des consignes. La release 1.3.0 reste inchangée ; cette correction est publiée sur main.

## 1.3.0 — 11 novembre 2026
- Questionnaire progressif de création d'univers, modèle de lore et direction graphique adaptée.
- Spécification du site : lore public consultable et carte stylisée découverte par les déplacements ; géographie privée exclue des ressources publiques.
- Site et carte non encore implémentés : leur création suivra la validation de l'univers.
- Guide de construction : conflit central, échéance, quatre à six acteurs et deux intrigues secondaires facultatives.
- Modèle privé vierge de campagne avec décisions, conséquences et préparation conditionnelle de deux sessions.
- Exemple indépendant « Le passage des Hautes-Eaux » : cinq acteurs, initiatives révisables, issues multiples et première journée préparée.
- Vérification des branches : les choix conservent des effets dans la session suivante.

Validation documentaire : liens, cohérence de version et présence des variantes initiales. Le nouvel exemple et la campagne complète ne sont pas encore joués. Aucune sauvegarde ajoutée.

## 1.2.0 — 11 novembre 2026
- Cadre choisi : 60 sessions de 10 à 15 minutes, deux par jour réel joué et par journée fictive.
- Architecture sur trente jours fictifs, dénouement et épilogue préparés.
- Détail limité aux deux prochaines sessions, réévaluation tous les cinq jours fictifs.
- Absences et interruptions sans consommation automatique de temps fictif.
- Préservation des choix aux transitions ; aucun remplissage pour tenir le calendrier.

Validation documentaire et contrôle du découpage des soixante sessions. Campagne complète non encore testée.

## 1.1.0 — 11 novembre 2026
- Démarches complètes : entretien utile et résultat regroupés sans menus question par question.
- Preuves débouchant sur des issues concrètes ; distinction entre objectif et mystère secondaire.
- Clôture des missions et conséquences des compromis, sans prolongation automatique du litige.
- Transitions variées et respirations, sans incident obligatoire.
- Choix de réponse toujours numérotés, action libre comprise ; numéro seul accepté.
- Modèle et scène test enrichis avec les critères de vérification.

Validation : essai conversationnel court, retour joueur « c'est mieux » après correction du rythme. Aucun historique de partie ni sauvegarde ajouté ; contrôle des fichiers avant publication. Efficacité sur une campagne longue non évaluée.

## 1.0.0 — 11 novembre 2026
Première distribution propre du moteur narratif.

- Tour par intention complète et arrêt à la prochaine décision substantielle.
- Scènes organisées autour d'un enjeu, d'un obstacle et d'approches libres.
- Conséquences durables et initiatives des PNJ selon le temps fictionnel.
- Diagnostic de stagnation et alternance pression/respiration sans quota d'incidents.
- Résolution narrative et option de dés explicitement choisie.
- Démarrage, instructions MJ, modèle vierge et scène test indépendante.

Aucune campagne, sauvegarde, archive historique ou dépendance externe. Contrôle documentaire effectué ; scène test non encore jouée.
