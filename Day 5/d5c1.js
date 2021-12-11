const funcs = require('../shared/functions');
const fs = require('fs');
require('dotenv').config();

const main = async () => {
  let input = await funcs.input.get(5);
  const testInput = [
    '0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2',
  ];
  // input = testInput;
  // input = input.slice(0, 5);
  let intersections = 0;

  let matrix = [];

  input.forEach((pair) => {
    const split = pair.split(' ');
    const pointA = split[0].split(',');
    const pointB = split[2].split(',');
    if (pointA[0] === pointB[0] || pointA[1] === pointB[1]) {
      console.log(pointA, pointB);
      x1 = Number(pointA[0]);
      x2 = Number(pointA[1]);
      y1 = Number(pointB[0]);
      y2 = Number(pointB[1]);
      let xPosition = Math.min(x1, y1);
      const xDest = Math.max(x1, y1);
      let yPosition = Math.min(x2, y2);
      const yDest = Math.max(x2, y2);
      while (xPosition <= xDest || yPosition <= yDest) {
        if (matrix[yPosition] === undefined) {
          matrix[yPosition] = [];
        }
        let numLines = matrix[yPosition][xPosition];
        if (numLines === undefined) {
          matrix[yPosition][xPosition] = 1;
          numLines = 1;
        } else {
          numLines++;
          matrix[yPosition][xPosition] = numLines;
        }
        if (numLines === 2) {
          intersections++;
        }
        if (yPosition === yDest && xPosition === xDest) {
          yPosition++;
          xPosition++;
        }
        if (xPosition !== xDest) {
          xPosition++;
        }
        if (yPosition !== yDest) {
          yPosition++;
        }
      }
    } else {
      return;
    }
  });
  return intersections;
};

main(); //?

module.exports = main;
