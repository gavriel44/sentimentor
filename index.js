const sendButton = document.getElementById("send-button");

let mainSection = document.getElementById("main");

let sentimData;

sendButton.onclick = async function () {
  textToSend = document.querySelector(".main-input").value;

  const response = fetch("https://sentim-api.herokuapp.com/api/v1/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: textToSend }),
  })
    .then((response) => response.json())
    .then((data) => {sentimData = data; return fetchQuote(data)})
    .then(response => response.json())
    .then(data => renderAnswer(sentimData, data))
    .catch((error) => renderError(error));

  startLoadAnimation();
};

function startLoadAnimation() {
  removeAllChildNodes(mainSection);

  mainSection.style.height = "50%";

  let barDiv = document.createElement("div");
  barDiv.classList.add("bar");

  let circleDiv = document.createElement("div");
  circleDiv.classList.add("circle");

  let p = document.createElement("p");
  p.innerHTML = "Loading";
  p.classList.add("loading-p");

  barDiv.append(circleDiv, p);
  mainSection.append(barDiv);
}

function renderAnswer({result: {polarity}}, quot) {
  console.log(polarity, quot[getRandomIndx(quot.length)]);
}

function fetchQuote() {
  console.log('ddd');
  // if (polarity > 0) {
    return fetch("https://type.fit/api/quotes")
  // }
}

function renderError() {}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clearMainSection() {
  removeAllChildNodes(mainSection);
}

function getRandomIndx(size) {
  return Math.floor(Math.random() * size)
}