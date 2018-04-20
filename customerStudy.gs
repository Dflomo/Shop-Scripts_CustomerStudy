function myFunction() {
  var gInbox = GmailApp;
  var messSub;
  var threadID;
  var custID;
  var messID;
  var messDate;
  var emailDerek = "derek.florimonte@workshopcafe.com";
  var emailLaone = "laone.oagile@workshopcafe.com";
  var emailRich = "rich.menendez@workshopcafe.com";
  var newDate = new Date();
  
  var tomorrow = new Date(newDate.getTime() + (24 * 60 * 60 * 1000));
  var tomorrowStr = tomorrow.toDateString() + "\n"; 
  
  var countSSURL = "https://docs.google.com/a/workshopcafe.com/spreadsheets/d/1TH5c3tZWkfZnH-EpP1d0Sth3fl-u5Ik31cTdmwhXajs/edit?usp=sharing";
  var countSS = SpreadsheetApp.openByUrl(countSSURL);
  var ssSheet = countSS.getSheets()[countSS.getSheets().length -1];
  var ssTemplate = countSS.getSheetByName("Template");
  
  var inboxThreads = gInbox.getInboxThreads(0, 20);
  
  var scriptProperties = PropertiesService.getScriptProperties();  
//  var newPropSet = {endRange: 1518588900000, tenTime: 1518588000000, sixTime: 1518530400000, startRange: 1518529500000};
//  scriptProperties.setProperties(newPropSet, true);
  
  var startRange = scriptProperties.getProperty("startRange"); 
  var sixTime = scriptProperties.getProperty("sixTime"); 
  var tenTime = scriptProperties.getProperty("tenTime"); 
  var endRange = scriptProperties.getProperty("endRange");
  
  //  Email threads, and spreadsheet initialization
  var tempMessageArray = gInbox.search('is:starred');
 
  Logger.log("Ten Time: " + tenTime);
  Logger.log("Six Time: " + sixTime);
  Logger.log("End Range: " + endRange);
  Logger.log("Start Range: " + startRange);  
  
  //#1 IF STATEMENT
  if((newDate <= tenTime) && (newDate >= sixTime)){
    Logger.log("Entering Main Loop");
  //FOR Loop - Traverses the Inbox Threads
    for(var each in inboxThreads){
      
      messSub = inboxThreads[each].getFirstMessageSubject();
      threadID = inboxThreads[each].getId();
      
      //IF - Checks to see if the thread Id has been counted already
      if(messSub != null && !hasBeenCounted(ssSheet, threadID) && messSub.indexOf("TEST") == -1){
        
        //IF - Checks ot see if Thread Subject Line contains key words
        if(messSub.indexOf("CUSTOMER ID") > -1){
          custID = messSub.substring(messSub.lastIndexOf("ID")+3, messSub.lastIndexOf("ID")+9);
          messDate = inboxThreads[each].getLastMessageDate();
          
          //IF - Checks to see if the same Thread has 3 messages within it
          if(inboxThreads[each].getMessageCount() == 3){
            MailApp.sendEmail(emailDerek, "Found a Reoccuring Customer Thread! (" + custID + ")", 
                              "Found Customer " + custID + " with mutiple warnings! Lets check it out! :: " +
                              messSub + "\n\n https://app.workshopcafe.com/admin/customers/" + custID,
                              {cc: "laone.oagile@workshopcafe.com, rich.menendez@workshopcafe.com, heather.tom@workshopcafe.com, kevin.walls@workshopcafe.com, grace.lopez@workshopcafe.com"});
            ssSheet.appendRow([custID, threadID, messSub, messDate, "FiDi"]);
          }
        }
      }
    }
  }
  else if(newDate >= tenTime && newDate <= endRange){
//    Logger.log("Got to 10:00pm - 10:05pm\n");
    var temp = 0;
    
    temp = endRange;
    temp=+temp;
    var tempEndRange = temp + 86400000;
   
    temp = tenTime;
    temp=+temp;
    var tempTenTime = temp + 86400000;
    
    temp = startRange;
    temp=+temp;
    var tempStartRange = temp + 86400000;
    
    temp = sixTime;
    temp=+temp;
    var tempSixTime = temp + 86400000;
    
    var newPropSet = {endRange: tempEndRange, tenTime: tempTenTime, sixTime: tempSixTime, startRange: tempStartRange};
    scriptProperties.setProperties(newPropSet, true);
    
    MailApp.sendEmail(emailDerek, "Going to Sleep!(Customer ID Study)", "The Customer ID Study has sensed that it is roughly 10:00 - 10:05pm! Time to shut 'er down captain!");
//    MailApp.sendEmail(emailLaone, "Going to Sleep!(20 Min Counter)", "The 20 Min Script has sensed that it is roughly 10:00 - 10:05pm! Time to shut 'er down captain!");
    
    countSS.insertSheet(tomorrowStr, countSS.getNumSheets(), {template: ssTemplate});

  }
  else if(newDate >= startRange && newDate < sixTime){
//    Logger.log("Got to 5:55am - 6:00am\n");    
    MailApp.sendEmail(emailDerek, "Waking Up!(Customer ID Study)", "The Customer ID Study has sensed that it is roughly 5:55am - 6:00am! Yar! There be sun on the horizon!");
//    MailApp.sendEmail(emailLaone, "Waking Up!(20 Min Counter)", "The 20 Min Script has sensed that it is roughly 5:55am - 6:00am! Yar! There be sun on the horizon!");
  }
  else if(newDate > endRange && newDate < startRange){ Logger.log("Currently Sleeping\n"); }
  
  Logger.log("Exiting Main Code");
}
