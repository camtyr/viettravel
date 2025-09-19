-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: viettravel
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `auditlogs`
--

LOCK TABLES `auditlogs` WRITE;
/*!40000 ALTER TABLE `auditlogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `auditlogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (1,'Vá»‹nh Háº¡ Long','Vá»‹nh Háº¡ Long , Quáº£ng Ninh, Viá»‡t Nam','cultural','https://www.homepaylater.vn/static/74e21082eb458ecd2bfca82e3d97ee26/c579c/kham_pha_vinh_ha_long_quang_ninh_9c608116fd.webp','Vá»‹nh Háº¡ Long lÃ  má»™t vá»‹nh nhá» thuá»™c pháº§n bá» tÃ¢y vá»‹nh Báº¯c Bá»™ táº¡i khu vá»±c biá»ƒn ÄÃ´ng Báº¯c Viá»‡t Nam, bao gá»“m vÃ¹ng biá»ƒn Ä‘áº£o cá»§a thÃ nh phá»‘ Háº¡ Long thuá»™c tá»‰nh Quáº£ng Ninh.','Approved',3.5,2,'2025-09-19 00:00:00.000000',1),(3,'ChÃ¹a Keo','XÃ£ Duy Nháº¥t, H. VÅ© ThÆ°, T. ThÃ¡i BÃ¬nh','cultural','https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Chuakeothaibinh.jpg/250px-Chuakeothaibinh.jpg','ChÃ¹a Keo ThÃ¡i BÃ¬nh cÃ³ tÃªn chá»¯ lÃ  Tháº§n Quang tá»± lÃ  má»™t ngÃ´i chÃ¹a á»Ÿ xÃ£ VÅ© TiÃªn, tá»‰nh HÆ°ng YÃªn. ÄÃ¢y lÃ  má»™t trong nhá»¯ng ngÃ´i chÃ¹a cá»• á»Ÿ Viá»‡t Nam, lÃ  cÃ´ng trÃ¬nh kiáº¿n trÃºc nghá»‡ thuáº­t cÃ³ giÃ¡ trá»‹ Ä‘Ã£ Ä‘Æ°á»£c ChÃ­nh phá»§ cÃ´ng nháº­n lÃ  Di tÃ­ch quá»‘c gia Ä‘áº·c biá»‡t.','Approved',1,1,'2025-09-19 00:00:00.000000',2),(4,'VÄƒn Miáº¿u - Quá»‘c Tá»­ GiÃ¡m','58 Quá»‘c Tá»­ GiÃ¡m, Q. Äá»‘ng Äa, HÃ  Ná»™i','cultural','https://dulichkhatvongviet.com/wp-content/uploads/2021/11/GIOI-THIEU-van-mieu-quoc-tu-giam.jpeg','VÄƒn Miáº¿u - Quá»‘c Tá»­ GiÃ¡m Ä‘Æ°á»£c xÃ¢y dá»±ng nÄƒm 1070, lÃ  trÆ°á»ng Ä‘áº¡i há»c Ä‘áº§u tiÃªn cá»§a Viá»‡t Nam, Ä‘á»“ng thá»i lÃ  nÆ¡i thá» Khá»•ng Tá»­, cÃ¡c báº­c hiá»n triáº¿t vÃ  nhá»¯ng báº­c vua triá»u LÃ½, Tráº§n.','Approved',5,1,'2025-09-19 00:00:00.000000',2),(5,'HoÃ ng thÃ nh ThÄƒng Long','19C HoÃ ng Diá»‡u, Q. Ba ÄÃ¬nh, HÃ  Ná»™i','historical','https://hnm.1cdn.vn/2024/07/29/hoang-thanh.jpg','HoÃ ng thÃ nh ThÄƒng Long lÃ  quáº§n thá»ƒ di tÃ­ch gáº¯n liá»n vá»›i lá»‹ch sá»­ kinh thÃ nh ThÄƒng Long - HÃ  Ná»™i, Ä‘Ã£ Ä‘Æ°á»£c UNESCO cÃ´ng nháº­n lÃ  Di sáº£n VÄƒn hÃ³a Tháº¿ giá»›i nÄƒm 2010.','Approved',3,1,'2025-09-19 00:00:00.000000',2),(6,'Cá»‘ Ä‘Ã´ Huáº¿','TP. Huáº¿, T. Thá»«a ThiÃªn Huáº¿','historical','https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ngomon2.jpg/800px-Ngomon2.jpg','Quáº§n thá»ƒ di tÃ­ch Cá»‘ Ä‘Ã´ Huáº¿ lÃ  trung tÃ¢m chÃ­nh trá»‹, vÄƒn hÃ³a cá»§a triá»u Nguyá»…n suá»‘t hÆ¡n 140 nÄƒm, ná»•i tiáº¿ng vá»›i kiáº¿n trÃºc cung Ä‘iá»‡n, lÄƒng táº©m vÃ  Ä‘Ã£ Ä‘Æ°á»£c UNESCO cÃ´ng nháº­n lÃ  Di sáº£n VÄƒn hÃ³a Tháº¿ giá»›i.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(8,'Phá»‘ cá»• Há»™i An','TP. Há»™i An, T. Quáº£ng Nam','cultural','https://dulichdemen.vn/wp-content/uploads/2023/10/pho-co-hoi-an-du-lich-de-men-vn.jpg','Phá»‘ cá»• Há»™i An tá»«ng lÃ  thÆ°Æ¡ng cáº£ng quá»‘c táº¿ sáº§m uáº¥t tá»« tháº¿ ká»· 16 - 17, ná»•i tiáº¿ng vá»›i kiáº¿n trÃºc nhÃ  cá»•, chÃ¹a cáº§u vÃ  khÃ´ng gian vÄƒn hÃ³a Ä‘á»™c Ä‘Ã¡o. NÄƒm 1999, Ä‘Æ°á»£c UNESCO cÃ´ng nháº­n lÃ  Di sáº£n VÄƒn hÃ³a Tháº¿ giá»›i.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(9,'ThÃ¡nh Ä‘á»‹a Má»¹ SÆ¡n','XÃ£ Duy PhÃº, H. Duy XuyÃªn, T. Quáº£ng Nam','cultural','https://ik.imagekit.io/tvlk/blog/2023/09/thanh-dia-my-son-32.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2','ThÃ¡nh Ä‘á»‹a Má»¹ SÆ¡n lÃ  quáº§n thá»ƒ Ä‘á»n Ä‘Ã i cá»§a ngÆ°á»i ChÄƒm Pa xÃ¢y dá»±ng tá»« tháº¿ ká»· 4 Ä‘áº¿n tháº¿ ká»· 13, mang Ä‘áº­m kiáº¿n trÃºc vÃ  vÄƒn hÃ³a áº¤n Äá»™ giÃ¡o, Ä‘Ã£ Ä‘Æ°á»£c UNESCO cÃ´ng nháº­n lÃ  Di sáº£n VÄƒn hÃ³a Tháº¿ giá»›i.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(10,'ThÃ nh cá»• Quáº£ng Trá»‹','Quáº£ng Trá»‹','historical','https://danhnamtravel.vn/Uploads/images/thanhcoquangtri/Thanh-co-Quang-Tri-03.jpeg','Tráº­n ThÃ nh cá»• Quáº£ng Trá»‹ (tiáº¿ng Anh: Second Battle of Quáº£ng Trá»‹) lÃ  má»™t tráº­n chiáº¿n giá»¯a QuÃ¢n Giáº£i phÃ³ng miá»n Nam Viá»‡t Nam Ä‘Æ°á»£c sá»± há»— trá»£ vá» háº­u cáº§n cá»§a QuÃ¢n Ä‘á»™i nhÃ¢n dÃ¢n Viá»‡t Nam vá»›i QuÃ¢n Ä‘á»™i Hoa Ká»³ vÃ  QuÃ¢n lá»±c Viá»‡t Nam Cá»™ng hÃ²a táº¡i khu vá»±c thÃ nh cá»• Quáº£ng Trá»‹ vÃ o nÄƒm 1972. ÄÃ¢y lÃ  má»™t trong nhá»¯ng tráº­n chiáº¿n Ã¡c liá»‡t nháº¥t cá»§a Chiáº¿n dá»‹ch XuÃ¢n HÃ¨ 1972 trong Chiáº¿n tranh Viá»‡t Nam.','Approved',0,0,'2025-09-19 00:00:00.000000',1),(13,'BÃ£i biá»ƒn Má»¹ KhÃª','SÆ¡n TrÃ , TP. ÄÃ  Náºµng','beach','https://sakos.vn/wp-content/uploads/2024/03/bai-bien-My-Khe-Da-Nang-02-e1709709380538.jpg','BÃ£i biá»ƒn Má»¹ KhÃª Ä‘Æ°á»£c táº¡p chÃ­ Forbes bÃ¬nh chá»n lÃ  má»™t trong nhá»¯ng bÃ£i biá»ƒn Ä‘áº¹p nháº¥t hÃ nh tinh, ná»•i tiáº¿ng vá»›i bá» cÃ¡t tráº¯ng má»‹n vÃ  lÃ n nÆ°á»›c trong xanh.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(14,'BÃ£i biá»ƒn VÅ©ng TÃ u','TP. VÅ©ng TÃ u, T. BÃ  Rá»‹a - VÅ©ng TÃ u','beach','https://wetrek.vn/pic/Service/mkt1@wetrek.vn/images/Ly%20Son%20lot%20top%2010%20bai%20bien%20dep%20nhat%20VN%20Forbes%20binh%20chon/1.jpg','BÃ£i biá»ƒn VÅ©ng TÃ u lÃ  Ä‘iá»ƒm nghá»‰ dÆ°á»¡ng quen thuá»™c vá»›i du khÃ¡ch trong vÃ  ngoÃ i nÆ°á»›c, ná»•i báº­t vá»›i BÃ£i Sau, BÃ£i TrÆ°á»›c vÃ  háº£i sáº£n Ä‘a dáº¡ng.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(15,'Há»“ NÃºi Cá»‘c','ThÃ¡i NguyÃªn','mountain','https://songhongtourist.vn/upload/2022-11-21/ho-nui-coc-thai-nguyen-5.jpg','Äáº¿n khu du lá»‹ch há»“ NÃºi Cá»‘c, khÃ¡ch tham quan sáº½ cÃ³ cÆ¡ há»™i hÆ°á»Ÿng thá»¥ nhiá»u hoáº¡t Ä‘á»™ng dá»‹ch vá»¥ vui chÆ¡i, giáº£i trÃ­, tham quan vÃ  nghá»‰ dÆ°á»¡ng nhÆ°:\n\nDu thuyá»n trÃªn máº·t há»“ thÄƒm cÃ¡c Ä‘áº£o.\nThÄƒm huyá»n thoáº¡i cung (nghe ká»ƒ truyá»n thuyáº¿t cÃ¢u chuyá»‡n tÃ¬nh thá»§y chung chÃ ng Cá»‘c - nÃ ng CÃ´ng).\nThÄƒm cÃ´ng viÃªn cá»• tÃ­ch, vÆ°á»n thÃº, vui chÆ¡i á»Ÿ cÃ´ng viÃªn nÆ°á»›c.\nTáº¡i Ä‘Ã¢y cÃ³ há»‡ thá»‘ng khÃ¡ch sáº¡n, nhÃ  hÃ ng Äƒn uá»‘ng phong phÃº tá»« bÃ¬nh dÃ¢n Ä‘áº¿n cao cáº¥p, giÃ¡ cáº£ há»£p lÃ½... Trong nhiá»u nÄƒm nay há»“ NÃºi Cá»‘c Ä‘Ã£ trá»Ÿ thÃ nh má»™t Ä‘á»‹a chá»‰ tham quan háº¥p dáº«n cho du khÃ¡ch trong vÃ  ngoÃ i nÆ°á»›c.','Approved',0,0,'2025-09-19 00:00:00.000000',2);
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reviewcomments`
--

LOCK TABLES `reviewcomments` WRITE;
/*!40000 ALTER TABLE `reviewcomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviewcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,3,4,'Ã´i Ä‘áº¹p quÃ¡','2025-09-19 08:47:36.226284','2025-09-19 08:47:59.879493'),(2,1,5,3,'giÃ¡ hÆ¡i máº¯c','2025-09-19 08:49:13.469567',NULL),(3,3,5,1,'thÃ¡i bÃ¬nh number1','2025-09-19 08:50:11.295402',NULL),(4,4,5,5,'dsadasad','2025-09-19 08:58:03.910312',NULL),(5,5,5,3,'asdasd','2025-09-19 08:58:14.241607',NULL);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@test.com','Admin',_binary '\ßÄ‡¯+\éö·\Ü\"e}K.Ë—Ÿ\Z5YÈž_)”Y#‘\Öÿ\\\ÖJG\Ýn\é\ìk\îÔ‘ÿ/¯\ÇP—\ìú&§[j­',_binary '81?&\Ã9\"Ô¼#\Ù \Å\ZD\ÍÜ±É·iº\Þ\ïNý6õ9[©\Î\Æ\Ìy›\Øi\æ\å¹ÃŒ\ìš\Zþ\åF\à%¤T:œó\ä*\ìü¸\ï–-·	>÷û\ËMgKtbÿÊ‡Oyzs\Ýû\Z<\Ö@°\å\0z«¤õJ!÷°0X¹\Ùþq¼š®Œ__MMú\î','hqkgt7pGsUYBWeuCMQiATT+SzH/ByS1rOEMTCRrKpiJdiq3U522MAk1bGxZJwSGr9ZwKD4WEKEXTS/62ggYt2Q==','2025-09-26 09:15:21.066981'),(2,'buingoctien','buingoctien@gmail.com','User',_binary 'Œ&N\ç³dF5<=’:5o¨X·\r¡\n\è*\Z\"F\ni…±“úR˜Q\Ú\ï]–¶[¦“I\Ì\"e\01a\ÖwX›\ä3ƒ\Ì',_binary '\ØZ}r3\Ô+„_—G½\Æ\ì:‰H\×GR@–ª~+\Ë+šd\Ï^Bÿž¬Œ\å?¯D\ïœL\0o-†óý\Òfòð„.Y¬;\ì0b®§ú4ÝøB\Þ\Ï?eZUý³ƒ©\n²oE”1‰…\Â\á \Ø>q~Üºå…„Ÿ\ãª~^F3D{xt','67CVtu6ZRoMqK+P5BmzdLLOeVZ7TkmPERTBqHi+11YS5LGPpD/X8huUIe6nXILhTEoslovwl+HLmOyMPPalSqQ==','2025-09-26 09:09:33.080493'),(3,'vuvanthao','vuvanthao@gmail.com','User',_binary '…-jÄ†V_¤\Åuk\îm¾G@EòþR5P3óa\ïO¶:¨ló¤ÿ1jsF\0Wyr\â\éžd§\Æ[&2ëš±C',_binary 'Ù¥Dþ\Ôó\ÉE:5!Ê‰if²~Ï¾a\ÏÀi\Ö\Ç\ë«Ì;rW—±‹>\Î÷•»µ‡».\Ð\ë\êqUo\Ýø½/ð\ä\è‹Q%<3„g¦_\ìÑº5\ã\ë7‚\ê\Ój%¥ÿ\æV$\ì¶“~s2rŒM±„y\Ë\ï\Ïb¾¥\È\r³³','2l1j6eibRJ9MSt4m7L8kPHD9bc4yGiHmMdH4Hz4FFE8J7yybkFgtKhWhj/ei7P9uudNXNfZj8vMOPc2XqSAZcw==','2025-09-26 08:47:18.856228'),(4,'buivanduc','buivanduc@gmail.com','User',_binary '\Ç-E~Á~†°œV¢/$!™P½B\ä“_¦)\'Í“\Â\ì÷+\à©\ï´\î\Ù\ßÔƒ´\íWY$X…{5%ª)1nS\æÆº',_binary ')\ÖÇ--~5\Þ(…¸RZ\ÈE&³L\"\æy÷]a¤M\Óuú…¾Œ\çöP£\ê®`=#[\é\ÆÀ^ü\è\åö¤!Œ\ë\\}Šf%\Ë\é~P–Z	ô¨u5g\n\äñ¥M?\ìJ\ï\04\Í~ÿ^\Æ<µ#5\Û\Þ³±\æ²f¡\ÍM>’\áQL\0D','7sdijI2HXOJRHTAE8Zg8Xyrj0lgtNjjCFk20SWlGLaFp0sz32tV7sGvTm4//RiWA2Zb1l3V//gW3U8Ld/Ro/SQ==','2025-09-26 08:01:47.885472'),(5,'phamvandang','phamvandang@gmail.com','User',_binary 'jg\ÔÐ¬gs\Ë3ž*ˆs8f@\Ô½ªÛ´VJ7DR\ÙŒ*A\ã:^3–ô>\Ëxûb–˜¢·€¾˜l…Ù·p',_binary 'lÚš—`\Ñý))&Âª’*#¬¯\é-\ÖZ]9\å\n9&I¸Q¢*¬}úš¼{¤\×ý\àd¯c€È•\é¸K{OŠ#K[‰/!LC\Ò?|X Ë+¹)#»*ðt4û#3\Ú^º”Ge1\æ]‘\äMêž³ExSo\Õ\ÐM®Ú–\È\â\Ìrš“m\Þ','/cv/4THIDC/LkCYQMYNWOoZjN1yiVPFm/vMqN1BqgBoCQ3ErIsIiM5XXzVOECsxv0q3LOl+dHyhQsq40vH6O8w==','2025-09-26 08:49:01.456617'),(6,'leducanh','leducanh@gmail.com','User',_binary '\"\ísì»•K{a\rÏ¯G1O·«³ŒL;\Ç\ÃA;\ã‹#B\åüy»\è¦C¶Û´4\Ñ\Ã1p]‡L+ˆ\á \ÆM*©(vx\â',_binary '\âŒbe¼#ó\Í	õ>{RÓ˜‘²#f*­\Äÿ=f\Äo2þÁŠÆ™\Ð\ìpQ\0Id¿‚\ÞŒA{€ƒ°\Ã<³_´\Õ‹xùGoÂ²\â£&•žÀ~Éš?\Õ\r\Ä¶ûJ\Ì\ÞS³\Ü\ÞE¹ã¹‡|¢¯\ç5š]°6\Þ\á\ÊÌ¨*ˆ@‡…','qsmxFE6Rqr+Q9q3X8ag86q7jKrnPHvRoP5eGRW9v41WhJFmiiT3oLvHRfvGVpUSiVtuUKHvZFY3XERdkVFs9XQ==','2025-09-26 08:03:13.793314');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'viettravel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 16:48:27
