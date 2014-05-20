/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var coax = require("coax"),
    fastclick = require("fastclick"),
    appDbName = "todo",
    imageDbName = "winzerimg",
    customerDbName = "winzercustomer"


new fastclick.FastClick(document.body)
var bradcrumArry = ["Catalog"];
document.addEventListener("deviceready", appInit, false)

var isCatalogIndexingComplete = false;
var arrayOfProducts=new Array();
var arrayOfHoldingArrays=[];

var localSqlDb;
var lastSearchedNumberForPartPrefix;

/*
Initialize the app, connect to the database, draw the initial UI
*/

function getrecordcount(){
    
    console.log("in get records!! isCatalogIndexingComplete - "+localStorage.catalogIndexingComplete);
    
    
    var data= {};
    var url = "http://54.221.200.225:8092/winzer/_design/counts/_view/products?key=%22ch-read-id-1%22";

    
    getCategoryCountByAjax(url,"ProductCount");
    
    
    
//    $.post(url, data, function(data) {
//           console.log("catalogCount - "+JSON.stringify(data));
//           localStorage.catalogUpdateCount = data.update_seq
//           localStorage.catalogCount = data.count;
//            getCategoryCount();
//           }, "json");
}
function getCategoryCountByAjax(url,forCateg){
    var data= {};
    
    $.ajax({
           type : "GET",
           url : url,
           data : data,
           cache : false,
           ajaxLinksEnabled : false,
           headers: {
           "Accept": "application/json",
           "Content-Type": "application/json"
           },
           dataType: "json",
           beforeSend : function() {
           },
           success : function(data) {
           
           
           console.log(forCateg+"---"+data.rows[0].value);
           
           switch (forCateg)
           {
           case "ProductCount":
           localStorage.productCount = data.rows[0].value;
           getCategoryCountByAjax("http://54.221.200.225:8092/winzer/_design/counts/_view/images","ImageCount");
           break;
           case "ImageCount":
           localStorage.totalImageCount = data.rows[0].value;
           getCategoryCountByAjax("http://54.221.200.225:8092/winzer/_design/counts/_view/customers?key=%22ch-rep-id-824%22","CustomerCount");
           break;
           case "CustomerCount":
           localStorage.totalCustomerCount = data.rows[0].value;
           
           var totoalProdCount = parseInt(localStorage.productCount);
           var totalCustCount = parseInt(localStorage.totalCustomerCount);
           var totalImgCount = parseInt(localStorage.totalImageCount);
           
           
           localStorage.catalogUpdateCount = totoalProdCount+totalCustCount+totalImgCount;
           localStorage.catalogCount = totoalProdCount+totalCustCount+totalImgCount;
           
           console.log("total records to sync - "+localStorage.catalogCount);
           
           localStorage.catalogUpdateCount = 130773;
           localStorage.catalogCount = 130773;
           
           
           afterCounts();
           break;
           }
           
           
           },
           error : function(errMsg) {
           console.log("error"+JSON.stringify(errMsg));
           }
           });
}
function getCategoryCount(){
    
//    var CategoryCount = getCategoryCountByAjax("http://54.221.200.225:8092/winzer/_design/counts/_view/CategoryCount","CategoryCount");
//     var Category2Count = getCategoryCountByAjax("http://54.221.200.225:8092/winzer/_design/counts/_view/Category2Count","Category2Count");
//    var Category3Count = getCategoryCountByAjax("http://54.221.200.225:8092/winzer/_design/counts/_view/Category3Count","Category3Count");

 }

function getimagecount(){
    
    
    console.log("in get image counts!!");
    
    var data= {};
    var url = "http://eserv-portal.from-tx.com:8000/main/count_bucket/images/";
    $.post(url, data, function(data) {
           console.log("imageCount - "+data.count);
           localStorage.imageCount = data.count;
//           afterCounts();
           localStorage.imageUpdateCount = data.update_seq
           }, "json");
}
function changeOrientation() {
    switch (window.orientation) {
        case 0:
            // portrait, home bottom
        case 180:
            // portrait, home top
        {
//            alert("portrait H: " + $(window).height() + " W: " + $(window).width());
            loadjscssfile("css/docs_potrait.css","css");
            removejscssfile("docs.css","css");
            makePotraitScroller();
            
            
        }
            break;
        case -90:
            // landscape, home left
        case 90:
            // landscape, home right
        {
//            alert("landscape H: " + $(window).height() + " W: " + $(window).width());
            loadjscssfile("css/docs.css","css");
            removejscssfile("docs_potrait.css","css");

            makeLandscapeScroller();
        }
            break;
    }
}


function makeLandscapeScroller(){
    $('#customerSummary').slimScroll({
                                     height: '660px'
                                     });
    
    $('#customerList').slimScroll({
                                  height: '637px'
                                  });
    
    $('#dashboardTable').slimScroll({
                                    height: '150px'
                                    });
    

}
function makePotraitScroller(){
    $('#customerSummary').slimScroll({
                                     height: '900px'
                                     });
    
    $('#customerList').slimScroll({
                                  height: '637px'
                                  });
    
    $('#dashboardTable').slimScroll({
                                    height: '350px'
                                    });
    
}


function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
            }
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
        
}

var timeoutHandle = setTimeout(function(){
                                if(localStorage.imagesyncComplete =="true")
                               window.plugins.insomnia.allowSleepAgain(
                                                                       function(){
                                                                       console.log("success");
                                                                       },
                                                                       function(){
                                                                       console.log("error");
                                                                       }
                                                                       );
                                },1800000);
function appInit() {
    console.log("appInit");
    window.plugins.insomnia.keepAwake();
    console.log("appInit2");
   // ******
    localStorage.uuid = window.device.uuid;
    
    var initialScreenSize = window.innerHeight;
    window.addEventListener("resize", function() {
                            if(window.innerHeight < initialScreenSize){
                            $(".dash_footer").hide();
                            } else{ 
                            $(".dash_footer").show(); } });
    

    
    
    $("#accordion_filter_heading").on("click", function() {
               
               if(document.getElementById("b").style.left == "151px")
               document.getElementById("b").style.left = "0px";
               else
               document.getElementById("b").style.left = "151px";
                                });
    
//    $(document).on("pageshow", "#dashboardwf", dashboardShown);
    
    

    
    document.addEventListener('touchmove', function(e){
                              
                              e.preventDefault(); }
                              
                              );
    
    window.onorientationchange = function () {
        //Need at least 800 milliseconds
        setTimeout(changeOrientation, 1000);
    }
    
    getServerCurrentTime(false);

    
   
    
    document.body.addEventListener('touchstart', function(e){
                                   console.log("page touches at -"+e.changedTouches[0].pageX) // alert pageX coordinate of touch point
                                   
                                   resetCountForSleep = 0;
                                   
                                   
                                   
                                   
                                   console.log("clear timeout");
                                   
                                   clearInterval(timeoutHandle);
                                  
                                   timeoutHandle = setTimeout(function(){
                                                              console.log("allow ipad to sleep");
                                                               if(localStorage.imagesyncComplete =="true")
                                                              window.plugins.insomnia.allowSleepAgain(
                                                                                                      function(){
                                                                                                      console.log("success");
                                                                                                      },
                                                                                                      function(){
                                                                                                      console.log("error");
                                                                                                      }
                                                              
                                                              );
                                                              
                                                                     },1800000);
                                   
                                   }, false);
    
    
    
    
    document.getElementById('accordion_filter_heading').addEventListener('touchstart',filterOptionsTapped,false);
    
    
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);


   
};




function sendSupportEmail(){
    
    
    if ( $("#supp_fname").val() != "" &&  $("#supp_lname").val() != "" &&  $("#supp_email").val() != ""&&  $("#supp_comp_name").val() != ""&&  $("#supp_phone").val() != ""&&  $("#supp_message").val() != ""){
    window.plugin.email.isServiceAvailable(
                                           function (isAvailable) {
                                            console.log('Service is available'+isAvailable);
                                           if(isAvailable){
                                           window.plugin.email.open({
                                                                    to:      ['eserv.support@winzerusa.com'],
                                                                    subject: 'Need Support!!!',
                                                                    body:'First Name: '+$("#supp_fname").val()+
                                                                    '<br/>'+
                                                                    'Last Name: '+$("#supp_lname").val()+
                                                                    '<br/>'+
                                                                    'Email: '+$("#supp_email").val()+
                                                                    '<br/>'+
                                                                    'Company Name: '+$("#supp_comp_name").val()+
                                                                    '<br/>'+
                                                                    'Phone: '+$("#supp_phone").val()+
                                                                    '<br/>'+
                                                                    'Preferred Contact Method:'+$("#preferedEmailSelected").html()+
                                                                    '<br/>'+
                                                                    'Time Zone: '+$("#timeZoneSelected").html()+
                                                                    '<br/>'+
                                                                    'Best Time To Call: '+$("#bestTimeToCallSelected").html()+
                                                                    '<br/>'+
                                                                    'Message: '+$("#supp_message").val(),
                                                                    isHtml:  true
                                                                    });
                                            //'<h1>Need Support!!!</h1>'+
                                           }
                                           else{
                                                 showCustomAlert('Sorry, email services are not available on your device.');
                                           }
                                           
                                           
                                           }
                                           );
    }
    else
    {
        showCustomAlert('Sorry, all fields are mandatory.');
    }
}


function selectionForBestTimeToCall(val){
    $("#bestTimeToCallSelected").html(val);
}
function selectionForPreferedContact(val){
    $("#preferedEmailSelected").html(val);
}
function selectionForTimeZone(val){
    $("#timeZoneSelected").html(val);
}
function dashboardShown(){
//
    if(localStorage.userProfile){
    var temp_profile_array = JSON.parse(localStorage["userProfile"]);
    
    console.log("user profile array - "+localStorage.userProfile);
        
        
    $("#inputEmail").val(temp_profile_array[0]);
    $("#inputFranch_Name").val(temp_profile_array[5]);
    $("#inputFranch_Number").val(temp_profile_array[6]);
    $("#inputRep_Name").val(temp_profile_array[7]);
    $("#inputRep_Number").val(temp_profile_array[8]);
    $("#input_email").val(temp_profile_array[3]);
    $("#input_phone").val(temp_profile_array[9]);
    $("#input_shipTo").val(temp_profile_array[10]);
    $("#inputPassword").val(temp_profile_array[1]);
    $("#inputConfirmPassword").val(temp_profile_array[1]);
    $("#inputDeviceName").val(temp_profile_array[2]);
    $("#inputPin").val(temp_profile_array[4]);
    
    
    }
    
    
  var baseCateghtml = "<table style=\"margin-bottom:0px;\" class=\"table\">"+
    "     <thead>"+
    "        <tr>"+
    "            <th style=\"width: 32%;\"></th>"+
    "            <th style=\"width: 23%;\">On App</th>"+
    "            <th style=\"width: 12%;\">In Database</th>"+
    "            <th style=\"width: 13%;\"></th>"+
    "            <td style=\"width: 13%;\" ></td>"+
    "        </tr>"+
    "</thead>"+
    "</table>"+
    "<table class=\"table\"><tbody>";
    
    
    var productCountOnApp = parseInt(localStorage.seq);
    var totalProductOnServer = parseInt(localStorage.catalogCount);
    
    
    var imageCountOnApp = parseInt(localStorage.imgseq);
    var totalImageOnServer = parseInt(localStorage.imageCount);
    
    if(productCountOnApp>totalProductOnServer)
        productCountOnApp = totalProductOnServer;
    
    if(imageCountOnApp>totalImageOnServer)
        imageCountOnApp = totalImageOnServer;
    
    
    
    baseCateghtml +=  "<tr bgcolor=\"#f5f5f5\">"+
    "            <th colspan=\"3\" style=\"width: 35%;\">Number of products</th>"+
    "            <th>"+productCountOnApp+"</th>"+
    "            <th>"+totalProductOnServer+"</th>"+
    "            <th></th>"+
    "            <th></th>"+
    "        </tr>";
    
    baseCateghtml +=  "<tr bgcolor=\"#f5f5f5\">"+
    "            <th colspan=\"3\" style=\"width: 35%;\">Category count for level 1</th>"+
    "            <th>"+localStorage.CategoryCount+"</th>"+
    "            <th>"+localStorage.CategoryCount+"</th>"+
    "            <th></th>"+
    "            <th></th>"+
    "        </tr>";
    
    baseCateghtml +=  "<tr bgcolor=\"#f5f5f5\">"+
    "            <th colspan=\"3\" style=\"width: 35%;\">Category count for level 2</th>"+
    "            <th>"+localStorage.Category2Count+"</th>"+
    "            <th>"+localStorage.Category2Count+"</th>"+
    "            <th></th>"+
    "            <th></th>"+
    "        </tr>";
    
    baseCateghtml +=  "<tr bgcolor=\"#f5f5f5\">"+
    "            <th colspan=\"3\" style=\"width: 35%;\">Category count for level 3</th>"+
    "            <th>"+localStorage.Category3Count+"</th>"+
    "            <th>"+localStorage.Category3Count+"</th>"+
    "            <th></th>"+
    "            <th></th>"+
    "        </tr></tbody></table>";
    
    $("#key_stats_div").html(baseCateghtml);
    
}

function saveProfileData(){
    
    
    if ( $("#inputEmail").val() != "" &&  $("#inputPassword").val() != "" &&  $("#inputDeviceName").val() != ""&&  $("#inputFranch_Name").val() != ""&&  $("#inputFranch_Number").val() != ""&&  $("#inputRep_Name").val() != ""&&  $("#inputRep_Number").val() != ""&&  $("#input_phone").val() != ""&&  $("#input_shipTo").val() != "")
    {

    
    
    console.log("save profile data");
    var temp_profile_save_array = new Array();
    
        temp_profile_save_array.push($("#inputEmail").val());
        temp_profile_save_array.push($("#inputPassword").val());
        temp_profile_save_array.push($("#inputDeviceName").val());
        temp_profile_save_array.push("");
        temp_profile_save_array.push($("#input_email").html());
        temp_profile_save_array.push($("#inputPin").val());
        temp_profile_save_array.push("");
        temp_profile_save_array.push($("#inputFranch_Name").val());
        temp_profile_save_array.push($("#inputFranch_Number").val());
        temp_profile_save_array.push($("#inputRep_Name").val());
        temp_profile_save_array.push($("#inputRep_Number").val());
        temp_profile_save_array.push( $("#input_phone").val());
        temp_profile_save_array.push($("#input_shipTo").val());
    
    console.log("temp_profile_save_array - "+temp_profile_save_array);
    
    localStorage["userProfile"] = JSON.stringify(temp_profile_save_array);
    
    
    showCustomAlert("Profile saved successfully!!!");
    
    console.log("localStorage - "+localStorage["userProfile"]);
    }
    
}
var isLoaderShown = true;
function tokenValidate(){
    
    var tokenValidThrough = parseFloat(localStorage.tokenValidThrough);
    
    var currentTime = parseFloat(localStorage.currentTime);
    
    console.log("token - tokenValidThrough"+tokenValidThrough+" currentTime -"+currentTime);

    
    if(currentTime<tokenValidThrough){
        console.log("token is valid - tokenValidThrough"+tokenValidThrough+" currentTime -"+currentTime);
        isLoaderShown = false;
        moveToDashboard();
    }
    else
    {
        isLoaderShown = true;
        setTimeout(
                   function(){
//                   $.mobile.changePage( $("#loginuser"), { transition: "slide", reverse: false, changeHash: true });
                   changePage("loginuser");
                   },
                   2000
                   );
        //        console.log("token is no longer valid - tokenValidThrough"+tokenValidThrough+" currentTime -"+currentTime);
    }
    
    
}


