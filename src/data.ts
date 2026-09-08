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
// REGULAR LOVE MESSAGES (30 total)
// ============================================================
export const loveMessages: LoveMessage[] = [
  { id: 1, text: "Fatima, every morning I wake up with your name on my lips and your face in my thoughts. My heart beats in a rhythm that spells your name, and I cannot imagine a single day without dreaming of you. You are the princess of my world, and I am ready to sacrifice everything I have just to see you smile. My love for you is not just a feeling; it is the very air I breathe, the reason my soul finds peace in this chaotic world." },
  { id: 2, text: "My dearest Fatima, do you know that my heart beats faster every time I think of you? I wish you could feel what I feel — this overwhelming warmth that starts in my chest and spreads through my entire being. I dream of a future where I can hold your hand through every storm, where I can build a life filled with your laughter and our shared dreams. You are my once-in-a-lifetime miracle, and I will never stop thanking Allah for your existence." },
  { id: 3, text: "Sometimes I lie awake at night thinking about you, and my heart feels so full that it might burst. Fatima, you have no idea how deeply you have rooted yourself in my soul. I am ready to sacrifice my comfort, my pride, and my fears if it means I can stand beside you. Every dream I have begins and ends with you — a home, a family, a lifetime of love that grows deeper with every sunrise." },
  { id: 4, text: "My princess, I would cross oceans and climb mountains if it meant I could see your smile for just a moment. You are the most precious gift Allah has ever given me, and I promise to cherish you with every breath I take. I don't know if you feel the same way, but my heart doesn't need your permission to love you. It beats for you, and only you, now and forever." },
  { id: 5, text: "Fatima, when I think about my future, I see only you. I see us building a life together, supporting each other through every trial, and celebrating every joy. I am ready to give up everything I own, every comfort I know, just to make your dreams come true. You are not just someone I love; you are the reason I believe in forever." },
  { id: 6, text: "My heart is a garden, and every flower blooms in your name. You are the sun that warms my soul, the rain that nourishes my spirit, and the air that keeps me alive. Fatima, I have loved you in silence, I have loved you in chaos, and I will love you in every season of life. No distance is too far, no obstacle too great, for a love as true as mine." },
  { id: 7, text: "I don't know if you feel the same way I do, but that doesn't change the truth in my heart. My love for you is not a choice; it is a destiny written by Allah before I was born. Every beat of my heart is a whisper of your name. Every prayer I make includes a dua for your happiness. You are my princess, my dream, my everything." },
  { id: 8, text: "Fatima, my heart beats so fast when I think of you that I'm afraid it might burst from loving you too much. I dream of the day when I can call you mine officially, when I can look into your eyes and tell you everything I've kept in my heart. Until then, I will love you from whatever distance life places between us, with a devotion that time cannot weaken." },
  { id: 9, text: "You are the first thought of my morning and the last prayer of my night. You are the princess who rules my heart with a gentle touch, and I am your devoted servant in love. I wish for us to achieve every dream together — to build a home filled with faith, love, and laughter. I am ready to sacrifice my today for your tomorrow, always." },
  { id: 10, text: "I have built castles in the sky with your name on every tower. I have written poems in the sand that the tide cannot wash away. Fatima, my love for you is not just words; it is the very foundation of my existence. I dream of walking beside you through this life and into the next, hand in hand, heart in heart." },
  { id: 11, text: "My princess, when the world feels heavy and my shoulders tire, I think of you and find strength I never knew I had. You are my courage when I am afraid, my peace when I am troubled, and my hope when I am lost. I am ready to sacrifice every comfort to ensure you never know a day without happiness." },
  { id: 12, text: "Fatima, if love could be measured, mine for you would stretch from the earth to the heavens and back again. I feel your presence in every gentle breeze, I see your beauty in every sunset, and I hear your voice in every quiet moment. My heart beats a rhythm that calls your name, and I pray that one day you will hear it too." },
  { id: 13, text: "I dream of a life where every morning begins with your smile and every night ends with your hand in mine. I wish for us to grow together in faith and love, to support each other through every test, and to build a legacy of love that our children will inherit. You are my partner in every dream, my princess in every story." },
  { id: 14, text: "My dearest Fatima, I want you to know that my love for you is not bound by time or circumstance. It is eternal, unshakable, and entirely yours. I have loved you without knowing if you feel the same, and I will continue to love you regardless, because my heart has chosen you and it never consults me." },
  { id: 15, text: "You are the miracle I never expected and the blessing I don't deserve. Every time I think of you, my heart overflows with gratitude to Allah. I am ready to sacrifice my pride, my fears, and my doubts to be the man you deserve. My princess, my love for you is the truest thing I have ever known." },
  { id: 16, text: "Fatima, my heart beats for you in a language that needs no translation. It beats in hope, in longing, in devotion, and in dreams of our future together. I wish I could wrap the world in silk and lay it at your feet, but all I have is my heart — and it is entirely yours, forever and always." },
  { id: 17, text: "I think about the life we could build together, and my soul finds a peace that nothing else can bring. A home where love is the foundation, where every meal is shared with gratitude, where every difficulty is faced together. You are my dream come true, Fatima, and I am ready to sacrifice everything to make that dream real." },
  { id: 18, text: "My princess, there is no version of my future that does not include you. I have loved you from the first moment, and I will love you until my last breath. My heart is, was, and always will be yours. I don't need the world to know; I only need Allah to witness the truth of my love for you." },
  { id: 19, text: "Fatima, every time I close my eyes, I see your face. Every time I open my heart, I find you there. You have become the center of my universe, the gravity that holds me together. I am ready to sacrifice my solitude, my comfort, and my fears to be with you. You are my forever, my always, my everything." },
  { id: 20, text: "My beloved Fatima, if I could give you one thing in this life, it would be the ability to see yourself through my eyes. Only then would you understand how special you are to me. My heart beats for you with a passion that defies words, a sacrifice that knows no limits, and a dream that will never die. You are my princess, my love, my life." },
  { id: 21, text: "My Chibu, even when I call you by that name to tease you, my heart is overflowing with love. You are my princess, my Fatima, my Matata — every name I give you is a prayer of love. I miss your voice, your laughter, and the way you make every room brighter just by being in it." },
  { id: 22, text: "Fatima, do you remember that first Monday morning when you walked into class wearing your pink hijab? That smile still lives in my heart. I was just a boy then, but you made me want to become a man worthy of your love. Every day since then has been a step toward you." },
  { id: 23, text: "My princess, I still have the notebooks where you helped me write my notes. Your handwriting is the most beautiful thing I own because it carries your essence. I will never destroy them — they are treasures from the days when we sat together in class, learning and laughing." },
  { id: 24, text: "Fatima, I know sometimes I complain that you are busy or respond late, but please know that even in those moments, my love for you never wavers. I understand that life is demanding, and I am proud of the woman you are becoming. Just know that I am always here, waiting, loving, and believing in us." },
  { id: 25, text: "My love, from Eeqraa International Model School to Nigerian Army University Biu, my heart has traveled with you. Distance means nothing when two hearts are connected by faith and love. I am building my future so that one day, I can build ours together." },
  { id: 26, text: "Princess Fatima, I pray that every step you take is blessed, every door you knock on opens with mercy, and every dream you hold comes true. You deserve the world, and I am working every day to be the man who can give it to you." },
  { id: 27, text: "My Fatima, when I think of our excursions to Gitata, Railway, Peaze Radio, and all those places we went together, my heart smiles. Those were the days when I could see you laugh freely, and your joy became my joy. I long for more days like that with you." },
  { id: 28, text: "Matata, you are the quiet strength I never knew I needed. Your silence speaks volumes to my heart. Your presence is enough to calm every storm inside me. I don't need grand gestures — I just need you, always and forever." },
  { id: 29, text: "My princess, I have loved you through silence, through distance, through pain, and through hope. I have loved you when you were near and when you were far. My love is not a feeling that comes and goes — it is the permanent state of my heart." },
  { id: 30, text: "Fatima, if I could turn back time, I would go back to that first Monday in SSS 1 and tell you immediately how I feel. But maybe the waiting made this love stronger. Maybe the distance made it deeper. Whatever the case, I am grateful that Allah brought us back together. You are my answered prayer." },
];

