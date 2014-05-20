function initial_install(){
    //url = "http://96.226.37.132:8000/main/initial_install/";
    
    $("#uuid").val(localStorage.uuid);
    url = "http://eserv-portal.from-tx.com:8000/main/initial_install/";
    loading('show');
    var data = {};
    data['email']=$("#txtEmail").val();
    data['rep_no']=$("#txtRepNo").val();
    data['uuid']=localStorage.uuid;
    console.log("sending data: " + data);
    $.post(url, data, function(data) {
           if (data.result == 'Success') {
           loading('hide');
           showCustomAlert("Please check your email to retrieve the installation code.");
           $.mobile.changePage( "#register", {
                               transition: "slide",
                               reverse: false,
                               changeHash: false
                               });
           
           } else {
           loading('hide');
           showCustomAlert("Please enter a valid email and rep number.");
           
           }
           }, "json");
}


function openForgotPasswordPopup(){
    $( "#forgotPasswordPopup" ).popup( "open",{ transition: 'flip' } );
}
function closeforgotPasswordPopup(){
    $( "#forgotPasswordPopup" ).popup( "close");
    
}

function requestForForgotPassword(){
    
    
    
    var emailEntered = $("#txtForgotPassword").val();;
   
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(emailEntered.match(mailformat))
    {
        
        console.log("forgot password for the email addr - "+emailEntered);
        url = "http://eserv-portal.from-tx.com:8000/main/forgot_password";
        var data = {};
        data['username'] = '';
        data['device id'] = '';
        data['email to'] = $("#txtForgotPassword").val()
        console.log("sending data: " + JSON.stringify(data));
        $.post(url, data, function(data) {
               
               console.log(JSON.stringify(data));
               
               });
        showCustomAlert("Please check your email for new password");
        $( "#forgotPasswordPopup" ).popup( "close");
       
    }
    else{
        showCustomAlert("Please enter correct email address!!");
        
    }
    
    
    
    
}


function set_profile_dashboard(){
    url = "http://eserv-portal.from-tx.com:8000/main/set_profile/";
    var data = {};
    var localStoreData_arr = new Array();
    
    
    if ( $("#inputEmail").val() != "" &&  $("#inputPassword").val() != "" &&  $("#inputDeviceName").val() != ""&&  $("#inputPin").val() != ""&&  $("#inputFranch_Name").val() != ""&&  $("#inputFranch_Number").val() != ""&&  $("#inputRep_Name").val() != ""&&  $("#inputRep_Number").val() != ""&&  $("#input_phone").val() != ""&&  $("#input_shipTo").val() != "" && $("#input_email").val() != "")
    {
        
//        if($("#txtPassword").val() == $("#txtConf_Password").val()){
        
            var temp_email = $("#input_email").val();
            
            //            if((temp_email.split("@").length-1) == 1 && (temp_email.split(".").length-1) == 1){
            
            
            var mailformat = /^\w+([\.]?\w+)@\w+([\.]?\w+)(\.\w{2,3})+$/;
            
            if(temp_email.match(mailformat)){
                
                //                    418624
                localStoreData_arr.push($("#inputEmail").val());
                localStoreData_arr.push($("#inputPassword").val());
                localStoreData_arr.push($("#inputDeviceName").val());
//                localStoreData_arr.push($("#uuid").val());
                localStoreData_arr.push($("#input_email").val());
                localStoreData_arr.push($("#inputPin").val());
//                localStoreData_arr.push($("#txtInstallCode").val());
                localStoreData_arr.push($("#inputFranch_Name").val());
                localStoreData_arr.push($("#inputFranch_Number").val());
                localStoreData_arr.push($("#inputRep_Name").val());
                localStoreData_arr.push($("#inputRep_Number").val());
                localStoreData_arr.push($("#input_phone").val());
                localStoreData_arr.push($("#input_shipTo").val());
                
 
                
                console.log("localStoreData_arr - "+localStoreData_arr[0]);
                
                localStorage["userProfile"] = JSON.stringify(localStoreData_arr);
                
                data['username']=$("#inputEmail").val();
                data['password']=$("#inputPassword").val();
                data['device_name']=$("#inputDeviceName").val();
                localStorage.deviceName = $("#inputDeviceName").val();
                data['uuid']=   localStorage.uuid;
                data['email']=$("#input_email").val();
                data['user_pin']=$("#inputPin").val();
                data['install_code']=localStorage.install_code;
                
                console.log("sending data: " + JSON.stringify(data));
                
                $.post(url, data, function(data) {
                       console.log(JSON.stringify(data));
                       if (data.sync_token) {
                       
                       
                       
                       
                       
                       
                       showCustomAlert("Congratulations! You're all set!");
                       //                           showCustomAlert("This is your sync token:  " + data.sync_token);
                       localStorage.syncToken = data.sync_token;
                       getServerCurrentTime(true);
                       //                           moveToDashboard();
                       } else {
                       showCustomAlert("error, please check your installation code and try again.");
                       }
                       }, "json");
                
                
                
                
                //                }else{
                //                    showCustomAlert("Please enter correct email");
                //                }
            }else{
                showCustomAlert("Please enter correct email");
            }
        
        
    }else{
        showCustomAlert("Please fill all the fields");
    }

}


