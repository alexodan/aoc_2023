import { readFileSync } from 'fs';

let total = 0;

readFileSync('./day4/input.txt', 'utf-8')
    .split('\n')
    .forEach((line) => {
        let power = -1;
        let points = 0;
        const [_, nums] = line.split(': ')
        const [winnersStr, myNumbersStr] = nums.split(' | ')
        const myNumbers = myNumbersStr.split(' ')
        winnersStr.split(' ').filter(Boolean).forEach(winnerNum => {
            if (myNumbers.includes(winnerNum.trim())) {
                power++;
                points = Math.pow(2, power);
            }
        });
        if (power >= 0) {
            total += points;
        }
    })

console.log('Expected: 13');
console.log('Actual: ', total);
