CREATE DATABASE  IF NOT EXISTS `librarydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `librarydb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: librarydb
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Fantasy'),(2,'Fiction'),(3,'Horror'),(4,'Novel'),(5,'Romance'),(6,'Young Adult'),(7,'Dragon'),(8,'Magic'),(9,'Contemporary'),(10,'Dark'),(11,'Love'),(12,'Adult'),(13,'Thriller'),(14,'Mystery'),(15,'Drama'),(16,'Paranormal');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `genre` varchar(1000) DEFAULT NULL,
  `pages` int DEFAULT NULL,
  `published` varchar(20) DEFAULT NULL,
  `availability` varchar(12) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'The Lost Girl','R.L. Stine','Fiction, Horror, Fantasy, Thriller, Mystery',272,'2015-09-29','In Stock','New student Lizzy Palmer is the talk of Shadyside High. Michael\nand his girlfriend Pepper befriend her, but the closer they get to her, the\nstranger she seems and the more attractive she is to Michael. He invites her\nto join him on a snowmobile race that ends in a tragic accident. Soon, Michael\'s\nfriends start being murdered, and Pepper becomes convinced that Lizzy is behind\nthe killings. But to her total shock, she and Michael are drawn into a tragic story\nof an unthinkable betrayal committed over 60 years ago. Frightening and tense in the\nway that only this master of horror can deliver, The Lost Girl is another terrifying\nFear Street novel by the king of juvenile horror.','/assets/TheLostGirl.jpg'),(2,'Night of the Living Dummy','R.L. Stine','Fiction, Horror, Fantasy, Thriller, Mystery',134,'1993-05-01','Out of Stock','Lindy names the ventriloquist\'s dummy she finds Slappy. Slappy is kind of\nugly, but he\'s a lot of fun. Lindy\'s having a great time learning to make Slappy move and\ntalk. But Kris is jealous of all the attention her sister is getting. It\'s no fair. Why\ndoes Lindy always have all the luck? Kris decides to get a dummy of her own. She\'ll show Kris.\nThen weird things begin to happen. Nasty things. Evil things. No way a dummy can be causing\nall the trouble. Or is there?','/assets/NightOfTheLivingDummy.jpg'),(3,'The Haunted Mask','R.L. Stine','Fiction, Horror, Fantasy, Thriller, Mystery',121,'1993-09-01','In Stock','How ugly is Carly Beth\'s Halloween mask? It\'s so ugly that it almost scared her little\nbrother to death. So terrifying that even her friends are totally freaked out by it. It\'s the best Halloween\nmask ever. With yellow-green skin and long animal fangs, the mask terrifies the entire neighborhood. Before\nlong, it has a surprising effect on Carly Beth, too. She tries to take it off . . . but it won\'t budge!\nHalloween is almost over, but fright night is just beginning.','/assets/TheHauntedMask.jpg'),(4,'Say Cheese And Die!','R.L. Stine','Fiction, Horror, Fantasy, Thriller, Mystery',121,'1992-11-01','Out of Stock','Greg thinks there is something wrong with the old camera he found. The photos keep turning out . . .\ndifferent. When Greg takes a picture of his father\'s brand-new car, it\'s wrecked in the photo. And then his dad crashes \nthe car. It\'s like the camera can tell the future--or worse. Maybe it makes the future! Who is going to take the fall next\nfor the evil camera?','/assets/SayCheeseAndDie!.jpg'),(5,'A Court of Thorns and Roses','Sarah J. Maas','Fantasy, Fiction, Novel, Romance, Young Adult',419,'2015-05-05','In Stock','Feyre\'s survival rests upon her ability to hunt and kill - the\nforest where she lives is a cold, bleak place in the long winter months. So\nwhen she spots a deer in the forest being pursued by a wolf, she cannot resist\nfighting it for the flesh. But to do so, she must kill the predator and killing\nsomething so precious comes at a price ... Dragged to a magical kingdom for the\nmurder of a faerie, Feyre discovers that her captor, his face obscured by a\njewelled mask, is hiding far more than his piercing green eyes would suggest.\nFeyre\'s presence at the court is closely guarded, and as she begins to learn why,\nher feelings for him turn from hostility to passion and the faerie lands become an\neven more dangerous place. Feyre must fight to break an ancient curse, or she will\nlose him forever. The start of a sensational romantic fantasy trilogy by the\nbestselling author of the Throne of Glass series.','/assets/ACourtOfThornsAndRoses.jpg'),(6,'A Court of Mist and Fury','Sarah J. Maas','Fantasy, Fiction, Novel, Romance, Young Adult',624,'2016-04-22','In Stock','Feyre has undergone more trials than one human woman can carry in her\nheart. Though she\'s now been granted the powers and lifespan of the High Fae, she is\nhaunted by her time Under the Mountain and the terrible deeds she performed to save\nthe lives of Tamlin and his people. As her marriage to Tamlin approaches, Feyre\'s\nhollowness and nightmares consume her. She finds herself split into two different\npeople: one who upholds her bargain with Rhysand, High Lord of the feared Night Court,\nand one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a\ndark web of politics, passion, and dazzling power, a greater evil looms. She might just\nbe the key to stopping it, but only if she can harness her harrowing gifts, heal her\nfractured soul, and decide how she wishes to shape her future-and the future of a world\nin turmoil.','/assets/ACourtOfMistAndFury.jpg'),(7,'A Court of Wings and Ruin','Sarah J. Maas','Fantasy, Fiction, Novel, Romance, Young Adult',703,'2017-05-02','In Stock','Feyre has returned to the Spring Court, determined to gather information\non Tamlin\'s maneuverings and the invading king threatening to bring Prythian to its knees.\nBut to do so she must play a deadly game of deceit-and one slip may spell doom not only for\nFeyre, but for her world as well. As war bears down upon them all, Feyre must decide who to\ntrust amongst the dazzling and lethal High Lords-and hunt for allies in unexpected places.','/assets/ACourtOfWingsAndRuin.jpg'),(8,'A Court of Frost and Starlight','Sarah J. Maas','Fantasy, Fiction, Novel, Romance, Young Adult',272,'2018-05-01','In Stock','Feyre, Rhysand, and their friends are still busy rebuilding the Night Court and\nthe vastly altered world beyond, recovering from the war that changed everything. But Winter\nSolstice is finally approaching, and with it, the joy of a hard-earned reprieve. Yet even the\nfestive atmosphere can\'t keep the shadows of the past from looming. As Feyre navigates her first\nWinter Solstice as High Lady, her concern for those dearest to her deepens. They have more wounds\nthan she anticipated-scars that will have a far-reaching impact on the future of their court.','/assets/ACourtOfFrostAndStarlight.jpg'),(9,'A Court of Silver Flames','Sarah J. Maas','Fantasy, Fiction, Novel, Romance, Young Adult',757,'2021-02-16','In Stock','Nesta Archeron has always been prickly-proud, swift to anger, and slow to forgive.\nAnd ever since being forced into the Cauldron and becoming High Fae against her will, she\'s struggled\nto find a place for herself within the strange, deadly world she inhabits. Worse, she can\'t seem to\nmove past the horrors of the war with Hybern and all she lost in it. The one person who ignites her\ntemper more than any other is Cassian, the battle-scarred warrior whose position in Rhysand and Feyre\'s\nNight Court keeps him constantly in Nesta\'s orbit. But her temper isn\'t the only thing Cassian ignites.\nThe fire between them is undeniable, and only burns hotter as they are forced into close quarters with\neach other. Meanwhile, the treacherous human queens who returned to the Continent during the last war\nhave forged a dangerous new alliance, threatening the fragile peace that has settled over the realms.\nAnd the key to halting them might very well rely on Cassian and Nesta facing their haunting pasts.\nAgainst the sweeping backdrop of a world seared by war and plagued with uncertainty, Nesta and Cassian\nbattle monsters from within and without as they search for acceptance-and healing-in each other\'s arms.','/assets/ACourtOfSilverFlames.jpg'),(10,'Fourth Wing','Rebecca Yarros','Fantasy, Romance, Fiction, Dragon, Magic',500,'2023-05-02','In Stock','Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history.\nNow, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates\nstriving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle,\ndeath is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons\nwilling to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for\nbeing her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. She’ll need\nevery edge her wits can give her just to see the next sunrise. Yet, with every day that passes, the war outside grows\nmore deadly, the kingdom\'s protective wards are failing, and the death toll continues to rise. Even worse, Violet begins\nto suspect leadership is hiding a terrible secret. Friends, enemies, lovers. Everyone at Basgiath War College has an\nagenda—because once you enter, there are only two ways out: graduate or die.','/assets/FourthWing.jpg'),(11,'Iron Flame','Rebecca Yarros','Fantasy, Romance, Fiction, Dragon, Magic',640,'2023-11-07','In Stock','Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—Violet included. But Threshing was\nonly the first impossible test meant to weed out the weak-willed, the unworthy, and the unlucky. Now the real training begins,\nand Violet’s already wondering how she’ll get through. It’s not just that it’s grueling and maliciously brutal, or even that\nit’s designed to stretch the riders’ capacity for pain beyond endurance. It’s the new vice commandant, who’s made it his\npersonal mission to teach Violet exactly how powerless she is–unless she betrays the man she loves. Although Violet’s body\nmight be weaker and frailer than everyone else’s, she still has her wits—and a will of iron. And leadership is forgetting the\nmost important lesson Basgiath has taught her: Dragon riders make their own rules. But a determination to survive won’t be\nenough this year. Because Violet knows the real secret hidden for centuries at Basgiath War College—and nothing, not even\ndragon fire, may be enough to save them in the end.','/assets/IronFlame.jpg'),(12,'Twisted Love','Ana Huang','Romance, Fiction, Contemporary, Dark, Love, Adult',360,'2021-04-21','In Stock','He has a heart of ice...but for her, he\'d burn the world.\n\nAlex Volkov is a devil blessed with the face of an angel and cursed with a past he can’t escape.\n\nDriven by a tragedy that has haunted him for most of his life, his ruthless pursuits for success and vengeance leave little room for matters of the heart.\n\nBut when he’s forced to look after his best friend’s sister, he starts to feel something in his chest:\n\nA crack.\nA melt.\nA fire that could end his world as he knew it.\n\n***\n\nAva Chen is a free spirit trapped by nightmares of a childhood she can’t remember.\n\nBut despite her broken past, she’s never stopped seeing the beauty in the world…including the heart beneath the icy exterior of a man she shouldn’t want.\n\nHer brother’s best friend.\nHer neighbor.\nHer savior and her downfall.\n\nTheirs is a love that was never supposed to happen—but when it does, it unleashes secrets that could destroy them both…and everything they hold dear.','/assets/TwistedLove.jpg'),(13,'Twisted Games','Ana Huang','Romance, Fiction, Contemporary, Dark, Love, Adult',456,'2021-07-29','In Stock','She can never be his...but he\'s taking her anyway.\n\nStoic, broody, and arrogant, elite bodyguard Rhys Larsen has two rules: 1) Protect his clients at all costs 2) Do not become emotionally involved. Ever.\n\nHe has never once been tempted to break those rules…until her.\n\nBridget von Ascheberg. A princess with a stubborn streak that matches his own and a hidden fire that reduces his rules to ash. She’s nothing he expected and everything he never knew he needed.\n\nDay by day, inch by inch, she breaks down his defenses until he’s faced with a truth he can no longer deny: he swore an oath to protect her, but all he wants is to ruin her. Take her.\n\nBecause she’s his.\n\nHis princess.\nHis forbidden fruit.\nHis every depraved fantasy.\n\n***\n\nRegal, strong-willed, and bound by the chains of duty, Princess Bridget dreams of the freedom to live and love as she chooses.\n\nBut when her brother abdicates, she’s suddenly faced with the prospect of a loveless, politically expedient marriage and a throne she never wanted.\n\nAnd as she navigates the intricacies—and treacheries—of her new role, she must also hide her desire for a man she can’t have.\n\nHer bodyguard.\nHer protector.\nHer ultimate ruin.\n\nUnexpected and forbidden, theirs is a love that could destroy a kingdom…and doom them both.','/assets/TwistedGames.jpg'),(14,'Twisted Hate','Ana Huang','Romance, Fiction, Contemporary, Dark, Love, Adult',522,'2022-01-27','In Stock','He hates her...almost as much as he wants her.\n\nGorgeous, cocky, and fast on his way to becoming a hotshot doctor, Josh Chen has never met a woman he couldn’t charm—except for Jules f**king Ambrose.\n\nThe beautiful redhead has been a thorn in his side since they met, but she also consumes his thoughts in a way no woman ever has.\n\nWhen their animosity explodes into one unforgettable night, he proposes a solution that’ll get her out of his system once and for all: an enemies with benefits arrangement with simple rules.\n\nNo jealousy.\n\nNo strings attached.\n\nAnd absolutely no falling in love.\n\n**\n\nOutgoing and ambitious, Jules Ambrose is a former party girl who’s focused on one thing: passing the attorney’s bar exam.\n\nThe last thing she needs is to get involved with a doctor who puts the SUFFER in insufferable…no matter how good-looking he is.\n\nBut the more she gets to know him, the more she realizes there’s more than meets the eye to the man she’s hated for so long.\n\nHer best friend’s brother.\n\nHer nemesis.\n\nAnd her only salvation.\n\n\nTheirs is a match made in hell, and when the demons from their past catch up with them, they’re faced with truths that could either save them …or destroy everything they’ve worked for.','/assets/TwistedHate.jpg'),(15,'Twisted Lies','Ana Huang','Romance, Fiction, Contemporary, Dark, Love, Adult',530,'2022-06-30','In Stock','He\'ll do anything to have her...including lie.\n\nCharming, deadly, and smart enough to hide it, Christian Harper is a monster dressed in the perfectly tailored suits of a gentleman.\n\nHe has little use for morals and even less use for love, but he can’t deny the strange pull he feels toward the woman living just one floor below him.\n\nShe’s the object of his darkest desires, the only puzzle he can’t solve. And when the opportunity to get closer to her arises, he breaks his own rules to offer her a deal she can’t refuse.\n\nEvery monster has their weakness. She’s his.\n\nHis obsession.\nHis addiction.\nHis only exception.\n\n**\n\nSweet, shy, and introverted despite her social media fame, Stella Alonso is a romantic who keeps her heart in a cage.\n\nBetween her two jobs, she has little time or desire for a relationship.\n\nBut when a threat from her past drives her into the arms—and house—of the most dangerous man she’s ever met, she’s tempted to let herself feel something for the first time in a long time.\n\nBecause despite Christian’s cold nature, he makes her feel everything when she’s with him.\n\nPassionate.\nProtected.\nTruly wanted.\n\nTheirs is a love twisted with secrets and tainted by lies…and when the truths are finally revealed, they could shatter everything.','/assets/TwistedLies.jpg'),(16,'After','Anna Todd','Romance, Fiction, Contemporary, Drama, Love, Adult, Young Adult',582,'2014-10-21','In Stock','Tessa is a good girl with a sweet, reliable boyfriend back home. She’s got direction, ambition, and a mother who’s intent on keeping her that way.\n\nBut she’s barely moved into her freshman dorm when she runs into Hardin. With his tousled brown hair, cocky British accent, tattoos, and lip ring, Hardin is cute and different from what she’s used to.\n\nBut he’s also rude—to the point of cruelty, even. For all his attitude, Tessa should hate Hardin. And she does—until she finds herself alone with him in his room. Something about his dark mood grabs her, and when they kiss it ignites within her a passion she’s never known before.\n\nHe’ll call her beautiful, then insist he isn\'t the one for her and disappear again and again. Despite the reckless way he treats her, Tessa is compelled to dig deeper and find the real Hardin beneath all his lies. He pushes her away again and again, yet every time she pushes back, he only pulls her in deeper.\n\nTessa already has the perfect boyfriend. So why is she trying so hard to overcome her own hurt pride and Hardin’s prejudice about nice girls like her?\n\nUnless…could this be love?','/assets/After.jpg'),(17,'After We Collided','Anna Todd','Romance, Fiction, Contemporary, Drama, Love, Adult, Young Adult',674,'2013-09-07','In Stock','Tessa has everything to lose. Hardin has nothing to lose… except her.\n\nAfter a tumultuous beginning to their relationship, Tessa and Hardin were on the path to making things work. Tessa knew Hardin could be cruel, but when a bombshell revelation is dropped about the origins of their relationship—and Hardin’s mysterious past—Tessa is beside herself.\n\nHardin will always be… Hardin. But is he really the deep, thoughtful guy Tessa fell madly in love with despite his angry exterior—or has he been a stranger all along? She wishes she could walk away. It’s just not that easy. Not with the memory of passionate nights spent in his arms. His electric touch. His hungry kisses.\n\nStill, Tessa’s not sure she can endure one more broken promise. She put so much on hold for Hardin—school, friends, her mom, a relationship with a guy who really loved her, and now possibly even a promising new career. She needs to move forward with her life.\n\nHardin knows he made a mistake, possibly the biggest one of his life. He’s not going down without a fight. But can he change? Will he change for love?','/assets/AfterWeCollided.jpg'),(18,'After We Fell','Anna Todd','Romance, Fiction, Contemporary, Drama, Love, Adult, Young Adult',837,'2014-07-14','In Stock','Tessa and Hardin’s love was complicated before. Now it’s more confusing than ever. AFTER WE FELL...Life will never be the same. #HESSA\n\nJust as Tessa makes the biggest decision of her life, everything changes. Revelations about first her family, and then Hardin’s, throw everything they knew before in doubt and makes their hard-won future together more difficult to claim.\n\nTessa’s life begins to come unglued. Nothing is what she thought it was. Not her friends. Not her family. The one person she should be able to rely on, Hardin, is furious when he discovers the massive secret she’s been keeping. And rather than being understanding, he turns to sabotage.\n\nTessa knows Hardin loves her and will do anything to protect her, but there’s a difference between loving someone and being able to have them in your life. This cycle of jealousy, unpredictable anger, and forgiveness is exhausting. She’s never felt so intensely for anyone, so exhilarated by someone’s kiss—but is the irrepressible heat between her and Hardin worth all the drama? Love used to be enough to hold them together. But if Tessa follows her heart now, will it be...the end?','/assets/AfterWeFell.jpg'),(19,'After Ever Happy','Anna Todd','Romance, Fiction, Contemporary, Drama, Love, Adult, Young Adult',512,'2015-07-06','In Stock','Tessa and Hardin have defied all the odds, but will their fairy tale ending be turned on its head? AFTER EVER HAPPY...Life will never be the same. #HESSA\n\nIt’s never been all rainbows and sunshine for Tessa and Hardin, but each new challenge they’ve faced has only made their passionate bond stronger and stronger. But when a revelation about the past shakes Hardin’s inpenetrable façade to the core—and then Tessa suffers a tragedy—will they stick together again, or be torn apart?\n\nAs the shocking truth about each of their families emerges, it’s clear the two lovers are not so different from each other. Tessa is no longer the sweet, simple, good girl she was when she met Hardin—any more than he is the cruel, moody boy she fell so hard for. Tessa understands all the troubling emotions brewing beneath Hardin’s exterior, and she knows she’s the only one who can calm him when he erupts. He needs her.\n\nBut the more layers of his past come to light, the darker he grows, and the harder he pushes Tessa—and everyone else in his life—away. Tessa’s not sure if she really can save him—not without sacrificing herself. She refuses to go down without a fight. But who is she fighting for—Hardin or herself?','/assets/AfterEverHappy.jpg'),(20,'Before','Anna Todd','Romance, Fiction, Contemporary, Drama, Love, Adult, Young Adult',338,'2015-12-08','In Stock','Before explores Hardin Scott\'s life before Tessa, reveals what happens after After, and gives new insights on their turbulent #Hessa romance.\n\nBEFORE Hardin met Tessa he was a raging storm. DURING those first moments they met, he realized he needed to keep her for himself -- his life depended on it. AFTER they got together, the world would never be the same.\n\nHardin and Tessa\'s dramatic love affair became a vortex pulling in everyone around them. For the first time these others are given voice as they appear before, during, and after the events in original After novels. Alongside them, Hardin\'s account of his first encounters with Tessa -- which will change what you thought you knew about the brooding boy and the angel who loved him.','/assets/Before.jpg'),(21,'Throne of Glass','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',406,'2012-08-07','In Stock','In a land without magic, where the king rules with an iron hand, an assassin is summoned to the castle. She comes not to kill the king, but to win her freedom. If she defeats twenty-three killers, thieves, and warriors in a competition, she is released from prison to serve as the king\'s champion. Her name is Celaena Sardothien.\n\nThe Crown Prince will provoke her. The Captain of the Guard will protect her. But something evil dwells in the castle of glass—and it\'s there to kill. When her competitors start dying one by one, Celaena\'s fight for freedom becomes a fight for survival, and a desperate quest to root out the evil before it destroys her world.','/assets/ThroneOfGlass.jpg'),(22,'Crown of Midnight','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',420,'2013-08-15','In Stock','\"A line that should never be crossed is about to be breached.\n\nIt puts this entire castle in jeopardy—and the life of your friend.\"\n\nFrom the throne of glass rules a king with a fist of iron and a soul as black as pitch. Assassin Celaena Sardothien won a brutal contest to become his Champion. Yet Celaena is far from loyal to the crown. She hides her secret vigilantly; she knows that the man she serves is bent on evil.\n\nKeeping up the deadly charade becomes increasingly difficult when Celaena realizes she is not the only one seeking justice. As she tries to untangle the mysteries buried deep within the glass castle, her closest relationships suffer. It seems no one is above questioning her allegiances—not the Crown Prince Dorian; not Chaol, the Captain of the Guard; not even her best friend, Nehemia, a foreign princess with a rebel heart.\n\nThen one terrible night, the secrets they have all been keeping lead to an unspeakable tragedy. As Celaena\'s world shatters, she will be forced to give up the very thing most precious to her and decide once and for all where her true loyalties lie... and whom she is ultimately willing to fight for.','/assets/CrownOfMidnight.jpg'),(23,'Heir of Fire','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',576,'2014-09-02','In Stock','Celaena has survived deadly contests and shattering heartbreak-but at an unspeakable cost. Now, she must travel to a new land to confront her darkest truth . . . a truth about her heritage that could change her life-and her future-forever. Meanwhile, brutal and monstrous forces are gathering on the horizon, intent on enslaving her world. Will Celaena find the strength to not only fight her inner demons, but to take on the evil that is about to be unleashed?','/assets/HeirOfFire.jpg'),(24,'Queen of Shadows','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',648,'2015-09-01','In Stock','Everyone Celaena Sardothien loves has been taken from her. But she’s at last returned to the empire—for vengeance, to rescue her once-glorious kingdom, and to confront the shadows of her past…\n\nShe has embraced her identity as Aelin Galathynius, Queen of Terrasen. But before she can reclaim her throne, she must fight.\n\nShe will fight for her cousin, a warrior prepared to die for her. She will fight for her friend, a young man trapped in an unspeakable prison. And she will fight for her people, enslaved to a brutal king and awaiting their lost queen’s triumphant return.\n\nCelaena continues her epic journey, leading to a passionate and agonizing crescendo that has the potential to shatter her world.','/assets/QueenOfShadows.jpg'),(25,'Empire of Storms','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',689,'2016-09-06','In Stock','The long path to the throne has only just begun for Aelin Galathynius as war looms on the horizon. Loyalties have been broken and bought, friends have been lost and gained, and those who possess magic find themselves at odds with those who don\'t.\n\nWith her heart sworn to the warrior-prince by her side, and her fealty pledged to the people she is determined to save, Aelin will delve into the depths of her power to protect those she loves. But as monsters emerge from the horrors of the past, and dark forces become poised to claim her world, the only chance for salvation will lie in a desperate quest that may mark the end of everything Aelin holds dear.\n\nAelin will have to choose what—and who—to sacrifice if she\'s to keep the world of Erilea from breaking apart.','/assets/EmpireOfStorms.jpg'),(26,'Tower of Dawn','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',688,'2017-09-05','In Stock','Chaol Westfall and Nesryn Faliq have arrived in the shining city of Antica to forge an alliance with the Khagan of the Southern Continent, whose vast armies are Erilea\'s last hope. But they have also come to Antica for another purpose: to seek healing at the famed Torre Cesme for the wounds Chaol received in Rifthold.\n\nAfter enduring unspeakable horrors as a child, Yrene Towers has no desire to help the young lord from Adarlan, let alone heal him. Yet she has sworn an oath to assist those in need—and will honor it. But Lord Westfall carries shadows from his own past, and Yrene soon comes to realize they could engulf them both.\n\nChaol, Nesryn, and Yrene will have to draw on every scrap of their resilience if they wish to save their friends. But while they become entangled in the political webs of the khaganate, deep in the shadows of mighty mountains where warriors soar on legendary ruks, long-awaited answers slumber. Answers that might offer their world a chance at survival—or doom them all . . .','/assets/TowerOfDawn.jpg'),(27,'Kingdom of Ash','Sarah J. Maas','Fiction, Fantasy, Romance, Magic, Young Adult',980,'2018-10-23','In Stock','Aelin Galathynius has vowed to save her people ― but at a tremendous cost. Locked within an iron coffin by the Queen of the Fae, Aelin must draw upon her fiery will as she endures months of torture. The knowledge that yielding to Maeve will doom those she loves keeps her from breaking, but her resolve is unraveling with each passing day…\n\nWith Aelin captured, friends and allies are scattered to different fates. Some bonds will grow even deeper, while others will be severed forever. As destinies weave together at last, all must fight if Erilea is to have any hope of salvation.','/assets/KingdomOfAsh.jpg'),(28,'The Lost Girl','Dominic Fiorino','Fantasy',222,'2000-03-23','In Stock','Dominic wrote a book!','/assets/TheLostGirl.jpg'),(29,'House of Earth and Blood','Sarah J. Maas','Fantasy, Fiction, Romance, Adult, Magic, Paranormal',803,'2020-03-03','Out of Stock','Bryce Quinlan had the perfect life-working hard all day and partying all night-until a demon murdered her closest friends, leaving her\nbereft, wounded, and alone. When the accused is behind bars but the crimes start up again, Bryce finds herself at the heart of the\ninvestigation. She\'ll do whatever it takes to avenge their deaths. Hunt Athalar is a notorious Fallen angel, now enslaved to the\nArchangels he once attempted to overthrow. His brutal skills and incredible strength have been set to one purpose-to assassinate\nhis boss\'s enemies, no questions asked. But with a demon wreaking havoc in the city, he\'s offered an irresistible deal: help Bryce\nfind the murderer, and his freedom will be within reach. As Bryce and Hunt dig deep into Crescent City\'s underbelly, they discover a\ndark power that threatens everything and everyone they hold dear, and they find, in each other, a blazing passion-one that could set\nthem both free, if they\'d only let it. With unforgettable characters, sizzling romance, and page-turning suspense, this richly inventive\nnew fantasy series by #1 New York Times bestselling author Sarah J. Maas delves into the heartache of loss, the price of freedom-and\nthe power of love.','/assets/HouseOfEarthAndBlood.jpg'),(30,'House of Sky and Breath','Sarah J. Maas','Fantasy, Fiction, Romance, Adult, Magic, Paranormal',805,'2022-02-15','Out of Stock','Bryce Quinlan and Hunt Athalar are trying to get back to normal―they may have saved Crescent City, but with so much upheaval in their\nlives lately, they mostly want a chance to relax. Slow down. Figure out what the future holds. The Asteri have kept their word so far,\nleaving Bryce and Hunt alone. But with the rebels chipping away at the Asteri’s power, the threat the rulers pose is growing. As Bryce,\nHunt, and their friends get pulled into the rebels’ plans, the choice becomes clear: stay silent while others are oppressed, or fight for\nwhat’s right. And they’ve never been very good at staying silent. In this sexy, action-packed sequel to the #1 bestseller House of Earth\nand Blood, Sarah J. Maas weaves a captivating story of a world about to explode―and the people who will do anything to save it.','/assets/HouseOfSkyAndBreath.jpg'),(31,'House of Flame and Shadow','Sarah J. Maas','Fantasy, Fiction, Romance, Adult, Magic, Paranormal',816,'2024-01-30','Out of Stock','Bryce Quinlan never expected to see a world other than Midgard, but now that she has, all she wants is to get back. Everything she loves \nis in Midgard: her family, her friends, her mate. Stranded in a strange new world, she\'s going to need all her wits about her to get home\nagain. And that\'s no easy feat when she has no idea who to trust. Hunt Athalar has found himself in some deep holes in his life, but this\none might be the deepest of all. After a few brief months with everything he ever wanted, he\'s in the Asteri\'s dungeons again, stripped of\nhis freedom and without a clue as to Bryce\'s fate. He\'s desperate to help her, but until he can escape the Asteri\'s leash, his hands are\nquite literally tied. In this sexy, breathtaking sequel to the #1 bestsellers House of Earth and Blood and House of Sky and Breath, Sarah\nJ. Maas\'s Crescent City series reaches new heights as Bryce and Hunt\'s world is brought to the brink of collapse-with its future resting on\ntheir shoulders.','/assets/HouseOfFlameAndShadow.jpg');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logtable`
--

DROP TABLE IF EXISTS `logtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logtable` (
  `id` int DEFAULT NULL,
  `log` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logtable`
