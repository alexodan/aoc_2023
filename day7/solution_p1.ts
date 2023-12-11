import { readFileSync } from "fs";

const lines = readFileSync("./day7/input.txt", "utf-8").split("\n");

const cardPoints = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const ranks = {
  "five-of-a-kind": 5,
  "four-of-a-kind": 4,
  "full-house": 3,
  "three-of-a-kind": 2,
  "two-pair": 1,
  "one-pair": 0,
};

function getRank(hand: string): number {
  const map = new Map<string, number>();
  hand.split("").forEach((char) => {
    const c = map.get(char);
    if (c) {
      map.set(char, c + 1);
    } else {
      map.set(char, 1);
    }
  });
  const size = map.size;
  if (size === 1) return ranks["five-of-a-kind"];
  if (size === 2) {
    // either poker or full house
    const isFourOfKind = Array.from(map.values()).find((n) => n === 4);
    return isFourOfKind ? ranks["four-of-a-kind"] : ranks["full-house"];
  }
  if (size === 3) {
    // either two pair or three of a kind
    const isThreeOfKind = Array.from(map.values()).find((n) => n === 3);
    return isThreeOfKind ? ranks["three-of-a-kind"] : ranks["two-pair"];
  }
  if (size === 4) {
    return ranks["one-pair"];
  }
  return -1;
}

function compareHands(hand1: string, hand2: string): number {
  const rank1 = getRank(hand1);
  const rank2 = getRank(hand2);
  if (rank1 === rank2) {
    return compareHigherCard(hand1, hand2);
  }
  return rank1 - rank2;
}

function compareHigherCard(hand1: string, hand2: string): number {
  type K = keyof typeof cardPoints;
  const sortH1 = hand1.split("").map((c) => cardPoints[c as K]);
  const sortH2 = hand2.split("").map((c) => cardPoints[c as K]);
  for (let i = 0; i < sortH1.length; i++) {
    if (sortH1[i] === sortH2[i]) {
      continue;
    }
    return sortH1[i] - sortH2[i];
  }
  return 0;
}

function compareLines(line1: string, line2: string): number {
  const hand1 = line1.split(" ")[0];
  const hand2 = line2.split(" ")[0];
  return compareHands(hand1, hand2);
}

const bids = lines.toSorted(compareLines).map((line, index) => {
  const bid = Number(line.split(" ")[1]);
  return { line, total: bid * (index + 1) };
});

const total = bids.map((bid) => bid.total).reduce((a, b) => a + b, 0);

console.log("total:", total);
