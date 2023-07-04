// full credit to https://github.com/noahcoolboy/funcaptcha/blob/master/src/crypt.ts. This is just AES encryption though.
const crypto = require("crypto")

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let md5 = crypto.createHash("md5");

function encrypt(data, key) {
    let salt = "";
    let salted = "";
    let dx = Buffer.alloc(0);

    salt = Array(8)
        .fill(0)
        .map((v) => alphabet[Math.floor(Math.random() * alphabet.length)])
        .join(""); // 8 random letters
    data =
        data +
        Array(17 - (data.length % 16)).join(
            String.fromCharCode(16 - (data.length % 16))
        ); // Padding (pkcs7?)

    for (let x = 0; x < 3; x++) {
        dx = md5
            .update(
                Buffer.concat([
                    Buffer.from(dx),
                    Buffer.from(key),
                    Buffer.from(salt),
                ])
            )
            .digest();

        salted += dx.toString("hex");
        md5 = crypto.createHash("md5");
    }

    let aes = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(salted, "hex").slice(0, 32),
        Buffer.from(salted, "hex").slice(32, 32 + 16)
    );
    aes.setAutoPadding(false);

    return JSON.stringify({
        ct: aes.update(data, null, "base64") + aes.final("base64"),
        iv: salted.substring(64, 64 + 32),
        s: Buffer.from(salt).toString("hex"),
    });
}

module.exports = {
    encrypt
};