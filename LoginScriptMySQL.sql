CREATE DATABASE IF NOT EXISTS schoolshare_schema DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use schoolshare_schema;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `salt` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `salt`) VALUES (1, 'test', 'test', 'test@test.com', 'testSalt');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;


SELECT * FROM accounts where email = "test@gmail.com" and password = "t3stP@ss0rd";

select * from accounts;
