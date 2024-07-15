import { App } from "./app/app";

async function main() {
    const app = new App(3000)
    await app.listen()
}
main().catch(err => {
    console.log(`Error to start the server ${err}`)
    process.exit(1)
})