
// VARIABLE RUTA
//var urlNaturale = "http://200.110.43.43/ContentServicesNaturale.asmx/";
//var urlNaturale = "http://192.168.0.17:8056/ContentServicesNaturale.asmx/";
var urlNaturale = "http://192.168.0.12:8056/ContentServicesNaturale.asmx/";
var urlPhoto = "http://192.168.0.12:8089/api";
//var urlPhoto = "http://www.naturale.com.pe/webapifoto/api";
//
  var getDateHoyCod = function(){
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
      hoy = yyyy+''+mm+''+dd + '' + hour + '' + minuts + '' + second;
      return hoy;  
  } 
function getDateNow(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f=new Date();
return diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}
  var getDateHoraHoyCod = function(){
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
      hoy = yyyy+'-'+mm+'-'+dd + ' ' + hour + ':' + minuts + ':' + second;
      return hoy;  
  } 
function getDateHoy(){
  var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 
  hoy = yyyy+'-'+mm+'-'+dd;
  return hoy;
}
var usuario;
var rutas;
var usunick,fechahoy;
var condicion='1';
var walidarFoto='0'
var fecha1,fecha2;
var filesArch;
fecha1=getDateHoy();
fecha2=getDateHoy();
angular.module('starter.controllers', ['firebase'])
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
              
            element.bind('change', function () {
                    scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                  filesArch=element[0].files[0];
                });
            });
        }
    };
}])

.controller("backControl",function($scope,$ionicHistory,$ionicSideMenuDelegate){
 $scope.myGoBack = function() {
 
    $ionicHistory.goBack();
  };
 $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})
.controller("FotosCtrl",function($rootScope, $scope, $cordovaCamera, $ionicActionSheet, $cordovaFileTransfer,$ionicLoading,$http,$stateParams,$window,$location,Chats,$ionicModal,$ionicPopup, $timeout){

// parametros de la pagina


  var parameters=$stateParams.fotoId;
  parameters = parameters.split("|");  
  var idTienda = parameters[3]
  //VALIDAMOS SI EL TIPO DE RUTA ES VENTA O NORMAL
  var contentVenta= document.getElementById("contentVenta");

  if (parameters[1]=="si" || parameters[1]=="SI") {
    // SI ES VENTA
      
    $scope.titleRutaFoto="VENTA Y TOMA DE FOTOS";
    contentVenta.style.display="";
  
  }else{
    // SOLO FOTO
    $scope.titleRutaFoto="TOMA DE FOTOS";
    contentVenta.style.display="none";
  };

function getReportUltimasVentas(){

   var params = {
                idTienda: idTienda
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaUltimaVentas',
 // $http({url: 'http://192.168.0.13:8092/ContentServicesNaturale.asmx/ListaUltimaVentas',
        method: 'GET',
        params: params
       }).success(function(data){
        $scope.ListaReport = data;
          
       })

}
//
// PARAMETROS Y FUNCIONES PARA EL MODAL DE PRODUCTOS 
$ionicModal.fromTemplateUrl('reporte.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
   getReportUltimasVentas()
    $scope.modalReport = modal;
  });

  $scope.openModalReport = function() {

    $scope.modalReport.show();

  };
  $scope.closeModalReport = function() {
    $scope.modalReport.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalReport.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
// PARAMETROS Y FUNCIONES PARA EL MODAL DE PRODUCTOS 
$ionicModal.fromTemplateUrl('productos.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.ListaProductos(0);
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
$ionicModal.fromTemplateUrl('reporteEquipos.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalEquipos = modal;
  });
  $scope.openModalEquipos = function() {
    $scope.modalEquipos.show();
    $scope.getEquipos();
  };
  $scope.closeModalEquipos = function() {
    $scope.modalEquipos.hide();
  };  
  $scope.changeTxt = function(check,id){
      var txt = document.getElementById('txt'+id);
    if (check==true) {
    
      txt.focus();
      txt.value='';
    }else{
      txt.value='0';
    };
  }
//
$scope.productos = [];

// funcion PARA LLENAR LOS PRODUCTOS
 $scope.ListaProductos = function(con){

  $scope.modal.show();
  var loader= document.getElementById('divCargandoProductos'); 
  if (con==0) { loader.style.display=""; };
  

   var params = {
                idCanal: parameters[2]
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaProductos',
        method: 'GET',
        params: params
       }).success(function(data){
        
         $scope.productos=data;
         var items= $scope.productosAgregados;

           for (var i = 0; i < items.length; i++) {
            if (items[i].check==true) {

                  for (var x = 0; x < $scope.productos.length; x++) {
                    if ($scope.productos[x].id==items[i].id) {
                        $scope.productos[x].check=true;
                        $scope.productos[x].cantidad=items[i].cantidad;
                        
                    };
                  }
            };
           }

       if (con==0) { loader.style.display="none"; };
       }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
//

 }
 
 $scope.ListaBonificacion = function(con){


   var params = {
                idLocal: parameters[2]
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaBeneficios',
        method: 'GET',
        params: params
       }).success(function(data){
        
         $scope.beneficios=data;
  
       })
//
  
 }

$scope.productosAgregados=[];
$scope.agregarProducto = function(){
  $scope.productosAgregados=[];
  var items=$scope.productos;
    for (var i = 0; i < items.length; i++) {
      if (items[i].check==true) {
        if (items[i].cantidad != 0) {
           $scope.productosAgregados.push(
        {
          id: items[i].id,
          desProducto: items[i].desProducto,
          precProducto: items[i].precProducto,
          check: true,
          cantidad: items[i].cantidad
        })
        
        };
       
      };
    }
}

$scope.calculoTotal=function(){
  var items = $scope.productosAgregados;
  if (items.length==0) {
    return 0.0;
  }else{
    var total=0;
     for (var i = 0; i < items.length; i++) {
      total += parseFloat(items[i].cantidad) * parseFloat(items[i].precProducto)
    };
 
    return "SubTotal : " + (total * 1.18).toFixed(3) + " S/."
  };
  
}
$scope.deleteProductoAgregado= function(item){

  var index = $scope.productosAgregados.indexOf(item);
  $scope.productosAgregados.splice(index, 1);    


}
// SCOPE PARA CAMTURAR EL TIPO DE DOCUMENTO
 $scope.MessageConfirm = function(message) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmación',
     template: '<p style="font:menu;">' + message + '</p>'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $scope.AddCabPedido();
     } else {
       return false 
     }
   });
 };
 // SCOPE PARA CAMTURAR EL TIPO DE DOCUMENTO
 $scope.MessageConfirmFoto = function(message) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmación',
     template: '<p style="font:menu;">' + message + '</p>'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $scope.AddMultiFoto();
     } else {
       return false 
     }
   });
 };
 // An alert dialog
 $scope.AlertMessage = function(tittle,message) {
   var alertPopup = $ionicPopup.alert({
     title: tittle,
     template: '<p style="font: menu;color: rgb(234, 75, 57);">' + message + '</p>'
   });

   alertPopup.then(function(res) {
     
   });
 };
