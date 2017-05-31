app = angular.module('starter.popupServices', [])

app.factory('popupServices', function($ionicPopup){
  var Result = {};
  Result.alertPop = function(title,template,css,$scope){
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template,
      cssClass: css,
      scope:$scope
    });
    return alertPopup;
  }
  
  Result.confirmPop = function(title,template){    
    var confirmPopup = $ionicPopup.confirm({
      title : title,
      template : template
    })
    return confirmPopup;
  }

  Result.loaderPop = function(title){
	var template = "<div class='styleLoader'>" +
                   "<ion-spinner icon='android' class='loadingok'></ion-spinner></div>";
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template,
      cssClass: 'popButtonHide'
    });
    return alertPopup;  	
  }

  Result.getDateHoy = function(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var hour = hoy.getHours();
    var minuts = hoy.getMinutes();
    var second = hoy.getSeconds();
    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    }
    if(hour<10) {
        hour='0'+hour
    } 

    if(minuts<10) {      
        minuts='0'+minuts
    }     
      hoy = yyyy+'-'+mm+'-'+dd + ' ' + hour + ':' + minuts + ':' + second;
      return hoy;  
  }
    Result.getDateHoyF = function(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var hour = hoy.getHours();
    var minuts = hoy.getMinutes();
    var second = hoy.getSeconds();
    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 
      hoy = yyyy+'-'+mm+'-'+dd;
      return hoy;  
  }

    Result.getHoraHoyF = function(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var hour = hoy.getHours();
    var minuts = hoy.getMinutes();
    var second = hoy.getSeconds();
    if(hour<10) {
        hour='0'+hour
    } 

    if(minuts<10) {      
        minuts='0'+minuts
    } 
      hoy = hour+':'+minuts;
      return hoy;  
  }  

  return Result;
})
