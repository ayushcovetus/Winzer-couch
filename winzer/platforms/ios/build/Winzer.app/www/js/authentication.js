function initial_install(){
    //url = "http://96.226.37.132:8000/main/initial_install/";
    
    $("#uuid").val(localStorage.uuid);
    url = "http://eserv-portal.from-tx.com:8000/main/initial_install/";
    loading('show');
    var data = {};
    data['email']=$("#txtEmail").val();
    data['rep_no']=$("#txtRepNo").val();
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


function set_profile(){
    url = "http://eserv-portal.from-tx.com:8000/main/set_profile/";
    var data = {};
    data['username']=$("#txtUsername").val();
    data['password']=$("#txtPassword").val();
    data['device_name']=$("#txtDeviceName").val();
    localStorage.deviceName = $("#txtDeviceName").val();
    data['uuid']=$("#uuid").val();
    data['email']=$("#txtEmail").val();
    data['user_pin']=$("#txtPin").val();
    data['install_code']=$("#txtInstallCode").val();
    console.log("sending data: " + data);
    $.post(url, data, function(data) {
           if (data.sync_token) {
           showCustomAlert("Congratulations! Your all set!");
           showCustomAlert("This is your sync token:  " + data.sync_token);
           localStorage.syncToken = data.sync_token;
           moveToDashboard();
           } else {
           showCustomAlert("error, please check your installation code and try again.");
           }
           }, "json");
}


function get_sync_token(){
    url = "http://eserv-portal.from-tx.com:8000/main/get_sync_token/";
    var data = {};
    data['username']=$("#txtLoginUsername").val();
    data['password']=$("#txtLoginPassword").val();
    console.log(localStorage.deviceName+"---"+localStorage.uuid);
//    data['device_name']=localStorage.deviceName;
    data['uuid']=localStorage.uuid;
    console.log("sending data: " + data);
    $.post(url, data, function(data) {
           
           console.log(JSON.stringify(data));
           if (data.sync_token) {
//           showCustomAlert("sync token:  " + data.CB_sync_session);
//           showCustomAlert("user authenticated: " + data.user_authenticated);
//           showCustomAlert("device authenticated: " + data.device_authenticated);
           localStorage.syncToken = data.sync_token;
           moveToDashboard();
           }
           else{
           showCustomAlert(data.result);
           }
           }, "json");
}