//window.dbChangedCustomer = function(){};
function connectToChangesCustomer(){
    
//    alert("connectToChangesCustomer");
    
    var customerSyncCountInLocalDb = parseInt(localStorage.customerseq);
    
    if(localStorage.customerseq){
        if(customerSyncCountInLocalDb >= 111)
            $("#imageSyncState").html("<strong>Alert! Customer Record Sync Complete!</strong>");
        else
            $("#imageSyncState").html("<strong>Alert! </strong>Total customer records sync - "+localStorage.customerseq);
    }
    else
        $("#imageSyncState").html("<strong>Alert! </strong>Total customer records sync - "+configCustomer.info.update_seq);
    
    configCustomer.db.changes({since : configCustomer.info.update_seq}, function(_, ch){
                              
                              localStorage.customerseq=ch.seq;
                              var currentCustomerCounts = parseInt(localStorage.customerseq);
                              if (currentCustomerCounts >= 111) {
                              $("#imageSyncState").html("<strong>Customer Record Sync Complete!</strong>");
                              
                              }
                              else{
                              $("#imageSyncState").html("<strong>Alert! </strong>Total Customer records sync - "+ch.seq);
                              
                              }
                              });

    
}

function goIndexCustomer(){
//    window.dbChangedCustomer = function() {
//        console.log("################- Customer"+JSON.stringify(config.info));
//        
//        
//    }
//    window.dbChangedCustomer()
}

function afterCounts(){
    
    
  
    
    
    $("#catalogSearchInput").on("keypress", function(event){
                                if (event.keyCode === 13) {
                                showPurchaseHistory();
                                $("#catalogSearchInput").blur();
                                }
                                });
    $("#dashboardTopSearch").on("keypress", function(event){
                         if (event.keyCode === 13) {
                                showPurchaseHistory();
                         $("#dashboardTopSearch").blur();
                         }
                         });
    
  
    document.getElementById("dashboard_li_side_nav").className = "active";
    
//    $("#liProductcatalog").style.backgroundImage="url('../img/footer_nav.png')";
    
//    setupCustomerDb(function(){
//                    //                    appImgReady()
//                    
////                    alert("setup customer db done!!");
//                    connectToChangesCustomer();
////                    goIndexCustomer();
//                    
//                    triggerCustomerSync(function(err) {
//                                        if (err) {
//                                        console.log("error on sync", err)
//                                        }
//                                        });
//                    
//                    loadingWithMsg("hide","");
//                    });
    if(isLoaderShown)
    loadingWithMsg("show","Setting up local database...");
    console.log("after counts");
    
    var newDate = new Date();
    console.log("Time before setup config: " + newDate.getMinutes()+ ":"+ newDate.getSeconds() );
    
    setupConfig(function(){
                var newDate1 = new Date();
                console.log("Time after setup config: " + newDate1.getMinutes()+ ":"+ newDate1.getSeconds());
                connectToChanges();
                var newDate12 = new Date();
                console.log("Time after connectToChanges: "+ newDate12.getMinutes()+ ":"+ newDate12.getSeconds());
                goIndex();
                var newDate13 = new Date();
                console.log("Time after goIndex : " +newDate13.getMinutes()+ ":"+ newDate13.getSeconds());
//                appReady()
                if(localStorage.catalogIndexingComplete!="true"){
                triggerSync(function(err) {
                            if (err) {
                            console.log("error on sync", JSON.stringify(err))
                            }
                            });
                var newDate14 = new Date();
                console.log("Time after trigger: " +newDate14.getMinutes()+ ":"+ newDate14.getSeconds());
                }
                loadingWithMsg("hide","");
                });

}


window.dbChanged = function(){}



function getActiveTask(){
    alert("getActive Tasks");
    var data= {};
    var url = "http://lite.couchbase./todo/_active_tasks";
    $.post(url, data, function(data) {
           
           
           console.log("data - "+JSON.stringify(data));
           alert("data");
           
           });
}

