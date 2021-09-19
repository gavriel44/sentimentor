const sendButton = document.getElementById("send-button");

sendButton.onclick = async function () {
  textToSend = document.querySelector(".main-input").value;

  const response = fetch("https://sentim-api.herokuapp.com/api/v1/", {
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({'text': textToSend})
      
  })
  .finally(() => stopLoadingAnimation())
  .then(response => response.json())
  .then(data => renderAnswer(data))
  .catch(error => console.log(error))

  startLoadAnimation()


};

function startLoadAnimation() {

}

function stopLoadingAnimation() {

}