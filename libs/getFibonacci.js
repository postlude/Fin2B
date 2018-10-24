function getFibonacci(inputNum){
    if(inputNum==1 || inputNum==2){
        return 1;
    }
    return getFibonacci(inputNum-2) + getFibonacci(inputNum-1);
};

module.exports = getFibonacci;