--

LOCK TABLES `logtable` WRITE;
/*!40000 ALTER TABLE `logtable` DISABLE KEYS */;
/*!40000 ALTER TABLE `logtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'librarydb'
--
/*!50003 DROP PROCEDURE IF EXISTS `getAllBooks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBooks`()
BEGIN
	SELECT * FROM inventory;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllGenres` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllGenres`()
BEGIN
    SELECT *
    FROM genres;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMaxPages` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMaxPages`()
BEGIN
	SELECT MAX(pages)
    AS maxPages
    FROM inventory;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `log_msg` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `log_msg`(msg VARCHAR(255))
BEGIN
    insert into logtable select 0, msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `stepFive_filterAvailability` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `stepFive_filterAvailability`(desiredAvailability VARCHAR(12))
BEGIN
	IF desiredAvailability IS NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_availabilityResults_table AS
        SELECT * 
        FROM temp_dateResults_table;
    ELSE
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_availabilityResults_table AS
		SELECT *
		FROM temp_dateResults_table
		WHERE availability = desiredAvailability;
	END IF;
    
    DROP TEMPORARY TABLE IF EXISTS temp_dateResults_table;
    
    SELECT *
    FROM temp_availabilityResults_table;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `stepFour_filterDates` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `stepFour_filterDates`(desiredPublishDate VARCHAR(50), desiredAvailability VARCHAR(50))
BEGIN
	IF desiredPublishDate IS NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_dateResults_table AS
        SELECT * FROM temp_pageResults_table;
    ELSE
		IF LOCATE(',', desiredPublishDate) = 0 THEN
			CREATE TEMPORARY TABLE IF NOT EXISTS temp_dateResults_table AS
			SELECT *
			FROM temp_pageResults_table
			WHERE published = desiredPublishDate;
		ELSE
			CREATE TEMPORARY TABLE IF NOT EXISTS temp_dates_table (startDate DATE, endDate DATE);
			
			INSERT INTO temp_dates_table (startDate, endDate)
			VALUES (CAST(TRIM(SUBSTRING_INDEX(desiredPublishDate, ',', 1)) AS DATE), 
					CAST(TRIM(SUBSTRING_INDEX(desiredPublishDate, ',', -1)) AS DATE));
			
			CREATE TEMPORARY TABLE IF NOT EXISTS temp_dateResults_table AS
			SELECT i.*
			FROM temp_pageResults_table i
			JOIN temp_dates_table t ON i.published BETWEEN t.startDate AND t.endDate;
			
			DROP TEMPORARY TABLE IF EXISTS temp_dates_table;
        END IF;
	END IF;
    
    DROP TEMPORARY TABLE IF EXISTS temp_pageResults_table;

    CALL stepFive_filterAvailability(desiredAvailability);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `stepOne_filterAuthors` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `stepOne_filterAuthors`(desiredAuthor VARCHAR(255), desiredGenre VARCHAR(255), desiredPages VARCHAR(20), desiredPublishDate VARCHAR(50), desiredAvailability VARCHAR(50))
BEGIN
	IF desiredAuthor IS NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_authorResults_table AS
        SELECT * FROM inventory;
    ELSE
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_author_table (desiredAuthor VARCHAR(255));
		
		WHILE LENGTH(desiredAuthor) > 0 DO
			INSERT INTO temp_author_table (desiredAuthor) VALUES (LOWER(REPLACE(REPLACE(TRIM(SUBSTRING_INDEX(desiredAuthor, ',', 1)), ' ', ''), '.', '')));
			SET desiredAuthor = REPLACE(desiredAuthor, SUBSTRING_INDEX(desiredAuthor, ',', 1), '');
			SET desiredAuthor = TRIM(BOTH ',' FROM desiredAuthor);
		END WHILE;
		
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_authorResults_table AS
		SELECT DISTINCT i.*
		FROM inventory i
		JOIN temp_author_table t ON LOWER(REPLACE(REPLACE(i.author, ' ', ''), '.', '')) = t.desiredAuthor;
		
		DROP TEMPORARY TABLE IF EXISTS temp_author_table;
	END IF;
    
    DROP TEMPORARY TABLE IF EXISTS temp_availabilityResults_table;
    
    CALL stepTwo_filterGenres(desiredGenre, desiredPages, desiredPublishDate, desiredAvailability);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `stepThree_filterPages` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `stepThree_filterPages`(desiredPages VARCHAR(20), desiredPublishDate VARCHAR(50), desiredAvailability VARCHAR(50))
BEGIN
	IF desiredPages IS NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_pageResults_table AS
        SELECT * FROM temp_genreResults_table;
	ELSE
		IF LOCATE(',', desiredPages) = 0 THEN
			CREATE TEMPORARY TABLE IF NOT EXISTS temp_pageResults_table AS
			SELECT *
			FROM temp_genreResults_table
			WHERE pages = desiredPages;
		ELSE
			CREATE TEMPORARY TABLE IF NOT EXISTS temp_page_table (minPage INT, maxPage INT);
			
			INSERT INTO temp_page_table (minPage, maxPage)
			VALUES (CAST(TRIM(SUBSTRING_INDEX(desiredPages, ',', 1)) AS SIGNED),
					CAST(TRIM(SUBSTRING_INDEX(desiredPages, ',', -1)) AS SIGNED));
			
			CREATE TEMPORARY TABLE IF NOT EXISTS temp_pageResults_table AS
			SELECT i.*
			FROM temp_genreResults_table i
			JOIN temp_page_table t ON i.pages BETWEEN t.minPage AND t.maxPage;
			
			DROP TEMPORARY TABLE IF EXISTS temp_page_table;
		END IF;
	END IF;
    
    DROP TEMPORARY TABLE IF EXISTS temp_genreResults_table;

    CALL stepFour_filterDates(desiredPublishDate, desiredAvailability);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `stepTwo_filterGenres` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `stepTwo_filterGenres`(desiredGenre VARCHAR(255), desiredPages VARCHAR(20), desiredPublishDate VARCHAR(50), desiredAvailability VARCHAR(50))
BEGIN
	IF desiredGenre IS NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_genreResults_table AS
        SELECT * FROM temp_authorResults_table;
    ELSE
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_genre_table (desiredGenre VARCHAR(255));
		
		WHILE LENGTH(desiredGenre) > 0 DO
			INSERT INTO temp_genre_table (desiredGenre) VALUES (TRIM(SUBSTRING_INDEX(desiredGenre, ',', 1)));
			SET desiredGenre = REPLACE(desiredGenre, SUBSTRING_INDEX(desiredGenre, ',', 1), '');
			SET desiredGenre = TRIM(BOTH ',' FROM desiredGenre);
		END WHILE;
		
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_genreResults_table AS
		SELECT DISTINCT i.*
		FROM temp_authorResults_table i
		JOIN temp_genre_table t ON i.genre LIKE CONCAT('%', t.desiredGenre, '%');
		
		DROP TEMPORARY TABLE IF EXISTS temp_genre_table;
	END IF;
    
    DROP TEMPORARY TABLE IF EXISTS temp_authorResults_table;
    
    CALL stepThree_filterPages(desiredPages, desiredPublishDate, desiredAvailability);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-13 15:54:27