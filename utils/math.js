export const parOpen='<p class="quiz__paragraph">'
export const parClose='</p>'
export const strongOpen='<span class="quiz__paragraph_type">'
export const strongClose='</span>'
export const math = [
    {
        question: `Calculate the sum of the exterior angles of a regular decagon.`,
        answers: {
            0: 144,
            1: 36,
            2: 360,
            3: 630,
            4: 3600
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}The sum of exterior angles of a regular polygon is always 360.
        As the regular decagon is a regular polygon, the sum its exterior angles will be 360.${parClose}`,
        level: 1,
        hints: [`The sum of the exterior angles of a regular polygon is always a constant.`],
        topic: 'Angles in Polygon'
    },
    {
        question: `Measure of each interior angle of a regular nonagon in degrees is given by`,
        answers: {
            0: 40,
            1: 220,
            2: 140,
            3: 9,
            4: 360
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}The exterior and interior angles of a nonagon are supplementary and
        the measure of an exterior angle of a polygon is 360/the number of sides of a polygon.
        Since a regular nonagon has 9 equal sides, the measure of an exterior angle will
        be equal to 360/9 or 40.${parClose}
        ${parOpen}The measure of an interior angle of a nonagon
        will thus be equal to 180 – 40 or 140.${parClose}`,
        level: 2,
        hints: [`The sum of the exterior angles of a polygon is 3600 and
        the interior angle is supplementary to an exterior angle.`],
        topic: 'Angles in Polygon'
    },
    {
        question: `If the size of an interior angle of a regular polygon is 1200, then the polygon is called`,
        answers: {
            0: 'Hexagon',
            1: 'Octagon',
            2: 'Triangle',
            3: 'Pentagon'
        },
        correctAnswer: 0,
        solution: `
        ${parOpen}The exterior and interior angles of a polygon are supplementary.
        The measure of an interior angle of a regular polygon is equal to 180 – 120 or 60.
        The number of sides of a regular polygon is obtained by dividing 360 by
        the measure of an exterior angle. The number of sides of the required
        polygon will be 360/60 or 6.${parClose}
        ${parOpen}We know that a polygon with six sides is called a hexagon.${parClose}`,
        level: 3,
        hints: [`The sum of the exterior angles of a regular polygon is 360`,
            `Number of sides of a regular polygon = 360/Exterior angle.` ],
        topic: 'Angles in Polygon'
    },
    {
        question: `
        ${parOpen}Which of the following statements is/are true?${parClose}
        ${parOpen}${strongOpen}Statement 1:${strongClose} The measure of an exterior angle of a regular octagon is 45.${parClose}
        ${parOpen}${strongOpen}Statement 2:${strongClose} The sum of all the interior angles of a regular octagon is 1080.${parClose}`,
        answers: {
            0: 'Only Statement 1 is true',
            1: 'Only Statement 2 is true',
            2: 'Both Statement 1 and Statement 2 are true',
            3: 'Neither Statement 1 nor Statement 2 is correct'
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}The measure of an exterior angle of a polygon is equal to 360/number of sides.
        As a regular octagon has 8 sides, the measure of an exterior angle will be 360/8 or 45.
        This result makes statement 1 as true.${parClose}
        ${parOpen}The exterior and interior angles of a polygon are supplementary.
        The measure of an interior angle will be equal to 180 – 45 or 135.
        The sum of the interior angles of a regular polygon with n sides is the product
        of the number of sides and the measure of an interior angle. The sum of interior
        angles of a regular octagon is equal to 8*135 or 1080.
        We have thus proved that the Statement 2 is also true.${parClose}`,
        level: 4,
        hints: [`Sum of the exterior angles of a regular polygon is 360`,
            `Measure of an exterior angle of a regular polygon = 360/Number of sides`,
            `Sum of an exterior angle and an interior angle at any vertex of a regular polygon is equal to 1800`],
        topic: 'Angles in Polygon'
    },
    {
        question: `A leather bag contains 12 balls of which 3 are red,
        5 are blue and the rest are pink. If a ball is drawn at random,
        find the probability that the ball is not blue.`,
        answers: {
            0:	'7/12',
            1:	'5/12',
            2:	'5/8',
            3:	'2/3',
            4:	'1/5'
        },
        correctAnswer: 0,
        solution: `
        ${parOpen}When a ball is drawn at random it can be any of the 12 balls in the bag.
        So the total number of possible outcomes is 12. The favorable outcome is that
        the ball drawn is not blue. Out of the 12 balls only 5 are blue, so there are
        7 balls which are not blue colored. So the number of favorable outcomes is 7.${parClose}
        ${parOpen}Therefore, probability = 7/12${parClose}`,
        level: 1,
        hints: [`Probability = (Number of favorable outcomes)/(Total number of possible outcomes)`],
        topic: 'Probability'
    },
    {
        question: `What is the probability of getting a sum greater than 11 when a pair of dice is thrown?`,
        answers: {
            0:	'1/36',
            1:	'3/12',
            2:	'1/12',
            3:	'1/24',
            4:	'None of these'
        },
        correctAnswer: 0,
        solution: `
        ${parOpen}Probability = (Number of favorable outcomes)/(Total number of possible outcomes)${parClose}
        ${parOpen}The total number of possible outcomes when a die is thrown is 6, i.e.
        the outcome can be any of the numbers from 1 to 6.
        When a pair of dice is thrown the outcomes can be any of the following set${parClose}
        ${parOpen}{(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (2,1) ...... (6, 5), (6,6)}${parClose}
        So, the total number of possible outcomes when a pair of dice is thrown is 36.
        ${parOpen}The favorable outcome is getting a sum greater than 11 when a pair of dice is thrown.${parClose}
        ${parOpen}The only favorable outcome is {(6, 6)}${parClose}
        ${parOpen}So, the number of favorable outcomes is 1. Therefore, the probability = 1/36${parClose}
        `,
        level: 0,
        hints: [`The number of outcomes when a pair of dice is thrown is 36`, `Probability = (Number of favorable outcomes)/(Total number of possible outcomes)`],
        topic: 'Probability'
    },
    {
        question: `Find the probability that a number chosen randomly from the numbers 1 to 7 is divisible by 2`,
        answers: {
            0:	'1/2',
            1:	'3/4',
            2:	'3/7',
            3:	'5/8',
            4:	'1/4'
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}Probability = (Number of favorable outcomes)/(Total number of possible outcomes)${parClose}
        ${parOpen}The number chosen randomly from the numbers 1 to 7 can be any of the following set${parClose}
        ${parOpen}{1, 2, 3, 4, 5, 6, 7}${parClose}
        ${parOpen}So, the total number of possible outcomes is 7.${parClose}
        ${parOpen}The favorable outcome is that the number chosen randomly is divisible by 2.
        The favorable outcomes are${parClose}
        ${parOpen}{2, 4, 6}${parClose}
        ${parOpen}So, the number of favorable outcomes is 3. Therefore, the probability = 3/7.${parClose}
        `,
        level: 0,
        hints: [`Probability = (Number of favorable outcomes)/(Total number of possible outcomes)`],
        topic: 'Probability'
    },
    {
        question: `If a total of 32 countries are fighting for a trophy and 14
        are from Europe, find the probability that a European country wins the trophy`,
        answers: {
            0:	'0.56',
            1:	'0.75',
            2:	'0.44',
            3:	'0.14',
            4:	'0.18'
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}Probability = (Number of favorable outcomes)/(Total number of possible outcomes)${parClose}
        ${parOpen}The country winning the trophy can be any of the 32 countries. So the total number of possible outcomes is 32.
        The favorable outcome is that the country winning the trophy is from Europe.
        Since there are 14 European countries the number of favorable outcomes is 14.${parClose}
        ${parOpen}Therefore, the probability = 14/32 = 7/16 = 0.44${parClose}
        `,
        level: 0,
        hints: [`Probability = (Number of favorable outcomes)/(Total number of possible outcomes)`],
        topic: 'Probability'
    },
    {
        question: `Which of the following is NOT a prime number?`,
        answers: {
            0:	'31',
            1:	'13',
            2:	'17',
            3:	'27',
            4:	'Both 31 and 13'
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}To find whether a given number is a prime number or not, divide the given number with the
        prime numbers less than or equal to the square root of the nearest perfect square greater
        than or equal to the given number. If any of the divisions gives the remainder as 0,
        then the given number is not a prime.${parClose}
        ${parOpen}Consider option "31"${parClose}
        ${parOpen}31/2 = 15 with remainder 1${parClose}
        ${parOpen}31/3 = 10 with remainder 1${parClose}
        ${parOpen}31/5 = 6 with remainder 1${parClose}
        ${parOpen}Because none of the divisions gives the remainder as 0, 31 is a prime number.${parClose}
        ${parOpen}Consider option "13"${parClose}
        ${parOpen}13/2 = 6 with remainder 1${parClose}
        ${parOpen}13/3 = 4 with remainder 1${parClose}
        ${parOpen}Because none of the divisions gives the remainder as 0, 13 is also a prime number.${parClose}
        ${parOpen}Consider option "17"${parClose}
        ${parOpen}17/2 = 8 with remainder${parClose}
        ${parOpen}17/3 = 5 with remainder${parClose}
        ${parOpen}Because none of the divisions gives the remainder as 0, 17 is also a prime number.${parClose}
        ${parOpen}Take the case of option "27"${parClose}
        ${parOpen}27/2 = 13 with remainder 1${parClose}
        ${parOpen}27/3 = 9 with remainder 0${parClose}
        ${parOpen}Since a prime number has no factors other than 1 and the number itself, 27 is not a prime number.${parClose}
        `,
        level: 1,
        hints: [`A prime number has no factors other than 1 and the number itself`],
        topic: 'Prime Numbers'
    },
    {
        question: `
        ${parOpen}Which among the following is true for the statements given below?${parOpen}
        ${parOpen}Statement 1: All odd numbers in the first ten natural numbers are prime.${parOpen}
        ${parOpen}Statement 2: The smallest prime number is 2.${parOpen}
        `,
        answers: {
            0:	'Only statement 1 is correct',
            1:	'Only statement 2 is correct',
            2:	'Both statements are correct',
            3:	'Both statements are wrong',
            4:	'Statements 1 and 2 are interrelated'
        },
        correctAnswer: 1,
        solution: `
        ${parOpen}Consider the first statement.${parClose}
        ${parOpen}The odd numbers in the first ten natural numbers are 1, 3, 5, 7 and 9.
        We know 1 is not a prime by the definition of prime numbers.
        To find whether a given number is a prime number or not, divide the given number
        with the prime numbers less than or equal to the square root of the nearest perfect square
        greater than or equal to the given number. If any of the divisions gives
        the remainder as 0, then the given number is not a prime.${parClose}
        ${parOpen}3/2 = 1 with remainder 1${parClose}
        ${parOpen}5/2 = 2 with remainder 1${parClose}
        ${parOpen}5/3 = 1 with remainder 2${parClose}
        ${parOpen}7/2 = 3 with remainder 1${parClose}
        ${parOpen}7/3 = 2 with remainder 1${parClose}
        ${parOpen}9/2 = 4 with remainder 1${parClose}
        ${parOpen}9/3 = 3 with remainder 0${parClose}
        ${parOpen}Since a prime number has no factors other than 1 and the number itself,
        9 is not a prime number. Therefore, the statement 1 is wrong.
        Consider the second statement.${parClose}
        ${parOpen}In the case of 1, it is neither prime nor composite.${parClose}
        ${parOpen}Take 2, it has no other factors than 1 and the number itself. So 2 is the smallest prime number.${parClose}
        `,
        level: 2,
        hints: [`A prime number has no factors other than 1 and the number itself`],
        topic: 'Prime Numbers'
    },
    {
        question: `Roger invested $ 200 for 3 years at an interest rate of 0.25.
        How much will he receive at the end of three years?`,
        answers: {
            0:	'$305',
            1:	'$205',
            2:	'$350',
            3:	'$300',
            4:	'$275'
        },
        correctAnswer: 2,
        solution: `
        ${parOpen}Principal amount = $ 200${parClose}
        ${parOpen}Interest rate = 0.25${parClose}
        ${parOpen}Time = 3 years${parClose}
        ${parOpen}Interest = (Principal) * (Interest rate (in decimal)) * (Time)${parClose}
        ${parOpen}= $ 200 * 0.25 * 3${parClose}
        ${parOpen}= $ 150 The total amount Roger will receive after 3 years = (Principal amount) + (Interest for three years)${parClose}
        ${parOpen}= $ 200 + $ 150${parClose}
        ${parOpen}= $ 350${parClose}
        `,
        level: 0,
        hints: [`Interest = (Principal) * (Interest rate (in decimal)) * (Time)`],
        topic: 'Investment Problems'
    },
    {
        question: `John invested $ 450 for 2 years and received $ 675 after
        the end of the period. What had been the interest rate?`,
        answers: {
            0:	'0.20',
            1:	'0.25',
            2:	'0.17',
            3:	'0.34',
            4:	'0.22'
        },
        correctAnswer: 1,
        solution:
            `
        ${parOpen}Principal amount = $ 450${parClose}
        ${parOpen}Received amount = $ 675${parClose}
        ${parOpen}Time = 2 years${parClose}
        ${parOpen}Interest = (Received amount) – (Principal amount)${parClose}
        ${parOpen}= $ 675 –$ 450 = $ 225${parClose}
        ${parOpen}Interest = (Principal) * (Interest rate (in decimal)) * (Time)${parClose}
        ${parOpen}$ 225 = $ 450 * Interest rate * 2${parClose}
        ${parOpen}Interest rate = $ 225/($ 450 * 2) = ($ 225)/($ 900) = 0.25${parClose}
        `,
        level: 0,
        hints: ['Interest = (Principal) * (Interest rate (in decimal)) * (Time)'],
        topic: 'Investment Problems'
    }
]
