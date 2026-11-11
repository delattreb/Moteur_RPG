# Sauvegarde automatique et reprise

Fonctionnement retenu pour la future implémentation, non encore opérationnel. Le dépôt reste un référentiel sans service de persistance ni sauvegarde réelle de partie. Aucune automatisation externe n'est créée par ce document.

Un [prototype de projection publique Clairval](EXEMPLES/CLAIRVAL/MISE_A_JOUR_CAMPAGNE.md) permet désormais d’importer les déplacements confirmés et une reprise de session dans le navigateur. Il ne remplace pas la sauvegarde canonique privée décrite ci-dessous et ne communique pas automatiquement avec la conversation.

Le prototype permet aussi l’[export et la restauration de cette projection publique](EXEMPLES/CLAIRVAL/EXPORT_ET_REPRISE.md) depuis un fichier JSON. La reprise retrouve les registres importés et la dernière décision en attente ; elle ne reconstitue pas l’état privé complet du MJ et ne rend pas automatique la continuité entre conversations.

## Déclenchement
Sauvegarder à chaque fin de session et sur interruption détectée ou demandée, sans redemander une confirmation ordinaire. Une fermeture brutale ou une perte de connexion peut empêcher ce déclenchement : ne pas garantir que des échanges non enregistrés sont récupérables.

L'arrêt du jeu est immédiat ; la sauvegarde ne résout aucune décision en attente. Distinguer session achevée et session interrompue : une interruption conserve la session courante et n'avance ni son compteur ni le jour fictif.

## Contenu
Identifier campagne, version du moteur, version de format, révision, opération d'enregistrement et dernier événement intégré.

Conserver l'état canonique privé : personnage, état, capacités, possessions et transferts, engagements, missions et statuts, relations, faits et initiatives des acteurs, connaissances, géographie, découvertes, temps fictif, session courante, nombre de sessions achevées, situation et décision exacte en attente. Distinguer préparations conditionnelles et faits joués.

Dériver une projection publique contenant seulement les informations accessibles : carnet, PNJ, missions, lore révélé, position connue et trajets réellement parcourus. Aucune intention ou vérité secrète ne rejoint le site, même masquée par son interface.

## Enregistrement vérifiable
1. Préparer une nouvelle révision cohérente depuis le dernier état valide ; garder l'état précédent récupérable.
2. Vérifier IDs, compteurs, transferts, statuts de mission, découvertes et séparation public/privé.
3. Enregistrer la révision par une opération identifiable, puis relire le stockage réellement utilisé.
4. Confirmer la validité seulement si l'état relu correspond à la révision et à l'opération attendues. Ne pas remplacer la dernière révision valide par une écriture partielle.
5. Actualiser le résumé public et publier les vues du site lorsque cette fonction est disponible ; vérifier séparément leur résultat.

Le stockage de campagne doit être défini lors de l'implémentation avec un accès privé adapté. Les sauvegardes réelles, identifiants d'accès et secrets ne sont pas ajoutés au dépôt générique GitHub.

## Résumé et reprise
Le carnet public donne brièvement ce qui a changé, l'objectif et les engagements en cours, le lieu et moment connus, puis la décision en attente. À la reprise, relire la dernière révision valide de la bonne campagne ; rappel en trois phrases maximum, puis retour à cette décision.

Aucun temps fictif ne passe pendant l'absence. Une réparation ne rejoue pas les événements, ne relance pas les dés et ne recompte pas la session : réutiliser l'identifiant d'opération ou les événements intégrés pour éviter les doublons.

## Échecs
Si l'enregistrement échoue ou reste invérifiable, le dire et fournir un résumé public de reprise sans secrets ; conserver ou signaler les événements non enregistrés. Ce résumé n'est pas une sauvegarde canonique complète et ne reconstitue pas les secrets privés.

Si la sauvegarde réussit mais que le site échoue, annoncer séparément « partie sauvegardée ; site non actualisé ». Reprendre la publication de la même révision sans rejouer. Une reprise dont la source manque demande les seuls éléments nécessaires, sans inventer une continuité.

## Contrôles de l'implémentation
Fin normale : une session achevée comptée une fois. Interruption : décision intacte et compteur inchangé. Écriture partielle : ancienne révision valide disponible. Nouvel essai : aucun doublon. Échec de site : sauvegarde conservée. Nouvelle conversation : même campagne, même révision et mêmes faits. Ressources publiques : aucun secret.
