const deck = [
  {
    name: "comerica",
    url: "/assets/comerica.jpg"
  },
  {
    name: "comerica",
    url: "/assets/tiger.jpg"
  },
  {
    name: "coney",
    url: "/assets/coneys.jpg"
  },
  {
    name: "coney",
    url: "/assets/lafayette.jpg"
  },
  {
    name: "eminem",
    url: "/assets/eminem.jpg"
  },
  {
    name: "eminem",
    url: "/assets/mom-spaghetti.jpg"
  },
  {
    name: "faygo",
    url: "/assets/faygo.jpg"
  },
  {
    name: "faygo",
    url: "/assets/rock&rye.jpg"
  },
  {
    name: "gm",
    url: "/assets/gm.jpg"
  },
  {
    name: "gm",
    url: "/assets/gm-building.jpg"
  },
  {
    name: "hitsville",
    url: "/assets/hitsville.jpg"
  },
  {
    name: "hitsville",
    url: "/assets/supremes.jpg"
  }
];

//SHUFFLE FUNCTION
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const board = document.querySelector("#board");
let clickedElements = [];
let matches = 0;
let time = 60;

function start(items) {
  board.innerHTML = "";
  clickedElements = [];
  matches = 0;
  time = 60;
  shuffle(items);
  items.forEach(item => {
    let container = document.createElement("section");
    container.classList.add("container");
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-name", item.name);
    let front = document.createElement("div");
    front.classList.add("front");
    let back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.url})`;
    back.style.backgroundPosition = "center";
    back.style.backgroundSize = "cover";
    card.append(front, back);
    container.append(card);
    board.append(container);
  });
  timeout();
}

board.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("front") &&
    !e.target.parentNode.classList.contains("flipped")
  ) {
    if (clickedElements.length === 0) {
      clickedElements.push(e.target.parentNode);
      e.target.parentNode.classList.add("flipped");
    } else if (clickedElements.length === 1) {
      clickedElements.push(e.target.parentNode);
      e.target.parentNode.classList.add("flipped");
      if (
        clickedElements[0].getAttribute("data-name") ===
        clickedElements[1].getAttribute("data-name")
      ) {
        console.log("SAME");
        matches++;
        setTimeout(function() {
          clickedElements[0].classList.remove("flipped");
          clickedElements[1].classList.remove("flipped");
          clickedElements[0].classList.add("hide");
          clickedElements[1].classList.add("hide");
          clickedElements = [];
        }, 1000);
      } else {
        console.log("Not the same");
        setTimeout(function() {
          clickedElements[0].classList.remove("flipped");
          clickedElements[1].classList.remove("flipped");
          clickedElements = [];
        }, 1000);
      }
    }
  }
});

function timeout() {
  thisTimer = setTimeout(function() {
    if (time > 0 && matches < 6) {
      time--;
      document.querySelector("#timer").innerText = time;
    } else if (matches === 6) {
      clearTimeout(thisTimer);
      document.querySelector(".game-win").style.display = "flex";
    } else {
      clearTimeout(thisTimer);
      document.querySelector(".game-lose").style.display = "flex";
    }
    timeout();
  }, 1000);
}

document.querySelector(".start").addEventListener("click", function() {
  document.querySelector(".game-start").style.display = "none";
  start(deck);
});

document.querySelector(".reset").addEventListener("click", function() {
  clearTimeout(thisTimer);
  start(deck);
});

document.querySelector(".again").addEventListener("click", function() {
  document.querySelector(".game-lose").style.display = "none";
  clearTimeout(thisTimer);
  start(deck);
});

document.querySelector(".win").addEventListener("click", function() {
  document.querySelector(".game-win").style.display = "none";
  clearTimeout(thisTimer);
  start(deck);
});
