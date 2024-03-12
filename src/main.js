import thread from "./thread.js";
import threadView from "./views/threadView.js";
import openTwitterWindow from "./twitterShare.js"; 

const textarea = document.querySelector('#textInput');
const customInput = document.querySelector('#customInput');
const separatorMenu = document.querySelector('#separatorMenu');

textarea.addEventListener('input', autoResize);

separatorMenu.addEventListener('input', ()=>{
    if(separatorMenu.value === 'false') {
        customInput.classList.remove('hidden');
    }else{
        customInput.classList.add('hidden');
    }
});

//resize function
function autoResize () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight  + "px";
}

(function(){

    const handleGenerateThreads = function (caption, separator){
        thread(caption, separator);
    }

    function init(){
        threadView.addMakeThreadsHandler(handleGenerateThreads);
        threadView.addDeleteThreadsHandler();
        threadView.addCopyThreadHandler(threadView.copyContent);
        threadView.addShareThreadHandler(openTwitterWindow);
    }

    init();

}());
