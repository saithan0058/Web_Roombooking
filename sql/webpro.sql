-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2023 at 05:13 PM
-- Server version: 11.3.0-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webpro`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` smallint(5) UNSIGNED NOT NULL,
  `time` varchar(15) NOT NULL,
  `date` date NOT NULL,
  `status_request` varchar(10) NOT NULL,
  `booker` varchar(50) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `approve_name` varchar(25) DEFAULT NULL,
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `room_id` smallint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `time`, `date`, `status_request`, `booker`, `reason`, `description`, `approve_name`, `user_id`, `room_id`) VALUES
(196, '10:00-12:00', '2023-11-21', 'pending', 'Test Testing', 'A', '', 'Admin tester', 11, 45),
(197, '13:00-15:00', '2023-11-21', 'Approve', 'Test Testing', 'A', '', 'Admin tester', 11, 45),
(198, '08:00-10:00', '2023-11-22', 'pending', 'Test Testing', '', NULL, NULL, 11, 45),
(199, '10:00-12:00', '2023-11-22', 'pending', 'Test Testing', '', NULL, NULL, 11, 45);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(60) NOT NULL,
  `fName_sName` varchar(30) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `role` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `fName_sName`, `phone_number`, `student_id`, `role`) VALUES
(11, 'usertest@test.com', '$2b$10$hHM5gJ0oX75b4E8jWGXQB.Fk0erLfV.eAUeAKqQYEbD7fyyfzdp3u', 'Test Testing', '0123456789', '6431000000', 1),
(14, 'staff@staff.com', '$2b$10$hHM5gJ0oX75b4E8jWGXQB.Fk0erLfV.eAUeAKqQYEbD7fyyfzdp3u', 'Staff tester', '0123456789', '6431500000', 2),
(16, 'admin@admin.com', '$2b$10$PiuZ/Uui3tJkECox6Qoy5OOAYaJMikQuzaiK/Eu5jLtYV11twbICm', 'Admin tester', '0123456789', '6431500000', 3);

-- --------------------------------------------------------

--
-- Table structure for table `room_list`
--

CREATE TABLE `room_list` (
  `room_id` smallint(5) UNSIGNED NOT NULL,
  `room_name` varchar(30) NOT NULL,
  `room_number` varchar(10) NOT NULL,
  `people` varchar(20) NOT NULL,
  `facilities` varchar(50) NOT NULL,
  `room_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `room_list`
--

INSERT INTO `room_list` (`room_id`, `room_name`, `room_number`, `people`, `facilities`, `room_status`) VALUES
(45, 'A', '108', '10', 'Projecter,Audio Set', 'Enable'),
(46, 'A', '115', '15', 'Projecter,Microphone', 'Enable'),
(47, 'A', '105', '10', 'Projecter,Audio Set', 'Disable'),
(49, 'B', '113', '50', 'Projecter,Audio Set', 'Enable'),
(50, 'B', '312', '100', 'Whiteboard,Audio Set,Projecter', 'Enable'),
(51, 'C', '215', '10', 'Whiteboard', 'Disable'),
(52, 'C', '304', '50', 'Audio Set,Projecter', 'Disable'),
(53, 'C', '432', '100', 'Audio Set,Projecter', 'Disable'),
(55, 'E', '101', '8', 'Speaker', 'Disable'),
(57, 'S', '412', '9-12', 'Speaker , Microphone', 'Disable'),
(58, 'E', '401', '8', 'Speaker , Microphone', 'Disable');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_list`
--
ALTER TABLE `room_list`
  ADD PRIMARY KEY (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `room_list`
--
ALTER TABLE `room_list`
  MODIFY `room_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `room_list` (`room_id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `login` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
