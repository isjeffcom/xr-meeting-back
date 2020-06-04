function idItemInArr (target, arr, key) {

    arr = hardCopy(arr)

    for(let i=0;i<arr.length;i++){

        var compact = key ? arr[i][key] : arr[i]
        

        if(target == compact){
            
            return i
        }
    }

    return -1
}

function removeItemFromArr(target, arr, key){

    arr = hardCopy(arr)
    
    const index = key ? idItemInArr(target, arr, key) : idItemInArr(target, arr)
    if(index != -1){
        
        arr.splice(index, 1)
        return arr
    } else {
        return []
    }
}


function hardCopy(str){
    return JSON.parse(JSON.stringify(str))
}

module.exports = {
    idItemInArr: idItemInArr,
    removeItemFromArr: removeItemFromArr
}