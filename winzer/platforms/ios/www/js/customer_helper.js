

var currentSelectedCustomer = "";


/*ssssssssssssssssssssssssssssssssss start  ssssssssssssssssssssssssssssssssssssssssss*/

var dt = new Date();

var checkOldContent="";

var mMonth=(parseInt(dt.getMonth())+1);
var mDate=parseInt(dt.getDate());


function addPopupLabel(){
    
    
    
    var notes = document.getElementById('notetext').value;
    
    if(notes==""){
        showCustomAlert("Please write some note !");
        
    }
    else{
        
        if(notes!=checkOldContent){
            
            checkOldContent=notes;
            
            addPopupLabelContent();
            
        }
        
        else{
            
            //            var retVal = confirm("Do you want to add note ?");
            //            if( retVal == true ){
            //                addPopupLabelContent();
            //                return true;
            //            }
            //            else{
            //
            //                return false;
            //            }
            
            
            
            navigator.notification.confirm(
                                           'Are you sure want to add this note ?',  // message
                                           onConfirm,              // callback to invoke with index of button pressed
                                           'Winzer Alert!',            // title
                                           'Yes,No'          // buttonLabels
                                           );
            
            
            
        }
    }
    
}



function onConfirm(buttonIndex) {
    
    
    if(buttonIndex==1)
        addPopupLabelContent();
}



function addPopupLabelContent(){
    
    var notes = document.getElementById('notetext').value;
    
    if(mMonth<10){
        
        
        if(mDate<10){
            //  $('#notetime').prepend("<div id=\"\"style=\"margin-top:5px;\">0"+mMonth+"/0"+mDate+"</div>");
            $('#notetime').prepend("<tr style=\"width:100%\"> <td valign=\"top\">0"+mMonth+"/0"+mDate+" </td><td style=\"padding-left:50px; width:100%;\" valign=\"top\">"+notes+"</td></tr>");
            
        }
        else{
            //        $('#notetime').prepend("<div id=\"\"style=\"margin-top:5px;\">0"+mMonth+"/"+mDate+"</div>");
            $('#notetime').prepend("<tr style=\"width:100%\"> <td valign=\"top\">0"+mMonth+"/"+mDate+" </td><td style=\"padding-left:50px; width:100%;\" valign=\"top\">"+notes+"</td></tr>");
        }
        
        
    }
    else{
        
        
        if(mDate<10){
            //          $('#notetime').prepend("<div id=\"\"style=\"margin-top:5px;\">"+mMonth+"/0"+mDate+"</div>");
            $('#notetime').prepend("<tr style=\"width:100%\"> <td valign=\"top\">"+mMonth+"/0"+mDate+" </td><td style=\"padding-left:50px; width:100%;\" valign=\"top\">"+notes+"</td></tr>");
            
        }
        else{
            //           $('#notetime').prepend("<div id=\"\"style=\"margin-top:5px;\">"+mMonth+"/"+mDate+"</div>");
            $('#notetime').prepend("<tr style=\"width:100%\"> <td valign=\"top\">"+mMonth+"/"+mDate+" </td><td style=\"padding-left:50px; width:100%;\" valign=\"top\">"+notes+"</td></tr>");
        }
        
    }
    
    //        $('#addlabel').prepend("<div id=\"\"style=\"margin-top:5px;\">"+notes+"</div>");
    
    
}

/*ssssssssssssssssssssssssssssssssss finish  ssssssssssssssssssssssssssssssssssssssssss*/






