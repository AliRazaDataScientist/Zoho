let lead_id ;
let current_user_id = "";
ZOHO.embeddedApp.on("PageLoad",async function(data){
    leadrec = data.EntityId;
    lead_id = leadrec[0];
    let lead_data = await ZOHO.CRM.API.getRecord({Entity: "Leads", approved: "both", RecordID:lead_id});
    lead_rec = lead_data.data[0];
    lead_name = lead_rec.Full_Name;
    lead_owner = lead_rec.Owner.name;
    console.log(lead_owner);
    document.getElementById('subject').value = `${lead_name} - ${lead_owner}`;
});
ZOHO.embeddedApp.init();