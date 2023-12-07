import { readFileSync } from "fs";

const [timeStr, distanceStr] = readFileSync("./day6/input.txt", "utf-8").split(
  "\n"
);

const time = getNumber(timeStr)!;
const distance = getNumber(distanceStr)!;

const total = getRecordBreakCombinations(time, distance);
console.log("total:", total);

function getRecordBreakCombinations(time: number, distance: number): number {
  const output: number[] = [];
  let total = 0;
  for (let i = 1; i < time; i++) {
    const dist = (time - i) * i;
    if (dist > distance) {
      total++;
    }
  }
  return total;
}

function getNumber(str: string) {
  return Number(str.split(":").at(1)?.split(" ").filter(Boolean).join(""));
}
