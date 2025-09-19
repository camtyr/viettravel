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
INSERT INTO `destinations` VALUES (1,'Vịnh Hạ Long','Vịnh Hạ Long , Quảng Ninh, Việt Nam','cultural','https://www.homepaylater.vn/static/74e21082eb458ecd2bfca82e3d97ee26/c579c/kham_pha_vinh_ha_long_quang_ninh_9c608116fd.webp','Vịnh Hạ Long là một vịnh nhỏ thuộc phần bờ tây vịnh Bắc Bộ tại khu vực biển Đông Bắc Việt Nam, bao gồm vùng biển đảo của thành phố Hạ Long thuộc tỉnh Quảng Ninh.','Approved',3.5,2,'2025-09-19 00:00:00.000000',1),(3,'Chùa Keo','Xã Duy Nhất, H. Vũ Thư, T. Thái Bình','cultural','https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Chuakeothaibinh.jpg/250px-Chuakeothaibinh.jpg','Chùa Keo Thái Bình có tên chữ là Thần Quang tự là một ngôi chùa ở xã Vũ Tiên, tỉnh Hưng Yên. Đây là một trong những ngôi chùa cổ ở Việt Nam, là công trình kiến trúc nghệ thuật có giá trị đã được Chính phủ công nhận là Di tích quốc gia đặc biệt.','Approved',1,1,'2025-09-19 00:00:00.000000',2),(4,'Văn Miếu - Quốc Tử Giám','58 Quốc Tử Giám, Q. Đống Đa, Hà Nội','cultural','https://dulichkhatvongviet.com/wp-content/uploads/2021/11/GIOI-THIEU-van-mieu-quoc-tu-giam.jpeg','Văn Miếu - Quốc Tử Giám được xây dựng năm 1070, là trường đại học đầu tiên của Việt Nam, đồng thời là nơi thờ Khổng Tử, các bậc hiền triết và những bậc vua triều Lý, Trần.','Approved',5,1,'2025-09-19 00:00:00.000000',2),(5,'Hoàng thành Thăng Long','19C Hoàng Diệu, Q. Ba Đình, Hà Nội','historical','https://hnm.1cdn.vn/2024/07/29/hoang-thanh.jpg','Hoàng thành Thăng Long là quần thể di tích gắn liền với lịch sử kinh thành Thăng Long - Hà Nội, đã được UNESCO công nhận là Di sản Văn hóa Thế giới năm 2010.','Approved',3,1,'2025-09-19 00:00:00.000000',2),(6,'Cố đô Huế','TP. Huế, T. Thừa Thiên Huế','historical','https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ngomon2.jpg/800px-Ngomon2.jpg','Quần thể di tích Cố đô Huế là trung tâm chính trị, văn hóa của triều Nguyễn suốt hơn 140 năm, nổi tiếng với kiến trúc cung điện, lăng tẩm và đã được UNESCO công nhận là Di sản Văn hóa Thế giới.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(8,'Phố cổ Hội An','TP. Hội An, T. Quảng Nam','cultural','https://dulichdemen.vn/wp-content/uploads/2023/10/pho-co-hoi-an-du-lich-de-men-vn.jpg','Phố cổ Hội An từng là thương cảng quốc tế sầm uất từ thế kỷ 16 - 17, nổi tiếng với kiến trúc nhà cổ, chùa cầu và không gian văn hóa độc đáo. Năm 1999, được UNESCO công nhận là Di sản Văn hóa Thế giới.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(9,'Thánh địa Mỹ Sơn','Xã Duy Phú, H. Duy Xuyên, T. Quảng Nam','cultural','https://ik.imagekit.io/tvlk/blog/2023/09/thanh-dia-my-son-32.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2','Thánh địa Mỹ Sơn là quần thể đền đài của người Chăm Pa xây dựng từ thế kỷ 4 đến thế kỷ 13, mang đậm kiến trúc và văn hóa Ấn Độ giáo, đã được UNESCO công nhận là Di sản Văn hóa Thế giới.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(10,'Thành cổ Quảng Trị','Quảng Trị','historical','https://danhnamtravel.vn/Uploads/images/thanhcoquangtri/Thanh-co-Quang-Tri-03.jpeg','Trận Thành cổ Quảng Trị (tiếng Anh: Second Battle of Quảng Trị) là một trận chiến giữa Quân Giải phóng miền Nam Việt Nam được sự hỗ trợ về hậu cần của Quân đội nhân dân Việt Nam với Quân đội Hoa Kỳ và Quân lực Việt Nam Cộng hòa tại khu vực thành cổ Quảng Trị vào năm 1972. Đây là một trong những trận chiến ác liệt nhất của Chiến dịch Xuân Hè 1972 trong Chiến tranh Việt Nam.','Approved',0,0,'2025-09-19 00:00:00.000000',1),(13,'Bãi biển Mỹ Khê','Sơn Trà, TP. Đà Nẵng','beach','https://sakos.vn/wp-content/uploads/2024/03/bai-bien-My-Khe-Da-Nang-02-e1709709380538.jpg','Bãi biển Mỹ Khê được tạp chí Forbes bình chọn là một trong những bãi biển đẹp nhất hành tinh, nổi tiếng với bờ cát trắng mịn và làn nước trong xanh.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(14,'Bãi biển Vũng Tàu','TP. Vũng Tàu, T. Bà Rịa - Vũng Tàu','beach','https://wetrek.vn/pic/Service/mkt1@wetrek.vn/images/Ly%20Son%20lot%20top%2010%20bai%20bien%20dep%20nhat%20VN%20Forbes%20binh%20chon/1.jpg','Bãi biển Vũng Tàu là điểm nghỉ dưỡng quen thuộc với du khách trong và ngoài nước, nổi bật với Bãi Sau, Bãi Trước và hải sản đa dạng.','Approved',0,0,'2025-09-19 00:00:00.000000',2),(15,'Hồ Núi Cốc','Thái Nguyên','mountain','https://songhongtourist.vn/upload/2022-11-21/ho-nui-coc-thai-nguyen-5.jpg','Đến khu du lịch hồ Núi Cốc, khách tham quan sẽ có cơ hội hưởng thụ nhiều hoạt động dịch vụ vui chơi, giải trí, tham quan và nghỉ dưỡng như:\n\nDu thuyền trên mặt hồ thăm các đảo.\nThăm huyền thoại cung (nghe kể truyền thuyết câu chuyện tình thủy chung chàng Cốc - nàng Công).\nThăm công viên cổ tích, vườn thú, vui chơi ở công viên nước.\nTại đây có hệ thống khách sạn, nhà hàng ăn uống phong phú từ bình dân đến cao cấp, giá cả hợp lý... Trong nhiều năm nay hồ Núi Cốc đã trở thành một địa chỉ tham quan hấp dẫn cho du khách trong và ngoài nước.','Approved',0,0,'2025-09-19 00:00:00.000000',2);
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
INSERT INTO `reviews` VALUES (1,1,3,4,'ôi đẹp quá','2025-09-19 08:47:36.226284','2025-09-19 08:47:59.879493'),(2,1,5,3,'giá hơi mắc','2025-09-19 08:49:13.469567',NULL),(3,3,5,1,'thái bình number1','2025-09-19 08:50:11.295402',NULL),(4,4,5,5,'dsadasad','2025-09-19 08:58:03.910312',NULL),(5,5,5,3,'asdasd','2025-09-19 08:58:14.241607',NULL);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@test.com','Admin',_binary '\�ć�+\���\�\"�e}K.˗�\Z5YȞ_)�Y#�\��\\\�JG\�n\�\�k\�ԑ�/�\�P�\��&�[j�',_binary '81?&\�9\"Լ#�\� \�\ZD\�ܱɷi�\�\�N�6�9[�\�\�\�y�\�i\�\�Ì\�\Z�\�F\�%�T:��\�*\���\�-�	>��\�MgKtb�ʇOyzs\��\Z<\�@�\�\0�z���J!��0X�\��q����__MM�\�','hqkgt7pGsUYBWeuCMQiATT+SzH/ByS1rOEMTCRrKpiJdiq3U522MAk1bGxZJwSGr9ZwKD4WEKEXTS/62ggYt2Q==','2025-09-26 09:15:21.066981'),(2,'buingoctien','buingoctien@gmail.com','User',_binary '�&N\�dF5<=�:5o�X�\r�\n�\�*\Z\"F\ni����R�Q\�\�]��[��I\�\"e\01a\�wX�\�3�\�',_binary '\�Z}r3\�+�_�G�\�\�:�H\�GR@���~+\�+��d\�^B����\�?�D\�L\0o-���\�f���.Y�;\�0b����4ݏ��B\�\�?eZ�U����\n�oE�1��\�\�\�>q~ܺ兄�\�~^F3D{xt','67CVtu6ZRoMqK+P5BmzdLLOeVZ7TkmPERTBqHi+11YS5LGPpD/X8huUIe6nXILhTEoslovwl+HLmOyMPPalSqQ==','2025-09-26 09:09:33.080493'),(3,'vuvanthao','vuvanthao@gmail.com','User',_binary '�-jĆV_�\�uk\�m�G��@E��R5P3�a\�O�:�l��1jsF\0Wyr\�\�d�\�[&2뚱C',_binary '٥D�\��\�E:5!ʉif��~Ͼa\��i\�\�\�̏;rW����>\�������.\�\�\�qUo\���/�\�\�Q%<3�g��_\�Ѻ5\�\�7��\�\�j%��\�V$\��~s2r�M��y\�\�\�b��\�\r��','2l1j6eibRJ9MSt4m7L8kPHD9bc4yGiHmMdH4Hz4FFE8J7yybkFgtKhWhj/ei7P9uudNXNfZj8vMOPc2XqSAZcw==','2025-09-26 08:47:18.856228'),(4,'buivanduc','buivanduc@gmail.com','User',_binary '\�-E~�~���V�/$!�P�B\��_�)\'͓\�\��+\�\��\�\�\�ԃ�\�WY$X�{5%�)1nS\�ƺ',_binary '�)\�Ǎ--~5\�(��RZ\�E&�L\"\�y��]a�M\�u����\��P�\�`=#[\�\��^�\�\���!�\�\\}�f%\�\�~P��Z	��u5g\n\��M?\�J\�\04\�~�^\�<�#5\�\�����\�f�\�M>�\�QL\0D','7sdijI2HXOJRHTAE8Zg8Xyrj0lgtNjjCFk20SWlGLaFp0sz32tV7sGvTm4//RiWA2Zb1l3V//gW3U8Ld/Ro/SQ==','2025-09-26 08:01:47.885472'),(5,'phamvandang','phamvandang@gmail.com','User',_binary 'jg\�Џ�gs\�3�*�s8f@\����۴VJ7DR\��*A\�:^3��>\�x�b�������l�ٷp',_binary 'lښ�`\��))&ª�*#��\�-\�Z]9\�\n9&I�Q�*�}���{�\��\�d�c�ȕ\�K�{O�#K[�/!LC\�?|X ˝+�)#�*�t4�#3\�^��Ge1\�]�\�MꞳExSo\�\�M�ږ\�\�\�r��m\�','/cv/4THIDC/LkCYQMYNWOoZjN1yiVPFm/vMqN1BqgBoCQ3ErIsIiM5XXzVOECsxv0q3LOl+dHyhQsq40vH6O8w==','2025-09-26 08:49:01.456617'),(6,'leducanh','leducanh@gmail.com','User',_binary '\"\�s컕K{a\rϯG1O����L;\�\�A;\�#B\��y�\�C�۴4\�\�1p]��L+�\�\�M*�(vx\�',_binary '\�be�#�\�	�>{RӘ��#f*�\��=f\�o2���ƙ\�\�pQ\0Id��\��A{���\�<��_�\��x�Go²\�&���~�ɚ?\�\r\���J\�\�S�\�\�E�べ�|��\�5�]�6\�\�\�̨*�@��','qsmxFE6Rqr+Q9q3X8ag86q7jKrnPHvRoP5eGRW9v41WhJFmiiT3oLvHRfvGVpUSiVtuUKHvZFY3XERdkVFs9XQ==','2025-09-26 08:03:13.793314');
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
