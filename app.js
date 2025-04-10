import 'dotenv/config'
import { connectDB } from './src/config/db.js'
import { PORT } from './src/config/config.js'
import fastify from 'fastify'

const start = async () => {
    await connectDB(process.env.MONGODB_URI)

    const app = fastify()
    app.listen({port: PORT, host: '0.0.0.0'},(err,addr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`App is running on http://localhost:${PORT}`)
        }
    })
}

start()