$scope.checkedTipo=false;
// FUNCION PARA REGISTRAR EL PEDIDO
 $scope.PopAddCabConfirm = function(){
  // VALIDAMOS SI TIENE SELECCIONAR UN ITEM O MAS .
  if ($scope.productosAgregados.length==0) {
    $scope.AlertMessage('Error','No ha seleccionado ningun producto para generar un pedido.')
    return;
  };
  // ABRIMOS POPUP PARA CONFIRMA EL PEDIDO
  $scope.MessageConfirm('Esta por generar un pedido , desea confirmar ?')
 
 }
//

$scope.AddCabPedido = function(){
    $ionicLoading.show({
    template: 'Generando Pedido. . ',


  })

   var params = {
                local: parameters[3],
                tipoDocumento: 'F',
                nroSeguimiento: parameters[0],
                usuario: usunick
            }


$http({url: urlNaturale + 'SaveCabPedido',
        method: 'GET',
        params: params
       }).success(function(data){
        var id = data;
      $scope.AddDetPedido(id)

       }).error(function(){
           $ionicLoading.hide();
    alert('Ocurrio un problema con la conexion, vuelva a intentar.')
 
      });

}
  

// FUNCION PARA REGISTRAR EL PEDIDO
 $scope.AddDetPedido = function(idPed){

 for (var i = 0; i < $scope.productosAgregados.length; i++) {

  var params = {
                idProducto: $scope.productosAgregados[i].id,
                cantidad: $scope.productosAgregados[i].cantidad,
                precUnit: $scope.productosAgregados[i].precProducto,
                idPedido: idPed
            }
            var x = 0;


  $http({url: urlNaturale + 'SaveDetPedido',
          method: 'GET',
          params: params
         }).success(function(data){
          x+=1;

          if (x == $scope.productosAgregados.length) {

             $ionicLoading.hide();
                  $ionicLoading.show({
          template: 'Pedido Generado Correctamente . . ',
          duration: 1000
         

        })
           //BLOQUEAMOS LOS BOTONES PARA NO GENERAR NUEVAMENTE UN PEDIDO
          document.getElementById("btnSeleccionaProductos").style.display='none';
          document.getElementById("btnGenerarPedido").style.display='none';
          };
     
         }).error(function(){
             $ionicLoading.hide();
      alert('Ocurrio un problema con la conexion, vuelva a intentar.')
      return;
        });

   }
     

 }


  var tifotosube;
   var FotoMultiple=0;
   var server = "http://peruvending.com/naturale/adm/uploader2.php",
       filePath,
       namePhoto,
       idphoto;
       idphoto=parameters[0];
       namePhoto=idphoto + '.jpg';
   
  $scope.usuariologer=usuario;
  $scope.idtxt=idphoto;
  //POPUP //
      $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Subió la foto correctamente !',
       template: 'Deseas subir otra fotografía?'
     });
     confirmPopup.then(function(res) {
       if(res) {
    
        FotoMultiple+=1;
        namePhoto=$stateParams.fotoId + '-' +FotoMultiple + '.jpg';

       } else {
        FotoMultiple=0;
         location.href="#/tab/rutas";
       }
     });
   };

   //

   $scope.viewPhoto = function(img){
    $scope.imgURI =img;
    
   }
 // $scope.pictures=[{src: 'img/adam.jpg'},{src: 'img/300.png'},{src: 'img/emoliente.jpg'},{src: 'img/chichamorada.jpg'}];
 $scope.pictures=[];

  $scope.takePicture = function(){
    var config=Chats.all()
    if ($scope.pictures.length==4) {
      alert('Ya llego al maximo de fotos tomadas .');
      return;
    };
   
    if (config[0].checked==false) {
    tifotosube='cam'
    
      var options= {
       quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 250,
      targetHeight: 324,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    }
    }else{
     tifotosube='gal'
      var options= {
       quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 250,
      targetHeight: 324,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    }
    };
 
    $cordovaCamera.getPicture(options).then(function(imageData){
     // LLENAMOS AL OBJETO CON UN PUSH POR CADA FOTO QUE ESCOGAMOS COMO MAXIMO 4 REGISTROS
      var coment=document.getElementById(idphoto);
     $scope.pictures.push(
        {nrosegui: idphoto,
         src: "data:image/jpeg;base64," +imageData,
         tipofoto: tifotosube,
         comentario: coment.value
         }
      );
     coment.value='';
 //var image = document.getElementById('tempImage');
   //         image.src = imageData;  
          $scope.imgURI=  "data:image/jpeg;base64," + imageData; 
          
            server = "http://peruvending.com/naturale/adm/uploader2.php";
           filePath =  "data:image/jpeg;base64," +imageData;
           walidarFoto='1';
        
    }, function(error){

    });
  };

  // FUNCION PARA SUBIR FOTO
       $scope.send = function(){
      
       if (walidarFoto=='1') {
        walidarFoto='0';
       }else{
       $scope.AlertMessage('Error','No ha relizado ninguna una toma de fotos.')
        return;
       };
     //   if (comentfoto.value=='') {
      //    alert('Ingresar un comentario a la foto.')
       //  return;
        //}
        $ionicLoading.show({
      template: 'Subiendo Foto. . ',
    })

  var count=0;
     for (var i = 0; i < $scope.pictures.length; i++) {
      
                var options = {
                fileKey: "file",
                fileName: idphoto +'_' + i + '.jpg',
                chunkedMode: false,
                mimeType: "image/jpg"
            };
             var filePathR = $scope.pictures[i].src;
       
              $cordovaFileTransfer.upload(server, filePathR, options).then(function(result) {

                     count +=1;
          
               if (count==$scope.pictures.length) {
                $ionicLoading.hide();
                $scope.AddMultiFoto();  
               };
            }, function(err) {
               $ionicLoading.hide();
               alert('Ocurrio un error con la conexion al subir foto!')
                //alert(JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
            });

         }

     }
               
  $scope.deleteFoto= function(item){

  var index = $scope.pictures.indexOf(item);
  $scope.pictures.splice(index, 1);    


}
  $scope.AddMultiFoto = function(){
 
    $ionicLoading.show({
    template: 'Guardando Información. . ',
  })
    var count= 0;
     for (var i = 0; i < $scope.pictures.length; i++) {

         var params = {
                idSeguimiento: $scope.pictures[i].nrosegui,
                nomFoto: $scope.pictures[i].nrosegui +'_' + i + '.jpg',
                comentario: $scope.pictures[i].comentario,
                tipFoto: $scope.pictures[i].tipofoto,
                usuario: usunick
            }
           
  $http({url: urlNaturale + 'NewAddMultiFotoss',
          method: 'GET',
          params: params
         }).success(function(data){
         
         count += 1;
         if (count == $scope.pictures.length) {
           $ionicLoading.hide();
                  $ionicLoading.show({
    template: 'Proceso de fotos generada correctamente . . ',
    duration: 1000
  
  })
                  var limpiar=[];
             Chats.llenarRutas(limpiar);
             location.href="#/tab/rutas";

         };
         }).error(function(){
             $ionicLoading.hide();
            alert('Ocurrio un problema con la conexion, vuelva a intentar.')
            return;
        });

     }
     
  }

  $scope.getEquipos = function(){
    
   var params = {
                idLocal: idTienda
                //idTienda
            }            
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .
$http({url: urlNaturale + 'ListaEquipos',
//$http({url: urlNaturale + 'ListaEquipos',
 // $http({url: 'http://192.168.0.13:8092/ContentServicesNaturale.asmx/ListaUltimaVentas',
        method: 'GET',
        params: params
       }).success(function(data){
        
        $scope.listaEquipos = data;
          
       })
  }

        
})


