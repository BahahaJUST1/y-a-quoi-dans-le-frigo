const noRecipeText = [
  "Aucune recette n'a été spécifiée, peut-être serait-il temps de de vous débrouiller par vous même pour une fois !",
  "J'ai l'impression que vous allez devoir vous en sortir seul sur ce coup là...",
  "Mince, cette information est manquante, peut-être est-ce volontaire dans le but que personne ne découvre l'ingrédient secret de ce plat ?",
  "Attendez, laissez moi juste le temps d'ouvrir mon livre de cuisine !",
  "Aucune idée mais bon courage !",
  "Vous n'avez qu'à essayer de mélanger tout ce que vous avez sous la main. Avec un peu de chance ça sera peut-être comestible pour le chien du voisin.",
  "Il va falloir improviser, à vous de jouer chef !"
]

export const getNoRecipeText = () => {
  return noRecipeText[Math.floor(Math.random() * noRecipeText.length)];
}