const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2407-FTB-ET-WEB-FT/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#partyList");
const partyForm = document.querySelector("#partyForm");
partyForm.addEventListener("submit", addParty);
partyList.addEventListener("click", deleteParty);


async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
    console.log(json.data);
  } catch (error) {
    console.log(error);
  }
}

async function render() {
  await getParties();
  renderPartyList();
}
render();
