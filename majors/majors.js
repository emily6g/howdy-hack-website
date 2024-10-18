words = [
    "AERO", "AGLS", "AGSC", "ANSC", "ARCH", "ARSC", "ARTS", "ASTR", "BAEN", "BESC", "BICH", 
    "BIMS", "BIOL", "BMEN", "BUSN", "CARC", "CHEM", "CHEN", "CHIN", "CLEN", "COMM", "COSC", "CSCE", 
    "CVEN", "CYBR", "DAEN", "DCED", "DDHS", "ECCB", "ECDE", "ECEN", "ECMT", "ECON", "EHRD", "ENDG", 
    "ENDS", "ENGL", "ENGR", "ENST", "ENTC", "ENTO", "EPFB", "EPSY", "ESET", "EURO", "EVEN", "FILM", 
    "FINC", "FINP", "FIVS", "FREN", "FSCI", "FSTC", "GENE", "GEOG", "GEOL", "GEOP", "GEOS", "GERM", 
    "GLST", "HBRW", "HHUM", "HISP", "HIST", "HLTH", "HORT", "HUMA", "IBUS", "IDIS", "INST", "INTA", 
    "ISEN", "ISTM", "ITAL", "ITDE", "JAPN", "JOUR", "JWST", "KINE", "LAND", "LING", "LMAS", "MARB", 
    "MARE", "MARS", "MASE", "MAST", "MATH", "MEEN", "MEPS", "MGMT", "MICR", "MKTG", "MLSC", "MMET", 
    "MODL", "MSEN", "MTDE", "MUSC", "MUST", "MXET", "NAUT", "NRSC", "NUEN", "NURS", "NUTR", "OCEN", 
    "OCNG", "PBSI", "PERF", "PETE", "PHIL", "PHLT", "PHYS", "POLS", "PORT", "POSC", "PVFA", "RDNG", 
    "RELS", "RUSS", "SCMT", "SOCI", "SPAN", "SPED", "SPMT", "STAT", "TCMG", "TEED", "THEA", "UGST", 
    "URPN", "VIBS", "VIST", "VSCS", "WGST", "ZOOL"
]

var audio = document.getElementById("myAudio");
var audio2 = document.getElementById("myAudio2");

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let guessWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(guessWord);


function initBoard() {
    let board = document.getElementById("gameboard");
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        for (let j = 0; j < 4; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}

initBoard();

document.addEventListener('keyup', (e) => {
    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return;
    }

    pressedKey = pressedKey.toLowerCase();
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}
s
function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = currentGuess.join('');
    let rightGuess = Array.from(guessWord);


    if (guessString.length !== 4) {
        alert("Not enough letters!");
        return;
    }


    for (let i = 0; i < 4; i++) {
        let box = row.children[i];
        let letter = currentGuess[i];
        let letterColor = '';


        if (rightGuess[i] === letter) {
            letterColor = 'green';
        } else if (rightGuess.includes(letter)) {
            letterColor = 'yellow';
        } else {
            letterColor = 'grey';
        }


        setTimeout(() => {
            box.classList.add(letterColor);
        }, 250 * i);
    }


    if (guessString === guessWord) {
        showCustomAlert();
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;


        if (guessesRemaining === 0) {
            alert(`The correct word was: "${guessWord}"`);
            showCustomAlert2();
        }
    }
}

function showCustomAlert() {
    var alertModal = document.getElementById("customAlert");
    alertModal.style.display = "flex";
  }

function closeCustomAlert() {
    var alertModal = document.getElementById("customAlert");
    alertModal.style.display = "none";

    audio.play();

    var end = Date.now() + (15 * 1000);

    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
  }

  function showCustomAlert2() {
    var alertModal = document.getElementById("customAlert2");
    alertModal.style.display = "flex";
  }

function closeCustomAlert2() {
    var alertModal = document.getElementById("customAlert2");
    alertModal.style.display = "none";

    audio2.play();

    var scalar = 2;
    var unicorn = confetti.shapeFromText({ text: '🐍', scalar });

    var defaults = {
        spread: 360,
        ticks: 60,
        gravity: 0,
        decay: 0.96,
        startVelocity: 20,
        shapes: [unicorn],
        scalar
    };

    function shoot() {
        confetti({
        ...defaults,
        particleCount: 30
    });

    confetti({
        ...defaults,
        particleCount: 5,
        flat: true
    });

    confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ['circle']
    });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }