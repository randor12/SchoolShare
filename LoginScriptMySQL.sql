CREATE DATABASE IF NOT EXISTS sarlaac DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use sarlaac;

CREATE TABLE IF NOT EXISTS `accounts` (
  `loginid` int(11) NOT NULL PRIMARY KEY,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `GUID` varchar(500) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `salt`) VALUES (1, 'Ryan', 'example', 'rynicholas@vt.edu', 'testSalt');

-- ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;


-- SELECT * FROM accounts where email = "test@gmail.com" and password = "t3stP@ss0rd";

-- select * from accounts;
