var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

const devices = require('./devices')

const port = 8899

const password = "hello"

app.listen(port, ()=>{console.log("socket start:"+port)})

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

//console.log(utils.removeItemFromArr(1, arr, 'id'))

io.on('connection', function (socket) {
    
    //io.emit('sync', devices.get())

    io.on('connect', (socket) => {

        // EVENT: Device Register
        socket.on('reg', function (data) {
            if(data['type'] && data['username'] && data['platform'] && data['password']){

                if(data.password == password){

                    

                    if(devices.add(socket.id, data.type, data.username, data.platform)){
                        console.log("New User: " + data.username + " added, id: " + socket.id)
                        socket.emit('reg_back', { res: true, id: socket.id, username: data.username, data: "success", all: devices.get() })
                        io.emit('sync', devices.get())

                    } else {

                        socket.emit('reg_back', { res: false, id: socket.id, username: data.username, err: "existed", all: devices.get() })

                    }

                    

                    return true
                } else {

                    socket.emit('reg_back', { res: false, err: "reg wrong password" })

                    console.log("reg wrong password")
                    return false
                }
            } else {
                socket.emit('reg_back', { res: false, err: "reg not allowed" })
                console.log("reg not allowed")
                return false
            }
            //socket.emit('display', { hello: 'world' });
        })
    })

    socket.on('disconnect', function () {
        devices.remove(socket.id)
        //io.emit('sync', devices.get())
    })
    

    // EVENT: Display Emoji
    socket.on('display', function (data) {
        if(allow(data)){
            socket.emit('display', data)
        }
    })

    // EVENT: Testing function, from one to all
    socket.on('to', function (data) {
        if(allow(data)){
            io.emit('to_', data)
        }
    })

    // EVENT: Broadcast testing function
    socket.on('say', function (data) {
        console.log(data)
        io.emit('say_back', data)
        //console.log(data.name +" say: " + data.msg)
    })
})

io.on('connection', (socket) => {
    socket.on('disconnect', (reason) => {
        // ...
    })
})


// Verify Device in list
// Do not put this in high-preformance reqired functions
function allow(data){
    return devices.get(data['id']) != -1 ? true : false
}
