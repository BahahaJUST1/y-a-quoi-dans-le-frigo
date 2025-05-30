-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 28 mai 2025 à 10:01
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `y-a-quoi-dans-le-frigo`
--

-- --------------------------------------------------------

--
-- Structure de la table `deleted_global_items`
--

DROP TABLE IF EXISTS `deleted_global_items`;
CREATE TABLE IF NOT EXISTS `deleted_global_items` (
  `user_id` int NOT NULL,
  `item_type` enum('dish','ingredient') COLLATE latin1_general_ci NOT NULL,
  `item_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`item_type`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
CREATE TABLE IF NOT EXISTS `dishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `preparation_time` int DEFAULT NULL,
  `number_of_people` int NOT NULL DEFAULT '2',
  `favourite` tinyint(1) DEFAULT '0',
  `recipe` varchar(2000) COLLATE latin1_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  `is_global_item` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dishes_user_id_users_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `preparation_time`, `number_of_people`, `favourite`, `recipe`, `image`, `user_id`, `is_global_item`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Risotto chorizo et courgettes', 90, 2, 0, '(1) Émincer finement l\'oignon et couper les courgettes et le chorizo en dés\r\n(2) Chauffer 1/2L d\'eau et fondre le cube de bouillon\r\n(3) Faire revenir l\'oignon avec de l\'huile d\'olive puis ajouter les courgettes et enfin le chorizo\r\n(4) Ajouter le riz (cru) et mélanger en continu pendant 3/4 min\r\n(5) Verser le vin blanc et le laisser s\'évaporer\r\n(6) Sur feu doux, verser le bouillon louche après louche dès que la précédente a été absorbée par le riz, couvrir avec un couvercle pour aider à absorber et remuer de temps en temps\r\n(7) Ajouter le parmesan, mélanger et servir', 'dishes/kgrwedypzh9qbwi67y7p', 1, 0, '2025-02-26 10:37:01', '2025-02-26 10:37:01', NULL),
