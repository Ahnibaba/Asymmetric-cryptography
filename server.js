import fs from "fs"
import path from "path"
import express from "express"


import { encryptWithPublicKey } from "./encrypt.js"
import { decryptWithPrivateKey } from "./decrypt.js"
import { hashOfOriginalHex, decryptedMessageHex } from "./verifyIdentity.js"

const PORT = process.env.PORT || 8000


import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()


const publicKey = fs.readFileSync(path.join(__dirname,  "id_rsa_pub.pem"), "utf8")
const privateKey = fs.readFileSync(path.join(__dirname, "id_rsa_priv.pem"), "utf8")

const encryptedMessage = encryptWithPublicKey(publicKey, "Super secret message")


// If you try and "crack the code", you will just get gibberish
console.log(encryptedMessage.toString()); //gibberish

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage)

console.log(decryptedMessage.toString()); // decryptedMessage




if(hashOfOriginalHex === decryptedMessageHex) {
    console.log("Success! The data has not been tampered with and the sender is valid");
    
} else {
    console.log("Uh oh... SomeOne is trying to manipulate the data or someone else is sending this data");
    
}


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    
})