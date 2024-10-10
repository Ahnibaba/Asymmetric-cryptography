import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PRIV_KEY = fs.readFileSync(path.join(__dirname, "priv_key.pem"), "utf8")
const PUB_KEY = fs.readFileSync(path.join(__dirname, "pub_key.pem"), "utf8")

const payloadObj = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022
}

const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: "RS256" })

jwt.verify(signedJWT, PUB_KEY, { algorithm: ["RS256"] }, (err, payload) => {
   err ? console.log(err) : console.log(payload);
   
   
})