// ============================================================
// BIRTHDAY LOVE MESSAGES (shown ONLY on June 3rd)
// ============================================================
export const birthdayMessages: LoveMessage[] = [
  { id: 101, text: "Happy Birthday my beautiful Fatima! Today the world celebrates the day it gained its most precious soul." },
  { id: 102, text: "On this day, years ago, an angel was born. That angel became my entire world. Happy Birthday, my love." },
  { id: 103, text: "Every candle on your cake is a year the universe blessed us with your light. Happy Birthday, my Fatima." },
  { id: 104, text: "Happy Birthday to the woman who makes my heart skip beats and my soul find peace. I love you endlessly." },
  { id: 105, text: "Today is not just your birthday — it is the anniversary of the best gift Allah ever gave this world." },
  { id: 106, text: "Happy Birthday my queen. May this year bring you every joy you deserve and every dream you hold dear." },
  { id: 107, text: "On your special day, I want you to know: you are loved beyond measure, cherished beyond words, and celebrated beyond today." },
  { id: 108, text: "Happy Birthday Fatima! My love for you grows deeper with every sunrise, but today it shines the brightest." },
  { id: 109, text: "The day you were born was the day the world became more beautiful. Happy Birthday, my heart's home." },
  { id: 110, text: "Happy Birthday to the one who colors my world, fills my silence, and completes my soul. I am forever yours." },
];

