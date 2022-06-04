export const paladin = {
    name: "Paladin",
    source: "PHB",
    page: 82,
    srd: true,
    hd: {
        number: 1,
        faces: 10,
    },
    proficiency: ["wis", "cha"],
    spellcastingAbility: "cha",
    casterProgression: "1/2",
    preparedSpells: "<$level$> / 2 + <$cha_mod$>",
    optionalfeatureProgression: [
        {
            name: "Fighting Style",
            featureType: ["FS:P"],
            progression: {
                2: 1,
            },
        },
    ],
    startingProficiencies: {
        armor: ["light", "medium", "heavy", "{@item shield|phb|shields}"],
        weapons: ["simple", "martial"],
        skills: [
            {
                choose: {
                    from: [
                        "athletics",
                        "insight",
                        "intimidation",
                        "medicine",
                        "persuasion",
                        "religion",
                    ],
                    count: 2,
                },
            },
        ],
    },
    startingEquipment: {
        additionalFromBackground: true,
        default: [
            "(a) a {@filter martial weapon|items|source=phb|category=basic|type=martial weapon} and a {@item shield|phb} or (b) two {@filter martial weapons|items|source=phb|category=basic|type=martial weapon}",
            "(a) five {@item javelin|phb|javelins} or (b) any {@filter simple melee weapon|items|source=phb|category=basic|type=simple weapon;melee weapon=sand}",
            "(a) a {@item priest's pack|phb} or (b) an {@item explorer's pack|phb}",
            "{@item Chain mail|phb} and a {@item holy symbol|phb}",
        ],
        goldAlternative: "{@dice 5d4 × 10|5d4 × 10|Starting Gold}",
        defaultData: [
            {
                a: [
                    {
                        equipmentType: "weaponMartial",
                    },
                    "shield|phb",
                ],
                b: [
                    {
                        equipmentType: "weaponMartial",
                        quantity: 2,
                    },
                ],
            },
            {
                a: [
                    {
                        item: "javelin|phb",
                        quantity: 5,
                    },
                ],
                b: [
                    {
                        equipmentType: "weaponSimpleMelee",
                    },
                ],
            },
            {
                a: ["priest's pack|phb"],
                b: ["explorer's pack|phb"],
            },
            {
                _: ["Chain mail|phb", "holy symbol|phb"],
            },
        ],
    },
    multiclassing: {
        requirements: {
            str: 13,
            cha: 13,
        },
        proficienciesGained: {
            armor: ["light", "medium", "{@item shield|phb|shields}"],
            weapons: ["simple", "martial"],
        },
    },
    classTableGroups: [
        {
            title: "Spell Slots per Spell Level",
            colLabels: [
                "{@filter 1st|spells|level=1|class=Paladin}",
                "{@filter 2nd|spells|level=2|class=Paladin}",
                "{@filter 3rd|spells|level=3|class=Paladin}",
                "{@filter 4th|spells|level=4|class=Paladin}",
                "{@filter 5th|spells|level=5|class=Paladin}",
            ],
            rowsSpellProgression: [
                [0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0],
                [3, 0, 0, 0, 0],
                [3, 0, 0, 0, 0],
                [4, 2, 0, 0, 0],
                [4, 2, 0, 0, 0],
                [4, 3, 0, 0, 0],
                [4, 3, 0, 0, 0],
                [4, 3, 2, 0, 0],
                [4, 3, 2, 0, 0],
                [4, 3, 3, 0, 0],
                [4, 3, 3, 0, 0],
                [4, 3, 3, 1, 0],
                [4, 3, 3, 1, 0],
                [4, 3, 3, 2, 0],
                [4, 3, 3, 2, 0],
                [4, 3, 3, 3, 1],
                [4, 3, 3, 3, 1],
                [4, 3, 3, 3, 2],
                [4, 3, 3, 3, 2],
            ],
        },
    ],
    classFeatures: [
        "Divine Sense|Paladin||1",
        "Lay on Hands|Paladin||1",
        "Divine Smite|Paladin||2",
        "Fighting Style|Paladin||2",
        "Martial Versatility|Paladin||2|UAClassFeatureVariants",
        "Spellcasting|Paladin||2",
        "Divine Health|Paladin||3",
        {
            classFeature: "Sacred Oath|Paladin||3",
            gainSubclassFeature: true,
            gainSubclassFeatureHasContent: true,
        },
        "Ability Score Improvement|Paladin||4",
        "Proficiency Versatility|Paladin||4|UAClassFeatureVariants",
        "Martial Versatility|Paladin||4|TCE",
        "Extra Attack|Paladin||5",
        "Aura of Protection|Paladin||6",
        {
            classFeature: "Sacred Oath feature|Paladin||7",
            gainSubclassFeature: true,
        },
        "Ability Score Improvement|Paladin||8",
        "Proficiency Versatility|Paladin||8|UAClassFeatureVariants",
        "Aura of Courage|Paladin||10",
        "Improved Divine Smite|Paladin||11",
        "Ability Score Improvement|Paladin||12",
        "Proficiency Versatility|Paladin||12|UAClassFeatureVariants",
        "Cleansing Touch|Paladin||14",
        {
            classFeature: "Sacred Oath feature|Paladin||15",
            gainSubclassFeature: true,
        },
        "Ability Score Improvement|Paladin||16",
        "Proficiency Versatility|Paladin||16|UAClassFeatureVariants",
        "Aura improvements|Paladin||18",
        "Ability Score Improvement|Paladin||19",
        "Proficiency Versatility|Paladin||19|UAClassFeatureVariants",
        {
            classFeature: "Sacred Oath feature|Paladin||20",
            gainSubclassFeature: true,
        },
    ],
    subclassTitle: "Sacred Oath",
    fluff: [
        {
            name: "Paladin",
            type: "section",
            entries: [
                "Clad in plate armor that gleams in the sunlight despite the dust and grime of long travel, a human lays down her sword and shield and places her hands on a mortally wounded man. Divine radiance shines from her hands, the man's wounds knit closed, and his eyes open wide with amazement.",
                "A dwarf crouches behind an outcrop, his black cloak making him nearly invisible in the night, and watches an orc war band celebrating its recent victory. Silently, he stalks into their midst and whispers an oath, and two orcs are dead before they even realize he is there.",
                "Silver hair shining in a shaft of light that seems to illuminate only him, an elf laughs with exultation. His spear flashes like his eyes as he jabs again and again at a twisted giant, until at last his light overcomes its hideous darkness.",
                "Whatever their origin and their mission, paladins are united by their oaths to stand against the forces of evil. Whether sworn before a god's altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as the only witness, a paladin's oath is a powerful bond. It is a source of power that turns a devout warrior into a blessed champion.",
                {
                    type: "entries",
                    name: "The Cause of Righteousness",
                    entries: [
                        "A paladin swears to uphold justice and righteousness, to stand with the good things of the world against the encroaching darkness, and to hunt the forces of evil wherever they lurk. Different paladins focus on various aspects of the cause of righteousness, but all are bound by the oaths that grant them power to do their sacred work. Although many paladins are devoted to gods of good, a paladin's power comes as much from a commitment to justice itself as it does from a god.",
                        "Paladins train for years to learn the skills of combat, mastering a variety of weapons and armor. Even so, their martial skills are secondary to the magical power they wield: power to heal the sick and injured, to smite the wicked and the undead, and to protect the innocent and those who join them in the fight for justice.",
                    ],
                },
                {
                    type: "entries",
                    name: "Beyond the Mundane Life",
                    entries: [
                        "Almost by definition, the life of a paladin is an adventuring life. Unless a lasting injury has taken him or her away from adventuring for a time, every paladin lives on the front lines of the cosmic struggle against evil. Fighters are rare enough among the ranks of the militias and armies of the world, but even fewer people can claim the true calling of a paladin. When they do receive the call, these warriors turn from their former occupations and take up arms to fight evil. Sometimes their oaths lead them into the service of the crown as leaders of elite groups of knights, but even then their loyalty is first to the cause of righteousness, not to crown and country.",
                        "Adventuring paladins take their work seriously. A delve into an ancient ruin or dusty crypt can be a quest driven by a higher purpose than the acquisition of treasure. Evil lurks in dungeons and primeval forests, and even the smallest victory against it can tilt the cosmic balance away from oblivion.",
                    ],
                },
                {
                    type: "entries",
                    name: "Creating a Paladin",
                    entries: [
                        "The most important aspect of a paladin character is the nature of his or her holy quest. Although the class features related to your oath don't appear until you reach 3rd level, plan ahead for that choice by reading the oath descriptions at the end of the class. Are you a devoted servant of good, loyal to the gods of justice and honor, a holy knight in shining armor venturing forth to smite evil? Are you a glorious champion of the light, cherishing everything beautiful that stands against the shadow, a knight whose oath descends from traditions older than many of the gods? Or are you an embittered loner sworn to take vengeance on those who have done great evil, sent as an angel of death by the gods or driven by your need for revenge? Appendix B lists many deities worshiped by paladins throughout the multiverse, such as Torm, Tyr, Heironeous, Paladine, Kiri-Jolith, Dol Arrah, the Silver Flame, Bahamut, Athena, Re-Horakhty, and Heimdall.",
                        "How did you experience your call to serve as a paladin? Did you hear a whisper from an unseen god or angel while you were at prayer? Did another paladin sense the potential within you and decide to train you as a squire? Or did some terrible event\u2014the destruction of your home, perhaps\u2014drive you to your quests? Perhaps you stumbled into a sacred grove or a hidden elven enclave and found yourself called to protect all such refuges of goodness and beauty. Or you might have known from your earliest memories that the paladin's life was your calling, almost as if you had been sent into the world with that purpose stamped on your soul.",
                        "As guardians against the forces of wickedness, paladins are rarely of any evil alignment. Most of them walk the paths of charity and justice. Consider how your alignment colors the way you pursue your holy quest and the manner in which you conduct yourself before gods and mortals. Your oath and alignment might be in harmony, or your oath might represent standards of behavior that you have not yet attained.",
                        {
                            type: "entries",
                            name: "Quick Build",
                            entries: [
                                "You can make a paladin quickly by following these suggestions. First, Strength should be your highest ability score, followed by Charisma. Second, choose the {@background noble} background.",
                            ],
                        },
                    ],
                },
            ],
            page: 82,
            source: "PHB",
        },
        {
            type: "section",
            entries: [
                {
                    type: "quote",
                    entries: [
                        "The true worth of a paladin is measured not in foes defeated or dungeons plundered. It is measured in lives saved and hearts turned to the causes of mercy and justice.",
                    ],
                    by: "Isteval",
                },
                "A paladin is a living embodiment of an oath\u2014a promise or a vow made manifest in the person of a holy warrior who has the skill and the determination to see the cause through to the end. Some paladins devote themselves expressly to protecting the innocent and spreading justice in the world, while others resolve to attain that goal by conquering those who stand defiant and bringing them under the rule of law.",
                "Although no paladin in the world could be described as typical, a number of them are narrow-minded do-gooders who refuse to tolerate even the smallest deviation from their own outlook. Paladins who take up the adventuring life, however, rarely remain so rigid in their attitudes\u2014if only to keep from alienating their companions.",
                "You can flesh out your paladin character by using the suggestions below. It's important to keep in mind that most paladins aren't robots. They have doubts and prejudices and harbor contradictory thoughts just as any other character does. Some are compelled by an internal motivation that might sometimes be at odds with the principles of their oaths.",
                {
                    type: "entries",
                    name: "Personal Goal",
                    entries: [
                        "The precepts of a paladin's oath provide purpose to the character and dictate an ultimate goal or an overall intent that the paladin abides by and advances. Aside from that, some paladins are driven by a personal goal that either complements or transcends the dictates of their oaths. Paladins who swear different oaths might have the same personal goal, differing only in how they apply that goal to their actions when upholding their oaths.",
                        "If your paladin character has a personal goal, it might be drawn from some life event and thus not directly tied to the oath.",
                        {
                            type: "table",
                            caption: "Personal Goal",
                            colLabels: ["{@dice d6}", "Personal Goal"],
                            colStyles: ["col-1 text-center", "col-11"],
                            rows: [
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 1,
                                        },
                                    },
                                    "Peace. You fight so that future generations will not have to.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 2,
                                        },
                                    },
                                    "Revenge. Your oath is the vehicle through which you will right an ancient wrong.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 3,
                                        },
                                    },
                                    "Duty. You will live up to what you have sworn to do, or die trying.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 4,
                                        },
                                    },
                                    "Leadership. You will win a great battle that bards will sing about, and in so doing, you will become an example to inspire others.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 5,
                                        },
                                    },
                                    "Faith. You know your path is righteous, or else the gods would not have set you upon it.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 6,
                                        },
                                    },
                                    "Glory. You will lead the world into a grand new era, one that will be branded with your name.",
                                ],
                            ],
                        },
                    ],
                },
                {
                    type: "entries",
                    name: "Symbol",
                    entries: [
                        "Paladins are mindful of the influence of symbols, and many of them adopt or design an artistic device that bears a distinctive image. Your symbol exemplifies the oath you have taken and communicates that message to those around you, friend and foe alike.",
                        "Your symbol might be displayed on a banner, a flag, or your clothing for all to see. Or it could be less obvious, such as a trinket or a token that you carry concealed on your person.",
                        {
                            type: "table",
                            caption: "Symbol",
                            colLabels: ["{@dice d6}", "Symbol"],
                            colStyles: ["col-1 text-center", "col-11"],
                            rows: [
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 1,
                                        },
                                    },
                                    "A dragon, emblematic of your nobility in peace and your ferocity in combat",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 2,
                                        },
                                    },
                                    "A clenched fist, because you are always ready to fight for your beliefs",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 3,
                                        },
                                    },
                                    "An upraised open hand, indicating your preference for diplomacy over combat",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 4,
                                        },
                                    },
                                    "A red heart, showing the world your commitment to justice",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 5,
                                        },
                                    },
                                    "A black heart, signifying that emotions such as pity do not sway your dedication to your oath",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 6,
                                        },
                                    },
                                    "An unblinking eye, meaning that you are ever alert to all threats against your cause",
                                ],
                            ],
                        },
                    ],
                },
                {
                    type: "entries",
                    name: "Nemesis",
                    entries: [
                        "Their adherence to a sacred oath demands that paladins take an active stance in carrying their beliefs into the world. This activity naturally leads to conflict with creatures or entities that oppose those beliefs. Among those opponents, one often stands out as a paladin's most persistent or most formidable foe\u2014a nemesis whose presence or influence is a constant factor in a paladin's life.",
                        "Your paladin character might have an enemy that dates from the days before you took up your path. Or you could be a target because when you became a paladin, you immediately attracted the attention of those that would do you in. If you have a nemesis, who or what is it? Whom among your enemies do you consider to be the biggest threat to achieving your goals?",
                        {
                            type: "table",
                            caption: "Nemesis",
                            colLabels: ["{@dice d6}", "Nemesis"],
                            colStyles: ["col-1 text-center", "col-11"],
                            rows: [
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 1,
                                        },
                                    },
                                    "A mighty orc war chief who threatens to overrun and destroy everything you hold sacred",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 2,
                                        },
                                    },
                                    "A fiend or a celestial, the agent of a power of the Outer Planes, who has been charged with corrupting or redeeming you, as appropriate",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 3,
                                        },
                                    },
                                    "A dragon whose servants dog your steps",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 4,
                                        },
                                    },
                                    "A high priest who sees you as a misguided fool and wants you to abandon your religion",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 5,
                                        },
                                    },
                                    "A rival paladin who trained with you but became an oath-breaker and holds you responsible",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 6,
                                        },
                                    },
                                    "A vampire who has sworn revenge against all paladins after being defeated by one",
                                ],
                            ],
                        },
                    ],
                },
                {
                    type: "entries",
                    name: "Temptation",
                    entries: [
                        "Although paladins are dedicated to their oaths, they are mortals, and thus they are flawed. Many of them exhibit a type of behavior or hold to an attitude that is not in keeping with the highest ideals of their calling.",
                        "What is the temptation that your character succumbs to or finds it difficult to resist?",
                        {
                            type: "table",
                            caption: "Temptation",
                            colLabels: ["{@dice d6}", "Temptation"],
                            colStyles: ["col-1 text-center", "col-11"],
                            rows: [
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 1,
                                        },
                                    },
                                    "Fury. When your anger is roused, you have trouble thinking straight, and you fear you might do something you'll regret.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 2,
                                        },
                                    },
                                    "Pride. Your deeds are noteworthy, and no one takes note of them more often than you.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 3,
                                        },
                                    },
                                    "Lust. You can't resist an attractive face and a pleasant smile.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 4,
                                        },
                                    },
                                    "Envy. You are mindful of what some famous folk have accomplished, and you feel inadequate when your deeds don't compare to theirs.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 5,
                                        },
                                    },
                                    "Despair. You consider the great strength of the enemies you must defeat, and at times you see no way to achieve final victory.",
                                ],
                                [
                                    {
                                        type: "cell",
                                        roll: {
                                            exact: 6,
                                        },
                                    },
                                    "Greed. Regardless of how much glory and treasure you amass, it's never enough for you.",
                                ],
                            ],
                        },
                    ],
                },
            ],
            source: "XGE",
            page: 36,
        },
    ],
};
