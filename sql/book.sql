-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 07 月 21 日 08:40
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `book`
--
CREATE DATABASE IF NOT EXISTS `book` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `book`;

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id自增',
  `userID` varchar(40) DEFAULT NULL COMMENT '用户ID',
  `title` varchar(150) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `summary` varchar(300) DEFAULT NULL COMMENT '摘要',
  `origin` varchar(20) DEFAULT NULL COMMENT '来源',
  `originlink` varchar(300) DEFAULT NULL COMMENT '来源链接地址',
  `birthday` datetime DEFAULT NULL COMMENT '创建日期',
  `level` int(11) DEFAULT '1' COMMENT '级别，一般，优秀，删除设置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='文章内容' AUTO_INCREMENT=11 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
