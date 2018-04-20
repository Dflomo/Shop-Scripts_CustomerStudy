function hasBeenCounted(countedSS, threadID) {
  
  var data = countedSS.getDataRange().getValues();

  for(var each in data){
    if(threadID == data[each][1]){
      return true;
    }
  }
  return false;
}
