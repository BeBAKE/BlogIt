// import {date, z} from 'zod'

// import { bookmarkCursorSchema } from '.'

// const dateNow = new Date()
// console.log(dateNow)
// console.log(`${dateNow}`)

// const data = {
//   myCursorId : "33e5cf00-c040-4ee7-a1a2-e2a053770484",
//   myCursor : "2024-11-08T06:08:55.444Z"
// }

// const parsedData = bookmarkCursorSchema.safeParse(data)

// console.log(parsedData)

const val = `The pH for the removal of fluoride was found to be constant (pH=4).
The most excellent defluoridation occurred with a success rate of 96 %.
The adsorbent dosage for fluoride removal was found to be 0.5g/L and the contact time for the same was found to be 60 minutes. 
The initial concentration of fluoride was found to be 10 mg/L .
On increasing the temperature, the fluoride removal efficiency of the nano- adsorbent will also increase`

const val2 = val.split(" ").join("")
console.log(val2);

console.log(val2.length)