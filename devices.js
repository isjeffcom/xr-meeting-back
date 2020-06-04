const utils = require('./utils')

var deviceList = []

function get(id){

    var res

    if(id){
        const index = utils.idItemInArr(id, deviceList, 'id')
        if(index != -1){
            res = deviceList
        } else {
            res = false
        }
    } else {
        res = deviceList
    }
    
    return res ? res : -1
}

function add(socketId, type, username, platform){
    
    if(utils.idItemInArr(socketId, deviceList, 'id') == -1){

        const tmp = {
            id: socketId,
            type: type,
            username: username,
            platform: platform
        }

        deviceList.push(tmp)

        return true
    } else {
        return false
    }
}

function update(id, type, username, platform){

    if(!type && !username && !platform){
        return false
    }

    const index = utils.idItemInArr(id, deviceList, 'id')
    if(index != -1){
        const tmp = {
            id: id,
            type: type ? type : deviceList[index].type,
            username: username ? username : deviceList[index].username,
            platform: platform ? platform : deviceList[index].platform
        }
    
        deviceList[index] = tmp
        return true
    } else {
        return false
    }
}

function remove(id) {
    console.log("remove")
    deviceList = utils.removeItemFromArr(id, deviceList, 'id')
    if(deviceList != -1){
        return true
    } else {
        return false
    }
    
}

module.exports = {
    get: get,
    add: add,
    update: update,
    remove: remove
}