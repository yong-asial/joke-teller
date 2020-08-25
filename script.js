const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const heading = document.getElementById('heading');

// Disabled/Enabled Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

const speak = (joke) => {
  const speakers = ['Linda', 'Amy', 'Mary', 'John', 'Mike'];
  const speaker = speakers[Math.floor(Math.random()*speakers.length)];
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
}

// Get Jokes API
const getJokes = async () => {
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data || data.error) {
      console.error(data);
      return;
    }
    const { delivery, setup, joke } = data;
    let combinedJoke = '';
    if (data && delivery && setup) {
      combinedJoke = `${setup} ... ${delivery}`;
    } else if (joke) {
      combinedJoke = joke;
    }
    if (combinedJoke) speak(combinedJoke);
    toggleButton();
  } catch (e) {
    console.error(e);
  }
};

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

// On Load
audioElement.hidden = true;