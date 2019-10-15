module.exports = {
    "app": {
        "name": "inventory-service",
        "description": "A simple inventory service",
        "connection":{
            "host": "localhost",
            "port": "8080",
            "routes": {
                "cors": {
                    "origin": ["*"],
                    "headers": ["Authorization", "Content-Type", "If-None-Match", "x-requested-with", "x-forwarded-for"],
                    "credentials": true
                }
            }
        }
    },
    "db": {
        "mongo": {
            "host": "localhost",
            "port": "27017",
            "database": "test"
        },
        "redis": {
            "host": "localhost",
            "port": "6379"
        }
    },
    authentication: {
        "jwt": {
            secret: "SneakyPeeky1234#", // maintain absolute secrecy on this
        },
        "cookie": {
            password: "980das9809d8asd098dsa098dsadsa09asd8089ads",
        }
    },
};