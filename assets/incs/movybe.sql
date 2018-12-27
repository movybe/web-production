-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2018 at 04:08 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movybe`
--

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `id` int(10) UNSIGNED NOT NULL,
  `query` varchar(100) NOT NULL,
  `occurrence` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`id`, `query`, `occurrence`) VALUES
(1, 'samsung galaxy s7', 291),
(2, 'samsung galaxy s6', 7),
(3, 'samsung galaxy', 11),
(4, 'samsung', 12),
(5, 'samsung galaxy s7 edge', 20),
(6, 'iphone x black', 1),
(7, 'dog', 1),
(8, 'mercedes benz', 8),
(9, 'samsung galaxy s5', 3),
(10, 'samsung galaxy s', 1),
(11, 'samsung galaxy s8', 1),
(12, 'clean shoe', 1),
(13, 'nike shoes', 6),
(14, 'nike', 4),
(15, 'hard disk', 1),
(16, 'computer hard drive', 1),
(17, 'pc ram', 2),
(18, 'ram', 1),
(19, 'gucci shoes', 2),
(20, 'gucci', 3),
(21, 'gucci shoe', 9),
(22, 'ice cream machine', 7),
(23, 'iphone x', 14),
(24, 'iphone', 1),
(25, 'adidas shoe', 8),
(26, 'air conditioner', 3),
(27, 'washing machine', 16),
(28, 'microwave oven', 1),
(29, 'ice block machine', 1),
(30, 'g wagon', 1),
(31, 'ps4 console', 17),
(32, 'range rover sport', 2),
(33, 'mac pro', 1),
(34, 'ps3 console', 6),
(35, 'rolex watch', 1),
(36, 'bag rice', 2),
(37, 'highlander jeep', 5),
(38, 'highlander ', 1),
(39, 'mac book pro', 1),
(40, 'range rover sport 2012', 1),
(41, 'mercedes benz c300 4matic', 1),
(42, 'LED tv 55 inches', 3),
(43, 'play station 2', 1),
(44, 'cpu', 3),
(45, 'desktop computer', 5),
(46, 'work station', 1),
(47, 'sony laptop', 1),
(48, 'dish', 1),
(49, 'ice', 1),
(50, 'hand bag', 2);

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `id` int(10) UNSIGNED NOT NULL,
  `word` varchar(100) NOT NULL,
  `occurrence` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`id`, `word`, `occurrence`) VALUES
(1, 'samsung', 384),
(2, 'galaxy', 371),
(3, 's7', 347),
(4, 'edge', 41),
(5, 'buy', 1),
(6, '', 9),
(7, 'dge', 1),
(8, 'edg', 3),
(9, 'edges', 1),
(10, 's6', 8),
(11, 'iphone', 16),
(12, 'x', 15),
(13, 'black', 1),
(14, 'dog', 1),
(15, 'mercedes', 9),
(16, 'benz', 9),
(17, 's5', 3),
(18, 's', 1),
(19, 's8', 1),
(20, 'clean', 1),
(21, 'shoe', 18),
(22, 'nike', 10),
(23, 'shoes', 8),
(24, 'hard', 2),
(25, 'disk', 1),
(26, 'computer', 6),
(27, 'drive', 1),
(28, 'pc', 2),
(29, 'ram', 3),
(30, 'gucci', 14),
(31, 'ice', 9),
(32, 'cream', 7),
(33, 'machine', 24),
(34, 'adidas', 8),
(35, 'air', 3),
(36, 'conditioner', 3),
(37, 'washing', 16),
(38, 'microwave', 1),
(39, 'oven', 1),
(40, 'block', 1),
(41, 'g', 1),
(42, 'wagon', 1),
(43, 'ps4', 17),
(44, 'console', 23),
(45, 'range', 3),
(46, 'rover', 3),
(47, 'sport', 3),
(48, 'mac', 2),
(49, 'pro', 2),
(50, 'ps3', 6),
(51, 'rolex', 1),
(52, 'watch', 1),
(53, 'bag', 4),
(54, 'rice', 2),
(55, 'highlander', 6),
(56, 'jeep', 5),
(57, 'book', 1),
(58, '2012', 1),
(59, 'c300', 1),
(60, '4matic', 1),
(61, 'LED', 3),
(62, 'tv', 3),
(63, '55', 3),
(64, 'inches', 3),
(65, 'play', 1),
(66, 'station', 2),
(67, '2', 1),
(68, 'cpu', 3),
(69, 'desktop', 5),
(70, 'work', 1),
(71, 'sony', 1),
(72, 'laptop', 1),
(73, 'dish', 1),
(74, 'hand', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `query` (`query`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `word` (`word`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
