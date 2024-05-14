import http from 'k6/http';
import { check, sleep } from 'k6';

import { BASE_URL } from './const.js';

import login from './lib/auth.js';
import debug from './lib/debug.js';

// K6 configuration options for different stages of the test
export let options = {
  stages: [
      { duration: '1m', target: 10 }, // Example: Ramp up to 10 users over 1 minute
      { duration: '5m', target: 10 }, // Stay at 10 users for 5 minutes
      { duration: '1m', target: 0 },  // Ramp down to 0 users over 1 minute
  ],
};

// Test the /dashboards endpoint
function getDashboard(headers) {
  const dashboardRes = http.get(`${BASE_URL}/home/dashboards`, { headers });
  debug('Dashboard response: ' + dashboardRes.body);
  check(dashboardRes, {
    'dashboard page status was 200': (res) => res.status === 200,
  });
}

// Test the /orders endpoint
function getPurchaseOrders(headers) {
  const ordersRes = http.get(`${BASE_URL}/companies/6008/purchase_orders`, { headers });
  debug('purchase orders response: ' + ordersRes.body)
  check(ordersRes, {
    'orders page status was 200': (res) => res.status === 200,
  });
}

export default function () {
  const cookieString = login(BASE_URL);

  // Define the headers with the authentication cookie
  const headers = { 'Cookie': cookieString };

  getDashboard(headers);
  getPurchaseOrders(headers);
  
  // Pause between iterations
  sleep(1);
}
