const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectiory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectiory) || fs.mkdirSync(logDirectiory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectiory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blah',
    db: 'codeial_dev',
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'vani140103',
                pass: 'Shashi@104a1'
            }
        
        },
        google_client_ID: "561934565984-t5ns1l8baqmqd03ht1kund945e0hbt59.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.CODEIAL_GMAIL_USERNAME,
                pass: process.env.CODEIAL_GMAIL_PASSWORD
            }
        
        },
        google_client_ID: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.GOOGLE_CALLBACK_URL ,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = development;