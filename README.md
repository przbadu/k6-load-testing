# Load testing with k6.io

## Setting up

1. Install k6 in your machine or use docker, follow https://k6.io/docs/get-started/installation/
3. Run the test with:

```sh
k6 run -e ADMIN_EMAIL="" ADMIN_PASSWORD="" BASE_URL="" tests/1-load-test.js
```