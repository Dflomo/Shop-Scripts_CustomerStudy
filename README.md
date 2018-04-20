# Shop-Scripts_CustomerStudy


## Getting Started
  This code base was developed with the eaze of investigation at mind. The script included the functionality of checking for multiple occurances of email thread updates by customer alerts, or "high priority" notifications, up until three occurance. At which it would send the the notification along with a link to the customer in the dashboard application, so that the investigator could find the context of the issue immediately. 

### Prerequisites
  Google Script enviroments where the user has the authority to export information about the currently connected inbox and spreadsheet suites of Google.
  
  Basic programming knowledge, and knowledge of basic Javascript.


### Installing
  No installation necessary. Proper function names, and importing of the code, along with a manual execution to set the Google Script property variables the first time. 
  
  You will also need to comment out the Google Script properties section once the variables have been set for your time zone.
  
## Running the tests
I recommend using the Log.logger("blah") functionality to get a better idea. The debugger is pretty decent as well. 

## Deployment
  Deployed within the Google Suite of the same account that you want to analyze

## Built With
Google Script (Javascript flavor) solely

## Authors
  Derek Florimonte

## Acknowledgments

* Workshop Cafe for letting me tinker in a new enviroment
* Inspiration: Inbox Message Forwarder that I found. It was a good tutorial, and made me start thinking about the possibilities 


