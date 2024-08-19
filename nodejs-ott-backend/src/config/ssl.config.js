const sslConfig = {
    keyPath: process.env.SSL_KEY_PATH,
    certPath: process.env.SSL_CERT_PATH,
    passphrase: process.env.SSL_PASSPHRASE,
};

export default sslConfig;