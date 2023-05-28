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
    
}

const production = {
    name: 'production'
}



module.exports = development;