var numberOfCatalogIndexCalled = 0;
function connectToChanges() {
    
    if(localStorage.catalogIndexingComplete=="true"){
        $("#firstSyncStatus").html("");
//        $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: false, changeHash: false });
        changePage("dashboardwf");
        return;
    }
    
    
    localStorage.seq = config.info.doc_count;
    
    var recordSyncCountInLocalDb = parseInt(localStorage.seq);
    var recordCounts = parseInt(localStorage.catalogCount);
    var lastSeq;

    var catalogUpdateSequence = parseInt(localStorage.catalogUpdateCount);
    config.db.changes({since : config.info.update_seq}, function(err, change){
                      
                      window.dbChanged();
                      
                     catalogUpdateSequence = parseInt(localStorage.catalogUpdateCount);
                      
                      recordSyncCountInLocalDb = parseInt(localStorage.seq);
                      recordCounts = parseInt(localStorage.catalogCount);
                      
                      console.log("config db info - "+config.db.info);
                      console.log("config info - "+JSON.stringify(config.info));
                      console.log("database change with index - "+JSON.stringify(change));
                      
                      if(recordSyncCountInLocalDb<change.seq)
                      localStorage.seq=change.seq;
                      
                      
                      if (change.seq >= catalogUpdateSequence){
                      numberOfCatalogIndexCalled++;
                       catalogIndexing();
                      $("#syncState").html("<strong>Alert! Catalog Sync Complete..</strong>");
                      $("#syncStatusPageDiv").html("<strong>Alert! Catalog Sync Complete..</strong>");
                      
                      return;
                      }
                      
                      if (change.seq >= recordCounts) {
                      var updateDocno = change.seq - recordCounts;
                      $("#syncState").html("<strong>Alert! Updating documents..."+updateDocno+"</strong>");
                      $("#syncStatusPageDiv").html("<strong>Alert! Updating documents.."+updateDocno+"</strong>");
//                      catalogIndexing();
                      return;
                      }
                      lastSeq = change.seq
                      console.log("change");
                      
                      var sequence = parseInt(localStorage.seq);
                      if(recordCounts){
//                      $("#syncState").html("<strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input disabled=\"true\" id=\"seekBar\" data-theme=\"c\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+sequence+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
//                      
                      var htmlToAppend = "<div  class=\"hero-unit\" >"+
                      "<div class=\"hero_inner_box\">"+
                      "<div class=\"span7\"><p id=\"syncState\"><strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input disabled=\"true\" id=\"seekBar\" data-theme=\"c\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+sequence+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" /><p></div>"+
                      "<div onclick=\"deleteHeroUnit('#firstSyncStatus');\" class=\"span1 pull-right\"><img src=\"img/button.png\" width=\"37\" height=\"24\"> </div>"+
                      "<div class=\"span7\"><p id=\"imageSyncState\"></p></div>"+
                      
                      "<div class=\"clearfix\"></div>"+
                      
                      "</div>"+
                      "<div class=\"clearfix\"></div>"+
                      "</div>";
                      
                      var htmlToAppendOnSyncPage = "<div  class=\"hero-unit\" >"+
                      "<div class=\"hero_inner_box\">"+
                      "<div class=\"span7\"><p id=\"syncStatusPageDiv\"><strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input disabled=\"true\" id=\"seekBar\" data-theme=\"c\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+sequence+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" /><p></div>"+
                      "<div class=\"span7\"><p id=\"imageSyncStatusPageDiv\"></p></div>"+
                      
                      "<div class=\"clearfix\"></div>"+
                      
                      "</div>"+
                      "<div class=\"clearfix\"></div>"+
                      "</div>";
                      
                      $("#firstSyncStatus").html(htmlToAppend);
                      $("#syncStatusOnSyncPage").html(htmlToAppendOnSyncPage);
                      
                      
                      }
                      else{
//                      $("#syncState").html("<strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\"  data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+localStorage.seq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
//                      
                      
                      var htmlToAppend = "<div  class=\"hero-unit\" >"+
                      "<div class=\"hero_inner_box\">"+
                      "<div class=\"span7\"><p id=\"syncState\"><strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\"  data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+localStorage.seq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" /><p></div>"+
                      "<div onclick=\"deleteHeroUnit('#firstSyncStatus');\" class=\"span1 pull-right\"><img src=\"img/button.png\" width=\"37\" height=\"24\"> </div>"+
                      "<div class=\"span7\"><p id=\"imageSyncState\"></p></div>"+
                      
                      "<div class=\"clearfix\"></div>"+
                      
                      "</div>"+
                      "<div class=\"clearfix\"></div>"+
                      "</div>";
                      
                      var htmlToAppendOnSyncPage = "<div  class=\"hero-unit\" >"+
                      "<div class=\"hero_inner_box\">"+
                      "<div class=\"span7\"><p id=\"syncStatusPageDiv\"><strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\"  data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+localStorage.seq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" /><p></div>"+
                      "<div class=\"span7\"><p id=\"imageSyncStatusPageDiv\"></p></div>"+
                      
                      "<div class=\"clearfix\"></div>"+
                      
                      "</div>"+
                      "<div class=\"clearfix\"></div>"+
                      "</div>";
                      
                      $("#firstSyncStatus").html(htmlToAppend);
                      $("#syncStatusOnSyncPage").html(htmlToAppendOnSyncPage);
                      
                      
                      }
//                      window.dbChanged()
                      })
    
    
    if(localStorage.seq){
//        alert("in local storage"+recordSyncCountInLocalDb+" catalog update seq -"+catalogUpdateSequence);
        var localdbUpdatedSequence = parseInt(config.info.committed_update_seq)
        console.log("localdbUpdatedSequence - "+localdbUpdatedSequence+" catalogUpdateSequence - "+catalogUpdateSequence);
//        var catalogUpdateSequence = parseInt(localStorage.catalogUpdateCount);
        if(localdbUpdatedSequence >= catalogUpdateSequence){
            $("#syncState").html("<strong>Alert! Catalog Sync Complete..</strong>");
            $("#syncStatusPageDiv").html("<strong>Alert! Catalog Sync Complete..</strong>");
            console.log("no of records in local db is greater than update sequence");
            if(localStorage.catalogIndexingComplete=="true"){
                //              catalogIndexing();
                console.log("catalog indexing don, now fires image db");
                $("#firstSyncStatus").html("");
//                $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: false, changeHash: false });
                changePage("dashboardwf");
            }
            else{
//                $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
                changePage("sync_page");
                catalogIndexing();
                
            }
        }
        else if(recordSyncCountInLocalDb >= recordCounts && localStorage.catalogIndexingComplete!="true"){
            $("#syncState").html("<strong>Alert! Updating documents...</strong>");
            $("#syncStatusPageDiv").html("<strong>Alert! Updating documents...</strong>");
//            $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
             changePage("sync_page");
        }
        else{
            if(localStorage.catalogIndexingComplete!="true"){
//            $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
             changePage("sync_page");
            }
            if(recordCounts){
            $("#syncState").html("<strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\"  data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+recordSyncCountInLocalDb+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
                
                $("#syncStatusPageDiv").html("<strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\"  data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+recordSyncCountInLocalDb+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
            }
            else{
                $("#syncState").html("<strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
                 $("#syncStatusPageDiv").html("<strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
            }
        }
    }
    else{
        if(localStorage.catalogIndexingComplete!="true")
//        $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
         changePage("sync_page");
        var infoUpdatedSeq = parseInt(config.info.update_seq);
        if(recordCounts){
        $("#syncState").html("<strong>Catalog Synching "+config.info.update_seq+" of "+recordCounts+" items.</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
            $("#syncStatusPageDiv").html("<strong>Catalog Synching "+config.info.update_seq+" of "+recordCounts+" items.</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
        }
        
        else{
            
            $("#syncState").html("<strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
            $("#syncStatusPageDiv").html("<strong>Catalog Synching</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a\" data-role=\"role\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
        }
        
    }
}

function appImgReady(){
    
    
    if(localStorage.imagesyncComplete =="true"){
         $("#firstSyncStatus").html("");
//          $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: false, changeHash: false });
         changePage("dashboardwf");
        return;
    }
    
    localStorage.imgseq = configImg.infoimages.committed_update_seq;
    
//    alert("images in local db - "+localStorage.imgseq+" total images -"+localStorage.imageCount);
//    
//    alert("image db -"+JSON.stringify(configImg.infoimages.doc_count));
    
    
//    alert(localStorage.imgseq);
    
    // **************** Image database Trigger *********** //
    if(localStorage.imgseq)
    {
        
        console.log("in if localstorage.img");
        
        var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
        var imageCounts =   parseInt(localStorage.imageCount);
        var imageUpdateSequence = parseInt(localStorage.imageUpdateCount);
        
          console.log("in if localstorage.img"+imageSyncCountInLocalDb+" imageCounts "+imageCounts+" imageUpdateSequence "+imageUpdateSequence );
        
        if(imageSyncCountInLocalDb>= imageUpdateSequence){
            $("#firstSyncStatus").html("");
            console.log("images in local is greater than upddate seq.");
//            $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: false, changeHash: false });
            changePage("dashboardwf");
            $("#imageSyncStatusPageDiv").html("<strong>Image Sync Complete!</strong>");
        }
        else if(imageSyncCountInLocalDb>=imageCounts){
            console.log("images in local is greater than image count");
//            $("#syncState").html("<strong>Image Sync Complete!</strong>");
            if(localStorage.imagesyncComplete !="true"){
                changePage("sync_page");
            }
//            $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
             $("#imageSyncStatusPageDiv").html("<strong>Updating documents..</strong>");
            
        }
        else{
            if(localStorage.imagesyncComplete !="true"){
                changePage("sync_page");
            }
//            $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
            
            console.log("in else changepage to synch");
             $("#syncState").html("<strong>Image Synching "+imageSyncCountInLocalDb+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c   \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+imageSyncCountInLocalDb+" data-highlight=\"true\" data-role=\"none\" name=\"slider-fill\" id=\"slider-fill\" />");
            $("#imageSyncStatusPageDiv").html("<strong>Image Synching "+imageSyncCountInLocalDb+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c   \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+imageSyncCountInLocalDb+" data-highlight=\"true\" data-role=\"none\" name=\"slider-fill\" id=\"slider-fill\" />");
//        $("#syncState").html("<strong>Alert! </strong>Total image sync - "+localStorage.imgseq);
        }
    }
    else
    {
        if(localStorage.imagesyncComplete !="true"){
            changePage("sync_page");
        }
//        $.mobile.changePage( $("#sync_page"), { transition: "slide", reverse: false, changeHash: false });
        
        var imageSyncCountInLocalDb = parseInt(configImg.infoimages.update_seq);
        var imageCounts =   parseInt(localStorage.imageCount);
         $("#syncState").html("<strong>Image Synching "+imageSyncCountInLocalDb+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c data-role=\"none\"  \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+imageSyncCountInLocalDb+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
          $("#imageSyncStatusPageDiv").html("<strong>Image Synching "+imageSyncCountInLocalDb+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c data-role=\"none\"  \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+imageSyncCountInLocalDb+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
//        $("#syncState").html("<strong>Alert! </strong>Total image sync - "+configImg.infoimages.update_seq);
    }
    configImg.dbimages.changes({since : configImg.infoimages.update_seq}, function(_, ch){
                               
                               
                               console.log("in congidImg changes - ");
                               
                               var imageSyncCountInLocalDb = parseInt(ch.seq);
                               var imageCounts =   parseInt(localStorage.imageCount);
                               var imageUpdateSequence = parseInt(localStorage.imageUpdateCount);
                               var localStorageImageCount = parseInt(localStorage.imgseq);
                               
                               
                               console.log("in congidImg changes - imageSyncCountInLocalDb "+imageSyncCountInLocalDb+" imageCounts "+imageCounts+" imageUpdateSequence "+imageUpdateSequence+" localStorageImageCount "+localStorageImageCount);
                               
                               if(localStorageImageCount<imageSyncCountInLocalDb)
                               localStorage.imgseq = ch.seq;
                               
                               if(imageSyncCountInLocalDb>=imageUpdateSequence){
                               localStorage.imagesyncComplete = "true";
                               afterCounts();
//                                    $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: false, changeHash: false });
                               changePage("#dashboardwf");
                                    $("#firstSyncStatus").html("");
                               }
                               else if(imageSyncCountInLocalDb>=imageCounts){
                               console.log("image in local is greater than image count");
                               var imgUpdateNo = imageSyncCountInLocalDb - imageCounts;
                               var htmlToAppendOnSyncPage = "<div  class=\"hero-unit\" >"+
                               "<div class=\"hero_inner_box\">"+
                               "<div class=\"span7\"><p id=\"syncStatusPageDiv\">Catalog Sync Complete..<p></div>"+
                               "<div class=\"span7\"><p id=\"imageSyncStatusPageDiv\"><strong>Updating documents..."+imgUpdateNo+"</strong></p></div>"+
                               
                               "<div class=\"clearfix\"></div>"+
                               
                               "</div>"+
                               "<div class=\"clearfix\"></div>"+
                               "</div>";
                               
                               $("#syncStatusOnSyncPage").html(htmlToAppendOnSyncPage);
                               
                               }
                               else{
                               
                               var htmlToAppend = "<div  class=\"hero-unit\" >"+
                               "<div class=\"hero_inner_box\">"+
                               "<div class=\"span7\"><p id=\"syncState\"><strong>Image Synching "+localStorageImageCount+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c   \" data-role=\"none\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+localStorageImageCount+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" /><p></div>"+
                               "<div onclick=\"deleteHeroUnit('#firstSyncStatus');\" class=\"span1 pull-right\"><img src=\"img/button.png\" width=\"37\" height=\"24\"> </div>"+
                               "<div class=\"span7\"><p id=\"imageSyncState\"></p></div>"+
                               
                               "<div class=\"clearfix\"></div>"+
                               
                               "</div>"+
                               "<div class=\"clearfix\"></div>"+
                               "</div>";
                               
                               var htmlToAppendOnSyncPage = "<div  class=\"hero-unit\" >"+
                               "<div class=\"hero_inner_box\">"+
                               "<div class=\"span7\"><p id=\"syncStatusPageDiv\">Catalog Sync Complete..<p></div>"+
                               "<div class=\"span7\"><p id=\"imageSyncStatusPageDiv\"><strong>Image Synching "+localStorageImageCount+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c   \" data-role=\"none\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+localStorageImageCount+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" /></p></div>"+
                               
                               "<div class=\"clearfix\"></div>"+
                               
                               "</div>"+
                               "<div class=\"clearfix\"></div>"+
                               "</div>";
                               
                               
                               $("#firstSyncStatus").html(htmlToAppend);
                               $("#syncStatusOnSyncPage").html(htmlToAppendOnSyncPage);
                               
                               
//                                $("#syncState").html("<strong>Image Synching "+imageSyncCountInLocalDb+" of "+imageCounts+" items.</strong><input disabled=\"true\" id=\"seekBarImg\" data-theme=\"c   \" data-role=\"none\" type=\"range\" style=\"width:600px;\" min=\"0\" max="+imageCounts+" value="+imageSyncCountInLocalDb+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
                               
//                               $("#syncState").html("<strong>Alert! </strong>Total Image records sync - "+ch.seq);
                               }
                               //                               window.dbChanged()
                               })
    
    if(localStorage.imagesyncComplete !="true") {
        console.log("image sync trigger fire....");
    triggerImageSync(function(err) {
                     if (err) {
                     console.log("error on sync", JSON.stringify(err))
                     }
                     });
    
    }
    
    // **************** Image database Trigger *********** //

}







var baseCategories = null;
function appReady() {
    
//    alert("app ready");
    
    // **************** Customer database Trigger *********** //
     var customerSyncCountInLocalDb = parseInt(localStorage.customerseq);
    
    if(localStorage.customerseq){
     if(customerSyncCountInLocalDb >= 111)
        $("#imageSyncState").html("<strong>Alert! Customer Record Sync Complete!</strong>");
        else
        $("#imageSyncState").html("<strong>Alert! </strong>Total customer records sync - "+localStorage.customerseq);
    }
    else
        $("#imageSyncState").html("<strong>Alert! </strong>Total customer records sync - "+configCustomer.info.update_seq);
    
    configCustomer.db.changes({since : configCustomer.info.update_seq}, function(_, ch){
                              
                              localStorage.customerseq=ch.seq;
                              var currentCustomerCounts = parseInt(localStorage.customerseq);
                              if (currentCustomerCounts >= 111) {
                              $("#imageSyncState").html("<strong>Customer Record Sync Complete!</strong>");
                                   
                              }
                              else{
                              $("#imageSyncState").html("<strong>Alert! </strong>Total Customer records sync - "+ch.seq);
                             
                              }
                              //                               window.dbChanged()
                              })
    
    triggerCustomerSync(function(err) {
                        if (err) {
                        console.log("error on sync", JSON.stringify(err))
                        }
                        });
    
     // **************** Customer database Trigger *********** //
    
    // **************** Catalog database Trigger *********** //
    
    console.log("in app ready catalog info - "+JSON.stringify(config.info));
    $("#content").html();
    var recordSyncCountInLocalDb = parseInt(localStorage.seq);
    var recordCounts = parseInt(localStorage.catalogCount);
    var lastSeq;
    config.db.changes({since : config.info.update_seq}, function(_, ch){
                      
                     if(ch.seq==1)
                      localStorage.catalogIndexingComplete = false;
                      
                     
                      
                       console.log("in app ready catalog info under change - "+config.info.doc_count);
                                           
        if (ch.seq >= recordCounts) {
                      $("#syncState").html("<strong>Alert! Catalog Sync Complete..</strong>");
                      catalogIndexing();
                      
                      }
        lastSeq = ch.seq
        console.log("change"+JSON.stringify(ch))
                      localStorage.seq=ch.seq;
                      var sequence = parseInt(localStorage.seq);
                       $("#syncState").html("<strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input disabled=\"true\" id=\"seekBar\" data-theme=\"c   \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+sequence+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
                      
//        window.dbChanged();
    })
    console.log("in app ready 2");
    
    if(localStorage.seq){
        if(recordSyncCountInLocalDb >= recordCounts){
        $("#syncState").html("<strong>Alert! Catalog Sync Complete..</strong>");
            if(localStorage.catalogIndexingComplete=="true"){
                $("#firstSyncStatus").html("");
//            $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: false, changeHash: false });
                changePage("#dashboardwf");
            }
            else
                catalogIndexing();
        }
        else{
            $("#syncState").html("<strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a   \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+recordSyncCountInLocalDb+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
        }
    }
        else{
            var infoUpdatedSeq = parseInt(config.info.update_seq);
            $("#syncState").html("<strong>Catalog Synching "+localStorage.seq+" of "+recordCounts+" items.</strong><input id=\"seekBar\" disabled=\"true\" data-theme=\"a   \" type=\"range\" style=\"width:600px;\" min=\"0\" max="+recordCounts+" value="+infoUpdatedSeq+" data-highlight=\"true\" name=\"slider-fill\" id=\"slider-fill\" />");
        }
    
    loadingWithMsg("hide","");
    if (config.user) {
        triggerSync(function(err) {
            if (err) {
                console.log("error on sync", JSON.stringify(err))
            }
        })
    }
    
}


function setupImageDbTrigger(){
   
//    loadingWithMsg("show","Setting up local database...");
    
    var newDate = new Date();
    console.log("Time before img setup config: " + newDate.getMinutes()+ ":"+ newDate.getSeconds() );

    setupImageDb(function(){
                 console.log("setupImg");
                 
                 var newDate1 = new Date();
                 console.log("Time before appImgReady: " + newDate1.getMinutes()+ ":"+ newDate1.getSeconds());
                 
                 
                 appImgReady();
              
                 var newDate2 = new Date();
                 console.log("Time after appImgReady: " + newDate2.getMinutes()+ ":"+ newDate2.getSeconds());
                 
                 loadingWithMsg("hide","");
                 
                 });
    
   
    
    

}


function setupCustomerDbTrigger(){
        setupCustomerDb(function(){
    
                        connectToChangesCustomer();
    
                        triggerCustomerSync(function(err) {
                                            if (err) {
                                            console.log("error on sync", JSON.stringify(err))
                                            }
                                            });
    
                        loadingWithMsg("hide","");
                        });

}

//var mapFunction = function(doc) {
//    if (doc.type=="category") {
//        emit(doc.cat_parents,doc);
//    }
//};

function moveToDashboard(){
    
    getrecordcount();
}


function changePage(page){
    console.log("changePage called - "+page);
     $.mobile.changePage( $("#"+page), { transition: "slide", reverse: false, changeHash: false });
}

function moveToPage(page){
    $.mobile.changePage( $("#"+page), { transition: "slide", reverse: false, changeHash: false });
    $("#"+page).trigger( "pagecreate" );
}
function moveBackToPage(page){
    $.mobile.changePage( $("#"+page), { transition: "slide", reverse: true, changeHash: false });
}



function loadingWithMsg(showOrHide,msg) {
    if(showOrHide=="show"){
//        setTimeout(function(){
                   $.mobile.loading( showOrHide, {
                                    text: msg,
                                    textVisible: true,
                                    theme: 'a',
                                    html: ""
                                    });
//                   },1);
        console.log("*****show");
    }
    else{
        setTimeout(function(){
                   $.mobile.loading( showOrHide, {
                                    text: msg,
                                    textVisible: true,
                                    theme: 'a',
                                    html: ""
                                    });
                   },1000);
        console.log("******hide");
    }
}

function loading(showOrHide) {
    setTimeout(function(){
//               $.mobile.loading(showOrHide);
               $.mobile.loading( showOrHide, {
                                text: 'Please Wait..',
                                textVisible: true,
                                theme: 'a',
                                html: ""
                                });
               }, 200);
}









function showCustomAlert(msg)
{
    
    navigator.notification.alert(
                                 msg,  // message
                                 null,         // callback
                                 'Winzer Alert!',            // title
                                 'Ok'                  // buttonName
                                 );
}

function getFastEntry(){
    $('.popupT').bind('change', function() {
                                  $(this).val() // get the current value of the input field.
                                  getFastEntryWith($(this));
                                  });
}

function getFastEntryWith(textInput){
    
    var partNo = textInput.val()
    
    config.views(["getProductForFilterWithNumber",{key:partNo}], function(err, view) {
                 if(!err){
                 
                 if(view.rows.length==0){
                 textInput.val("");
                 textInput.attr("placeholder","No Product Found");
                 
                 }
                 
                 }
                 });
}

function showPartPrefix(){
    
    $("#mainHeadCatalog").html("Catalog: Part Prefix");
  
    
//    var element = document.getElementById("liPartPrefix");
//    element.className += "active";
    document.getElementById("liProductcatalog").className = "";
     document.getElementById("liQuickSearch").className = "";
     document.getElementById("liPartPrefix").className = "active";
    
     $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
    
    var baseCateghtml =  "<input type=\"text\" pattern=\"[0-9]*\" placeholder=\"Search By Part Number\" name=\"search-mini\" data-inline=\"true\" id=\"search-part-prefix\" value=\"\" data-mini=\"true\" />"+
    "<img onclick=\"getPartPrefixWithNumberWithoutFilters();\" style=\"height: 30px; margin-bottom: 10px; margin-left: 5px;\" src='img/search-button.png'/>";
    
    
    
    $("#bradcrumMain").html(baseCateghtml);
    
    var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"wrapper\"><div id=\"scroller\"><div style=\"width:90%;padding:20px;\">";
    
    
    quickSrchhtml += "</div></div></div></div></div><div class=\"clearfix\"></div>";
    
    
    $("#baseCategwf").html(quickSrchhtml);
    $("#baseCategwf").trigger('create');
    
    $('#search-part-prefix').bind('input', function() {
                           var srchTxt = $(this).val() // get the current value of the input field.
                                  
                           });
    
    $("#search-part-prefix").on("keypress", function(event){
                         if (event.keyCode === 13) {
                         $("#search-part-prefix").blur();
                            getPartPrefixWithNumberWithoutFilters();
                         }
                         });
    
    getPartPrefixWithNumberWithoutFilters("000");
    
}

function getPartPrefixWithNumberBack(number){
    var baseCateghtml =  "<input type=\"search\" placeholder=\"Search By Part Number\" name=\"search-mini\" data-inline=\"true\" id=\"search-part-prefix\" value=\""+number+"\" data-mini=\"true\" />";
    
    
    $("#bradcrumMain").html(baseCateghtml);
    
    
    $('#search-part-prefix').bind('change', function() {
                                  $(this).val() // get the current value of the input field.
//                                  getPartPrefixWithNumber($(this).val());
                                  });
    
    
    
//    getPartPrefixWithNumber(number);
   
}




function getPartPrefixWithNumberWithoutFilters(number){
    $("#mainHeadCatalog").html("Catalog: Part Prefix");
    
    if(number!="000")
        var number = $("#search-part-prefix").val();
    
    
    if(number.length<3){
        $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Search key must be 3 characters in length...</h5></div></div>");
        $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
        return;
    }
    
    var startK = number;
    var endK = number+"\u9999";

     var itemCount = 0;
    
    $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Loading...</h5></div></div>");
    
    var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"wrapper\"><div id=\"scroller\">";
    
    
    config.views(["getProductForFilterWithNumber",{startkey:startK, limit:100}], function(err, view)
                 {
                 
                 
                 if(!err){
                 
                 
                 if(view.rows.length==0)
                 {
                 $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>No item found. Please change your search and try again.</h5></div></div>");
                 return;
                 }
                 
                 var lastRecordProdNo = "";
                 
                 var firstRecordProdNo = "";
                 
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
                 "<div class=\"some-content-related-div\">"+
                 "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 39%;\">Description</th>"+
                 "            <th style=\"width: 16%;\">Part No.</th>"+
                 "            <th style=\"width: 16%;\">Price</th>"+
                 "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
                 "            <td id=\"itemCountForPartPrefix\" style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "        </tr>"+
                 "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
                 "<div id=\"partPrefixList\" >";
                 
                 for(index in view.rows){
                 
                 if(index==0)
                 firstRecordProdNo = view.rows[index].value.pno;
                 
                 
                 itemCount++;
                 baseCateghtml += "<tr>"+
                 "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.title+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.pno+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.package_qty+"</td>"+
                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                 "<div class=\"span7\">"+
                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                 "</div>"+
                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                 "</div>"+
                 "</td>"+
                 "</tr>";
                 
                 if(index==(view.rows.length-1))
                 lastRecordProdNo = view.rows[index].value.pno;
                 
                 }// end of for loop view.row
                 
                 
                 baseCateghtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
                 
                 
                 resetAccordion();
                 $("#baseCategwf").html(baseCateghtml);
                 $("#itemCountForPartPrefix").html("<font size=\"1\">"+itemCount+" Items</font>");
                 $("#baseCategwf").trigger('create');
                 
                 
                 
                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });

                 myScroll.on('scrollEnd', function(){
                             console.log("info -"+this.y);
                             var clientHeight = document.getElementById('table_body').clientHeight;
                             console.log("table body - "+clientHeight);
                             var finalDiff = clientHeight+this.y;
                             console.log("final diff - "+finalDiff);
                             resetAccordion();
                             
                             
                             var isProductLoading = false;
                             
                             if(this.y==0 && !isProductLoading){
                             isProductLoading = true;
                             console.log("top");
                             loadingWithMsg('show','Loading products..');
                             
                             
                             if(isProductLoading)
                             config.views(["getProductForFilterWithNumber",{startkey:firstRecordProdNo, descending:true, limit:101}], function(err, view){

                                          if(err){
                                          showCustomAlert("Unable to retrieve products, please try again...");
                                          isProductLoading = false;
                                          return;
                                          }
                                          
                                          
                                          var htmlToPrepend ="";
                                          
                                          var tempArry = [];
                                          
                                          for(index in view.rows){
                                          if(index!=0)
                                          tempArry.push(view.rows[index]);
                                          }
                                          
                                          var reverseArry = tempArry.reverse();
                                          
                                          console.log("success view---");
                                          
//                                          for(index in view.rows){
//                                          
//                                          itemCount++;
//                                          console.log("view.rows[index].value.title - "+view.rows[index].value.title);
//                                          if(index!=0)
//                                          htmlToPrepend += "<tr>"+
//                                          "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.title+"</td>"+
//                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.pno+"</td>"+
//                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
//                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.package_qty+"</td>"+
//                                          "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
//                                          "<div class=\"span7\">"+
//                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
//                                          "</div>"+
//                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
//                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
//                                          "</div>"+
//                                          "</td>"
//                                          "</tr>";
//                                          
//                                          if(index==0){
//                                          firstRecordProdNo = reverseArry[index].value.pno
//                                          alert(firstRecordProdNo);
//                                          
//                                          }
//                                          }
                                          
                                          
                                          for(index in reverseArry){
                                          
                                          itemCount++;
                                          console.log("view.rows[index].value.title - "+reverseArry[index].value.title);
                                          if(index!=0)
                                          htmlToPrepend += "<tr>"+
                                          "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+reverseArry[index].id+"','"+number+"');\">"+reverseArry[index].value.title+"</td>"+
                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+reverseArry[index].id+"','"+number+"');\">"+reverseArry[index].value.pno+"</td>"+
                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+reverseArry[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+reverseArry[index].id+"','"+number+"');\">"+reverseArry[index].value.package_qty+"</td>"+
                                          "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                                          "<div class=\"span7\">"+
                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                          "</div>"+
                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                          "</div>"+
                                          "</td>"
                                          "</tr>";
                                          
                                          if(index==0){
                                          firstRecordProdNo = reverseArry[index].value.pno
                                          
                                          }
                                          }
                                          
                                          console.log("list set now hiding loader...");
                                          
                                          loadingWithMsg('hide','');
                                          $("#table_body").prepend(htmlToPrepend);
                                          $("#itemCountForPartPrefix").html("<font size=\"1\">"+itemCount+" Items</font>");
                                          $("#baseCategwf").trigger('create');
                                          isProductLoading = false;
                                          myScroll.refresh();
                                          
                                          
                                          
                                          
                                          
                                          });
                             }// if scrolls to the top
                             else if(finalDiff==420 && !isProductLoading){
                             console.log("bottom");
                             isProductLoading = true;
                             console.log("bottom");
                             
                             loadingWithMsg('show','Loading products..');
                             if(isProductLoading)
                             config.views(["getProductForFilterWithNumber",{startkey:lastRecordProdNo, limit:100}], function(err, view){
                                          
                                          
                                          if(err){
                                          showCustomAlert("Unable to retrieve products, please try again...");
                                          isProductLoading = false;
                                          return;
                                          }
                                          
                                          var htmlToAppend ="";
                                          for(index in view.rows){

                                          itemCount++;
                                          
                                          htmlToAppend += "<tr>"+
                                          "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.title+"</td>"+
                                          "<td style=\"width: 16%;\"  onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.pno+"</td>"+
                                          "<td style=\"width: 16%;\"  onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td style=\"width: 16%;\"  onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.package_qty+"</td>"+
                                          "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                                          "<div class=\"span7\">"+
                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                          "</div>"+
                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                          "</div>"+
                                          "</td>"
                                          "</tr>";
                                          
                                          
                                          if(index==(view.rows.length-1))
                                          lastRecordProdNo = view.rows[index].value.pno
                                          }
                                          
                                          loadingWithMsg('hide','');
                                          $("#table_body").append(htmlToAppend);
                                          $("#itemCountForPartPrefix").html("<font size=\"1\">"+itemCount+" Items</font>");
                                          $("#baseCategwf").trigger('create');
                                          isProductLoading = false;
                                          myScroll.refresh();
                                          
                                          
                                          
                                          });// config.views end for the bottom event
                             
                             } // else scrolls to the bottom.
                             
                             
                             
                             });// scrollEnd
                 
                 
                 }// end of if(!err)
                 });// end of config.views
    
    
}


function getPartPrefixWithNumber(number){
    
    
    $("#mainHeadCatalog").html("Catalog: Part Prefix");
    
    if(number!="000")
    var number = $("#search-part-prefix").val();
    
    
    if(number.length<3){
        $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Search key must be 3 characters in length...</h5></div></div>");
        $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
        return;
    }
    
    lastSearchedNumberForPartPrefix = number;
     lastActionOnPartPrefix("none",number);
    
    var startK = number;
    var endK = number+"\u9999";
    
     arrayOfProducts=new Array();
     arrayOfHoldingArrays=[];
    
    var itemCount = 0;
    
    $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
    
    
    $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Loading...</h5></div></div>");
    
    var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"wrapper\"><div id=\"scroller\">";
    
    
    alert(startK);
    
    config.views(["getProductForFilterWithNumber",{startkey:startK, limit:100}], function(err, view)
                 {
                 
                 
                 if(!err){
                 
                 
                 
                 console.log("******* - "+JSON.stringify(view));
                 
                 alert("done");
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
                 "<div class=\"some-content-related-div\">"+
                 "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 39%;\">Description</th>"+
                 "            <th style=\"width: 16%;\">Part No.</th>"+
                 "            <th style=\"width: 16%;\">Price</th>"+
                 "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
                 "            <td id=\"itemCountForPartPrefix\" style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "        </tr>"+
                 "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
                 "<div id=\"partPrefixList\" >";
                 
                 
//                 baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
//                 "     <thead>"+
//                 "        <tr>"+
//                 "            <th style=\"width: 39%;\">Description</th>"+
//                 "            <th style=\"width: 16%;\">Part No.</th>"+
//                 "            <th style=\"width: 16%;\">Price</th>"+
//                 "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
//                 "            <th style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>"+
//                 "        </tr>"+
//                 "</thead></table><div id=\"inner-content-div\"><table class=\"table\"><tbody id=\"table_body\">";
                 
                 if(view.rows.length==0)
                 {
                     $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>No item found. Please change your search and try again.</h5></div></div>");
                 return;
                 }
                 
                 
//                 baseCateghtml += "<div  align=\"center\" data-theme=\"a\" class=\"ui-grid-d\"><div class=\"ui-block-a\"><strong>Product Name</strong></div>"+
//                 "<div class=\"ui-block-b\"><strong>Part No.</strong></div>"+
//                 "<div class=\"ui-block-c\"><strong>Price</strong></div>"+
//                 "<div class=\"ui-block-d\"><strong>Pkg Qty.</strong></div><div class=\"ui-block-e\"></div></div><hr/>";
                 
                 var lastRecordProdNo = "";
                 
                 var firstRecordProdNo = "";
                 
                 
                 for(index in view.rows){
                
                 if(index==0)
                 firstRecordProdNo = view.rows[index].value.pno;
                 
//                 baseCateghtml += "<hr style=\"margin:2px 0px;\"><div onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\" align=\"center\" data-theme=\"a\" class=\"ui-grid-d\"><div class=\"ui-block-a\">"+view.rows[index].value.title+"</div>"+
//                 "<div class=\"ui-block-b\">"+view.rows[index].value.pno+"</div>"+
//                 "<div class=\"ui-block-c\">"+view.rows[index].value.price+"</div>"+
//                 "<div class=\"ui-block-d\">"+view.rows[index].value.pkgq+"</div>"+
//                 "<div class=\"ui-block-e\"><div class=\"span7\"><input style=\"width:41px;\" type=\"number\" placeholder=\"qty.\" /></div>"+
//                 "<div class=\"span4\" style=\"margin-top:12px;\"><img src=\"img/add_button.jpg\" width=\"30px\" height=\"30px\"></div></div></div>";
 
                 
                 
                 
                 
                 
                 
                 
                 
//                 console.log("000 "+JSON.stringify(view.rows[index].value.specs));
              
                 for(index_key in view.rows[index].value.specs){
                 
                 console.log("111 "+JSON.stringify(view.rows[index].value.specs));
                 
                 var t=0;
                 for(;t<arrayOfProducts.length;t++){
                        if(arrayOfProducts[t] == index_key){
                            break;
                        }
                    }
                    if(t == arrayOfProducts.length){
                 
                        arrayOfProducts.push(index_key);
                        var temp_1 = parseInt(arrayOfProducts.length)-1;
                        arrayOfHoldingArrays[temp_1]=new Array();
               
                    }
                 var product_index= arrayOfProducts.indexOf(index_key);
               
//                   alert(arrayOfHoldingArrays.length+" / "+arrayOfHoldingArrays[product_index].length+" * "+product_index+" / "+index_key+" / "+view.rows[index].value.specs[index_key]);
               
//                 console.log(arrayOfHoldingArrays.length+" / "+arrayOfHoldingArrays[product_index].length+" * "+product_index+" / "+index_key+" / "+view.rows[index].value.specs[index_key]);
                 
                 var q=0;
                 for(;q<arrayOfHoldingArrays[product_index].length;q++){
                 if(arrayOfHoldingArrays[product_index][q] == view.rows[index].value.specs[index_key]){
                 break;
                 }
                 }
                 if(q == arrayOfHoldingArrays[product_index].length){
                    arrayOfHoldingArrays[product_index].push(view.rows[index].value.specs[index_key]);
                 }
                 
                 }
                 
                 
               
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index)+1;
                
                 if(view.rows.length == temp_2){
                 
                 
                 var temp_html;
                 var html_hoalder_Array =new Array();
                 
                 
                 
                 
                 
                 for(index1 in arrayOfProducts){
                 
                 
                 
                 globalAttributArray[index1] = new Array();
                 
                 temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                 temp_html += "<h3><strong>"+arrayOfProducts[index1]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                 "<fieldset data-role=\"controlgroup\">";
                 arrayOfHoldingArrays[index1].sort();
                 for(var attIndex in arrayOfHoldingArrays[index1]){
                 //                 console.log("value for the - "+ arrayOfHoldingArrays[index1][attIndex]);
                 
                 temp_html += "<input onclick=\"filterMultipleProductsForPartPrefix("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
                 "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\">"+arrayOfHoldingArrays[index1][attIndex]+"</label>";
                 
                 
                 //                 attributeKeyHtml += "<input type=\"radio\" name=\"radio-\" name=\"checkbox-\" id=\"checkbox-\" class=\"custom\" />"+
                 //                 "<label style=\"width: 120%;\" for=\"checkbox-\">helllo</label>";
                 
                 }
                 
                 temp_html += "</fieldset></div></div>";
                 
                 html_hoalder_Array.push(temp_html);
                 
                 }
                 
                 
                 
                 
                 var temp_arrayOfProducts_Array =new Array();
                 for(var ww=0;ww<arrayOfProducts.length;ww++){
                 temp_arrayOfProducts_Array[ww] =arrayOfProducts[ww];
                 
                 }
                 
                 
                 
                 
                 for(var i=0;i<(temp_arrayOfProducts_Array.length-1);i++)
                 {
                 
                 for(var j=i+1;j<temp_arrayOfProducts_Array.length;j++)
                 {
                 
                 if(temp_arrayOfProducts_Array[i]>temp_arrayOfProducts_Array[j]){
                 
                 
                 var temp0 = temp_arrayOfProducts_Array[i];
                 temp_arrayOfProducts_Array[i] = temp_arrayOfProducts_Array[j];
                 temp_arrayOfProducts_Array[j] = temp0;
                 
                 
                 var temp1 = html_hoalder_Array[i];
                 html_hoalder_Array[i] = html_hoalder_Array[j];
                 html_hoalder_Array[j] = temp1;
                 
                 }
                 
                 
                 }
                 }
                 
                 
                 
                 for(var ww=0;ww<html_hoalder_Array.length;ww++){
                 attributeKeyHtml += html_hoalder_Array[ww];
                 
                 }
                 
                 attributeKeyHtml += "</div>";
                 
                 console.log("filter options set");
                 
                 $("#filter_options_ul").html(attributeKeyHtml);
                 
                 filterOptionsHtml = attributeKeyHtml;
                 
                 $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                 
                 
//                "<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                 
                 $("#filter_options_ul").trigger( "create" );
                 
                 }
                 
                 
                 itemCount++;
                 baseCateghtml += "<tr>"+
                 "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.title+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.pno+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.package_qty+"</td>"+
                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                 "<div class=\"span7\">"+
                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                 "</div>"+
                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                 "</div>"+
                 "</td>"+
                 "</tr>";
                 
                 
                 if(index==(view.rows.length-1))
                 lastRecordProdNo = view.rows[index].value.pno;
                 }
                 
                 
                 
                 
                 baseCateghtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
                 
                 
                     resetAccordion();
                 $("#baseCategwf").html(baseCateghtml);
                 $("#itemCountForPartPrefix").html("<font size=\"1\">"+itemCount+" Items</font>");
                 $("#baseCategwf").trigger('create');
                 
                
                 
                var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });
                 
                 
                 
                 
                 myScroll.on('scrollEnd', function(){
                             console.log("info -"+this.y);
                             var clientHeight = document.getElementById('table_body').clientHeight;
                             console.log("table body - "+clientHeight);
                             var finalDiff = clientHeight+this.y;
                             console.log("final diff - "+finalDiff);
                             resetAccordion();
                             
                             
                             var isProductLoading = false;
                             
                             if(this.y==0 && !isProductLoading){
                             isProductLoading = true;
                             console.log("top");
                             lastActionOnPartPrefix("top",firstRecordProdNo);
                             arrayOfProducts=new Array();
                             arrayOfHoldingArrays=[];
                             
                             
                             loadingWithMsg('show','Loading products..');
                             if(isProductLoading)
                             config.views(["getProductForFilterWithNumber",{startkey:firstRecordProdNo, descending:true, limit:101}], function(err, view){
                                          
                                          
                                          if(err){
                                          showCustomAlert("Unable to retrieve products, please try again...");
                                          isProductLoading = false;
                                          return;
                                          }
                                          
                                          
                                          var htmlToPrepend ="";
                                          
                                          var tempArry = [];
                                          
                                          for(index in view.rows){
                                          if(index!=0)
                                          tempArry.push(view.rows[index]);
                                          }
                                          
                                          var reverseArry = tempArry.reverse();
                                          
                                          
                                          for(index in reverseArry){
                                          
                                          
                                          
                                          
                                          for(index_key in view.rows[index].value.specs){
                                          
                                          console.log("111 "+JSON.stringify(view.rows[index].value.specs));
                                          
                                          var t=0;
                                          for(;t<arrayOfProducts.length;t++){
                                          if(arrayOfProducts[t] == index_key){
                                          break;
                                          }
                                          }
                                          if(t == arrayOfProducts.length){
                                          
                                          arrayOfProducts.push(index_key);
                                          var temp_1 = parseInt(arrayOfProducts.length)-1;
                                          arrayOfHoldingArrays[temp_1]=new Array();
                                          
                                          }
                                          var product_index= arrayOfProducts.indexOf(index_key);
                                          
                                          //                   alert(arrayOfHoldingArrays.length+" / "+arrayOfHoldingArrays[product_index].length+" * "+product_index+" / "+index_key+" / "+view.rows[index].value.specs[index_key]);
                                          
                                          //                 console.log(arrayOfHoldingArrays.length+" / "+arrayOfHoldingArrays[product_index].length+" * "+product_index+" / "+index_key+" / "+view.rows[index].value.specs[index_key]);
                                          
                                          var q=0;
                                          for(;q<arrayOfHoldingArrays[product_index].length;q++){
                                          if(arrayOfHoldingArrays[product_index][q] == view.rows[index].value.specs[index_key]){
                                          break;
                                          }
                                          }
                                          if(q == arrayOfHoldingArrays[product_index].length){
                                          arrayOfHoldingArrays[product_index].push(view.rows[index].value.specs[index_key]);
                                          }
                                          
                                          }
                                          
                                          
                                          
                                          var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                                          var temp_2 = parseInt(index)+1;
                                          
                                          if(reverseArry == temp_2){
                                          
                                          
                                          var temp_html;
                                          var html_hoalder_Array =new Array();
                                          
                                          
                                          for(index1 in arrayOfProducts){
                                          
                                          
                                          globalAttributArray[index1] = new Array();
                                          
                                          
                                          
                                          for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                                          console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                                          if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[index1]){
                                          globalAttributArray[index1].push(lastGlobalAttrArray[temp]);
                                          
                                          }
                                          }
                                          

                                          
                                          
                                          temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                                          temp_html += "<h3><strong>"+arrayOfProducts[index1]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                                          "<fieldset data-role=\"controlgroup\">";
                                          arrayOfHoldingArrays[index1].sort();
                                          for(var attIndex in arrayOfHoldingArrays[index1]){
                                          //                 console.log("value for the - "+ arrayOfHoldingArrays[index1][attIndex]);
                                          
                                          temp_html += "<input onclick=\"filterMultipleProductsForPartPrefix("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
                                          "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\">"+arrayOfHoldingArrays[index1][attIndex]+"</label>";
                                          
                                          }
                                          
                                          temp_html += "</fieldset></div></div>";
                                          
                                          html_hoalder_Array.push(temp_html);
                                          
                                          
                                          }
                                         
                                          
                                          
                                          var temp_arrayOfProducts_Array =new Array();
                                          for(var ww=0;ww<arrayOfProducts.length;ww++){
                                          temp_arrayOfProducts_Array[ww] =arrayOfProducts[ww];
                                          
                                          }
                                          
                                          
                                          
                                          
                                          for(var i=0;i<(temp_arrayOfProducts_Array.length-1);i++)
                                          {
                                          
                                          for(var j=i+1;j<temp_arrayOfProducts_Array.length;j++)
                                          {
                                          
                                          if(temp_arrayOfProducts_Array[i]>temp_arrayOfProducts_Array[j]){
                                          
                                          
                                          var temp0 = temp_arrayOfProducts_Array[i];
                                          temp_arrayOfProducts_Array[i] = temp_arrayOfProducts_Array[j];
                                          temp_arrayOfProducts_Array[j] = temp0;
                                          
                                          
                                          var temp1 = html_hoalder_Array[i];
                                          html_hoalder_Array[i] = html_hoalder_Array[j];
                                          html_hoalder_Array[j] = temp1;
                                          
                                          }
                                          
                                          
                                          }
                                          }
                                          
                                          
                                          
                                          for(var ww=0;ww<html_hoalder_Array.length;ww++){
                                          attributeKeyHtml += html_hoalder_Array[ww];
                                          
                                          }
                                          
                                          attributeKeyHtml += "</div>";
                                          
                                          
                                          console.log("filter options set");
                                          
                                          $("#filter_options_ul").html(attributeKeyHtml);
                                          
                                          filterOptionsHtml = attributeKeyHtml;
                                          
                                          $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                                          
//                                                                            "<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                                          
                                          $("#filter_options_ul").trigger( "create" );
                                          
                                          }
                                          
                                          
                                          
                                          
                                          
                                          
                                          itemCount++;
                                          console.log("view.rows[index].value.title - "+view.rows[index].value.title);
                                          if(index!=0)
                                          htmlToPrepend += "<tr>"+
                                          "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.title+"</td>"+
                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.pno+"</td>"+
                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.package_qty+"</td>"+
                                          "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                                          "<div class=\"span7\">"+
                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                          "</div>"+
                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                          "</div>"+
                                          "</td>"
                                          "</tr>";
                                          
                                          if(index==0)
                                          firstRecordProdNo = reverseArry[index].value.pno
                                          }
                                          
                                          loadingWithMsg('hide','');
                                          $("#table_body").prepend(htmlToPrepend);
                                          $("#itemCountForPartPrefix").html("<font size=\"1\">"+itemCount+" Items</font>");
                                          $("#baseCategwf").trigger('create');
                                          isProductLoading = false;
                                          myScroll.refresh();
                                          
                                          }
                                          
                                          );

                             
                             }
                             else if(finalDiff==420 && !isProductLoading){
                                    console.log("bottom");
                             isProductLoading = true;
                             console.log("bottom");
                             
                             arrayOfProducts=new Array();
                             arrayOfHoldingArrays=[];
                             
                             loadingWithMsg('show','Loading products..');
                             lastActionOnPartPrefix("bottom",lastRecordProdNo);
                             if(isProductLoading)
                             config.views(["getProductForFilterWithNumber",{startkey:lastRecordProdNo, limit:100}], function(err, view){
                                          
                                          if(err){
                                          showCustomAlert("Unable to retrieve products, please try again...");
                                          isProductLoading = false;
                                          return;
                                          }
                                          
                                          var htmlToAppend ="";
                                          for(index in view.rows){
                                          
                                          
                                         
                                          //  console.log("000 "+JSON.stringify(view.rows[index].value.specs));
                                          
                                          for(index_key in view.rows[index].value.specs){
                                          
                                          console.log("111 "+JSON.stringify(view.rows[index].value.specs));
                                          
                                          var t=0;
                                          for(;t<arrayOfProducts.length;t++){
                                          if(arrayOfProducts[t] == index_key){
                                          break;
                                          }
                                          }
                                          if(t == arrayOfProducts.length){
                                          
                                          arrayOfProducts.push(index_key);
                                          var temp_1 = parseInt(arrayOfProducts.length)-1;
                                          arrayOfHoldingArrays[temp_1]=new Array();
                                          
                                          }
                                          var product_index= arrayOfProducts.indexOf(index_key);
                                          
                                          //                   alert(arrayOfHoldingArrays.length+" / "+arrayOfHoldingArrays[product_index].length+" * "+product_index+" / "+index_key+" / "+view.rows[index].value.specs[index_key]);
                                          
                                          //                 console.log(arrayOfHoldingArrays.length+" / "+arrayOfHoldingArrays[product_index].length+" * "+product_index+" / "+index_key+" / "+view.rows[index].value.specs[index_key]);
                                          
                                          var q=0;
                                          for(;q<arrayOfHoldingArrays[product_index].length;q++){
                                          if(arrayOfHoldingArrays[product_index][q] == view.rows[index].value.specs[index_key]){
                                          break;
                                          }
                                          }
                                          if(q == arrayOfHoldingArrays[product_index].length){
                                          arrayOfHoldingArrays[product_index].push(view.rows[index].value.specs[index_key]);
                                          }
                                          
                                          }
                                          
                                          
                                          
                                          var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                                          var temp_2 = parseInt(index)+1;
                                          
                                          if(view.rows.length == temp_2){
                                          
                                          
                                          var temp_html;
                                          var html_hoalder_Array =new Array();
                                          
                                          
                                          for(index1 in arrayOfProducts){
                                          
                                          globalAttributArray[index1] = new Array();
                                          
                                          
                                          
                                          for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                                          console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                                          if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[index1]){
                                          globalAttributArray[index1].push(lastGlobalAttrArray[temp]);
                                          
                                          }
                                          }
                                          
                                          
                                          temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                                          temp_html += "<h3><strong>"+arrayOfProducts[index1]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                                          "<fieldset data-role=\"controlgroup\">";
                                          arrayOfHoldingArrays[index1].sort();
                                       
                                          
                                          for(var attIndex in arrayOfHoldingArrays[index1]){
                                          //                 console.log("value for the - "+ arrayOfHoldingArrays[index1][attIndex]);
                                          
                                          temp_html += "<input onclick=\"filterMultipleProductsForPartPrefix("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
                                          "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\">"+arrayOfHoldingArrays[index1][attIndex]+"</label>";
                                          
                                          }
                                          
                                          temp_html += "</fieldset></div></div>";
                                          
                                          html_hoalder_Array.push(temp_html);
                                          
                                          
                                          }
                                          
                                          
                                          
                                          var temp_arrayOfProducts_Array =new Array();
                                          for(var ww=0;ww<arrayOfProducts.length;ww++){
                                          temp_arrayOfProducts_Array[ww] =arrayOfProducts[ww];
                                          
                                          }
                                          
                                          
                                          
                                          
                                          for(var i=0;i<(temp_arrayOfProducts_Array.length-1);i++)
                                          {
                                          
                                          for(var j=i+1;j<temp_arrayOfProducts_Array.length;j++)
                                          {
                                          
                                          if(temp_arrayOfProducts_Array[i]>temp_arrayOfProducts_Array[j]){
                                          
                                          
                                          var temp0 = temp_arrayOfProducts_Array[i];
                                          temp_arrayOfProducts_Array[i] = temp_arrayOfProducts_Array[j];
                                          temp_arrayOfProducts_Array[j] = temp0;
                                          
                                          
                                          var temp1 = html_hoalder_Array[i];
                                          html_hoalder_Array[i] = html_hoalder_Array[j];
                                          html_hoalder_Array[j] = temp1;
                                          
                                          }
                                          
                                          
                                          }
                                          }
                                          
                                          
                                          
                                          for(var ww=0;ww<html_hoalder_Array.length;ww++){
                                          attributeKeyHtml += html_hoalder_Array[ww];
                                          
                                          }
                                          
                                          attributeKeyHtml += "</div>";
                                          
                                          
                                          
                                          console.log("filter options set");
                                          
                                          $("#filter_options_ul").html(attributeKeyHtml);
                                          
                                          filterOptionsHtml = attributeKeyHtml;
                                          
                                          $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                                          
//                                                                            "<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                                          
                                          $("#filter_options_ul").trigger( "create" );
                                          
                                          }
                                          
                                          
                                          itemCount++;
                                          
                                          htmlToAppend += "<tr>"+
                                          "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.title+"</td>"+
                                          "<td style=\"width: 16%;\"  onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.pno+"</td>"+
                                          "<td style=\"width: 16%;\"  onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td style=\"width: 16%;\"  onclick=\"showProductSpecForPartPrefix('"+view.rows[index].id+"','"+number+"');\">"+view.rows[index].value.package_qty+"</td>"+
                                          "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                                          "<div class=\"span7\">"+
                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                          "</div>"+
                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                          "</div>"+
                                          "</td>"
                                          "</tr>";
                                          
                                          
                                          if(index==(view.rows.length-1))
                                          lastRecordProdNo = view.rows[index].value.pno
                                          }
                                          loadingWithMsg('hide','');
                                          $("#table_body").append(htmlToAppend);
                                          $("#itemCountForPartPrefix").html("<font size=\"1\">"+itemCount+" Items</font>");
                                          $("#baseCategwf").trigger('create');
                                          isProductLoading = false;
                                           myScroll.refresh();
                                          }
                                          );
                             
                             

                             }
                             
                             });
                 
//                 $('#inner-content-div').slimScroll({
//                                                    height: '420px',
//                                                    wheelStep: 80
//                                                    });
                 
//                 $("#inner-content-div").niceScroll({touchbehavior:true,bouncescroll:true,scrollspeed:100,cursorcolor:"#00F",cursoropacitymax:0.7,cursorwidth:6,background:"#ccc",autohidemode:false});
//
//               var myScroll = $("#inner-content-div").getNiceScroll()[0];
//
//                 $("#inner-content-div").niceScroll();
//                 $("#inner-content-div").getNiceScroll().resize();
//
//                 console.log("nice scroll - "+myScroll);
//
//
//                 $("#inner-content-div").niceScroll().scrollstart(function(info){
//                                                                  console.log(info.current);
//
//
//
//                                                                  });
//                 // or
//                 $("#inner-content-div").niceScroll().scrollend(function(info){
//                                                                console.log(info);
//                                                                var clientHeight = document.getElementById('table_body').clientHeight;
//                                                                console.log(clientHeight);
//                                                                if(info.current.y==(clientHeight-130)){
//
//                                                                }
//                                                                else if(info.current.y==0){
//
//                                                                
//                                                                }
//                                                                
//                                                                });
                 
                 
//                 myScroll.onscroll = function(e) { console.log('scrolling'+JSON.stringify(e)) };
                 
//                 myScroll.scrollend(function(){
//                                    if(myScroll.scrollvaluemax == myScroll.scroll.y) {
//                                    // do something
//                                    alert("bottom");
//                                    }
//                                    });
                 
                 
//                 $('#inner-content-div').slimScroll().bind('slimscroll', function(e, pos){
//                                                           
//                                                           
//                                                           
//                                                           
//                                                           
//                                                           
//                                                           if(pos=="bottom"){
//                                                           
//                                                           
//                                                           
//
//                                                           }
//                                                           else if(pos=="top"){
//                                                           
//                                                           }
//                                                           
//                                                           
//                                                           });

                 }
                 else
                 {
                 showCustomAlert("Unable to retrieve products, please try again...");
                 }
                 
                 });
}

function showProductSpecForPartPrefix(prodId,number){
//    $("#bradcrumMain").html("<strong> <div onclick=\"getPartPrefixWithNumberBack('"+number+"');\"><font color=\"#000000\">Part Prefix</font></div></strong>");
    showProductSpec(prodId);
}

function showQuickSearch(){
    
    document.getElementById("liProductcatalog").className = "";
    document.getElementById("liQuickSearch").className = "active";
    document.getElementById("liPartPrefix").className = "";
    $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
  
    
    $("#mainHeadCatalog").html("Catalog: Quick Search");
    
    var baseCateghtml =  "<label data-inline=\"true\" for=\"search-mini\">I am looking for:</label>"+
                      "<input type=\"search\" name=\"search-mini\" data-inline=\"true\" id=\"search-mini\" value=\"\" data-mini=\"true\" />"+
    "<img onclick=\"quickSearchWithText();\" style=\"height: 30px; margin-bottom: 10px; margin-left: 5px;\" src='img/search-button.png'/>";
    
    
    
    $("#bradcrumMain").html(baseCateghtml);
    
     var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"wrapper\"><div id=\"scroller\"><div style=\"width:90%;padding:20px;\">";
    
    
    quickSrchhtml += "</div></div></div></div></div><div class=\"clearfix\"></div>";
    
    
    $("#baseCategwf").html(quickSrchhtml);
    $("#baseCategwf").trigger('create');
    
    $('#search-mini').bind('input', function() {
                        var srchTxt = $(this).val() // get the current value of the input field.
                           console.log("key press -"+$(this).val());
                           if(srchTxt.length<3){
                           $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
                           $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Search key must be 3 characters in length...</h5></div></div>");
                           }
                           else{
                            $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
                           $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"></div></div>");
                           }
                           
                         });
    $("#search-mini").on("keypress", function(event){
                                 if (event.keyCode === 13) {
                                    $("#search-mini").blur();
                                    isFilterOptionsSet = false;
                                    quickSearchWithText();
                                 }
                                 });
//    $('#search-mini').onchange(quickSearchWithText);

}


var isSearchChanged = false;
var lastProductKeyForQuickSearchWithText = "";
var lastProductKeyForQuickSearchWithNumber = "";

function quickSearchWithText(){
    var srchTxt = $("#search-mini").val();
    $("#search-mini").blur();
    isFilterOptionsSet = false;
    $("#mainHeadCatalog").html("Catalog: Quick Search");
    
    isSearchChanged = false;
    
     lastProductKeyForQuickSearchWithText = "";
     lastProductKeyForQuickSearchWithNumber = "";
    
//    alert(srchTxt);
    if(srchTxt.length<3)
    {
        $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Search key must be 3 characters in length...</h5></div></div>");
        $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
//        resetAccordion();
       
    }
    else{
        // start search with the text srchTxt
        isSearchChanged = true;
        var startK = srchTxt;
        var endK = srchTxt+"\u9999"
//        startkey:startK, endkey:endK,
        
       
        $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>Loading...</h5></div></div>");
        
        config.views(["getProductForFilterWithNumber",{startkey:startK, endkey:endK, limit:100}], function(err, view) {
                     if(!err){
                     var searchResultWithNumber = [];
                     if(view.rows.length==0)
                     getProductForFilterWithName(null);
                     
                     
                     
                     for(index in view.rows){
                     searchResultWithNumber.push(view.rows[index].value);
                     lastProductKeyForQuickSearchWithNumber = view.rows[index].value.pno;
                     }
                     getProductForFilterWithName(searchResultWithNumber);
                     }
                     else
                     {
                     showCustomAlert("No item found. Please change your search and try again.");
                     var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"quickSearchwrapperSlimScroll\">";
                     quickSrchhtml += "<h5></h5>"
                     quickSrchhtml += "</div></div></div><div class=\"clearfix\"></div>";
                     $("#baseCategwf").html(quickSrchhtml);
                     }
                     
                     });
        

        
    }
}

function getProductForFilterWithName(searchResultWithNumber){
    var srchTxt = $("#search-mini").val();
    var startK = srchTxt;
    var endK = srchTxt+"\u9999"
    config.views(["getProductForFilterWithName",{startkey:startK, endkey:endK, limit:100}], function(err, view) {
                 if(!err){
                 var searchResultWithName = [];
                 if(view.rows.length==0){
                 createQuickSearchScreen(null,searchResultWithNumber);
                 }
                 var arrProducts = new Array();
                 
                 var objProducts = {};
                 
                 for(index in view.rows){
                 
                 
                 if(view.rows[index].value.item_sequence != null && view.rows[index].value.item_sequence != '')
                 
                 {
                 
                 arrProducts.push(view.rows[index].value.item_sequence);
                 
                 objProducts[view.rows[index].value.item_sequence] = view.rows[index].value;
                 
                 }
                 
                 else
                 
                 {
                 
                 searchResultWithName.push(view.rows[index].value); //if empty put in result array
                 
                 }
                 
//                 console.log("hiii"+view.rows[index].value.item_sequence);
//                 
//                 searchResultWithName.push(view.rows[index].value);
//                 lastProductKeyForQuickSearchWithText = view.rows[index].value.title;
                 
                 }
                 arrProducts.sort();
                 for(intProduct in arrProducts){
                 
                 var vSeq = arrProducts[intProduct];
                 
                 searchResultWithName.push(objProducts[vSeq]);
                 
                 lastProductKeyForQuickSearchWithText = view.rows[index].value.title;
                 
                 
                 
                 }
                 console.log("name length - "+searchResultWithName.length+" number length - "+searchResultWithNumber.length)
                 createQuickSearchScreen(searchResultWithName,searchResultWithNumber);
                 }
                 else
                 {
                 showCustomAlert("No item found. Please change your search and try again.");
                  var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"quickSearchwrapperSlimScroll\">";
                   quickSrchhtml += "<h5></h5>"
                 quickSrchhtml += "</div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(quickSrchhtml);
                 }
                 
                 });
}

var isFilterOptionsSet = false;

function createQuickSearchScreen(name,number){
    
    
    
    
    if(name=="" || name==null){
    
        createQuickSearchScreenForTheArrayWithoutFilters(number,"getProductForFilterWithNumber");
        
    }
    else if(number=="" || number==null){
        
        createQuickSearchScreenForTheArrayWithoutFilters(name,"getProductForFilterWithName");
        
    }
    else if(name != null && number != null)
    {
//        name = unique(name.concat(number));
        
        if(name.length>number.length){
            lastProductKeyForQuickSearchWithNumber = "";
        createQuickSearchScreenForTheArrayWithoutFilters(name,"getProductForFilterWithName");
        }
        else{
            lastProductKeyForQuickSearchWithText = "";
           createQuickSearchScreenForTheArrayWithoutFilters(number,"getProductForFilterWithNumber");
        }
    }
    else{
        $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><h5>No records found, please try after some time...</h5></div></div>");
    }
    
}

var productArrayAfterQuickSearchResult;
var searchTypeForQuickSearch;


function createQuickSearchScreenForTheArrayWithoutFilters(name,searchFor){
    
    productArrayAfterQuickSearchResult = name;
    searchTypeForQuickSearch = searchFor;
    resetAccordion();
    
    var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\">";
    var totalProductsCountForQuickSearch =0;
    
    quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
    "<div class=\"some-content-related-div\">"+
    "<table style=\"margin-bottom:0px;\" class=\"table\">"+
    "     <thead>"+
    "        <tr>"+
    "            <th style=\"width: 39%;\">Description</th>"+
    "            <th style=\"width: 16%;\">Part No.</th>"+
    "            <th style=\"width: 16%;\">Price</th>"+
    "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
    "            <td style=\"width: 16%;\">"+
    "<div id=\"currentProductFound\" style='width: 20px; font-size: 10px;'></div><div id=\"totalProductCountForTheCategory\" style='width: 80px; font-size: 10px; position: absolute; top: 18px; right: 13px;'>of xxx Items</div>"+
    "            </td>"+
    "        </tr>"+
    "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
    "<div id=\"quickSearchList\" >";
    
    
    if(name.length==0)
        quickSrchhtml = +"<h5>No item found. Please change your search and try again.</h5>";
    
    
    
     for(index in name){
     
         totalProductsCountForQuickSearch++;
         
         if(totalProductsCountForQuickSearch!=101)
         quickSrchhtml += "<tr>"+
         "<td style=\"width: 39%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\">"+name[index].title+"</td>"+
         "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\">"+name[index].pno+"</td>"+
         "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\");\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
         "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\">"+name[index].package_qty+"</td>"+
         "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
         "<div class=\"span7\">"+
         "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
         "</div>"+
         "<div class=\"span4\" style=\"margin-top:5px;\">"+
         "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
         "</div>"+
         "</td>"+
         "</tr>";
         
         
         var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
         var imageCounts =   parseInt(localStorage.imageCount);
         if(imageSyncCountInLocalDb>=imageCounts){
             getImage64withId(name[index].img,name[index].title+name[index]._id);
         
         }
     
     }
    
    quickSrchhtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
    $("#baseCategwf").html(quickSrchhtml);
    $("#currentProductFound").html(totalProductsCountForQuickSearch);
    $("#baseCategwf").trigger('create');
    var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });
    
    if(searchFor=="getProductForFilterWithName"){
        
        var srchTxt = $("#search-mini").val();
        var startK = srchTxt;
        var endK = srchTxt+"\u9999"
        config.views(["getProductForFilterWithName",{startkey:startK, endkey:endK}], function(err, view) {
                     
                     $("#totalProductCountForTheCategory").html("of "+view.rows.length+" Items");
                     
                     });
        
    }
    else if(searchFor=="getProductForFilterWithNumber"){
        var srchTxt = $("#search-mini").val();
        var startK = srchTxt;
        var endK = srchTxt+"\u9999"
        config.views(["getProductForFilterWithNumber",{startkey:startK, endkey:endK}], function(err, view) {
                     
                     $("#totalProductCountForTheCategory").html("of "+view.rows.length+" Items");
                     
                     });
    }
        
    
    myScroll.on('scrollEnd', function(){
                console.log("info -"+this.y);
                var clientHeight = document.getElementById('table_body').clientHeight;
                console.log("table body - "+clientHeight);
                var finalDiff = clientHeight+this.y;
                console.log("final diff - "+finalDiff);
                resetAccordion();
                
                
                
                if(finalDiff==420){
//                alert("bottom"+lastProductKeyForQuickSearchWithText+"----"+lastProductKeyForQuickSearchWithNumber);
                
                
                if(lastProductKeyForQuickSearchWithNumber==""){
                
                var startK = lastProductKeyForQuickSearchWithText;
                 var srchTxt = $("#search-mini").val();
                var endK =  srchTxt+"\u9999";
                var extraRows = "";
                
                
                console.log("getProductForFilterWithName "+startK+"---"+endK);
                        config.views(["getProductForFilterWithName",{startkey:startK, endkey:endK, limit:101}], function(err, view) {
                                     
                                     console.log("success");
                                     
                                     
                                     if(view.rows.length==1){
                                     showCustomAlert("No more products to show...");
                                     return;
                                     }
                                     
                                     
                                     for(index in view.rows){
                                     
                                     console.log("view--**"+index)
                                     
                                     console.log(view.rows[index].id+"----"+view.rows[index].value.title);
                                     if(index!=0){
                                     extraRows += "<tr>"+
                                     "<td style=\"width: 39%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                                     "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pno+"</td>"+
                                     "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\");\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                     "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.package_qty+"</td>"+
                                     "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                                     "<div class=\"span7\">"+
                                     "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                     "</div>"+
                                     "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                     "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                     "</div>"+
                                     "</td>"+
                                     "</tr>";
                                    
                                     totalProductsCountForQuickSearch++;
                                     
                                     
                                     var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
                                     var imageCounts =   parseInt(localStorage.imageCount);
                                     if(imageSyncCountInLocalDb>=imageCounts){
                                     getImage64withId(view.rows[index].value.img,view.rows[index].value.title+view.rows[index].value._id);
                                     
                                     }
                                     }
                                      lastProductKeyForQuickSearchWithText = view.rows[index].value.title;
                                     
                                     }
                                     
                                     //end of for loop for the view index
                                     
                                     $("#table_body").append(extraRows);
                                     $("#currentProductFound").html(""+totalProductsCountForQuickSearch+"");
                                     $("#baseCategwf").trigger('create');
                                     myScroll.refresh();
                                     
                                     });
                
                //end of view query for getProductForFilterWithName
                
                } // end of if condition to check to text or number
                else if(lastProductKeyForQuickSearchWithText==""){
                
                
                var startK = lastProductKeyForQuickSearchWithNumber;
                var endK = lastProductKeyForQuickSearchWithNumber+"\u9999";
                 var srchTxt = $("#search-mini").val();
                var endK = srchTxt+"\u9999";
                var extraRows = "";
                config.views(["getProductForFilterWithNumber",{startkey:startK, endkey:endK, limit:100}], function(err, view) {
                             
                             if(view.rows.length==0){
                             showCustomAlert("No more products to show...");
                             return;
                             }
                             
                             
                             for(index in view.rows){
                             
                             totalProductsCountForQuickSearch++;
                             
                             
                             if(index!=0){
                             extraRows += "<tr>"+
                             "<td style=\"width: 39%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                             "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pno+"</td>"+
                             "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\");\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                             "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.package_qty+"</td>"+
                             "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                             "<div class=\"span7\">"+
                             "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                             "</div>"+
                             "<div class=\"span4\" style=\"margin-top:5px;\">"+
                             "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                             "</div>"+
                             "</td>"+
                             "</tr>";
                             
                             
                             var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
                             var imageCounts =   parseInt(localStorage.imageCount);
                             if(imageSyncCountInLocalDb>=imageCounts){
                             getImage64withId(view.rows[index].value.img,view.rows[index].value.title+view.rows[index].id);
                             
                             }
                             }
                             
                             lastProductKeyForQuickSearchWithNumber = view.rows[index].value.pno;
                             }
                             
                             //end of for loop for the view index
                             
                             $("#table_body").append(extraRows);
                             $("#currentProductFound").html(totalProductsCountForQuickSearch);
                             $("#baseCategwf").trigger('create');
                             myScroll.refresh();
                             
                             });
                
                
                }
                
                
                
                
                }
                });
    
    
}


function createQuickSearchScreenForTheArray(name,searchFor){
    
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    
    var totalItemFound = 0;
    
    var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\">";
    
    
    quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
    "<div class=\"some-content-related-div\">"+
    "<table style=\"margin-bottom:0px;\" class=\"table\">"+
    "     <thead>"+
    "        <tr>"+
    "            <th style=\"width: 39%;\">Description</th>"+
    "            <th style=\"width: 16%;\">Part No.</th>"+
    "            <th style=\"width: 16%;\">Price</th>"+
    "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
    "            <td id=\"totalProductsCountForQuickSearch\" style=\"width: 16%;\"></td>"+
    "        </tr>"+
    "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
    "<div id=\"partPrefixList\" >";
    
    
    if(name.length==0)
        quickSrchhtml = +"<h5>No item found. Please change your search and try again.</h5>"
        
        for(index in name){
            
            
            
            console.log("product category - category - "+name[index].category);
            console.log("filter options "+isFilterOptionsSet);
            
            
            
            if(index == 1 ){
                console.log(index+" **/** "+JSON.stringify(name[index]));
            }
            
            
            
            
            
            
            for(index_key in name[index].specs){
                
                console.log("111 "+JSON.stringify(name[index].specs));
                
                var t=0;
                for(;t<arrayOfProducts.length;t++){
                    if(arrayOfProducts[t] == index_key){
                        break;
                    }
                }
                console.log("success 1");
                if(t == arrayOfProducts.length){
                    
                    arrayOfProducts.push(index_key);
                    var temp_1 = parseInt(arrayOfProducts.length)-1;
                    arrayOfHoldingArrays[temp_1]=new Array();
                    
                }
                console.log("success 2");
                var product_index= arrayOfProducts.indexOf(index_key);
                
                
                var q=0;
                for(;q<arrayOfHoldingArrays[product_index].length;q++){
                    if(arrayOfHoldingArrays[product_index][q] == name[index].specs[index_key]){
                        break;
                    }
                }
                if(q == arrayOfHoldingArrays[product_index].length){
                    arrayOfHoldingArrays[product_index].push(name[index].specs[index_key]);
                }
                console.log("success 3");
                
            }
            
            
            
            var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
            var temp_2 = parseInt(index)+1;
            
            if(name.length == temp_2){
                
                
                var temp_html;
                var html_hoalder_Array =new Array();
                
                
                for(index1 in arrayOfProducts){
                    globalAttributArray[index1] = new Array();
                    temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                    temp_html += "<h3><strong>"+arrayOfProducts[index1]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                    "<fieldset data-role=\"controlgroup\">";
                    arrayOfHoldingArrays[index1].sort();
                    for(var attIndex in arrayOfHoldingArrays[index1]){
                        //                 console.log("value for the - "+ arrayOfHoldingArrays[index1][attIndex]);
                        
                        temp_html += "<input onclick=\"filterMultipleProductsForQuickSearch1("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"','"+searchFor+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
                        "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\">"+arrayOfHoldingArrays[index1][attIndex]+"</label>";
                        
                    }
                    
                    temp_html += "</fieldset></div></div>";
                    
                    html_hoalder_Array.push(temp_html);
                    
                }
                
                
                
                var temp_arrayOfProducts_Array =new Array();
                for(var ww=0;ww<arrayOfProducts.length;ww++){
                    temp_arrayOfProducts_Array[ww] =arrayOfProducts[ww];
                    
                }
                
                
                
                
                for(var i=0;i<(temp_arrayOfProducts_Array.length-1);i++)
                {
                    
                    for(var j=i+1;j<temp_arrayOfProducts_Array.length;j++)
                    {
                        
                        if(temp_arrayOfProducts_Array[i]>temp_arrayOfProducts_Array[j]){
                            
                            
                            var temp0 = temp_arrayOfProducts_Array[i];
                            temp_arrayOfProducts_Array[i] = temp_arrayOfProducts_Array[j];
                            temp_arrayOfProducts_Array[j] = temp0;
                            
                            
                            var temp1 = html_hoalder_Array[i];
                            html_hoalder_Array[i] = html_hoalder_Array[j];
                            html_hoalder_Array[j] = temp1;
                            
                        }
                        
                        
                    }
                }
                
                
                
                for(var ww=0;ww<html_hoalder_Array.length;ww++){
                    attributeKeyHtml += html_hoalder_Array[ww];
                    
                }
                
                attributeKeyHtml += "</div>";
                
                
                
                
                console.log("filter options set");
                
                $("#filter_options_ul").html(attributeKeyHtml);
                
                filterOptionsHtml = attributeKeyHtml;
                
                $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilterForQuickSearch();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                
                //                                                  "<div onclick=\"resetFilterForQuickSearch();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                
                $("#filter_options_ul").trigger( "create" );
                
            }
            
            
            
            
            
            
            
            
            
            totalItemFound++;
            
            quickSrchhtml += "<tr>"+
            "<td style=\"width: 39%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\">"+name[index].title+"</td>"+
            "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\">"+name[index].pno+"</td>"+
            "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\");\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
            "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+name[index]._id+"');\">"+name[index].package_qty+"</td>"+
            "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
            "<div class=\"span7\">"+
            "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
            "</div>"+
            "<div class=\"span4\" style=\"margin-top:5px;\">"+
            "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
            "</div>"+
            "</td>"+
            "</tr>";
            
            
            var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
            var imageCounts =   parseInt(localStorage.imageCount);
            if(imageSyncCountInLocalDb>=imageCounts){
                getImage64withId(name[index].img,name[index].title+name[index]._id);
                
            }
            
        }
    quickSrchhtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
//    $("#baseCategwf").html(quickSrchhtml);
//    $("#totalProductsCountForQuickSearch").html(totalItemFound+" Items");
//    $("#baseCategwf").trigger('create');
    document.getElementById("b").style.left="0px";
    document.getElementById("accordion_b").style.backgroundImage="url('img/arrow_right.png')";
    var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });
}


