const APIURL='https://fsa-crud-2aa9294fe819.herokuapp.com/api/2407-FTB-ET-WEB-FT/events';

async function logAsync (func){
    const result = await func();
    console.log(result);
}
const state ={
    events: [],
    messages: 'This object is not in the database!',
    isError: false
};

async function getEvent (){
    const response = await fetch(`${APIURL}`); 
    const json = await response.json();

    if(!json.success){    
        throw new Error(json.error);  
    }
  state.events = [...json.data];

render();  
}

function addEventToScreen(r){
const eventElement = document.getElementById('events');
const elem = document.createElement('div');
elem.classList.add('event')
elem.setAttribute('data-id', r.id);


const idElem = document.createElement('div');
idElem.classList.add('id');
idElem.append(r.id);

const nameElem = document.createElement('div');
nameElem.classList.add('name');
nameElem.append(r.id);

const dateElem = document.createElement('div');
dateElem.classList.add('date');
dateElem.append(r.date);

const locationElem = document.createElement('div');
locationElem.classList.add('location');
locationElem.append(r.location);

const descriptionElem = document.createElement('div');
descriptionElem.classList.add('description');
descriptionElem.append(r.description)

const cohortIdElem =document.createElement('div');
cohortIdElem.classList.add('cohortId');
cohortIdElem.append(r.cohortId);

const delButtonElm = document.createElement('button') 
const buttonText =document.createElement('Delete'); 
delButtonElm.appendChild(buttonText);

delButtonElem.addEventListener('click', async (done) => {
    const selectedEvent = done.target.closets('.event');
    const id = selectedEvent.dataset.id;
    const result = await deleteEvent(id)
})

elem.append(idElem);
elem.append(nameElem);
elem.append(dateElem);
elem.append(locationElem);
elem.append(cohortIdElem);
elem.append(descriptionElem);
elem.append(delButtonElem);

eventElement.append(elem);
}

const form = document.getElementById('eventForm');
form.addEventListener('submit', async(event) =>{
    event.preventDefault();

    const id=document.getElement('id');
    const name = document.getElement('name');
    const location = document.getElement('location');
    const date = document.getElement('date');
    const description = document.getElement('description');
    const cohortId = document.getElement('cohortId');

    const party ={
        id: id.value,
        name:name.value,
        description:description.value,
        date:date.value,
        location:location.value,
        cohortId:cohortId.value
    };
    try{
        const newEvent = await createEvent(party);

        addEventToScreen(newEvent);
    }catch(err){
        console.log(err);
    }
});

function render(){
    state.events.forEach((r) => {
        addEventToScreen(r);
    });
}
async function init(){
    await getEvent();
}
init();

async function deleteEvent(id){
    try {
        const response = await fetch(`${APIURL}${id}`, {
            method: 'delete',
        })
    }
    catch
{}
init()
}