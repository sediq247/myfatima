export interface LoveMessage {
  id: number;
  text: string;
}

export interface LoveLetter {
  id: number;
  title: string;
  content: string;
  sealText: string;
  isSpecial: boolean;
}

export interface Prayer {
  id: number;
  text: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  filename: string;
  duration: number;
}

export interface PhotoMemory {
  id: number;
  source: any;
  caption: string;
  dateLabel: string;
}

// ============================================================
// BIRTHDAY CONFIGURATION
// ============================================================
export const BIRTHDAY_MONTH = 5; // June (0-indexed: 0=Jan, 5=Jun)
export const BIRTHDAY_DAY = 3;

export function isBirthday(date: Date = new Date()): boolean {
  return date.getMonth() === BIRTHDAY_MONTH && date.getDate() === BIRTHDAY_DAY;
}

// ============================================================
// REGULAR LOVE MESSAGES (31 total for daily rotation)
// ============================================================
export const loveMessages: LoveMessage[] = [
  { id: 1, text: "Every sunrise reminds me that I get to love you for another day." },
  { id: 2, text: "You are the quiet thought that settles my soul every morning." },
  { id: 3, text: "In a world of temporary things, my love for you is permanent." },
  { id: 4, text: "Your name is my favorite word, your laugh is my favorite sound." },
  { id: 5, text: "I did not choose you. My heart did, and it never consults me." },
  { id: 6, text: "You are the poetry I never knew how to write until I met you." },
  { id: 7, text: "Loving you is the most natural thing I have ever done." },
  { id: 8, text: "You make ordinary moments feel like miracles." },
  { id: 9, text: "My heart is, and always will be, yours." },
  { id: 10, text: "You are the reason I believe in magic." },
  { id: 11, text: "I fall in love with you a little more every single day." },
  { id: 12, text: "Your presence is the only gift I ever need." },
  { id: 13, text: "You are my today and all of my tomorrows." },
  { id: 14, text: "Home is not a place. Home is wherever you are." },
  { id: 15, text: "I love you not because of who you are, but because of who I am when I am with you." },
  { id: 16, text: "You are the dream I never want to wake up from." },
  { id: 17, text: "Every moment without you feels like a lifetime." },
  { id: 18, text: "You are my favorite notification, my favorite call, my favorite everything." },
  { id: 19, text: "If love is a language, you are my native tongue." },
  { id: 20, text: "I would choose you in a hundred lifetimes, in a hundred worlds." },
  { id: 21, text: "You are the soft place my heart lands every time." },
  { id: 22, text: "My soul recognized you before my eyes did." },
  { id: 23, text: "You are the most beautiful chapter of my life." },
  { id: 24, text: "I never knew what peace felt like until I held your hand." },
  { id: 25, text: "You are my heart's favorite address." },
  { id: 26, text: "Loving you is like breathing â€” I do it without thinking, and I could not stop if I tried." },
  { id: 27, text: "You are my once-in-a-lifetime kind of love." },
  { id: 28, text: "I keep you in my heart, and there you will always stay." },
  { id: 29, text: "You are the answer to every prayer I never knew I was praying." },
  { id: 30, text: "Forever is not long enough with you." },
  { id: 31, text: "You are my heart's final destination." },
];

// ============================================================
// BIRTHDAY LOVE MESSAGES (shown ONLY on June 3rd)
// ============================================================
export const birthdayMessages: LoveMessage[] = [
  { id: 101, text: "Happy Birthday my beautiful Fatima! Today the world celebrates the day it gained its most precious soul." },
  { id: 102, text: "On this day, years ago, an angel was born. That angel became my entire world. Happy Birthday, my love." },
  { id: 103, text: "Every candle on your cake is a year the universe blessed us with your light. Happy Birthday, my Fatima." },
  { id: 104, text: "Happy Birthday to the woman who makes my heart skip beats and my soul find peace. I love you endlessly." },
  { id: 105, text: "Today is not just your birthday â€” it is the anniversary of the best gift Allah ever gave this world." },
  { id: 106, text: "Happy Birthday my queen. May this year bring you every joy you deserve and every dream you hold dear." },
  { id: 107, text: "On your special day, I want you to know: you are loved beyond measure, cherished beyond words, and celebrated beyond today." },
  { id: 108, text: "Happy Birthday Fatima! My love for you grows deeper with every sunrise, but today it shines the brightest." },
  { id: 109, text: "The day you were born was the day the world became more beautiful. Happy Birthday, my heart's home." },
  { id: 110, text: "Happy Birthday to the one who colors my world, fills my silence, and completes my soul. I am forever yours." },
];

