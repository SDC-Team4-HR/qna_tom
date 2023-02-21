import http from 'k6/http';
import { sleep } from 'k6';

// k6 sample code
// VU code
// export const options = {
//   stages: [
//     { duration: '30s', target: 10 },
//     { duration: '10s', target: 0 },
//   ],
// };
// init code
// export default function () {
//   http.get('http://test.k6.io');
//   sleep(1);
// }

// my code
const qID = Math.floor(Math.random() * (1000011 - 1) + 1);
const page = Math.floor(Math.random() * (10 - 1) + 1);
const count = Math.floor(Math.random() * (20 - 1) + 1);

const getAns = {
  base: 'http://localhost:3000',
  endpoint: `/qa/questions/${qID}/answers`,
};

// VU code
export const options = {
  thresholds: {
    http_req_duration: [
      { threshold: 'max < 500', abortOnFail: false },
      { threshold: 'p(95) < 200', abortOnFail: false },
    ],
    http_req_failed: [{ threshold: 'rate < 0.01', abortOnFail: true }],
  },
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      timeUnit: '1s',
      preAllocatedVUs: 500,
      stages: [
        { duration: '15s', target: 250 }, // get to 250 VUs
        { duration: '15s', target: 500 }, // up to 500
        { duration: '15s', target: 1000 }, // up at 1000
        { duration: '15s', target: 1500 }, // up to 1500
        { duration: '2m', target: 1500 }, // stay at 1500
        { duration: '3m', target: 0 }, // cooldown to 0, total 6 minutes
      ],
    },
  },
};
// init code
export default () => {
  http.get(`${getAns.base}${getAns.endpoint}?page=${page}&count=${count}`);
};
