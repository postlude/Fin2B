module.exports = function (inputNum){
    var cache = [0, 1, 1];

    for(var index=3; index<=inputNum; index++){
        cache.push(cache[index-2] + cache[index-1]);
    }

    return cache[inputNum];
}