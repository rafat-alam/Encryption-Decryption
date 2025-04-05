const originalList = ['C', '?', 'T', 'f', 'o', 'V', '4', 'W', 'S', 'n', 'w', '>', 'Y', '9', 'X', 'z', '&', '.', 'd', ')', 'x', '2', '$', 'L', '[', 'Z', '`', '<', 'E', 'e', '~', 'i', 'I', 'k', 'j', '=', ':', 'A', 'b', '_', 'z#x#x', 'Q', '5', 'g', '7', '1', 'l', '+', ']', '{', 'c', '(', 'D', 'r', 'N', '|', ';', '8', '@', 'v', '\\', 'G', '-', '"', 'H', 'O', '}', 'p', ',', 'y', "'", '6', '^', '*', 'B', 'K', 'P', 'R', 'M', 's', 'a', '%', '3', 'u', 'U', 't', 'q', '/', 'J', '!', 'h', 'F', 'm', '0', '#', 'z#y#y'];

// Documentation Section
// 1. We are going to call start.
// 2. Then are going to distribute aur original list into Groups [12 - Groups].
// 3. The work done in step 2 is done by distributeListContiniously.
// 4. Then we call generate dearrangements for each group.


function distributeListContinuously(lst, numGroups) {
  if (numGroups <= 0) throw new Error("Number of groups must be positive.");

  const groupSize = Math.floor(lst.length / numGroups);
  const remainder = lst.length % numGroups;
  const groups = [];

  let startIndex = 0;
  for (let i = 0; i < numGroups; i++) {
    const currentGroupSize = groupSize + (i < remainder ? 1 : 0);
    groups.push(lst.slice(startIndex, startIndex + currentGroupSize));
    startIndex += currentGroupSize;
  }

  return groups;
}

function generateDerangements(lst) {
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
        generate([...current, nextElem], [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      }
    }
  }

  generate([], lst);
  return results;
}

function searchR(matrix, target) {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row].includes(target)) return row;
  }
  return null;
}

function searchC(matrix, target) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === target) return col;
    }
  }
  return null;
}

function searchFlat(arr, target) {
  return arr.indexOf(target);
}

function split48DigitInteger(input) {
  if (input.length !== 48) throw new Error("Input must be exactly 48 digits long.");
  const b = [];
  for (let i = 0; i < 48; i += 4) {
    b.push(parseInt(input.slice(i, i + 4)));
  }
  return b;
}

function encrypt(msg, secretCode, groups, derangements) {
  const b = split48DigitInteger(secretCode);
  let encoded = "";
  for (let char of msg) {
    let ch = (char === " ") ? "z#y#y" : char;
    const r = searchR(groups, ch);
    const c = searchC(groups, ch);
    if (r === null || c === null || !derangements[r][b[r]]) return "Invalid input";
    encoded += derangements[r][b[r]][c];
  }
  return encoded;
}

function decrypt(msg, secretCode, groups, derangements) {
  const b = split48DigitInteger(secretCode);
  let decoded = "";
  let i = 0;
  while (i < msg.length) {
    let ch = msg[i];
    let index = originalList.indexOf(ch);
    if (index === -1) return "Invalid character in encoded message";
    for (let r = 0; r < groups.length; r++) {
      const der = derangements[r][b[r]];
      const pos = searchFlat(der, ch);
      if (pos !== -1) {
        let originalChar = groups[r][pos];
        decoded += (originalChar === "z#y#y") ? " " : originalChar;
        break;
      }
    }
    i++;
  }
  return decoded;
}

const groups = distributeListContinuously(originalList, 12);
const allDerangements = groups.map(group => generateDerangements(group));

// Server side programming....
// From HERE -----------------

let baseUrl = "http://localhost:6777";
let axios = require('axios');

// Setting Express
const express = require("express");
const app = express();

// Port Number
const port = 6777;

async function fetch_get(url) {
  try {
    let res = await axios.get(url);
    return res;
  } catch(e) {
    return e;
  }
}

// Setting other types of Requests
app.use(express.urlencoded({extended : true}));

// Encryption
app.post("/encrypt", (req, res) => {
  let {msg, code} = req.body;
  const encryptedMessage = encrypt(msg, code, groups, allDerangements);
  res.send(encryptedMessage);
});

// Decryption
app.post("/decrypt", (req, res) => {
  let {emsg, code} = req.body;
  const msg = decrypt(emsg, code, groups, allDerangements);
  res.send(msg);
});

// Random Traffic
app.get("/update", (req, res) => {
  res.send("Server running check every second.");
});

// Listening on Port for Request
app.listen(port, () => {
  console.log(`Server is running on ${baseUrl}`);
});

async function repeatFunction() {
  let url = `${baseUrl}/update`;
  let res = await fetch_get(url);
  console.log(res.data);
}
// setInterval(repeatFunction, 1000);