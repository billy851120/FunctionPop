-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-24 03:55:53
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `functionpop`
--

-- --------------------------------------------------------

--
-- 資料表結構 `customer_id`
--

CREATE TABLE `customer_id` (
  `cName` varchar(20) NOT NULL,
  `cBirth` varchar(10) NOT NULL,
  `cgender` enum('M','F','X') NOT NULL,
  `cAccount` varchar(50) NOT NULL,
  `cPhone` varchar(10) DEFAULT NULL,
  `cAddr` varchar(50) DEFAULT NULL,
  `cCreated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `customer_id`
--

INSERT INTO `customer_id` (`cName`, `cBirth`, `cgender`, `cAccount`, `cPhone`, `cAddr`, `cCreated`) VALUES
('吳文華', '1969-02-15', 'X', 'werre34455@superstar.com', '0918979999', '宜蘭縣三星鄉忠平路22號', '0000-00-00 00:00:00'),
('張金鳳', '1978-12-04', 'F', 'wcd516222@superstar.com', '0907454512', '高雄市大社區民族路20號', '0000-00-00 00:00:00'),
('徐博美', '1995-12-18', 'F', 'crqqqt37476al@superstar.com', '0907458865', '苗栗縣公館鄉仁愛路11號', '0000-00-00 00:00:00'),
('徐洋洋', '1987-11-19', 'M', 'lasvsfbd2vnla@superstar.com', '0918885456', '彰化縣埔心鄉仁五路35號', '0000-00-00 00:00:00'),
('徐豪彬', '1978-11-30', 'F', '199822wwdca@superstar.com', '0917785456', '臺中市北區崇德路10號', '0000-00-00 00:00:00'),
('李文婷', '1987-03-15', 'M', 'qzaqz11@superstar.com', '0916551742', '高雄市大寮區會昭街30號', '0000-00-00 00:00:00'),
('李豐瑤', '1972-04-11', 'F', 'qaz5151ne@superstar.com', '0946777535', '臺北市南港區重陽路21號', '0000-00-00 00:00:00'),
('林柯基', '1994-02-18', 'X', 'pekkffk3434ky@superstar.com', '0916556883', '臺中市北區天津一街16號', '0000-00-00 00:00:00'),
('柯韋志', '1985-04-12', 'F', 'lovek5n45ie@superstar.com', '0914258868', '  嘉義市西區泰瑞一街12號', '0000-00-00 00:00:00'),
('楊維瑞', '1977-07-07', 'F', 'zhsdwsxedcr3ng@superstar.com', '0956688366', ' 雲林縣元長鄉中洽3號', '0000-00-00 00:00:00'),
('潘勝敬', '1970-08-28', 'M', 'ig34FH25n45ie@superstar.com', '0914558868', ' 雲林縣西螺鎮廣興路3號', '0000-00-00 00:00:00'),
('王八博', '1983-09-06', 'M', 'fdppp3g43trhs@superstar.com', '0918978888', '屏東縣內埔鄉東川18號', '0000-00-00 00:00:00'),
('簡靖君', '1997-08-06', 'F', 'eldfs44446ven@superstar.com', '0988588876', '宜蘭縣冬山鄉寶慶二路33號', '0000-00-00 00:00:00'),
('蔡偉平', '1983-05-05', 'M', 'elBBB4446ven@superstar.com', '0944588876', '臺中市石岡區廣華街32號', '0000-00-00 00:00:00'),
('賴勝寧', '1999-08-28', 'M', 'ihgff354gfhne@superstar.com', '0946888535', '台北市建國路177號6樓', '0000-00-00 00:00:00'),
('趙文豪', '1985-05-02', 'M', 'jiSSlunsdf@superstar.com', '0924881111', '臺南市東區裕和路23號', '0000-00-00 00:00:00'),
('陳天寧', '1986-10-01', 'M', 'ivybfh2235bfb@superstar.com', '0955881230', '新北市蘆洲區長樂路3號', '0000-00-00 00:00:00'),
('黃君幸', '1975-07-01', 'F', 'wsx435bfb@superstar.com', '0957272230', '桃園市新屋區清華路4號', '0000-00-00 00:00:00'),
('黃好輪', '1984-10-17', 'M', 'zhsdg5gbgr3ng@superstar.com', '0951988366', '台北市三民路1巷10號', '0000-00-00 00:00:00'),
('黃楚輪', '1988-12-07', 'M', 'jindfvglunsdf@superstar.com', '0958881111', '新北市三峽區金敏7號', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `customer_pwd`
--

CREATE TABLE `customer_pwd` (
  `id` int(11) NOT NULL,
  `cName` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Account` varchar(60) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(60) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `customer_pwd`
--

INSERT INTO `customer_pwd` (`id`, `cName`, `Account`, `Password`) VALUES
(1, '簡靖君', 'eldfs44446ven@superstar.com', '354366'),
(2, '黃楚輪', 'jindfvglunsdf@superstar.com', '63463t'),
(3, '潘勝敬', 'ig34FH25n45ie@superstar.com', '235ytr'),
(4, '賴勝寧', 'ihgff354gfhne@superstar.com', '357211'),
(5, '陳天寧', 'ivybfh2235bfb@superstar.com', '156517'),
(6, '黃好輪', 'zhsdg5gbgr3ng@superstar.com', 'v52747'),
(7, '徐洋洋', 'lasvsfbd2vnla@superstar.com', '4g2bsw'),
(8, '徐博美', 'crqqqt37476al@superstar.com', '2g2bdb'),
(9, '林柯基', 'pekkffk3434ky@superstar.com', '4v216u'),
(10, '王八博', 'fdppp3g43trhs@superstar.com', '1821w6'),
(11, '蔡偉平', 'elBBB4446ven@superstar.com', '1821ww'),
(12, '趙文豪', 'jiSSlunsdf@superstar.com', '15v1ww'),
(13, '柯韋志', 'lovek5n45ie@superstar.com', '15v1ww'),
(14, '李豐瑤', 'qaz5151ne@superstar.com', '1svvww'),
(15, '黃君幸', 'wsx435bfb@superstar.com', '1s855w'),
(16, '楊維瑞', 'zhsdwsxedcr3ng@superstar.com', '1s8sv5'),
(17, '徐豪彬', '199822wwdca@superstar.com', '1s8sv6'),
(18, '張金鳳', 'wcd516222@superstar.com', 'sfdfdf'),
(19, '李文婷', 'qzaqz11@superstar.com', '4bfdmd'),
(20, '吳文華', 'werre34455@superstar.com', 'sfdf33');

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_cost` decimal(6,0) NOT NULL,
  `order_status` varchar(100) NOT NULL DEFAULT 'on_hold',
  `user_id` int(11) NOT NULL,
  `user_phone` int(11) NOT NULL,
  `user_city` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `order_items`
--

CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_category` varchar(100) NOT NULL,
  `product_gender` varchar(100) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_composition` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_image2` varchar(255) NOT NULL,
  `product_image3` varchar(255) NOT NULL,
  `product_image4` varchar(255) NOT NULL,
  `product_price` decimal(6,0) NOT NULL,
  `product_special_offer` int(2) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `product_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_upload` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_rating` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_category`, `product_gender`, `product_description`, `product_composition`, `product_image`, `product_image2`, `product_image3`, `product_image4`, `product_price`, `product_special_offer`, `product_code`, `product_update`, `product_upload`, `product_rating`) VALUES
