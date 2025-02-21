function show_btn(){
    var submit_btn = document.querySelector('.btn');
    submit_btn.style.display = 'block';
}
function toggleDealNameField(show) {
    var dealNameContainer = document.querySelector('.deal-name-container');
    dealNameContainer.style.display = show ? 'block' : 'none';
    if (show) {
      document.getElementById('amount').setAttribute('required', 'true');
      document.getElementById('dealName').setAttribute('required', 'true');
      document.getElementById('date').setAttribute('required', 'true');
      document.getElementById('stage').setAttribute('required', 'true');
    } else {
      document.getElementById('amount').removeAttribute('required');
      document.getElementById('dealName').removeAttribute('required');
      document.getElementById('date').removeAttribute('required');
      document.getElementById('stage').removeAttribute('required');
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
    return contact_id; 
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
}
async function create_deal(cont_id,acct_id){
  if(acct_id){
    deal_map.Account_Name = acct_id;
  }
  amount = document.getElementById('amount').value;
  dealName = document.getElementById('dealName').value;
  date = document.getElementById('date').value;
  stage = document.getElementById('stage').value;
  deal_map.Deal_Name = dealName;
  deal_map.Stage = stage;
  deal_map.Closing_Date = date;
  deal_map.Amount = amount;
  deal_map.Contact_Name = cont_id;
  deal_created =await ZOHO.CRM.API.insertRecord({Entity:"Deals",APIData:deal_map});
  deal_id = deal_created.data[0].details.id;
  if(deal_id){
    lead_update();
    console.log('Deal is created',deal_id);
    ZOHO.CRM.UI.Record.open({Entity:"Deals",RecordID:deal_id});
  }
}
async function checkvalidation(){
  if(existing_contact_id){
    deal_map.Get_Attachment = true;
    contact_created = existing_contact_id;
    account_created = existing_account_id;
  }
  else{
    if(agency_name){
      account_created =await create_account();
    }
    else{
      account_created = '';
    }
    contact_created =await create_contact(account_created);
  }
  console.log('On Deal Process');
  let yes = document.getElementById('yes');
  if(yes.checked == true){
    create_deal(contact_created,account_created);
  }
  else{
    lead_update();
    alert('This Lead Converted Successfully !');
    ZOHO.CRM.UI.Popup.closeReload();
  }
}