"use strict";

var button = document.getElementById('button');
var audioElement = document.getElementById('audio');
var heading = document.getElementById('heading'); // VoiceRSS Javascript SDK

var VoiceRSS = {
  speech: function speech(e) {
    this._validate(e), this._request(e);
  },
  _validate: function _validate(e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";

    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;

      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;

        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;

        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;

        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;

        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }

      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function _request(e) {
    var a = this._buildRequest(e),
        t = this._getXHR();

    t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        audioElement.src = t.responseText, audioElement.play();
      }
    }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a);
  },
  _buildRequest: function _buildRequest(e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true";
  },
  _detectCodec: function _detectCodec() {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "";
  },
  _getXHR: function _getXHR() {
    try {
      return new XMLHttpRequest();
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}

    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}

    throw "The browser does not support HTTP request";
  }
}; // Disabled/Enabled Button

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