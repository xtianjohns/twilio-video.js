/* eslint callback-return:0 */
'use strict';

const MediaSignaling = require('./mediasignaling');

class PublisherHintsSignaling extends MediaSignaling {
  /**
   * Construct a {@link RenderHintsSignaling}.
   */
  constructor(getReceiver, options) {
    super(getReceiver, 'publisher_hints', options);
    Object.defineProperties(this, {
      _trackSidsToRenderHints: {
        value: new Map()
      },
      _isResponsePending: {
        value: false,
        writable: true,
      }
    });

    this.on('ready', transport => {
      this._log.warn('makarand publisher transport ready: ', transport);
      transport.on('message', message => {
        this._log.warn('makarand Incoming: ', message);
        switch (message.type) {
          case 'publisher_hints':
            this._processPublisherHints((message && message.publisher && message.publisher.hints, message.publisher.id) || []);
            break;
          default:
            this._log.warn('Unknown message type: ', message.type);
            break;
        }
      });
    });
  }

  // {
  //   "publisher": {
  //     "hints": [
  //       {
  //         "encodings": [
  //           {
  //             "enabled": true,
  //             "layer_index": 0,
  //             "max_bitrate": 500000,
  //             "max_framerate": 5,
  //             "render_dimensions": {
  //               "height": 180,
  //               "width": 320
  //             }
  //           },
  //           {
  //             "enabled": false,
  //             "layer_index": 1
  //           }
  //         ],
  //         "track": "MT123"
  //       }
  //     ],
  //     "id": 123
  //   },
  //   "type": "publisher_hints"
  // }
  _processPublisherHints(hints, id) {
    this._isResponsePending = false;
    const hintResponses = [];
    hints.forEach(hint => {
      hintResponses.push({
        track: hint.track,
        result: 'OK'
      });
    });
    // {
    //   "type": "publisher_hints",
    //   "publisher": {
    //     "hints": [
    //       {
    //         "track": "MT123",
    //         "result": "OK"
    //       },
    //       {
    //         "track": "MT456",
    //         "result": "INVALID_PUBLISHER_HINT"
    //       },
    //       {
    //         "track": "MT789",
    //         "result": "UNKNOWN_TRACK"
    //       }
    //     ],
    //     "id": 123
    //   }
    // }
    const payLoad = {
      type: 'publisher_hints',
      publisher: { id, hints }
    };
    this._transport.publish(payLoad);
  }
}


module.exports = PublisherHintsSignaling;
