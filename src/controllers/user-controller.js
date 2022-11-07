const {body, validationResult} = require("express-validator");
const {DBContext, Prisma} = require("../db-util/db-context");


const createUserValidator = [
    body("name", "user name should not be empty").notEmpty(),
    body("name", "user name should not be numeric or symbol").isAlpha("en-US",{ignore:" "})
];

const createUser = async (request, response)=>{
    try{
        const err = validationResult(request).throw()

        const {name} = request.body;
        const user = await DBContext.user.create({
            data:{
                name: name,
                accounts: {
                    create: [{}]
                }
            }
        });

        response.status(200).json(user);
    } catch(error){
        let resultError = {msg:""};
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                resultError.msg = 'There is a unique constraint violation, a new user cannot be created with the given name';
            }
        }else{
            resultError.msg = error.array({onlyFirstError:true}).pop().msg;
        }
        response.status(400).json(resultError);
    }
}

module.exports = {
    createUser,
    createUserValidator
}