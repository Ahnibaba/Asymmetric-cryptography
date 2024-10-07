 import crypto from "crypto"
 import fs from "fs"
 import path from "path"
 import { fileURLToPath } from 'url';
 import { dirname } from 'path';

 const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 function genKeyPair() {
    // Generate an object where the keys are stored in properties "privateKey" and "publicKey"
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096, //bits - standard for RSA keys
        publicKeyEncoding: {
            type: "pkcs1", // "Public Key Cryptography Standards 1"
            format: "pem" 
        },
        privateKeyEncoding: {
            type: "pkcs1", // "Public key Cryptography Standards 1"
            format: "pem"
        }
    })

    // Create the public key file
    fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey)

    //Create the private key file
    fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey)
 }
 export{ genKeyPair }