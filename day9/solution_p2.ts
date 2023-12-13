import { readFileSync } from "fs";

const contents = readFileSync("./day9/input.txt", "utf-8");

const lines = contents.split("\n");

const sums = lines.map((line) => {
  const nums = line.split(" ").map(Number);
  const lastNums = [];

  let zeroSeq: number[] = [...nums];
  do {
    lastNums.push(zeroSeq[0]);
    for (let i = zeroSeq.length - 1; i > 0; i--) {
      zeroSeq[i] = zeroSeq[i] - zeroSeq[i - 1];
    }
    zeroSeq.splice(0, 1);
  } while (zeroSeq.find((n) => n !== 0));

  return lastNums.reverse().reduce((acc, val) => val - acc, 0);
});

console.log(
  "Sums:",
  sums.reduce((a, b) => a + b, 0)
);
