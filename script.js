var WORDS = [
  {word:"elephant", pic:"🐘", options:["r","e","b"]},
  {word:"fish", pic:"🐠", options:["f","c","b"]},
  {word:"giraffe", pic:"🦒", options:["a","g","r"]},
  {word:"hippopotamus", pic:"🦛", options:["c","e","h"]},
  {word:"lion", pic:"🦁", options:["l","m","t"]},
  {word:"monkey", pic:"🐒", options:["n","m","w"]}
];

var grid = document.getElementById("grid");
var scoreEl = document.getElementById("score");
var winEl = document.getElementById("win");
var score = 0;

function shuffle(a){
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function build(){
  grid.innerHTML = "";
  score = 0;
  scoreEl.textContent = 0;
  winEl.style.display = "none";
  document.getElementById("total").textContent = WORDS.length;

  shuffle(WORDS).forEach(function(item){
    var card = document.createElement("div");
    card.className = "card";

    var pic = document.createElement("div");
    pic.className = "pic";
    pic.textContent = item.pic;

    var w = document.createElement("div");
    w.className = "word";
    var slot = document.createElement("span");
    slot.className = "slot";
    slot.innerHTML = "&nbsp;";
    var rest = document.createElement("span");
    rest.textContent = item.word.slice(1);
    w.appendChild(slot);
    w.appendChild(rest);

    var box = document.createElement("div");
    box.className = "choices";
    var correct = item.word[0];

    shuffle(item.options).forEach(function(letter){
      var b = document.createElement("button");
      b.className = "choice";
      b.textContent = letter;
      b.setAttribute("aria-label", "Letter " + letter);

      b.addEventListener("click", function(){
        if (letter === correct){
          b.classList.add("right");
          slot.textContent = letter;
          slot.classList.add("ok");
          card.classList.add("done");
          score++;
          scoreEl.textContent = score;
          if (score === WORDS.length) winEl.style.display = "block";
        } else {
          b.classList.add("wrong");
          b.disabled = true;
        }
      });
      box.appendChild(b);
    });

    card.appendChild(pic);
    card.appendChild(w);
    card.appendChild(box);
    grid.appendChild(card);
  });
}

document.getElementById("again").addEventListener("click", build);
build();