.controller('RutasCtrl', function($scope,$http,$ionicLoading, Chats,$location,$ionicModal) {

$ionicLoading.hide();
 $scope.usuariologer=usuario; 

  var loading=document.getElementById('divCargandoRutas');
  
  $scope.fechaini=fecha1;
  

 //$scope.chats = Chats.all();
$scope.canales=[];

 $scope.ListaRutasRc = function(loadingcon){
  if (loadingcon==0) {$scope.loadingDis=''};
    
    var fechaini =document.getElementById("txtfechaini")
    var fechafin=document.getElementById("txtfechafin")

    fechaini= fechaini.value.split("-").reverse().join("/");
    // Valores para traer Rutas
 var params = {
                usuario: usunick,
                fecha: fechaini,
                tomofoto: 'NO'       
              }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaRutas',
        method: 'GET',
        params: params
       }).success(function(data){    
      $scope.canales=[];
      Chats.llenarRutas(data);
      
      var id="";
      var count=0;
      var condicion=-1;
         for (var i = 0; i < data.length; i++) {

          // VARIABLE QUE HARA EL CONTEO EN CADA RECORRIDO
          count +=1;
          // CONDICION PARA QUE SOLO LLENE CON UN PUSH LOS DATOS QUE NO SE REPITEN.
          // ALGORITMO PARA HACER UN DISTINC PRACTICAMENTE .
          if (data[i].idTienda!=id) {
            condicion +=1;
             $scope.canales.
             push({ id :data[i].id,
                    idTienda: data[i].idTienda,
                    nomTienda: data[i].nomTienda,
                    direccion: data[i].direccion,
                    count: '1',
                    fecha: data[i].fechaSupe,
                    razon: data[i].razon
                 })
                  id=data[i].idTienda; 
               }else{
                $scope.canales[condicion].count=count;
               };
               //
         }
    if (data.length==0) {
      $ionicLoading.hide();
                  $ionicLoading.show({
    template: 'No tiene rutas pendientes  . . ',
    duration: 1000
  
  })
                  
   $scope.canales=null;     
   
   if (loadingcon==0) {$scope.loadingDis='none';};
    return;
    }

   if (loadingcon==0) {$scope.loadingDis='none';};
    $ionicLoading.hide();
    }).error(function(){
        alert('Ocurrio un problema con la conexion, vuelva a intentar.')
    if (loadingcon==0) {$scope.loadingDis='none';};
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
       $scope.loadingDis='none';
     });
  }

var dataTem = Chats.allRutas();


if (dataTem.length !=0) {
  var id="";
      var count=0;
      var condicion=-1;
         for (var i = 0; i < dataTem.length; i++) {
          
          // VARIABLE QUE HARA EL CONTEO EN CADA RECORRIDO
          count +=1;
          // CONDICION PARA QUE SOLO LLENE CON UN PUSH LOS DATOS QUE NO SE REPITEN.
          // ALGORITMO PARA HACER UN DISTINC PRACTICAMENTE .
          if (dataTem[i].idTienda!=id) {
            condicion +=1;
             $scope.canales.
             push({ id :dataTem[i].id,
                    idTienda: dataTem[i].idTienda,
                    nomTienda: dataTem[i].nomTienda,
                    direccion: dataTem[i].direccion,
                    count: '1',
                    fecha: dataTem[i].fechaSupe,
                    razon: dataTem[i].razon
                 })
                  id=dataTem[i].idTienda; 
               }else{
                $scope.canales[condicion].count=count;
               };
               //
         }
         $scope.loadingDis='none';
         return;
   
};
setTimeout(function(){ $scope.ListaRutasRc(0) }, 1000);


// FUNCION LISTAR DIRECCIONES
})
.controller('CerrarSesion', function($scope,$ionicLoading,$timeout,Chats) {

  function callAtTimeout() {
    location.href="#/login" ;
}
  $scope.close=function(){
 var data=[];
  Chats.llenarRutas(data);

    $ionicLoading.show({
    template: 'Cerrando sesión . . ',
    duration: 2000
  
  })
   $timeout(callAtTimeout, 2000);
  };


})

.controller('ChatDetailCtrl', function($scope, $stateParams,$http, Chats) {
  
 //alert('Entro lista tiendas')
 
 var parameters= $stateParams.rutaId
 parameters= parameters.split('|');
 $scope.tiendas=Chats.allRutas();

 $scope.search=function(item){
  
  if (parameters[1]==item.idTienda) {
    
    return true
  
  }else{
   return false;
 };

 
 }
 
})

.controller('AccountCtrl', function($scope,Chats,$http) {
  $scope.config =  Chats.all();
 
  $scope.settings = {
    enableFriends: true
  };
   var fechaDesde=document.getElementById("txtDesdeRecord");
    var fechaHasta=document.getElementById("txtHastaRecord");
     var loader = document.getElementById('divCargandoRecord');
  //
    
    fechaDesde.value=getDateHoy();
    fechaHasta.value=getDateHoy();

  $scope.fechaNow = getDateNow();

  $scope.listaRecordUsuarios = function(){
    loader.style.display='';

      var params = {
                usuario: usunick,
                fechaini: fechaDesde.value,
                fechafin: fechaHasta.value
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaRecordUsuariosR',
        method: 'GET',
        params: params
       }).success(function(data){
        $scope.ListaReport =data;
        
loader.style.display='none';
}).error(function(){
    alert('Ocurrio un problema con la conexion, vuelva a intentar.')
 
    loader.style.display='none';
});

  }


$scope.listaRecordUsuarios();


})

