let lead_id; 
let existing_contact_id;
let existing_account_id;
let agency_name;
let account_map = {};
let contact_map = {};
let deal_map = {};
ZOHO.embeddedApp.on("PageLoad",async function(data){
    lead_id = data.EntityId;
    let lead_data = await ZOHO.CRM.API.getRecord({Entity: "Leads", approved: "both", RecordID:lead_id});
    lead_rec = lead_data.data[0];
    lead_email = lead_rec.Email;
    lead_phone = lead_rec.Phone;
    lead_mobile = lead_rec.Mobile;
    if(lead_email == null || lead_mobile == null || lead_phone == null){
        alert(`Mobile, Phone and Email field shouldn't empty`);
        ZOHO.CRM.UI.Popup.closeReload();
    }
    if(lead_email != null){
        search_rec =await ZOHO.CRM.API.searchRecord({Entity:"Contacts",Type:"email",Query:lead_email});
        if(search_rec.status != "204"){
            existing_contact_id = search_rec.data[0].id;
            existing_account = search_rec.data[0].Account_Name;
            if(existing_account){
                existing_account_id = existing_account.id;
            }
            console.log('Existing Contact id is ',existing_contact_id);
            console.log('Existing Account id is ',existing_account_id);
        }
    }
    u_name = lead_rec.Unit_Name;
    if(!u_name){
        u_name = '';
    }
    else{
        u_name = ` - ${u_name}`
    }
    document.getElementById('dealName').value=`${lead_rec.First_Name} ${lead_rec.Last_Name}${u_name}`;
    telesales_executive = lead_rec.Telesales_Executive;
    if(telesales_executive){
        telesales_executive=telesales_executive.id;
    }
    agency_name = lead_rec.Agency_Name;
    if(lead_rec){
        account_map ={
            "Account_Name":agency_name,
            "Phone":lead_rec.Phone,
            "Website":lead_rec.Referrer_URL,
            "Meeting_Attended_Status":lead_rec.Meeting_Attended_Status,
            "gupshupwhatsappmessaging__Gupshup_WhatsApp_Message_Opt_In":lead_rec.gupshupwhatsappmessaging__Gupshup_WhatsApp_Message_Opt_In,
            "Lead_Type":lead_rec.Lead_Type,
            "Telesale_Executive":lead_rec.Telesale_Executive,
            "Billing_City":lead_rec.City,
            "Billing_State":lead_rec.State,
            "Billing_Country":lead_rec.Country,
            "Description":lead_rec.Description,
            "Href":lead_rec.Href
        }
        contact_map = {
            "Lead_Source":lead_rec.Lead_Source,
            "First_Name":lead_rec.First_Name,
            "Last_Name":lead_rec.Last_Name,
            "Lead_Status":lead_rec.Lead_Status,
            "Email":lead_rec.Email,
            "Phone":lead_rec.Phone,
            "Typology":lead_rec.Typology,
            "Mobile":lead_rec.Mobile,
            "Skype_ID":lead_rec.Skype_ID,
            "eventbrite__Eventbrite_Id":lead_rec.eventbrite__Eventbrite_Id,
            "eventbrite__Order_Date":lead_rec.eventbrite__Order_Date,
            "Telesale_Executive":lead_rec.Telesale_Executive,
            "Email_Opt_Out":lead_rec.Email_Opt_Out,
            "Telesales_Executive":telesales_executive,
            "gupshupwhatsappmessaging__Gupshup_WhatsApp_Message_Opt_In":lead_rec.gupshupwhatsappmessaging__Gupshup_WhatsApp_Message_Opt_In,
            "Preferred_Language1":lead_rec.Preferred_Language1,
            "Meeting_Attended_Status":lead_rec.Meeting_Attended_Status,
            "Secondary_Email":lead_rec.Secondary_Email,
            "Twitter":lead_rec.Twitter,
            "eventbrite__Status":lead_rec.eventbrite__Status,
            "eventbrite__Company":lead_rec.eventbrite__Eventbrite_Company,
            "Lead_Type":lead_rec.Lead_Type,
            "Mailing_City":lead_rec.City,
            "Mailing_State":lead_rec.State,
            "Mailing_Country":lead_rec.Country,
            "Description":lead_rec.Description,
            "Href":lead_rec.Href,
            "Developer_Preferences":lead_rec.Developer_Preferences,
            "ad_id":lead_rec.ad_id,
            "Property_Name":lead_rec.Select_Property_Preference1,
            "Bedroom_Preference":lead_rec.Select_Number_of_Bedrooms,
            "utm_ad_group":lead_rec.utm_ad_group,
            "Property_Preference":lead_rec.Property_Preference,
            "utm_campaign":lead_rec.utm_campaign1,
            "fbp":lead_rec.fbp,
            "GCLID":lead_rec.GCLID,
            "utm_content":lead_rec.utm_content1,
            "utm_device":lead_rec.utm_device1,
            "Referrer_URL":lead_rec.Referrer_URL,
            "utm_medium":lead_rec.utm_medium1,
            "Keyword":lead_rec.Single_Line_2,
            "User_Agent":lead_rec.userAgent,
            "utm_name":lead_rec.utm_name1,
            "Campaign_id":lead_rec.campaign_id,
            "utm_source":lead_rec.utm_source1,
            "Community_Preference":lead_rec.Community_Preference,
            "fbc":lead_rec.fbc,
            "ga":lead_rec.ga,
            "How_Soon_Are_You_Looking_To_Buy":lead_rec.How_Soon_Are_You_Looking_To_Buy,
            "IP_Address":lead_rec.utm_term,
            "Preferable_Budget":lead_rec.Preferable_Budget1,
            "Owner_Assignment_Date":lead_rec.Owner_Assignment_Date,
            "Reassigned_Count":lead_rec.Assignment_Number,
            "Remarks":lead_rec.Remarks1,
            "Initial_Deposit_Slip":lead_rec.Initial_Deposit_Slip,
            "OTP_Offer_to_Purchase":lead_rec.OTP_Offer_to_Purchase,
            "Passport_Copy":lead_rec.Passport_Copy,
            "AML_CIF_Form":lead_rec.AML_CIF_Form,
            "Sales_Purchase_Agreement_SPA":lead_rec.Sales_Purchase_Agreement_SPA,
            "ID_Copy":lead_rec.ID_Copy,
            "Lead":lead_id[0]
        }
        deal_map={
            "Meeting_Attended_Status":lead_rec.Meeting_Attended_Status,
            "gupshupwhatsappmessaging__Gupshup_WhatsApp_Message_Opt_In":lead_rec.gupshupwhatsappmessaging__Gupshup_WhatsApp_Message_Opt_In,
            "Lead_Type":lead_rec.Lead_Type,
            "Telesale_Executive":lead_rec.Telesale_Executive,
            "Description":lead_rec.Description,
            "Href":lead_rec.Href
        }
    }
});
ZOHO.embeddedApp.init();