# Load testing with k6.io

## Setting up

1. Install k6 in your machine or use docker, follow https://k6.io/docs/get-started/installation/
2. copy `const.example.js` to `const.js` and Update the URL, email and password
3. Run the test with:

```sh
k6 run tests/1-load-test.js
```