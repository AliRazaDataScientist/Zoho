let rec_id ;
let module_name ;
let task_map = {};
ZOHO.embeddedApp.on("PageLoad",async function(data){
    ZOHO.CRM.UI.Resize({height:"520",width:"300"})
    rec_id = data.EntityId;
    module_name = data.Entity;
    rec_id = rec_id[0];
    current_user = await ZOHO.CRM.CONFIG.getCurrentUser();
    userid = current_user.users[0].id;
    let rec_Data = await ZOHO.CRM.API.getRecord({Entity: module_name, approved: "both", RecordID:rec_id});
    deal_data = rec_Data.data[0];
    contactname = deal_data.Contact_Name;
    Send_To_WorkDrive = deal_data.Send_To_WorkDrive;
    var config={
      Entity:"Deals",
      APIData:{
            "id": rec_id,
            "Send_To_WorkDrive": false
      },
      Trigger:["workflow"]
    }
    update_deal =await ZOHO.CRM.API.updateRecord(config);
    if(contactname){
        contactid = contactname.id;
    }
    else{
        alert("Contact is Mandatory for creating task.");
        ZOHO.CRM.UI.Popup.close();
    }
    taskowner = deal_data.Task_Owner;
    task_map = {
        "se_module":module_name,
        "What_Id" : rec_id,
        "Owner": userid,
        "Who_Id" :contactid,
        "Priority":"Hoch",
        "Status":"Nicht gestartet"
    }
});
ZOHO.embeddedApp.init();