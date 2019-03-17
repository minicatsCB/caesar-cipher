let alphabetByLetters = {
  "a": 0,
  "b": 1,
  "c": 2,
  "d": 3,
  "e": 4,
  "f": 5,
  "g": 6,
  "h": 7,
  "i": 8,
  "j": 9,
  "k": 10,
  "l": 11,
  "m": 12,
  "n": 13,
  "o": 14,
  "p": 15,
  "q": 16,
  "r": 17,
  "s": 18,
  "t": 19,
  "u": 20,
  "v": 21,
  "w": 22,
  "x": 23,
  "y": 24,
  "z": 25
};

let alphabetByIndices = {
  "0": "a",
  "1": "b",
  "2": "c",
  "3": "d",
  "4": "e",
  "5": "f",
  "6": "g",
  "7": "h",
  "8": "i",
  "9": "j",
  "10": "k",
  "11": "l",
  "12": "m",
  "13": "n",
  "14": "o",
  "15": "p",
  "16": "q",
  "17": "r",
  "18": "s",
  "19": "t",
  "20": "u",
  "21": "v",
  "22": "w",
  "23": "x",
  "24": "y",
  "25": "z"
};

let fromElement = document.getElementById("from");
let toElement = document.getElementById("to");
let offsetElement = document.getElementById("offset");

document.getElementById("input-form").addEventListener("submit", actionManager);

function actionManager(ev){
    ev.preventDefault();

    let action = ev.explicitOriginalTarget.dataset.action;
    switch (action) {
        case "encode":
            result = encode();
            break;
        case "decode":
            result = decode();
            break;
        default:
            result = "";
            break;
    }

    toElement.innerText = result;
}

function encode() {
    let fromLetters = fromElement.value.toLowerCase();
    let offset = parseInt(offsetElement.value);
    let alphabetLength = Object.keys(alphabetByLetters).length;
    let toLetters = fromLetters.split("")
                                .map(letter => ((alphabetByLetters[letter] % alphabetLength) + (offset % alphabetLength)) % alphabetLength)
                                .map(index => alphabetByIndices[index])
                                .join("");

    console.log(fromLetters + " ---> " + toLetters);
    return toLetters;
}

function decode() {
    let fromLetters = fromElement.value.toLowerCase();
    let offset = parseInt(offsetElement.value);
    let alphabetLength = Object.keys(alphabetByLetters).length;
    let toLetters = fromLetters.split("")
                                .map(letter => ((alphabetByLetters[letter] % alphabetLength) - (offset % alphabetLength)) % alphabetLength)
                                .map(index => index >= 0 ? alphabetByIndices[index] : alphabetByIndices[alphabetLength + index])
                                .join("");

    console.log(fromLetters + " ---> " + toLetters);
    return toLetters;
}
