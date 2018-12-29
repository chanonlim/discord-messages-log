document.getElementById("submit").addEventListener("submit", (event) => {
  event.preventDefault()
  var token = document.getElementById("token")
  var channelid = document.getElementById("channelID")
  localStorage.setItem("logger-token", token.value)
  localStorage.setItem("logger-channelid", channelid.value)
  document.getElementById("message").innerHTML = "Set token and channel ID successfully!"
})
