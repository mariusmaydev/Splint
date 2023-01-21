function mergeToArray(array, value){
    if(array.includes(value)){
      return array;
    } else {
      array.push(value);
      return array;
    }
  }