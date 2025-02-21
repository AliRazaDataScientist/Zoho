async function onCancel(){
  var config={
    Entity:"Leads",
    APIData:{
          "id": lead_id[0],
          "Revert_Status": true
    }
  }
  update_lead =await ZOHO.CRM.API.updateRecord(config);
  rec_id = update_lead.data[0].details.id;
  if(rec_id){
    $Client.close();
  }
}
async function create_account(){
  account_created =await ZOHO.CRM.API.insertRecord({Entity:"Accounts",APIData:account_map});
  account_id = account_created.data[0].details.id;
  if(account_id){
    console.log('account created',account_id);
    return account_id;
  }
}
async function create_contact(acct_id){
  if(acct_id){
    contact_map.Account_Name = acct_id;
  }
  contact_created =await ZOHO.CRM.API.insertRecord({Entity:"Contacts",APIData:contact_map});
  contact_id = contact_created.data[0].details.id;
  if(contact_id){
    console.log('contact created',contact_id);
    let lead_data = await ZOHO.CRM.API.getRecord({Entity: "Contacts", approved: "both", RecordID:contact_id});
    lead_rec = lead_data.data[0];
    cid = lead_rec.Lead_Number1;
    return { contact_id, cid }; 
  }
}
function lead_update(){
  var config={
    Entity:"Leads",
    APIData:{
          "id": lead_id[0],
          "Lead_Status": 'Closed Won'
    }
  }
lead_updated = ZOHO.CRM.API.updateRecord(config);
$Client.close();
}
async function create_deal(cont_id,acct_id,cID){
  if(acct_id){
    deal_map.Account_Name = acct_id;
  }
  amount = document.getElementById('amount').value;
  date = document.getElementById('date').value;
  stage = document.getElementById('stage').value;
  apnumber = document.getElementById('apnumber').value;
  buildingNumber = document.getElementById('buildingNumber').value;
  projectName = document.getElementById('projectName').value;
  developerName = document.getElementById('developerName').value;
  source = document.getElementById('source').value;
  category = document.getElementById('category').value;
  subcategory = document.getElementById('subcategory').value;
  initialDeposit = document.getElementById('initialDeposit').value;
  comment = document.getElementById('comment').value;
  deal_map.Deal_Name = `${UniqueLead}${cID}${UnitNumber}`;
  deal_map.Stage = stage;
  deal_map.Closing_Date = date;
  deal_map.Amount = amount;
  deal_map.Contact_Name = cont_id;
  deal_map.Apartment_Number = apnumber;
  deal_map.Building_Number = buildingNumber;
  deal_map.Project_Name = projectName;
  deal_map.Developer_Name = developerName;
  deal_map.Lead_Source = source;
  deal_map.Category = category;
  deal_map.Sub_Category = subcategory;
  deal_map.Initial_Deposit = initialDeposit;
  deal_map.Remarks_Comments = comment;
  deal_created =await ZOHO.CRM.API.insertRecord({Entity:"Deals",APIData:deal_map});
  deal_id = deal_created.data[0].details.id;
  if(deal_id){
    lead_update();
    console.log('Deal is created',deal_id);
  }
}
async function checkvalidation(){
  if(existing_contact_id){
    deal_map.Get_Attachment = true;
    contactid = existing_contact_id;
    account_created = existing_account_id;
    cID = UniqueContact;
  }
  else{
    if(agency_name){
      account_created =await create_account();
    }
    else{
      account_created = '';
    }
    result = await create_contact(account_created);
    contactid = result.contact_id;
    cID = ` - ${result.cid}`;
  }
    create_deal(contactid,account_created,cID);
}