angular.module('starter.gpsServices', [])

.factory('gpsServices', function($q,$cordovaGeolocation,$http){

	var Result = {};
  var deviceInformation = "";
  var battery = "";
  Result.saveDevInformation = function(values){
    deviceInformation = values;
  }
  Result.getDevInformation = function(){
    return deviceInformation;
  }
  Result.saveBatteryDevice = function(values){
    battery = values;    
  }
  Result.getBatteryDevice = function(){
    return battery;
  }    
	Result.getCurrentPosition = function(){
		var q = $q.defer();
    var posOptions = {timeout: 6000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        
        objPosition = {
          lat : position.coords.latitude,
          lon : position.coords.longitude
        }
        q.resolve(objPosition);
      }, function(err) {
        objPosition = {
          lat : 0,
          lon : 0
        }
        q.resolve(objPosition);
    });

		return q.promise;

    }
  Result.saveSegTecn = function(url,nu_regi,proc){    
    var url = url + 'InsertSeguimiento';
    Result.getCurrentPosition().then(function(result){
      var DataUsuario = JSON.parse(localStorage.getItem('userMich'));   
      if (DataUsuario != null) { co_usu = DataUsuario.co_usua}
      var ho_movi = getDateHoraHoyCod();
        // TRAEMOS INFORMACIÓN DEL DEVICE GUARDADOS EN LA SESION
      var devInformation = Result.getDevInformation();
        // TRAEMOS EL PORCENTAJE DE BATERIA
      var statusBattery = Result.getBatteryDevice();
      var params = {
        nu_regi: nu_regi,        
        lat: result.lat,
        lon: result.lon,
        bat: statusBattery,
        //bat: '',
        horaMov: ho_movi,
        marca: devInformation.manufacturer,
        modelo: devInformation.model,
        unic: devInformation.serial,
        //marca : '',
        //modelo : '',
        //unic : '',
        co_usua: co_usu,
        no_proc: proc,
        st_regi : 'ACT'
      }
      $http({url : url,
       method: 'GET',
       params: params
      }).success(function(data){        
        console.log(data)
      })
      .error(function(err){
         //var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
      }) 
    })

  }

    var MyVarGps;
    var MyVarCound;
    var countEnviarServidor = 0;
    Result.saveCurrentPosition = function(){
      var idPersonal = localStorageServices.getDataUser()[0].id_Personal;
      if (MyVarGps != undefined) {
        clearInterval(MyVarGps);
      }
      var tiempoRepeat = 0;
      var tiempoSend = 0;
      var count = 0;
      sqliteServices.getTbl_Parametros().then(function(res){
        console.log(res.length)
        if (res.length == 0) {
          tiempoRepeat = 5000; // 5 SEGUNDOS POR DEFECTO
          tiempoSend =0.2 * 60000; // EN MINUTOS
          console.log(tiempoRepeat);
        }else{
          res.forEach(function(item,index){            
            if (item.nombre_parametro == "capturar ubicacion") {            
              tiempoRepeat = item.valor;              
            }else if(item.nombre_parametro == "Envio de Ubicacion"){
              tiempoSend = parseFloat(item.valor) * 60000;
            }
          })
        }
        MyVarGps = setInterval(myTimerGps, tiempoRepeat);
      });
      function myTimerGps() {        
        Result.getCurrentPosition().then(function(res){          
          var params = [idPersonal,res.lat,res.long,localStorageServices.getDateTimeNow()]          
          sqliteServices.saveTBL_Personal_RegistroGPS(params).then(function(res){
              var statusBattery = localStorageServices.getBatteryDevice();
              var paramsS = [idPersonal,1,statusBattery,localStorageServices.getDateTimeNow()]
              //var paramsS = [idPersonal,1,40,localStorageServices.getDateTimeNow()]
              sqliteServices.saveTbl_EstadoCelular(paramsS).then(function(res){
                count++;
                var timeTotal = count * tiempoRepeat;
                console.log('Tiempo total : ' + timeTotal + ' | tiene q ser mayor : ' + tiempoSend)
                if (timeTotal >= tiempoSend) {                  
                  // TRAEMOS LOS DATOS DE GPS GUARDADOS SEGUN PARAMETROS                  
                  sqliteServices.getTBL_Personal_RegistroGPS().then(function(data){                    
                    // REGISTRAMOS AL SERVIOR
                    Result.saveTBLPersonalRegistroGPS(data).then(function(res){
                      // ELIMINAMOS TABLA QUE GUARDA LAS UBICACIONES SQLITE
                      sqliteServices.deleteTBL_Personal_RegistroGPS();                      
                      console.log('success')
                      count = 0;
                    },function(err){
                      console.log(err)
                    })
                  });
                  // TRAEMOS LOS DATOS DE ESTADO MOVIL GUARDADOS
                  sqliteServices.getTbl_EstadoCelular().then(function(data){
                    // REGISTRAMOS DATOS AL SERVIDOR
                    Result.savetbl_EstadoCelular(data).then(function(res){
                      console.log('success 2')
                      // ELIMINAMOS TABLA Q GUARDA EL ESTADO CELULAR SQLITE
                      sqliteServices.deleteTbl_EstadoCelular();
                    })
                  })
                            
                }
              })
          });          

        },function(err){
          console.log(err)
        })

      }
    }

    Result.saveTBLPersonalRegistroGPS = function(params){
      var q = $q.defer();
      var url = UrlApi + 'TBLPersonalRegistroGPS';
      $http.post(url,params)
      .success(function(res){
        q.resolve(res);
      })
      .error(function(err){
        q.reject(err);
      })
      return q.promise;    
    }
    Result.savetbl_EstadoCelular = function(params){
      var q = $q.defer();
      var url = UrlApi + 'TBLEstadoCelular';
      $http.post(url,params)
      .success(function(res){
        q.resolve(res);
      })
      .error(function(err){
        q.reject(err);
      })
      return q.promise;    
    }    

	return Result;
})