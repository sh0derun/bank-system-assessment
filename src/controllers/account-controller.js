const {body, validationResult} = require("express-validator");
const {DBContext, Prisma, getUserById} = require("../db-util/db-context");

const accountValidator = [
    body("userId","userId should not be empty").notEmpty(),
    body("userId","userId should be in UUID format").isUUID(),
    body("amount", "amount should not be empty").notEmpty(),
    body("amount", "amount should be a numeric").isNumeric(),
    body("amount", "amount should be a decimal number").isDecimal(),
    body("amount", "amount should be positive number").custom(amount=>parseFloat(amount) >= 0)
];

const despositAmount = async(request, response)=>{
    try{
        validationResult(request).throw();
        const {userId, amount} = request.body;

        const user = await getUserById(userId);

        let updatedAmount = null;

        if(user){
            updatedAmount = await DBContext.account.update({
                where:{
                    id:user.accounts.pop().id
                },
                data:{
                    balance:{
                        increment: parseFloat(amount)
                    }
                }
            }).catch(reason=>{
                throw reason;
            });
        }else{
            throw Error(`there is no user with id ${userId}`);
        }

        response.status(200).json({userId, amount: updatedAmount.balance.toFixed(2)});
    }catch(error){
        response.status(400).json(catchHandler(error));
    }
}

const withdrawAmount = async (request, response)=>{
    try{
        validationResult(request).throw();
        const {userId, amount} = request.body;

        const user = await getUserById(userId);

        let updatedAmount = null;

        if(user){
            const userAccount = user.accounts.pop();
            if(userAccount.balance < parseFloat(amount)){
                throw Error("you can't withdraw, the requested amount is greater than the current user balance");
            }
            updatedAmount = await DBContext.account.update({
                where:{
                    id:userAccount.id
                },
                data:{
                    balance:{
                        decrement: parseFloat(amount)
                    }
                }
            }).catch(reason=>{
                throw reason;
            });
        }else{
            throw Error(`there is no user with id ${userId}`);
        }

        response.status(200).json({userId, amount: updatedAmount.balance.toFixed(2)});
    }catch(error){
        response.status(400).json(catchHandler(error));
    }
}

//TODO : need proper way for error catching
const catchHandler = (error)=>{
    console.log(error);
    return error.array !== undefined ? {message: error.array({onlyFirstError:true}).pop().msg} : {message: error.message};
}

module.exports = {
    despositAmount, withdrawAmount,
    accountValidator
};