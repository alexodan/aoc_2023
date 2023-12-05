import { readFileSync } from 'fs';

let total = 0;
let cards: Record<number, number> = {};

readFileSync('./day4/input.txt', 'utf-8')
    .split('\n')
    .forEach((line, lineIndex) => {
        let matches = 0;
        cards[lineIndex+1] = cards[lineIndex+1] ? cards[lineIndex+1] + 1 : 1;
        const [_, nums] = line.split(': ')
        const [winnersStr, myNumbersStr] = nums.split(' | ')
        const myNumbers = myNumbersStr.split(' ')
        winnersStr.split(' ').filter(Boolean).forEach(winnerNum => {
            if (myNumbers.includes(winnerNum.trim())) {
                matches++;
            }
        });
        for (let i = 0; i < matches; i++) {
            const current = lineIndex + 1;
            for (let j = 0; j < cards[current]; j++) {
                cards[current+i+1] = (cards[current+i+1] ?? 0) + 1;
            }
        }
    })

console.log('Expected: 30');
console.log('Actual: ', Object.values(cards).reduce((a, b)=>a+b, 0));
