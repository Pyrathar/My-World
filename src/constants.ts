import { Item } from "./models/item";

export class Constants {

  public BACKGROUNDTHUMBS: Item[] = [
    new Item(0, "background", "/class_tn.png",    "Classroom"),
    new Item(1, "background", "/home_tn.png",     "Home"),
    new Item(2, "background", "/outdoors_tn.png", "Outdoors"),
  ];

  public BACKGROUNDS: Item[] = [
    new Item(0, "background", "/class.png",     "Classroom"),
    new Item(1, "background", "/home.png",      "Home"),
    new Item(2, "background", "/outdoors.png",  "Outdoors"),
  ];

  public AVATARS: Item[] = [
    new Item(101, "avatar", "/afro_boy.png",      "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(102, "avatar", "/afro_girl.png",     "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(103, "avatar", "/asian_boy.png",     "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(104, "avatar", "/asian_girl.png",    "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(105, "avatar", "/caucasis_boy.png",  "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(106, "avatar", "/caucasis_girl.png", "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(107, "avatar", "/ginger_boy.png",    "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(108, "avatar", "/mid_east_boy.png",  "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(109, "avatar", "/mid_east_girl.png", "",   window.innerWidth / 2,    window.innerHeight / 2,   0),
  ];

  public PERSONS: Item[] = [
    new Item(201, "person", "/old_man.png",        "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(202, "person", "/old_woman.png",      "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(203, "person", "/afro_man.png",       "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(204, "person", "/asian_man.png",      "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(205, "person", "/caucasis_woman.png", "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(206, "person", "/mid_east_woman.png", "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(207, "person", "/ginger_teen.png",    "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(208, "person", "/mid_east_teen.png",  "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(209, "person", "/asian_teen.png",     "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(210, "person", "/afro_teen.png",      "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(211, "person", "/afro_boy.png",       "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(212, "person", "/afro_girl.png",      "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(213, "person", "/asian_boy.png",      "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(214, "person", "/asian_girl.png",     "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(215, "person", "/caucasis_boy.png",   "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(216, "person", "/caucasis_girl.png",  "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(217, "person", "/ginger_boy.png",     "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(218, "person", "/mid_east_boy.png",   "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(219, "person", "/mid_east_girl.png",  "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
    new Item(220, "person", "/baby.png",           "",    window.innerWidth / 2,   window.innerHeight / 2,   0),
  ];

  public MOODS: Item[] = [
    new Item(301, "mood", "/bange.png",          "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(302, "mood", "/forvirret.png",      "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(303, "mood", "/happy.png",          "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(304, "mood", "/ked_af_det.png",     "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(305, "mood", "/overrasket.png",     "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(306, "mood", "/pinligt_berort.png", "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(307, "mood", "/sad.png",            "",    window.innerWidth / 2,    window.innerHeight / 2),
    new Item(308, "mood", "/vred.png",           "",    window.innerWidth / 2,    window.innerHeight / 2),
  ];

  public ITEMS: Item[] = [
    new Item(401, "item", "/action_man.png",         "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(402, "item", "/arm_chair.png",          "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(403, "item", "/baseball_mit.png",       "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(404, "item", "/bed.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(405, "item", "/bike.png",               "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(406, "item", "/bird.png",               "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(407, "item", "/bookcase.png",           "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(408, "item", "/bte.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(409, "item", "/bus.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(410, "item", "/car.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(411, "item", "/cat.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(412, "item", "/chair.png",              "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(413, "item", "/cochlear_implants.png",  "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(414, "item", "/consol.png",             "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(415, "item", "/control.png",            "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(416, "item", "/dog.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(417, "item", "/doll.png",               "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(418, "item", "/electric_piano.png",     "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(419, "item", "/flatscreen.png",         "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(421, "item", "/fodbold.png",            "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(422, "item", "/horse.png",              "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(423, "item", "/ite.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(424, "item", "/ketched.png",            "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(425, "item", "/kort.png",               "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(426, "item", "/laptop.png",             "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(427, "item", "/large_table.png",        "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(428, "item", "/lego.png",               "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(429, "item", "/mask_and_snorke.png",    "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(430, "item", "/microphone_brown.png",   "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(431, "item", "/microphone_grey.png",    "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(432, "item", "/mobile.png",             "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(433, "item", "/mp3.png",                "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(434, "item", "/radio_cd.png",           "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(435, "item", "/science_lab.png",        "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(436, "item", "/small_table.png",        "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(437, "item", "/sofa.png",               "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(438, "item", "/table.png",              "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(439, "item", "/terningsspil.png",       "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(440, "item", "/tortois.png",            "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
    new Item(441, "item", "/train.png",              "",    window.innerWidth / 2,    window.innerHeight / 2,   0),
  ];

  public PREGENERATED_CLASSROOM: Item[] = [
    new Item(502, "item", "/chair.png",       "", 294, 356, 270),
    new Item(503, "item", "/chair.png",       "", 460, 358, 270),
    new Item(504, "item", "/chair.png",       "", 467, 520, 270),
    new Item(505, "item", "/chair.png",       "", 310, 521, 270),
    new Item(506, "item", "/small_table.png", "", 358, 539, 270),
    new Item(507, "item", "/small_table.png", "", 350, 388, 270),
    new Item(508, "item", "/small_table.png", "", 520, 538, 270),
    new Item(509, "item", "/small_table.png", "", 525, 387, 270),
    new Item(510, "item", "/chair.png",       "", 842, 235,  90),
    new Item(511, "item", "/large_table.png", "", 677, 380, 270),
  ];

  public PREGENERATED_HOME: Item[] = [
    // Bedroom
    new Item(601, "item", "/chair.png",           "", 142, 289, 180),
    new Item(602, "item", "/small_table.png",     "",  62, 181,   0),
    new Item(603, "item", "/doll.png",            "", 229, 372,   0),
    new Item(604, "item", "/baseball_mit.png",    "", 302, 386,   0),
    new Item(605, "item", "/bed.png",             "", 392, 168,  90),
    new Item(606, "item", "/electric_piano.png",  "",  75, 394, 270),
    // Living room
    new Item(607, "item", "/flatscreen.png",      "",  13, 710, 270),
    new Item(608, "item", "/sofa.png",            "", 360, 570,  90),
    new Item(609, "item", "/chair.png",           "", 527, 510,   0),
    new Item(610, "item", "/chair.png",          "", 454, 510,   0),
    new Item(611, "item", "/chair.png",          "", 589, 690, 180),
    new Item(612, "item", "/chair.png",          "", 522, 690, 180),
    new Item(613, "item", "/table.png",          "", 453, 554,   0),
    new Item(614, "item", "/bookcase.png",       "", 781, 432,   0),
    new Item(615, "item", "/arm_chair.png",      "", 939, 587,  90),
  ];

  // TODO: check if needed
  public PREGENERATED_OUTDOOR: Item[] = [
    new Item(701, "item", "/bike.png",    "", 524, 469, 0),
    new Item(702, "item", "/fodbold.png", "", 715, 637, 0),
    new Item(703, "item", "/car.png",     "", 471, 309, 0),
  ];

  public QUESTIONS_CLASSROOM: string[] = [
    "Where do you sit in the classroom?",
    "When and where is it easy/hard to hear in the classroom?",
    "If you cannot hear well, what do you do?",
    "Where does the teacher usually sit or stand?",
    "Can you hear and understand what your teacher is saying?",
    "What do you do if you cannot hear the teacher?",
    "Where are the windows? And the teacher's computer screen and whiteboard?",
  ];

  public QUESTIONS_HOME: string[] = [
    "What is important for you to hear at home?",
    "Where in the house is your room?",
    "Can you hear your mom/dad if they call you from another room?",
    "What is the first thing you do when you come home from school?",
    "Is it easy to talk to everyone at the dinner table? Who talks the most?",
    "What do you do if you cannot participate in the conversation?",
    "Can you hear well when watching the television?",
    "What do you do if you are at home and you struggle to hear - e.g. in the " +
    "kitchen if your mom is cooking / during meals / when the dog barks / if your baby sister is crying / etc.?",
  ];

  public QUESTIONS_OUTDOORS: string[] = [
    "What do you enjoy doing when you play outside?",
    "When is it difficult / easy for you to hear outside?",
    "What do you do when it is hard for you to hear?",
    "Do you manage on your own or are you mostly with an adult?",
    "If you cycle to school or sports, do you wear a helmet? How well can you hear when you wear your helmet?",
    "Tell me about your hearing when you are on public transportation or in the car",
    "What do you do to make sure you stay safe in traffic?",
  ];

}
