// # RENDER
const { id, students } = getClass(defaultClass);

// CLASSROOM NUMBER
// document.getElementById("classroom").innerText = id;

// ELEMENTS
const listElement = document.getElementById("students-list");
const studentsList = students.reduce(
  (l, s, i) => (l += `<li class="student" id="student-${i}">${s}</li>`),
  ""
);
// ELEMENTS
const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "l"];
const numBucket = 4;
const listBucket = document.getElementById("buckets");
const bucketList = fillBuckets();

function fillBuckets() {
  let l = "";
  for (i = 0; i < numBucket; i++) {
    l += `<div class="col-3"><h1 class="text-uppercase text-white text-center" style="padding-left:10px; font-size:16px;">Girone ${alfabeto[i]}</h1>
    <div class="bucket mb-3" id="bucket-${i}">
    <ul id="li-bucket-${i}" class="text-dark">
    
    </ul>
    </div>
    </div>`;
  }
  return l;
}

listElement.innerHTML = studentsList;
listBucket.innerHTML = bucketList;

// DISABLING LOGICS
const studentItems = document.querySelectorAll(".student");
studentItems.forEach((s) =>
  s.addEventListener("click", () => {
    if (s.className.includes("disabled")) s.classList.remove("disabled");
    else s.classList.add("disabled");
  })
);
// VOICE SYNTH
const synth = window.speechSynthesis;
const voice = {
  voiceURI: "Google italiano",
  name: "Google italiano",
  lang: "it-IT",
  localService: false,
  default: false,
};
const read = (name) => {
  if (synth.speaking) return;
  const speakText = new SpeechSynthesisUtterance(name);
  synth.speak(speakText);
};

// RANDOMIZE LOGICS
const random = document.getElementById("randomize");
let isRunning = false;
let counter = 0;
const randomize = () => {
  if (isRunning) return;
  isRunning = true;
  random.classList.add("disabled");
  var audio = new Audio("./mp3/random.mp3");
  audio.play();
  const interval = setInterval(() => {
    let randElement;
    let isDisabled = true;
    do {
      const rand = Math.floor(Math.random() * students.length);
      randElement = document.getElementById(`student-${rand}`);
      isDisabled = randElement.className.includes("disabled");
      console.log(rand, randElement.innerText, isDisabled);
    } while (isDisabled);

    const activeElement = document.querySelector(".active");
    if (activeElement) activeElement.classList.remove("active");
    randElement.classList.add("active");
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    audio.pause();
    const activeElement = document.querySelector(".active");
    const activeBucket = document.getElementById(`li-bucket-${counter}`);
    read(activeElement.textContent);
    setTimeout(() => {
      activeElement.classList.remove("active");
      activeElement.classList.add("disabled");
      activeBucket.innerHTML += `<li class="text-uppercase student" style="font-size:18px;">${activeElement.innerHTML}</li>`;
      if (counter == numBucket - 1) counter = 0;
      else counter++;
    }, 1000);
    isRunning = false;
    random.classList.remove("disabled");
  }, 9900);
};

random.addEventListener("click", randomize);

// SELECT
if (showSelect) {
  const classSelector = document.getElementById("select-class");
  const options = classes.reduce(
    (o, c) =>
      (o += `<option ${c.id == id ? "selected" : ""} value=${c.id}>Classe ${
        c.id
      }</option>`),
    ""
  );
  classSelector.innerHTML = options;

  // CHANGE CLASS
  classSelector.addEventListener("change", (e) => {
    const { value } = e.target;
    window.location.href =
      window.location.origin + window.location.pathname + `?class=${value}`;
  });
}
