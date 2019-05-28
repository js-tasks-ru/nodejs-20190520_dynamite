const {Transform} = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends Transform {
  constructor(options) {
    super(options);

    this._limit = options.limit;
    this._currentSize = 0;
  }

  _transform(chunk, encoding, callback) {
    this._currentSize += chunk.length;

    if (this._currentSize > this._limit) {
      callback(new LimitExceededError());
    }

    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
