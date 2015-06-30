app.factory('cipherRunner', ['$http', function($http) {
  
  var urlBase = 'http://eagle.cs.wit.edu:44003/scriptRunner.php';
  var cipherRunner = {};

  cipherRunner.getCipherText = function(cipherType, message, key, encryptFlag) {

  	var encryptBool = (encryptFlag == "encrypt") ? true : false;
  	return $http.get(urlBase, {params: {cipher: cipherType, m: message, k: key, encrypt: encryptBool}});
  }

  return cipherRunner;
         
}]);