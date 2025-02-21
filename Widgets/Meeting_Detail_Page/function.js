// Helper function to pad single-digit numbers with a leading zero
function pad(number) {
  return number < 10 ? '0' + number : number;
}

// Helper function to format timezone offset
function formatTimezoneOffset(timeString) {
  const [hours, minutes] = timeString.split(':');

  // Create a Date object with a fixed date and set the time
  const fixedDate = new Date();
  fixedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

  // Adjust the time to the desired format
  const formattedTime = `${pad(fixedDate.getHours())}:${pad(fixedDate.getMinutes())}:${pad(fixedDate.getSeconds())}+04:00`;

  return formattedTime;
}

async function handleFormSubmit() {
    from = document.getElementById("from").value;
    const [datePart, timePart] = from.split('T');
    time = formatTimezoneOffset(timePart);
    fromDate = `${datePart}T${time}`;
    to = document.getElementById("to").value;
    const [datePart1, timePart1] = to.split('T');
    time1 = formatTimezoneOffset(timePart1);
    toDate = `${datePart1}T${time1}`;
    // 2024-01-31T23:00:00+04:00
    id_mp = {
      "id":lead_id
    }
    var recordData = {
      "Event_Title" : document.getElementById("subject").value,
      "Venue" : document.getElementById("location").value,
      "Start_DateTime": fromDate,
      "End_DateTime": toDate,
      "Meeting_Type": document.getElementById("meetingType").value,
      "Meeting_Outcome": document.getElementById("meetingStatus").value,
      "se_module":"Leads",
      "What_Id":id_mp
    }
    create_rec = await ZOHO.CRM.API.insertRecord({Entity:"Events",APIData:recordData});
    id = create_rec.data[0].details.id;
      if(id){
        console.log('yes updated',id);
        $Client.close();
      }
}
async function onCancel(){
    var config={
      Entity:"Leads",
      APIData:{
            "id": lead_id,
            "Revert_Status": true
      }
    }
  update_lead =await ZOHO.CRM.API.updateRecord(config);
  rec_id = update_lead.data[0].details.id;
  if(rec_id){
    $Client.close();
  }
}