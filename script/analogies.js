const analogies = [
    {
        question: 'Foot is to boot so as hand is to...?',
        answers: {
            a: 'pad',
            b: 'fist',
            c: 'glove',
            d: 'finger',
            e: 'arm'
        },
        correctAnswer: 'c',
        explanation: 'A foot is to a boot so as a hand is to a glove because we put a boot on a ' +
            'foot just the same as we put a glove on a hand.',
        level: 1
    },
    {
        question: 'Water is to thirst so as food is to...?',
        answers: {
            a: 'drink',
            b: 'hunger',
            c: 'bread',
            d: 'mouth',
            e: 'pork'
        },
        correctAnswer: 'b',
        explanation: 'Water is to thirst so as food is to hunger because when we are thirsty, ' +
            'we need water just the same as when we are hungry, we need food.',
        level: 1
    },
    {
        question: 'Electricity is to wire so as steam is to...?',
        answers: {
            a: 'lamp',
            b: 'current',
            c: 'water',
            d: 'pipes',
            e: 'house'
        },
        correctAnswer: 'd',
        explanation: 'Electricity is to a wire so as steam is to pipes because electricity goes through ' +
            'wires just the same as steam goes through pipes.',
        level: 1
    },
    {
        question: 'Locomotive is to railroad cars so as horse is to...?',
        answers: {
            a: 'train',
            b: 'horse',
            c: 'oats',
            d: 'cart',
            e: 'stable'
        },
        correctAnswer: 'd',
        explanation: 'A locomotive is to railroad cars so as a horse is to a cart because a locomotive ' +
            'pulls railroad cars just the same as a horse pulls a cart.',
        level: 1
    },
    {
        question: 'Fear is to escape so as...',
        answers: {
            a: 'sheep is to flock',
            b: 'raspberry is to berry',
            c: 'sea is to ocean',
            d: 'light is to darkness',
            e: 'poison is to death',
            f: 'foe  is to enemy'
        },
        correctAnswer: 'e',
        explanation: 'Fear is to escape so as poison is to death because when a person experiences fear, ' +
            'he/she wants to escape just the same as when a person takes poison, he/she can die.',
        level: 1
    },
    {
        question: 'Physics is to science so as...',
        answers: {
            a: 'sheep is to flock',
            b: 'raspberry is to berry',
            c: 'sea is to ocean',
            d: 'light is to darkness',
            e: 'poison is to death',
            f: 'foe  is to enemy'
        },
        correctAnswer: 'b',
        explanation: 'Physics is to science so as raspberry is to berry ' +
            'because physics is one kind of science just the same as raspberry is one kind of berry.',
        level: 1
    },
    {
        question: 'Correct is to right as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberryis to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe is to enemy'
        },
        correctAnswer: 'f',
        explanation: 'Correct is to right as a foe is to an enemy because when we say correct, we can also say ' +
            'that this is right just the same as when we say a foe, we know that he/she is the enemy.',
        level: 1
    },
    {
        question: 'Vegetable bed is to kitchen-garden so as',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'a',
        explanation: 'A vegetable bed is to a kitchen-garden so as sheep is to a flock ' +
            'because a vegetable bed is part of a kitchen-garden just the same as a sheep is part of a flock.',
        level: 1
    },
    {
        question: 'Pair is to two so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'f',
        explanation: 'A pair is to two so as a foe is to an enemy because when we say a pair, we can also say ' +
            'that this is two just the same as when we say a foe, we know that he/she is the enemy.',
        level: 1
    },
    {
        question: 'Word is to phraze so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'a',
        explanation: 'A word is to a phraze so as a sheep is to a flock ' +
            'because a word is part of a phraze just the same as a sheep is part of a flock.',
        level: 1
    },
    {
        question: 'Cheerful is to sluggish so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'd',
        explanation: 'Cheerful is to sluggish so as light is to darkness ' +
            'because cheerful is an opposite of sluggish just the same as light is opposite of darkness.',
        level: 1
    },
    {
        question: 'Freedom is to freewill as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'f',
        explanation: 'Freedom is to freewill so as a foe is to an enemy ' +
            'because freedom is the synonym of freewill just the same as a foe is the synonym of an enemy.',
        level: 1
    },
    {
        question: 'City is to country so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'c',
        explanation: 'A city is to a country so as the sea is to ocean because ' +
            'both a city and country are located on land just the same ' +
            'as the sea and the ocean both represent water.',
        level: 1
    },
    {
        question: 'Praise is to swearing so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'd',
        explanation: 'Praise is to swearing so as light is to darkness ' +
            'because praise is an opposite of swearing just the same as light is an opposite of darkness.',
        level: 1
    },
    {
        question: 'Vengeance is to arson so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'e',
        explanation: 'Vengeance is to arson so as poison is to death ' +
            'because when a person wants vengeance, he/she could make arson just ' +
            'the same as when a person wants somebody’s death, she/he can give poison to this person.',
        level: 1
    },
    {
        question: 'Ten is to number so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'b',
        explanation: 'Ten is to a number so as raspberry is to a berry ' +
            'because ten represents a number just the same as raspberry represents berry.',
        level: 1
    },
    {
        question: 'Cry is to weep so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'f',
        explanation: 'Cry is to weep so as a foe is to an enemy ' +
            'because cry is the synonym of weep just the same as a foe is the synonym of an enemy.',
        level: 1
    },
    {
        question: 'Chapter is to novel so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'a',
        explanation: 'A chapter is to a novel  so as a sheep is to a flock ' +
            'because a chapter is part of a novel just the same as a sheep is part of a flock.',
        level: 1
    },
    {
        question: 'Rest is to motion so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'd',
        explanation: 'Rest is to motion so as light is to darkness ' +
            'because rest is an opposite of motion just the same as light is an opposite of darkness.',
        level: 1
    },
    {
        question: 'Courage is to heroism so as...',
        answers: {
            a:	'sheep is to flock',
            b:	'raspberry is to berry',
            c:	'sea is to ocean',
            d:	'light is to darkness',
            e:	'poison is to death',
            f:	'foe  is to enemy'
        },
        correctAnswer: 'f',
        explanation: 'Courage is to heroism so as a foe is to an enemy ' +
            'because when a person has courage,he/she can show heroism just the same as ' +
            'when we say a foe, we know that he/she is the enemy.',
        level: 1
    },
];
