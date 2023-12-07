import { readFileSync } from "fs";

const [timeStr, distanceStr] = readFileSync("./day6/input.txt", "utf-8").split(
  "\n"
);

const times = getNumbers(timeStr)!;
const distances = getNumbers(distanceStr)!;

const combs = getRecordBreakCombinations(times, distances);
console.log(
  "total:",
  combs.reduce((a, b) => a * b, 1)
);

function getRecordBreakCombinations(
  times: number[],
  distances: number[]
): number[] {
  const output: number[] = [];
  if (times.length !== distances.length) {
    throw new Error("this should not happen");
  }
  for (let i = 0; i < times.length; i++) {
    let total = 0;
    const [time, distance] = [times[i], distances[i]];
    for (let i = 1; i < time; i++) {
      const dist = (time - i) * i;
      if (dist > distance) {
        total++;
      }
    }
    output.push(total);
  }
  return output;
}

function getNumbers(str: string) {
  return str
    .split(":")
    .at(1)
    ?.split(" ")
    .filter(Boolean)
    .map((s) => Number(s.trim()));
}
