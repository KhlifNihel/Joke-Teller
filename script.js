const button = document.getElementById('button');
const audioElement = document.getElementById('audio')

//disable/disable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passing our joke to our voicerss api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '0c0a7d87c2b340c4ae0511c10b2caab5',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke
        }
        // text-to-Speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch (error) {
        //catch errors
        console.log('OOPS !', error)
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);