function prepareQuickSearchFilters(){
    
    var name = productArrayAfterQuickSearchResult;
    var searchFor = searchTypeForQuickSearch;
    
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    
    
    for(index in name){
        
        
        if(index == 1 ){
        }
        
        
        
        
        
        
        for(index_key in name[index].specs){
            
            
            
            var t=0;
            
            t = arrayOfProducts.indexOf(index_key);
            
            if(t < 0)
            {
                t = arrayOfProducts.length;
                arrayOfProducts.push(index_key);
                
                var temp_1 = parseInt(arrayOfProducts.length)-1;
                arrayOfHoldingArrays[temp_1]=new Array();
                
                arrayOfHoldingArrays[temp_1].push(name[index].specs[index_key]);
            }
            else
            {
                var product_index= arrayOfProducts.indexOf(index_key);
                var q = arrayOfHoldingArrays[product_index].indexOf(name[index].specs[index_key]);
                
                if(q < 0)
                {
                    arrayOfHoldingArrays[product_index].push(name[index].specs[index_key]);
                }
            }
            
            
            
        }
        
        
        
        var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
        var temp_2 = parseInt(index)+1;
        
        if(name.length == temp_2){
            
            
            var temp_html;
            var html_hoalder_Array =new Array();
            
            
            for(index1 in arrayOfProducts){
                globalAttributArray[index1] = new Array();
                temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                temp_html += "<h3><strong>"+arrayOfProducts[index1]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                "<fieldset data-role=\"controlgroup\">";
                arrayOfHoldingArrays[index1].sort();
                for(var attIndex in arrayOfHoldingArrays[index1]){
                    //                 console.log("value for the - "+ arrayOfHoldingArrays[index1][attIndex]);
                    
                    temp_html += "<input onclick=\"filterMultipleProductsForQuickSearch1("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"','"+searchFor+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
                    "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\">"+arrayOfHoldingArrays[index1][attIndex]+"</label>";
                    
                }
                
                temp_html += "</fieldset></div></div>";
                
                html_hoalder_Array.push(temp_html);
                
            }
            
            
            
            var temp_arrayOfProducts_Array =new Array();
            for(var ww=0;ww<arrayOfProducts.length;ww++){
                temp_arrayOfProducts_Array[ww] =arrayOfProducts[ww];
                
            }
            
            
            
            
            for(var i=0;i<(temp_arrayOfProducts_Array.length-1);i++)
            {
                
                for(var j=i+1;j<temp_arrayOfProducts_Array.length;j++)
                {
                    
                    if(temp_arrayOfProducts_Array[i]>temp_arrayOfProducts_Array[j]){
                        
                        
                        var temp0 = temp_arrayOfProducts_Array[i];
                        temp_arrayOfProducts_Array[i] = temp_arrayOfProducts_Array[j];
                        temp_arrayOfProducts_Array[j] = temp0;
                        
                        
                        var temp1 = html_hoalder_Array[i];
                        html_hoalder_Array[i] = html_hoalder_Array[j];
                        html_hoalder_Array[j] = temp1;
                        
                    }
                    
                    
                }
            }
            
            
            
            for(var ww=0;ww<html_hoalder_Array.length;ww++){
                attributeKeyHtml += html_hoalder_Array[ww];
                
            }
            
            attributeKeyHtml += "</div>";
            
            
            
            
            console.log("filter options set");
            
            $("#filter_options_ul").html(attributeKeyHtml);
            
            
            if(arrayOfHoldingArrays.length==0){
                $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
            }
            
            filterOptionsHtml = attributeKeyHtml;
            
            
//            alert(arrayOfHoldingArrays+"-----"+arrayOfProducts);
            
            $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilterForQuickSearch();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
            
            //                                                  "<div onclick=\"resetFilterForQuickSearch();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
            
            $("#filter_options_ul").trigger( "create" );
            
        }

    }
    
        
    
}



