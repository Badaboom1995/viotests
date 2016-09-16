
var app = {
  stack : [],
  urls : [],
  error : function(status,text){
    console.log(status+":"+text+",sorry :(");
  },
  buildDOM :function(data){
    console.log(data);
    // Some staff
  },
  httpGet :function(url,callbackFunc){
        return new Promise(function(resolve, reject) {

          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);

          xhr.onload = function() {
            if (this.status == 200) {
              resolve(this.response);
              var json = JSON.parse(this.response);
              callbackFunc(json);
            } else {
              var error = new Error(this.statusText); /*ловим ошибки*/
              error.code = this.status;
              reject(error);
            }
          };
          xhr.onerror = function() {
            reject(new Error("Network Error"));
          };
          xhr.send();
        });    
      },
  getJson : function(callbackFunc){
   var currentFunc ='';
   app.stack = [];
   
   for (var i =0;i<app.urls.length+1;i++){ /*В цикле собираем функцию в виде строки*/
    if (i==0){
      currentFunc +='app.httpGet("'+app.urls[i]+'",callbackFunc)';
    }
    else if(i==app.urls.length){
      currentFunc +='.then(response => {;});';
    }
    else{
      currentFunc +='.then(response => {;let next =app.httpGet("'+app.urls[i]+'",callbackFunc);return next;})';
    }
   }
  eval(currentFunc); /*Используем ужасные вещи*/
  },
  goAjax :function(stack,url,timerID,callbackFunc){
    app.urls.push(url);
    if(timerID<stack.length){
      clearTimeout(timerID);
    }
    else{
      app.getJson(callbackFunc);
    }
  },
  buildStack : function(stack, url,callbackFunc){
      var timerID = setTimeout(function(){
      app.goAjax(stack, url,timerID,callbackFunc)
    }, 500);
     
  },
  addObject : function(url, callbackFunc){
    var xhr = new XMLHttpRequest();
    app.stack.push(xhr);
    app.buildStack(app.stack,url,callbackFunc); 
  }
  
}

app.addObject("app.php",app.buildDOM);
app.addObject("app.php",app.buildDOM);
app.addObject("app.php",app.buildDOM);
app.addObject("app.php",app.buildDOM);