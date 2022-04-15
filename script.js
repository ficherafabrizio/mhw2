/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function reset(){
    
    //svuoto selected
    for(let i=0;i<3;i++){
        selected[i]=0;
    }

    //tolgo answer
    const div = document.querySelector('.answer');
    div.remove();

    //cambio aspetto e riaggiungo event listener
    for(const box of boxlist){
        box.style.opacity=1;
        box.querySelector('.checkbox').src='images/unchecked.png';
        box.style.backgroundColor= '#f4f4f4';

        box.addEventListener('click',selectBox);
    }

}

function getAnswer(mapIndex){
    console.log(RESULTS_MAP[mapIndex]);

    const div = document.createElement('div');
    const title = document.createElement('h1');
    const paragraph = document.createElement('p');
    const button = document.createElement('button');

    title.textContent=RESULTS_MAP[mapIndex].title;
    paragraph.textContent=RESULTS_MAP[mapIndex].contents;
    button.textContent='Ricomincia il quiz';

    const article = document.querySelector('article');
    div.appendChild(title);
    div.appendChild(paragraph);
    div.appendChild(button);
    div.classList.add('answer');    
    article.appendChild(div);

    button.addEventListener('click',reset);

}
function getChoice(){
    //trovo l'index della mappa results_map

    //caso tutti diversi
    if (selected[0].dataset.choiceId !== selected[1].dataset.choiceId !== selected[2].dataset.choiceId){

        getAnswer(selected[0].dataset.choiceId);

    }else{
        //caso almeno due uguali

        if(selected[2].dataset.choiceId != selected[1].dataset.choiceId){
            //caso 1&3 || 1&2
            getAnswer(selected[0].dataset.choiceId);
        }else{
            //caso 2&3
            getAnswer(selected[2].dataset.choiceId);
        }

    }

}

function blockSelection(){
    for(const box of boxlist){
        box.removeEventListener('click',selectBox);
    }
}

function highlight(container){
    container.style.opacity=1;
    container.querySelector('.checkbox').src='images/checked.png';
    container.style.backgroundColor= '#cfe3ff';
}

function hideUnselected(qId){
    for(const box of boxlist){
        if (box.dataset.questionId===qId){
            box.style.opacity=0.6;
            box.querySelector('.checkbox').src='images/unchecked.png';
            box.style.backgroundColor= '#f4f4f4';
        }
    }
}

function selectBox(event){

    const container = event.currentTarget;

    if(container.dataset.questionId==='one'){
        //caso Q1/gestione selected
        selected.splice(0,1);
        selected.splice(0,0,container);

    }else if(container.dataset.questionId==='two'){
        //caso Q2/gestione selected
        selected.splice(1,1);
        selected.splice(1,0,container);

    }else{
        //caso Q3/gestione selected
        selected.splice(2,1);
        selected.splice(2,0,container);
    }
    console.log(selected);
    //grafica
    hideUnselected(container.dataset.questionId);
    highlight(container);

    //controllo risposte
    for(const box of selected){
        if(box===0){return;}
    }
    blockSelection();
    getChoice();
    
}


const boxlist=[];
const selected=[0,0,0];

const boxes = document.querySelectorAll('.choice-grid div');

for(const box of boxes){
    box.addEventListener('click',selectBox);
    boxlist.push(box);
}