function filterOptionsTapped(e){
    
    console.log(document.getElementById("b").style.left);
    
    if(document.getElementById("b").style.left == "151px")
        document.getElementById("b").style.left = "0px";
    else
        document.getElementById("b").style.left = "151px";
    
    
    if(document.getElementById("b").style.left=="0px"){
        console.log("open");
        
        if(document.getElementById("liQuickSearch").className=="active" && isSearchChanged){
            console.log("prepare filters for quick search...");
            prepareQuickSearchFilters();
            isSearchChanged = false;
        }
        
    }
    else{
        console.log("close");
    }
    
}


function quickSeachProdSpec(id){
//    var srchTxt = $("#search-mini").val();
//
//     $("#bradcrumMain").html("<strong> <div onclick=\"getQuickSearchWithValueBack('"+srchTxt+"');\"><font color=\"#000000\">Quick Search</font></div></strong>");
//
    showProductSpec(id);
}

function getQuickSearchWithValueBack(searchTxt){
    var baseCateghtml =  "<label data-inline=\"true\" for=\"search-mini\">I am looking for:</label>"+
    "<input type=\"search\" name=\"search-mini\" data-inline=\"true\" id=\"search-mini\" value=\""+searchTxt+"\" data-mini=\"true\" />";
    
    
    
    $("#bradcrumMain").html(baseCateghtml);
    
    
    
    $('#search-mini').bind('input', function() {
                           $(this).val() // get the current value of the input field.
                           quickSearchWithText();
                           });
    
    quickSearchWithText();
    
}

