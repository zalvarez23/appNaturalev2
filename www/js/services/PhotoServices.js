angular.module('starter.ServicesPhoto', [])

.factory('ServicesPhoto', function ($http,$q,$cordovaCamera,$cordovaFileTransfer,$cordovaFile) {

	var Result = {}

		Result.callCamera = function(tipo){		
			var options= {
			 	quality: 100,
		      	destinationType: Camera.DestinationType.DATA_URL,
		      	sourceType: Camera.PictureSourceType.CAMERA,
		      	allowEdit: false,
		      	encodingType: Camera.EncodingType.JPEG,
		      	targetWidth: 800,
		      	targetHeight: 600,
		      	popoverOptions: CameraPopoverOptions,
		      	saveToPhotoAlbum: false
		    }
			 var q = $q.defer();
			 if (tipo == 1) {
			 	options.sourceType = Camera.PictureSourceType.CAMERA;
			 }else{
			 	options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
			 }			 
		    $cordovaCamera.getPicture(options).then(function(result){		    	
				q.resolve(result)
			},function(err){
				q.reject(err)
			})
			return q.promise;
		}

		Result.savePhotoFolder = function(file,name){
			var uri = file;
	        var namephoto= name ;
	        var targetPath = cordova.file.externalRootDirectory + 'PHOTOPROCA/' + namephoto;
	        var trustHosts = true
	        var options = {};
	        var q= $q.defer();	        
	        $cordovaFileTransfer.download(uri, targetPath, options, trustHosts)
	            .then(function(result) {	  	            	
	            	q.resolve(result)
	            }, function(error) {	            		            	
	              	q.reject(error)
	            }, function (progress) {
	               // $timeout(function () {
	               //    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
	               // })
            })
	            return q.promise;
		}

		Result.deletePhotoFolder = function(name){
			
			var q = $q.defer();
			 $cordovaFile.removeFile(cordova.file.externalRootDirectory + 'PHOTOPROCA/', name)
			 .then(function (success) {
		        q.resolve(success)
		     }, function (error) {
		        q.reject(error)		        
		     });
		     return q.promise;
		}

		Result.transferPhoto = function(url,namePhoto,filePath){
			var q = $q.defer();			
			//var server = url + '/UploadFiles?nameFile=' + namePhoto;
			var server = 'http://peruvending.com/naturale/adm/uploader2.php';
			var options = {
				fileKey: "file",
	            fileName: namePhoto,
	            chunkedMode: false,
	            mimeType: "image/jpg"
	        };	        
	        $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {	        	
	        	q.resolve(result)
	        },function(err){	
	        alert(JSON.stringify(err))        		        		        	
	        	q.reject(err)
	        })
	        return q.promise;
		}
	return Result;

})