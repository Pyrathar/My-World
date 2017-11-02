import { Item } from "./models";

export class Constants {

  public BACKGROUNDTHUMBS: Item[] = [
    new Item(0, "background", "/class_tn.png", "Classroom"),
    new Item(1, "background", "/home_tn.png", "At Home"),
    new Item(2, "background", "/outdoors_tn.png", "The Great Outdoors"),
  ];

  public BACKGROUNDS: Item[] = [
    new Item(0, "background", "/class.png", "Classroom"),
    new Item(1, "background", "/home.png", "At Home"),
    new Item(2, "background", "/outdoors.png", "The Great Outdoors"),
  ];

  public AVATARS: Item[] = [
    new Item(1, "person", "/afro_boy.png", "", 150, 150),
    new Item(2, "person", "/afro_girl.png", "", 150, 150),
    new Item(3, "person", "/asian_boy.png", "", 150, 150),
    new Item(4, "person", "/asian_girl.png", "", 150, 150),
    new Item(5, "person", "/caucasis_boy.png", "", 150, 150),
    new Item(6, "person", "/caucasis_girl.png", "", 150, 150),
    new Item(7, "person", "/ginger_boy.png", "", 150, 150),
    new Item(8, "person", "/mid_east_boy.png", "", 150, 150),
    new Item(9, "person", "/mid_east_girl.png", "", 150, 150),
  ];

  public PERSONS: Item[] = [
    new Item(29, "person", "/old_man.png", "", 150, 150),
    new Item(30, "person", "/old_woman.png", "", 150, 150),
    new Item(13, "person", "/afro_man.png", "", 150, 150),
    new Item(17, "person", "/asian_man.png", "", 150, 150),
    new Item(21, "person", "/caucasis_woman.png", "", 150, 150),
    new Item(28, "person", "/mid_east_woman.png", "", 150, 150),
    new Item(24, "person", "/ginger_teen.png", "", 150, 150),
    new Item(27, "person", "/mid_east_teen.png", "", 150, 150),
    new Item(18, "person", "/asian_teen.png", "", 150, 150),
    new Item(14, "person", "/afro_teen.png", "", 150, 150),
    new Item(11, "person", "/afro_boy.png", "", 150, 150),
    new Item(12, "person", "/afro_girl.png", "", 150, 150),
    new Item(15, "person", "/asian_boy.png", "", 150, 150),
    new Item(16, "person", "/asian_girl.png", "", 150, 150),
    new Item(20, "person", "/caucasis_boy.png", "", 150, 150),
    new Item(22, "person", "/caucasis_girl.png", "", 150, 150),
    new Item(23, "person", "/ginger_boy.png", "", 150, 150),
    new Item(25, "person", "/mid_east_boy.png", "", 150, 150),
    new Item(26, "person", "/mid_east_girl.png", "", 150, 150),
    new Item(19, "person", "/baby.png", "", 150, 150),
  ];

  // TODO: check all images if they have white shadow around it
  public MOODS: Item[] = [
    new Item(11, "mood", "/bange.png",          "", 150, 150, 0),
    new Item(12, "mood", "/forvirret.png",      "", 200, 150, 0),
    new Item(13, "mood", "/happy.png",          "", 250, 150, 0),
    new Item(14, "mood", "/ked_af_det.png",     "", 300, 150, 0),
    new Item(15, "mood", "/overrasket.png",     "", 350, 150, 0),
    new Item(16, "mood", "/pinligt_berort.png", "", 400, 150, 0),
    new Item(17, "mood", "/sad.png",            "", 450, 150, 0),
    new Item(18, "mood", "/vred.png",           "", 550, 150, 0),
  ];

  public ITEMS: Item[] = [
    new Item(11, "item", "/action_man.png", "", 150, 150),
    new Item(12, "item", "/arm_chair.png", "", 150, 150),
    new Item(13, "item", "/baseball_mit.png", "", 150, 150),
    new Item(14, "item", "/bed.png", "", 150, 150),
    new Item(15, "item", "/bike.png", "", 150, 150),
    new Item(16, "item", "/bird.png", "", 150, 150),
    new Item(17, "item", "/bookcase.png", "", 150, 150),
    new Item(18, "item", "/bte.png", "", 150, 150),
    new Item(19, "item", "/bus.png", "", 150, 150),
    new Item(20, "item", "/car.png", "", 150, 150),
    new Item(21, "item", "/cat.png", "", 150, 150),
    new Item(22, "item", "/chair.png", "", 150, 150),
    new Item(23, "item", "/cochlear_implants.png", "", 150, 150),
    new Item(24, "item", "/consol.png", "", 150, 150),
    new Item(25, "item", "/control.png", "", 150, 150),
    new Item(26, "item", "/dog.png", "", 150, 150),
    new Item(27, "item", "/doll.png", "", 150, 150),
    new Item(28, "item", "/electric_piano.png", "", 150, 150),
    new Item(29, "item", "/flatscreen.png", "", 150, 150),
    new Item(30, "item", "/fodbold.png", "", 150, 150),
    new Item(31, "item", "/horse.png", "", 150, 150),
    new Item(32, "item", "/ite.png", "", 150, 150),
    new Item(33, "item", "/ketched.png", "", 150, 150),
    new Item(34, "item", "/kort.png", "", 150, 150),
    new Item(35, "item", "/laptop.png", "", 150, 150),
    new Item(36, "item", "/large_table.png", "", 150, 150),
    new Item(37, "item", "/lego.png", "", 150, 150),
    new Item(38, "item", "/mask_and_snorke.png", "", 150, 150),
    new Item(39, "item", "/microphone_brown.png", "", 150, 150),
    new Item(40, "item", "/microphone_grey.png", "", 150, 150),
    new Item(41, "item", "/mobile.png", "", 150, 150),
    new Item(42, "item", "/mp3.png", "", 150, 150),
    new Item(43, "item", "/radio_cd.png", "", 150, 150),
    new Item(44, "item", "/science_lab.png", "", 150, 150),
    new Item(45, "item", "/small_table.png", "", 150, 150),
    new Item(46, "item", "/sofa.png", "", 150, 150),
    new Item(47, "item", "/table.png", "", 150, 150),
    new Item(48, "item", "/terningsspil.png", "", 150, 150),
    new Item(49, "item", "/tortois.png", "", 150, 150),
    new Item(50, "item", "/train.png", "", 150, 150),
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
