# API on Encryption and Decryption of text Data.

Request Format for Encryption :
1. Post request on baseUrl/encrypt
2. json data in format given below
   {
     "msg" : "Message you want to encryt",
     "code" : "123456789012345678901234567890123456789012345678"  // 48-digit code
   }

Request Format for Decryption :
1. Post request on baseUrl/decrypt
2. json data in format given below
   {
     "emsg" : "Message you want to decryt",
     "code" : "123456789012345678901234567890123456789012345678"  // 48-digit code
   }
