import allowedOrigins from "./allowedOrigins.js"

const corsOptions = {
    origin: 'http://localhost:5173',
    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error('Not allowed by CORS'))
    //     }
    // },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions