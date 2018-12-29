const messageArea = document.getElementById("messageArea")
const global = {}
function br() {
  var node = document.createElement("BR")
  messageArea.appendChild(node)
}
function pushSysMessage(message) {
  messageArea.appendChild(document.createTextNode("[" + new Date(Date.now()).toLocaleTimeString() + "] " + message))
  br()
}
function pushUserMessage(message) {
  var node = document.createElement("B")
  if (message.author.bot) {
    node.appendChild(document.createTextNode(message.author.tag + " [BOT]"))
  } else {
    node.appendChild(document.createTextNode(message.author.tag))
  }
  messageArea.appendChild(document.createTextNode("[" + new Date(Date.now()).toLocaleTimeString() + "] "))
  messageArea.appendChild(node)
  messageArea.appendChild(document.createTextNode(" [#" + message.channel.name + "/" + message.guild.name + "] : "))
  messageArea.appendChild(document.createTextNode(message.cleanContent))
  br()
  window.scrollTo(0,document.body.scrollHeight);
}
if (!localStorage.getItem("logger-token")) {
  console.error("You must set your token using setter.html")
  pushSysMessage("ERROR: You must set your token using setter.html")
} else {
  global.bot = new Discord.Client()
  global.bot.on("message", (message) => {
    if (localStorage.getItem("logger-channelid") && localStorage.getItem("logger-channelid") !== "") {
      if (localStorage.getItem("logger-channelid") == message.channel.id) {
        pushUserMessage(message)
      } else {}
    } else {
      pushUserMessage(message)
    }
  })
  global.bot.on("ready", () => {
    pushSysMessage("INFO: Logged in as " + global.bot.user.tag)
    global.bot.user.setPresence("Logging messages", {type: "PLAYING"})
    if (localStorage.getItem("logger-channelid") !== "" && !global.bot.channels.get(localStorage.getItem("logger-channelid"))) {
      pushSysMessage("WARNING: Invalid Channel ID provided")
    }
  })
  pushSysMessage("INFO: Logging in")
  global.bot.login(localStorage.getItem("logger-token")).catch(err=> {
    pushSysMessage("ERROR: An error ocurred while logging in. ")
    br()
    messageArea.appendChild(document.createTextNode(err))
  })
  global.token = localStorage.getItem("logger-token")
}
