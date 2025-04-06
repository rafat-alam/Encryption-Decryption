let b = [
  ['j', 's', 'B', 'K', 'T', 'ú', '&', '[', '>'],
  ['6', 'a', 'b', 't', 'C', 'L', 'U', '~', '*'],
  ['}', '.', '7', 'k', 'c', 'l', 'D', 'M', 'V'],
  ['`', '(', ']', '?', '8', 'u', 'd', 'm', 'v'],
  ['E', 'W', '!', ')', ':', '/', '9', 'e', 'n'],
  ['N', 'w', 'F', 'O', '@', '_', ';', '1', '0'],
  ['X', 'f', 'o', 'x', 'G', 'P', 'Y', '-', '"'],
  ['2', 'á', '#', 'g', 'p', 'y', 'H', 'Q', 'Z'],
  ['$', '+', '3', 'é', 'h', 'q', 'z', 'I', 'R'],
  ['\'', '|', '%', '=', '<', 'i', 'í', 'r', 'A'],
  ['4', 'J', 'S', '\\', '^', '{', ',', '5', 'ó']
];

let charMap = {
  'a' : [0,0], 'b' : [0,1], 'c' : [0,2], 'd' : [0,3], 'e' : [0,4], 'f' : [0,5], 'g' : [0,6], 'h' : [0,7], 'i' : [0,8],
  'j' : [1,0], 'k' : [1,1], 'l' : [1,2], 'm' : [1,3], 'n' : [1,4], 'o' : [1,5], 'p' : [1,6], 'q' : [1,7], 'r' : [1,8],
  's' : [2,0], 't' : [2,1], 'u' : [2,2], 'v' : [2,3], 'w' : [2,4], 'x' : [2,5], 'y' : [2,6], 'z' : [2,7], 'A' : [2,8],
  'B' : [3,0], 'C' : [3,1], 'D' : [3,2], 'E' : [3,3], 'F' : [3,4], 'G' : [3,5], 'H' : [3,6], 'I' : [3,7], 'J' : [3,8],
  'K' : [4,0], 'L' : [4,1], 'M' : [4,2], 'N' : [4,3], 'O' : [4,4], 'P' : [4,5], 'Q' : [4,6], 'R' : [4,7], 'S' : [4,8],
  'T' : [5,0], 'U' : [5,1], 'V' : [5,2], 'W' : [5,3], 'X' : [5,4], 'Y' : [5,5], 'Z' : [5,6], '\'' : [5,7], '\\' : [5,8],
  ' ' : [6,0], '~' : [6,1], '`' : [6,2], '!' : [6,3], '@' : [6,4], '#' : [6,5], '$' : [6,6], '%' : [6,7], '^' : [6,8],
  '&' : [7,0], '*' : [7,1], '(' : [7,2], ')' : [7,3], '_' : [7,4], '-' : [7,5], '+' : [7,6], '=' : [7,7], '{' : [7,8],
  '[' : [8,0], '}' : [8,1], ']' : [8,2], ':' : [8,3], ';' : [8,4], '"' : [8,5], '|' : [8,6], '<' : [8,7], ',' : [8,8],
  '>' : [9,0], '.' : [9,1], '?' : [9,2], '/' : [9,3], '1' : [9,4], '2' : [9,5], '3' : [9,6], '4' : [9,7], '5' : [9,8],
  '6' : [10,0], '7' : [10,1], '8' : [10,2], '9' : [10,3], '0' : [10,4], 'á' : [10,5], 'é' : [10,6], 'í' : [10,7], 'ó' : [10,8]
};

function getPermutations(arr) {
  let result = [];
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      backtrack(
        current.concat(remaining[i]),
        remaining.slice(0, i).concat(remaining.slice(i + 1))
      );
    }
  }
  backtrack([], arr);
  return result;
}

let arr = [[], [], [], [], [], [], [], [], [], [], []];
for(let i=0; i<11; i++) {
  arr[i] = getPermutations(b[i]);
}

// Avalanche Effect
const crypto = require('crypto');
function get55DigitNumber(input64Digit) {
  if (!/^\d{64}$/.test(input64Digit)) {
    throw new Error("Input must be exactly 64 digits");
  }
  // Hash input using SHA-512
  const hash = crypto.createHash('sha512').update(input64Digit).digest('hex');
  // Convert hash to BigInt
  const hashBigInt = BigInt('0x' + hash);
  // Define 55-digit number range
  const min55 = 10n ** 54n;
  const max55 = 10n ** 55n - 1n;
  const range = max55 - min55;
  // Map hash to the range
  const result = min55 + (hashBigInt % range);
  return result.toString();
}

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
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Encryption
app.post("/encrypt", (req, res) => {
  let {msg, code} = req.body;
  code = get55DigitNumber(code);
  let output = "";
  for(let ch of msg) {
    let no = "";
    for(let i = charMap[ch][0]*5; i < charMap[ch][0]*5 + 5; i++) {
      no += code[i];
    }
    no = parseInt(no);
    output += arr[charMap[ch][0]][no][charMap[ch][1]];
  }
  res.send(output);
});

// Decryption
app.post("/decrypt", (req, res) => {
  let {emsg, code} = req.body;
  code = get55DigitNumber(code);
  let output = "";
  for(let idx = 0; idx < emsg.length; idx++) {
    let en = emsg[idx];
    let idx_i = -1, idx_j = -1;
    for(let i = 0; i < 11; i++) {
      for(let j = 0; j < 9; j++) {
        if(b[i][j] == en) {
          idx_i = i;
          break;
        }
      }
    }
    let no = "";
    for(let i = idx_i*5; i < idx_i*5 + 5; i++) {
      no += code[i];
    }
    no = parseInt(no);
    for(let j = 0; j < 9; j++) {
      if(arr[idx_i][no][j] == en) {
        idx_j = j;
        break;
      }
    }
    for (let char in charMap) {
      let coords = charMap[char];
      if(coords[0] == idx_i && coords[1] == idx_j) {
        output += char;
        break;
      }
    }
  }
  res.send(output);
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