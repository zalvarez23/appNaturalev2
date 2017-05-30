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

  return Result;
})
