import crypto from "crypto"
import fs from "fs"
import path from "path"
import { encryptWithPrivateKey, encryptWithPublicKey } from "./encrypt.js"
import { decryptWithPrivateKey, decryptWithPublicKey } from "./decrypt.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const hash = crypto.createHash("sha256")

const myData = {
    firstName: "Zach",
    lastName: "Gollwitzer",
    socialSecurityNumber: "NO NO NO. Never put personal info in a\
    signed message since this form of cryptography does not hide the data"
    
}

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData)

// Sets the value on the hash object: requires string format, so we mustconvert our
hash.update(myDataString) 

// Hashed data is Hexadecimal(base 16) format
const hashedData = hash.digest("hex")

const senderPrivateKey = fs.readFileSync(path.join(__dirname, "id_rsa_priv.pem"), "utf8")

const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashedData)


const packageOfDataToSend = {
    algorithm: "sha256",
    originalData: myData,
    signedAndEncryptedData: signedMessage
}

export{ packageOfDataToSend }