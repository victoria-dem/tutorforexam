const math = [
    {
        question: 'Calculate the sum of the exterior angles of a regular decagon.',
        answers: {
            0: 144,
            1: 36,
            2: 360,
            3: 630,
            4: 3600
        },
        correctAnswer: 2,
        solution: 'The sum of exterior angles of a regular polygon is always 360. ' +
            'As the regular decagon is a regular polygon, the sum its exterior angles will be 360.',
        level: 1,
        hints: ['The sum of the exterior angles of a regular polygon is always a constant.'],
        topic: 'Angles in Polygon'
    },
    {
        question: 'Measure of each interior angle of a regular nonagon in degrees is given by',
        answers: {
            0: 40,
            1: 220,
            2: 140,
            3: 9,
            4: 360
        },
        correctAnswer: 2,
        solution: 'The exterior and interior angles of a nonagon are supplementary and ' +
            'the measure of an exterior angle of a polygon is 360/the number of sides of a polygon. ' +
            'Since a regular nonagon has 9 equal sides, the measure of an exterior angle will ' +
            'be equal to 360/9 or 40. The measure of an interior angle of a nonagon ' +
            'will thus be equal to 180 – 40 or 140.',
        level: 2,
        hints: ['The sum of the exterior angles of a polygon is 3600 and the interior ' +
        'angle is supplementary to an exterior angle.'],
        topic: 'Angles in Polygon'
    },
    {
        question: 'If the size of an interior angle of a regular polygon is 1200, then the polygon is called',
        answers: {
            0: 'Hexagon',
            1: 'Octagon',
            2: 'Triangle',
            3: 'Pentagon'
        },
        correctAnswer: 0,
        solution: 'The exterior and interior angles of a polygon are supplementary. ' +
            'The measure of an interior angle of a regular polygon is equal to 180 – 120 or 60. ' +
            'The number of sides of a regular polygon is obtained by dividing 360 by ' +
            'the measure of an exterior angle. The number of sides of the required polygon ' +
            'will be 360/60 or 6. We know that a polygon with six sides is called a hexagon. ',
        level: 3,
        hints: ['The sum of the exterior angles of a regular polygon is 360',
            'Number of sides of a regular polygon = 360/Exterior angle.' ],
        topic: 'Angles in Polygon'
    },
    {
        question: 'Which of the following statements is/are true? ' +
            'Statement 1: The measure of an exterior angle of a regular octagon is 45.' +
            'Statement 2: The sum of all the interior angles of a regular octagon is 1080.',
        answers: {
            0: 'Only Statement 1 is true',
            1: 'Only Statement 2 is true',
            2: 'Both Statement 1 and Statement 2 are true',
            3: 'Neither Statement 1 nor Statement 2 is correct'
        },
        correctAnswer: 2,
        solution: 'The measure of an exterior angle of a polygon is equal to 360/number of sides. ' +
            'As a regular octagon has 8 sides, the measure of an exterior angle will be 360/8 or 45. ' +
            'This result makes statement 1 as true. The exterior and interior angles of a polygon are ' +
            'supplementary. The measure of an interior angle will be equal to 180 – 45 or 135. ' +
            'The sum of the interior angles of a regular polygon with n sides is the product ' +
            'of the number of sides and the measure of an interior angle. The sum of interior ' +
            'angles of a regular octagon is equal to 8*135 or 1080. We have thus proved ' +
            'that the Statement 2 is also true.',
        level: 4,
        hints: ['Sum of the exterior angles of a regular polygon is 360',
            'Measure of an exterior angle of a regular polygon = 360/Number of sides',
            'Sum of an exterior angle and an interior angle at any vertex of a regular polygon is equal to 1800'],
        topic: 'Angles in Polygon'
    },
    {
        question: 'A leather bag contains 12 balls of which 3 are red, ' +
            '5 are blue and the rest are pink. If a ball is drawn at random, ' +
            'find the probability that the ball is not blue.',
        answers: {
            0:	'7/12',
            1:	'5/12',
            2:	'5/8',
            3:	'2/3',
            4:	'1/5'
        },
        correctAnswer: 0,
        solution: 'When a ball is drawn at random it can be any of the 12 balls in the bag. ' +
            'So the total number of possible outcomes is 12. The favorable outcome is that ' +
            'the ball drawn is not blue. Out of the 12 balls only 5 are blue, so there are ' +
            '7 balls which are not blue colored. So the number of favorable outcomes is 7. ' +
            'Therefore, probability = 7/12.',
        level: 1,
        hints: ['Probability = (Number of favorable outcomes)/(Total number of possible outcomes)'],
        topic: 'Probability'
    }
]
