module.exports = [
    // Twitter API
    {
        consumer_key: '',
        consumer_secret: '',
        access_token: '',
        access_token_secret: ''
    },
    // Custom User Search terms accepted
    [
        {
            data: ["catto", "catoo", "cat"],
            path: "images/cat/"
        },
        {
            data: ["doggo", "dogo", "dog"],
            path: "images/dog/"
        },
    ],
    // App config
    {
        INTERVALCHECK: 20000
    }
];