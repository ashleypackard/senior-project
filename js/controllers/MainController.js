app.controller('MainController', ['$scope', function($scope) {

  $scope.projectTitle = "Cryptography Senior Project";
  
}]);

app.controller('InteractiveController', ['$scope', '$routeParams', 'cipherRunner', 
  function($scope, $routeParams, cipherRunner) {
    $scope.ciphertype = $routeParams.type;

   $scope.caesar =
    {
      	introtext: "The Caesar Cipher is a basic shift cipher using the normal alphabet, A-Z. It is the simplest of all the interactive ciphers. The key is any whole number, both positive and negative, which shifts the alphabet either forwards (positive numbers) or backwards (negative numbers). The key determines how many times to shift the alphabet. If a key of 3 is given, or shift of 3, then an A now equals a D. B = E, C = F, and so on. Simply, each letter shift over three characters. For example, if the message had been HEY it now becomes KHB. To decrypt a Caesar cipher all you need to do is shift the encrypted message back by the key, in this case 3.",
      	link: 'https://en.wikipedia.org/wiki/Caesar_cipher',
      	basicInstructions: "Requires a whole number as the key such as 3 or -3, and a messgage. Click 'Start Over' if you want to clear all text boxes.",
        encryptInstructions: "Enter the number to shift the alphabet by in the key text box below. Then enter your plain text message and click the 'Encrypt Message' button.",
        decryptInstructions: "Immediately decrypt your message after encrypting by clicking the 'Decrypt Message' button. If you have another encrypted message you'd like decrypted then enter the message into the text box labeled 'Encrypted Text', type the appropriate key into the key text box and click the 'Decrypt Message' button."
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

    $scope.textType = "";

    // access the appropriate cipherType when that page is called be allowing the page to use the data variable!
   	$scope.data = $scope[$scope.ciphertype];

    $scope.clearCiphers = function(){
      $("#original_text").val("");
      $("#plain_text").val("");
      $("#encrypted_text").val("");
      $("#key_text").val("");
      $scope.textType = "";
      $("#key").removeClass("has-error");
    }

    // function call for encrypting and decrypting!
    $scope.cipherCall = function getCipherText(cipherName, encryptFlag) {
      // check if input is correct
      var key = $("#key_text").val();
      console.log("cipherName " + cipherName + " and encryptFlag: " + encryptFlag + " and key: " + key);

      // display correct error
      switch($scope.ciphertype) {
        case 'caesar':
          $scope.isKeyANumber = !($.isNumeric(key));
          $("#key").addClass("has-error");
            break;
        case 'vigenere':
          var letters = /[A-Za-z]/;  
          $scope.isKeyAString = !(letters.test(key));
          $("#key").addClass("has-error");
          break;
        case 'hill':
          break;
      }


      // if the key is a number then continue, otherwise a new key needs to be entered
      if(!$scope.isKeyANumber && !$scope.isKeyAString){
        $("#key").removeClass("has-error");
        // if we're encypting then we want to get the plain text to convert to encypted text else we want to grab the encrypted text and convert to plain text
        // setup original text if we're doing an ecryption, else delete it
        var message;
        if(encryptFlag == 'encrypt') {
          message = $("#plain_text").val();
          $("#original_text").val(message);
          $("#plain_text").val("");
        } else {
          message = $("#encrypted_text").val();
          $("#original_text").val(message);
          $("#encrypted_text").val("");
        }

        cipherRunner.getCipherText(cipherName, message, key, encryptFlag)
          .success(function (data) {
              console.log(data.output[0]);
              console.log(data);
              
              if(data.success) {
              // when the data is returned display it in the appropriate text box
              var determineTextBox = (encryptFlag == 'encrypt') ? $("#encrypted_text") : $("#plain_text");
              $scope.textType = (encryptFlag == 'encrypt') ? "Plain" : "Encrypted";
              determineTextBox.val(data.output[0]);
            }
            else {
             alert('errror') ;
            }
          })
          .error(function (error) {
              $scope.status = 'Unable to process ' + cipherName + ' ' + encryptFlag + 'ion: ' + error.message;
          });
      } 
 
    } 
 }
]);