import { pubSub } from "../pubsub.js";

class thread_view {
    constructor() {
        this.body = document.querySelector('.threadEx');
        this.threadsContainer = document.querySelector('.generated-threads');
    }

    renderThread = (array) => {
     let generatedThreads = "";

     array.forEach((item,index)=>{
        const markup = threadView.generateThreadMarkup({caption:item, index});
        console.log({caption:item, index});
        generatedThreads += markup;
     });
     this.threadsContainer.innerHTML = generatedThreads;
    }

    addCopyThreadHandler(handler){
        this.body.addEventListener('click', (event)=>{
            const btn = event.target.closest('.copyBtn');
            if(!btn) return;
            const parentElement = btn.parentElement.parentElement;

            let text = btn.parentElement.previousElementSibling.textContent;
            handler(text);

            /* Remove the hidden class to show that the text has been copied */
            parentElement.querySelector('.copyToggle').classList.remove('hidden');

        });
    }

    addShareThreadHandler(handler) {
        this.body.addEventListener('click', (event)=>{
            const btn = event.target.closest('.shareTweet');
            if(!btn) return;
            const parentElement = btn.parentElement.parentElement;

            let text = btn.parentElement.previousElementSibling.textContent;
            handler(text);

            console.log( parentElement.querySelector('.copyToggle'));

            /* Remove the hidden class to show that the text has been copied */
            parentElement.querySelector('.copyToggle').classList.remove('hidden');
        });
    }

    async copyContent(text) {
        try {
          await navigator.clipboard.writeText(text);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    }

    addMakeThreadsHandler(handler){
        this.body.addEventListener('click', (event)=>{
            const btn = event.target.closest('.generateThreadBtn');
            if(!btn) return;
            
            let caption = this.body.querySelector('#textInput').value;
            let separator = this.body.querySelector('#separatorMenu').value;
            let characterSep = "";

            switch (separator) {
                case 'two-spaces':
                    characterSep = "  ";
                    break;
                case 'three-spaces':
                    characterSep = "   ";
                    break;
                case '...':
                    characterSep = "...";
                    break;
                case '[]': 
                    characterSep = "[]";
                    break;
                case 'new-line':
                    characterSep = '\n';
                    break;
            }

            if (separator === 'false') {
               let customSeparator = this.body.querySelector("#customInput").value;

                /* Call with custom separator */
                handler(caption.trim(), customSeparator);
                return;
            }

            //call the function(caption, separator);
            handler(caption.trim(), characterSep);
        });
    }

    addDeleteThreadsHandler(){
        this.body.addEventListener('click', (event)=>{
            const btn = event.target.closest('.deleteThreads');
            if(!btn) return;

            this.threadsContainer.innerHTML = "";
        });
    }

    generateThreadMarkup(data){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(` <div>
        <div class="relative p-2 sm:p-4 flex items-center justify-between rounded-[.3rem] border border-slate-300 transition-all">
        <p class="threadText md:text-[1.2rem]">${data.caption}</p>

        <div class="flex flex-col sm:flex-row gap-[.5rem] items-center sm:gap-[1rem]">
        <button class="border-2 border-slate-700 px-2 py-1 sm:px-4 md:px-6 md:py-2 rounded-full duration-[.5s] hover:bg-black hover:text-white copyBtn">Copy</button>
        ${data.index === 0 ? `<button class="px-2 py-1  sm:px-4 md:px-6 md:py-2 rounded-full duration-[.5s] text-white bg-blue-500 hover:bg-black shareTweet">Tweet</button>` : ``}

        <div class="hidden absolute bottom-0 right-1/2 sm:right-6 md:right-2 copyToggle">
        <i class="fa-solid fa-check text-blue-500"></i>
        </div>
        
    </div>
    </div>
        `).children[0].innerHTML;
    }
}

const threadView = new thread_view();

export default threadView;

/* Subscribe to the necessary events */
pubSub.subscribe('generateThreads', threadView.renderThread);

/* jonah...and the three boys who you all already Know are just here doing nothing today and to be honest there are somethings that are not here today... and the bes tof teh the best ... and ... and the st4e... and a d... adhfad */