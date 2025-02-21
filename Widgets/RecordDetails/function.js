async function save_rec(){
    var config={
      Entity:"Leads",
      APIData:{
            "id": rec_id,
            "First_Name" : document.getElementById('fname').value,
            "Last_Name" : document.getElementById('lname').value,
            "Email" : document.getElementById('femail').value,
            "Unique_Lead_ID" : document.getElementById('unique_id').value,
            "Campaign_Name" : document.getElementById('camp_name').value,
            "Lead_Source" : document.getElementById('lead_source').value,
            "AD_Name" : document.getElementById('AD').value,
            "Phone" : document.getElementById('Phone').value,
            "County" : document.getElementById('County').value,
            "Lead_Form_Name" : document.getElementById('formname').value,
            "Lead_Source_Platform" : document.getElementById('source').value,
            "Would_you_like_to_buy_a_home_in_NY" : document.getElementById('home_ny').value,
            "Are_you_a_First_Time_Home_Buyer" : document.getElementById('first_home').value,
            "Would_help_you_acheive_your_dream_home" : document.getElementById('dream_home').value,
            "Do_you_have_between_1_3_for_down_payment" : document.getElementById('payment').value,
            "What_is_your_yearly_household_income" : document.getElementById('yearly_income').value,
            "What_Range_does_your_credit_score_fall" : document.getElementById('score').value,
            "When_should_we_contact_you" : document.getElementById('contact_you').value,
            "Street" : document.getElementById('street').value,
            "City" : document.getElementById('City').value,
            "State" : document.getElementById('state').value,
            "Zip_Code" : document.getElementById('zipcode').value,
            "Prospect_DOB" : document.getElementById('dob').value,
            "Social_Security_Number" : document.getElementById('Security_Number').value,
            "Annual_Income" : document.getElementById('Income').value,
            "Current_Assets" : document.getElementById('Assets').value,
            "Current_Employer" : document.getElementById('employer').value,
            "Do_you_have_secondary_income" : document.getElementById('secondary_income').value,
            "Start_Date" : document.getElementById('date').value,
            "Do_you_have_a_VA_benefit" : document.getElementById('Veteran').value,
            "Borrower_Notes" : document.getElementById('notes').value,
            "Do_you_have_a_co_borrower" : document.getElementById('co-borrower').checked,
            "B2_First_Name" : document.getElementById('b2fname').value,
            "B2_Last_Name" : document.getElementById('b2lname').value,
            "B2_Email" : document.getElementById('email').value,
            "B2_DOB" : document.getElementById('b2dob').value,
            "B2_Address" : document.getElementById('b2_address').value,
            "B2_City" : document.getElementById('b2_City').value,
            "B2_State" : document.getElementById('b2_state').value,
            "B2_Zip_Code" : document.getElementById('b2_zipcode').value,
            "B2_Annual_Income" : document.getElementById('b2_Income').value,
            "Co_Borrower_Notes" : document.getElementById('b2_notes').value
      }
    }
    lead_updated =await ZOHO.CRM.API.updateRecord(config);
    console.log(lead_updated);
  ZOHO.CRM.UI.Popup.closeReload();
}