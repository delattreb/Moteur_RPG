# Jouer avec le carnet d’Auvrenne

La partie se joue dans la conversation. Le site conserve un journal public des faits joués ; consulter une fiche ne déplace pas Corbec.

## Initialisation

Dans **Carnet**, utiliser **Initialiser le départ** : jour 1, Valcroix, zéro séance, mission proposée. Les notes et favoris sont conservés. Cette initialisation est sans effet si une partie est déjà enregistrée.

## Après une séance

Le mode prévu est la sauvegarde directe depuis le chat de jeu, sans recopie. L’assistant applique [le protocole de sauvegarde](../AUVRENNE/SAUVEGARDE_CHAT.md), enregistre uniquement les faits joués et confirme après relecture en ligne. Le connecteur Supabase doit être disponible dans le chat ; sinon la sauvegarde est annoncée non confirmée.

Le formulaire **Journal de partie → Consigner une séance jouée** reste une solution manuelle facultative. Ne pas l’utiliser pour recopier une séance déjà sauvegardée par le chat : cela créerait une autre entrée.

La carte distingue les lieux connus, les positions consignées et la position actuelle. Les observations consignées apparaissent dans la fiche du lieu de fin. Si une séance comporte plusieurs lieux, ils doivent être décrits dans le résumé : seul le lieu de fin est ajouté aux repères de progression.

Les compteurs suivent les séances consignées. Les absences réelles ne font pas avancer le temps. L’argent, les flèches, les provisions et les blessures restent à suivre dans les résumés ; aucun inventaire chiffré n’est inventé.

## Sauvegarde

Les anciens carnets préparatoires version 1 sont lus en version 2, avec conservation des notes et favoris. La clé locale et le compte de sauvegarde restent les mêmes. Une partie initialisée n’est pas considérée comme un carnet vide lors de la synchronisation. Vérifier le statut de sauvegarde en ligne avant de changer d’appareil.

Les versions antérieures du site ne savent pas lire une partie commencée : recharger le site sur les autres appareils avant de reprendre. Une copie invalide n’est pas effacée automatiquement.

## Validation

`node check-auvrenne.mjs` couvre préparation, migration, fiches, journal, validation, restauration automatique, conservation des données après erreur et isolation entre comptes. La vérification utilise un DOM simulé et un stockage cloud simulé ; elle ne constitue pas un essai visuel ni un enregistrement dans le compte du joueur.
