-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 28, 2019 at 03:19 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `createdAt`, `updatedAt`) VALUES
(5, 'harish', 'node', '2019-06-27 15:07:58', '2019-06-27 15:07:58'),
(6, 'girish', '123', '2019-06-27 15:42:02', '2019-06-27 15:42:02'),
(7, 'boke', NULL, '2019-06-27 15:49:50', '2019-06-27 15:49:50'),
(8, 'bokew', NULL, '2019-06-27 15:53:44', '2019-06-27 15:53:44'),
(9, 'snehal', NULL, '2019-06-27 16:18:15', '2019-06-27 16:18:15'),
(10, 'snehal', 'pass@123', '2019-06-27 17:23:55', '2019-06-27 17:23:55'),
(11, 'snehal', 'pass@123', '2019-06-28 03:11:24', '2019-06-28 03:11:24'),
(12, 'yogita', 'pass@123', '2019-06-28 03:12:51', '2019-06-28 03:12:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
