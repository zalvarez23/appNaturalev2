// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services', 'firebase',

  'starter.gpsServices',
  'starter.ServicesPhoto',
  'starter.popupServices'])

.run(function($ionicPlatform,$cordovaFile){
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);      
      $cordovaFile.createDir(cordova.file.externalRootDirectory, "PHOTOPROCA", false)
      .then(function (success) {
       //alert(JSON.stringify(success));
      }, function (error) {
        //alert(JSON.stringify(error));
      });      
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
       StatusBar.show();
       StatusBar.overlaysWebView(false);
       StatusBar.styleLightContent();
       StatusBar.backgroundColorByHexString("#33cd5f");
    }
    db= window.openDatabase("dbProca.db", '1', 'my', 1024 * 1024 * 100);       
  });
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
$ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
    
  .state('master', {
    url: '/viewComercial',
    templateUrl: 'master.html',
    controller: 'menuCtrl'
  })
     .state('log', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/logintab.html"
  })

  // Each tab has its own nav history stack:


.state('tab.rutas', {
      url: '/rutas',
      cache: 'false',
      views: {
        'tab-rutas': {
          templateUrl: 'templates/tab-rutas.html',
          controller: 'RutasCtrl'
        }
      }
    })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  
  
    .state('tab.rutas-detail', {
      url: '/chats/:rutaId',
      views: {
        'tab-rutas': {
          templateUrl: 'templates/rutas-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.rutas-lista', {
      url: '/rufoto/:fotoId',
      cache: 'false',
      views: {
        'tab-rutas': {
          templateUrl: 'templates/rutas-fotos.html',
          controller: 'FotosCtrl'
        }
      }
    })

     

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

 .state('tab.lista', {
    url: '/rulista',
    views: {
      'tab-lista': {
        templateUrl: 'templates/tab-lista.html',
        controller: 'listaCtrl'
      }
    }
  })

  .state('master.menu',{
    url : '/menu',
    cache : false,
    views: {
      'viewComercial':{
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  }) 

  .state('master.actividades',{
    url : '/actividades/:tipo',
    cache : false,
    views: {
      'viewComercial':{
        templateUrl: 'templates/NewSis/listaActividades.html',
        controller: 'actividadesCtrl'
      }
    }
  })   
 
  .state('master.desActividades',{
    url : '/actividadesdet/:tip',
    cache : false,
    views: {
      'viewComercial':{
        templateUrl: 'templates/NewSis/Actividad.html',
        controller: 'desActividadCtrl'
      }
    }
  })   
 

 .state('tab.lista-detail', {
      url: '/listaDetail/:pedId',
      views: {
        'tab-lista': {
          templateUrl: 'templates/tab-lista-detail.html',
          controller: 'ListaDetCtrl'
        }
      }
    })
   .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:'loginCtrl'
  })

   
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