// ============================================================
// REGULAR LOVE LETTERS (30 total)
// ============================================================
export const loveLetters: LoveLetter[] = [
  {
    id: 1,
    title: "",
    content: `My Fatima,

I am writing this with a heart that is both full and aching. Full because it carries an ocean of love for you, and aching because words will never be enough to describe how deeply you have touched my soul. From the moment you entered my world, everything changed. The colors became brighter, the silence became warmer, and my dreams found a destination — you.

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

This morning I woke up thinking of your smile, and it was the first light that entered my world. I want you to know that you are cherished beyond measure — not for what you do, but simply for who you are. Your kindness, your strength, your grace — they leave me in awe every single day.

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

I dream of a future where we watch these same stars together, wrapped in the comfort of knowing we belong to each other. I am ready to sacrifice my today for your tomorrow, my dreams for your happiness. You are not just my love — you are my revelation, my peace, my home.

Sleep peacefully tonight, knowing you are deeply and truly loved.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 4,
    title: "",
    content: `My Fatima,

Thank you for being the safe harbor my soul returns to. Thank you for your patience, your laughter, and your gentle way of making everything better. I do not take your presence in my life for granted — I treasure it, protect it, and promise to honor it for as long as I live.

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

Sometimes I search for the perfect words to describe my love for you, and I realize they do not exist in any language I know. My love for you is deeper than oceans, wider than skies, and more certain than sunrise. It simply is — eternal, unshakable, and entirely yours.

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

It is not the grand gestures that make me love you most — it is the little things. The way you say my name. The way you worry about others before yourself. The way you make a room feel like home just by walking in. These small miracles are why my heart is forever yours.

I dream of a lifetime of collecting these little moments with you. A thousand ordinary days made extraordinary by your presence. I am ready to sacrifice my pride and my fears to be the man who deserves your love. You are my heart's favorite address.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 8,
    title: "",
    content: `My Fatima,

If my soul could speak without my body, it would whisper only your name. You have touched a part of me I did not know existed. You are not just my love — you are my revelation. I am better because of you. I am whole because of you. I am yours, completely.

I dream of a life where our souls grow together in faith and love. I am ready to sacrifice every doubt, every fear, and every obstacle to make that life real. You are my eternal truth, my divine blessing.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 9,
    title: "",
    content: `My Fatima,

Even on days when the sky is gray and the world feels heavy, you are my sunshine. Your love does not depend on perfect conditions — it is steady, warm, and unconditional. I hope this letter finds you wrapped in the same comfort you always give me. You are loved, today and always.

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

I dream of a life that reads like a love story — one written by Allah's own hand. I am ready to sacrifice every chapter of my past to begin a new book with you. You are my inspiration, my muse, my eternal verse.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 13,
    title: "",
    content: `My Fatima,

Home is not a place. Home is wherever you are. When I think of home, I don't think of walls or roofs — I think of your arms, your smile, your presence. You are the shelter my heart has been searching for all my life.

I dream of building a home with you, not just of bricks but of trust, love, and faith. I am ready to sacrifice every false sense of security to find my true home in your heart. You are my refuge, my peace, my home.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 14,
    title: "",
    content: `My Fatima,

I would choose you in a hundred lifetimes, in a hundred worlds, in any version of reality. My love for you is not accidental; it is essential. Like air, like water, like prayer — I need you to survive.

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

My heart is, and always will be, yours. I don't lend it to you; I have given it completely. There is no return policy, no expiration date, no conditions. It is yours to keep, to hold, to treasure, or to break — though I pray you choose to treasure it.

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
  {
    id: 21,
    title: "",
    content: `My Chibu,

Yes, I called you Chibu — the name I use when I want to tease you, when I want to see that beautiful frown turn into a laugh. But even when I'm teasing you, my heart is saying "I love you" in a thousand different ways.

Do you remember when you first came to Eeqraa? You were so quiet, so shy, wearing that pink hijab. I couldn't take my eyes off you. And now, years later, I still can't. You have grown from the quiet new girl into the woman who owns my heart completely.

I miss our classroom days, sitting together, you helping me with my notes while I tried to teach you Fulani. Those were the happiest days of my life. I pray we create even happier days together in the future.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 22,
    title: "",
    content: `My Princess,

I want to tell you something I have never fully said before. When the school separated the boys and girls in SS2, it felt like someone took the sun out of my sky. I wrote you that letter through Usman, and when you didn't respond, my world went dark. I was so young, so foolish, so afraid.

But Allah had a plan. He brought us back together at the Women Centre in Abuja, and even though I couldn't look at you because my heart was still wounded, I never stopped loving you. And then, on that blessed February 22nd, 2025, at Abdulrahman and Aisha's walima, I saw you again. All the memories came flooding back.

Now, here we are, making calls, building us. I am the happiest man alive. You are my answered prayer, my Fatima, my everything.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 23,
    title: "",
    content: `My Matata,

You know why I call you Matata? Because you are trouble — the beautiful kind of trouble that makes a man want to be better, stronger, and more devoted. You trouble my thoughts, my dreams, and my heart in the most wonderful way.

I think about our classmates sometimes — Burgus, Shovel, Danwi, Balema, Ahmadi, Muntari, Zagado, and all the others. They saw me fall for you before I even admitted it to myself. They saw the way I looked at you in class, the way my eyes followed you when you moved to the front seat.

Fatima, I have loved you through every season, every separation, every reunion. I will keep loving you until Allah calls us home. You are my princess, my trouble, my peace.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 24,
    title: "",
    content: `My Fatima,

I know you are busy. I know life pulls you in many directions. I know sometimes my messages wait and my calls go unanswered. But please, my princess, never doubt my love during those silent moments.

I am here in Biu, studying Cyber Security, building a future I hope to share with you. Every line of code I write, every lecture I attend, every exam I prepare for — they are all steps toward the life I want to give you. A life of comfort, love, and faith.

So when you are busy, I am busy too. But my heart is never too busy for you. It beats your name in every moment, in every breath.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 25,
    title: "",
    content: `My Love,

Do you know what I think about when I think of our future? I think of a small home filled with the sound of your laughter. I think of children who have your smile and your gentle heart. I think of growing old together, still holding hands, still looking at each other the way we did in that classroom at Eeqraa.

I think of teaching our children Fulani, just like I tried to teach you. I think of you teaching them to write with that beautiful handwriting of yours. I think of a life built on the foundation of the love we started in that classroom.

Fatima, I am not just dreaming — I am planning, I am working, I am praying. For us. For our future. For the life we deserve.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 26,
    title: "",
    content: `My Princess,

I want to remind you of something important: you are beautiful. Not just in the way you look — though your chocolate skin and your broad smile still take my breath away — but in the way you carry yourself, in the way you treat others, in the way you face life with quiet strength.

You are Fulani from Gombe, and even though you can't speak Fulani yet, your beauty speaks the language of grace. You are average in height but immeasurable in the depth of my love for you. You are my standard of beauty, my definition of perfection.

Never let anyone make you feel less than you are. You are a queen, a princess, a blessing. You are my Fatima.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 27,
    title: "",
    content: `My Fatima,

I want to take you back to Gitata. Do you remember that da'awa excursion? The way the sun felt warm on our faces, the way we all sat together learning about our deen? I watched you from across the room, and I thought to myself: "This is the woman I want to spend my life with."

And then the Railway trip, and Peaze Radio — every excursion was another page in the story of us. Even when we weren't together, even when we were just classmates sharing the same space, my heart was writing love letters to you.

Those memories are treasures I keep in the safest place in my heart. And I pray we make a thousand more memories just like them.

*Abubakar*`,
    sealText: "F",
    isSpecial: false,
  },
  {
    id: 28,
    title: "",
    content: `My Beloved,

I want to say thank you. Thank you for accepting my call. Thank you for saying yes when I proposed. Thank you for giving me a chance to love you the way I have always wanted to. I know I am far away in Borno, and I know the distance is hard. But your "yes" is the fuel that keeps me going every single day.

I think about the day I will finally come back to you, not as a student but as a man ready to build a life with you. I think about holding your hand, looking into your eyes, and telling you everything I have written in these letters and more.

Until that day comes, please know that my love travels across every mile between us. It is with you in Kaduna, in Abuja, in Gombe — wherever you are, my love is there.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 29,
    title: "",
    content: `My Heart,

I have a confession to make. When I told Habiba I loved her back in SS3, it was the biggest mistake of my life. I was angry, I was hurt, and I was foolish. My heart was aching for you, and instead of being patient, I tried to fill the void with something that was never meant to be.

But Allah is merciful. He brought us back together. He gave me another chance. And I promise you, my princess, I will never make that mistake again. You are the only one my heart has ever truly loved. You are the only one it ever will.

Please forgive the foolish boy I was. Love the man I am becoming — a man who knows that you are his everything.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
  {
    id: 30,
    title: "",
    content: `My Forever,

This is the last letter in this collection, but it is not the last letter I will ever write you. I will write you letters for the rest of my life — on good days and bad days, when we are together and when we are apart. Because you are my favorite person to write to, my favorite person to think about, my favorite person to love.

Fatima, from that first Monday morning in SSS 1 at Eeqraa International Model School, to this moment in 2026 as I study at Nigerian Army University Biu, my love for you has only grown. It has survived separation, silence, distance, and doubt. And it will survive everything else life throws at us.

You are my princess. You are my Fatima. You are my Matata. You are my Chibu. You are my everything.

Forever and always, with all my heart and soul.

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

Today is the most beautiful day of the year — the day you were born. On this day, the universe decided to create perfection and named it Fatima. Every year that passes, you become more radiant, more graceful, and more deeply loved.

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

But all I truly have is my heart — and it beats only for you. On your birthday, I give you every beat, every breath, every thought. You are my world, my worship, my wonder.

Happy Birthday, my eternal love.

*Abubakar*`,
    sealText: "F",
    isSpecial: true,
  },
];

// ============================================================
// MORNING PRAYERS (30 total)
// ============================================================
export const morningPrayers: Prayer[] = [
  { id: 1, text: "May your day be filled with barakah and your heart with peace, my love." },
  { id: 2, text: "Ya Allah, protect Fatima today and always. Bless her steps and lighten her burdens." },
  { id: 3, text: "As the sun rises, I pray that joy rises in your heart just as surely." },
  { id: 4, text: "May every hour of this day bring you closer to your dreams and to happiness." },
  { id: 5, text: "I pray that you feel loved today — not just by me, but by the entire universe." },
  { id: 6, text: "Ya Allah, grant Fatima strength for her challenges and sweetness for her rewards." },
  { id: 7, text: "May your morning be as beautiful as your soul, and your day as bright as your smile." },
  { id: 8, text: "I start my day with gratitude — because you exist, and because you are mine." },
  { id: 9, text: "May angels walk beside you today and keep every harm far from you." },
  { id: 10, text: "My first thought this morning was you. My first prayer was for you. Always." },
  { id: 11, text: "May today bring you reasons to laugh, moments to cherish, and love to hold." },
  { id: 12, text: "Ya Allah, let Fatima's heart be light, her path be clear, and her rizq be abundant." },
  { id: 13, text: "I pray that every door you knock on today opens with ease and blessing." },
  { id: 14, text: "May your coffee be warm, your tasks be easy, and your heart be full today." },
  { id: 15, text: "You are my favorite dua come true. I thank Allah for you every single morning." },
  { id: 16, text: "Ya Rabb, bless Fatima with a morning full of hope and a day full of achievements." },
  { id: 17, text: "May the morning breeze carry my love to you and wrap you in warmth and peace." },
  { id: 18, text: "I pray that today brings you one step closer to every dream you hold in your heart." },
  { id: 19, text: "Ya Allah, surround Fatima with people who uplift her and remove those who bring her down." },
  { id: 20, text: "My princess, may this morning be the beginning of a day written with mercy and love." },
  { id: 21, text: "I pray that your heart finds peace in every prayer you make today, my love." },
  { id: 22, text: "May Allah bless your hands in everything they do today, and bless your heart in everything it feels." },
  { id: 23, text: "Good morning my Fatima. May your day be as sweet as your smile and as bright as your spirit." },
  { id: 24, text: "Ya Allah, let today be a day of ease for Fatima. Remove every difficulty and replace it with joy." },
  { id: 25, text: "I pray that you wake up feeling refreshed, loved, and ready to conquer whatever comes your way." },
  { id: 26, text: "May the light of this morning remind you of how much you are loved and cherished." },
  { id: 27, text: "Ya Rabb, bless Fatima with good health, strong faith, and endless happiness today and always." },
  { id: 28, text: "My princess, may your morning be filled with the fragrance of Allah's mercy and the warmth of my love." },
  { id: 29, text: "I pray that every step you take today is guided by Allah and every decision you make is blessed." },
  { id: 30, text: "Good morning my love. Remember that no matter how far apart we are, my heart is always with you." },
];

// ============================================================
// AFTERNOON PRAYERS (30 total)
// ============================================================
export const afternoonPrayers: Prayer[] = [
  { id: 1, text: "Good afternoon my princess. The sun may be hot, but my love for you burns even brighter. Please stay cool and hydrated." },
  { id: 2, text: "Ya Allah, protect Fatima from the heat of the day and the weariness of the afternoon. Keep her strong and refreshed." },
  { id: 3, text: "My love, the afternoon sun is a reminder that even in the middle of the day, my heart is thinking of you. Take some rest if you can." },
  { id: 4, text: "May this afternoon bring you a moment of peace amidst the busyness of your day. You deserve a break, my princess." },
  { id: 5, text: "Good afternoon Fatima. I pray that the second half of your day is even more beautiful than the first." },
  { id: 6, text: "Ya Rabb, grant Fatima the energy to finish her day strong and the patience to handle whatever comes her way." },
  { id: 7, text: "My princess, please drink some water and take a deep breath. Your well-being is more important than any task. I love you." },
  { id: 8, text: "May this afternoon be a time of barakah for you. May every effort you make be rewarded with success and joy." },
  { id: 9, text: "Good afternoon my love. I hope you find a moment to smile and remember that someone far away is praying for you." },
  { id: 10, text: "Ya Allah, let the afternoon sun remind Fatima of Your warmth and mercy. Keep her safe and blessed." },
  { id: 11, text: "My Fatima, if you're feeling tired, please take a nap. Your rest is important to me. I want you healthy and happy." },
  { id: 12, text: "May this afternoon bring you unexpected blessings and moments of joy that make you smile from your heart." },
  { id: 13, text: "Good afternoon my princess. The day is halfway done, and I am halfway through missing you even more than I did this morning." },
  { id: 14, text: "Ya Rabb, bless Fatima's afternoon with productivity, peace, and the sweet feeling of accomplishment." },
  { id: 15, text: "My love, please don't forget to eat something nourishing. Your body needs fuel, and my heart needs you healthy and strong." },
  { id: 16, text: "May the afternoon breeze carry my love to you and cool your heart as it cools the earth." },
  { id: 17, text: "Good afternoon Fatima. I pray that any stress you feel melts away like ice under the warm sun of Allah's mercy." },
  { id: 18, text: "Ya Allah, let Fatima's afternoon be filled with light, love, and the strength to carry on with grace and patience." },
  { id: 19, text: "My princess, if the day feels long, remember that I am counting the hours until I can hear your voice again. Stay strong." },
  { id: 20, text: "May this afternoon be a bridge of peace between a busy morning and a restful evening. You are doing great, my love." },
  { id: 21, text: "Good afternoon my Fatima. I hope you find a quiet moment to remember how deeply and truly you are loved." },
  { id: 22, text: "Ya Rabb, protect Fatima from the afternoon heat and bless her with coolness, comfort, and contentment." },
  { id: 23, text: "My love, take a moment to stretch, breathe, and smile. The world is better because you are in it. Good afternoon." },
  { id: 24, text: "May your afternoon be as beautiful as your heart and as peaceful as your presence makes me feel." },
  { id: 25, text: "Good afternoon my princess. I pray that the rest of your day unfolds with ease, joy, and beautiful surprises." },
  { id: 26, text: "Ya Allah, let Fatima feel Your presence in every moment of this afternoon. Comfort her, guide her, and bless her." },
  { id: 27, text: "My Fatima, even when the afternoon feels heavy, remember that my love is the weight that lifts you up, not pulls you down." },
  { id: 28, text: "May this afternoon bring you clarity in your thoughts, peace in your heart, and success in your endeavors." },
  { id: 29, text: "Good afternoon my love. Please have some fruits or a healthy snack. Your health is my happiness." },
  { id: 30, text: "Ya Rabb, as the day moves toward evening, bless Fatima with a beautiful afternoon that fills her heart with gratitude and joy." },
];

// ============================================================
// NIGHT PRAYERS (30 total)
// ============================================================
export const nightPrayers: Prayer[] = [
  { id: 1, text: "May your sleep be peaceful and your dreams be sweet, my love." },
  { id: 2, text: "Ya Allah, watch over Fatima through the night. Let no worry touch her rest." },
  { id: 3, text: "As the stars appear, know that my love for you shines just as steadily." },
  { id: 4, text: "May your night be a healing for every tiredness your day brought you." },
  { id: 5, text: "I pray that you close your eyes tonight feeling safe, loved, and at peace." },
  { id: 6, text: "Ya Allah, forgive our shortcomings and bless our tomorrow. Protect my Fatima." },
  { id: 7, text: "May the angels whisper peace into your dreams tonight, my beloved." },
  { id: 8, text: "No matter how hard today was, tomorrow is a new mercy from Allah. Rest well." },
  { id: 9, text: "I send my love like a blanket — wrap yourself in it and sleep deeply." },
  { id: 10, text: "May your night be free from fear and full of divine protection." },
  { id: 11, text: "Ya Allah, let Fatima wake up healthier, happier, and closer to You." },
  { id: 12, text: "The moon is beautiful tonight, but not as beautiful as the light you bring to my life." },
  { id: 13, text: "I pray that every worry leaves your heart before sleep finds you." },
  { id: 14, text: "May your pillow be soft, your blanket be warm, and your heart be lighter." },
  { id: 15, text: "You are the last thought on my mind tonight, and the first when I wake. Always." },
  { id: 16, text: "Ya Rabb, protect Fatima from every harm in the night and bless her with restful sleep." },
  { id: 17, text: "My princess, let the silence of the night be filled with the peace of knowing you are deeply loved." },
  { id: 18, text: "May your dreams tonight be filled with beautiful scenes of the future we will build together." },
  { id: 19, text: "Ya Allah, let Fatima's night be a time of healing for her body, mind, and soul." },
  { id: 20, text: "Goodnight my love. The stars are watching over you, and so is my heart." },
  { id: 21, text: "I pray that you fall asleep with a smile on your face and peace in your heart. You deserve it." },
  { id: 22, text: "Ya Rabb, bless Fatima with dreams that inspire her and a sleep that restores her completely." },
  { id: 23, text: "My Fatima, the night is long but my love for you is longer. Sleep well, my princess." },
  { id: 24, text: "May the darkness of the night be replaced by the light of Allah's mercy in your dreams." },
  { id: 25, text: "Goodnight my princess. I am holding you in my prayers and in my heart until morning comes." },
  { id: 26, text: "Ya Allah, let Fatima wake up tomorrow with a heart full of hope and a spirit full of strength." },
  { id: 27, text: "My love, rest your beautiful eyes. The world can wait. Your peace cannot. Goodnight." },
  { id: 28, text: "May the night bring you the rest you need and the dreams you deserve. I love you endlessly." },
  { id: 29, text: "Ya Rabb, surround Fatima with Your protection through the night and Your mercy when she wakes." },
  { id: 30, text: "Goodnight my Fatima. Remember that even in sleep, my heart is awake, loving you." },
];

// ============================================================
// BIRTHDAY PRAYERS (30 total — shown ONLY on June 3rd)
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
  { id: 311, text: "Ya Rabb, on Fatima's birthday, I ask You to grant her a long life filled with iman, health, and prosperity." },
  { id: 312, text: "Happy Birthday my princess. May this year open doors that have been closed and bless you with opportunities beyond your imagination." },
  { id: 313, text: "I pray that Allah makes this birthday a turning point in your life — a year of breakthroughs and beautiful beginnings." },
  { id: 314, text: "Ya Allah, let Fatima feel Your love more deeply this year than ever before. Let her know she is cherished by You and by me." },
  { id: 315, text: "Happy Birthday my heart. May every day of this new year be a reminder of how special and loved you are." },
  { id: 316, text: "Ya Rabb, bless Fatima with wisdom, strength, and the courage to pursue every dream she holds in her heart." },
  { id: 317, text: "On your birthday, I pray that Allah removes every obstacle from your path and replaces it with ease and success." },
  { id: 318, text: "Happy Birthday my Fatima. May this year be the one where all your silent prayers are answered loudly." },
  { id: 319, text: "Ya Allah, let Fatima's birthday celebration be a reflection of the joy she brings to everyone around her." },
  { id: 320, text: "My birthday dua for you: may you grow in faith, in love, and in every beautiful way possible. Happy Birthday, my everything." },
  { id: 321, text: "Ya Rabb, on this special day, I ask You to bless Fatima with a heart that is always content and a soul that is always at peace." },
  { id: 322, text: "Happy Birthday my love. May the coming year be filled with moments that make you laugh until your stomach hurts." },
  { id: 323, text: "I pray that Allah grants you not just another year of life, but another year of living — truly, fully, beautifully." },
  { id: 324, text: "Ya Allah, let Fatima's new year be decorated with success, surrounded by love, and anchored in faith." },
  { id: 325, text: "Happy Birthday my princess. You are the most beautiful gift I have ever received, and I thank Allah for you every day." },
  { id: 326, text: "Ya Rabb, on Fatima's birthday, I ask You to bless her family, her friends, and everyone who loves her." },
  { id: 327, text: "May this birthday mark the beginning of a chapter so beautiful that it makes all the past chapters worth reading." },
  { id: 328, text: "Happy Birthday my Fatima. I pray that this year brings you closer to me and closer to Jannah. That is my only wish." },
  { id: 329, text: "Ya Allah, let Fatima's life be a testimony to Your mercy and a reflection of Your love. Bless her birthday abundantly." },
  { id: 330, text: "My final birthday prayer: may you live long, love deeply, laugh often, and know that my heart beats only for you. Happy Birthday, my princess." },
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