function set_profile(){
    
    
    url = "http://eserv-portal.from-tx.com:8000/main/set_profile/";
    var data = {};
    var localStoreData_arr = new Array();
    
    
    if ( $("#txtUsername").val() != "" &&  $("#txtPassword").val() != "" &&  $("#txtDeviceName").val() != ""&&  $("#txtPin").val() != ""&&  $("#txtInstallCode").val() != ""&&  $("#txtFranch_Name").val() != ""&&  $("#txtFranch_Number").val() != ""&&  $("#txtRep_Name").val() != ""&&  $("#txtRep_Number").val() != ""&&  $("#txtPhone_Number").val() != ""&&  $("#txtShip_To").val() != ""&&  $("#txtConf_Password").val() != "" && $("#txtEmail2").val() != "")
    {
        
        if($("#txtPassword").val() == $("#txtConf_Password").val()){
            
            var temp_email = $("#txtEmail2").val();
            
//            if((temp_email.split("@").length-1) == 1 && (temp_email.split(".").length-1) == 1){
            
                
                var mailformat = /^\w+([\.]?\w+)@\w+([\.]?\w+)(\.\w{2,3})+$/;
                
                if(temp_email.match(mailformat)){
                    
//                    418624
                   
                    
                    
                    console.log("localStoreData_arr - "+localStoreData_arr[0]);
                    
                    localStorage["userProfile"] = JSON.stringify(localStoreData_arr);
                    
                    data['username']=$("#txtUsername").val();
                    data['password']=$("#txtPassword").val();
                    data['device_name']=$("#txtDeviceName").val();
                    localStorage.deviceName = $("#txtDeviceName").val();
                    data['uuid']=$("#uuid").val();
                    data['email']=$("#txtEmail").val();
                    data['user_pin']=$("#txtPin").val();
                    data['install_code']=$("#txtInstallCode").val();
                    localStorage.install_code = $("#txtInstallCode").val();
                    console.log("sending data: " + JSON.stringify(data));
                    
                    $.post(url, data, function(data) {
                           console.log(JSON.stringify(data));
                           if (data.sync_token) {
                           
                           
                           localStoreData_arr.push($("#txtUsername").val());
                           localStoreData_arr.push($("#txtPassword").val());
                           localStoreData_arr.push($("#txtDeviceName").val());
                           localStoreData_arr.push($("#uuid").val());
                           localStoreData_arr.push($("#txtEmail2").val());
                           localStoreData_arr.push($("#txtPin").val());
                           localStoreData_arr.push($("#txtInstallCode").val());
                           localStoreData_arr.push($("#txtFranch_Name").val());
                           localStoreData_arr.push($("#txtFranch_Number").val());
                           localStoreData_arr.push($("#txtRep_Name").val());
                           localStoreData_arr.push($("#txtRep_Number").val());
                           localStoreData_arr.push($("#txtPhone_Number").val());
                           localStoreData_arr.push($("#txtShip_To").val());
                           
                           
                           showCustomAlert("Congratulations! You are all set!");
//                           showCustomAlert("This is your sync token:  " + data.sync_token);
                           localStorage.syncToken = data.sync_token;
                           getServerCurrentTime(true);
//                           moveToDashboard();
                           } else {
                           showCustomAlert(JSON.stringify(data));
                           }
                           }, "json");
                    
                    
                    
                    
//                }else{
//                    showCustomAlert("Please enter correct email");
//                }
            }else{
                showCustomAlert("Please enter correct email");
            }
        }else{
            showCustomAlert("Password are not match");
        }
        
    }else{
        showCustomAlert("Please fill all the fields");
    }
    
}


function get_sync_token(){
//    getServerCurrentTime(true);
    
//    if(!localStorage.deviceName){
//        showCustomAlert("Please register first.");
//        return;
//    }
    
    url = "http://eserv-portal.from-tx.com:8000/main/get_sync_token/";
    var data = {};
    data['username']=$("#txtLoginUsername").val();
    data['password']=$("#txtLoginPassword").val();
//    data['device_name']="Nishant";
    data['uuid']=  localStorage.uuid;
//    getServerCurrentTime(true);
//    moveToDashboard();
    console.log("sending data: " + JSON.stringify(data));
    $.post(url, data, function(data) {
           
           console.log("login response - "+JSON.stringify(data));
           if (data.sync_token) {
           
           getServerCurrentTime(true);
           
           localStorage.syncToken = data.sync_token;
           isLoaderShown = false;
            $.mobile.changePage( $("#launchPage"), { transition: "slide", reverse: false, changeHash: true });
//           moveToDashboard();
           }
           else{
           if(data.user_authenticated==false)
           showCustomAlert("Incorrect username or password...");
           else if(data.device_authenticated==false)
           showCustomAlert("This device is not registered yet, please register first...");
           else
           showCustomAlert(JSON.stringify(data));
           }
           }, "json");
}

function getServerCurrentTime(islogin){
    var url = "http://eserv-portal.from-tx.com:8000/main/server_time/";
    var data = {};
    console.log("getting server time");
    isLoaderShown = false;
     moveToDashboard();
    
//    $.post(url,data, function(data) {
//           
//           console.log("server's current time -"+data.time);
//          
//           localStorage.currentTime  = data.time;
//           var lastlogintime = parseFloat(data.time);
//           var loginValidThrough = lastlogintime + 604800;
//           localStorage.tokenValidThrough = loginValidThrough;
//           console.log("time - "+lastlogintime+" 7 days time - "+loginValidThrough);
//           if(islogin){
//           localStorage.tokenValidThrough = loginValidThrough;
//           
//           }
//           else
//           return lastlogintime;
//           }, "json");
}

