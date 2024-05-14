# Load testing with k6.io

## Setting up

1. Install k6 in your machine or use docker, follow https://k6.io/docs/get-started/installation/
3. Run the test with:

```sh
k6 run -e ADMIN_EMAIL="" ADMIN_PASSWORD="" BASE_URL="" COMPANY_ID=1 tests/1-load-test.js
```

## Output
![image](https://github.com/przbadu/k6-load-testing/assets/4189129/53ceaab9-53d0-4e5b-9572-4eed27ccffc9)
![image](https://github.com/przbadu/k6-load-testing/assets/4189129/eba54995-7215-4f83-87cb-eff9b3d7c71f)
