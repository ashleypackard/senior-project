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
      	introtext: "The Vigenere Cipher is a more complex version of the Caesar Cipher. This encryption method also uses shifted alphabets to encode messages. Instead of just using a simple one number shift of the alphabet, this cipher shifts by multiple alphabets, therefore making it a muliple shift cipher. The key is a string of characters, like a word. The key can be any length of characters such as 'spectacular', 'elephant', 'pig', or even just a single letter. The longer the key, the harder the message will be to crack as there will be more variability of the encoding. The cipher uses 26 different alphabets that corresponds to the string chosen as the key. For example, let's say our message is: 'I like cheese' and our key is 'bog' then the 'B' alphabet would be used to encrypt the first character 'I', which would mean 'A' = 'B' now, as if we did a 1 letter shift in the Caesar. Now the 'L' is encrypted with the 'O' alphabet, where 'A' = 'O', and so on. The key is repeated over the length of the message, b ogbo gbogbo, and then each character in the message is encrypted using that alphabet.",
      	link: "https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher",
        basicInstructions: "Requires a whole number as the key such as 3 or -3, and a messgage. Click 'Start Over' if you want to clear all text boxes.",
        encryptInstructions: "Enter the number to shift the alphabet by in the key text box below. Then enter your plain text message and click the 'Encrypt Message' button.",
        decryptInstructions: "Immediately decrypt your message after encrypting by clicking the 'Decrypt Message' button. If you have another encrypted message you'd like decrypted then enter the message into the text box labeled 'Encrypted Text', type the appropriate key into the key text box and click the 'Decrypt Message' button."
    }

    $scope.hill =
    {
      	introtext: "The Hill Cipher is the most secure encryption method of the three interactive ciphers displayed here since it uses linear algebra. A matrix is used as the key unlike the shift ciphers which use a word or single integer. The matrix must be a square matrix, nxn. The larger the size of n, then the harder the message will be to crack. This cipher requires a strict alphabet and only characters in the alphabet can be used in a message. The alphabet size must be prime. The size of our alphabet is 89, in order to include almost every character. To encrypt a message, the message itself is turned into a matrix using the alphabet index of each letter as the corresponding integers. Then this matrix is multiplied by the key to arrive at a new matrix. This matrix is then turned back into a string. To decrypt a message, the same process happens to the message again except the resulting matrix is multiplied by the inverse of the key. To find the inverse of a matrix we use modulo division to keep the matrix indeces within the alphabet size, in this case 0-88. Meaning that if a particular index after multiplication is 450, if we mod by 89, we're left with 5, which corresponds to the fifth letter in the alphabet, whereas 450 is out of range.",
      	link: "https://en.wikipedia.org/wiki/Hill_cipher",
      	basicInstructions: "Requires a square matrix as the key and a messgage. Click 'Start Over' if you want to clear all text boxes.",
        encryptInstructions: "Enter the square matrix separated by periods, ex: 2.3.6.4, in the key text box below. Then enter your plain text message and click the 'Encrypt Message' button.",
        decryptInstructions: "Immediately decrypt your message after encrypting by clicking the 'Decrypt Message' button. If you have another encrypted message you'd like decrypted then enter the message into the text box labeled 'Encrypted Text', type the appropriate key into the key text box and click the 'Decrypt Message' button."
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
      clearErrors();
    }

    // clear all errors by setting ng-show to false
    function clearErrors() {
      $scope.noMessageProvided = false;
      $scope.isKeyANumber = false; 
      $scope.isKeyAString = false;
      $scope.isKeyAMatrix = false;
    }

    // function for checking input of messages
    function isMessageProvided(encryptFlag) {
      // plain text message isn't present and we're encrypting
      if( (encryptFlag == 'encrypt') && (!$("#plain_text").val()) ) {
        $scope.message_flag = "a plain text message to encrypt.";
        $scope.noMessageProvided = true;
        $("#key").addClass("has-error");
        return false;
      }
      // encrypted message isn't present and we're decrypting
      else if( (encryptFlag == 'decrypt') && (!$("#encrypted_text").val()) ) {
        $scope.message_flag = "an encrypted message to decrypt.";
        $scope.noMessageProvided = true;
        $("#key").addClass("has-error");
        return false;
      }

      $scope.noMessageProvided = false;
      return true;
    }

    // function for checking valid key input
    function isKeyValid(key) {
      // display correct error
      var displayError = false;
      switch($scope.ciphertype) {
        case 'caesar':
          // this is true if error should be displayed
          $scope.isKeyANumber = !($.isNumeric(key));
          if($scope.isKeyANumber) {
            displayError = true;
          }
            break;
        case 'vigenere':
          var letters = /[A-Za-z]/; 
          // this is true if error should be displayed 
          $scope.isKeyAString = !(letters.test(key));
          if($scope.isKeyAString) {
            displayError = true;
          }
          break;
        case 'hill':
          // this follows the pattern dd.dd.dd.dd or d.d.d.d or any combination
          var contents = /((?:\d{1}|\d{2})\.){3}(?:\d{1}|\d{2})/;  
          // this is true if error should be displayed
          $scope.isKeyAMatrix = !(contents.test(key));
          if($scope.isKeyAMatrix) {
            displayError = true;
          }
          break;
      }

      if(displayError) { 
        $("#key").addClass("has-error");
        return false;
      }
      return true;
    }

    // function call for encrypting and decrypting!
    $scope.cipherCall = function getCipherText(cipherName, encryptFlag) {
      // first check to see if there is any input to encrypt or decrypt and the key is valid
      var isMessagePresent = isMessageProvided(encryptFlag);

      // check if input is correct
      var key = $("#key_text").val();
      var isValidKey = isKeyValid(key);     

      // if the key is a number then continue, otherwise a new key needs to be entered
      if(isMessagePresent && isValidKey){
        $("#key").removeClass("has-error");

        // if we're encrypting then we want to get the plain text to convert to encrypted text else we want to grab the encrypted text and convert to plain text
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