function getAllCustomers(){
    
     var customerSyncCountInLocalDb = parseInt(localStorage.customerseq);
    
    if(customerSyncCountInLocalDb<111){
        showCustomAlert("Sync is in progress, please wait..");
        return 0;
    }
    
    
    
    var element = document.getElementById("customerNameSort");
    element.classList.add("active");
    
    loadingWithMsg('show','Loading Customers...');
    configCustomer.views(["listCustomer"], function(err, view) {
                         
                         $("#customerList").html = "";
                         var htmlToAppend = "";
                         console.log(JSON.stringify(view.rows));
                         
                         
                         for(index in view.rows){
                         var rowData = view.rows[index].value;
                         console.log(view.rows[index]["value"]["Customer Info"]["Customer Name"]);
                         //                     var custInfo = rowData["Customer Info"];
                         //                     alert(custInfo["Customer Name"]);
                         
                         if(index!=0){
                         htmlToAppend += "<li onclick=\"getCustomerInfo('"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+"');\" class=\"\" style=\"padding:0em 0; margin:0;font-size:13px;\"><a href=\"#dropdowns\" style=\"line-height:15px;\"><i class=\"icon-chevron-right\"></i>"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+" "+view.rows[index]["value"]["Customer Info"]["Customer Number"]+" "+view.rows[index]["value"]["Customer Address"]["Address Line 1"]+" "+view.rows[index]["value"]["Customer Address"]["City"]+" "+view.rows[index]["value"]["Customer Address"]["Zip Code"]+"</a></li>"
                         }
                         else
                         htmlToAppend += "<li id=\"customerfirstli\" onclick=\"getCustomerInfo('"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+"');\" class=\"active\" style=\"padding:0em 0; margin:0;font-size:13px;\"><a href=\"#dropdowns\" style=\"line-height:15px;\"><i class=\"icon-chevron-right\"></i>"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+" "+view.rows[index]["value"]["Customer Info"]["Customer Number"]+" "+view.rows[index]["value"]["Customer Address"]["Address Line 1"]+" "+view.rows[index]["value"]["Customer Address"]["City"]+" "+view.rows[index]["value"]["Customer Address"]["Zip Code"]+"</a></li>"
                         
                         
                         }
                         getCustomerInfo(view.rows[0]["value"]["Customer Info"]["Customer Name"]);
                         $("#customerList").html(htmlToAppend);
                         loadingWithMsg('hide','');
//                         $("#customerNameSort").setAttribute("class", "active");
                         moveBackToPage('customer');
                         $("#customer").trigger('create');
//                         #("customerSearchInput").bind('input', function() {
//                                                       
//                                                       console.log( $(this).val());
//                                                       
//                                                       });
                         }
                         );
    
}

function searchCustomerWithName(){
    
    var srchTxt = $("#customerSearchInput").val();
    
    
    console.log(srchTxt);
    if(srchTxt.length<3)
    {
    }
    else{
        // start search with the text srchTxt
        $("#customerList").html = "";
        var startK = srchTxt;
        var endK = srchTxt+"\u9999"
        configCustomer.views(["listCustomer",{startkey:startK, endkey:endK}], function(err, view) {
                         
                         $("#customerList").html = "";
                         var htmlToAppend = "";
                         console.log(JSON.stringify(view.rows));
                         
                         
                         for(index in view.rows){
                         var rowData = view.rows[index].value;
                         console.log(view.rows[index]["value"]["Customer Info"]["Customer Name"]);
                         //                     var custInfo = rowData["Customer Info"];
                         //                     alert(custInfo["Customer Name"]);
                         
                         htmlToAppend += "<li onclick=\"getCustomerInfo('"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+"');\" class=\"\" style=\"padding:0em 0; margin:0;font-size:13px;\"><a href=\"#dropdowns\" style=\"line-height:15px;\"><i class=\"icon-chevron-right\"></i>"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+" "+view.rows[index]["value"]["Customer Info"]["Customer Number"]+" "+view.rows[index]["value"]["Customer Address"]["Address Line 1"]+" "+view.rows[index]["value"]["Customer Address"]["City"]+" "+view.rows[index]["value"]["Customer Address"]["Zip Code"]+"</a></li>"
                         
                         
                         }
                         
                         $("#customerList").html(htmlToAppend);
                         loading('hide');
                         $('#customerList').listview('refresh');
                         
                          }
                         );
    }
}