// ============================================================
// REGULAR LOVE LETTERS (10 total)
// ============================================================
export const loveLetters: LoveLetter[] = [
  {
    id: 1,
    title: "The First Letter",
    content: `My dearest Fatima,

I write this not because I have something new to say, but because my heart overflows with the same truth every day: I love you. You have transformed my ordinary world into something luminous. Every glance from you feels like a blessing, every word a melody. I am endlessly grateful that our paths crossed. You are my peace, my joy, and my forever.

Yours always,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 2,
    title: "A Quiet Morning",
    content: `Fatima,

This morning I woke up thinking of your smile. It is the first light that enters my world each day. I want you to know that you are cherished beyond measure â€” not for what you do, but simply for who you are. Your kindness, your strength, your grace â€” they leave me in awe. I am so lucky to love you.

With all my heart,`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 3,
    title: "Under the Stars",
    content: `My love,

Tonight the sky is vast and full of stars, yet none shine brighter than the light you bring into my life. When I think of you, I feel a warmth that no distance can diminish. You are my constant in a changing world. Sleep peacefully tonight, knowing you are deeply and truly loved.

Forever yours,`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 4,
    title: "The Letter of Gratitude",
    content: `Beloved Fatima,

Thank you for being the safe harbor my soul returns to. Thank you for your patience, your laughter, your gentle way of making everything better. I do not take your love for granted â€” I treasure it, protect it, and promise to honor it for as long as I live. You are my greatest gift.

Gratefully,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 5,
    title: "When Words Fail",
    content: `Fatima,

Sometimes I search for the perfect words to describe my love for you, and I realize they do not exist in any language I know. My love for you is deeper than words, wider than oceans, and more certain than sunrise. It simply is â€” eternal, unshakable, and entirely yours.

Always,`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 6,
    title: "A Promise",
    content: `My darling,

I promise to stand by you in silence when you need peace, and in noise when you need defense. I promise to choose you every single day, not because I have to, but because there is no one else I would rather choose. You are my person, my promise, and my purpose.

Devotedly,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 7,
    title: "The Little Things",
    content: `Dearest,

It is not the grand gestures that make me love you most â€” it is the little things. The way you say my name. The way you worry about others before yourself. The way you make a room feel like home just by walking in. These small miracles are why my heart is forever yours.

Tenderly,`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 8,
    title: "From My Soul",
    content: `Fatima,

If my soul could speak without my body, it would whisper only your name. You have touched a part of me I did not know existed. You are not just my love â€” you are my revelation. I am better because of you. I am whole because of you. I am yours, completely.

Eternally,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 9,
    title: "Rainy Day Letter",
    content: `My love,

Even on days when the sky is gray and the world feels heavy, you are my sunshine. Your love does not depend on perfect conditions â€” it is steady, warm, and unconditional. I hope this letter finds you wrapped in the same comfort you always give me. You are loved, today and always.

Warmly,`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 10,
    title: "The Forever Letter",
    content: `My beloved Fatima,

They say nothing lasts forever, but they have not seen us. My love for you defies time, distance, and every obstacle the world could place between us. You are my forever. You are my always. And if forever is not enough, then I will love you beyond it.

Beyond forever,`,
    sealText: "F",
    isSpecial: true,
  },
];

