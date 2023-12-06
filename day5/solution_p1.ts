import { readFileSync } from "fs";

const seeds = readFileSync("./day5/input.txt", "utf-8");

const [
  seedsLine,
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerToWaterMap,
  waterToLightMap,
  lightToTempMap,
  tempToHumidityMap,
  humidityToLocationMap,
] = seeds.split("\n\n");

function getSeeds(str: string): number[] {
  const [_, seeds] = str.split(": ");
  return seeds.split(" ").map(Number);
}

function getLineMap(str: string): Array<number[]> {
  const [_, ...mapNumbers] = str.split("\n");
  return mapNumbers.map((numbersStr) => {
    return numbersStr.split(" ").map(Number);
  });
}

function isInRange(n: number, start: number, end: number) {
  return n >= start && n <= end;
}

const locations = new Map<number, number>();

function solution() {
  const seeds = getSeeds(seedsLine.trim());
  seeds.forEach((seed) => {
    let nextLocation = seed;
    [
      seedToSoilMap,
      soilToFertilizerMap,
      fertilizerToWaterMap,
      waterToLightMap,
      lightToTempMap,
      tempToHumidityMap,
      humidityToLocationMap,
    ].forEach((map) => {
      const listOfMapNumbers = getLineMap(map);
      // find closest location
      for (const mapNumbers of listOfMapNumbers) {
        const [destination, source, range] = mapNumbers;
        if (isInRange(nextLocation, source, source + range - 1)) {
          nextLocation = nextLocation + (destination - source);
          locations.set(seed, nextLocation);
          break;
        } else {
          locations.set(seed, nextLocation);
        }
      }
    });
  });
}

solution();

console.log(
  Array.from(locations.values())
    .sort((a, b) => a - b)
    .at(0)
);