function getAllCustomersAccToName(){
    loading('show');
    configCustomer.views(["listCustomer"], function(err, view) {
                         
                         $("#customerList").html = "";
                         var htmlToAppend = "";
                         console.log(JSON.stringify(view.rows));
                         
                         
                         for(index in view.rows){
                         var rowData = view.rows[index].value;
                         console.log(view.rows[index]["value"]["Customer Info"]["Customer Name"]);
                         //                     var custInfo = rowData["Customer Info"];
                         //                     alert(custInfo["Customer Name"]);
                         
                         htmlToAppend += "<li onclick=\"getCustomerInfo('"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+"');\" class=\"\" style=\"padding:0em 0; margin:0;font-size:13px;\"><a href=\"#dropdowns\" style=\"line-height:15px;\"><i class=\"icon-chevron-right\"></i>"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+" "+view.rows[index]["value"]["Customer Info"]["Customer Number"]+" "+view.rows[index]["value"]["Customer Address"]["Address Line 1"]+" "+view.rows[index]["value"]["Customer Address"]["City"]+" "+view.rows[index]["value"]["Customer Address"]["Zip Code"]+"</a></li>"
                         
                         
                         }
                         
                         $("#customerList").html(htmlToAppend);
                         loading('hide');
                         $('#customerList').listview('refresh');
                         
                         }
                         );
    
}


function getCustomerAccToZip(){
    loading('show');
    
    $("#customerNameSort").removeClass("active");
    
    configCustomer.views(["listsOfCustomersZip"], function(err, view) {
                         
                         $("#customerList").html = "";
                         var htmlToAppend = "";
                         console.log(JSON.stringify(view.rows));
                         
                         
                         for(index in view.rows){
                         var rowData = view.rows[index].value;
                         console.log(view.rows[index]["value"]["Customer Info"]["Customer Name"]);
                         //                     var custInfo = rowData["Customer Info"];
                         //                     alert(custInfo["Customer Name"]);
                         
                         htmlToAppend += "<li onclick=\"getCustomerInfo('"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+"');\" class=\"\" style=\"padding:0em 0; margin:0;font-size:13px;\"><a href=\"#dropdowns\" style=\"line-height:15px;\"><i class=\"icon-chevron-right\"></i>"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+" "+view.rows[index]["value"]["Customer Info"]["Customer Number"]+" "+view.rows[index]["value"]["Customer Address"]["Address Line 1"]+" "+view.rows[index]["value"]["Customer Address"]["City"]+" "+view.rows[index]["value"]["Customer Address"]["Zip Code"]+"</a></li>"
                         
                         
                         }
                         
                         $("#customerList").html(htmlToAppend);
                         loading('hide');
                         
                         $('#customerList').listview('refresh');
                         
                         }
                         );
}