// ============================================================
// BIRTHDAY LETTERS (shown ONLY on June 3rd)
// ============================================================
export const birthdayLetters: LoveLetter[] = [
  {
    id: 201,
    title: "Happy Birthday My Love",
    content: `My dearest Fatima,

Today is the most beautiful day of the year â€” the day you were born. On this day, the universe decided to create perfection and named it Fatima. Every year that passes, you become more radiant, more graceful, and more deeply loved.

I celebrate not just your birth, but every moment you have graced this world with your presence. You are my greatest blessing, my deepest joy, and my eternal love. May this birthday bring you all the happiness your heart can hold.

Happy Birthday, my everything.

Forever yours,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 202,
    title: "A Birthday Promise",
    content: `My beloved Fatima,

On your birthday, I make you this promise: I will love you more tomorrow than I did yesterday. I will stand by you in every season, celebrate you in every victory, and hold you through every storm.

You deserve a lifetime of birthdays filled with laughter, surrounded by love, and wrapped in the warmth of knowing how truly special you are. I am honored to be the one who gets to remind you of that every single day.

Happy Birthday, my heart.

Devotedly,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 203,
    title: "The Day An Angel Was Born",
    content: `My love,

Years ago today, an angel descended to earth and grew into the most incredible woman I have ever known. That angel is you, Fatima.

Your kindness heals, your smile illuminates, and your love transforms everything it touches. I am the luckiest person alive because I get to call you mine. On this sacred day, I thank Allah for creating you and for guiding you into my life.

May your birthday be as extraordinary as you are.

With all my love,`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 204,
    title: "Birthday Wishes From My Soul",
    content: `My darling Fatima,

If I could gather every star in the sky, I would string them together to spell 'Happy Birthday Fatima.' If I could capture every sunrise, I would paint them in the colors of your beauty.

But all I truly have is my heart â€” and it beats only for you. On your birthday, I give you every beat, every breath, every thought. You are my world, my worship, my wonder.

Happy Birthday, my eternal love.

Yours beyond forever,`,
    sealText: "F",
    isSpecial: true,
  },
];

// ============================================================
// REGULAR PRAYERS (15 morning + 15 night)
// ============================================================
export const morningPrayers: Prayer[] = [
  { id: 1, text: "May your day be filled with barakah and your heart with peace, my love." },
  { id: 2, text: "Ya Allah, protect Fatima today and always. Bless her steps and lighten her burdens." },
  { id: 3, text: "As the sun rises, I pray that joy rises in your heart just as surely." },
  { id: 4, text: "May every hour of this day bring you closer to your dreams and to happiness." },
  { id: 5, text: "I pray that you feel loved today â€” not just by me, but by the entire universe." },
  { id: 6, text: "Ya Allah, grant Fatima strength for her challenges and sweetness for her rewards." },
  { id: 7, text: "May your morning be as beautiful as your soul, and your day as bright as your smile." },
  { id: 8, text: "I start my day with gratitude â€” because you exist, and because you are mine." },
  { id: 9, text: "May angels walk beside you today and keep every harm far from you." },
  { id: 10, text: "My first thought this morning was you. My first prayer was for you. Always." },
  { id: 11, text: "May today bring you reasons to laugh, moments to cherish, and love to hold." },
  { id: 12, text: "Ya Allah, let Fatima's heart be light, her path be clear, and her rizq be abundant." },
  { id: 13, text: "I pray that every door you knock on today opens with ease and blessing." },
  { id: 14, text: "May your coffee be warm, your tasks be easy, and your heart be full today." },
  { id: 15, text: "You are my favorite dua come true. I thank Allah for you every single morning." },
];

