function distributeListContinuously(lst, numGroups) {
  if (numGroups <= 0) {
      throw new Error("Number of groups must be positive.");
  }

  const groupSize = Math.floor(lst.length / numGroups);
  const remainder = lst.length % numGroups;
  const groups = [];
  let startIndex = 0;

  for (let i = 0; i < numGroups; i++) {
      const currentGroupSize = groupSize + (i < remainder ? 1 : 0);
      const group = lst.slice(startIndex, startIndex + currentGroupSize);
      groups.push(group);
      startIndex += currentGroupSize;
  }

  return groups;
}

function derangements(lst) {
  if (lst.length <= 1) return [];

  const results = [];

  function generate(current, remaining) {
      if (remaining.length === 0) {
          results.push(current);
          return;
      }

      for (let i = 0; i < remaining.length; i++) {
          const nextElem = remaining[i];
          if (nextElem !== lst[current.length]) {
              const newCurrent = current.concat([nextElem]);
              const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
              generate(newCurrent, newRemaining);
          }
      }
  }

  generate([], lst);
  return results;
}

const originalList = ['C', '?', 'T', 'f', 'o', 'V', '4', 'W', 'S', 'n', 'w', '>', 'Y', '9', 'X', 'z', '&', '.', 'd', ')', 'x', '2', '$', 'L', '[', 'Z', '`', '<', 'E', 'e', '~', 'i', 'I', 'k', 'j', '=', ':', 'A', 'b', '_', 'z#x#x', 'Q', '5', 'g', '7', '1', 'l', '+', ']', '{', 'c', '(', 'D', 'r', 'N', '|', ';', '8', '@', 'v', '\\', 'G', '-', '"', 'H', 'O', '}', 'p', ',', 'y', "'", '6', '^', '*', 'B', 'K', 'P', 'R', 'M', 's', 'a', '%', '3', 'u', 'U', 't', 'q', '/', 'J', '!', 'h', 'F', 'm', '0', '#', 'z#y#y'];
const numGroups = 12;
const distributedGroups = distributeListContinuously(originalList, numGroups);

const allDerangements = Array(16).fill().map((_, i) => derangements(distributedGroups[i] || []));

const b = Array(16).fill(0);

function split48DigitInteger(input_integer) {
  const segments = [];
  for (let i = 0; i < 48; i += 4) {
      segments.push(parseInt(input_integer.slice(i, i + 4)));
  }

  for (let i = 0; i < 12; i++) {
      b[i] = segments[i];
  }
}

function searchr(matrix, target) {
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      if (matrix[rowIndex].includes(target)) {
          return rowIndex;
      }
  }
  return null;
}

function searchc(matrix, target) {
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const colIndex = matrix[rowIndex].indexOf(target);
      if (colIndex !== -1) {
          return colIndex;
      }
  }
  return null;
}

function run(choice) {
  const prompt = require('prompt-sync')();

  if (choice === 1) {
      const msg = prompt("Enter message : ");
      const input_integer = prompt("Enter 48 digits of secret code : ");
      split48DigitInteger(input_integer);

      let output = "Secret Code : ";
      for (let i = 0; i < msg.length; i++) {
          const char = msg[i];
          if (char === " ") {
              const k = "z#y#y";
              const row = searchr(distributedGroups, k);
              const col = searchc(distributedGroups, k);
              output += allDerangements[row][b[row]][col];
          } else {
              const row = searchr(distributedGroups, char);
              const col = searchc(distributedGroups, char);
              output += allDerangements[row][b[row]][col];
          }
      }
      console.log(output);

  } else if (choice === 2) {
      const msg = prompt("Enter message : ");
      const input_integer = prompt("Enter 48 digits of secret code : ");
      split48DigitInteger(input_integer);

      console.log("Secret Code : ");
      let i = 0;
      const j = msg.length - 1;

      function search(arr, val) {
          return arr.indexOf(val);
      }

      function printf(txt) {
          process.stdout.write(txt === "z#y#y" ? " " : txt);
      }

      function error() {
          console.log("You wrote the wrong code or message...");
      }

      while (i <= j) {
          if ((msg[i] === "z" && msg[i + 1] === "#" && msg[i + 3] === "#") &&
              ((msg[i + 2] === "y" || msg[i + 2] === "x") && (msg[i + 4] === "y" || msg[i + 4] === "x"))) {
              if (msg[i + 2] === "y") {
                  try {
                      printf(distributedGroups[searchr(distributedGroups, "z#y#y")][
                          search(allDerangements[searchr(distributedGroups, "z#y#y")][b[searchr(distributedGroups, msg[i])]], "z#y#y")
                      ]);
                  } catch (e) {
                      error(); break;
                  }
                  i += 4;
              } else {
                  try {
                      printf(distributedGroups[searchr(distributedGroups, "z#x#x")][
                          search(allDerangements[searchr(distributedGroups, "z#x#x")][b[searchr(distributedGroups, msg[i])]], "z#x#x")
                      ]);
                  } catch (e) {
                      error(); break;
                  }
                  i += 4;
              }
          } else {
              try {
                  printf(distributedGroups[searchr(distributedGroups, msg[i])][
                      search(allDerangements[searchr(distributedGroups, msg[i])][b[searchr(distributedGroups, msg[i])]], msg[i])
                  ]);
              } catch (e) {
                  error(); break;
              }
          }
          i++;
      }
  } else {
      start();
  }
}

function start() {
  const prompt = require('prompt-sync')();
  console.log("1. Encrypt");
  console.log("2. Decrypt");
  const choice = parseInt(prompt("Enter your choice number : "));
  run(choice);
}

start();