.controller('loginCtrl', function($scope,gpsServices,$http,$rootScope,$cordovaDevice,$cordovaBatteryStatus,$ionicPlatform,$ionicLoading,$location,Chats,$firebaseArray,$firebaseObject,$state){
  document.addEventListener("deviceready",function(){    
    $ionicPlatform.ready(function() {
      $rootScope.$on("$cordovaBatteryStatus:status", function(event, args) {
          if(args.isPlugged) {              
              gpsServices.saveBatteryDevice(args.level)                
            } else {                
              gpsServices.saveBatteryDevice(args.level)          
          }
      });    
      var device = $cordovaDevice.getDevice();
      gpsServices.saveDevInformation(device);
    });
  })

  var ref = new Firebase('https://appchatalvarez.firebaseio.com/');

 // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.nroserie=0;
 ref.on("value", function(snapshot) {
  configSerie = snapshot.val();
  $scope.nroserie = configSerie.alerta.value;
  

  }, function (errorObject) {
   $scope.nroserie = 1;
  });

  $scope.listCanSwipe = true
 var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
  hoy = yyyy+'-'+mm+'-'+dd;

  var usu,pass;

   // FUNCION INICIO DE SESION
 $scope.InicioSesion = function(){
  
  if ($scope.nroserie != 1) {
     alert('Ocurrio un problema con la conexion, Consulte al administrador de Sistema .');
      return;
  };
  // LOADING CARGANDO . . . INICIA
  condicion='1';
 $ionicLoading.show({
      template: 'Iniciando Sesión. .'
    });
 // Capturamos las wariables de usuario y password
  usu=document.getElementById('txtusu');
  pass=document.getElementById('txtpass');

 //

// Damos walores a los parametros para realizar nuestra llamada ajax POST

            var params = {
                usuario: usu.value,
                pass: pass.value
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'InicioSesion',
        method: 'GET',
        params: params
       }).success(function(data){
if (data=='"error"') {
  alert('Usuario y/o Password Incorrectos .');
  $ionicLoading.hide();
  return;
}
else
  { 

     if (data[0].tipo=='GERE' || data[0].tipo=='GEZO') {
   usuario=data[0].nombres;
   usunick=data[0].usuario;
   $ionicLoading.hide();
   location.href="indexAdm.html#/adm/perfil/" + usuario + '&' + usunick;
   }else if(data[0].tipo == "PRUE"){    
     usuario=data[0].nombres;
     usunick=data[0].usuario;
     localStorage.setItem('userMich',JSON.stringify(
      {usuario : usuario,co_usua : usunick}
      ))
    $ionicLoading.hide();
    gpsServices.saveSegTecn(urlNaturale,0,'login');
    localStorage.setItem('dataUserN',JSON.stringify(data));    
     $state.go("master.menu");
   }else{
      usuario=data[0].nombres;
     usunick=data[0].usuario;
     $ionicLoading.hide();
     location.href="#/tab/rutas" ;   
   }; 
 
 };

 
// location.replace('/#/tab/fotos');
}).error(function(){
    alert('Ocurrio un problema con la conexion, vuelva a intentar.')
    $ionicLoading.hide();
});

  }

   
})

.controller("listaCtrl",function($scope,$ionicHistory,Chats,$http,$ionicLoading,$location,$ionicActionSheet,$ionicPopup,$ionicModal){
  $scope.usuariologer=usuario; 
var cargandoH=  document.getElementById("divCargandoH");

var fechainiL = document.getElementById("txtfechainiL");
var fechafinL = document.getElementById("txtfechafinL");

fechainiL.value=getDateHoy();
fechafinL.value=getDateHoy();

$scope.listaPedidosRealizados= function(){
  cargandoH.style.display='';
   var fechaini,fechafin; 
  
    fechaini= fechainiL.value
    fechafin= fechafinL.value

    // Valores para traer Rutas
 var params = {
                fechaini: fechaini,
                fechafin: fechafin,
                usuario: usunick  
              }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaDePedidosRealizados',
        method: 'GET',
        params: params
       }).success(function(data){
        
      $scope.listaHistorialPedidos= data; 
         cargandoH.style.display='none';
    }).error(function(){
        alert('Ocurrio un problema con la conexion, vuelva a intentar.')
      cargandoH.style.display='none';
    })
  }



})
.controller("ListaDetCtrl",function($scope,$http,$stateParams,$ionicModal,$ionicPopup,$ionicLoading,$cordovaCamera,$cordovaFileTransfer,Chats){
var loading = document.getElementById('LoadingHistorial');
$scope.titleRutaFoto = 'DETALLE DE PEDIDO'
$scope.checkedTipo = true;

var parameters=$stateParams.pedId;
parameters = parameters.split("|");

var facturadoSINO = parameters[7]

if (facturadoSINO == "ACT") {
  $scope.actualizarCon = true;  
}else{
  $scope.actualizarCon = false;
};



var contentHistorialVenta = document.getElementById('contentVentaHis')
if (parameters[2]=='si') {
  contentHistorialVenta.style.display='';
}else{
  contentHistorialVenta.style.display='none';
};
if (parameters[6]=="F") {
$scope.checkedTipo = false;
}else {
  $scope.checkedTipo = true;
};
$scope.getTipoDoc=function(tip){
  if (tip==true) {
  
    return 'Boleta'
  }else{
  
    return 'Factura'
  };
}
// LISTADO DE BONIFICACIONES SI ES VENTA
$scope.ListaBonificacion = function(con){
  // SI FLAG DE VENTAS ESTA ACTIVADO , LISTAR BONIFICACIONESOFICICACIONES
  if (parameters[2] !='si') { return ; };

   var params = {
                idLocal: parameters[1]
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaBeneficios',
        method: 'GET',
        params: params
       }).success(function(data){
         $scope.beneficios=data;
  
       })
//
  
 }
$scope.productosAgregados=[];
$scope.calculoTotal=function(){
  var items = $scope.productosAgregados;
  if (items.length==0) {
    return 0.0;
  }else{
    var total=0;
     for (var i = 0; i < items.length; i++) {
      total += parseFloat(items[i].cantidad) * parseFloat(items[i].precProducto)
    };
 
    return "SubTotal : " + (total * 1.18).toFixed(3) + " S/."
  };
  
}
  $scope.ListaDetallePedido = function(con){
  // SI FLAG DE FOTOS ESTA ACTIVADO , LISTAR MULTIFOTOS
  if (parameters[3] !='si') { return ; };

   var params = {
                idsupe: parameters[0],
                idcanal: parameters[1]
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaDetallePedido',
        method: 'GET',
        params: params
       }).success(function(data){
        
     var items = data;
     for (var i = 0; i < items.length; i++) {

       $scope.productosAgregados.push(
        {
          id: items[i].idProducto,
          desProducto: items[i].desProducto,
          precProducto: items[i].precProducto,
          check: true,
          cantidad: items[i].cantidad,
          flagReg: 1

        })
        
     }
       
       })
//
  
 }
 $scope.agregarProducto = function(){

  $scope.productosAgregados=[];
  var items=$scope.productos;
    for (var i = 0; i < items.length; i++) {
      if (items[i].check==true) {
        $scope.productosAgregados.push(
        {
          id: items[i].id,
          desProducto: items[i].desProducto,
          precProducto: items[i].precProducto,
          check: true,
          cantidad: items[i].cantidad
        })
        
      };
    }
}
$scope.deleteProductoAgregado= function(item){

  var index = $scope.productosAgregados.indexOf(item);
  $scope.productosAgregados.splice(index, 1);    


}
 // PARAMETROS Y FUNCIONES PARA EL MODAL DE PRODUCTOS 