(2, 'Galettes de maïs frit', 30, 1, 0, '- Mélanger farine œuf levure pour obtenir une pâte\n- Ajouter sel et poivre\n- Ajouter maïs\n- Verser cuillère sur poêle avec fond d\'huile', 'dishes/ntcyampg1adkgucfyudo', 1, 0, '2025-02-26 10:37:01', '2025-02-26 10:37:01', NULL),
(3, 'Sauce au poivre', 15, 1, 0, '- Faire fondre sur feux doux le beurre \r\n- Une fois fondu, ajouter la farine et faire cuire jusqu\'à ce que le mélange perde en couleur pour être pâle\r\n- Faire fondre le cube de bouillon dans une demi tasse d\'eau et l\'ajouter au reste de la sauce\r\n- Ajouter le poivre et faire épaissir', 'dishes/zz8mawkqq3fhbsktfpg4', 1, 0, '2025-02-26 15:09:14', '2025-02-26 15:09:14', NULL),
(4, 'Sauce au beurre blanc', 15, 2, 0, 'Faire réduire le vin blanc avec l\'échalote (ça veut dire faire cuire à feu vif pour faire diminuer la quantité jusqu\'à ce qu\'il n\'en reste plus que 2 c.a.s)\r\n\r\nBaisser le feu et ajouter le beurre progressivement en fouettant\r\n\r\nFiltrer la sauce pour enlever l\'échalote et servir', 'dishes/sr0lp31fikycgx0n23jj', 1, 0, '2025-03-06 11:21:33', '2025-03-06 11:21:33', NULL),
(5, 'Gâteau de semoule', 10, 4, 0, 'Faire chauffer le lait avec le sucre et le sucre vanillé sur feu max\r\n\r\nQuand le lait est très chaud : mettre la semoule et baisser le feu\r\n\r\nRemuer pendant 2min\r\n\r\nVerser dans un moule et laisser refroidir à température ambiante\r\n\r\nUne fois tiède, le conserver au frigo avant démoulage, le gâteau doit être compact pour pouvoir tenir une fois démoulé', 'dishes/ugebw2zo9k5uzanqsuer', 1, 0, '2025-03-06 11:44:06', '2025-03-06 11:44:06', NULL),
(6, 'Rougaille saucisse', 45, 2, 1, '- Piquer les saucisses et les mettre dans l\'eau bouillante pendant 5min\r\n- Faire revenir les oignons et l\'ail écrasé dans une poêle\r\n- Couper les saucisses en tronçons de 1,5cm puis les ajouter à la poêle\r\n- Au bout de 5min, ajouter les tomates en petit morceaux ainsi que les épices\r\n- Laisser mijoter sur feu doux en ôtant le couvercle de temps en temps pour enlever l\'excès d\'eau', '	\r\ndishes/eb4npfrr5chkysuxznzz', 1, 0, '2025-03-06 14:35:43', '2025-03-06 14:35:43', NULL),
(7, 'Pancakes', 120, 8, 0, '- Faire fondre le beurre dans une casserole à feu doux ou dans un bol au micro-ondes\r\n- Mettre la farine, la levure et le sucre dans un saladier, mélanger puis creuser un puit\r\n- Ajouter les œufs et fouetter le tout\r\n- Ajouter le beurre fondu, fouetter et ajouter progressivement le lait\r\n- Laisser reposer la pâte 1h au frigo\r\n- Dans une poêle chaude et huilée, faire cuire comme des crêpes mais en les faisant plus petites', 'dishes/x2jjxdrgyxpaiyyiw9nf', 1, 0, '2025-03-21 09:32:57', '2025-03-21 09:32:57', NULL),
(8, 'Curry de pois chiches', 45, 2, 1, '- Faire revenir les oignons et l\'ail dans une poêle\r\n- Ajouter les épices et remuer\r\n- Ajouter les tomates pelées puis les pois chiches et mélanger\r\n- couvrir et laisser mijoter 10-20min à feu doux', 'dishes/ijiayu6w8wu2jxuxjso3', 1, 0, '2025-03-21 09:32:57', '2025-03-21 09:32:57', NULL),
(38, 'Fondant au chocolat', 35, 6, 0, '1. Préchauffer le four à 180°C (thermostat 6). Faire fondre le chocolat et le beurre au bain-marie à feu doux, ou au micro-ondes sur le programme \"décongélation\".\n\n2. Pendant ce temps, séparer les jaunes des blancs d\'oeuf.\n\n3. Monter les blancs en neige ferme. Réserver.\n\n4. Quand le mélange chocolat-beurre est bien fondu, ajouter les jaunes d’oeufs et fouetter.\n\n5. Incorporer le sucre et la farine, puis ajouter les blancs d’oeufs sans les casser.\n\n6. Beurrer et fariner un moule à manqué et y verser la pâte à gâteau.\n\n7. Enfourner pendant 20 minutes.\n\n8. Quand le gâteau est cuit, le laisser refroidir avant de le démouler.', 'dishes/gtxwuofurq5y8cklqyut', 1, 1, '2025-04-22 14:37:33', '2025-04-22 14:37:33', NULL),
(39, 'Crêpes', 5, 4, 0, 'Tout mélanger en même temps dans un saladier\nVerser des louches de pâtes à crêpes dans une poêle\nDéguster', 'dishes/cqdwnsdhu8jn5idwv55i', 1, 0, '2025-04-23 06:22:01', '2025-04-23 06:22:01', NULL),
(40, 'Boeuf bourguignon', 60, 4, 0, 'Détailler la viande en cubes de 3 cm de côté, enlever les gros morceaux de gras.\nCouper l\'oignon en morceaux. Le faire revenir dans une poêle au beurre. Une fois transparent, le verser dans une cocotte en fonte de préférence.\nProcéder de même avec la viande mais en plusieurs fois, jusqu\'à ce que tous les morceaux soient cuits. Les ajouter au fur et à mesure dans la cocotte. Ne pas avoir peur d\'ajouter du beurre entre chaque fournée.\nQuand toute la viande est dans la cocotte, déglacer la poêle avec de l\'eau ou du vin et faire bouillir en raclant pour récupérer le suc. Saler, poivrer, ajouter au reste.\nRecouvrir le tout avec une partie du vin et faire mijoter quelques heures avec le bouquet garni et les carottes en rondelles.\nLe lendemain, faire mijoter au moins 2 heures en plusieurs fois, ajouter du vin ou de l\'eau si nécessaire.', 'dishes/hwv4fw4amywc1qglwlnw', 1, 0, '2025-04-23 06:25:59', '2025-04-23 06:25:59', NULL),
(41, 'Blanquette de veau', 135, 2, 0, '1. Faire revenir la viande dans un peu de beurre doux jusqu\'à ce que les morceaux soient un peu dorés.\n\n2. Saupoudrer de 2 cuillères de farine. Bien remuer.\n\n3. Ajouter 2 ou 3 verres d\'eau, les cubes de bouillon, le vin et remuer. Ajouter de l\'eau si nécessaire pour couvrir.\n\n4. Couper les carottes en rondelles et émincer les oignons puis les incorporer à la viande, ainsi que les champignons.\n\n5. Laisser mijoter à feu très doux environ 1h30 à 2h00 en remuant.\n\n6. Si nécessaire, ajouter de l\'eau de temps en temps.\n\n7. Dans un bol, bien mélanger la crème fraîche, le jaune d’oeuf et le jus de citron. Ajouter ce mélange au dernier moment, bien remuer et servir tout de suite.', 'dishes/xbccek4rjsuvcojylwk2', 1, 0, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(42, 'Quiche lorraine', 55, 4, 0, '1. Préchauffer le four à 180°C (thermostat 6). Etaler la pâte dans un moule,\n\n2. la piquer à la fourchette. Parsemer de copeaux de beurre.\n\n3. Faire rissoler les lardons à la poêle puis les éponger avec une feuille d\'essuie-tout.\n\n4. Battre les oeufs, la crème fraîche et le lait.\n\n5. Ajouter les lardons.\n\n6. Assaisonner de sel, de poivre et de muscade.\n\n7. Verser sur la pâte.\n\n8. Cuire 45 à 50 min.\n\n9. C\'est prêt', 'dishes/n6vyawfhenrfjuehesbs', 1, 0, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(43, 'Compote de pommes', 25, 2, 0, '1. Peler vos pommes, les couper en huitième et les épépiner.\n\n2. Dans une casserole porter à ébullition l\'eau, le sucre et les gousses de vanille fendues et grattées.\n\n3. Quand l\'eau est portée à ébullition y ajouter les pommes.\n\n4. Faire cuire à feu doux en remuant de temps en temps.', 'dishes/os1s2eosuthrjdsxtnvw', 1, 0, '2025-04-23 06:37:52', '2025-04-23 06:37:52', NULL),
(44, 'Choucroute alsacienne', 150, 6, 0, 'Laver la choucroute (1 fois par trimestre à partir de septembre) : si on fait la choucroute en septembre 1 lavage suffit, si on fait la choucroute en décembre, la laver 2 fois de suite à l\'eau, si on fait la choucroute en mars la laver 3 fois de suite... La choucroute étant du chou fermenté, elle est de plus en plus acide avec le temps! Bref, la rincer et bien la presser avec les doigts\nMettre 1 oignon coupé en 4 au fond d\'une grande cocotte et le faire revenir dans un corps gras (un peu d\'huile ou du saindoux..)\nAjouter la moitié de la choucroute bien essorée\nAjouter par dessus la viande : la palette, le lard fumé, les saucisses fumées de Montbéliard\nRecouvrir la viande avec le reste de la choucroute et mouiller jusqu\'à recouvrir la choucroute avec moitié eau avec la tablette de bouillon et moitié Riesling\nAjouter les grains de genièvre. Ne pas saler\nCouvrir et laisser cuire à feu doux 2 h environ\nPar ailleurs, mettre les pommes de terre dans une casserole d\'eau salée départ eau froide et laisser cuire 15 min et les éplucher\nAu bout de 1h 45 de cuisson de la choucroute soit environ 1/4 h avant la fin de la cuisson : ouvrir la cocotte et ajouter sous la choucroute les pommes de terre cuites. Ajouter également à ce moment là sous la choucroute les saucisses de Strasbourg (si on n\'est pas si on n\'est pas sûr de l\'heure du repas, on attendra et on les fera cuire à part 10 min dans de l\'eau doucement, car si elles ont trop cuites elles éclatent) et le cervelas coupé en 2 dans le sens de la longueur', 'dishes/pkclbmuqwplqc8jil6qb', 1, 0, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(45, 'Spaghetti carbonara (recette française)', 20, 2, 0, 'Cuire les spaghetti\nEmincer les oignons et les faire revenir à la poêle\nUne fois dorés ajouter les lardons\nAjouter la crème ainsi que le thym\nMélanger le tout avec les pâtes et servir', 'dishes/ggtiagyykan66exaizk4', 1, 0, '2025-04-23 06:55:24', '2025-04-23 06:55:24', NULL),
(46, 'Spaghetti carbonara (recette traditionnelle)', 20, 2, 0, 'Cuire les spaghetti\nBattre les jaunes d\'oeufs avec le parmesan\nDécouper la poitrine fumée en gros dés\nLes faire revenir dans une poêle bien chaude jusqu’à ce que les dés soient légèrement roussis\nMélanger le tout avec les pâtes et servir', 'dishes/g9ra1ngme7lkkzzbjb30', 1, 0, '2025-04-23 08:44:24', '2025-04-23 08:44:24', NULL),
(47, 'Mousse au chocolat', 15, 4, 0, 'Séparer les blancs des jaunes d\'oeufs.\nFaire ramollir le chocolat dans une casserole au bain-marie.\nHors du feu, incorporer les jaunes et le sucre.\nBattre les blancs en neige ferme.\nAjouter délicatement les blancs au mélange à l\'aide d\'une spatule.\nVerser dans une terrine ou des verrines.\nMettre au frais 2h minimum.', 'dishes/qq3wqfrueb6ysla9zao8', 1, 0, '2025-04-29 10:39:25', '2025-04-29 10:39:25', NULL),
(48, 'Omelette pommes de terre lardons', 20, 2, 0, '1. Eplucher 2 pommes de terre et les couper en dés. Les faire cuire 10 mn à la vapeur ainsi coupées (pour gagner du temps !).\n\n2. Mettre 1 à 2 cuillères à soupe d\'huile \"neutre\" (tournesol par exemple) dans un poêle et y rajouter les pommes de terre.\n\n3. Faire dorer 10 mn environ et juste un peu avant la fin de la cuisson, y rajouter une poignée de lardons.\n\n4. Incorporer les oeufs battus assaisonnés de poivre et de sel (pas trop, les lardons sont déjà suffisamment salés) à la préparation dans la poêle en remuant 30 secondes.\n\n5.  cuire à votre convenance, selon si vous l\'aimez baveuse ou pas).', 'dishes/swq7ok8yhyhzvrcnql9i', 1, 0, '2025-04-29 10:42:16', '2025-04-29 10:42:16', NULL),
(49, 'Chili con carne', 35, 4, 0, 'Faire revenir l’oignon et l’ail dans un peu d’huile jusqu’à ce qu’ils soient dorés.\n\nAjouter le bœuf haché et faire cuire jusqu’à ce qu’il soit bien doré.\n\nIncorporer le chili en poudre, le cumin, le sel et le poivre. Bien mélanger.\n\nAjouter les tomates pelées (écrasées si entières), les haricots rouges et le maïs.\n\nLaisser mijoter à feu moyen pendant 10-15 minutes, jusqu’à ce que le mélange épaississe.\n\nGoûter et ajuster l’assaisonnement si nécessaire.', 'dishes/xdd2crzuevh7ik4fon5m', 1, 0, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(50, 'Tiramisu', 20, 4, 0, '1. Séparer les blancs des jaunes d\'oeufs.\n\n2. Mélanger les jaunes avec le sucre roux et le sucre vanillé.\n\n3. Ajouter le mascarpone au fouet.\n\n4.  les blancs en neige et les incorporer délicatement à la spatule au mélange précédent. Réserver.\n\n5. Mouiller les biscuits dans le café rapidement avant d\'en tapisser le fond du plat.\n\n6. Recouvrir d\'une couche de crème au mascarpone puis répéter l\'opération en alternant couche de biscuits et couche de crème en terminant par cette dernière.\n\n7. Saupoudrer de cacao.\n\n8. Mettre au réfrigérateur 4 heures minimum puis déguster frais.', 'dishes/vgz68nqcapycwwiwhmzg', 1, 0, '2025-04-29 10:55:45', '2025-04-29 10:55:45', NULL),
(51, 'Lasagnes', 125, 6, 0, '1. Faire revenir gousses hachées d\'ail et les oignons émincés dans un peu d\'huile d\'olive.\n\n2. Ajouter la carotte puis la viande et faire revenir le tout.\n\n3. Au bout de quelques minutes, ajouter le vin rouge. Laisser cuire jusqu\'à évaporation.\n\n4. Ajouter la pulpe de tomates et 15cl d\'eau. Saler, poivrer, puis laisser mijoter à feu doux 45 minutes.\n\n5. Préparer la béchamel : faire fondre le beurre.\n\n6. Hors du feu, ajouter la farine d\'un coup.\n\n7. Remettre sur le feu et remuer avec un fouet jusqu\'à l\'obtention d\'un mélange bien lisse.\n\n8. Ajouter le lait peu à peu.\n\n9. Remuer sans cesse, jusqu\'à ce que le mélange s\'épaississe.\n\n10. Ensuite, parfumer avec la muscade, saler, poivrer. Laisser cuire environ 5 minutes, à feu très doux, en remuant. Réserver.\n\n11. Préchauffer le four à 200°C (thermostat 6-7). Huiler le plat à lasagnes. Poser une fine couche de béchamel puis des feuilles de lasagnes, de la bolognaise, de la béchamel et du parmesan. Répéter l\'opération 3 fois de suite.\n\n12. Sur la dernière couche de lasagnes, ne mettre que de la béchamel et recouvrir de fromage râpé. Parsemer quelques noisettes de beurre.\n\n13. Enfourner pour environ 25 minutes de cuisson.\n\n14. Déguster', 'dishes/zalxbwcqtak9uagjxkmi', 1, 0, '2025-04-29 11:05:52', '2025-04-29 11:05:52', NULL),
(52, 'Wraps au poulet', 10, 1, 0, 'Couper la tomate et le poulet en dés\nFaire cuire le poulet\nTartiner les tortillas de moutarde et ajouter la salade, le poulet et les tomates', 'dishes/kuauwitun0rgtfz5yzxg', 1, 0, '2025-04-29 11:14:01', '2025-04-29 11:14:01', NULL),
(53, 'Tarte aux pommes', 55, 6, 0, '1. Éplucher et découper en les pommes.\n\n2. Faire une compote : les mettre dans une casserole avec un peu d\'eau (1 verre ou 2). Bien remuer. Quand les pommes commencent à ramollir, ajouter un sachet ou un sachet et demi de sucre vanillé. Ajouter un peu d\'eau si nécessaire.\n\n3. Vous saurez si la compote est prête une fois que les pommes ne seront plus dures du tout. Ce n\'est pas grave s\'il reste quelques morceaux.\n\n4. Pendant que la compote cuit, éplucher et couper en quatre les dernières pommes, puis, couper les quartiers en fines lamelles (elles serviront à être posées sur la compote).\n\n5. Préchauffer le four à 210°C (thermostat 7).\n\n6. Laisser un peu refroidir la compote et étaler la pâte brisée dans un moule et la piquer avec une fourchette.\n\n7. Verser la compote sur la pâte et placer les lamelles de pommes en formant une spirale ou plusieurs cercles, au choix ! Disposer des lamelles de beurre dessus.\n\n8. Mettre au four et laisser cuire pendant 30 min max. Surveiller la cuisson. Vous pouvez ajouter un peu de sucre vanillé sur la tarte pendant que çà cuit pour caraméliser un peu.', 'dishes/kt4kel0jpnmlmcbnckud', 1, 0, '2025-04-29 11:21:06', '2025-04-29 11:21:06', NULL),
(54, 'Gratin de pâtes', 25, 2, 0, 'Cuire les coquillettes\nFaire revenir les lardons\nMélanger les lardons et les coquillettes\nAjouter la crème fraîche\nTerminer par une généreuse couche de gruyère râpé\nEnfourner à four chaud (Th7) et laisser cuire jusqu\'à ce que le gruyère prenne une jolie couleur dorée', 'dishes/h8ryuq250bhnfs9buvoy', 1, 0, '2025-04-29 11:28:01', '2025-04-29 11:28:01', NULL),
(55, 'Gratin dauphinois', 85, 6, 0, '1. Eplucher, laver et couper les pommes de terre en rondelles fines (NB : ne pas les laver APRES les avoir coupées, car l\'amidon est nécessaire à une consistance correcte).\n\n2. Hacher l\'ail très finement.\n\n3. Porter à ébullition dans une casserole le lait, l\'ail, le sel, le poivre et la muscade puis y plonger les pommes de terre et laisser cuire 10 à 15 min, selon leur fermeté.\n\n4. Préchauffer le four à 180°C (thermostat 6) et beurrer un plat à gratin à l\'aide d\'une feuille de papier essuie-tout.\n\n5. Placer les pommes de terre égouttées dans le plat. Les recouvrir de crème, puis disposer des petites noix de beurre sur le dessus.\n\n6. Enfourner pour 50 min à 1 heure de cuisson. Utiliser le lait restant de la cuisson des pommes de terre pour faire une soupe ou une purée dans la foulée.', 'dishes/qv7cwrbfspsoucgwanhx', 1, 0, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `dishes_ingredients`
--

DROP TABLE IF EXISTS `dishes_ingredients`;
CREATE TABLE IF NOT EXISTS `dishes_ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dish_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  `quantity` float NOT NULL,
  `unit_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dishes_ingredients_dish_id_dishes_id` (`dish_id`) USING BTREE,
  KEY `dishes_ingredients_ingredient_id_ingredients_id` (`ingredient_id`) USING BTREE,
  KEY `dishes_ingredients_unit_id_units_id` (`unit_id`) USING BTREE,
  KEY `dishes_ingredients_user_id_users_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `dishes_ingredients`
--

INSERT INTO `dishes_ingredients` (`id`, `dish_id`, `ingredient_id`, `quantity`, `unit_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(8, 1, 1, 1, 1, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(10, 1, 2, 1, 1, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(11, 1, 3, 150, 5, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(12, 1, 4, 5, 3, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(13, 1, 5, 0.5, 1, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(14, 1, 6, 0.5, 1, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(15, 1, 7, 30, 5, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(16, 2, 8, 150, 5, 1, '2025-02-25 16:38:43', '2025-04-29 07:54:17', NULL),
(17, 2, 9, 1, 8, 1, '2025-02-25 16:38:43', '2025-04-29 07:54:17', NULL),
(18, 2, 10, 1, 1, 1, '2025-02-25 16:38:43', '2025-04-29 07:54:17', NULL),
(19, 2, 11, 0.5, 1, 1, '2025-02-25 16:38:43', '2025-04-29 07:54:17', NULL),
(20, 3, 12, 10, 5, 1, '2025-02-26 15:10:49', '2025-02-26 15:10:49', NULL),
(21, 3, 9, 10, 5, 1, '2025-02-26 15:10:49', '2025-02-26 15:10:49', NULL),
(22, 3, 13, 0.5, 1, 1, '2025-02-26 15:10:49', '2025-02-26 15:10:49', NULL),
(23, 3, 14, 2, 9, 1, '2025-02-26 15:10:49', '2025-02-26 15:10:49', NULL),
(24, 4, 4, 10, 3, 1, '2025-03-06 11:36:07', '2025-03-06 11:36:07', NULL),
(25, 4, 15, 1, 1, 1, '2025-03-06 11:36:07', '2025-03-06 11:36:07', NULL),
(26, 4, 12, 100, 5, 1, '2025-03-06 11:36:07', '2025-03-06 11:36:07', NULL),
(27, 5, 16, 0.5, 4, 1, '2025-03-06 11:47:01', '2025-03-06 11:47:01', NULL),
(28, 5, 17, 80, 5, 1, '2025-03-06 11:47:01', '2025-03-06 11:47:01', NULL),
(29, 5, 18, 125, 5, 1, '2025-03-06 11:47:01', '2025-03-06 11:47:01', NULL),
(30, 5, 19, 1, 1, 1, '2025-03-06 11:47:01', '2025-03-06 11:47:01', NULL),
(38, 6, 29, 1, 7, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(39, 6, 30, 2, 7, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(40, 6, 33, 1, 9, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(41, 6, 1, 2, 1, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(42, 6, 34, 3, 1, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(43, 6, 35, 4, 1, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(44, 6, 36, 3, 1, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL),
(45, 7, 9, 625, 5, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(46, 7, 31, 2, 9, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(47, 7, 10, 5, 1, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(48, 7, 12, 162, 5, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(49, 7, 16, 75, 3, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(50, 7, 17, 75, 5, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(51, 7, 11, 2.5, 1, 1, '2025-03-21 10:25:50', '2025-03-21 10:25:50', NULL),
(52, 8, 1, 2, 1, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(53, 8, 38, 400, 5, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(54, 8, 40, 225, 5, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(55, 8, 29, 1, 7, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(56, 8, 30, 1, 7, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(57, 8, 41, 1, 8, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(58, 8, 37, 1, 8, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(59, 8, 36, 2, 1, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(60, 8, 39, 1, 8, 1, '2025-03-21 10:32:29', '2025-03-21 10:32:29', NULL),
(63, 38, 106, 150, 5, 1, '2025-04-22 14:37:33', '2025-04-22 14:37:33', NULL),
(64, 38, 12, 75, 5, 1, '2025-04-22 14:37:33', '2025-04-22 14:37:33', NULL),
(65, 38, 17, 75, 5, 1, '2025-04-22 14:37:33', '2025-04-22 14:37:33', NULL),
(66, 38, 9, 3, 8, 1, '2025-04-22 14:37:33', '2025-04-22 14:37:33', NULL),
(67, 38, 10, 4, 1, 1, '2025-04-22 14:37:33', '2025-04-22 14:37:33', NULL),
(68, 39, 9, 165, 5, 1, '2025-04-23 06:22:01', '2025-04-23 06:22:01', NULL),
(69, 39, 10, 2, 1, 1, '2025-04-23 06:22:01', '2025-04-23 06:22:01', NULL),
(70, 39, 19, 0.5, 1, 1, '2025-04-23 06:22:01', '2025-04-23 06:22:01', NULL),
(71, 39, 16, 33, 3, 1, '2025-04-23 06:22:01', '2025-04-23 06:22:01', NULL),
(72, 40, 1, 4, 1, 1, '2025-04-23 06:25:59', '2025-04-23 06:25:59', NULL),
(73, 40, 66, 4, 1, 1, '2025-04-23 06:25:59', '2025-04-23 06:25:59', NULL),
(74, 40, 67, 50, 3, 1, '2025-04-23 06:25:59', '2025-04-23 06:25:59', NULL),
(75, 40, 12, 100, 5, 1, '2025-04-23 06:25:59', '2025-04-23 06:25:59', NULL),
(76, 40, 68, 600, 5, 1, '2025-04-23 06:25:59', '2025-04-23 06:25:59', NULL),
(77, 41, 66, 2, 1, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(78, 41, 1, 1, 1, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(79, 41, 69, 20, 3, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(80, 41, 9, 2, 8, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(81, 41, 70, 1, 6, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(82, 41, 71, 1, 1, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(83, 41, 5, 1, 1, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(84, 41, 72, 200, 5, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(85, 41, 73, 1, 1, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(86, 41, 74, 1, 1, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(87, 41, 4, 25, 3, 1, '2025-04-23 06:32:38', '2025-04-23 06:32:38', NULL),
(88, 42, 75, 1, 1, 1, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(89, 42, 76, 200, 5, 1, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(90, 42, 12, 30, 5, 1, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(91, 42, 69, 20, 3, 1, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(92, 42, 77, 2, 7, 1, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(93, 42, 10, 3, 1, 1, '2025-04-23 06:35:55', '2025-04-23 06:35:55', NULL),
(94, 43, 107, 1, 1, 1, '2025-04-23 06:37:52', '2025-04-23 06:37:52', NULL),
(95, 43, 17, 75, 5, 1, '2025-04-23 06:37:52', '2025-04-23 06:37:52', NULL),
(96, 43, 108, 400, 5, 1, '2025-04-23 06:37:52', '2025-04-23 06:37:52', NULL),
(97, 44, 79, 1.5, 6, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(98, 44, 1, 1, 1, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(99, 44, 82, 15, 1, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(100, 44, 71, 1, 1, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(101, 44, 80, 500, 5, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(102, 44, 35, 2, 1, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(103, 44, 81, 6, 1, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(104, 44, 83, 50, 3, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(105, 44, 84, 500, 5, 1, '2025-04-23 06:44:24', '2025-04-23 06:44:24', NULL),
(106, 45, 69, 20, 3, 1, '2025-04-23 06:55:24', '2025-04-23 06:55:24', NULL),
(107, 45, 76, 125, 5, 1, '2025-04-23 06:55:24', '2025-04-23 06:55:24', NULL),
(108, 45, 1, 1, 1, 1, '2025-04-23 06:55:24', '2025-04-23 06:55:24', NULL),
(109, 45, 85, 250, 5, 1, '2025-04-23 06:55:24', '2025-04-23 06:55:24', NULL),
(110, 45, 33, 3, 9, 1, '2025-04-23 06:55:24', '2025-04-23 06:55:24', NULL),
(111, 46, 86, 150, 5, 1, '2025-04-23 08:44:24', '2025-04-23 08:44:24', NULL),
(112, 46, 7, 150, 5, 1, '2025-04-23 08:44:24', '2025-04-23 08:44:24', NULL),
(113, 46, 85, 250, 5, 1, '2025-04-23 08:44:24', '2025-04-23 08:44:24', NULL),
(114, 46, 74, 2, 1, 1, '2025-04-23 08:44:24', '2025-04-23 08:44:24', NULL),
(117, 47, 106, 100, 5, 1, '2025-04-29 10:39:25', '2025-04-29 10:39:25', NULL),
(118, 47, 10, 3, 1, 1, '2025-04-29 10:39:25', '2025-04-29 10:39:25', NULL),
(119, 47, 19, 1, 1, 1, '2025-04-29 10:39:25', '2025-04-29 10:39:25', NULL),
(120, 48, 76, 100, 5, 1, '2025-04-29 08:42:16', '2025-04-29 11:29:14', NULL),
(121, 48, 10, 5, 1, 1, '2025-04-29 08:42:16', '2025-04-29 11:29:14', NULL),
(122, 48, 84, 2, 1, 1, '2025-04-29 08:42:16', '2025-04-29 11:29:14', NULL),
(123, 49, 1, 2, 1, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(124, 49, 87, 1, 7, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(125, 49, 41, 2, 7, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(126, 49, 88, 300, 5, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(127, 49, 36, 2, 1, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(128, 49, 89, 600, 5, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(129, 49, 40, 65, 5, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(130, 49, 8, 140, 5, 1, '2025-04-29 10:52:16', '2025-04-29 10:52:16', NULL),
(131, 50, 109, 100, 5, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(132, 50, 110, 24, 1, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(133, 50, 111, 30, 5, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(134, 50, 10, 3, 1, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(135, 50, 19, 1, 1, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(136, 50, 112, 250, 5, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(137, 50, 113, 50, 3, 1, '2025-04-29 08:55:45', '2025-04-29 10:56:00', NULL),
(138, 51, 90, 500, 5, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(139, 51, 1, 3, 1, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(140, 51, 12, 125, 5, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(141, 51, 9, 100, 5, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(142, 51, 91, 70, 5, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(143, 51, 77, 3, 9, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(144, 51, 67, 20, 3, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(145, 51, 66, 1, 1, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(146, 51, 7, 125, 5, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(147, 51, 89, 600, 5, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(148, 51, 36, 2, 1, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(149, 51, 16, 1, 4, 1, '2025-04-29 09:05:52', '2025-04-29 11:07:00', NULL),
(150, 51, 123, 800, 5, 1, '2025-04-29 11:07:00', '2025-04-29 11:07:00', NULL),
(151, 52, 92, 2, 1, 1, '2025-04-29 11:14:01', '2025-04-29 11:14:01', NULL),
(152, 52, 95, 0.5, 1, 1, '2025-04-29 11:14:01', '2025-04-29 11:14:01', NULL),
(153, 52, 93, 4, 1, 1, '2025-04-29 11:14:01', '2025-04-29 11:14:01', NULL),
(154, 52, 34, 0.5, 1, 1, '2025-04-29 11:14:01', '2025-04-29 11:14:01', NULL),
(155, 52, 94, 4, 7, 1, '2025-04-29 11:14:01', '2025-04-29 11:14:01', NULL),
(156, 53, 75, 1, 1, 1, '2025-04-29 11:21:06', '2025-04-29 11:21:06', NULL),
(157, 53, 12, 30, 5, 1, '2025-04-29 11:21:06', '2025-04-29 11:21:06', NULL),
(158, 53, 108, 6, 1, 1, '2025-04-29 11:21:06', '2025-04-29 11:21:06', NULL),
(159, 53, 19, 1, 1, 1, '2025-04-29 11:21:06', '2025-04-29 11:21:06', NULL),
(160, 54, 76, 100, 5, 1, '2025-04-29 09:28:01', '2025-04-29 11:28:33', NULL),
(161, 54, 124, 200, 5, 1, '2025-04-29 09:28:01', '2025-04-29 11:28:33', NULL),
(162, 54, 69, 3, 8, 1, '2025-04-29 09:28:01', '2025-04-29 11:28:33', NULL),
(163, 54, 91, 70, 5, 1, '2025-04-29 09:28:01', '2025-04-29 11:28:33', NULL),
(164, 55, 12, 100, 5, 1, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL),
(165, 55, 77, 2, 9, 1, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL),
(166, 55, 84, 500, 5, 1, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL),
(167, 55, 36, 2, 1, 1, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL),
(168, 55, 69, 30, 3, 1, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL),
(169, 55, 16, 1, 4, 1, '2025-04-29 11:40:53', '2025-04-29 11:40:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `category_id` int NOT NULL,
  `favourite` tinyint(1) DEFAULT '0',
  `image` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `bg_color` varchar(7) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  `is_global_item` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ingredient_category_id_ingrdient_categories_id` (`category_id`),
  KEY `ingredients_user_id_users_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `category_id`, `favourite`, `image`, `bg_color`, `user_id`, `is_global_item`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Oignon', 4, 0, 'ingredients/tv8hrleqgno5cko06mml', '#FCF7DC', 1, 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(2, 'Courgette', 4, 0, 'ingredients/hbpgnaxlnefxufhu2vlb', '#51873a', 1, 0, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(3, 'Riz spécial risotto', 5, 0, 'ingredients/jr58rneu3jtf5ncqmwue', '#f7dcb0', 1, 0, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(4, 'Vin blanc', 9, 0, 'ingredients/xvgeokspnlufuj5bfbqo', '#faf5dc', 1, 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(5, 'Cube de bouillon de poulet', 8, 0, 'ingredients/fh2zo2wirg1g648zkzhk', '#a6945e', 1, 0, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(6, 'Chorizo', 1, 0, 'ingredients/g5fyo7t9n4ev9oeoc358', '#b03831', 1, 0, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(7, 'Parmesan', 6, 0, 'ingredients/j1g0tgzhl59hqic4vb02', '#f0e3b6', 1, 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(8, 'Maïs', 4, 0, 'ingredients/kxnyxnlg4ny1wvfqkh6r', '#f2e33d', 1, 0, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(9, 'Farine', 5, 0, 'ingredients/da8hxengw2qwaok1cm8s', '#fff7f2', 1, 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(10, 'Oeuf', 1, 0, 'ingredients/vwll4wlm39ng3nnhjpo4', '#debfad', 1, 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(11, 'Sachet de levure chimique', 11, 0, 'ingredients/qpulcyhbgoienxuhcipt', '#ffabe0', 1, 0, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(12, 'Beurre', 7, 0, 'ingredients/vrx3mbs2kxhs3rbgkgb0', '#ffeaab', 1, 1, '2025-02-26 15:06:22', '2025-02-26 15:06:22', NULL),
(13, 'Cube de bouillon de boeuf', 8, 0, 'ingredients/xr8p6gvs4wq0wcfyixvd', '#8a652f', 1, 1, '2025-02-26 15:06:22', '2025-02-26 15:06:22', NULL),
(14, 'Billes de poivre', 8, 0, 'ingredients/k8hi7ju0nsvvsiah2i96', '#3b280c', 1, 0, '2025-02-26 15:06:22', '2025-02-26 15:06:22', NULL),
(15, 'Echalotte', 4, 0, 'ingredients/op9p58sxfa9i3zab8sn0', '#dbc7ff', 1, 0, '2025-03-06 11:17:35', '2025-03-06 11:17:35', NULL),
(16, 'Lait', 6, 0, 'ingredients/rifwjpkwcc1tujmx7wkc', '#deebff', 1, 1, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(17, 'Sucre', 10, 0, 'ingredients/wpxvpdhvrys5rdle8jdp', '#fff9ed', 1, 0, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(18, 'Semoule', 5, 0, 'ingredients/lgb2bziyijsboayecbdn', '#ffffc9', 1, 1, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(19, 'Sachet de sucre vanillé', 11, 0, 'ingredients/grqdtftzstfffmt27qua', '#ffd68f', 1, 0, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(29, 'Piment', 8, 0, 'ingredients/h8eeho91uaf3gzbwb5cg', '#e64e30', 1, 0, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(30, 'Curcuma', 8, 0, 'ingredients/h5kui4vuzimre1cipmli', '#e6b830', 1, 0, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(31, 'Sel', 8, 0, 'ingredients/d1aia4m1oze1bnmyjrhy', '#e3e3e3', 1, 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(32, 'Poivre', 8, 0, 'ingredients/gzhwvicfzgqxpvsdox1i', '#543a23', 1, 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(33, 'Thym', 8, 0, 'ingredients/irksf7mx9uifqqlgyvtk', '#467a49', 1, 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(34, 'Tomate', 4, 0, 'ingredients/xghsjz86dqwzc1repboi', '#cc340e', 1, 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(35, 'Saucisse fumée', 1, 0, 'ingredients/c1ltf40j3mvzzerqaruh', '#804b19', 1, 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(36, 'Gousse d\'ail', 4, 0, 'ingredients/nbpbjvqw5vhmecb6ob3s', '#d9d1ca', 1, 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(37, 'Coriandre moulue', 8, 0, 'ingredients/breg0rreaqh2jgq9d9cu', '#5a6e47', 1, 0, '2025-03-21 10:19:54', '2025-03-21 10:19:54', NULL),
(38, 'Pois chiches', 5, 0, 'ingredients/o82m4tr8axlevffjcjtq', '#edddb7', 1, 1, '2025-03-21 10:19:54', '2025-03-21 10:19:54', NULL),
(39, 'Pâte de curry', 8, 0, 'ingredients/sy5y8mpsxpbcggwbsipn', '#e34d1b', 1, 0, '2025-03-21 10:19:54', '2025-03-21 10:19:54', NULL),
(40, 'Tomates pelées', 4, 0, 'ingredients/jwpuidpfzp9d1w7ooayw', '#c93a16', 1, 1, '2025-03-21 10:19:54', '2025-03-21 10:19:54', NULL),
(41, 'Cumin moulu', 8, 0, 'ingredients/cu9ywujuxxkve7cr6bhn', '#8c7257', 1, 1, '2025-03-21 10:19:54', '2025-03-21 10:19:54', NULL),
(66, 'Carotte', 4, 0, 'ingredients/wxcllxue52nmdxlkkx7n', '#EEA449', 1, 1, '2025-04-08 12:18:17', '2025-04-08 12:18:17', NULL),
(67, 'Vin rouge', 9, 0, 'ingredients/oa9fuh3nvfslhiy7dnmg', '#881818', 1, 1, '2025-04-08 12:18:42', '2025-04-08 12:18:42', NULL),
(68, 'Bourguignon', 1, 0, 'ingredients/r2hmppdbp295i5p9cyy5', '#D58989', 1, 1, '2025-04-08 12:19:33', '2025-04-08 12:19:33', NULL),
(69, 'Crème fraîche', 6, 0, 'ingredients/wmbdicea4ivrxxzakf4y', '#C5EAF0', 1, 1, '2025-04-08 12:21:05', '2025-04-08 12:21:05', NULL),
(70, 'Blanquette de veau', 1, 0, 'ingredients/dhcdmfdt0kwpwztmo8ma', '#E3B1BD', 1, 1, '2025-04-08 12:24:03', '2025-04-08 12:24:03', NULL),
(71, 'Cube de bouillon de légumes', 8, 0, 'ingredients/znm1yn88s1ypsvglgyn2', '#C39747', 1, 1, '2025-04-08 12:24:56', '2025-04-08 12:24:56', NULL),
(72, 'Champignon', 4, 0, 'ingredients/lik507uzlvwlncgrxxkq', '#B0886C', 1, 1, '2025-04-08 12:25:52', '2025-04-08 12:25:52', NULL),
(73, 'Citron', 3, 0, 'ingredients/qgp1snodxgzhqlncwepq', '#F8F47E', 1, 1, '2025-04-08 12:26:14', '2025-04-08 12:26:14', NULL),
(74, 'Jaune d\'oeuf', 1, 0, 'ingredients/mxpa6xtwqugdtjwavfwu', '#F2E086', 1, 1, '2025-04-08 12:35:43', '2025-04-08 12:35:43', NULL),
(75, 'Pâte brisée', 5, 0, 'ingredients/jza1lmb5iwgjtpgsu9ft', '#F4E8CB', 1, 1, '2025-04-08 12:37:31', '2025-04-08 12:37:31', NULL),
(76, 'Lardons', 1, 0, 'ingredients/ujme6q6zri3n8xpmctpw', '#F1BFBF', 1, 1, '2025-04-08 12:37:54', '2025-04-08 12:37:54', NULL),
(77, 'Muscade', 8, 0, 'ingredients/rbsf6bsabkfaihgigsfr', '#725137', 1, 1, '2025-04-08 12:39:01', '2025-04-08 12:39:01', NULL),
(78, 'Lard fumé', 1, 0, 'ingredients/aelr8glqczoqjqvzdhx7', '#FFDFE4', 1, 1, '2025-04-08 12:40:13', '2025-04-08 12:40:13', NULL),
(79, 'Choucroute', 4, 0, 'ingredients/obdncpci4jggy16ftitf', '#F8F3DA', 1, 1, '2025-04-08 12:40:55', '2025-04-08 12:40:55', NULL),
(80, 'Kassler', 1, 0, 'ingredients/lpnjrgnzb0a5sz9l8zh3', '#C36F6F', 1, 1, '2025-04-08 12:41:57', '2025-04-08 12:41:57', NULL),
(81, 'Saucisse de Strasbourg', 1, 0, 'ingredients/zlnpkbfvufx4ecoabwmx', '#FFD8C3', 1, 1, '2025-04-08 12:42:56', '2025-04-08 12:42:56', NULL),
(82, 'Grains de genièvre', 8, 0, 'ingredients/rciq87qxnejjbevmfuwe', '#441E42', 1, 1, '2025-04-08 12:44:01', '2025-04-08 12:44:01', NULL),
(83, 'Riesling', 9, 0, 'ingredients/uuqirg6qoire4k0q6t3g', '#EEEED5', 1, 1, '2025-04-08 12:44:47', '2025-04-08 12:44:47', NULL),
(84, 'Pomme de terre', 5, 0, 'ingredients/dorkefn28wup10ir86ea', '#E8D089', 1, 1, '2025-04-08 12:45:09', '2025-04-08 12:45:09', NULL),
(85, 'Spaghetti', 5, 0, 'ingredients/aqexqjtegbhhpc9vwrmj', '#F5EB82', 1, 1, '2025-04-08 12:46:15', '2025-04-08 12:46:15', NULL),
(86, 'Guanciale', 1, 0, 'ingredients/hzsa15vlor4ezppnvnne', '#FFE7EA', 1, 1, '2025-04-08 12:47:35', '2025-04-08 12:47:35', NULL),
(87, 'Chili en poudre', 8, 0, 'ingredients/yg7jnegll3koovukgpu1', '#A52220', 1, 1, '2025-04-08 12:49:55', '2025-04-08 12:49:55', NULL),
(88, 'Haricots rouges', 5, 0, 'ingredients/euxaw4nqc43cbkbpcnaf', '#98293A', 1, 1, '2025-04-08 12:51:41', '2025-04-08 12:51:41', NULL),
(89, 'Boeuf haché', 1, 0, 'ingredients/ixrwlep19fwuof3trjcf', '#D1414D', 1, 1, '2025-04-08 12:52:51', '2025-04-08 12:52:51', NULL),
(90, 'Lasagnes', 5, 0, 'ingredients/llfmrjjfxy9iijopmxdn', '#FAF065', 1, 1, '2025-04-08 12:54:22', '2025-04-08 12:54:22', NULL),
(91, 'Gruyère rapé', 6, 0, 'ingredients/vixcu3wwjlttdkpvffi3', '#F4F49B', 1, 1, '2025-04-08 12:58:18', '2025-04-08 12:58:18', NULL),
(92, 'Tortilla de blé', 5, 0, 'ingredients/kw7bxxhyqzhqawoujcx9', '#FFF8D6', 1, 1, '2025-04-08 13:02:25', '2025-04-08 13:02:25', NULL),
(93, 'Feuille de salade', 4, 0, 'ingredients/o7htqpimv9jb4qsh5vii', '#BEED8F', 1, 1, '2025-04-08 13:02:42', '2025-04-08 13:02:42', NULL),
(94, 'Moutarde', 8, 0, 'ingredients/xwuundisdqmv3mflxbvt', '#ECE478', 1, 1, '2025-04-08 13:03:25', '2025-04-08 13:03:25', NULL),
(95, 'Blanc de poulet', 1, 0, 'ingredients/vnu8hxkprun5vcskf8lu', '#F9E3E3', 1, 1, '2025-04-08 13:03:53', '2025-04-08 13:03:53', NULL),
(96, 'Purée', 5, 0, 'ingredients/l4iumn5fpclkgfsbllwa', '#FEFCC6', 1, 1, '2025-04-08 13:06:10', '2025-04-08 13:06:10', NULL),
(97, 'Flageolets', 5, 0, 'ingredients/hagv5rk0hxwj5rghb1wf', '#ADD798', 1, 1, '2025-04-08 13:08:51', '2025-04-08 13:08:51', NULL),
(98, 'Filet mignon', 1, 0, 'ingredients/c4282t5thgtksbgmhlqe', '#D4676D', 1, 1, '2025-04-08 13:09:19', '2025-04-08 13:09:19', NULL),
(99, 'Merguez', 1, 0, 'ingredients/glbkrdmmjejeyn8rvhaa', '#B34B3B', 1, 1, '2025-04-08 13:10:02', '2025-04-08 13:10:02', NULL),
(100, 'Harissa', 8, 0, 'ingredients/gajcyzydyverkbegt9ih', '#CB3838', 1, 1, '2025-04-08 13:10:28', '2025-04-08 13:10:28', NULL),
(101, 'Navet', 4, 0, 'ingredients/vwkgjt2af4laiblmqt9o', '#F6E8F6', 1, 1, '2025-04-08 13:11:20', '2025-04-08 13:11:20', NULL),
(102, 'Epices à couscous', 8, 0, 'ingredients/rjtl2lxwocfh25jd1tu6', '#D3AB5E', 1, 1, '2025-04-08 13:12:02', '2025-04-08 13:12:02', NULL),
(106, 'Chocolat', 10, 0, 'ingredients/rpjz6k1necng7bmtz9jw', '#4F361D', 1, 1, '2025-04-09 13:18:29', '2025-04-09 13:18:29', NULL),
(107, 'Gousse de vanille', 8, 0, 'ingredients/mihnpdogifslqv8omozz', '#2C2929', 1, 1, '2025-04-09 13:20:22', '2025-04-09 13:20:22', NULL),
(108, 'Pomme', 3, 0, 'ingredients/dhclekvhalyqwfei8kuy', '#78CC66', 1, 1, '2025-04-09 13:21:10', '2025-04-09 13:21:10', NULL),
(109, 'Sucre roux', 10, 0, 'ingredients/gdtrea8ie3ckhcmk4ben', '#EAD67F', 1, 1, '2025-04-09 13:22:15', '2025-04-09 13:22:15', NULL),
(110, 'Boudoir', 10, 0, 'ingredients/m9mvy1zgvguv5yqjbjst', '#EEDDBE', 1, 1, '2025-04-09 13:23:18', '2025-04-09 13:23:18', NULL),
(111, 'Cacao', 8, 0, 'ingredients/x28ewhboynzae2yvbosm', '#53220E', 1, 1, '2025-04-09 13:24:44', '2025-04-09 13:24:44', NULL),
(112, 'Mascarpone', 6, 0, 'ingredients/ifrqyf2b959waukooppg', '#FCFCF5', 1, 1, '2025-04-09 13:27:34', '2025-04-09 13:27:34', NULL),
(113, 'Grains de café', 8, 0, 'ingredients/tn1yvsxsga0gzykzzwvj', '#533C2E', 1, 1, '2025-04-09 13:29:26', '2025-04-09 13:29:26', NULL),
(114, 'Sucre glace', 10, 0, 'ingredients/vkv5r54g8whjrxywzaht', '#E9FFFF', 1, 1, '2025-04-09 13:30:33', '2025-04-09 13:30:33', NULL),
(115, 'Cerise', 3, 0, 'ingredients/hvf43wvnpvhgavbsyubu', '#812527', 1, 1, '2025-04-09 13:31:19', '2025-04-09 13:31:19', NULL),
(116, 'Feuille de brick', 5, 0, 'ingredients/ubybyjvic9habvu6ojto', '#FFFFF6', 1, 0, '2025-04-10 13:55:18', '2025-04-10 13:55:18', NULL),
(123, 'Pulpe de tomate', 4, 0, 'ingredients/acypblczsyplgndrwrj8', '#F47263', 1, 0, '2025-04-29 11:06:36', '2025-04-29 11:06:36', NULL),
(124, 'Coquillettes', 5, 0, 'ingredients/vemqbsxpdqxkrpyjsnn8', '#F9F2BB', 1, 0, '2025-04-29 11:24:48', '2025-04-29 11:24:48', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `ingredient_categories`
--

DROP TABLE IF EXISTS `ingredient_categories`;
CREATE TABLE IF NOT EXISTS `ingredient_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `image` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `ingredient_categories`
--

INSERT INTO `ingredient_categories` (`id`, `name`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Viandes', 'placeholders/ksgu32ah6codnt8s4uko', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(2, 'Poissons', 'placeholders/j4qr8anu099jbmbca3vk', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(3, 'Fruits', 'placeholders/ydfeydgflo9vuwnllwwz', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(4, 'Légumes', 'placeholders/glcmrfzdgaelvpmdtqqa', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(5, 'Féculents et céréales', 'placeholders/chzzwndz8uya8ynny31e', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(6, 'Produits laitiers', 'placeholders/hpgrgaxvkh3konsqpyq9', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(7, 'Matières grasses', 'placeholders/g2u8jhrjtr8fcda5xkuw', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(8, 'Epices', 'placeholders/lzzrytzpyoogzohynqgv', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(9, 'Alcools', 'placeholders/h8i8ysekfqqlxvv0t5cy', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(10, 'Produits sucrés', 'placeholders/xsyc0i7ic8ljbar4hbfh', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(11, 'Aditifs alimentaires', 'placeholders/exgn4nxgwuaz8yuzdkax', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `liked_global_items`
--

DROP TABLE IF EXISTS `liked_global_items`;
CREATE TABLE IF NOT EXISTS `liked_global_items` (
  `user_id` int NOT NULL,
  `item_type` enum('dish','ingredient') COLLATE latin1_general_ci NOT NULL,
  `item_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`item_type`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `units`
--

DROP TABLE IF EXISTS `units`;
CREATE TABLE IF NOT EXISTS `units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE latin1_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `units`
--

INSERT INTO `units` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'pièce', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(2, 'ml', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(3, 'cl', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(4, 'L', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(5, 'g', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(6, 'kg', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(7, 'c.a.c', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(8, 'c.a.s', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL),
(9, 'pincée', '2025-02-26 10:40:18', '2025-02-26 10:40:18', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `email` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `role` enum('user','admin') COLLATE latin1_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Justin', 'PONZO', 'just1ponzo@gmail.com', '$2b$10$qyXqu2dxqqKu3yz6GEzZeeSW5ghaNBij.NPry6FUS1wmgIl1eFvoq', 'admin', '2025-02-26 10:40:50', '2025-02-26 10:40:50', NULL),
(4, 'A', 'A', 'a', '$2b$10$la/NUqlioNVAsji78LqLz.XY1Z2tCBt9kSQbgaCVxZQshejh8JKgG', 'user', '2025-04-08 09:08:29', '2025-04-08 09:08:29', NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `deleted_global_items`
--
ALTER TABLE `deleted_global_items`
  ADD CONSTRAINT `deleted_global_items_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `dishes`
--
ALTER TABLE `dishes`
  ADD CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `dishes_ingredients`
--
ALTER TABLE `dishes_ingredients`
  ADD CONSTRAINT `dishes_ingredients_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ingredients_ibfk_3` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ingredients_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `ingredient_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredients_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `liked_global_items`
--
ALTER TABLE `liked_global_items`
  ADD CONSTRAINT `liked_global_items_user_id_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
