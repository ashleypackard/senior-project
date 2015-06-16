app.controller('MainController', ['$scope', function($scope) {

  $scope.projectTitle = "Cryptography Senior Project";
  
}]);

app.controller('InteractiveController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.ciphertype = $routeParams.type;

 $scope.caesar =
  {
    	introtext: "The Caesar Cipher is a basic shift cipher using the normal alphabet, A-Z. The key is a number between 0-26 which determines how many times to shift the alphabet. If a key of 3 is given, or a shift of 3, then an A now equals a D. B = E, C = F, and so on. Basically all letters shift over three spaces and if the message had been HEY it now becomes KHB. To decrypt a Caesar cipher all you need to do is shift the encrypted message back the by the key, in this case 3.",
    	link: 'https://en.wikipedia.org/wiki/Caesar_cipher',
    	instructions: "this is the instructions for this cipher this is the instructions for this cipher this is the instructions for this cipher this is the instructions for this cipher this is the instructions for this cipher this is the instructions for this cipher this is the instructions for this cipher"
  }

  $scope.vigenere = 
  {
    	introtext: "Welcome to the vigenere Cipher, its a multiple shift cipher.",
    	link: "https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher",
    	instructions: "this is the instructions for this cipher"
  }

  $scope.hill =
  {
    	introtext: "Welcome to the hill Cipher, its a matrix cipher.",
    	link: "https://en.wikipedia.org/wiki/Hill_cipher",
    	instructions: "this is the instructions for this cipher"
  }

switch($scope.ciphertype) {
case 'caesar':
	return $scope.data = $scope.caesar;
case 'vigenere':
	return $scope.data = $scope.vigenere;
case 'hill':
	return $scope.data = $scope.hill;
}
 
}]);