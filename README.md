# Requirements
1. Should be installed `node.js` with version 17.4.0
2. Should be installed `npm` with vesrion 8.3.1

# Build application
1. Copy `.env.example` to `.env` and fill the file with right credentials
    `REACT_APP_API_URL` is an api url.
    `REACT_APP_LOGIN` is login.
    `REACT_APP_PASSWORD` is password.
2. Run npm install

## For development version:
3. Run `npm run start`
4. Click the link in the build report in the terminal

## For production version:
3. Run `npm run build`
4. Follow the instructions of the result of previous terminal command (point 3).

# Important information
1. Responses of the requests don't have CORS headers, so you should run your browser in unsafe mode, or add CORS headers on API side.
Guide for resolving the problem (for development purpose only): https://alfilatov.com/posts/run-chrome-without-cors/
