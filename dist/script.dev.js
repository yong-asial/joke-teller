"use strict";

var button = document.getElementById('button');
var audioElement = document.getElementById('audio');
var heading = document.getElementById('heading'); // Disabled/Enabled Button

var toggleButton = function toggleButton() {
  button.disabled = !button.disabled;
};

var speak = function speak(joke) {
  var speakers = ['Linda', 'Amy', 'Mary', 'John', 'Mike'];
  var speaker = speakers[Math.floor(Math.random() * speakers.length)];
  heading.innerText = joke;
  VoiceRSS.speech({
    key: '0740dc25088c4efc819a206eac7ff855',
    src: joke,
    hl: 'en-us',
    v: speaker,
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}; // Get Jokes API


var getJokes = function getJokes() {
  var apiUrl, response, data, delivery, setup, joke, combinedJoke;
  return regeneratorRuntime.async(function getJokes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;

          if (!(!data || data.error)) {
            _context.next = 11;
            break;
          }

          console.error(data);
          return _context.abrupt("return");

        case 11:
          delivery = data.delivery, setup = data.setup, joke = data.joke;
          combinedJoke = '';

          if (data && delivery && setup) {
            combinedJoke = "".concat(setup, " ... ").concat(delivery);
          } else if (joke) {
            combinedJoke = joke;
          }

          if (combinedJoke) speak(combinedJoke);
          toggleButton();
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
};

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton); // On Load

audioElement.hidden = true;