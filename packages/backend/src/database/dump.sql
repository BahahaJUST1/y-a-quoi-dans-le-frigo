USE y-a-quoi-dans-le-frigo
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 14 mars 2025 à 14:49
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dishes_user_id_users_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `preparation_time`, `number_of_people`, `favourite`, `recipe`, `image`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Risotto chorizo et courgettes', 90, 2, 0, '(1) Émincer finement l\'oignon et couper les courgettes et le chorizo en dés\r\n(2) Chauffer 1/2L d\'eau et fondre le cube de bouillon\r\n(3) Faire revenir l\'oignon avec de l\'huile d\'olive puis ajouter les courgettes et enfin le chorizo\r\n(4) Ajouter le riz (cru) et mélanger en continu pendant 3/4 min\r\n(5) Verser le vin blanc et le laisser s\'évaporer\r\n(6) Sur feu doux, verser le bouillon louche après louche dès que la précédente a été absorbée par le riz, couvrir avec un couvercle pour aider à absorber et remuer de temps en temps\r\n(7) Ajouter le parmesan, mélanger et servir', 'dishes/kgrwedypzh9qbwi67y7p', 1, '2025-02-26 10:37:01', '2025-02-26 10:37:01', NULL),
(2, 'Galettes de maïs frit', 30, 1, 0, '- Mélanger farine œuf levure pour obtenir une pâte\r\n- Ajouter sel et poivre\r\n- Ajouter maïs\r\n- Verser cuillère sur poêle avec fond d\'huile', 'dishes/ntcyampg1adkgucfyudo', 1, '2025-02-26 10:37:01', '2025-02-26 10:37:01', NULL),
(3, 'Sauce au poivre', 15, 1, 1, '- Faire fondre sur feux doux le beurre \r\n- Une fois fondu, ajouter la farine et faire cuire jusqu\'à ce que le mélange perde en couleur pour être pâle\r\n- Faire fondre le cube de bouillon dans une demi tasse d\'eau et l\'ajouter au reste de la sauce\r\n- Ajouter le poivre et faire épaissir', 'dishes/zz8mawkqq3fhbsktfpg4', 1, '2025-02-26 15:09:14', '2025-02-26 15:09:14', NULL),
(4, 'Sauce au beurre blanc', 15, 2, 0, 'Faire réduire le vin blanc avec l\'échalote (ça veut dire faire cuire à feu vif pour faire diminuer la quantité jusqu\'à ce qu\'il n\'en reste plus que 2 c.a.s)\r\n\r\nBaisser le feu et ajouter le beurre progressivement en fouettant\r\n\r\nFiltrer la sauce pour enlever l\'échalote et servir', 'dishes/sr0lp31fikycgx0n23jj', 1, '2025-03-06 11:21:33', '2025-03-06 11:21:33', NULL),
(5, 'Gâteau de semoule', 10, 4, 0, 'Faire chauffer le lait avec le sucre et le sucre vanillé sur feu max\r\n\r\nQuand le lait est très chaud : mettre la semoule et baisser le feu\r\n\r\nRemuer pendant 2min\r\n\r\nVerser dans un moule et laisser refroidir à température ambiante\r\n\r\nUne fois tiède, le conserver au frigo avant démoulage, le gâteau doit être compact pour pouvoir tenir une fois démoulé', 'dishes/ugebw2zo9k5uzanqsuer', 1, '2025-03-06 11:44:06', '2025-03-06 11:44:06', NULL),
(6, 'Rougaille saucisse', 45, 2, 0, '- Piquer les saucisses et les mettre dans l\'eau bouillante pendant 5min\r\n- Faire revenir les oignons et l\'ail écrasé dans une poêle\r\n- Couper les saucisses en tronçons de 1,5cm puis les ajouter à la poêle\r\n- Au bout de 5min, ajouter les tomates en petit morceaux ainsi que les épices\r\n- Laisser mijoter sur feu doux en ôtant le couvercle de temps en temps pour enlever l\'excès d\'eau', '	\r\ndishes/eb4npfrr5chkysuxznzz', 1, '2025-03-06 14:35:43', '2025-03-06 14:35:43', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

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
(16, 2, 8, 150, 5, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(17, 2, 9, 1, 8, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(18, 2, 10, 1, 1, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
(19, 2, 11, 0.5, 1, 1, '2025-02-26 10:38:43', '2025-02-26 10:38:43', NULL),
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
(44, 6, 36, 3, 1, 1, '2025-03-06 14:41:57', '2025-03-06 14:41:57', NULL);

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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ingredient_category_id_ingrdient_categories_id` (`category_id`),
  KEY `ingredients_user_id_users_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `category_id`, `favourite`, `image`, `bg_color`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Oignon', 4, 0, 'ingredients/tv8hrleqgno5cko06mml', '#fcf7dc', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(2, 'Courgette', 4, 1, 'ingredients/hbpgnaxlnefxufhu2vlb', '#51873a', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(3, 'Riz spécial risotto', 5, 1, 'ingredients/jr58rneu3jtf5ncqmwue', '#f7dcb0', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(4, 'Vin blanc', 9, 1, 'ingredients/xvgeokspnlufuj5bfbqo', '#faf5dc', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(5, 'Cube de bouillon de poulet', 8, 0, 'ingredients/fh2zo2wirg1g648zkzhk', '#a6945e', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(6, 'Chorizo', 1, 1, 'ingredients/g5fyo7t9n4ev9oeoc358', '#b03831', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(7, 'Parmesan', 6, 1, 'ingredients/j1g0tgzhl59hqic4vb02', '#f0e3b6', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(8, 'Maïs', 4, 1, 'ingredients/kxnyxnlg4ny1wvfqkh6r', '#f2e33d', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(9, 'Farine', 5, 1, 'ingredients/da8hxengw2qwaok1cm8s', '#fff7f2', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(10, 'Oeuf', 1, 0, 'ingredients/vwll4wlm39ng3nnhjpo4', '#debfad', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(11, 'Sachet de levure chimique', 11, 1, 'ingredients/qpulcyhbgoienxuhcipt', '#ffabe0', 1, '2025-02-26 10:39:21', '2025-02-26 10:39:21', NULL),
(12, 'Beurre', 7, 0, 'ingredients/vrx3mbs2kxhs3rbgkgb0', '#ffeaab', 1, '2025-02-26 15:06:22', '2025-02-26 15:06:22', NULL),
(13, 'Cube de bouillon de boeuf', 8, 0, 'ingredients/xr8p6gvs4wq0wcfyixvd', '#8a652f', 1, '2025-02-26 15:06:22', '2025-02-26 15:06:22', NULL),
(14, 'Billes de poivre', 8, 0, 'ingredients/k8hi7ju0nsvvsiah2i96', '#3b280c', 1, '2025-02-26 15:06:22', '2025-02-26 15:06:22', NULL),
(15, 'Echalotte', 4, 0, 'ingredients/op9p58sxfa9i3zab8sn0', '#dbc7ff', 1, '2025-03-06 11:17:35', '2025-03-06 11:17:35', NULL),
(16, 'Lait', 6, 0, 'ingredients/rifwjpkwcc1tujmx7wkc', '#deebff', 1, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(17, 'Sucre', 10, 0, 'ingredients/wpxvpdhvrys5rdle8jdp', '#fff9ed', 1, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(18, 'Semoule', 5, 0, 'ingredients/lgb2bziyijsboayecbdn', '#ffffc9', 1, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(19, 'Sachet de sucre vanillé', 11, 0, 'ingredients/grqdtftzstfffmt27qua', '#ffd68f', 1, '2025-03-06 11:40:54', '2025-03-06 11:40:54', NULL),
(29, 'Piment', 8, 1, 'ingredients/h8eeho91uaf3gzbwb5cg', '#e64e30', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(30, 'Curcuma', 8, 1, 'ingredients/h5kui4vuzimre1cipmli', '#e6b830', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(31, 'Sel', 8, 0, 'ingredients/d1aia4m1oze1bnmyjrhy', '#e3e3e3', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(32, 'Poivre', 8, 0, 'ingredients/gzhwvicfzgqxpvsdox1i', '#543a23', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(33, 'Thym', 8, 0, 'ingredients/irksf7mx9uifqqlgyvtk', '#467a49', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(34, 'Tomate', 4, 1, 'ingredients/xghsjz86dqwzc1repboi', '#cc340e', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(35, 'Saucisse fumée', 1, 0, 'ingredients/c1ltf40j3mvzzerqaruh', '#804b19', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL),
(36, 'Gousse d\'ail', 4, 0, 'ingredients/nbpbjvqw5vhmecb6ob3s', '#d9d1ca', 1, '2025-03-06 14:30:31', '2025-03-06 14:30:31', NULL);

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
(9, 'Alcools', '	\r\nplaceholders/h8i8ysekfqqlxvv0t5cy', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(10, 'Produits sucrés', 'placeholders/xsyc0i7ic8ljbar4hbfh', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL),
(11, 'Aditifs alimentaires', 'placeholders/exgn4nxgwuaz8yuzdkax', '2025-02-26 10:39:50', '2025-02-26 10:39:50', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Justin', 'PONZO', 'just1ponzo@gmail.com', '$2b$10$uxhecCwgrVD2B.bUmFWFlu5Qc8Fk8bNrhovyoTCNFNCPU75OF05NK', 'admin', '2025-02-26 10:40:50', '2025-02-26 10:40:50', NULL);

--
-- Contraintes pour les tables déchargées
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