function unique(arrayOfNameNumber)
{
    var newArray=new Array();
    for(var i=0; i<arrayOfNameNumber.length;i++ )
    {
        for(var j=0; j<newArray.length;j++ )
        {
            if(newArray[j]._id==arrayOfNameNumber[i]._id)
                continue;
        }
    newArray[newArray.length] = arrayOfNameNumber[i];
    }
    return newArray;
}
/*
The index UI lists the available todo lists and lets you create new ones.
*/

function drawContent(html) {
    scroll(0,0)
//    $("#content").html(html)
}

function goIndex(seq) {

    window.dbChanged = function() {
        console.log("################"+JSON.stringify(config.info));
       

    }
    window.dbChanged()
}

/*
The list UI lets you create todo tasks and check them off or delete them.
It also links to a screen for sharing each list with a different set of friends.
*/

function goList(id) {
    config.db.get(id, function(err, doc){
        drawContent(config.t.list(doc))

        $("#content .todo-index").click(function(){
            goIndex()
        })

        $("#content .todo-share").click(function(){
            doShare(id)
        })

        $("#content form").submit(function(e) {
            e.preventDefault()
            var doc = jsonform(this)
            doc.type = "task"
            doc.list_id = id
            doc.updated_at = doc.created_at = new Date()
            config.db.post(doc, function(err, ok) {
                $("#content form input").val("")
            })
        })

        $("#scrollable").on("click", "li", function(e) {
            var id = $(this).attr("data-id")
            if ($(e.target).hasClass("camera")) {
                if ($(e.target).hasClass("image")) {
                    goImage(id)
                } else {
                    doCamera(id)
                }
            } else {
                toggleChecked(id)
            }
        })

        window.dbChanged = function() {
            config.views(["tasks", {
                startkey : [id, {}],
                endkey : [id],
                descending : true
            }], function(err, view) {
                console.log("tasks", view)
                $("#scrollable").html(config.t.listItems(view))
                $("#scrollable li").on("swipeRight", function() {
                    var id = $(this).attr("data-id")
                    $(this).find("button").show().click(function(){
                        deleteItem(id)
                    })
                })
            })
        }
        window.dbChanged()
    })
}

