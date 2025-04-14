import { app } from "./app";

const port = 3333

const start = async () => {
    try {
      await app.listen({
        host: '0.0.0.0',
        port
    })
    console.log(`server is runnig on ${port} port`)  
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
    
  start()