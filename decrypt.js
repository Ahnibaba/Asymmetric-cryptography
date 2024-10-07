import crypto from "crypto"

function decryptWithPrivateKey(privateKey, encryptedMessage) {

    return crypto.privateDecrypt(privateKey, encryptedMessage)
}

function decryptWithPublicKey(publicKey, encryptedMessage) {

    return crypto.publicDecrypt(publicKey, encryptedMessage)
}

export{ decryptWithPrivateKey, decryptWithPublicKey }