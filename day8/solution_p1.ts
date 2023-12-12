import { readFileSync } from "fs";

const file = readFileSync("./day8/input.txt", "utf-8");

const [instructionsStr, mapStr] = file.split("\n\n");

const map = new Map<string, { L: string; R: string }>();

const mapLines = mapStr.trim().split("\n");

for (let i = 0; i < mapLines.length; i++) {
  const [key, instrLine] = mapLines[i].split(" = ");
  map.set(key, {
    L: instrLine.substring(1, 4),
    R: instrLine.substring(6, 9),
  });
}

let current = "AAA";
let wayTracker = 0;
let stepsToZZZ = 0;
const instructions = instructionsStr.trim(); // 'RL', 'LLR'

while (current !== "ZZZ") {
  const way = instructions[wayTracker] as "L" | "R";

  current = map.get(current)![way];

  stepsToZZZ++;
  wayTracker = (wayTracker + 1) % instructions.length;
}

console.log("Steps:", stepsToZZZ);
