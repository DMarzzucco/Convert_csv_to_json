import express, { Application } from "express";
import cors from 'cors'
import taskRoutes from "../router/task.routes";

export class App {
    private app: Application

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();

        this.middleware()
        this.Routes();
    }

    private middleware() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    private Routes() {
        this.app.use("/api", taskRoutes);
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log(`server port ${this.app.get('port')}`)
    }
}