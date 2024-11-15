// export const getClient = async()=>{
//   try {
//     const clinet = await pool.connect()
//     return clinet
//   } catch (error) {
//     console.log(error)
//   }
// }

// //! db - pgNode

import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()


const pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

pool.on('error',(err,client)=>{
  console.error("Unexpected error on idle client : ",err)
  process.exit(-1)
})

export const runQuery = async(text : string, value ?: string[])=>{
  return pool.query(text,value)
}



