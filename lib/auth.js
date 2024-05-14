import http from 'k6/http';
import { check } from 'k6';
import { CookieJar } from 'k6/http';
import { parseHTML } from 'k6/html';
import debug from './debug.js';
import { AUTH_EMAIL, AUTH_PASSWORD } from '../const.js';

export default function (baseUrl) {
  // Step 1: Fetch the login page to get the authenticity token
  const loginPageRes = http.get(`${baseUrl}/users/sign_in`);

  let doc = parseHTML(loginPageRes.body);
  let tokenInput = doc.find('input[name=authenticity_token]');
  let authenticityToken = tokenInput.attr('value');
  
  debug('Authenticity token: ' + authenticityToken);

  // Check if we got the authenticity token
  check(authenticityToken, { 'got authenticity token': (t) => t !== '' });

  // Initialize a CookieJar
  const jar = new CookieJar();

  // Step 2: Submit the login form with the authenticity token and credentials
  let loginPayload = {
    authenticity_token: authenticityToken,
    'user[email]': AUTH_EMAIL,
    'user[password]': AUTH_PASSWORD,
  };

  let loginParams = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    jar: jar,
  };

  let loginRes = http.post(`${baseUrl}/users/sign_in`, loginPayload, loginParams);

  // Check if login was successful
  debug('Login response: ' + loginRes.body);
  check(loginRes, {
    'login successful': (res) => res.status === 200,
  });

  // Step 3: Use the authentication cookie to access authenticated routes
  let authCookie = jar.cookiesForURL(`${baseUrl}/users/sign_in`);

  debug('Auth cookie: ' + JSON.stringify(authCookie));
  return Object.keys(authCookie).map(key => `${key}=${authCookie[key]}`).join('; ');
}