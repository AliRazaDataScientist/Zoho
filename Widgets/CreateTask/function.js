async function onSubmitForm() {
  pvSol = document.getElementById('pvSol').value;
  description = document.getElementById('description').value;
  task_map.Description =  `${pvSol}\n${description}`;
  task_map.Subject =  `PV-Sol - ${pvSol} - ${deal_data.Deal_Name}`;
  create_rec = await ZOHO.CRM.API.insertRecord({Entity:"Tasks",APIData:task_map});
  console.log('Task Created',create_rec);
  // Now upload file in deal module
  const fileInput = document.getElementById('attachments');
  if (fileInput.files.length !== 0) {
    for (var i = 0; i < fileInput.files.length; i++) {
      var selectedFile = fileInput.files[i];
      var filename = selectedFile.name;
      file_upload = await ZOHO.CRM.API.attachFile({
        Entity: "Deals",
        RecordID: rec_id,
        File: {
              Name: filename,
              Content: new Blob([selectedFile])
            }
      });
      console.log("file upload Done");
    }
    var config={
      Entity:"Deals",
      APIData:{
            "id": rec_id,
            "Send_To_WorkDrive": true
      },
      Trigger:["workflow"]
    }
    update_deal =await ZOHO.CRM.API.updateRecord(config);
    console.log(update_deal);
  }
  ZOHO.CRM.UI.Popup.closeReload();
}