const sendButton = document.getElementById("send-button");

let mainSection = document.getElementById("main");
let MIN_LOADING_TIME =1000




renderStartPage()

async function sendInfo(event) {
  if (event.target.className !== 'send-button') return
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
    .then((data) => {fetchQuote(data)
      .finally(() => clearMainSection())
      .then(r => r.json())
      .then(quot => renderAnswer(data, quot))
      .catch(error => renderError(error))})
    .catch((error) => renderError(error));

  startLoadAnimation();
};

function startLoadAnimation() {
  mainSection.style.height = "40%";
  
  removeAllChildNodes(mainSection);

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
  quot = quot[getRandomIndx(quot.length)];
  mainSection.style.height = '450px';
  let polarityPresent = polarity * 100
  
  let clickHandler = function() {
    clearMainSection()
    renderStartPage()
  }
  renderScale(mainSection, polarityPresent);
  renderQuot(quot , polarityPresent, mainSection)
  renderButton(mainSection, 'Try again', clickHandler)

  mainSection.className = 'answer-main'
  

}

function renderScale(fatherDiv, scalePercent) {
  let scaleContainerDiv = document.createElement('div');
  let scaleDiv = document.createElement('div');
  
  scaleDiv.innerHTML = `${scalePercent}%`

  scaleContainerDiv.classList.add('scale-container', 'box-sizing')
  scaleDiv.classList.add('scale', 'box-sizing');

  scaleContainerDiv.append(scaleDiv)

  fatherDiv.append(scaleContainerDiv);

  if (scalePercent>0) {
    scaleDiv.classList.add('good-scale')
  } else if (scalePercent < 0) {
    scaleDiv.classList.add('bad-scale')
  }
  setTimeout(() => scaleDiv.style.width = `${Math.abs(scalePercent)}%`, 100)
  
}

function renderQuot({text} ,polarityPresent, fatherDiv) {
  let quotDiv = document.createElement('div');
  quotDiv.classList.add('quot')
  quotDiv.innerHTML = `"${text}"`
  
  let resultDiv = document.createElement('div');

  if (polarityPresent > 0) {
    resultDiv.innerHTML ='Your text is positive. Here is an inspirational quot:'
  } else if (polarityPresent === 0) {
    resultDiv.innerHTML = 'Your text is neutral. Here is an inspirational quot:'
  } else {
    resultDiv.innerHTML = 'Your text is negative. Here is an inspirational quot:'
  }

  fatherDiv.append(resultDiv, quotDiv)
}

function renderButton(fatherElement, html, clickHandler) {
  let button = document.createElement('button')
  button.className = 'send-button'
  button.innerHTML = html;

  button.onclick = clickHandler
  fatherElement.append(button)
}

function renderError(error) {
  console.log(error);
}

function fetchQuote() {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(fetch("https://type.fit/api/quotes")), MIN_LOADING_TIME)
  })

}

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

function renderStartPage() {
  let p = document.createElement('p')
  p.innerHTML = 'Tell us whatever you like and we will tell you what we think about it.'

  let label = document.createElement('label')
  label.for = 'main-input';
  label.innerHTML = 'Enter here whatever you want:'
  
  let textArea = document.createElement('textarea')
  textArea.classList.add('main-input');
  textArea.name = 'main-input';
  textArea.rows ='3';
  textArea.cols = '40';
  textArea.innerHTML = 'I love lotr so much! I cant stop watching it...'
  
  
  mainSection.append(p, label, textArea)
  renderButton(mainSection, 'Send', sendInfo)

  mainSection.className = 'main'

  
}
