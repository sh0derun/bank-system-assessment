const {Prisma, PrismaClient} = require("@prisma/client")

const DBContext = new PrismaClient();

const getUserById = async (userId)=>{
    const user = await DBContext.user.findFirst({
        where: {id: userId},
        include: {accounts: true}
    });
    return user;
}

module.exports = {DBContext, Prisma, getUserById};