$ionicModal.fromTemplateUrl('productosHis.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.ListaProductos(0);
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

//
   $scope.openModal = function() {
    $scope.ListaProductos();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
// funcion PARA LLENAR LOS PRODUCTOS
 $scope.ListaProductos = function(){

  $scope.modal.show();
  var loader= document.getElementById('divCargandoProductosHis'); 
 loader.style.display="";
  

   var params = {
                idCanal: parameters[1]
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaProductos',
        method: 'GET',
        params: params
       }).success(function(data){
          
         $scope.productos=data;
        
         var items= $scope.productosAgregados;
         
           for (var i = 0; i < items.length; i++) {
            if (items[i].check==true) {

                  for (var x = 0; x < $scope.productos.length; x++) {
                    if ($scope.productos[x].id==items[i].id) {
                        $scope.productos[x].check=true;
                        $scope.productos[x].cantidad=items[i].cantidad;
                        
                    };
                  }
            };
           }
        
      loader.style.display="none";
       })
//

 }
 $scope.valuesFoto=[];
  $scope.viewPhoto = function(item){
    $scope.valuesFoto = {
                          imgURI : item.urlfoto,
                          coment : item.coment,
                          fecha : item.fecha,
                          tipofoto: item.tipfoto
                        }
    
   }
   $scope.pictures = [];
 $scope.ListaMultiFotos = function(con){
  // SI FLAG DE FOTOS ESTA ACTIVADO , LISTAR MULTIFOTOS
  if (parameters[4] !='si') { return ; };

   var params = {
                id: parameters[0]
            }
// FUNCION HTTPS PARA LOGEAR RUTAS POST . .

$http({url: urlNaturale + 'ListaMultiFotos',
        method: 'GET',
        params: params
       }).success(function(data){
        $scope.valuesFoto = {
                          imgURI : data[0].urlfoto,
                          coment : data[0].coment,
                          fecha : data[0].fecha,
                          tipofoto: data[0].tipfoto
                        }

                        
        angular.forEach(data,function(child){

          $scope.pictures.push({
            coment : child.coment,
            fecha : child.fecha,
            tipfoto : child.tipfoto,
            urlfoto : child.urlfoto
          })
        })
        
        loading.style.display='none';
       })
//
  
 }

 $scope.txtid=parameters[0];
 $scope.newpictures = [];

  $scope.takePicture = function(){

    var config=Chats.all()
    var tifotosube;
    if ($scope.pictures.length==4) {
      alert('Ya llego al maximo de fotos tomadas .');
      return;
    };
   
    if (config[0].checked==false) {
    tifotosube='cam'
    
      var options= {
       quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 250,
      targetHeight: 324,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    }
    }else{
     tifotosube='gal'
      var options= {
       quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 250,
      targetHeight: 324,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    }
    };

    $cordovaCamera.getPicture(options).then(function(imageData){
     // LLENAMOS AL OBJETO CON UN PUSH POR CADA FOTO QUE ESCOGAMOS COMO MAXIMO 4 REGISTROS
    var coment = document.getElementById($scope.txtid).value;

     $scope.pictures.push(
        {coment: coment,
         fecha: getDateHoy(),
         tipfoto : tifotosube,
         urlfoto : "data:image/jpeg;base64," +imageData    
         }
      );
      $scope.newpictures.push(
        {nrosegui: parameters[0],
         src: "data:image/jpeg;base64," +imageData,
         tipofoto: tifotosube,
         comentario: coment
         }
      );
    $scope.coment = "";
       
    }, function(error){

    });
  };
 
var server = "http://peruvending.com/naturale/adm/uploader2.php"
   // FUNCION PARA SUBIR FOTO
       $scope.send = function(){
  var indexPic = $scope.pictures.length ; 
  var indexNewPic = $scope.newpictures.length ;
  var indexR = indexPic + indexNewPic;
    //   if (comentfoto.value=='') {
      //    alert('Ingresar un comentario a la foto.')
       //  return;
        //}
        if ($scope.newpictures.length <= 0 ) {
          alert('No ha tomado ninguna fotografia.')
          return;
        };

        $ionicLoading.show({
    template: 'Subiendo Foto. . ',
  })

  var count=0;


     for (var i = 0; i < $scope.newpictures.length; i++) {
          indexR +=i;
                var options = {
                fileKey: "file",
                fileName: parameters[0] +'_r'+ indexR + '.jpg',
                chunkedMode: false,
                mimeType: "image/jpg"
            };

      
             var filePathR = $scope.newpictures[i].src;
        
              //alert(filePathR)
              $cordovaFileTransfer.upload(server, filePathR, options).then(function(result) {
         
                     count +=1;
        
               if (count==$scope.newpictures.length) {
                $ionicLoading.hide();
                $scope.AddMultiFoto();  
               };
            }, function(err) {
               $ionicLoading.hide();
               alert('Ocurrio un error con la conexion al subir foto!')
                //alert(JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
            });

         }

     }
               
  $scope.deleteFoto= function(item){

  var index = $scope.newpictures.indexOf(item);
  $scope.newpictures.splice(index, 1);    


}
  $scope.AddMultiFoto = function(){
   var indexPic = $scope.pictures.length ; 
  var indexNewPic = $scope.newpictures.length ;
  var indexR = indexPic + indexNewPic;
    $ionicLoading.show({
    template: 'Guardando Información. . ',
  })
    var count= 0;
     for (var i = 0; i < $scope.newpictures.length; i++) {
      indexR += i ;
         var params = {
                idSeguimiento: $scope.newpictures[i].nrosegui,
                nomFoto: $scope.newpictures[i].nrosegui +'_r' + indexR + '.jpg',
                comentario: $scope.newpictures[i].comentario,
                tipFoto: $scope.newpictures[i].tipofoto,
                usuario: usunick
            }
   
  $http({url: urlNaturale + 'NewAddMultiFotoss',
          method: 'GET',
          params: params
         }).success(function(data){
         
         count += 1;
         if (count == $scope.newpictures.length) {
           $ionicLoading.hide();
                  $ionicLoading.show({
    template: 'Proceso de fotos generada correctamente . . ',
    duration: 1000
  
  })
        //          var limpiar=[];
          //   Chats.llenarRutas(limpiar);
         //    location.href="#/tab/rutas";

         };
         }).error(function(){
             $ionicLoading.hide();
            alert('Ocurrio un problema con la conexion, vuelva a intentar.')
            return;
        });

     }
     
  }


 // FUNCION PARA REGISTRAR EL PEDIDO
 $scope.AddDetPedido = function(idPed){


 for (var i = 0; i < $scope.productosAgregados.length; i++) {

  var params = {
                idProducto: $scope.productosAgregados[i].id,
                cantidad: $scope.productosAgregados[i].cantidad,
                precUnit: $scope.productosAgregados[i].precProducto,
                idPedido: parameters[5]
            }
            var x = 0;


  $http({url: urlNaturale + 'SaveDetPedido',
          method: 'GET',
          params: params
         }).success(function(data){
          x+=1;

          if (x == $scope.productosAgregados.length) {

             $ionicLoading.hide();
                  $ionicLoading.show({
          template: 'Pedido Actualizado Correctamente . . ',
          duration: 1000
         

        })
           //BLOQUEAMOS LOS BOTONES PARA NO GENERAR NUEVAMENTE UN PEDIDO
          };
     
         }).error(function(){
             $ionicLoading.hide();
      alert('Ocurrio un problema con la conexion, vuelva a intentar.')
      return;
        });

   }
     

 }
  // FUNCION PARA ELIMINAR DETALLE PEDIDO
 $scope.DeleteDetailsPedido = function(){
 $ionicLoading.show({
    template: 'Actualizando Pedido. . ',
  })

  var params = {
               idPedido : parameters[5]
            }
         
  $http({url: urlNaturale + 'DeleteDetallePedido',
          method: 'GET',
          params: params
         }).success(function(data){
         
      $scope.AddDetPedido();

         }).error(function(){
             
      alert('Ocurrio un problema con la conexion, vuelva a intentar.')
      return;
        });


 }

 // SCOPE PARA CAMTURAR EL TIPO DE DOCUMENTO
 $scope.MessageConfirm = function(message) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmación',
     template: '<p style="font:menu; font-size:11px;">' + message + '</p>'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $scope.DeleteDetailsPedido();
     } else {
       return false 
     }
   });
 };
  $scope.PopAddCabConfirm = function(){
  // VALIDAMOS SI TIENE SELECCIONAR UN ITEM O MAS .
  if ($scope.productosAgregados.length==0) {
    $scope.AlertMessage('Error','No ha seleccionado ningun producto para generar un pedido.')
    return;
  };
  // ABRIMOS POPUP PARA CONFIRMA EL PEDIDO
  $scope.MessageConfirm('Esta por actualizar este pedido , desea confirmar ?')
 
 }


})

