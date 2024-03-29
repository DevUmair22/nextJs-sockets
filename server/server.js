const io = require('socket.io')(3001, {
   cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
})



io.on("connection", (socket) => {
   socket.on("message", (message, roomName) => {
      console.log("sending message", message, roomName)
      if (roomName.length) {
         io.to(roomName).emit("message", message)
         console.log("One to One")
      } else {
         io.emit("message", message)
         console.log("Broadcasted")
      }
   })
   socket.on("disconnected", () => {
      console.log("User Disconnected.")
   })
   socket.on("joinRoom", (roomName, cb) => {
      console.log("joining room " + roomName + '...')
      socket.join(roomName)
      cb(`Joined ${roomName}`)
   })
   console.log("A user connected.")
})


