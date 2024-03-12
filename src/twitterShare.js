const twitterURL = 'https://twitter.com/intent/tweet/';
const linkTarget = "_blank";
const windowOptions = 'menubar=no,status=no,height=750,width=500';

function openTwitterWindow(text) {
    const twitterQuery = `text=${text}`;
    return window.open(`${twitterURL}?${twitterQuery}&`,linkTarget, windowOptions);
}

export default openTwitterWindow;