export const nightPrayers: Prayer[] = [
  { id: 1, text: "May your sleep be peaceful and your dreams be sweet, my love." },
  { id: 2, text: "Ya Allah, watch over Fatima through the night. Let no worry touch her rest." },
  { id: 3, text: "As the stars appear, know that my love for you shines just as steadily." },
  { id: 4, text: "May your night be a healing for every tiredness your day brought you." },
  { id: 5, text: "I pray that you close your eyes tonight feeling safe, loved, and at peace." },
  { id: 6, text: "Ya Allah, forgive our shortcomings and bless our tomorrow. Protect my Fatima." },
  { id: 7, text: "May the angels whisper peace into your dreams tonight, my beloved." },
  { id: 8, text: "No matter how hard today was, tomorrow is a new mercy from Allah. Rest well." },
  { id: 9, text: "I send my love like a blanket â€” wrap yourself in it and sleep deeply." },
  { id: 10, text: "May your night be free from fear and full of divine protection." },
  { id: 11, text: "Ya Allah, let Fatima wake up healthier, happier, and closer to You." },
  { id: 12, text: "The moon is beautiful tonight, but not as beautiful as the light you bring to my life." },
  { id: 13, text: "I pray that every worry leaves your heart before sleep finds you." },
  { id: 14, text: "May your pillow be soft, your blanket be warm, and your heart be lighter." },
  { id: 15, text: "You are the last thought on my mind tonight, and the first when I wake. Always." },
];

// ============================================================
// BIRTHDAY PRAYERS (shown ONLY on June 3rd)
// ============================================================
export const birthdayPrayers: Prayer[] = [
  { id: 301, text: "Ya Allah, on this blessed day of Fatima's birth, shower her with Your infinite mercy and grant her every wish of her heart." },
  { id: 302, text: "Happy Birthday my love. May Allah bless this new year of your life with health, happiness, and endless barakah." },
  { id: 303, text: "On your birthday, I pray that Allah fills your life with joy as vast as the ocean and as bright as the sun." },
  { id: 304, text: "Ya Rabb, protect my Fatima, guide her steps, and bless her with a year more beautiful than the last." },
  { id: 305, text: "Happy Birthday to the light of my life. May this year bring you closer to your dreams and deeper into my heart." },
  { id: 306, text: "I pray that every candle you blow out today becomes a dua that Allah answers with His boundless generosity." },
  { id: 307, text: "On this sacred day, I thank Allah for the gift of you. May He preserve you, protect you, and prosper you always." },
  { id: 308, text: "Happy Birthday my queen. May your year ahead be written with moments of joy, peace, and divine favor." },
  { id: 309, text: "Ya Allah, let Fatima's birthday be the beginning of her best year. Bless her with love, laughter, and light." },
  { id: 310, text: "My birthday prayer for you: may you never know a day without smiles, a night without peace, or a moment without my love." },
];

// ============================================================
// SONGS (20 songs - add manually to assets/music/)
// ============================================================
export const songs: Song[] = [
  { id: 1, title: "Inada Mata", artist: "Abdul D One", filename: "song1.mp3", duration: 245 },
  { id: 2, title: "Karbeni Zana kece raini", artist: "Abdul D One", filename: "song2.mp3", duration: 218 },
  { id: 3, title: "Abadan", artist: "Abdul Hasan", filename: "song3.mp3", duration: 312 },
  { id: 4, title: "Kina Nesa Da Zuciya", artist: "Umar M Shareef", filename: "song4.mp3", duration: 276 },
  { id: 5, title: "Karki Manta Dani", artist: "Umar M Shareef", filename: "song5.mp3", duration: 298 },
  { id: 6, title: "Takamani", artist: "Umar M Shareef", filename: "song6.mp3", duration: 234 },
  { id: 7, title: "Cikin Daya", artist: "Umar M Shareef", filename: "song7.mp3", duration: 267 },
  { id: 8, title: "Soyayya Ce", artist: "Umar M Shareef", filename: "song8.mp3", duration: 289 },
  { id: 9, title: "Zeenaru", artist: "Umar M Shareef", filename: "song9.mp3", duration: 301 },
  { id: 10, title: "Inna Rasaki Baza naji Dadi Ba", artist: "Umar M Shareef", filename: "song10.mp3", duration: 255 },
  { id: 11, title: "Majnoon", artist: "Umar M Shareef", filename: "song11.mp3", duration: 278 },
  { id: 12, title: "Babu Nadama", artist: "Umar M Shareef", filename: "song12.mp3", duration: 292 },
  { id: 13, title: "Ni Nakine Fatima", artist: "Umar M Shareef", filename: "song13.mp3", duration: 264 },
  { id: 14, title: "Naji Nagani", artist: "Umar M Shareef", filename: "song14.mp3", duration: 283 },
  { id: 15, title: "Tabbas", artist: "Umar M Shareef", filename: "song15.mp3", duration: 271 },
  { id: 16, title: "Na Dace Da samunki Fatima", artist: "Umar M Shareef", filename: "song16.mp3", duration: 290 },
  { id: 17, title: "Rayuwata Kece", artist: "Umar M Shareef", filename: "song17.mp3", duration: 275 },
  { id: 18, title: "Rike Alkawari", artist: "Abdul D One", filename: "song18.mp3", duration: 268 },
  { id: 19, title: "Shalele Na", artist: "Nura M Inuwa", filename: "song19.mp3", duration: 302 },
  { id: 20, title: "Ina yawan Kunci", artist: "Abubakar Zakariyau", filename: "song20.mp3", duration: 285 },
];

