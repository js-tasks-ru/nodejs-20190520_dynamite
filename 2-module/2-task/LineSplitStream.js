const {Transform} = require('stream');
const os = require('os');

class LineSplitStream extends Transform {
  constructor(options) {
    super(options);

    this._chunks = '';
  }

  _chunksHasEOL() {
    return this._chunks.indexOf(os.EOL) > -1;
  }

  _transform(chunk, encoding, callback) {
    const chunkString = chunk.toString();

    this._chunks += chunkString;

    if (this._chunksHasEOL()) {
      this._chunks.split(os.EOL).forEach((line) => this.push(line));
    }

    callback();
  }

  _flush(callback) {
    callback();
  }
}

module.exports = LineSplitStream;
