let lead_id ;
let current_user_id = "";
ZOHO.embeddedApp.on("PageLoad",async function(data){
    leadrec = data.EntityId;
    lead_id = leadrec[0];
    lead_record =await ZOHO.CRM.API.getRecord({Entity: "Leads", approved: "both", RecordID:lead_id});
    r_status = lead_record.data[0].Revert_Status;
    lead_name = lead_record.data[0].Full_Name;
    lead_owner = lead_record.data[0].Owner.name;
    document.getElementById('subject').value = `${lead_name} - ${lead_owner}`;
    if(r_status == true){
        var config={
            Entity:"Leads",
            APIData:{
                  "id": lead_id,
                  "Revert_Status": false
            }
        }
        update_lead =await ZOHO.CRM.API.updateRecord(config);
    }
});
ZOHO.embeddedApp.init();