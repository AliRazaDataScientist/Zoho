function showHideFields() {
  var prospectStage = document.getElementById("prospectStage").value;
  var notesContainer = document.getElementById('notes');

  if (prospectStage === "In-call") {
    notesContainer.value = 'What is your desired outcome?\nWhat are you going to pitch/sell to them?';
  } else if (prospectStage === "Pre-call") {
    notesContainer.value = 
    'Pain & Need (ask what else!)\nWhat are they doing now?\nHow many certificates are they likely to issue per month?\nHow Urgent?\nWhat industry/specific requirements?\nAre they the decision maker?\nWho else needs to be involved?\nNext steps\nDate follow-up booked for\nEmail sent date booked';
  }
}
async function onSubmitForm() {
  let notes = document.getElementById('notes').value;
  let prospectStage = document.getElementById("prospectStage").value;
  rec =await ZOHO.CRM.API.addNotes({Entity:"Contacts",RecordID:recd_id,Title:prospectStage,Content:notes});
  ZOHO.CRM.UI.Popup.closeReload();
}