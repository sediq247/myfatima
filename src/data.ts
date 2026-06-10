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
// REGULAR LOVE MESSAGES (20 total â€” longer & deeper)
// ============================================================
export const loveMessages: LoveMessage[] = [
  { id: 1, text: "Fatima, every morning I wake up with your name on my lips and your face in my thoughts. My heart beats in a rhythm that spells your name, and I cannot imagine a single day without dreaming of you. You are the princess of my world, and I am ready to sacrifice everything I have just to see you smile. My love for you is not just a feeling; it is the very air I breathe, the reason my soul finds peace in this chaotic world." },
  { id: 2, text: "My dearest Fatima, do you know that my heart beats faster every time I think of you? I wish you could feel what I feel â€” this overwhelming warmth that starts in my chest and spreads through my entire being. I dream of a future where I can hold your hand through every storm, where I can build a life filled with your laughter and our shared dreams. You are my once-in-a-lifetime miracle, and I will never stop thanking Allah for your existence." },
  { id: 3, text: "Sometimes I lie awake at night thinking about you, and my heart feels so full that it might burst. Fatima, you have no idea how deeply you have rooted yourself in my soul. I am ready to sacrifice my comfort, my pride, and my fears if it means I can stand beside you. Every dream I have begins and ends with you â€” a home, a family, a lifetime of love that grows deeper with every sunrise." },
  { id: 4, text: "My princess, I would cross oceans and climb mountains if it meant I could see your smile for just a moment. You are the most precious gift Allah has ever given me, and I promise to cherish you with every breath I take. I don't know if you feel the same way, but my heart doesn't need your permission to love you. It beats for you, and only you, now and forever." },
  { id: 5, text: "Fatima, when I think about my future, I see only you. I see us building a life together, supporting each other through every trial, and celebrating every joy. I am ready to give up everything I own, every comfort I know, just to make your dreams come true. You are not just someone I love; you are the reason I believe in forever." },
  { id: 6, text: "My heart is a garden, and every flower blooms in your name. You are the sun that warms my soul, the rain that nourishes my spirit, and the air that keeps me alive. Fatima, I have loved you in silence, I have loved you in chaos, and I will love you in every season of life. No distance is too far, no obstacle too great, for a love as true as mine." },
  { id: 7, text: "I don't know if you feel the same way I do, but that doesn't change the truth in my heart. My love for you is not a choice; it is a destiny written by Allah before I was born. Every beat of my heart is a whisper of your name. Every prayer I make includes a dua for your happiness. You are my princess, my dream, my everything." },
  { id: 8, text: "Fatima, my heart beats so fast when I think of you that I'm afraid it might burst from loving you too much. I dream of the day when I can call you mine officially, when I can look into your eyes and tell you everything I've kept in my heart. Until then, I will love you from whatever distance life places between us, with a devotion that time cannot weaken." },
  { id: 9, text: "You are the first thought of my morning and the last prayer of my night. You are the princess who rules my heart with a gentle touch, and I am your devoted servant in love. I wish for us to achieve every dream together â€” to build a home filled with faith, love, and laughter. I am ready to sacrifice my today for your tomorrow, always." },
  { id: 10, text: "I have built castles in the sky with your name on every tower. I have written poems in the sand that the tide cannot wash away. Fatima, my love for you is not just words; it is the very foundation of my existence. I dream of walking beside you through this life and into the next, hand in hand, heart in heart." },
  { id: 11, text: "My princess, when the world feels heavy and my shoulders tire, I think of you and find strength I never knew I had. You are my courage when I am afraid, my peace when I am troubled, and my hope when I am lost. I am ready to sacrifice every comfort to ensure you never know a day without happiness." },
  { id: 12, text: "Fatima, if love could be measured, mine for you would stretch from the earth to the heavens and back again. I feel your presence in every gentle breeze, I see your beauty in every sunset, and I hear your voice in every quiet moment. My heart beats a rhythm that calls your name, and I pray that one day you will hear it too." },
  { id: 13, text: "I dream of a life where every morning begins with your smile and every night ends with your hand in mine. I wish for us to grow together in faith and love, to support each other through every test, and to build a legacy of love that our children will inherit. You are my partner in every dream, my princess in every story." },
  { id: 14, text: "My dearest Fatima, I want you to know that my love for you is not bound by time or circumstance. It is eternal, unshakable, and entirely yours. I have loved you without knowing if you feel the same, and I will continue to love you regardless, because my heart has chosen you and it never consults me." },
  { id: 15, text: "You are the miracle I never expected and the blessing I don't deserve. Every time I think of you, my heart overflows with gratitude to Allah. I am ready to sacrifice my pride, my fears, and my doubts to be the man you deserve. My princess, my love for you is the truest thing I have ever known." },
  { id: 16, text: "Fatima, my heart beats for you in a language that needs no translation. It beats in hope, in longing, in devotion, and in dreams of our future together. I wish I could wrap the world in silk and lay it at your feet, but all I have is my heart â€” and it is entirely yours, forever and always." },
  { id: 17, text: "I think about the life we could build together, and my soul finds a peace that nothing else can bring. A home where love is the foundation, where every meal is shared with gratitude, where every difficulty is faced together. You are my dream come true, Fatima, and I am ready to sacrifice everything to make that dream real." },
  { id: 18, text: "My princess, there is no version of my future that does not include you. I have loved you from the first moment, and I will love you until my last breath. My heart is, was, and always will be yours. I don't need the world to know; I only need Allah to witness the truth of my love for you." },
  { id: 19, text: "Fatima, every time I close my eyes, I see your face. Every time I open my heart, I find you there. You have become the center of my universe, the gravity that holds me together. I am ready to sacrifice my solitude, my comfort, and my fears to be with you. You are my forever, my always, my everything." },
  { id: 20, text: "My beloved Fatima, if I could give you one thing in this life, it would be the ability to see yourself through my eyes. Only then would you understand how special you are to me. My heart beats for you with a passion that defies words, a sacrifice that knows no limits, and a dream that will never die. You are my princess, my love, my life." },
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
// REGULAR LOVE LETTERS (20 total â€” normal text, emotional, signed *Abubakar*)
// ============================================================
export const loveLetters: LoveLetter[] = [
  {
    id: 1,
    title: "",
    content: `My Fatima,

I am writing this with a heart that is both full and aching. Full because it carries an ocean of love for you, and aching because words will never be enough to describe how deeply you have touched my soul. From the moment you entered my world, everything changed. The colors became brighter, the silence became warmer, and my dreams found a destination â€” you.

I think about you when the sun rises and when the moon takes its place. I think about the life we could build together, the memories we could create, and the love we could grow. I am ready to sacrifice my comfort, my pride, and my fears if it means I can stand beside you. You are not just someone I love; you are the reason I believe in forever.

I don't know if you feel the same way I do, but that does not change the truth in my heart. My heart beats for you, and only you. It will always be yours.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 2,
    title: "",
    content: `My Fatima,

This morning I woke up thinking of your smile, and it was the first light that entered my world. I want you to know that you are cherished beyond measure â€” not for what you do, but simply for who you are. Your kindness, your strength, your grace â€” they leave me in awe every single day.

I dream of mornings where I wake up beside you, where your smile is the first thing I see and your voice is the first sound I hear. I am ready to sacrifice every comfort I know to make that dream our reality. You are my peace, my joy, and my purpose.

My heart has chosen you, and it will never choose another. You are my forever.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 3,
    title: "",
    content: `My Fatima,

Tonight the sky is vast and full of stars, yet none shine brighter than the light you bring into my life. When I think of you, I feel a warmth that no distance can diminish. You are my constant in a changing world, my anchor in every storm.

I dream of a future where we watch these same stars together, wrapped in the comfort of knowing we belong to each other. I am ready to sacrifice my today for your tomorrow, my dreams for your happiness. You are not just my love â€” you are my revelation, my peace, my home.

Sleep peacefully tonight, knowing you are deeply and truly loved.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 4,
    title: "",
    content: `My Fatima,

Thank you for being the safe harbor my soul returns to. Thank you for your patience, your laughter, and your gentle way of making everything better. I do not take your presence in my life for granted â€” I treasure it, protect it, and promise to honor it for as long as I live.

I dream of building a life that reflects the beauty of your heart. A home filled with love, faith, and the laughter of our future family. I am ready to sacrifice everything I have to give you the life you deserve. You are my greatest gift, my deepest gratitude.

I love you more than words can ever express.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 5,
    title: "",
    content: `My Fatima,

Sometimes I search for the perfect words to describe my love for you, and I realize they do not exist in any language I know. My love for you is deeper than oceans, wider than skies, and more certain than sunrise. It simply is â€” eternal, unshakable, and entirely yours.

I wish you could see what I see when I look at you. I see the mother of my children, the partner of my dreams, and the queen of my heart. I am ready to sacrifice my solitude, my fears, and my past to build a future with you. You are my everything.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 6,
    title: "",
    content: `My Fatima,

I promise to stand by you in silence when you need peace, and in noise when you need defense. I promise to choose you every single day, not because I have to, but because there is no one else I would rather choose. You are my person, my promise, and my purpose.

My heart beats for you with a devotion that will never fade. I dream of days when these promises become our daily reality, when I can show you my love not just in words but in actions. I am ready to sacrifice my comfort to ensure you never feel alone.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 7,
    title: "",
    content: `My Fatima,

It is not the grand gestures that make me love you most â€” it is the little things. The way you say my name. The way you worry about others before yourself. The way you make a room feel like home just by walking in. These small miracles are why my heart is forever yours.

I dream of a lifetime of collecting these little moments with you. A thousand ordinary days made extraordinary by your presence. I am ready to sacrifice my pride and my fears to be the man who deserves your love. You are my heart's favorite address.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 8,
    title: "",
    content: `My Fatima,

If my soul could speak without my body, it would whisper only your name. You have touched a part of me I did not know existed. You are not just my love â€” you are my revelation. I am better because of you. I am whole because of you. I am yours, completely.

I dream of a life where our souls grow together in faith and love. I am ready to sacrifice every doubt, every fear, and every obstacle to make that life real. You are my eternal truth, my divine blessing.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 9,
    title: "",
    content: `My Fatima,

Even on days when the sky is gray and the world feels heavy, you are my sunshine. Your love does not depend on perfect conditions â€” it is steady, warm, and unconditional. I hope this letter finds you wrapped in the same comfort you always give me. You are loved, today and always.

I dream of being your sunshine too, of being the reason you smile when everything else feels dark. I am ready to sacrifice my own happiness to ensure yours never fades. You are my strength, my light, my love.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 10,
    title: "",
    content: `My Fatima,

They say nothing lasts forever, but they have not seen us. My love for you defies time, distance, and every obstacle the world could place between us. You are my forever. You are my always. And if forever is not enough, then I will love you beyond it.

I dream of a love that becomes a legacy, that inspires our children and warms our grandchildren. I am ready to sacrifice my today, my tomorrow, and my eternity for you. You are my heart's final destination, my soul's eternal home.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 11,
    title: "",
    content: `My Fatima,

I never believed in love at first sight until I met you. But now I know that my soul recognized you before my eyes did. There is a connection between us that I cannot explain, a bond that feels like it was written in the stars long before we were born.

I dream of discovering the depths of that connection with you, of learning every language your heart speaks. I am ready to sacrifice my loneliness, my past hurts, and my fears to be fully present with you. You are my destiny, my truth, my love.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 12,
    title: "",
    content: `My Fatima,

You are the poetry I never knew how to write until I met you. You are the song my heart learned to sing. Every moment with you, even in my imagination, feels like a verse from the most beautiful poem ever written.

I dream of a life that reads like a love story â€” one written by Allah's own hand. I am ready to sacrifice every chapter of my past to begin a new book with you. You are my inspiration, my muse, my eternal verse.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 13,
    title: "",
    content: `My Fatima,

Home is not a place. Home is wherever you are. When I think of home, I don't think of walls or roofs â€” I think of your arms, your smile, your presence. You are the shelter my heart has been searching for all my life.

I dream of building a home with you, not just of bricks but of trust, love, and faith. I am ready to sacrifice every false sense of security to find my true home in your heart. You are my refuge, my peace, my home.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 14,
    title: "",
    content: `My Fatima,

I would choose you in a hundred lifetimes, in a hundred worlds, in any version of reality. My love for you is not accidental; it is essential. Like air, like water, like prayer â€” I need you to survive.

I dream of a hundred lifetimes with you, each one better than the last. I am ready to sacrifice every other possibility to make this one reality with you. You are my essential truth, my necessary love.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 15,
    title: "",
    content: `My Fatima,

Your presence is the only gift I ever need. Not the things you give me, not the words you say, but simply the fact that you exist in my world. Your existence is a miracle I thank Allah for every single day.

I dream of a life where I get to celebrate your existence every morning and every night. I am ready to sacrifice every material desire to keep you in my life. You are my greatest gift, my most precious blessing.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 16,
    title: "",
    content: `My Fatima,

You are my today and all of my tomorrows. When I look ahead, I see your face in every scene. When I look back, I see how every step led me to you. You are the thread that connects every moment of my life into a beautiful tapestry.

I dream of weaving more threads with you, of creating a masterpiece of memories that will last until the end of time. I am ready to sacrifice my individual threads to be part of our shared tapestry. You are my today, my tomorrow, my always.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 17,
    title: "",
    content: `My Fatima,

Loving you is the most natural thing I have ever done. It doesn't require effort or thought; it simply flows from my heart like a river flows to the ocean. You are my ocean, my destination, my home.

I dream of a love that flows endlessly, that nourishes everything it touches. I am ready to sacrifice my own course to flow beside you forever. You are my natural state, my truest self, my deepest love.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 18,
    title: "",
    content: `My Fatima,

You make ordinary moments feel like miracles. A simple text from you makes my entire day. A passing thought of you brings peace to my chaos. You have transformed my ordinary world into something luminous and sacred.

I dream of a lifetime of these miracles, of finding the extraordinary in every ordinary day with you. I am ready to sacrifice my mundane existence to live a miraculous life with you. You are my miracle, my magic, my light.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 19,
    title: "",
    content: `My Fatima,

My heart is, and always will be, yours. I don't lend it to you; I have given it completely. There is no return policy, no expiration date, no conditions. It is yours to keep, to hold, to treasure, or to break â€” though I pray you choose to treasure it.

I dream of a heart that beats in sync with yours, of two hearts that have become one. I am ready to sacrifice my own rhythm to find our harmony. You are my heart's keeper, my love's guardian.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 20,
    title: "",
    content: `My Fatima,

You are the dream I never want to wake up from. In a world of temporary things, my love for you is permanent. In a life of changing seasons, you are my eternal spring. I never want to wake up from this dream of loving you.

I dream of making this dream our reality, of opening my eyes every morning to see you beside me. I am ready to sacrifice every other dream to make this one come true. You are my dream, my reality, my forever.

*Abubakar*`,
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
    title: "",
    content: `My dearest Fatima,

Today is the most beautiful day of the year â€” the day you were born. On this day, the universe decided to create perfection and named it Fatima. Every year that passes, you become more radiant, more graceful, and more deeply loved.

I celebrate not just your birth, but every moment you have graced this world with your presence. You are my greatest blessing, my deepest joy, and my eternal love. May this birthday bring you all the happiness your heart can hold.

Happy Birthday, my everything.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 202,
    title: "",
    content: `My beloved Fatima,

On your birthday, I make you this promise: I will love you more tomorrow than I did yesterday. I will stand by you in every season, celebrate you in every victory, and hold you through every storm.

You deserve a lifetime of birthdays filled with laughter, surrounded by love, and wrapped in the warmth of knowing how truly special you are. I am honored to be the one who gets to remind you of that every single day.

Happy Birthday, my heart.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 203,
    title: "",
    content: `My love,

Years ago today, an angel descended to earth and grew into the most incredible woman I have ever known. That angel is you, Fatima.

Your kindness heals, your smile illuminates, and your love transforms everything it touches. I am the luckiest person alive because I get to call you mine. On this sacred day, I thank Allah for creating you and for guiding you into my life.

May your birthday be as extraordinary as you are.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 204,
    title: "",
    content: `My darling Fatima,

If I could gather every star in the sky, I would string them together to spell 'Happy Birthday Fatima.' If I could capture every sunrise, I would paint them in the colors of your beauty.

But all I truly have is my heart â€” and it beats only for you. On your birthday, I give you every beat, every breath, every thought. You are my world, my worship, my wonder.

Happy Birthday, my eternal love.

*Abubakar*`,
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
// SONGS (20 songs)
// ============================================================
export const songs: Song[] = [
  { id: 1, title: "Kece", artist: "Abdul D One", filename: "song1.mp3", duration: 245 },
  { id: 2, title: "Karbeni Zana kece raini", artist: "Abdul D One", filename: "song2.mp3", duration: 218 },
  { id: 3, title: "Abadan", artist: "Abdul Hasan", filename: "song3.mp3", duration: 312 },
  { id: 4, title: "Kina Nesa Da Zuciya", artist: "Umar M Shareef", filename: "song4.mp3", duration: 276 },
  { id: 5, title: "Karki Manta Dani", artist: "Umar M Shareef", filename: "song5.mp3", duration: 298 },
  { id: 6, title: "Takamani", artist: "Umar M Shareef", filename: "song6.mp3", duration: 234 },
  { id: 7, title: "Cikin Daya", artist: "Umar M Shareef", filename: "song7.mp3", duration: 267 },
  { id: 8, title: "Soyayya Ce", artist: "Umar M Shareef", filename: "song8.mp3", duration: 289 },
  { id: 9, title: "Zeenaru", artist: "Umar M Shareef", filename: "song9.mp3", duration: 301 },
  { id: 10, title: "Inna rasaki Baza naji Dadi Ba", artist: "Umar M Shareef", filename: "song10.mp3", duration: 255 },
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
// PHOTO MEMORIES (20 photos)
// ============================================================
export const photoMemories: PhotoMemory[] = [
  { id: 1, source: require("../assets/images/photo1.jpg"), caption: "Love you till infinity", dateLabel: "Day 1" },
  { id: 2, source: require("../assets/images/photo2.jpg"), caption: "Your smile, my favorite view", dateLabel: "Day 45" },
  { id: 3, source: require("../assets/images/photo3.jpg"), caption: "My heart is always with you", dateLabel: "Day 120" },
  { id: 4, source: require("../assets/images/photo4.jpg"), caption: "Home is wherever you are", dateLabel: "Day 200" },
  { id: 5, source: require("../assets/images/photo5.jpg"), caption: "When will my heart stop thinking about you?", dateLabel: "Day 365" },
  { id: 6, source: require("../assets/images/photo6.jpg"), caption: "My heart, captured in a frame", dateLabel: "Day 500" },
  { id: 7, source: require("../assets/images/photo7.jpg"), caption: "Fatima, how I wish you're mine", dateLabel: "Day 60" },
  { id: 8, source: require("../assets/images/photo8.jpg"), caption: "My favorite forever", dateLabel: "Day 90" },
  { id: 9, source: require("../assets/images/photo9.jpg"), caption: "My one and only", dateLabel: "Day 150" },
  { id: 10, source: require("../assets/images/photo10.jpg"), caption: "Every road leads back to you", dateLabel: "Day 250" },
  { id: 11, source: require("../assets/images/photo11.jpg"), caption: "The moment time stood still", dateLabel: "Day 300" },
  { id: 12, source: require("../assets/images/photo12.jpg"), caption: "Two hearts, one rhythm", dateLabel: "Day 400" },
  { id: 13, source: require("../assets/images/photo13.jpg"), caption: "My favorite hello and hardest goodbye", dateLabel: "Day 450" },
  { id: 14, source: require("../assets/images/photo14.jpg"), caption: "Written in the stars", dateLabel: "Day 550" },
  { id: 15, source: require("../assets/images/photo15.jpg"), caption: "The best part of every day", dateLabel: "Day 600" },
  { id: 16, source: require("../assets/images/photo16.jpg"), caption: "Always love seeing your smile", dateLabel: "Day 700" },
  { id: 17, source: require("../assets/images/photo17.jpg"), caption: "My forever person", dateLabel: "Day 800" },
  { id: 18, source: require("../assets/images/photo18.jpg"), caption: "I always wish you all the best in your whole life, Fatima", dateLabel: "Day 900" },
  { id: 19, source: require("../assets/images/photo19.jpg"), caption: "Can't stop loving you, Fatima", dateLabel: "Day 1000" },
  { id: 20, source: require("../assets/images/photo20.jpg"), caption: "To infinity and beyond, my heart will always be with you", dateLabel: "Day 1100" },
];
