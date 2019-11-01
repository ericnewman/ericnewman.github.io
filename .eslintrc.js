// module.exports = {
//     "env": {
//         "browser": true,
//         "es6": true
//     },
//     "extends": ["eslint:recommended"],
//     "globals": {
//         "Atomics": "readonly",
//         "SharedArrayBuffer": "readonly"
//     },
//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 2018,
//         "sourceType": "module"
//     },
//     "plugins": [
//         "react"
//     ],
//     "rules": {
//         "react/prefer-stateless-function": 1,
//         "react/jsx-no-bind": 0,
//         "no-useless-escape": 0
//     }
// }
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended"],
        "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    }

}
