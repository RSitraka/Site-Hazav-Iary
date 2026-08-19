---
title: "Dimensionner son installation solaire : le guide de calcul complet"
description: "La méthode pas à pas pour calculer votre consommation en kWh, le nombre de panneaux, la capacité de batterie et la puissance d'onduleur nécessaires — avec les formules et un exemple chiffré."
date: "2026-06-28"
author: "Hazav'Iary"
category: "Guides techniques"
keywords:
  - "dimensionnement installation solaire"
  - "calcul nombre de panneaux solaires"
  - "calcul capacité batterie solaire"
  - "puissance onduleur solaire"
---

Dimensionner, c'est répondre à quatre questions dans l'ordre : combien je consomme, combien il faut produire, combien il faut stocker, et quelle puissance instantanée je dois pouvoir délivrer. Prenez ces étapes dans le désordre et vous obtiendrez un système soit inutilement cher, soit décevant.

Voici la méthode que nos ingénieurs appliquent sur chaque projet.

## Étape 1 — Calculer la consommation réelle

Aucun raccourci ici : il faut lister les appareils un par un.

Pour chacun, notez trois valeurs : la **puissance** en watts (indiquée sur la plaque signalétique), la **durée d'utilisation quotidienne** en heures, et la **quantité**.

```
Consommation mensuelle (kWh) = Puissance (W) × Heures/jour × Quantité × 30 ÷ 1000
```

**Exemple pour un foyer type :**

| Appareil | Puissance | Heures/jour | Qté | kWh/mois |
| --- | --- | --- | --- | --- |
| Ampoules LED | 9 W | 5 h | 8 | 10,8 |
| Réfrigérateur | 150 W | 8 h | 1 | 36,0 |
| Téléviseur | 90 W | 5 h | 1 | 13,5 |
| Box internet | 15 W | 24 h | 1 | 10,8 |
| **Total** | | | | **71,1 kWh/mois** |

Soit environ **2,37 kWh par jour**. C'est le chiffre de départ de tout le reste.

Attention au réfrigérateur : sa plaque indique la puissance du compresseur, mais celui-ci ne tourne pas en continu. Compter 8 heures effectives par jour est une approximation raisonnable pour un appareil récent.

## Étape 2 — Calculer la puissance photovoltaïque

Un panneau ne produit pas sa puissance nominale toute la journée. On raisonne en **heures d'ensoleillement équivalent plein soleil** : à Madagascar, on retient couramment 5 heures en moyenne annuelle, à ajuster selon la région et la saison.

Il faut également tenir compte des pertes du système — câblage, rendement de l'onduleur, température des modules, salissure. Un rendement global de 75 % est une hypothèse prudente et réaliste.

```
Puissance crête (Wc) = Consommation journalière (Wh) ÷ (Heures plein soleil × 0,75)
```

Avec nos 2 370 Wh/jour :

```
2 370 ÷ (5 × 0,75) = 632 Wc
```

Avec des panneaux de 550 Wc, il faut donc **2 panneaux** (arrondi supérieur), soit 1 100 Wc installés. La marge obtenue par l'arrondi n'est pas du gaspillage : elle absorbe les journées couvertes.

## Étape 3 — Dimensionner le parc batterie

Une batterie ne se vide jamais complètement, sous peine de la détruire. C'est la **profondeur de décharge** (DoD) :

- Plomb GEL ou AGM : 50 % maximum
- Lithium LiFePO4 : 80 à 90 %

```
Capacité utile (kWh) = Consommation journalière × Jours d'autonomie ÷ DoD
```

Pour un jour d'autonomie avec du lithium à 85 % :

```
2,37 × 1 ÷ 0,85 = 2,79 kWh
```

Avec du plomb à 50 %, il faudrait 4,74 kWh — près du double pour le même service rendu. C'est la raison pour laquelle le lithium, malgré un prix d'achat supérieur, revient souvent moins cher au kWh restitué.

Pour convertir en ampères-heures, divisez par la tension du parc :

```
Ah = kWh × 1000 ÷ Tension du parc (V)
```

Soit, en 48 V : `2 790 ÷ 48 ≈ 58 Ah`.

## Étape 4 — Choisir la puissance d'onduleur

L'onduleur ne se dimensionne pas sur la consommation, mais sur la **puissance appelée simultanément**. Additionnez la puissance de tous les appareils, appliquez un coefficient de simultanéité (0,6 à 0,7 pour un foyer : tout ne fonctionne jamais en même temps), puis une marge de sécurité de 30 %.

```
Puissance onduleur (kVA) = Somme des puissances × 0,65 × 1,3 ÷ 1000
```

Dans notre exemple : `(72 + 150 + 90 + 15) × 0,65 × 1,3 ÷ 1 000 ≈ 0,28 kVA`. On retiendra un onduleur de 1 kVA, la plus petite taille courante — avec de la marge pour les usages futurs.

**Piège classique :** les moteurs (pompes, compresseurs, climatiseurs) appellent 3 à 5 fois leur puissance nominale au démarrage. Une pompe de 750 W peut demander 3 000 W pendant une seconde. Si votre installation en comporte, l'onduleur doit être choisi sur cette pointe, pas sur la puissance nominale.

## Erreurs les plus fréquentes

- **Oublier les veilles.** Une box internet à 15 W consomme 10,8 kWh par mois, autant que huit ampoules LED. Les appareils allumés en permanence pèsent lourd.
- **Se fier à la facture d'électricité seule.** Elle donne un total, pas la répartition jour/nuit — or c'est la consommation nocturne qui dimensionne les batteries.
- **Dimensionner sur la moyenne annuelle.** La saison des pluies produit nettement moins. Un système calculé sur la moyenne déçoit systématiquement en janvier et février.
- **Négliger la section des câbles.** En basse tension continue, les pertes en ligne montent vite. Un câble sous-dimensionné peut coûter 5 à 10 % de production.

## Vérifiez votre calcul

Notre [simulateur solaire](/simulateur) applique exactement ces formules : vous listez vos appareils et il affiche instantanément consommation mensuelle, nombre de panneaux, capacité batterie et puissance d'onduleur.

Reste ensuite la partie qu'aucun calcul en ligne ne remplace : l'orientation réelle de la toiture, les ombrages portés, les longueurs de câbles et les pointes de démarrage. C'est l'objet de notre [audit sur site](/services/audit-energetique-dimensionnement).
