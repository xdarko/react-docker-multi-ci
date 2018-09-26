const { redisHost, redisPort } = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  retry_strategy: () => 1000 // retry in 1 sec after connection was lost
});

const sub = redisClient.duplicate();

/**
 * Calculate Fibonaccy  value for given index
 * @param  {String|Number} index [description]
 * @return {Number}
 */
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// Calculate new fibonaccy value when receive new message (fibonaccy index)
// Save new value into 'values' hash
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