function getCustomerShipTo(){
    
    configCustomer.views(["listCustomer",{key:currentSelectedCustomer}], function(err, view) {
                         
                         console.log(JSON.stringify(view.rows));
                         var InfoToShow = "";
                         
                         if(view.rows[index]["value"]["Shipping Locations"].length!=0)
                         {
                         for(index in view.rows){
                         
                         
                         
                         
                         
                         for ( var x in view.rows[index]["value"]["Shipping Locations"])
                         {
                         
                         InfoToShow += " <div  class=\"hero-unit\">"+
                         "<div class=\"hero_inner_box2\">"+
                         "<h4 >Ship To "+x+":</h4>"+

                         "<table class=\"table\">"+
                         "<tbody>"+
                         
                         "<tr>"+
                         "<td>Location Name: "+view.rows[index]["value"]["Shipping Locations"][x]["Location Name"]+"</td>"+
                         "<td>Location Contact: "+view.rows[index]["value"]["Shipping Locations"][x]["Location Contact"]+" </td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Territory Number: "+view.rows[index]["value"]["Shipping Locations"][x]["Territory Number"]+"</td>"+
                         "<td>Freight Carrier: "+view.rows[index]["value"]["Shipping Locations"][x]["Freight Carrier"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Address Line 1: "+view.rows[index]["value"]["Shipping Locations"][x]["Address Line 1"]+"</td>"+
                         "<td>Zip Code: "+view.rows[index]["value"]["Shipping Locations"][x]["Zip Code"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Phone Number: "+view.rows[index]["value"]["Shipping Locations"][x]["Phone Number"]+"</td>"+
                         "<td>City: "+view.rows[index]["value"]["Shipping Locations"][x]["City"]+"</td>"+
                         "</tr>"+
                         
                         
                         
                         "</tbody>"+
                         "</table>"+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>";
                         

                         }
                         
                         
                         
                         
                         }
                         $("#customerInfo").html(InfoToShow);
                         }
                         else{
                         showCustomAlert("No shipping details found for "+currentSelectedCustomer);
                         }
                         }
                         );
    
    
    
}


function getDateStr(dateString){
    var year        = dateString.substring(0,4);
    var month       = dateString.substring(4,6);
    var day         = dateString.substring(6,8);
    
    
    return  month+"/"+day+"/"+year;
}


function deleteHeroUnit(unit){
    $(unit).html("");
//    $("#dashboardwf").trigger("create");
}

function getCustomerInfo(customerName){
     loading('show');
    
    $("#customerfirstli").removeClass("active");
    if(customerName)
    currentSelectedCustomer = customerName;
    
    configCustomer.views(["listCustomer",{key:currentSelectedCustomer}], function(err, view) {
                         
                         console.log(JSON.stringify(view.rows));
                         
                         var InfoToShow = "";
                         
                         for(index in view.rows){
                         
                         var lastSaleDate = getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Purchase Date"]);
                         
                         
                         InfoToShow += "<div class=\"hero-unit\">"+
                         "<div class=\"hero_inner_box2\">"+
                         "<h4 >Summary</h4>"+
                         "<div class=\"span3\"><strong>"+view.rows[index]["value"]["Customer Info"]["Customer Name"]+"</strong></div>"+
                         "<div class=\"span3\"><strong>Acct#</strong>:"+view.rows[index]["value"]["Customer Info"]["Customer Number"]+
                         "</div>"+
                         "<div class=\"span3\"><strong>Order Quote</strong>:"+view.rows[index]["value"]["Customer Info"]["Customer Number"]+
                         "</div>"+
                         "<div class=\"span3\"><strong>Price Leve</strong>:"+view.rows[index]["value"]["Customer Order Setup"]["Discount Code"]+
                         "</div>"+
                         "<div class=\"span3\"><strong>Contact</strong>:"+view.rows[index]["value"]["Customer Info"]["PO Contact"]+
                         "</div>"+
                         "<div class=\"span3\"><strong>Last Sale</strong>:"+lastSaleDate+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>" ;
                         
                         
                         // ************* Add Notes To Customer ************ //
                         
//                         InfoToShow += "<div class=\"hero-unit\">"+
//                         "<div class=\"hero_inner_box2\">"+
//                         "<h4 >Notes</h4>"+
//                         "<div class=\"span5\"><strong>Replacing current...</strong></div>"+
//                         "<div class=\"clearfix\"></div>"+
//                         "</div>"+
//                         "<div class=\"clearfix\"></div>"+
//                         "</div>" ;
                         
                         
                         InfoToShow +="<div class=\"hero-unit\">"+
                         " <div class=\"hero_inner_box2\">"+
                         "<div>"+
                         "<div class=\"span3 pull-left\"><h4 style=\"margin: 0px;\">Notes</h4></div>"+
                         "<div class=\"span1 pull-right\"><a href=\"#addNotesPopup\"  onclick=\"\" data-rel=\"popup\"  data-inline=\"true\" data-transition=\"slide\"><img  src=\"img/add_button.jpg\" width=\"32px\" height=\"32px\"></a></div>"+
                         "</div>"+
                         
                         "<div class=\"clearfix\"></div>"+
                         "<div class=\"span5\"><strong>Replacing current...</strong></div>"+
                         
                         
                         "<div class=\"clearfix\"></div>"+
                         "</div></div>";

                         console.log("A/R Info Customer");
                         
                         // ************ A/R Info Customer ***********///
                         
                         InfoToShow += " <div  class=\"hero-unit\">"+
                         "<div class=\"hero_inner_box2\">"+
                         "<h4 >A/R info</h4>"+
                         "<p style=\"background-color:#f5f5f5; padding:17px; box-shadow:0px 0px 6px #999; color:#333333;; \"><strong>Status</strong></p>"+
                         
                         "<table class=\"table\">"+
//                         "<thead>"+
                         "<tbody>"+
                         "<tr>"+
                         "<td>Current: "+view.rows[index]["value"]["Customer Quality"]["Amount Current"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Amount Current"]+"</td>"+
                         "<td>Total Due: "+view.rows[index]["value"]["Customer Quality"]["Amount Due"]+"<br></td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Amount Due"]+"</td>"+
                         "<td># Chargeback: "+view.rows[index]["value"]["Customer Quality"]["Total Chargeback Count"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Total Chargeback Count"]+"</td>"+
                         
                         "</tr>"+
//                         "</thead>"+
                         
                         "<tr>"+
                         "<td>Over 30: "+view.rows[index]["value"]["Customer Quality"]["Age Amount 30 days"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 30 days"]+"</td>"+
                         "<td>Last Pay: "+getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Payment Date"])+"</td>"+
//                         "<td>"+getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Payment Date"])+"</td>"+
                         "<td># Days: "+view.rows[index]["value"]["Customer Quality"]["Chargeback Days"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Chargeback Days"]+"</td>"+
                         
                         "</tr>"+
                         "<tr>"+
                         "<td>Over 60: "+view.rows[index]["value"]["Customer Quality"]["Age Amount 60 days"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 60 days"]+"</td>"+
                         "<td>Pay Days: "+view.rows[index]["value"]["Customer Quality"]["Total Pay Days"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Total Pay Days"]+"</td>"+
                         "<td>Chargeback Date: "+getDateStr(view.rows[index]["value"]["Customer Quality"]["Chargeback Date"])+"</td>"+
//                         "<td>"+getDateStr(view.rows[index]["value"]["Customer Quality"]["Chargeback Date"])+"</td>"+
                         
                         "</tr>"+
                         "<tr>"+
                         "<td>Over 90: "+view.rows[index]["value"]["Customer Quality"]["Age Amount 90 days"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 90 days"]+"</td>"+
                         "<td>Purchase Date: "+getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Purchase Date"])+"</td>"+
//                         "<td>"+getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Purchase Date"])+"</td>"+
                         "<td></td>"+
//                         "<td></td>"+
                         
                         "</tr>"+
                         "<tr>"+
                         "<td>Over 120: "+view.rows[index]["value"]["Customer Quality"]["Age Amount 120 days"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 120 days"]+"</td>"+
                         "<td>Terms: "+view.rows[index]["value"]["Customer Order Setup"]["Terms Code"]+"</td>"+
//                         "<td>"+view.rows[index]["value"]["Customer Order Setup"]["Terms Code"]+"</td>"+
//                         "<td></td>"+
                         "<td>Shipping Vhse: "+view.rows[index]["value"]["Customer Order Setup"]["Default Whse"]+"</td>"+
                         "</tr>"+
                         
                         "</tbody>"+
                         "</table>"+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>" ;
                         
                         console.log("Customer Info ");
                         
                         // ************* Customer Info ************ //
                         
                         
                         InfoToShow += " <div  class=\"hero-unit\">"+
                         "<div class=\"hero_inner_box2\">"+
                         "<h4 >Contact Info</h4>"+
                         "<p style=\"background-color:#f5f5f5; padding:17px; box-shadow:0px 0px 6px #999; color:#333333;; \"><strong>Bill to Contact:</strong></p>"+
                         
                         "<table class=\"table\">"+
                         "<tbody>"+
                         
                         "<tr>"+
                         "<td>Address: "+view.rows[index]["value"]["Customer Address"]["Address Line 1"]+"</td>"+
                         "<td>Email: "+view.rows[index]["value"]["Customer Info"]["Purchasing Contact Email"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>City/State/ZIP: "+view.rows[index]["value"]["Customer Address"]["City"]+" "+view.rows[index]["value"]["Customer Address"]["State"]+" "+view.rows[index]["value"]["Customer Address"]["Zip Code"]+": </td>"+
                         "<td>Route: "+view.rows[index]["value"]["Customer Order Setup"]["Route Info"]+"</td>"+
                         "</tr>"+

                         "<tr>"+
                         "<td>AP Contact: "+view.rows[index]["value"]["Customer Info"]["AP Contact Email"]+"</td>"+
                         "<td>Contact2: "+view.rows[index]["value"]["Customer Altinfo"]["Phone"]+"</td>"+
                         "</tr>"+
                    
                         "<tr>"+
                         "<td>Phone: "+view.rows[index]["value"]["Customer Address"]["Phone Number"]+"</td>"+
                         "<td>Contact3: "+view.rows[index]["value"]["Customer Altinfo2"]["Phone"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Ship-To 000 ATTN: "+view.rows[index]["value"]["Customer Info"]["PO Contact"]+"</td>"+
                         "<td>Email: "+view.rows[index]["value"]["Customer Info"]["Purchasing Contact Email"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Warehouse: "+view.rows[index]["value"]["Customer Order Setup"]["Default Whse"]+"</td>"+
                         "<td>Fax2: "+view.rows[index]["value"]["Customer Address"]["Fax Number"]+"</td>"+
                         "</tr>"+
                         
                         "</tbody>"+
                         "</table>"+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>";
                         
                         
                         console.log("before Obsolescence");
                         
                         // ************* Obsolescence Info ************ //
                         
                         
                         InfoToShow += " <div  class=\"hero-unit\">"+
                         "<div class=\"hero_inner_box2\">"+
                         "<h4 >Obsolescence</h4>"+
                         
                         "<table class=\"table\">"+
                         "<tbody>"+
                         
                         "<tr>"+
                         "<td>Program Start Date: "+view.rows[index]["value"]["Customer Obsolescence"]["Obsolescence Start Date"]+"</td>"+
                         "<td>Program Status: "+view.rows[index]["value"]["Customer Obsolescence"]["Obsolescence Status"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Program Target: "+view.rows[index]["value"]["Customer Obsolescence"]["Obsolescence Target Amount"]+"</td>"+
                         "<td>Calculation Method: "+view.rows[index]["value"]["Customer Obsolescence"]["Obsolescence Method"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Invoiced Orders: "+view.rows[index]["value"]["Customer Obsolescence"]["Obsolescence Percent"]+"</td>"+
                         "<td>Discount % Per Order: "+view.rows[index]["value"]["Customer Obsolescence"]["Obsolescence Percent"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Open Orders: "+view.rows[index]["value"]["Customer Obsolescence"]["Open Order Obsolescence Amount"]+"</td>"+
                         "<td>Discount $ Per Order: </td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Remaining Disc: </td>"+
                         "</tr>"+
                         
                         
                         "</tbody>"+
                         "</table>"+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>";
                         
                         console.log("end..");
                         
                         for ( var x in view.rows[index]["value"]["Shipping Locations"])
                         {
                         
                         InfoToShow += " <div  class=\"hero-unit\">"+
                         "<div class=\"hero_inner_box2\">"+
                         "<h4 >Ship To "+x+":</h4>"+
                         
                         "<table class=\"table\">"+
                         "<tbody>"+
                         
                         "<tr>"+
                         "<td>Location Name: "+view.rows[index]["value"]["Shipping Locations"][x]["Location Name"]+"</td>"+
                         "<td>Location Contact: "+view.rows[index]["value"]["Shipping Locations"][x]["Location Contact"]+" </td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Territory Number: "+view.rows[index]["value"]["Shipping Locations"][x]["Territory Number"]+"</td>"+
                         "<td>Freight Carrier: "+view.rows[index]["value"]["Shipping Locations"][x]["Freight Carrier"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Address Line 1: "+view.rows[index]["value"]["Shipping Locations"][x]["Address Line 1"]+"</td>"+
                         "<td>Zip Code: "+view.rows[index]["value"]["Shipping Locations"][x]["Zip Code"]+"</td>"+
                         "</tr>"+
                         
                         "<tr>"+
                         "<td>Phone Number: "+view.rows[index]["value"]["Shipping Locations"][x]["Phone Number"]+"</td>"+
                         "<td>City: "+view.rows[index]["value"]["Shipping Locations"][x]["City"]+"</td>"+
                         "</tr>"+
                         
                         
                         
                         "</tbody>"+
                         "</table>"+
                         "</div>"+
                         "<div class=\"clearfix\"></div>"+
                         "</div>";
                         
                         }
                         
                         
                         }
                         
                         $("#customerInfo").html(InfoToShow);
                         
//                         $("#customerSearchForm").html("<input id=\"customerSearchInput\" type=\"text\" class=\"search-query\" placeholder=\"Search\"/>");
                         
                         
                            loading('hide');
                         
                         $("#customer").trigger( "create" );
                         
                         
                         
                         }
                         );
    
    
}



// 6 column ar info

//InfoToShow += " <div  class=\"hero-unit\">"+
//"<div class=\"hero_inner_box2\">"+
//"<h4 >A/R info</h4>"+
//"<p style=\"background-color:#f5f5f5; padding:17px; box-shadow:0px 0px 6px #999; color:#333333;; \"><strong>Status</strong></p>"+
//
//"<table class=\"table table-bordered\">"+
////                         "<thead>"+
//"<tbody>"+
//"<tr>"+
//"<td>Current: </td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Amount Current"]+"</td>"+
//"<td>Total Due: <br></td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Amount Due"]+"</td>"+
//"<td># Chargeback:  </td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Total Chargeback Count"]+"</td>"+
//
//"</tr>"+
////                         "</thead>"+
//
//"<tr>"+
//"<td>Over 30: </td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 30 days"]+"</td>"+
//"<td>Last Pay</td>"+
//"<td>"+getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Payment Date"])+"</td>"+
//"<td># Days</td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Chargeback Days"]+"</td>"+
//
//"</tr>"+
//"<tr>"+
//"<td>Over 60: </td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 60 days"]+"</td>"+
//"<td>Pay Days</td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Total Pay Days"]+"</td>"+
//"<td>Chargeback Date</td>"+
//"<td>"+getDateStr(view.rows[index]["value"]["Customer Quality"]["Chargeback Date"])+"</td>"+
//
//"</tr>"+
//"<tr>"+
//"<td>Over 90: </td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 90 days"]+"</td>"+
//"<td>Purchase Date</td>"+
//"<td>"+getDateStr(view.rows[index]["value"]["Customer Quality"]["Last Purchase Date"])+"</td>"+
//"<td></td>"+
//"<td></td>"+
//
//"</tr>"+
//"<tr>"+
//"<td>Over 120: </td>"+
//"<td>"+view.rows[index]["value"]["Customer Quality"]["Age Amount 120 days"]+"</td>"+
//"<td>Terms</td>"+
//"<td>"+view.rows[index]["value"]["Customer Order Setup"]["Terms Code"]+"</td>"+
//"<td></td>"+
//"<td></td>"+
//"</tr>"+
//
//"</tbody>"+
//"</table>"+
//"</div>"+
//"<div class=\"clearfix\"></div>"+
//"</div>" ;

