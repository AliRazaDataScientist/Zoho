let recd_id ;
ZOHO.embeddedApp.on("PageLoad",async function(data){
    leadrec = data.EntityId;
    recd_id = leadrec[0];
});
ZOHO.embeddedApp.init();