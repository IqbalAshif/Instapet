-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql.metropolia.fi
-- Generation Time: Dec 13, 2020 at 05:57 PM
-- Server version: 10.1.48-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ashifi`
--

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `pet_id` int(10) UNSIGNED NOT NULL,
  `pet_type` text,
  `breed` text NOT NULL,
  `name` text NOT NULL,
  `age` int(11) NOT NULL,
  `weight` float NOT NULL,
  `owner` int(11) NOT NULL,
  `filename` text NOT NULL,
  `coords` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`pet_id`, `pet_type`, `breed`, `name`, `age`, `weight`, `owner`, `filename`, `coords`) VALUES
(114, 'Dog', 'German Shephard', 'Xobile', 3, 16, 96, '310ed6dac4c71cf9e8724939cfd98abf', NULL),
(116, 'Snake', 'Cobra', 'King Cobra', 1, 5, 98, 'b7edc73793c6e396b78beb390a362f9a', NULL),
(119, 'Dog', 'Breed', 'Name', 8, 3, 109, 'd63090488bb375e550947013f6494284', NULL),
(121, 'Dog', 'ss', 'James', 12, 4, 2, '8719bf861240692fd41f963324754899', NULL),
(112, 'Dog', 'Awesome', 'Mr. Doug ', 3, 15, 95, '26214606800e0bc7f6576578080ef23a', NULL),
(113, 'cat', 'Persian', 'Robert Cattinson', 3, 6, 95, '43cbfecf9dd60e9285140717b062cf86', NULL),
(110, 'cat', 'Awesome ', 'Mr Catsby', 1, 4, 94, '19127dc2d0ca03c06a6aca2f015a3e1b', NULL),
(106, 'cat', 'Awesome ', 'catmando', 12, 13, 2, 'cdbde54e5928488e91d0a49bbcb71484', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`) VALUES
(1, 'John Doe', 'john@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS'),
(2, 'Jane Doez', 'jane@metropolia.fi', '$2a$10$H7bXhRqd68DjwFIVkw3G1OpfIdRWIRb735GvvzCBeuMhac/ZniGba'),
(54, 'Georg', 'lala@ppp.fi', '$2a$10$H52pqtIbLYfSoTzwZfjk3e3GmJhtTRoSFM1X8.bIrD6y3jYvKZUm2'),
(55, 'AJ', 'bn@hotmail.com', '$2a$10$6jto5qNG7LEqYBmp/qvqfOqT5zwC.2OFGR2wIlaYsUo5Usud0p8f.'),
(56, 'Asif', 'ab@hotmail.com', '$2a$10$8bBKt2lYpqV2CdVZ/ksFCO6ucE9rCHhvKPW817.GgedGuRXe91ZfG'),
(52, 'Banana', 'banana@fruits.com', '$2a$10$ilL865Tyohiu5mJZiPm1AOwMsfntvf6QymEvDuxaSH6sjuND5SZj.'),
(53, 'Goga', 'sss@mail.ru', '$2a$10$Y4UZQvKZST04.OOqIsttgu6suKyKLnV/dG8ExNRWUOfr7Bscr.zFa'),
(103, 'pepe', 'pepe@test.fi', '$2a$10$EHZqkS5VEM7aQVmEUtaHCOu94yXcdco5eaC0lHF6tX7hYI5LqqgqS'),
(51, 'Kotik', 'gg@mlal.ru', '$2a$10$MgEi4htlT30cpxxetmGRcOJguHkmVgQHHa57z40yDva01g4barrfO'),
(49, 'Gosofd', 'wokfm@mail.com', '$2a$10$2K9982e8D0OJRxT/cy9AjOpKQprWzmtsA13cDAuO7vqqzYEi1q1uu'),
(102, 'Tester', 'testertt@gmail.com', '$2a$10$CjJ18f65ozd0LXpNaHsX..28c9VYkYSPqbm/q2bzb9pR2y75ZuX9C'),
(101, 'pepe', 'pepe@test.fi', '$2a$10$zmFJI2rs0IO9XFaI9U0A.OQ4WMJI0HKlGfcajC/dQ9Xel42TiviOy'),
(98, 'Snake charmer', 'snake@mm.fi', '$2a$10$tOqq0SqdjqgjS1u6Q4nzTupXRzaXSr.rVhiwB5vW49b4QyG9Esfky'),
(99, 'Tester', 'testertt@gmail.com', '$2a$10$ycehFXL1wM8dJ6bwwxcXue4Kmcgcuh7Fa8KZ0THyTUGiqrBX0hZPW'),
(100, 'Tester', 'testertt@gmail.com', '$2a$10$SwVqOSKFiUMSmT7y8dLnYuNtGdQXqS4Ch5VC2uCFvEB0cOb9w054G'),
(97, 'Georg', 'georgv@metropolia.fi', '$2a$10$ncl6egX1Kc0FRQ0.FSZx1.bkrjWqQzLwqKyxQRyvUIViq4vnILPJG'),
(94, 'Test1', 'test1@instapet.fi', '$2a$10$L2/EwpJeSn6eNxbdQ4OIGOu6xKd10U2sMcg3AS1x8AcilUJOi88I2'),
(95, 'Test2', 'test2@instapet.fi', '$2a$10$TPPr56XvV4ErpFeEcxInQ.cQzbTTnlJeLek7LwDQNgjXeovHzqZnm'),
(91, 'Ashif ', 'ab@hotmail.com', '$2a$10$/EK9nZqPMGt5zSwt3SQkRujxCs3m8y3fjEQybBMpo97aAk/ztbbfq'),
(92, 'Ashif ', 'b@hotmail.com', '$2a$10$UUlbk2e/f3SahXjLeYghd.R0G4KWZJi8yqOD79eh4S0GFgAr1baSC'),
(96, 'Test3', 'test3@instapet.fi', '$2a$10$fYbvRfD5XxVcV8k8MlBywug92AsnOqNW9uNhcHy2n3JdvryH5CNpa'),
(104, 'pepe', 'pepe@test.fi', '$2a$10$rlncIjnTDpDqs.HolAKs.eCvOzEPhBLmShX38Oe/dqgeLU1L4ZVYK'),
(105, 'pepe', 'pepe@test.fi', '$2a$10$tdST4Oj8B/bsDp6BVeyzfuepMPjWBt7.59Djvpf3PMOhhvv/DEF1K'),
(106, 'pepe', 'pepe@tasdasest.fi', '$2a$10$ifIti0Zf1zEuI7UTv4n/w.rWdYbiw3ZGkH6vc.WrDIFD4lyTaKBO.'),
(107, 'Ilkka', 'ilkka@test.fi', '$2a$10$9eGwyP/Fxufvh4jU9p.tjelR4iQWRiUL2RhrtMJYAb95azzFKGvHW'),
(108, 'pepe21312', 'pepe@tasdasest.fi', '$2a$10$izpcT9ygQIcDhyrBuLEH5O85yONAwKskhMISzEEKeDt3/NGPijlRy'),
(109, 'Test123', 'test1@test.fi', '$2a$10$lvk4ZYNC3hqJt3V7u5saIuCbYd1BN9BeiYijk.ZvpzufXIPhuslcu'),
(110, 'user1', 'user1@test.com', '$2a$10$2p9IX6qSxWZkTsh./Ep9QelLLmXkewp4MOTlpM1zbU9dNEiObnzCi'),
(111, 'user1', 'user1@test.com', '$2a$10$EXfoWpszoey1Q771B8hB4eIfiXVUV/K4HKztygndUPrwIh7L0N0fu'),
(112, 'Test123', 'test1@test.fi', '$2a$10$dLWx8kmIB5qqxBE6A3FuRuhdgS19lU1xnDKrrJWJN7knUS7z0s5cW'),
(113, 'Shajia', 'sss@fff.com', '$2a$10$pKKh46iBqIbCeLQpOvU44ejjE1WkutRuoB8j/U7G31BJr.1YOKX5G'),
(114, 'tbtester', 'tbtester@metropolia.fi', '$2a$10$M6LnzfJ9wh6HrUMS77/h4u06UnQVff9AaMy668yil1twDcdOdEo5W');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `pet_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
