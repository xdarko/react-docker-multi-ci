// const redis = require('redis');
// const { redisHost, redisPort } = require('./keys');

// const redisClient = redis.createClient({
//   host: redisHost,
//   port: redisPort,
//   // retry in 1 sec after connection was lost
//   retry_strategy: () => 1000,
// });

// const sub = redisClient.duplicate();

// *
//  * Calculate Fibonaccy  value for given index
//  * @param  {String|Number} index [description]
 
// const fib = index => {
//   if (index < 2) return 1;
//   return fib(index - 1) + fib(index - 2);
// };

// /**
//  * Calculate new fibonaccy value when receive new message (fibonaccy index).
//  * Save new value into 'values' hash
//  */
// sub.on('message', (channel, message) => {
//   redisClient.hset('values', fib(parseInt(message)));
// });

// sub.subscribe('insert');

const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  console.log(`
    111111111111111111111111111111111111111
  `);
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
