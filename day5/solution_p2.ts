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

function getSeedsFromPairs(seedPairs: number[]): number[] {
  const seeds: number[] = [];
  for (let i = 0; i < seedPairs.length - 1; i += 2) {
    const [seed, count] = [seedPairs[i], seedPairs[i + 1]];
    seeds.push(...Array.from({ length: count }, (_, i) => seed + i));
  }
  return seeds;
}

const locations = new Map<number, number>();

function solution() {
  const seedPairs = getSeeds(seedsLine.trim());
  const seeds = getSeedsFromPairs(seedPairs.slice(0, 2));
  console.log(seeds);
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
