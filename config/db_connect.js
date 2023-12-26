import mongoose from "mongoose";

const dbConn = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL)
        connected.connection.on('error', (error) => {
            console.log(error)
        })

        connected.connection.once('connected', () => {
            console.log("connected")
        })
        console.log(`Mongodb connected ${connected.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default dbConn;