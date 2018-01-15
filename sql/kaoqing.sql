-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-15 09:55:08
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kaoqing`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `quanxian` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `account`, `password`, `name`, `sex`, `quanxian`) VALUES
(1, 'admin', '123', 'admin', '男', '1');

-- --------------------------------------------------------

--
-- 表的结构 `bumen`
--

CREATE TABLE `bumen` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `bumen`
--

INSERT INTO `bumen` (`id`, `name`) VALUES
(1, '技术部'),
(2, '人事部'),
(3, '服务部'),
(4, '销售部');

-- --------------------------------------------------------

--
-- 表的结构 `daiban`
--

CREATE TABLE `daiban` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `shixiang` varchar(255) DEFAULT NULL,
  `endtime` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `daiban`
--

INSERT INTO `daiban` (`id`, `user_id`, `shixiang`, `endtime`) VALUES
(1, 2, '测试事项1', 1516254900),
(2, 2, '测试事项2', 1516426620),
(3, 2, '测试事项3', 1518241140),
(4, 2, '测试事项4', 1517290860),
(5, 2, '测试事项5', 1516426920);

-- --------------------------------------------------------

--
-- 表的结构 `qiandao`
--

CREATE TABLE `qiandao` (
  `id` int(11) NOT NULL,
  `user_id` int(100) DEFAULT NULL,
  `qiandaotime` datetime DEFAULT NULL,
  `shenhe` int(11) DEFAULT NULL,
  `qiandaodidian` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `qiandao`
--

INSERT INTO `qiandao` (`id`, `user_id`, `qiandaotime`, `shenhe`, `qiandaodidian`) VALUES
(1, 2, '2018-01-15 10:36:11', 0, '106.4155, 28.5218'),
(4, 4, '2018-01-15 12:07:58', 0, '106.4155, 28.5218'),
(5, 3, '2018-01-15 12:09:56', 0, '106.4155, 28.5218'),
(6, 5, '2018-01-15 12:35:42', 0, '106.4155, 28.5218'),
(7, 6, '2018-01-15 12:36:36', 1, '106.4155, 28.5218');

-- --------------------------------------------------------

--
-- 表的结构 `qingjia`
--

CREATE TABLE `qingjia` (
  `id` int(111) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `start_time` int(100) DEFAULT NULL,
  `end_time` int(100) DEFAULT NULL,
  `shenhe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `qingjia`
--

INSERT INTO `qingjia` (`id`, `reason`, `user_id`, `start_time`, `end_time`, `shenhe`) VALUES
(1, '测试原因1', 2, 1516083540, 1516169940, 0),
(2, '测试原因2', 2, 1516083960, 1516256760, 0),
(3, '测试原因3', 2, 1516343340, 1516429740, 0);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gonghao` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bumen` varchar(255) DEFAULT NULL,
  `zhiwei` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ruzhitime` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `account`, `password`, `gonghao`, `name`, `bumen`, `zhiwei`, `sex`, `age`, `ruzhitime`) VALUES
(2, 'mht', '202cb962ac59075b964b07152d234b70', '01', '马化腾', '3', '2', '女', 26, 1516608300),
(3, 'my', '202cb962ac59075b964b07152d234b70', '02', '马云', '3', '4', '男', 43, 1514968680),
(4, 'lqd', '202cb962ac59075b964b07152d234b70', '03', '刘强东', '1', '3', '男', 33, 1514795940),
(5, 'cx', '202cb962ac59075b964b07152d234b70', '04', '陈翔', '1', '1', '男', 33, 1514882700),
(6, 'user05', '202cb962ac59075b964b07152d234b70', '05', 'user05', '4', '10', '男', 21, 1515055560),
(7, 'user06', '202cb962ac59075b964b07152d234b70', '06', 'user06', '2', '10', '女', 23, 1514882820),
(9, 'user08', '202cb962ac59075b964b07152d234b70', '08', 'user08', '2', '10', '女', 26, 1512550080),
(10, 'user09', '202cb962ac59075b964b07152d234b70', '09', 'user09', '1', '7', '女', 21, 1515574140),
(11, 'user10', '202cb962ac59075b964b07152d234b70', '10', 'user10', '3', '6', '男', 46, 1514969340),
(12, 'user11', '202cb962ac59075b964b07152d234b70', '11', 'user11', '1', '5', '男', 26, 1516006200),
(13, 'user12', '202cb962ac59075b964b07152d234b70', '12', 'user12', '2', '10', '女', 21, 1511772780),
(18, 'user15', '202cb962ac59075b964b07152d234b70', '15', 'user15', '2', '9', '女', 21, 1511783580);

-- --------------------------------------------------------

--
-- 表的结构 `zhiwei`
--

CREATE TABLE `zhiwei` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `zhiwei`
--

INSERT INTO `zhiwei` (`id`, `name`) VALUES
(1, '技术总监'),
(2, '高级前端工程师'),
(3, '前端工程师'),
(4, '前端助理'),
(5, '.NET高级开发工程师'),
(6, '.NET工程师'),
(7, '项目经理'),
(8, '测试助理'),
(9, '人事部总监'),
(10, '测试'),
(11, '测试2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bumen`
--
ALTER TABLE `bumen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daiban`
--
ALTER TABLE `daiban`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qiandao`
--
ALTER TABLE `qiandao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qingjia`
--
ALTER TABLE `qingjia`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zhiwei`
--
ALTER TABLE `zhiwei`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `bumen`
--
ALTER TABLE `bumen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `daiban`
--
ALTER TABLE `daiban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `qiandao`
--
ALTER TABLE `qiandao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `qingjia`
--
ALTER TABLE `qingjia`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- 使用表AUTO_INCREMENT `zhiwei`
--
ALTER TABLE `zhiwei`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