// ============================================================
// PHOTO MEMORIES (20 photos - add manually to assets/images/)
// ============================================================
export const photoMemories: PhotoMemory[] = [
  { id: 1, source: require("../../assets/images/photo1.jpg"), caption: "Love you till infinity", dateLabel: "Day 1" },
  { id: 2, source: require("../../assets/images/photo2.jpg"), caption: "Your smile, my favorite view", dateLabel: "Day 45" },
  { id: 3, source: require("../../assets/images/photo3.jpg"), caption: "My heart is always with you", dateLabel: "Day 120" },
  { id: 4, source: require("../../assets/images/photo4.jpg"), caption: "Home is wherever you are", dateLabel: "Day 200" },
  { id: 5, source: require("../../assets/images/photo5.jpg"), caption: "When will my heart stop thinking about you?", dateLabel: "Day 365" },
  { id: 6, source: require("../../assets/images/photo6.jpg"), caption: "My heart, captured in a frame", dateLabel: "Day 500" },
  { id: 7, source: require("../../assets/images/photo7.jpg"), caption: "Fatima, how I wish you're mine", dateLabel: "Day 60" },
  { id: 8, source: require("../../assets/images/photo8.jpg"), caption: "My favorite forever", dateLabel: "Day 90" },
  { id: 9, source: require("../../assets/images/photo9.jpg"), caption: "My one and only", dateLabel: "Day 150" },
  { id: 10, source: require("../../assets/images/photo10.jpg"), caption: "Every road leads back to you", dateLabel: "Day 250" },
  { id: 11, source: require("../../assets/images/photo11.jpg"), caption: "The moment time stood still", dateLabel: "Day 300" },
  { id: 12, source: require("../../assets/images/photo12.jpg"), caption: "Two hearts, one rhythm", dateLabel: "Day 400" },
  { id: 13, source: require("../../assets/images/photo13.jpg"), caption: "My favorite hello and hardest goodbye", dateLabel: "Day 450" },
  { id: 14, source: require("../../assets/images/photo14.jpg"), caption: "Written in the stars", dateLabel: "Day 550" },
  { id: 15, source: require("../../assets/images/photo15.jpg"), caption: "The best part of every day", dateLabel: "Day 600" },
  { id: 16, source: require("../../assets/images/photo16.jpg"), caption: "Always love seeing your smile", dateLabel: "Day 700" },
  { id: 17, source: require("../../assets/images/photo17.jpg"), caption: "My forever person", dateLabel: "Day 800" },
  { id: 18, source: require("../../assets/images/photo18.jpg"), caption: "I always wish you all the best in your whole life, Fatima", dateLabel: "Day 900" },
  { id: 19, source: require("../../assets/images/photo19.jpg"), caption: "Can't stop loving you, Fatima", dateLabel: "Day 1000" },
  { id: 20, source: require("../../assets/images/photo20.jpg"), caption: "To infinity and beyond, my heart will always be with you", dateLabel: "Day 1100" },
];