// NEW SISTEMA
.controller('menuCtrl',function($scope,$timeout,$ionicPopup,$state,popupServices,$rootScope,$cordovaBatteryStatus,$ionicPlatform,gpsServices){

  var dataUser = JSON.parse(localStorage.getItem('dataUserN'));  
  $scope.nameUser = dataUser[0].nombres;
    $scope.showLoader = true;
    $timeout(function(){
      $scope.showLoader = false;
    },1200)
    var confirmPop = function(title,template){    
      var confirmPopup = $ionicPopup.confirm({
        title : title,
        template : template
      })
      return confirmPopup;
    }
    $scope.gotoActivites = function(){
      $state.go('master.actividades');
    }
    $scope.cerrarSesion = function(){
      var confirm = popupServices.confirmPop('Confirmación', 'Esta apunto de cerrar sesión , desea continuar ?')
      confirm.then(function(res){
        if (res) {
          confirm.close();
          var loader = popupServices.loaderPop('Cerrando Sesión');
          $timeout(function(){
            $state.go('login');         
            loader.close();                           
          },1200)
        }
      })
    }
})

.controller("actividadesCtrl",function($scope,$http,gpsServices,$stateParams,$timeout,$ionicActionSheet,popupServices,$state){
  $scope.actividadMult = false;
  var listActividadesInit = [];  
  $scope.paramsMult = {
    activate : false,
    css : '#fff'
  }
  $scope.showLoaderActi = true;
  var txtFecha = "";
  $scope.params = {
    filter : '',
    fecha : '2016-04-10',
    //co_usua : usunick,
    co_usua : 'TS1'
  }
  $scope.initView = function(){
    $timeout(function(){
      txtFecha = document.getElementById('txtFecha');
      txtFecha.value = popupServices.getDateHoyF();
      $scope.getActividades(2);
    },100)
    
  }
  $scope.getActividades = function(tip){    
    if (tip == 1) {
      $scope.showLoaderActi = true;
    }
   // $scope.params.fecha = txtFecha.value;
    console.log($scope.params)
    $http({url : urlNaturale +  'LitaActividadesDevoluciones',
          method: 'GET',
          params: $scope.params
         }).success(function(data){
            $scope.listActividades = data; 
            $timeout(function(){              
              $scope.showLoaderActi = false;              
              $scope.$broadcast('scroll.refreshComplete');
            },1)
         })    
  }
  $scope.goHome = function(){
    $state.go("master.menu");
  }
  $scope.goMultiple = function(){
    if (!$scope.paramsMult.activate) {
      $scope.paramsMult.activate = true;
      $scope.paramsMult.css = "#FF5722";      
    }else{
      $scope.paramsMult.activate = false;
      $scope.paramsMult.css = "#FFF";
      listActividadesInit = [];
      $scope.listActividades.forEach(function(item,index){
        item.fondo = "";
      });
    }
  }
  $scope.showOptions = function(item,multiple) {   
     // Show the action sheet
     if (multiple) {
      if (item.st_desp == "successAct") { return ;};
      var index = $scope.listActividades.indexOf(item);
      if ($scope.listActividades[index].fondo.length == 0) {
        $scope.listActividades[index].fondo = "background-color: #e4cfcf !important";
        listActividadesInit.push(item.nu_regi)
      }else{
        var indexReg = listActividadesInit.indexOf(item.nu_regi);
        listActividadesInit.splice(indexReg,1);
        $scope.listActividades[index].fondo = "";        
        console.log(listActividadesInit)
      }
      return;
     }
     var textOps = item.st_desp == "successAct" ? "Ver Actividad" : "Iniciar Actividad";
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<b>' + textOps + '</b>' },        
       ],       
       titleText: 'Opciones',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
        if (item.st_desp == "successAct") {
              gpsServices.saveSegTecn(urlNaturale,item.nu_regi,'Ver Actividad');
              localStorage.setItem('dataActividad',JSON.stringify(item));
              $state.go('master.desActividades', { tip : 2});
              return;
        }else{
          gpsServices.saveSegTecn(urlNaturale,item.nu_regi,'InicioActividad');
          $scope.initActivities(item);
          return false;
        }
       }
     });     
     $timeout(function() {
       hideSheet();
     }, 2000);
   };
   $scope.initMultipleAct = function(){
    popupServices.confirmPop('Confirmación !' , 'Esta apunto de iniciar multiples actividades , desear continuar ?').then(function(res){
      if (res) {
        var loaPop = popupServices.loaderPop('Iniciando Actividades');
        var idRegis= "";
        for (var i = 0; i < listActividadesInit.length; i++) {          
          gpsServices.saveSegTecn(urlNaturale,listActividadesInit[i],'Ver Actividad');
          idRegis += listActividadesInit[i] + ",";          
        }
         idRegis = idRegis.substring(0,idRegis.length-1);
        var params = {
          nu_regi : idRegis,
          st_desp : 'Iniciado',
          //co_usua : usunick,
          co_usua : "M1",
          ubic : ''
        }
        $http({url : urlNaturale +  'UpdateStActividadesDevo',
         method: 'GET',
         params: params
        }).success(function(data){              
           $timeout(function(){
             loaPop.close();
             var pop = popupServices.alertPop('Correcto !','Actividades Iniciadas correctamente !');                      
             pop.then(function(res){
                $scope.goMultiple();
                $scope.getActividades(1);
             })
           },1000)
         })
        .error(function(){
          loaPop.close();
          var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
        })
        
      }
    })
   }
   $scope.initActivities = function(item){
      popupServices.confirmPop('Confirmación !' , 'Esta apunto de iniciar esta actividad , desear continuar ?').then(function(res){
        if (res) {
          gpsServices.getCurrentPosition().then(function(resu){
            var params = {
              nu_regi : item.nu_regi,
              st_desp : 'Iniciado',
              co_usua : "M1",
              //co_usua : usunick,
              ubic : resu.lat + '|' + resu.lon
            }
            console.log(params)
             var loaPop = popupServices.loaderPop('Iniciando Actividad');
             $http({url : urlNaturale +  'UpdateStActividadesDevo',
              method: 'GET',
              params: params
             }).success(function(data){              
                $timeout(function(){
                  localStorage.setItem('dataActividad',JSON.stringify(item));
                  loaPop.close();
                  $state.go('master.desActividades',{tip : 1});
                },1000)
             })
             .error(function(err){
                loaPop.close();
                var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
             })            
          })

        }
      })      
   }
  
})
.controller("desActividadCtrl",function($scope,$ionicPopup,$state,$http,$q,$stateParams,$ionicModal ,ServicesPhoto,gpsServices,$timeout,$ionicActionSheet,popupServices){ 
  $scope.showLoaderActi = true;
  var dataActi = JSON.parse(localStorage.getItem('dataActividad'));
  var dataLotes;
  console.log(dataActi);
  $scope.paramsActi = {
    nu_regi : dataActi.nu_regi,
    obs : '',
    st_devo : '',
    //co_usua : usunick,
    co_usua : 'M1',
    ubic : ''
  }
  var idAux = 0;
  $scope.listCheckBox = [
    {id : 0, check : true, des : 'Dev', des2 : 'DE'},
    {id : 1, check : false, des : 'Quie', des2 : 'QU'},
    {id : 2, check : false, des : 'Aux', des2 : 'AU'},
  ]
  $scope.goHome = function(){
    $state.go("master.menu");
  }
  $scope.initView = function(){
    var tipo = $stateParams.tip;       
    $scope.getProducActi().then(function(dataPro){
      $scope.listProductos = dataPro;
      $scope.getLotes().then(function(dataLot){
        dataLotes = dataLot;
        // SI EL TIPO ES 1 : INICIO POR PRIMERA VEZ LA ACTIVIDAD
        // SI EL TIPO ES 2 : INICIO POR SEGUNDA VEZ LA ACTIVIDAD, por lo tanto
          // traera los datos que se ha nregistrado (FOTOS , LOTES)
        if (tipo == 2) {
          $scope.getFotos().then(function(res){
            $scope.listFotos = res;
            $timeout(function(){
            $scope.showLoaderActi = false;
            },100)          
          })         
        }else{
          $timeout(function(){
            $scope.showLoaderActi = false;
          },100)        
        }        
      })
    });
  }
  $scope.getLotes = function(){
    var q = $q.defer();      
    $http({url : urlNaturale +  'ListaLotesActi',
     method: 'GET',     
    }).success(function(data){              
      q.resolve(data);
    })
    .error(function(err){
      q.reject('err');
       var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
    })     
    return q.promise;
  }  
  $scope.getFotos = function(){
    var q = $q.defer();
    var params = {nu_regi : dataActi.nu_regi};    
    $http({url : urlNaturale +  'ListaFotosActi',
     method: 'GET',
     params: params
    }).success(function(data){              
      q.resolve(data);
    })
    .error(function(err){
      q.reject('err');
       var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
    })     
    return q.promise;
  }
  $scope.getActividades = function(tip){    
    if (tip == 1) {
      $scope.showLoaderActi = true;
    }
  }
  $scope.getProducActi = function(){
    var q = $q.defer();
    var params = {id_fact : dataActi.indice};
    $http({url : urlNaturale +  'ListaProductosActi',
     method: 'GET',
     params: params
    }).success(function(data){      
      q.resolve(data);      
    })
    .error(function(err){
      q.reject('err');
       var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
    })    
    return q.promise;
  }
  $scope.selectEstado = function(id){
    idAux = id;
    $scope.listCheckBox.forEach(function(item,index){
      if (item.id != id) {
        item.check = false;
      };
    })
  }
  $scope.finalizarActi = function(){
    var popConfirm = popupServices.confirmPop('Confirmación !' , 'Esta apunto de finalizar esta actividad , desear continuar ?').then(function(resP){
      if (resP) {
        gpsServices.saveSegTecn(urlNaturale,dataActi.nu_regi,'FinalizaActividad');
        var popLoad = popupServices.loaderPop('Finalizando . .');
        gpsServices.getCurrentPosition().then(function(res){
          $scope.paramsActi.st_devo = $scope.listCheckBox[idAux].des2;
          $scope.paramsActi.ubic = res.lat + '|' + res.lon;          
          $http({url : urlNaturale +  'FinalizarActi',
           method: 'GET',
           params: $scope.paramsActi
          }).success(function(data){
            deleteFoto();
            $timeout(function(){
              popLoad.close();
              var popAlert = popupServices.alertPop('Actividad Finalizada !','Proceso realizado correctamente !');        
              popAlert.then(function(){
                $state.go('master.actividades');
              })
            },700)
          })
          .error(function(err){
            popLoad.close();
             var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
          }) 
        })        
      };
    })

  }
  $scope.zoomMin = 1;
  $scope.showImages = function(index) {   
      $scope.activeSlide = index;
      $scope.showModal('templates/ZoomImage/adm-galleryzoom.html');
  };
  $scope.showImagesVisto = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/ZoomImage/adm-galleryzoomFirma.html');
  };
  $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope
      }).then(function(modal) {
        $scope.modalImage = modal;
        $scope.modalImage.show();
      });
    }
     
  $scope.closeModalImage = function() {
      $scope.modalImage.hide();
      $scope.modalImage.remove()
  };    
  //$scope.listFotos = [{url_FotoDet : 'https://scontent.flim1-2.fna.fbcdn.net/v/t1.0-1/p50x50/18119325_10211580768947364_2974463703718203254_n.jpg?oh=847a4077abac510b28cf3014f26f4db9&oe=59AD2F7B'},{url_FotoDet : 'https://scontent.flim1-2.fna.fbcdn.net/v/t1.0-1/c0.10.40.40/p40x40/14089022_1268854356492267_4461321948972249509_n.jpg?oh=6026c0489c45ad74e72ca9e7e89c1ec3&oe=59E8A6F9'},{}];
  $scope.listFotos = [];
  $scope.takePhoto = function(){
    
    ServicesPhoto.callCamera(1).then(function(resCam){
      // ALGORITMO PARA GENERAR EL CORRELATIVO DE FOTOS TOMADAS
      var nroFoto = 0;
      var cant = $scope.listFotos.length;
      if (cant == 0) {
        nroFoto = 1;
      }else{
        nroFoto = $scope.listFotos[cant - 1].nombre_FotoDet.replace('.jpg','').split('_');
        nroFoto = parseInt(nroFoto[2]) + 1;
      }      
      //            
      $scope.showLoaderFoto = true;
      var uri = "data:image/jpeg;base64," + resCam;
      var nameFoto = String(dataActi.nu_regi) + '_' + getDateHoyCod() + '_' + nroFoto + '.jpg';      
      ServicesPhoto.savePhotoFolder(uri,nameFoto).then(function(resFolder){
        gpsServices.saveSegTecn(urlNaturale,dataActi.nu_regi,'Toma Foto');
          ServicesPhoto.transferPhoto(urlPhoto,nameFoto,resFolder.nativeURL).then(function(resUp){
            insertFotoAct(nameFoto,resFolder.nativeURL).then(function(){
              $timeout(function(){
                $scope.showLoaderFoto = false;          
                var paramsSaveFoto = {
                  id_Registro : 0,
                  nombre_FotoDet : nameFoto,          
                  url_FotoDet : resFolder.nativeURL,
                }
                $scope.listFotos.push({
                  id_Registro : paramsSaveFoto.id_Registro,
                  nombre_FotoDet : paramsSaveFoto.nombre_FotoDet,          
                  url_FotoDet : paramsSaveFoto.url_FotoDet          
                });
              },1000)
            },function(){
              var pop = popupServices.alertPop('Error al registrar Foto !','Error con la conexión !'); 
            })           

          },function(err){
              var pop = popupServices.alertPop('Error al subir foto !','Error con la conexión !'); 
          })
        /*sqliteServices.savetbl_Movil_Obras_Liquida_Foto(paramsSaveFoto).then(function(res){
          
          $timeout(function(){
            $scope.showLoaderFoto = false;
            $scope.listFotos.push({
              id_Registro : paramsSaveFoto.id_Registro,
              nombre_FotoDet : paramsSaveFoto.nombre_FotoDet,
              obs_FotoDet : coment,
              url_FotoDet : paramsSaveFoto.url_FotoDet,
              fechaRegistroMovil_FotoDet : paramsSaveFoto.fechaRegistroMovil,
              cod_ref : paramsSaveFoto.idGeneral
            });
            $scope.paramsFoto = {coment : ''};
          },1200)

        },function(err){
          
        }) */     
      },function(err){
        alert(JSON.stringify(err));
      })
    },function(err){
      alert(JSON.stringify(err));
    })
  };
  var deleteFoto = function(){
    $scope.listFotos.forEach(function(item,index){
      ServicesPhoto.deletePhotoFolder(item.nombre_FotoDet).then(function(res){        
      })
    })
  }
  var insertFotoAct = function(noFoto,ubic){
    var q = $q.defer();    
    var params = {
      nu_regi : dataActi.nu_regi,
      no_foto : noFoto,
      ti_foto : 'CAM',
      co_ubic_foto : ubic,
      //co_usua : usunick,
      co_usua : 'TS1'
    }    
    $http({url : urlNaturale +  'InsertFotoActividad',
      method: 'GET',
      params: params
    }).success(function(data){
      q.resolve(data);
    }).error(function(err){
      q.reject(err);
    }) 
    return q.promise;
  }
  var alertPop,alertCant,itemProducto;
  $scope.modalSelect = function(itemProduct){
    var cabecera,template;
    if (dataLotes.length == 0) {
      var pop = popupServices.alertPop('Error al traer lotes!','No se encontro ningun lote .!'); 
      return;
    }
    itemProducto = itemProduct;
    $scope.listLotes = dataLotes;
    template = '<div class="bar bar-header item-input-inset" style="position: absolute;top: 10px;    padding-top: 20px;">' +
                   '<label class="item-input-wrapper" style="background-color: white;">' +
                     '<i class="icon ion-ios-search placeholder-icon"></i>' +
                     '<input type="search" ng-model="searchMedidor" placeholder="Busqueda . ."></label>' +
                   '</div>' +
             '<div class="modalStyle" style="max-height: 400px;    padding-top: 30px;">' +
             '<div ng-repeat="item in listLotes | filter : searchMedidor" class="card-panel grey lighten-5 z-depth-1 cardP  {{item.claseA}}" >' +
                   '<div class="row valign-wrapper contentPlantilla" ng-click="selectId(item);">' +
                   '<div class="col s4 m2 colP">' +
                       '<a href=""><i class="small material-icons" style="font-size:20px !important"></i></a>' +
                   '</div><div class="col s8 m10"><span class="black-text">Nro Lote: {{item.nu_lote}}</span>' +
                   '</div><br><span class="black-text">Cant: {{item.nu_cant_desp}}</span>' +
                   '</div></div></div></div>';
    alertPop = popupServices.alertPop(cabecera,template,'',$scope);
  }
  $scope.modalCant = function(itemLote){    
    $scope.data = {};
    $scope.text = {
      cantidad : ''
    };
    var popCant = $ionicPopup.show({
      template: '<input type="tel" id="txtcantidad" ng-model="data.cantidad">',
      title: 'Ingresar Cantidad',      
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.cantidad){
              e.preventDefault();
            } else {
              var paramsLote = {
                i_producto : itemProducto.I_PRODUCTO,
                co_lote_desp : itemLote.co_lote_desp,
                cantidadIng : $scope.data.cantidad,
                id_fact : itemProducto.ID_FACT
              }
              var paramsL = JSON.stringify(paramsLote);
              $scope.updateLotes(paramsL).then(function(res){
                console.log(res);
              },function(err){
                var pop = popupServices.alertPop('Ocurrio un error !','Error con la conexión !'); 
              })              
              
            }
          }
        }
      ]
    })
    $timeout(function(){
      var cantidad = document.getElementById('txtcantidad');
      cantidad.focus();      
    },200)

  }
  $scope.selectId = function(itemLote){
    alertPop.close();
    $scope.modalCant(itemLote);
  }
  $scope.updateLotes = function(paramsLote){
    var q = $q.defer();
    var params = {nu_regi : dataActi.nu_regi,paramsLote : paramsLote};    
    $http({url : urlNaturale +  'UpdateLoteActi',
     method: 'GET',
     params: params
    }).success(function(data){              
      q.resolve(data);
    })
    .error(function(err){
      q.reject('err');       
    })     
    return q.promise;
  }  

})