(1, '休閒剪裁棉質T恤', 'shirts', 'M', 'T恤，柔軟棉質平紋布料，休閒剪裁。細羅紋圓領，垂肩設計，直身下襬。', '棉 100%', 'FP1_80100001_beige_0.jpg', 'FP1_80100001_turquoise_0.jpg', 'FP1_80100001_beige_1.webp', 'FP1_80100001_turquoise_1.webp', '499', 0, 'FP1_80100001', '2022-06-15 07:03:05', '2022-06-12 03:18:39', '4.21'),
(2, '標準剪裁T恤', 'shirts', 'M', '圓領T恤，柔軟粗紡棉質平紋布料，有開口式單胸袋。', '棉 100%', 'FP1_80100002_black_0.jpg', 'FP1_80100002_lightblue_0.jpg', 'FP1_80100002_turquoise_0.jpg', 'FP1_80100002_white_0.jpg', '349', 0, 'FP1_80100002', '2022-06-12 02:41:40', '2022-06-12 03:18:39', '3.92'),
(3, '加大碼棉質T恤', 'shirts', 'M', '加大碼T恤，棉質平紋布料，羅紋圓領，垂肩設計。', '棉 100%', 'FP1_80100003_lightgreen_0.jpg', 'FP1_80100003_lightgreen_1.jpg', 'FP1_80100003_white_0.jpg', 'FP1_80100003_white_1.jpg', '499', 0, 'FP1_80100003', '2022-06-12 02:41:40', '2022-06-12 03:18:39', '4.44'),
(4, '休閒剪裁圖案T恤', 'shirts', 'M', '圖案T恤，柔軟棉質平紋布料，休閒剪裁。羅紋圓領，垂肩設計，直身下襬。', '棉 100%', 'FP1_80100004_lightblue_0.jpg', 'FP1_80100004_lightblue_1.webp', 'FP1_80100004_lightblue_2.webp', 'FP1_80100004_lightblue_3.webp', '699', 0, 'FP1_80100004', '2022-06-12 02:51:07', '2022-06-12 03:18:39', '4.70'),
(5, '休閒剪裁圖案T恤', 'shirts', 'M', '圖案T恤，柔軟棉質平紋布料，休閒剪裁。羅紋圓領，垂肩設計，直身下襬。', '棉 100%', 'FP1_80100005_white_0.jpg', 'FP1_80100005_white_1.jpg', 'FP1_80100005_white_2.jpg', 'FP1_80100005_white_3.jpg', '699', 0, 'FP1_80100005', '2022-06-12 03:27:59', '2022-06-12 03:26:34', '4.51'),
(6, '休閒剪裁棉質T恤', 'shirts', 'M', '柔軟棉質平紋T恤，休閒剪裁，印有圖案。羅紋圓領，垂肩設計，直身下襬。', '棉 100%', 'FP1_80100006_blue_0.jpg', 'FP1_80100006_blue_1.jpg', 'FP1_80100006_blue_2.jpg', 'FP1_80100006_blue_3.jpg', '349', 0, 'FP1_80100006', '2022-06-12 03:33:39', '2022-06-12 03:33:39', '4.48'),
(7, '棉質Polo衫', 'shirts', 'M', '棉質網眼Polo衫，羅紋衣領，鈕扣半開襟，短袖有羅紋袖口，兩側開衩。', '棉 100%', 'FP1_80100007_black_0.jpg', 'FP1_80100007_black_1.jpg', 'FP1_80100007_black_2.jpg', 'FP1_80100007_black_3.jpg', '349', 0, 'FP1_80100007', '2022-06-12 05:46:51', '2022-06-12 05:46:51', '3.92'),
(8, '休閒剪裁圖案T恤', 'shirts', 'M', '圖案T恤，柔軟棉質平紋布料。休閒剪裁。', '棉 100%', 'FP1_80100008_lightpink_0.jpg', 'FP1_80100008_lightpink_1.jpg', 'FP1_80100008_lightpink_2.jpg', 'FP1_80100008_lightpink_3.jpg', '699', 0, 'FP1_80100008', '2022-06-12 05:52:37', '2022-06-12 05:52:37', '3.63'),
(9, '健美合身剪裁網眼Polo衫', 'shirts', 'M', '健美合身剪裁網眼Polo衫', '棉 97%, 彈性纖維 3%', 'FP1_80100009_turquoise_0.jpg', 'FP1_80100009_turquoise_1.jpg', 'FP1_80100009_turquoise_2.jpg', 'FP1_80100009_turquoise_3.jpg', '499', 0, 'FP1_80100009', '2022-06-12 06:36:42', '2022-06-12 06:36:42', '3.33'),
(10, '加大碼橄欖球衫', 'shirts', 'M', '加大碼有領橄欖球衫，柔軟棉質平紋布料，隱形鈕扣半開襟，垂肩長袖有羅紋袖口，下襬兩側開衩。', '<br>外層: 棉 100%\r\n<br>衣領: 棉 100%', 'FP1_80100010_darkgreen_0.jpg', 'FP1_80100010_darkgreen_1.jpg', 'FP1_80100010_darkgreen_2.jpg', 'FP1_80100010_darkgreen_3.jpg', '699', 0, 'FP1_80100010', '2022-06-12 08:00:43', '2022-06-12 07:32:02', '2.99'),
(11, '緊身西裝褲', 'pants', 'M', '彈性平織西裝褲，拉鍊門襟配隱形鉤扣，有側袋和嵌線後袋，褲管有褶線。緊身剪裁 ─ 褲管略短，大腿、膝蓋及腳踝部位貼身剪裁，打造完美合身線條。', '<br>\r\n外層: 聚酯纖維 67%, 嫘縈 32%, 彈性纖維 1% <br>\r\n口袋內裡: 聚酯纖維 80%, 棉 20%', 'FP1_80200001_darkblue_0.jpg', 'FP1_80200001_darkblue_1.jpg', 'FP1_80200001_darkblue_2.jpg', 'FP1_80200001_darkblue_3.jpg', '1299', 0, 'FP1_80200001', '2022-06-12 08:00:16', '2022-06-12 07:55:13', '4.02'),
(12, '休閒剪裁工作褲', 'pants', 'M', '棉質平織長褲，中腰休閒剪裁，覆面鬆緊帶腰圍配抽繩，有斜側袋，後袋和褲管袋皆有魔鬼粘式翻蓋，另有一個拉鍊式隱形褲管袋。膝部有接縫設計，褲腳有彈性抽繩。', '<br>口袋內裡: 棉 100%\r\n<br>外層: 棉 97%, 彈性纖維 3%', 'FP1_80200002_beige_0.jpg', 'FP1_80200002_beige_1.jpg', 'FP1_80200002_beige_2.jpg', 'FP1_80200002_beige_3.jpg', '1299', 0, 'FP1_80200002', '2022-06-12 08:31:04', '2022-06-12 08:03:44', '3.87'),
(13, '合身亞麻混紡長褲', 'pants', 'M', '透氣棉麻平織長褲，中腰合身剪裁，覆面鬆緊帶腰圍配抽繩，拉鍊門襟配鉤扣，有側袋和一個嵌線後袋。', '<br>外層: 亞麻 54%, 棉 46%\r\n<br>口袋內裡: 聚酯纖維 65%, 棉 35%', 'FP1_80200003_darkbeige_0.jpg', 'FP1_80200003_darkbeige_1.jpg', 'FP1_80200003_darkbeige_2.jpg', 'FP1_80200003_darkbeige_3.jpg', '999', 0, 'FP1_80200003', '2022-06-12 08:34:58', '2022-06-12 08:34:58', '4.67'),
(14, '貼身西裝褲', 'pants', 'M', '九分西裝褲，平織布料，拉鍊門襟配隱形鉤扣，有側袋和嵌線後袋，褲管有褶線。大腿、膝蓋及腳踝部位貼身剪裁，打造合身線條。', '<br>外層: 聚酯纖維 67%, 嫘縈 31%, 彈性纖維 2%\r\n<br>口袋內裡: 聚酯纖維 91%, 棉 9%', 'FP1_80200004_bluemelange_0.jpg', 'FP1_80200004_bluemelange_1.jpg', 'FP1_80200004_bluemelange_2.jpg', 'FP1_80200004_bluemelange_3.jpg', '1299', 0, 'FP1_80200004', '2022-06-12 08:41:16', '2022-06-12 08:41:16', '3.48'),
(15, '合身亞麻混紡慢跑褲', 'pants', 'M', '棉麻平織慢跑褲，覆面鬆緊帶腰圍配抽繩，有斜側袋和嵌線後袋，褲腳有覆面鬆緊帶。合身剪裁－經典剪裁提供大腿和膝部充足的空間方便活動，打造舒適直筒線條。', '亞麻 55%, 棉 45%\r\n<br>口袋: 棉 100%', 'FP1_80200005_khakigreen_0.jpg', 'FP1_80200005_khakigreen_1.jpg', 'FP1_80200005_khakigreen_2.jpg', '', '699', 0, 'FP1_80200005', '2022-06-12 08:52:15', '2022-06-12 08:52:15', '4.11'),
(16, '合身慢跑褲', 'pants', 'M', '棉混紡面料運動褲。 帶包邊鬆緊帶和束帶的腰帶。 側縫口袋，羅紋下擺，內部柔軟拉絨。', '棉 60%, 聚酯纖維 40%', 'FP1_80200006_steelgray_0.jpg', 'FP1_80200006_steelgray_1.jpg', 'FP1_80200006_steelgray_2.jpg', 'FP1_80200006_steelgray_3.jpg', '599', 0, 'FP1_80200006', '2022-06-12 09:00:55', '2022-06-12 09:00:55', '4.07'),
(17, '跑步長褲', 'pants', 'M', '跑步長褲，快乾機能布料，讓運動時能保持乾爽。鬆緊帶腰圍配隱形抽繩，拉鍊式側袋有網布內裡，褲管收窄，褲腳配拉鍊，帶反光細節。', '聚酯纖維 86%, 彈性纖維 14%', 'FP1_80200007_sagegreen_0.jpg', 'FP1_80200007_sagegreen_1.jpg', 'FP1_80200007_sagegreen_2.jpg', 'FP1_80200007_sagegreen_3.jpg', '999', 0, 'FP1_80200007', '2022-06-12 09:05:45', '2022-06-12 09:05:45', '4.19'),
(18, '合身九分慢跑褲', 'pants', 'M', '九分慢跑褲，柔軟棉質斜紋布料，覆面鬆緊帶腰圍配隱形抽繩，拉鍊門襟配鈕扣，有斜側袋和鈕扣式嵌線後袋。合身剪裁－經典剪裁提供大腿和膝部充足的空間方便活動，打造舒適直筒線條。', '<br>口袋內裡: 聚酯纖維 65%, 棉 35%\r\n<br>外層: 棉 98%, 彈性纖維 2%', 'FP1_80200008_black_0.jpg', 'FP1_80200008_black_1.jpg', 'FP1_80200008_black_2.jpg', 'FP1_80200008_black_3.jpg', '799', 0, 'FP1_80200008', '2022-06-12 11:19:47', '2022-06-12 11:19:47', '4.22'),
(19, '貼身九分褲', 'pants', 'M', '九分褲，平織布料，腰部有隱形鉤扣和鈕扣，拉鍊門襟，有側袋和鈕扣式嵌線後袋，褲管有褶線。大腿和膝部貼身剪裁，打造合身線條。', '聚酯纖維 83%, 嫘縈 15%, 彈性纖維 2%', 'FP1_80200009_lightgray_0.jpg', 'FP1_80200009_lightgray_1.jpg', 'FP1_80200009_lightgray_2.jpg', 'FP1_80200009_lightgray_3.jpg', '699', 0, 'FP1_80200009', '2022-06-12 11:24:13', '2022-06-12 11:24:13', '4.23'),
(20, '防潑水卡其褲', 'pants', 'M', '卡其褲，防潑水尼龍布料，能防小雨。四面彈性機能，可提供極佳舒適感並增加靈活度。拉鍊門襟配按扣，有側袋、一個手機口袋和一個隱形拉鍊式後袋。腰部正面有小掛圈，可掛鑰匙圈。', '<br>口袋內裡: 聚酯纖維 80%, 棉 20%\r\n<br>外層: 聚醯胺纖維 88%, 彈性纖維 12%', 'FP1_80200010_black_0.jpg', 'FP1_80200010_black_1.jpg', 'FP1_80200010_black_2.jpg', 'FP1_80200010_black_3.jpg', '1499', 0, 'FP1_80200010', '2022-06-12 11:28:31', '2022-06-12 11:28:31', '4.21'),
(21, '德比鞋', 'shoes', 'M', '柔軟仿麂皮德比鞋，開放式鞋翼。棉質帆布內裡和內底，花紋鞋底。跟高2公分。', '<br>鞋底: 熱塑性橡膠 100%\r\n<br>鞋幫: 聚酯纖維 100%\r\n<br>內裡: 棉 100%', 'FP1_80300001_black_0.jpg', 'FP1_80300001_black_1.jpg', 'FP1_80300001_black_2.jpg', 'FP1_80300001_black_3.jpg', '1299', 0, 'FP1_80300001', '2022-06-12 11:35:59', '2022-06-12 11:35:59', '3.28'),
(22, '戲水鞋\r\n', 'shoes', 'M', '戲水鞋，鞋面有寬飾帶，壓模內底。花紋鞋底，高4.5公分。', '<br>內裡: 乙烯-醋酸乙烯酯共聚物 100%\r\n<br>鞋幫: 乙烯-醋酸乙烯酯共聚物 100%\r\n<br>鞋底: 乙烯-醋酸乙烯酯共聚物 100%', 'FP1_80300002_black_0.jpg', 'FP1_80300002_black_1.jpg', 'FP1_80300002_black_2.jpg', '', '699', 0, 'FP1_80300002', '2022-06-12 11:40:31', '2022-06-12 11:40:31', '3.79'),
(23, '懶人鞋', 'shoes', 'M', '平織布料運動鞋，網布鞋面，兩側鑲鬆緊帶，有後跟拉環。軟木內底；花紋橡膠鞋底，高2公分。', '<br>鞋幫: 聚酯纖維 100%\r\n<br>鞋底: 橡膠 100%\r\n<br>內裡: 棉 100%', 'FP1_80300003_darkblue_0.jpg', 'FP1_80300003_darkblue_1.jpg', 'FP1_80300003_darkblue_2.jpg', 'FP1_80300003_darkblue_3.jpg', '699', 0, 'FP1_80300003', '2022-06-12 12:21:25', '2022-06-12 12:21:25', '3.98'),
(24, '高筒帆布鞋', 'shoes', 'M', '運動鞋。 厚棉帆布高幫上衣，正面有鞋舌和繫帶。 一側有金屬扣眼。 棉帆布襯里和鞋墊。 圖案橡膠鞋底。', '<br>鞋底: 橡膠 100%\r\n<br>鞋幫: 棉 100%\r\n<br>內裡: 棉 100%', 'FP1_80300004_blue_0.jpg', 'FP1_80300004_blue_1.jpg', 'FP1_80300004_blue_2.jpg', 'FP1_80300004_blue_3.jpg', '799', 0, 'FP1_80300004', '2022-06-12 12:35:41', '2022-06-12 12:35:41', '4.28'),
(25, '帆布運動鞋', 'shoes', 'M', '仿皮人字拖，鞋面有車棉飾帶，壓模內底。花紋鞋底，高2公分。', '<br>內裡: 棉 100%\r\n<br>鞋底: 橡膠 100%\r\n<br>鞋幫: 棉 100%', 'FP1_80300005_turquoise_0.jpg', 'FP1_80300005_turquoise_1.jpg', 'FP1_80300005_turquoise_2.jpg', 'FP1_80300005_turquoise_3.jpg', '699', 0, 'FP1_80300005', '2022-06-12 12:54:10', '2022-06-12 12:53:09', '4.42'),
(26, '可收納多功能包', 'bags', 'M', '多功能包，抗撕裂布料，可作為後背包和手提包。上部有雙提把，包口有拉鍊，可調式薄鋪棉背帶有扣鎖，背面口袋可隱藏背帶。正面有一個拉鍊式夾層，兩側有開放式網布夾層。有一個拉鍊式內夾層，包包可輕鬆折疊並收納於此夾層，收納完成時有實用背帶。有內裡。深約8公分，寬約34公分，高約35公分。', '<br>外層: 聚酯纖維 100%\r\n<br>內裡: 聚酯纖維 100%\r\n<br>內襯: 聚乙烯纖維 100%', 'FP1_80400001_black_0.jpg', 'FP1_80400001_black_1.jpg', 'FP1_80400001_black_2.jpg', 'FP1_80400001_black_3.jpg', '999', 0, 'FP1_80400001', '2022-06-12 13:55:32', '2022-06-12 13:55:32', '3.96'),
(27, '度假包', 'bags', 'M', '平織布料度假包，上部有雙提把，包口有雙頭拉鍊，可調式背帶可拆。短側有可調式扣帶，可調整包包大小。有一個拉鍊式外格和一個拉鍊式內夾層。有內裡。深22公分，寬48公分，高39公分。', '<br>外層: 聚酯纖維 100%\r\n<br>內裡: 聚酯纖維 100%', 'FP1_80400002_black_0.jpg', 'FP1_80400002_black_1.jpg', 'FP1_80400002_black_2.jpg', 'FP1_80400002_black_3.jpg', '799', 0, 'FP1_80400002', '2022-06-15 12:44:35', '2022-06-15 12:43:16', '3.92'),
(28, '腰包', 'bags', 'M', '腰包，耐用平織布料，正面有一個不對稱網布夾層，背面有一個拉鍊式網布夾層。包口有雙頭拉鍊，可調式腰帶配塑膠扣鎖。有內裡。深7.5公分，高16公分，寬36公分。', '<br>內裡: 聚酯纖維 100%\r\n<br>外層: 聚酯纖維 100%', 'FP1_80400003_lightpurple_0.jpg', 'FP1_80400003_lightpurple_1.jpg', 'FP1_80400003_lightpurple_2.jpg', 'FP1_80400003_lightpurple_3.jpg', '699', 0, 'FP1_80400003', '2022-06-15 12:46:10', '2022-06-15 12:46:10', '4.03'),
(29, '卷口式後背包', 'bags', 'M', '平織布料後背包，上部有單提把，卷式包口有拉鍊和可調式塑膠扣扣帶。可調式鋪棉背帶，兩側皆有夾層和可調式塑膠扣扣帶。背面有拉鍊式鋪棉筆電夾層，有一個拉鍊式網布小內夾層。鋪棉底墊。有內裡。包底寬約26公分，包口收卷後高約44公分。', '<br>外層: 聚酯纖維 100%\r\n<br>內襯: 聚乙烯纖維 100%\r\n<br>內裡: 聚酯纖維 100%', 'FP1_80400004_black_0.jpg', 'FP1_80400004_black_1.jpg', 'FP1_80400004_black_2.jpg', 'FP1_80400004_black_3.jpg', '999', 0, 'FP1_80400004', '2022-06-16 01:44:41', '2022-06-16 01:44:41', '4.08'),
(30, '小肩包', 'bags', 'M', '小肩包，平織布料，包口有拉鍊，可調式背帶可拆。正面有一個拉鍊式外格，背面有一個開口式小外格，有一個內夾層。有內裡。深2.5公分，寬11公分，高17.5公分。', '<br>外層: 聚酯纖維 100%\r\n<br>內裡: 聚酯纖維 100%', 'FP1_80400005_black_0.jpg', 'FP1_80400005_black_1.jpg', 'FP1_80400005_black_2.jpg', 'FP1_80400005_black_3.jpg', '399', 0, 'FP1_80400005_black', '2022-06-16 01:50:19', '2022-06-16 01:50:19', '3.61'),
(31, '羅紋T恤', '上衣', 'Female', '長版T恤，柔軟棉質混紡羅紋平紋布料，圓領有飾邊，垂肩設計，不收邊直身下襬，兩側開衩。', '棉 62%, 聚酯纖維 33%, 彈性纖維 5%', 'FP2_80100001_cream_0.jpg', 'FP2_80100001_cream_1.jpg', 'FP2_80100001_cream_2.jpg', 'FP2_80100001_cream_3.jpg', '699', 0, 'FP2_80100001', '2022-06-16 03:41:06', '2022-06-16 01:56:08', '3.93'),
(32, '莫代爾混紡T恤', '上衣', 'Female', '莫代爾和棉混紡柔軟竹節平紋針織T恤。寬領口和圓形下擺。', '棉 50%, 莫代爾纖維 50%', 'FP2_80100002_lightbluemelange_0.jpg', 'FP2_80100002_lightbluemelange_1.jpg', 'FP2_80100002_lightbluemelange_2.jpg', 'FP2_80100002_lightbluemelange_3.jpg', '349', 0, 'FP2_80100002', '2022-06-16 03:40:50', '2022-06-16 02:49:42', '4.88'),
(33, '亞麻混紡女衫', '上衣', 'Female', '透氣梭織亞麻棉混紡襯衫。 圓領，V 形開口，頂部有窄繫帶，泡泡袖，袖口和下擺有包邊鬆緊帶。 無襯裡。', '亞麻 55%, 棉 45%', 'FP2_80100003_white_0.jpg', 'FP2_80100003_white_1.jpg', 'FP2_80100003_white_2.jpg', 'FP2_80100003_white_3.jpg', '699', 0, 'FP2_80100003', '2022-06-16 03:41:30', '2022-06-16 03:11:51', '4.80'),
(34, '加大碼圖案T恤', '上衣', 'Female', '加大碼圖案T恤，棉質平紋布料，寬鬆垂肩五分袖。', '棉 100%', 'FP2_80100004_pink_0.jpg', 'FP2_80100004_pink_1.jpg', 'FP2_80100004_pink_2.jpg', 'FP2_80100004_pink_3.jpg', '499', 0, 'FP2_80100004', '2022-06-16 03:41:49', '2022-06-16 03:33:30', '3.75'),
(35, '短版T恤', '上衣', 'Female', '短版T恤，柔軟平紋布料，方形剪裁，羅紋圓領，垂肩寬鬆衣袖。', '棉 100%', 'FP2_80100005_lightyellow_0.jpg', 'FP2_80100005_lightyellow_1.jpg', 'FP2_80100005_lightyellow_2.jpg', 'FP2_80100005_lightyellow_3.jpg', '149', 0, 'FP2_80100005', '2022-06-16 03:48:43', '2022-06-16 03:48:43', '4.20'),
(36, '莫代爾混紡洋裝', '洋裝與裙子', 'Female', '圓領中長版洋裝，柔軟莫代爾纖維和棉質混紡平紋布料，長袖款式，兩側開衩。', '莫代爾纖維 52%, 棉 48%', 'FP2_80100006_khakigreen_0.jpg', 'FP2_80100006_khakigreen_1.jpg', 'FP2_80100006_khakigreen_2.jpg', 'FP2_80100006_khakigreen_3.jpg', '699', 0, 'FP2_80100006', '2022-06-16 03:58:02', '2022-06-16 03:58:02', '3.29'),
(37, '萊賽爾混紡羅紋洋裝', '洋裝與裙子', 'Female', '羅紋精織中長版洋裝，萊賽爾混紡布料，合身剪裁，方領，細肩帶，兩側開衩。', '萊賽爾 77%, 聚醯胺纖維 23%', 'FP2_80100007_beige_0.jpg', 'FP2_80100007_beige_1.jpg', 'FP2_80100007_beige_2.jpg', 'FP2_80100007_beige_3.jpg', '1999', 0, 'FP2_80100007', '2022-06-16 04:04:12', '2022-06-16 04:04:12', '3.3'),
(38, '棉質T恤洋裝', '洋裝與裙子', 'Female', 'T恤短洋裝，厚實棉質平紋布料，直身剪裁，羅紋圓領。無內裡。', '棉 100%', 'FP2_80100008_white_0.jpg', 'FP2_80100008_white_1.jpg', 'FP2_80100008_white_2.jpg', 'FP2_80100008_white_3.jpg', '499', 0, 'FP2_80100008', '2022-06-16 05:51:43', '2022-06-16 05:51:43', '4.17'),
(39, '加大碼圖案T恤洋裝', '洋裝與裙子', 'Female', '超大款短款連衣裙，柔軟針織面料，正面飾有印花圖案。 羅紋圓領、重度落肩和寬袖。', '棉 100%', 'FP2_80100009_blue_0.jpg', 'FP2_80100009_blue_1.jpg', 'FP2_80100009_blue_2.jpg', 'FP2_80100009_blue_3.jpg', '699', 0, 'FP2_80100009', '2022-06-16 06:09:52', '2022-06-16 06:09:52', '4.41'),
(40, '百褶洋裝', '洋裝與裙子', 'Female', '中長版百褶洋裝，平紋布料，細肩帶，前後開V領，正面縫固交疊式設計有裝飾綁帶。無內裡。', '外層: 再生聚酯纖維 100%', 'FP2_80100010_lightblue_0.jpg', 'FP2_80100010_lightblue_1.jpg', 'FP2_80100010_lightblue_2.jpg', 'FP2_80100010_lightblue_3.jpg', '999', 0, 'FP2_80100010', '2022-06-16 06:19:33', '2022-06-16 06:19:33', '4.3'),
(41, '交疊式洋裝', '洋裝與裙子', 'Female', '平紋中長版洋裝，略帶垂墜感，縫固交疊式V領設計，一側有細綁帶。蝴蝶袖帶柔軟垂墜感，微傘狀裙襬。', '<br>內裡: 聚酯纖維 100%\r\n<br>外層: 聚酯纖維 95%, 彈性纖維 5%', 'FP2_80100011_greige_0.jpg', 'FP2_80100011_greige_1.jpg', 'FP2_80100011_greige_2.jpg', 'FP2_80100011_greige_3.jpg', '799', 0, 'FP2_80100011', '2022-06-16 06:40:51', '2022-06-16 06:40:51', '4.72'),
(42, '綁帶襯衫式洋裝', '洋裝與裙子', 'Female', '有領襯衫式洋裝，棉質平織布料，正面隱形鈕扣開襟。低垂肩長袖，袖口配鈕扣。腰部有可拆式綁帶，圓邊裙襬。', '棉 100%', 'FP2_80100012_purple_0.jpg', 'FP2_80100012_purple_1.jpg', 'FP2_80100012_purple_2.jpg', 'FP2_80100012_purple_3.jpg', '799', 0, 'FP2_80100012', '2022-06-16 06:46:39', '2022-06-16 06:46:39', '4.15'),
(43, '連帽上衣', '上衣', 'Female', '汗衫布料寬鬆上衣，連衣帽有內裡和抽繩，有袋鼠袋，羅紋袖口和下襬。', '棉 60%, 聚酯纖維 40%', 'FP2_80100013_beige_0.jpg', 'FP2_80100013_beige_1.jpg', 'FP2_80100013_beige_2.jpg', 'FP2_80100013_beige_3.jpg', '699', 0, 'FP2_80100013', '2022-06-16 06:53:56', '2022-06-16 06:53:56', '4.87'),
(44, '百褶裙', '裙子', 'Female', '雪紡百褶中長裙，高腰剪裁，鬆緊帶腰圍。綢緞內裡。', '<br>外層: 聚酯纖維 96%, 彈性纖維 4%\r\n<br>內裡: 聚酯纖維 89%, 彈性纖維 11%', 'FP2_80200001_lightgrey_0.jpg', 'FP2_80200001_lightgrey_1.jpg', 'FP2_80200001_lightgrey_2.jpg', 'FP2_80200001_lightgrey_3.jpg', '999', 0, 'FP2_80200001', '2022-06-16 06:58:56', '2022-06-16 06:58:56', '4.69'),
(45, '紋理感平織裙', '裙子', 'Female', '高腰短裙，紋理感平織布料，貼身剪裁，一側有隱形拉鍊。有內裡。', '<br>內裡: 聚酯纖維 100%\r\n<br>外層: 聚酯纖維 82%, 棉 18%', 'FP2_80200002_beige_0.jpg', 'FP2_80200002_beige_1.jpg', 'FP2_80200002_beige_2.jpg', 'FP2_80200002_beige_3.jpg', '999', 0, 'FP2_80200002', '2022-06-16 07:03:47', '2022-06-16 07:03:47', '4.32'),
(46, '斜紋短裙', '裙子', 'Female', '百褶短裙，彈性斜紋布料，一側有單顆鈕扣和隱形拉鍊。無內裡。', '聚酯纖維 98%, 彈性纖維 2%', 'FP2_80200003_blue_0.jpg', 'FP2_80200003_blue_1.jpg', 'FP2_80200003_blue_2.jpg', 'FP2_80200003_blue_3.jpg', '699', 0, 'FP2_80200003', '2022-06-16 07:06:56', '2022-06-16 07:06:56', '3.99'),
(47, '及地長裙', '裙子', 'Female', '褶縐平織裙，長度及踝，高腰剪裁，覆面鬆緊帶腰圍。傘狀裙襬有抓皺縫線，可增加豐盈感和蓬度。', '嫘縈 72%, 聚醯胺纖維 28%', 'FP2_80200004_white_0.jpg', 'FP2_80200004_white_1.jpg', 'FP2_80200004_white_2.jpg', 'FP2_80200004_white_3.jpg', '1499', 0, 'FP2_80200004', '2022-06-16 07:10:11', '2022-06-16 07:10:11', '4.08'),
(48, '中長裙', '裙子', 'Female', '中長裙，平織布料，高腰休閒剪裁，覆面鬆緊帶腰圍配抽繩。有內裡。', '聚酯纖維 67%, 聚醯胺纖維 33%', 'FP2_80200005_white_0.jpg', 'FP2_80200005_white_1.jpg', 'FP2_80200005_white_2.jpg', 'FP2_80200005_white_3.jpg', '999', 0, 'FP2_80200005', '2022-06-16 07:32:04', '2022-06-16 07:31:18', '3.23'),
(49, '懶人鞋', '鞋', 'Female', '棉質斜紋懶人鞋，兩側鑲鬆緊帶，有後跟拉環。棉質帆布內裡和內底，平滑鞋底下方有溝槽設計。', '<br>鞋幫: 棉 100%\r\n<br>內裡: 棉 100%\r\n<br>鞋底: 熱塑性橡膠 100%', 'FP2_80300001_beige_0.jpg', 'FP2_80300001_beige_1.jpg', 'FP2_80300001_beige_2.jpg', 'FP2_80300001_beige_3.jpg', '499', 0, 'FP2_80300001', '2022-06-16 08:20:06', '2022-06-16 07:40:39', '4.58'),
(50, '人字拖', '鞋', 'Female', '仿皮人字拖，細夾腳帶，鞋面有鋪棉寬飾帶。平紋內裡，仿皮內底。鞋底高1.5公分。', '<br>鞋底: 熱塑性橡膠 100%\r\n<br>內裡: 聚酯纖維 100%\r\n<br>鞋幫: 聚氨酯 100%', 'FP2_80300002_beige_0.jpg', 'FP2_80300002_beige_1.jpg', 'FP2_80300002_beige_2.jpg', '', '699', 0, 'FP2_80300002', '2022-06-16 08:20:58', '2022-06-16 07:44:07', '3.69'),
(51, '編織涼鞋', '鞋', 'Female', '編織草編拖鞋，露趾和交叉腳帶。人造皮革鞋墊和凹槽鞋底。鞋底厚度1.9公分', '<br>鞋墊: 仿皮 100%\r\n<br>內裡: 聚丙烯 100%\r\n<br>鞋底: 熱塑性橡膠 100%\r\n<br>鞋幫: 聚丙烯 100%', 'FP2_80300003_beige_0.jpg', 'FP2_80300003_beige_1.jpg', 'FP2_80300003_beige_2.jpg', 'FP2_80300003_beige_3.jpg', '999', 0, 'FP2_80300003', '2022-06-16 08:22:09', '2022-06-16 07:49:32', '3.26'),
(52, '紋理感戲水鞋', '鞋', 'Female', '塑膠戲水鞋，鞋面有紋理感飾帶，壓模花紋鞋底有溝槽設計。鞋底高4公分。', '<br>外層: 乙烯-醋酸乙烯酯共聚物 100%\r\n<br>內裡: 乙烯-醋酸乙烯酯共聚物 100%\r\n<br>鞋底: 乙烯-醋酸乙烯酯共聚物 100%\r\n<br>鞋墊: 乙烯-醋酸乙烯酯共聚物 100%', 'FP2_80300004_beige_0.jpg', 'FP2_80300004_beige_1.jpg', 'FP2_80300004_beige_2.jpg', 'FP2_80300004_beige_3.jpg', '499', 0, 'FP2_80300004', '2022-06-16 08:22:46', '2022-06-16 07:54:44', '3.98'),
(53, '草帽', '帽子', 'Female', '柔軟紙編草帽，有吸汗帶。', '紙 100%', 'FP2_80500001_beige_0.jpg', 'FP2_80500001_beige_1.jpg', '', '', '399', 0, 'FP2_80500001', '2022-06-16 08:33:44', '2022-06-16 08:24:20', '4.88'),
(54, '草帽', '帽子', 'Female', '紙編草帽，帽頂呈凹形，配寬羅緞飾帶。帽簷寬6.5公分。', '紙籐 100%', 'FP2_80500002_beige_0.jpg', 'FP2_80500002_beige_1.jpg', '', '', '399', 0, 'FP2_80500002', '2022-06-16 08:33:19', '2022-06-16 08:33:19', '4.93');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `customer_id`
--
ALTER TABLE `customer_id`
  ADD PRIMARY KEY (`cName`);

--
-- 資料表索引 `customer_pwd`
--
ALTER TABLE `customer_pwd`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cName` (`cName`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- 資料表索引 `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`item_id`);

--
-- 資料表索引 `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `customer_pwd`
--
ALTER TABLE `customer_pwd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_items`
--
ALTER TABLE `order_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `customer_pwd`
--
ALTER TABLE `customer_pwd`
  ADD CONSTRAINT `customer_pwd_ibfk_1` FOREIGN KEY (`cName`) REFERENCES `customer_id` (`cName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
