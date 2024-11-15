
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


const getPrisma = async(url : string)=>{
  const prisma = new PrismaClient({
    datasourceUrl : url
  }).$extends(withAccelerate())

  return prisma ;
}

export default getPrisma