import crypto from "crypto"
import fs from "fs"
import path from "path"
import { decryptWithPublicKey } from "./decrypt.js";

import { packageOfDataToSend } from "./signMessage.js";


import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hash = crypto.createHash(packageOfDataToSend.algorithm)

const publickey = fs.readFileSync(path.join(__dirname, "id_rsa_pub.pem"), "utf8")

const decryptedMessage = decryptWithPublicKey(publickey, packageOfDataToSend.signedAndEncryptedData)

const decryptedMessageHex = decryptedMessage.toString()


const hashOfOriginal = hash.update(JSON.stringify(packageOfDataToSend.originalData))
const hashOfOriginalHex = hash.digest("hex")

export { hashOfOriginalHex, decryptedMessageHex }