function deleteItem(id) {
    console.log("delete", id)
    config.db.get(id, function(err, doc){
        doc._deleted = true;
        config.db.put(id, doc, function(){})
    })
}

function toggleChecked(id) {
    console.log("toggle", id)
    config.db.get(id, function(err, doc){
        doc.checked = !doc.checked
        doc.updated_at = new Date()
        config.db.put(id, doc, function(){})
    })
}

function doCamera(id) {
    console.log("camera", id)
    if (!(navigator.camera && navigator.camera.getPicture)) {return}

    navigator.camera.getPicture(function(imageData) {
        config.db(id, function(err, doc){
            doc._attachments = {
              "image.jpg" : {
                content_type : "image/jpg",
                data : imageData
              }
            }
            config.db.post(doc, function(err, ok) {})
        })
    }, function(message) { // onFail
        // alert('Failed because: ' + message);
    }, {
        quality: 50,
        targetWidth : 1000,
        targetHeight : 1000,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

/*
Display a photo for an task if it exists.
*/

function goImage(id) {
    window.dbChanged = function(){}
    config.db(id, function(err, doc){
        doc.image_path = config.db([id,"image.jpg"]).pax.toString()
        drawContent(config.t.image(doc))
        $("#content .todo-image-back").click(function(){
            goList(doc.listId)
        })
        $("#content .todo-image-del").click(function(){
            delete doc.image_path
            delete doc._attachments["image.jpg"]
            config.db.post(doc, function(err, ok) {
                goList(doc.listId)
            })
        })
    })
}

/*
The sharing and login management stuff
*/

function doShare(id) {
    if (!config.user) {
        doFirstLogin(function(err) {
            console.log("login done", err, config.user)
            goShare(id)
        })
    } else {
        goShare(id)
    }
}

function goShare(id) {
    window.dbChanged = function(){}
    config.db(id, function(err, doc) {
        config.views("profiles", function(err, view){
            view.title = doc.title

            // fold over the view and mark members as checked
            var members = (doc.members || []).concat(doc.owner);

            for (var i = view.rows.length - 1; i >= 0; i--) {
                var row = view.rows[i]
                for (var j = members.length - 1; j >= 0; j--) {
                    var member = members[j]
                    console.log("row", row.id, member)
                    if (row.id == member) {
                        row.checked = "checked"
                    }
                };
            };

            drawContent(config.t.share(view))

            $("#content .todo-share-back").click(function(){
                goList(id)
            })

            $("#scrollable").on("click", "li", function() {
                var user = $(this).attr("data-id");
                if (user !== doc.owner) {
                    toggleShare(doc, user, function(){
                        goShare(id)
                    })
                } else {
                    goShare(id)
                }
            })
        })
    })
}

function toggleShare(doc, user, cb) {
    doc.members = doc.members || [];
    var i = doc.members.indexOf(user)
    if (i === -1) {
        doc.members.push(user)
    } else {
        doc.members.splice(i,1)
    }
    console.log("members", doc.members)
    config.db.post(doc, cb)
}

/*
Login and setup existing data for user account
*/

function doFirstLogin(cb) {
    doFacebook(function(err, data){
        if (err) {return cb(err)}
        config.setUser(data, function(err, ok){
            if (err) {return cb(err)}
            registerFacebookToken(function(err){
                if (err) {return cb(err)}
                createMyProfile(function(err){
                    addMyUsernameToAllLists(function(err) {
                        if (err) {return cb(err)}
                        triggerSync(cb)
                    })
                })
            })
        })
    })
}

function registerFacebookToken(cb) {
    var registerData = {
        remote_url : config.site.syncUrl,
        email : config.user.email,
        access_token : config.user.access_token
    }
    coax.post([config.server, "_facebook_token"], registerData, cb)
}

function addMyUsernameToAllLists(cb) {
    config.views(["lists", {include_docs : true}], function(err, view) {
        if (err) {return cb(err)}
        var docs = [];
        view.rows.forEach(function(row) {
            row.doc.owner = "p:"+config.user.user_id
            docs.push(row.doc)
        })
        config.db.post("_bulk_docs", {docs:docs}, function(err, ok) {
            console.log("updated all docs", err, ok)
            cb(err, ok)
        })
    })
}

function createMyProfile(cb) {
    var profileData = JSON.parse(JSON.stringify(config.user))
    profileData.type = "profile"
    profileData.user_id = profileData.email
    delete profileData.email
    config.db.put("p:"+profileData.user_id, profileData, cb)
}

/*
Get user email address from Facebook, and access code to verify on Sync Gateway
*/


function doFacebook(cb) {
    // TODO should pull from config?
    FacebookInAppBrowser.settings.appId = "501518809925546"
    FacebookInAppBrowser.settings.redirectUrl = 'http://console.couchbasecloud.com/index/'
    FacebookInAppBrowser.settings.permissions = 'email'
    FacebookInAppBrowser.login(function(accessToken){
        getFacebookUserInfo(accessToken, function(err, data) {
            if (err) {return cb(err)}
            console.log("got facebook user info", data)
            cb(false, data)
        })
    }, function(err) { // only called if we don't get an access token
        cb(err)
    })
}

function getFacebookUserInfo(token, cb) {
    var url = "https://graph.facebook.com/me?fields=id,name,email&access_token="+token
    coax.get(url, function(err, data) {
        if (err) {return cb(err)}
        data.access_token = token
        cb(false, data)
    })
}

function getNewFacebookToken(cb) {
    alert("getNewFacebookToken")
    // should be like doFirstLogin() but modify the user and
    // doesn't need to put the owner on all the lists.
    cb()
}

/*
Sync Manager: this is run on first login, and on every app boot after that.
The way it works is with an initial single push replication. When that
completes, we know we have a valid connection, so we can trigger a continuous
push and pull
*/



function getAllImagesFromDb(){
    alert("getting images..."+JSON.stringify(configImg));
    loadingWithMsg('show','Loading images ');
    configImg.views(["listss"], function(err, view) {
                 if(!err){
                 alert("success");
                 }
                 else{
                 alert("error");
                 }
                 });
    
}


function triggerImageSync(cb){
    
//    alert("trigger Image sync");
    
    var remote = {
        url : configImg.site.syncImageUrl,
        //        auth : {facebook : {email : config.user.email}}
    },
    push = {
        source : imageDbName,
        target : remote,
        continuous : true
    }, pull = {
        target : imageDbName,
        source : remote,
        continuous : true
    },
    retryCount = 6,
    
    
    
    pushSync = syncManager(configImg.imageserver, push),
    pullSync = syncManager(configImg.imageserver, pull)
    
//    alert("pushSync images -"+JSON.stringify(push)+" imageserver -"+configImg.imageserver);
    
    pushSync.on("auth-challenge", function() {
                pushSync.cancel(function(err, ok) {
                                if (err) {return}
                                if (retryCount == 0) {return cb("sync retry limit reached")}
                                retryCount--
                                getNewFacebookToken(function(err, ok) {
                                                    pushSync.start()
                                                    })
                                })
                })
    pushSync.on("error", function(err){
                cb(err)
                })
    pushSync.on("connected", function(){
                pullSync.start()
                })
    pullSync.on("error", function(err){
                console.log("error connect image databse - "+JSON.stringify(err));
                cb(err)
                })
    pullSync.on("connected", function(){
                console.log("image database connected...");
                cb()
                })
     setTimeout(function(){
                pushSync.start()
     }, 10000)
}


function triggerCustomerSync(cb) {
    console.log("in trigger sync - syncURL - "+configCustomer.site.syncUrl);
    
    var remote = {
        url : configCustomer.site.syncUrl,
        //        auth : {facebook : {email : config.user.email}}
    },
    push = {
        source : customerDbName,
        target : remote,
        continuous : true
    }, pull = {
        target : customerDbName,
        source : remote,
        continuous : true
    },
    retryCount = 6,
    
    pushSync = syncManager(configCustomer.server, push),
    pullSync = syncManager(configCustomer.server, pull)
    
    //    alert("pushSync images -"+JSON.stringify(push)+" imageserver -"+config.server);
    
    //    alert("pushSync - winzer_3"+ JSON.stringify(push))
    
    pushSync.on("auth-challenge", function() {
                pushSync.cancel(function(err, ok) {
                                if (err) {return}
                                if (retryCount == 0) {return cb("sync retry limit reached")}
                                retryCount--
                                getNewFacebookToken(function(err, ok) {
                                                    pushSync.start()
                                                    })
                                })
                })
    pushSync.on("error", function(err){
                console.log("pushSync - error in connecting "+JSON.stringify(err));
                cb(err)
                })
    pushSync.on("connected", function(){
                console.log("pushSync - databse connected.....");
                pullSync.start()
                })
    pullSync.on("error", function(err){
                cb(err)
                })
    pullSync.on("connected", function(){
                cb()
                
                })
     setTimeout(function(){
                pushSync.start()
     }, 10000)
}

function triggerSync(cb) {
    
    var remote = {
        url : config.site.syncUrl,
        //        auth : {facebook : {email : config.user.email}}
    },
    push = {
        source : appDbName,
        target : remote,
        continuous : true
    }, pull = {
        target : appDbName,
        source : remote,
        continuous : true
    },
    retryCount = 6,
    
    pushSync = syncManager(config.server, push),
    pullSync = syncManager(config.server, pull)
    
    pushSync.cancel();
    
    pushSync.on("auth-challenge", function() {
                pushSync.cancel(function(err, ok) {
                                if (err) {return}
                                if (retryCount == 0) {return cb("sync retry limit reached")}
                                retryCount--
                                getNewFacebookToken(function(err, ok) {
                                                    pushSync.start()
                                                    })
                                })
                })
    pushSync.on("error", function(err){
                cb(err)
                })
    pushSync.on("connected", function(){
                pullSync.start()
                })
    pullSync.on("error", function(err){
                console("error connecting database - "+JSON.stringify(err));
                
                cb(err)
                })
    pullSync.on("connected", function(){
                console.log("database connected..");
                //                 pushSync.start()
                cb()
                })
    setTimeout(function(){
               console.log("start pushSync");
               pushSync.start()
               }, 10000)
}


/*
The config functions don't have any visibile UI, they are used
for application bootstrap and then by later state. The result of
the config setup is stored in `window.config` for easy access.
*/



function setupImageDb(done){
    
    
    if (!window.cblite) {
        return done('Couchbase Lite not installed')
    }
    
    console.log("mustache before");
    var mustache = require("mustache"),t = {};
    console.log("before mustache script");
    $('script[type="text/mustache"]').each(function() {
                                           var id = this.id.split('-')
                                           id.pop()
                                           t[id.join('-')] = mustache.compile(this.innerHTML.replace(/^\s+|\s+$/g,''))
                                           });
    
    console.log("before cblite");
    
    cblite.getURL(function(err, url) {
                  if (err) {return done(err)}
                  var dbImg = coax([url, imageDbName]);
                  setupImgDb(dbImg, function(err, info){
                          if (err) {return done(err)}
                             console.log(JSON.stringify(info));
                          setupImageViews(dbImg, function(err, views){
                                     if (err) {return done(err)}
                                     getUser(dbImg, function(err, user) {
                                             if (err) {return done(err)}
                                             window.configImg = {
                                             site : {
                                             syncImageUrl : "http://54.221.200.225:5984/eserv_images_4_2/"
                                             },
                                             user : user,
                                             setUser : function(newUser, cb) {
                                             if (window.configImg.user) {
                                             return cb("user already set")
                                             }
                                             newUser.user_id = newUser.email
                                             dbImg.put("_local/user", newUser, function(err, ok){
                                                    if (err) {return cb(err)}
                                                    window.configImg.user = newUser
                                                    cb()
                                                    })
                                             },
                                             dbimages : dbImg,
                                             infoimages : info,
                                             viewsimages : views,
                                             imageserver : url,
                                             t : t
                                             }
                                             if (window.configImg.user) {
                                             registerFacebookToken(done)
                                             } else {
                                             done(false)
                                             }
                                             })
                                     })
                          })
                  })
    
    
//    console.log("before put"+configImg.infoimages);
    
    function setupImgDb(db, cb) {
        db.put(function(){
               db.get(cb)
               })
    }
    
    
    function setupImageViews(db, cb){
        
        var design = "_design/winzerListImages"
        db.put(design, {
               views : {
               lists : {
               map : function(doc) {
               if (doc.image_data) {
               emit(doc.id,doc);
               }
               }.toString()
               }
               }
               }, function(){
               cb(false, db([design, "_view"]))
               }
               );
        
    }
    
//    alert("get user");
    
    function getUser(db, cb) {
        //        db.get("_all_docs", function(err, doc) {
        //            var user = false;
        //            if (!err) {
        ////               console.log("after getting user "+JSON.stringify(doc));
        ////               formHTML(doc);
        ////                alert("title ### "+JSON.stringify(view));
        //                user = doc;
        //            }
        //               else
        //               {
        //               console.log("after getting user "+JSON.stringify(err));
        //               }
        //            cb(false, user)
        //        })
        var user = false;
        cb(false, user);
    };
//    alert("after user")
    
}
/*$$$$$$$$$$$$$$$$------ Setup Customer Database -------- $$$$$$$$$$$$$$$$$$$$$$$$$$*/


function setupCustomerDb(done) {
    // get CBL url
    
    console.log("setup customer Config");
    //    alert(window.litegap);
    if (!window.cblite) {
        return done('Couchbase Lite not installed')
    }
    console.log("mustache customer before");
    var mustache = require("mustache"),t = {};
    console.log("before mustache script");
    $('script[type="text/mustache"]').each(function() {
                                           var id = this.id.split('-')
                                           id.pop()
                                           t[id.join('-')] = mustache.compile(this.innerHTML.replace(/^\s+|\s+$/g,''))
                                           });
    console.log("before getURL");
    cblite.getURL(function(err, url) {
                  if (err) {return done(err)}
                  var db = coax([url, customerDbName]);
                  setupDb(db, function(err, info){
                          if (err) {return done(err)}
                          console.log("customer db info - "+JSON.stringify(info));
                          setupViews(db, function(err, views){
                                     if (err) {return done(err)}
                                     getUser(db, function(err, user) {
                                             if (err) {return done(err)}
                                             window.configCustomer = {
                                             site : {
//                                             syncUrl : "http://54.221.200.225:5984/winzer/"
                                             syncUrl : "http://testuser:test@54.221.200.225:4984/winzer/_all_docs"
                                             },
                                             user : user,
                                             setUser : function(newUser, cb) {
                                             if (window.configCustomer.user) {
                                             return cb("user already set")
                                             }
                                             newUser.user_id = newUser.email
                                             db.put("_local/user", newUser, function(err, ok){
                                                    if (err) {return cb(err)}
                                                    window.configCustomer.user = newUser
                                                    cb()
                                                    })
                                             },
                                             db : db,
                                             info : info,
                                             views : views,
                                             server : url,
                                             t : t
                                             }
                                             if (window.configCustomer.user) {
                                             registerFacebookToken(done)
                                             } else {
                                             done(false)
                                             }
                                             })
                                     })
                          })
                  })
    
    
    
    
    console.log("before put");
    
    function setupDb(db, cb) {
        db.put(function(){
               db.get(cb)
               })
    }
    
    console.log("before setupViews");
    
    function setupViews(db, cb) {
        var design = "_design/winzerCoustomer"
        db.put(design, {
               views : {
               listCustomer : {
               map : function(doc) {
               if (doc.type=="customer") {
               emit(doc["Customer Info"]["Customer Name"],doc);
               }
               }.toString()
               },
               listsOfCustomersZip : {
               map : function(doc) {
               if (doc.type=="customer") {
               emit(doc["Customer Address"]["Zip Code"],doc);
               }
               }.toString()
               }
               }
               }, function(){
               cb(false, db([design, "_view"]))
               })
    }
    console.log("before getusr for customer");
    function getUser(db, cb) {
        //        db.get("_all_docs", function(err, doc) {
        //            var user = false;
        //            if (!err) {
        ////               console.log("after getting user "+JSON.stringify(doc));
        ////               formHTML(doc);
        ////                alert("title ### "+JSON.stringify(view));
        //                user = doc;
        //            }
        //               else
        //               {
        //               console.log("after getting user "+JSON.stringify(err));
        //               }
        //            cb(false, user)
        //        })
        var user = false;
        cb(false, user);
    };
}






/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/



function setupConfig(done) {
    // get CBL url
    
    console.log("setup Config");
//    alert(window.litegap);
    if (!window.cblite) {
        return done('Couchbase Lite not installed')
    }
    console.log("mustache before");
    var mustache = require("mustache"),t = {};
    console.log("before mustache script");
    $('script[type="text/mustache"]').each(function() {
        var id = this.id.split('-')
        id.pop()
        t[id.join('-')] = mustache.compile(this.innerHTML.replace(/^\s+|\s+$/g,''))
    });
    console.log("before getURL");
    cblite.getURL(function(err, url) {
        if (err) {return done(err)}
        var db = coax([url, appDbName]);
                  
        setupDb(db, function(err, info){
//                alert(JSON.stringify(info));
            if (err) {return done(err)}
            setupViews(db, function(err, views){
                if (err) {return done(err)}
                getUser(db, function(err, user) {
                    if (err) {return done(err)}
                    window.config = {
                        site : {
                            syncUrl : "http://testuser:test@54.221.200.225:4984/winzer/"
                        },
                        user : user,
                        setUser : function(newUser, cb) {
                            if (window.config.user) {
                                return cb("user already set")
                            }
                            newUser.user_id = newUser.email
                            db.put("_local/user", newUser, function(err, ok){
                                if (err) {return cb(err)}
                                window.config.user = newUser
                                cb()
                            })
                        },
                        db : db,
                        info : info,
                        views : views,
                        server : url,
                        t : t
                    }
                    if (window.config.user) {
                        registerFacebookToken(done)
                    } else {
                        done(false)
                    }
                })
            })
        })
    })
    
    
    

    console.log("before put");
    
    function setupDb(db, cb) {
        db.put(function(){
            db.get(cb)
        })
    }

    console.log("before setupViews");
    
    function setupViews(db, cb) {
        var design = "_design/winzerBaseCateg1"
        db.put(design, {
            views : {
                lists : {
                    map : function(doc) {
                        if (doc.type=="category") {
                            emit(doc.cat_title,doc);
                        }
                    }.toString()
                },
               listsOfCategories : {
               map : function(doc) {
               if (doc.type=="category") {
               emit([doc.cat_parents,doc.cat_title],doc);
               }
               }.toString()
               },
               listsOfProducts : {
               map : function(doc) {
               if (doc.type=="product") {
               emit(doc.category,doc);
               }
               }.toString()
               },
               listsOfProductsWithPno : {
               map : function(doc) {
               if (doc.type=="product") {
               emit([doc.category,doc.pno],doc);
               }
               }.toString()
               },
               listsOfProductsByCatSeq : {
               map : function (doc) {
               if (doc.type=="product") {
               emit([doc.category,doc.mprod.PPITSQ],doc);
               }
               }.toString()
               },
               getProductForFilterWithName:{
               map : function(doc){
               if (doc.type=="product" && doc.title!="") {
               emit(doc.title,doc);
               }
               }.toString()
               },
               getProductForFilterWithNumber:{
               map : function(doc){
               if (doc.type=="product") {
               emit(doc.pno,doc);
               
               }
               }.toString()
               },
               listTopLevelCateg : {
               map : function(doc) {
               if (doc.type=="category" && doc.cat_parents=="") {
               emit(doc.cat_title,doc)
               }
               }.toString()
               },
               listCustomer : {
               map : function(doc) {
               if (doc.type=="customer") {
               emit(doc["Customer Info"]["Customer Name"],doc);
               }
               }.toString()
               },
               listsOfCustomersZip : {
               map : function(doc) {
               if (doc.type=="customer") {
               emit(doc["Customer Address"]["Zip Code"],doc);
               }
               }.toString()
               },
               listsOfCustomersLastPurchase : {
               map : function(doc) {
               if (doc.type=="customer") {
               emit(doc["Customer Quality"]["Last Purchase Date"],doc);
               }
               }.toString()
               },
               listBaseCateg : {
               map : function(doc) {
               if (doc.cat_title && doc.type=="category" && doc.cat_parents=="") {
               emit(doc.cat_title,doc)
               }
               }.toString()
               }
            }
        }, function(){
            cb(false, db([design, "_view"]))
        })
    }
    console.log("before getusr for catalog");
    function getUser(db, cb) {
//        db.get("_all_docs", function(err, doc) {
//            var user = false;
//            if (!err) {
////               console.log("after getting user "+JSON.stringify(doc));
////               formHTML(doc);
////                alert("title ### "+JSON.stringify(view));
//                user = doc;
//            }
//               else
//               {
//               console.log("after getting user "+JSON.stringify(err));
//               }
//            cb(false, user)
//        })
         var user = false;
        cb(false, user);
        
        
        
    };
}
/*
 Form html to display rows ..
 */
var arr = [];
function formHTML(ddoc){
//    console.log("after getting user " + ddoc);
    //var json = eval("("+doc+")");
//    config.db.get("_all_doc", function(err, doc){
//                    if(!err)
//                  alert("doc found"+JSON.stringify(doc));
//                  else
//                  alert("err"+JSON.stringify(err));
//                  })
    console.log(ddoc.rows.length);
    
    for(index in ddoc.rows){
        console.log(ddoc.rows[index].id);
        arr.push(ddoc.rows[index].id);
//        $("#content").append("<li onclick=\"getDocWithid('"+ddoc.rows[index].id+"')\">"+ddoc.rows[index].id+"</li>");
    }
//    alert(arr);
}

function getDocWithid(id){
//    alert(id);
    
        config.db.get(id, function(err, doc){
                      if(!err){
                      console.log("doc found"+JSON.stringify(doc));
                      return doc;
                      }
                      else
                      {alert("err"+JSON.stringify(err));
                      return err;
                      }
                      });
    
    return 0 ;
}

/*
Helpers that aren't in a node module and thus aren't in the `modules.js` file
*/

function jsonform(elem) {
  var o = {}, list = $(elem).serializeArray();
  for (var i = list.length - 1; i >= 0; i--) {
    var name = list[i].name, value = list[i].value;
    if (o[name]) {
        if (!o[name].push) {
            o[name] = [o[name]];
        }
        o[name].push(value);
    } else {
        o[name] = value;
    }
  };
  return o;
};

/*
Sync manager module TODO extract to NPM
*/

function syncManager(serverUrl, syncDefinition) {
    var handlers = {}

    function callHandlers(name, data) {
        (handlers[name]||[]).forEach(function(h){
                                     
            h(data)
        })
    }

    function doCancelPost(cb) {
        var cancelDef = JSON.parse(JSON.stringify(syncDefinition))
        cancelDef.cancel = true
        coax.post([serverUrl, "_replicate"], cancelDef, function(err, info){
            if (err) {
                callHandlers("error", err)
                if (cb) {cb(err, info)}
            } else {
                callHandlers("cancelled", info)
                if (cb) {cb(err, info)}
            }
        })
    }

    function doStartPost() {
        var tooLate;
        function pollForStatus(info, wait) {
            if (wait) {
                setTimeout(function() {
                    tooLate = true
                }, wait)
            }
            processTaskInfo(info.session_id, function(done){
                if (!done && !tooLate) {
                    setTimeout(function() {
                        pollForStatus(info)
                    }, 200)
                } else if (tooLate) {
                    callHandlers("error", "timeout")
                }
            })
        }

        var callBack;
        if (syncDefinition.continuous) {
            // auth errors not detected for continuous sync
            // we could use _active_tasks?feed=continuous for this
            // but we don't need that code for this app...
            callBack = function(err, info) {
                console.log("continuous sync callBack", err, JSON.stringify(info), JSON.stringify(syncDefinition))
                if (err) {
                    callHandlers("error", err)
                } else {
                    pollForStatus(info, 10000)
                    callHandlers("started", info)
                }
            }
        } else { // non-continuous
            callBack = function(err, info) {
                console.log("sync callBack", err,  JSON.stringify(info), JSON.stringify(syncDefinition))
                if (err) {
                    if (info.status == 401) {
                        err.status = info.status;
                        callHandlers("auth-challenge", err)
                    } else {
                        err.status = info.status;
                        callHandlers("error", err)
                    }
                } else {
                    callHandlers("connected", info)
                }

            }
        }
        console.log("start sync", JSON.stringify(syncDefinition));
        coax.post([serverUrl, "_replicate"], syncDefinition, callBack)
    }

    function processTaskInfo(id, cb) {
        
        taskInfo(id, function(err, task) {
                 console.log("task", JSON.stringify(task));
            publicAPI.task = task
            if (task.error && task.error[0] == 401) {
                cb(true)
                callHandlers("auth-challenge", {status : 401, error : task.error[1]})
            } else if (task.status == "Idle" || task.status == "Stopped" || (/Processed/.test(task.status) && !/Processed 0/.test(task.status))) {
                cb(true)
                callHandlers("connected", task)
            } else if (/Processed 0 \/ 0 changes/.test(task.status)) {
                cb(true) // I think we only get this if we are connected
                callHandlers("connected", task)
            } else {
                cb(false) // not done
            }
        })
    }

    function taskInfo(id, cb) {
        coax([serverUrl,"_active_tasks"], function(err, tasks) {
            var me;
             console.log("active tasks info -"+JSON.stringify(tasks));
            for (var i = tasks.length - 1; i >= 0; i--) {
                if (tasks[i].task == id) {
                    me = tasks[i]
                }
            }
            cb(false, me);
        })
    }

    var publicAPI = {
        start : doStartPost,
        cancel : doCancelPost,
        on : function(name, cb) {
            handlers[name] = handlers[name] || []
            handlers[name].push(cb)
        }
    }
    return publicAPI;
}
