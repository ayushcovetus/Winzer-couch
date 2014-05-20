
var catalogIndexingComplete = false;
var addToCart_arr= new Array();
var addToCart_Quaarr=new Array();
var addToCart_doc;

var filterOptionsHtml = "";
var currentLastLevelCategory = "";


function catalogIndexing(){
     $("#syncState").html("Catalog indexing...Please wait...");
    loadingWithMsg("show","Setting up Catalog...");
    config.views(["listTopLevelCateg"], function(err, view) {
                 
                 if(err){
//                  loadingWithMsg('hide','');
                 loadingWithMsg("show","Setting up Catalog...");
                        catalogIndexing();
                  console.log(" catalog indexing... listTopLevelCateg.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 
                 
                 listsIndexing();
                 
                 
                 }
                 
                 
                 });
    
    
}

function listOfProductsIndexing(){
    console.log("in catalog indexing... listTopLevelCateg.... success!!");
    var startK = "038";
    var endK = "038"+"\u9999";
     loadingWithMsg("show","Setting up Catalog...");
    config.views(["getProductForFilterWithNumber",{limit:20}], function(err, view) {
                 
                 if(err){
//                 loadingWithMsg('hide','');
                 listOfProductsIndexing();
                 console.log("in catalog indexing... listsOfProducts.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                  console.log("in catalog indexing... quick search 038.... success!!");
//                listsIndexing();
                 console.log("localStorage.catalogIndexingComplete- "+localStorage.catalogIndexingComplete);
                 listsCategByTitle();
                 }
                 
                 });
}


function listsCategByTitle(){
    console.log("in catalog indexing... listsCategByTitle.... success!!");
    loadingWithMsg("show","Setting up Catalog...");
    config.views(["lists",{limit:20}], function(err, view) {

                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listsCategByTitle();
                 console.log("in catalog indexing... listsCategByTitle.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                    console.log("in catalog indexing... listsCategByTitle.... success!!");
                 listAllCustomers();
                 }
                 
                 
                 });
}

function listAllCustomers(){
    console.log("in catalog indexing... listsCategByTitle.... success!!");
    config.views(["listCustomer",{limit:20}], function(err, view) {
                 
                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listAllCustomers();
                 console.log("in catalog indexing... listAllCustomers.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 console.log("in catalog indexing... listAllCustomers.... success!!");
                 listsOfCustomersZip();
                 }
                 
                 
                 });
}
function listsOfCustomersZip(){
    console.log("in catalog indexing... listAllCustomers.... success!!");
    config.views(["listsOfCustomersZip",{limit:20}], function(err, view) {
                 
                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listsOfCustomersZip();
                 console.log("in catalog indexing... listsOfCustomersZip.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 console.log("in catalog indexing... listsOfCustomersZip.... success!!");
                 listsOfCustomersLastPurchse();
                 }
                 
                 
                 });
}
function listsOfCustomersLastPurchse(){
    console.log("in catalog indexing... listsOfCustomersZip.... success!!");
    config.views(["listsOfCustomersLastPurchase",{limit:20}], function(err, view) {
                 
                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listsOfCustomersLastPurchse();
                 console.log("in catalog indexing... listsOfCustomersLastPurchse.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 console.log("in catalog indexing... listsOfCustomersLastPurchse.... success!!");
                 listOfProductswithPno();
                 }
                 
                 
                 });
}
 var tempVariableForCompletingIndex = 0;

function listOfProductswithPno(){
    console.log("in catalog indexing... listOfProductsIndexing.... success!!");
    config.views(["listsOfProductsWithPno",{limit:20}], function(err, view) {
                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listOfProductswithPno();
                 console.log("in catalog indexing... listOfProductsIndexing.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 loadingWithMsg('hide','');
                 console.log("in catalog indexing... listOfProductswithPno.... success!!");
                 $("#syncState").html("<strong>Catalog Sync Complete!!</strong>");
                 loadingWithMsg('hide','');
                 console.log("localStorage.catalogIndexingComplete- "+localStorage.catalogIndexingComplete);
                 
                
                 
                 $("#firstSyncStatus").html("");
                 
                 localStorage.catalogIndexingComplete = "true";
//                 tempVariableForCompletingIndex++;
                 
                 
                 console.log("tempVariableForCompletingIndex- "+tempVariableForCompletingIndex+"numberOfCatalogIndexCalled- "+numberOfCatalogIndexCalled);
                 if(tempVariableForCompletingIndex==0){
                 localStorage.imagesyncComplete = "true";
                 afterCounts();
                 tempVariableForCompletingIndex++;
                 
                 }
                 }
                 
                 });
}

function listOfProductsIndexingWithName(){
//    var startK = srchTxt;
//    var endK = srchTxt+"\u9999"
     console.log("in catalog indexing... lists.... success!!");
    config.views(["getProductForFilterWithName",{limit:20}], function(err, view) {
                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listOfProductsIndexingWithName();
                 console.log("in catalog indexing... getProductForFilterWithName.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 listProDuctIndexing();
                 }
                 
                 });
}

function listsIndexing(){
    console.log("in catalog indexing... listsOfProducts.... success!!");
       loadingWithMsg("show","Setting Up Catalog.....");
    config.views(["listsOfCategories",{limit:20}], function(err, view) {
                 
                 if(err){
//                 loadingWithMsg('hide','');
                 listsIndexing();
                 console.log("in catalog indexing... lists.... error!!"+JSON.stringify(err));
                 
                 }
                 else
                 {
                 listOfProductsIndexingWithName();
                
//                 $("#syncState").html("<strong>Catalog Sync Complete!!</strong>");
//                 loadingWithMsg('hide','');
//                 localStorage.catalogIndexingComplete = true;
//                 isCatalogIndexingComplete = true;
//                 setupImageDbTrigger();
                 }
                 
                 
                 });
}

function listProDuctIndexing(){
    config.views(["listsOfProductsByCatSeq",{startkey:["CV Boot",null], endkey:["CV Boot","\u0fff"]}], function(err, view) {
                 
                 
                 if(err){
                 //                 loadingWithMsg('hide','');
                 listProDuctIndexing();
                 console.log("in catalog indexing... lists.... error!!"+JSON.stringify(err));
                 
                 }
                 else{
                 listOfProductsIndexing();
                 }
                 
                 });
}



function resetAccordion(){
    
    
    document.getElementById("b").style.left = "151px";
    document.getElementById("accordion_b").style.backgroundImage="url('img/arrow.png')";
document.getElementById("c").style.left = "199px";
    
   // $('#basic').accordionPro("prev");
    
//    
//    $('#basic').accordionPro({"orientation":"horizontal","theme":"basic"
//                             ,horizontalWidth:240,
//                             horizontalHeight: 700
//                             });
//    
    
    
   
}


function getBaseCategFromLocalDb(page){

    
  

    
    
    var recordSyncCountInLocalDb = parseInt(localStorage.seq);
    var recordCounts = parseInt(localStorage.catalogCount);
   
    document.getElementById("liProductcatalog").className = "active";
    document.getElementById("liQuickSearch").className = "";
    document.getElementById("liPartPrefix").className = "";
    
//    document.getElementById("b").style.left="151px";
//    document.getElementById("accordion_b").style.backgroundImage="url('img/arrow.png')";
//    document.getElementById("c").style.left="199px";
//    document.getElementById("accordion_b").style.backgroundImage="url('img/arrow.png')";
    
    
    resetAccordion();
    
    console.log("ocalStorage.seq:"+localStorage.seq+"--localStorage.catalogCount:"+localStorage.catalogCount);
    
//    if(recordSyncCountInLocalDb<=recordCounts)
//    {
//        showCustomAlert("Sync is in progress, please wait..");
//        return 0;
//    }
    
    
    
    
        
//   if(localStorage.catalogCallCount==0)
    
    console.log("localStorage.isCatalogIndexingComplete - "+localStorage.catalogIndexingComplete);
    localStorage.catalogIndexingComplete="true";
    if(localStorage.catalogIndexingComplete=="true")
    {
    
    $("#bradcrumMain").html("<strong><a onclick=\"getBaseCategFromLocalDb('login')\"><font color=\"#000\">Catalog</font></a></strong>");
    loadingWithMsg("show","Loading Products...");
    
    
        $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
        
    $("#mainHeadCatalog").html("Catalog");
    
   
    
    $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
    
    
    config.views(["listTopLevelCateg",{decending:true}], function(err, view) {
                 
                 
                 $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
                 $("#filter_options_ul").trigger('create');
                 
                 if(err){
                 console.log("errorr retrieving catalog products -"+JSON.stringify(err));
//                 showCustomAlert("Unable to retrieve products, please try again....");
                 loading('hide');
                 }
                 
                 console.log("view - "+JSON.stringify(view));
                 
                 if(view.rows.length==0){
                 loading('hide');
                 showCustomAlert("Sync is in progress, please try after sometime...");
//                  $.mobile.changePage( $("#dashboardwf"), { transition: "slide", reverse: true,  reloadPage:true, changeHash:true});
                 return;
                 }
//                    document.getElementById("b").style.left="151px";
                bradcrumArry = ["Catalog"];
//                 alert(imageFromDB);
//                 listsIndexing();
                 tempPathArray = [];
                 $("#sync_status").html("");
                 $("#content").html("");
                 $("#content1").html("");
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"> <div id=\"wrapper1\"><div id=\"scroller1\" style=\"padding-left:25px;padding-top:15px;\"> ";
                 
                 for(index in view.rows){
//                 && view.rows[index].value.cat_title!="Business Supplies"
                 
                 if(view.rows[index].value.cat_title!="Home"  && view.rows[index].value.cat_title!="")
                 baseCateghtml += "<div  onclick=\"getchildcategories('"+view.rows[index].value.cat_title+"');\" class=\"span3 main_product\" style=\"height:145px;margin-left:-1%;\">"
                 +"<div style=\"height:20px;\"><p>"+view.rows[index].value.cat_title+"</p></div>"
                 +"<div class=\"inner_dashbord\"><img style=\"max-height:70px;\" id=\""+view.rows[index].value.cat_title+"\"  src=\"img/animated_loading.gif\"  onError=\"this.src = 'images/img_not_available_160_160.jpg'\" height=\"195\"></div>"
                 +"</div>";
                 
//                 var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
//                 var imageCounts =   parseInt(localStorage.imageCount);
//                 if(imageSyncCountInLocalDb>=imageCounts)
                 getImage64withId(view.rows[index].value.cat_image,view.rows[index].value.cat_title);
                 
                 
                 }
                 
                 baseCateghtml +="</div></div></div></div><div class=\"clearfix\"></div>";
                 
                 loadingWithMsg('hide','');
                 $("#baseCategwf").html(baseCateghtml);
                  $.mobile.changePage( $("#login"), { transition: "slide", reverse: true,  reloadPage:true, changeHash:true});
                 $('#wrapper1').slimScroll({
                                                    height: '485px'
                                           });

                 
                
                 $("#login").trigger( "pagecreate" );
                 
                 });
    
    }
    else{
        showCustomAlert("Indexing is in progress, please wait..");
        
    }
    
}

// ************** Getting images from local db *********************//


function getImage64withId(id,srcId){
    
    var imgId = id ;
    var currDate = new Date();
    var currTime = currDate.getTime();
    console.log("finding image for - "+imgId);
    
    if(id!=null){
    config.db.get(imgId, function(err, view){
                           
                           
                           if(err){
                            console.log("err - "+ JSON.stringify(err));
                           }
                           else{
                           document.getElementById(srcId).setAttribute( 'src', 'data:image/jpg;base64,'+view.image_data);
                           }
                           });
    }
    
    
   
    
    
}



// ************** Getting Child Categories and product list  *************** //
var globalAttributArray = [];
var globalArrtHoldingArray = [];
var imageArray = [];
var tempPathArray = [];

var jsondataForThirdLevelCateg;

function getchildcategories(findsubCategFor){
    
    loadingWithMsg('show','Loading Products for '+findsubCategFor);
    
    document.getElementById("liProductcatalog").className = "active";
    document.getElementById("liQuickSearch").className = "";
    document.getElementById("liPartPrefix").className = "";
    
    
//    document.getElementById("b").style.left="151px";
//    document.getElementById("accordion_b").style.backgroundImage="url('img/arrow.png')";
    resetAccordion();
    
    console.log("rrrrrrr"+findsubCategFor);
    
    if(findsubCategFor=="Catalog"){
        getBaseCategFromLocalDb('login');
        bradcrumArry = ["Catalog"];
        return;
    }
    
    console.log("find sub-categ for - "+findsubCategFor);
    $("#mainHeadCatalog").html("Catalog");
    config.views(["listsOfCategories",{startkey: [[findsubCategFor],null],endkey:[[findsubCategFor],"\u0fff"],decending:false}], function(err, view) {
                 if(!err){
                 $("#contentOneLvl").html("");
                 if(view.rows.length==0)
                 {
                 getProductsForTheParentWithoutFilters(findsubCategFor);
                 
                 return;
                 }
                
                 jsondataForThirdLevelCateg = view.rows;
//                 console.log("response - "+JSON.stringify(view));
                 tempPathArray.push(findsubCategFor);
                 var assignableArray = [];
                 for(var i=0; i<tempPathArray.length;i++){
                        if(tempPathArray[i]!=findsubCategFor)
                            assignableArray.push(tempPathArray[i]);
                 else{
                  assignableArray.push(tempPathArray[i]);
                 break;
                 }
                 }
                 console.log("assingable arry -"+assignableArray);
                 
                 tempPathArray = assignableArray;
                 
                
                 
                 console.log("tempPathArray - "+tempPathArray.length);
                 
                 if(tempPathArray.length!=2){
                    $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
                 }
                 
                   document.getElementById("b").style.left="151px";
                 
                 
                 $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\">");
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"wrapperSlimScroll\">";
                 
                 bradcrumArry.push(findsubCategFor);
                 
                 getchildcategorieswithBradcrum(findsubCategFor);
                 
                 console.log(JSON.stringify(view.rows[0].value));
                  var totalSubCategoriesFound = 0;
                 for(index in view.rows){
                 tempPathArray.push(view.rows[index].value.cat_title);
                 
                 
                 console.log("document path for "+findsubCategFor+" - "+view.rows[index].value.cat_paths+" and the tempArray - "+tempPathArray);
                 
                 
                 var catPathArray = view.rows[index].value.cat_paths[0];
                 
                 console.log("array equals - "+arraysEqual(catPathArray,tempPathArray));
                 
                 
                 console.log("img -"+imageArray);

                 
                 
                 if(arraysEqual(catPathArray,tempPathArray)){
                 totalSubCategoriesFound++;
                 baseCateghtml += "<div  onclick=\"getchildcategories('"+view.rows[index].value.cat_title+"');\" class=\"span3 main_product\" style=\"height:165px;margin-left:-1%;\">"
                 +"<div style=\"height:35px;display:table-cell; vertical-align:bottom; position:relative;\">"+view.rows[index].value.cat_title+"</div>"
                 +"<div class=\"inner_dashbord\"><img style=\"max-height:70px;\"  id=\""+view.rows[index].value.cat_title+"\" src=\"img/animated_loading.gif\" onError=\"this.src = 'images/img_not_available_160_160.jpg'\" width=\"auto\" height=\"auto\"></div>"
                 +"</div>";
                 
                 
                 
//                 $("#filter_options_ul").append(""+view.rows[index].value.attributes + attributesArray.length());
                 
//                 var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
//                 var imageCounts =   parseInt(localStorage.imageCount);
//                 if(imageSyncCountInLocalDb>=imageCounts)
                 getImage64withId(view.rows[index].value.cat_image,view.rows[index].value.cat_title);
                 
                 
                 }
                 
                 tempPathArray.pop();
                 
                 
                 
                 
                 
                 
                 }
                 baseCateghtml += "</div></div></div><div class=\"clearfix\"></div>";
                 
                 console.log("total subcategories found = "+totalSubCategoriesFound);
                 
                 if(totalSubCategoriesFound==0){
                 getProductsForTheParentWithoutFilters(findsubCategFor);
                 return;
                 }
                 
                 $("#baseCategwf").html(baseCateghtml);
                 $('#wrapperSlimScroll').slimScroll({
                                                    height: '485px',
                                                    alwaysVisible: true
                                                    });
                 
                 
                 loadingWithMsg('hide','');
                  $("#login").trigger( "pagecreate" );
                 }
                 else
                 showCustomAlert("Unable to retrieve products, please try again...");
                 
                 loadingWithMsg('hide','');
                 });
    
}
var productAttributeArray = [];
var productAttributeValueArray = [];

function eleContainsInArray(arr,element){
    if(arr != null && arr.length >0){
        for(var i=0;i<arr.length;i++){
            if(arr[i] == element)
                return true;
        }
    }
    return false;
}

function resetFilterPartPrefix(){
    $("#filter_options_ul").html(filterOptionsHtml);
    $("#filter_options_ul").trigger('create');
    
    try{
        for (var i=0;i<globalArrtHoldingArray.length;i++){
            globalAttributArray[i][0] = "";
        }
    }
    catch(e){
        console.log("exception");
    }
    selectedRadio = [];
    getPartPrefixWithNumber(lastSearchedNumberForPartPrefix);
    
}

function resetFilterForQuickSearch(){
    $("#filter_options_ul").html(filterOptionsHtml);
    $("#filter_options_ul").trigger('create');
    
    
    try{
    for (var i=0;i<globalArrtHoldingArray.length;i++){
        globalAttributArray[i][0] = "";
    }
    }
    catch(e){
        console.log("exception");
    }
    selectedRadio = [];
    quickSearchWithText();
}

function resetFilter(){
    $("#filter_options_ul").html(filterOptionsHtml);
    $("#filter_options_ul").trigger('create');
    
//    console.log("globalArrtHoldingArray - "+globalArrtHoldingArray);
    try{
    for (var i=0;i<globalArrtHoldingArray.length;i++){
        globalAttributArray[i][0] = "";
    }
    }
    catch(e){
        console.log("catch - "+e);
    }
    
    selectedRadio = [];
    
    getProductsForTheParentWithoutFilters(currentLastLevelCategory);
}


function makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex){
    
    
    
    
    
    console.log("global Array - "+globalAttributArray);
    console.log("global holdin array -"+globalArrtHoldingArray);
    
    
    console.log(eleContainsInArray(productAttributeValueArray,attributeVal));
    
    var temp1Val = [];
    var temp2Attr = [];
    
    if(!eleContainsInArray(globalAttributArray[arrayIndex],attributeVal)){
        console.log("not exists");
        globalAttributArray[arrayIndex][0] = attributeVal;
    }
    else{
        console.log("already exists");
        for(var i=0;i<globalAttributArray[arrayIndex].length;i++){
            console.log("ARRAY ELEMENT - "+globalAttributArray[arrayIndex][i]);
            if(globalAttributArray[arrayIndex][i]!=attributeVal){
                console.log("not already exists");
//                temp1Val.push(globalAttributArray[arrayIndex][i]);
                temp2Attr[0] = globalAttributArray[arrayIndex][i];
            }
            
        }
        globalAttributArray[arrayIndex] = temp2Attr;
//        productAttributeValueArray = temp1Val;
        
        
    }
    
    console.log("for the Attribute - "+globalArrtHoldingArray[arrayIndex]+"global Array - "+globalAttributArray[arrayIndex]);
    
    
    
    

}
function filterMultipleProductsForQuickSearch1(arrayIndex,prodAttribute,attributeVal,searchFor){
    
    
    console.log("arrayIndex - "+arrayIndex+" prodAttribute - "+prodAttribute+" attributeVal - "+attributeVal+" searchFor - "+searchFor);
    
    
    var matchingProductsArray = [];
    var currentProdctCountWhichDisplayes = 0;
    loadingWithMsg( 'show','Searching products' );
    
    globalArrtHoldingArray = arrayOfProducts;
    
    makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex);
    
    var temp_match_str = prodAttribute+attributeVal;
    
    if(eleContainsInArray(selectedRadio,temp_match_str)){
        
        var tempSelectedRadioArray = [];
        for(var tempA=0;tempA<selectedRadio.length;tempA++){
            
            
            
            if(selectedRadio[tempA]==temp_match_str){
                for(indexlast in globalAttributArray){
                    console.log(attributeVal+" - lastGlobalAttrArray - "+globalAttributArray[indexlast][0]);
                    if(globalAttributArray[indexlast][0]==attributeVal){
                        globalAttributArray[indexlast][0] = "";
                    }
                }
                
            }
            else
            {
                tempSelectedRadioArray.push(selectedRadio[tempA]);
            }
            
            
            
        }
        selectedRadio = tempSelectedRadioArray;
        
    }
    else
        selectedRadio.push(temp_match_str);

    
    
    
    
    var htmlForFilterBradcrum = "";
    
    console.log("global array - "+globalArrtHoldingArray);
    
    lastGlobalAttrHoldingArray = globalArrtHoldingArray;
    lastGlobalAttrArray = [];
    
    for(var kk=0;kk<globalAttributArray.length;kk++){
        lastGlobalAttrArray.push(globalAttributArray[kk]);
    }

    
    
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    
    
    
    for (var i=0;i<globalAttributArray.length; i++){
        console.log("globalAttributArray - "+globalAttributArray[i])
        if(globalAttributArray[i]!=""){
            htmlForFilterBradcrum += globalArrtHoldingArray[i]+"-"+globalAttributArray[i]+" > ";
        }
    }
    
    
    var countT = 0;
    var qwer=0;
    
    var srchTxt = $("#search-mini").val();
    var startK = srchTxt;
    var endK = srchTxt+"\u9999";
    config.views([searchFor,{startkey:startK, endkey:endK}], function(err, encodedJSON) {
                 
                 
                 
                 var quickSrchhtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
                 "<div class=\"some-content-related-div\">"+
                 "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 39%;\">Description</th>"+
                 "            <th style=\"width: 16%;\">Part No.</th>"+
                 "            <th style=\"width: 16%;\">Price</th>"+
                 "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
                 "            <td style=\"width: 13%;\" id=\"totalProductsCount1\">"+
                 "<div id=\"currentProductFound\" style='width: 20px; font-size: 10px;'></div><div id=\"totalProductCountForTheCategory\" style='width: 80px; font-size: 10px; position: absolute; top: 18px; right: 13px;'>of xxx Items</div>"+
                 "</td>"+
                 "        </tr>"+
                 "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
                 "<div id=\"partPrefixList\" >";
                 
                 
                 
                 
                 var totalProductsFoundAfterFilter = 0;
                 var count_2=0;
                 for(index in globalArrtHoldingArray){
                 
                 if(globalAttributArray[index].length>0){
                 break;
                 }
                 count_2++;
                 }
                 
                 
                 if(count_2 == globalArrtHoldingArray.length){
                 getProductsForTheParentWithoutFilters(currentLastLevelCategory);
                 }
                 try{
                 for(index in encodedJSON.rows){
                 
                 
                 var conditionsSatisfied = 0;
                 
                 
                 for (var holdingIndex in globalArrtHoldingArray){
                 
                 var isProductMatch = false;
                 
                 
                 
                 var productAttributeForSpec = globalArrtHoldingArray[holdingIndex];
                 
                 if(globalAttributArray[holdingIndex].length==0 || globalAttributArray[holdingIndex][0]==""){
                 conditionsSatisfied++;
                 }
                 
                 for(var indiIndex in globalAttributArray[holdingIndex]){
                 
                 
                 
                 
                 if(encodedJSON.rows[index].value.specs)
                 if(encodedJSON.rows[index].value.specs[productAttributeForSpec] == globalAttributArray[holdingIndex][indiIndex]){
                 conditionsSatisfied++;
                 totalProductsFoundAfterFilter++;
                 }
                 }
                 }
                 if(conditionsSatisfied == globalArrtHoldingArray.length){
                 countT++;
                 matchingProductsArray.push(encodedJSON.rows[index]);
                 }
                 }
                 }catch(exception){
                 
                 }

                 for(index2 in matchingProductsArray){
                 
                 if(index2<100){
                 
                 currentProdctCountWhichDisplayes++;
                 
                 
                 quickSrchhtml += "<tr>"+
                 "<td style=\"width: 39%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index2].id+"');\">"+matchingProductsArray[index2].value.title+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index2].id+"');\">"+matchingProductsArray[index2].value.pno+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index2].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index2].id+"');\">"+matchingProductsArray[index2].value.package_qty+"</td>"+
                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                 "<div class=\"span7\">"+
                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                 "</div>"+
                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                 "</div>"+
                 "</td>"+
                 "</tr>";
                 
                 
//                 var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
//                 var imageCounts =   parseInt(localStorage.imageCount);
//                 if(imageSyncCountInLocalDb>=imageCounts)
                 getImage64withId(matchingProductsArray[index2].value.img,matchingProductsArray[index2].value.title);
                 
                 }
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 for(index_key in matchingProductsArray[index2].value.specs){
                 
                 console.log("111****** "+JSON.stringify(matchingProductsArray[index2].value.specs));
                 
                 var t=0;
                 
                 t = arrayOfProducts.indexOf(index_key);
                 
                 if(t < 0)
                 {
                 t = arrayOfProducts.length;
                 arrayOfProducts.push(index_key);
                 var temp_1 = parseInt(arrayOfProducts.length)-1;
                 arrayOfHoldingArrays[temp_1]=new Array();
                 
                 arrayOfHoldingArrays[temp_1].push(matchingProductsArray[index2].value.specs[index_key]);
                 }
                 else
                 {
                 var product_index= arrayOfProducts.indexOf(index_key);
                 var q = arrayOfHoldingArrays[product_index].indexOf(matchingProductsArray[index2].value.specs[index_key]);
                 
                 if(q < 0)
                 {
                 arrayOfHoldingArrays[product_index].push(matchingProductsArray[index2].value.specs[index_key]);
                 }
                 }
                 
                 }
                 
                 console.log("success---4");
                 
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index2)+1;
                 console.log("success---5"+index2);
                 if(matchingProductsArray.length == temp_2){
                 
                 console.log("success---6");
                 
                 var temp_html;
                 var html_hoalder_Array =new Array();
                 var bg_color_product_id_Array =new Array();
                 
                 for(attribute in arrayOfProducts){
                 
                 
                 globalAttributArray[attribute] = new Array();
                 
                 
                 
                 for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                 console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                 if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[attribute]){
                 globalAttributArray[attribute].push(lastGlobalAttrArray[temp]);
                 
                 }
                 }

                 
                 
                 temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                 temp_html += "<h3  id="+attribute+"_h><strong>"+arrayOfProducts[attribute]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                 "<fieldset data-role=\"controlgroup\">";
                 
                 
                 arrayOfHoldingArrays[attribute].sort();
                 
                 for(var attIndex in arrayOfHoldingArrays[attribute]){
              
                 
                 var isRadio = false;
                 var tt=0;
                 for(;tt<selectedRadio.length;tt++){
                 
                 console.log(tt+" ++ "+selectedRadio.length+" ++ "+selectedRadio[tt]+" ++ "+arrayOfHoldingArrays[attribute][attIndex]);
                 var tempSelectedStr = arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex];
                 if(selectedRadio[tt]==tempSelectedStr){
                 isRadio = true;
                 break;
                 }
                 }
                 if(tt == selectedRadio.length){
                 isRadio = false;
                 }
                 
                 if(!isRadio){
                 temp_html += "<input onclick=\"filterMultipleProductsForQuickSearch1("+attribute+",'"+arrayOfProducts[attribute]+"','"+arrayOfHoldingArrays[attribute][attIndex]+"','"+searchFor+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[attribute]+"\" name=\"checkbox-"+arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\" />"+
                 "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\">"+arrayOfHoldingArrays[attribute][attIndex]+"</label>";
                 }
                 else{
                  bg_color_product_id_Array.push(attribute+"_h");
                 temp_html += "<input onclick=\"filterMultipleProductsForQuickSearch1("+attribute+",'"+arrayOfProducts[attribute]+"','"+arrayOfHoldingArrays[attribute][attIndex]+"','"+searchFor+"');\" type=\"radio\" checked=\"checked\" name=\"radio-"+arrayOfProducts[attribute]+"\" name=\"checkbox-"+arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\" />"+
                 "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\">"+arrayOfHoldingArrays[attribute][attIndex]+"</label>";
                 }
                 
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
                 
                 $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilterForQuickSearch();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                 
                 
                 
//                                                   +"<div onclick=\"resetFilterForQuickSearch();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                 
                 $("#filter_options_ul").trigger( "create" );
                 for(var rr=0;rr<bg_color_product_id_Array.length;rr++){
                 document.getElementById(bg_color_product_id_Array[rr]).style.backgroundColor="gray";
                 }
                 }
                 
                 
                 
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 
                 }
                 
                 
                 
                  quickSrchhtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
                 loadingWithMsg( 'hide','' );
                 $("#baseCategwf").html(quickSrchhtml);
//                 $("#filterBradcrum").html(htmlForFilterBradcrum);
                 $("#currentProductFound").html(currentProdctCountWhichDisplayes);
                 $("#totalProductCountForTheCategory").html(" of "+countT+" Items.");
                 $("#baseCategwf").trigger('create');
                  var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });

                 
                 
                 
                 myScroll.on('scrollEnd', function(){
                             var clientHeight = document.getElementById('table_body').clientHeight;
                             var finalDiff = clientHeight+this.y;
                             
                             var isProductLoading = false;
                             
                             
                             if(this.y==0){
                             console.log("top");
                             }
                             else if(finalDiff == 420 && !isProductLoading){
                             
                             var extraRowsToBeAdded = "";
                             
                             var lastIndexForAlreadyDisplayedProducts = currentProdctCountWhichDisplayes;
                             var limitToExtend = lastIndexForAlreadyDisplayedProducts + 100;
                             
                             
                             
                             if(matchingProductsArray.length==currentProdctCountWhichDisplayes){
                             showCustomAlert("No more products to show...");
                             return;
                             }
                             
                             
                             
                             for(var index1=lastIndexForAlreadyDisplayedProducts;index1<=limitToExtend;index1++){
                             
                             if(index1<matchingProductsArray.length){
                             extraRowsToBeAdded += "<tr>"+
                             "<td style=\"width: 39%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.title+"</td>"+
                             "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.pno+"</td>"+
                             "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index1].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                             "<td style=\"width: 16%;\" onclick=\"quickSeachProdSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.package_qty+"</td>"+
                             "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                             "<div class=\"span7\">"+
                             "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                             "</div>"+
                             "<div class=\"span4\" style=\"margin-top:5px;\">"+
                             "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                             "</div>"+
                             "</td>"+
                             "</tr>";
                             currentProdctCountWhichDisplayes++;
                             }
                             else{
                             break;
                             }
                             
                             }
                             
                             $("#currentProductFound").html(currentProdctCountWhichDisplayes);
                             $("#table_body").append(extraRowsToBeAdded);
                             $("#baseCategwf").trigger('create');
                             myScroll.refresh();
                             }
                             
                             });//my scroll bind end..
                 
                 
                 
                 });
    

    
    
    
}
var lastActionOnPrefix = "";
var latestProductToSearchForPartPrefix = "";
function lastActionOnPartPrefix(action,latestProductToSearch){
    console.log("action - "+action+" latestProductToSearch -"+latestProductToSearch);
    lastActionOnPrefix = action;
    latestProductToSearchForPartPrefix = latestProductToSearch;
}

function filterMultipleProductsForPartPrefix(arrayIndex,prodAttribute,attributeVal){

    
    
    var matchingProductsArray = [];
    loadingWithMsg( 'show','Searching products' );
    
    globalArrtHoldingArray = arrayOfProducts;
    
    makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex);
    
    var temp_match_str = prodAttribute+attributeVal;
    
    if(eleContainsInArray(selectedRadio,temp_match_str)){
        
        var tempSelectedRadioArray = [];
        for(var tempA=0;tempA<selectedRadio.length;tempA++){
            
           
            
            if(selectedRadio[tempA]==temp_match_str){
                for(indexlast in globalAttributArray){
                    console.log(attributeVal+" - lastGlobalAttrArray - "+globalAttributArray[indexlast][0]);
                    if(globalAttributArray[indexlast][0]==attributeVal){
                        globalAttributArray[indexlast][0] = "";
                    }
                }
                
            }
            else
            {
                tempSelectedRadioArray.push(selectedRadio[tempA]);
            }
            
            
            
        }
        selectedRadio = tempSelectedRadioArray;
        
    }
    else
        selectedRadio.push(prodAttribute+attributeVal);
    

    
    
    
    var htmlForFilterBradcrum = "";
    
    
    lastGlobalAttrHoldingArray = globalArrtHoldingArray;
    lastGlobalAttrArray = [];
    
    for(var kk=0;kk<globalAttributArray.length;kk++){
        lastGlobalAttrArray.push(globalAttributArray[kk]);
    }

    
    console.log("global array - "+globalArrtHoldingArray);
    
    
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    
    for (var i=0;i<globalAttributArray.length; i++){
        console.log("globalAttributArray - "+globalAttributArray[i])
        if(globalAttributArray[i]!=""){
            htmlForFilterBradcrum += globalArrtHoldingArray[i]+"-"+globalAttributArray[i]+" > ";
        }
    }
    
    
    var countT = 0;
    var qwer=0;
    
    
    var number = lastSearchedNumberForPartPrefix;
    var startK = number;
    var endK = number+"\u9999";
    console.log("start key - "+startK);
     config.views(["getProductForFilterWithNumber",{startkey:startK, limit:100}], function(err, encodedJSON) {
                 
                  console.log("encodedJSON for partprefix -"+JSON.stringify(encodedJSON));
                 
                  var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
                  "<div class=\"some-content-related-div\">"+
                  "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                  "     <thead>"+
                  "        <tr>"+
                  "            <th style=\"width: 39%;\">Description</th>"+
                  "            <th style=\"width: 16%;\">Part No.</th>"+
                  "            <th style=\"width: 16%;\">Price</th>"+
                  "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
                  "            <td id=\"totalProductsCount\" style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                  "        </tr>"+
                  "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
                  "<div id=\"partPrefixList\" >";
                 
                 
                 
                 
                 var totalProductsFoundAfterFilter = 0;
                 var count_2=0;
                 for(index in globalArrtHoldingArray){
                 
                 if(globalAttributArray[index].length>0){
                 break;
                 }
                 count_2++;
                 }
                 
                 
                 if(count_2 == globalArrtHoldingArray.length){
                 getProductsForTheParentWithoutFilters(currentLastLevelCategory);
                 }
                 
                 for(index in encodedJSON.rows){
                 
                 
                 var conditionsSatisfied = 0;
                 
                 
                 for (var holdingIndex in globalArrtHoldingArray){
                 
                 var isProductMatch = false;
                 
                  console.log("1111 - "+globalArrtHoldingArray);
                 
                 var productAttributeForSpec = globalArrtHoldingArray[holdingIndex];
                  
                 if(globalAttributArray[holdingIndex].length==0 || globalAttributArray[holdingIndex][0]==""){
                  console.log("conditionsSatisfied - "+conditionsSatisfied);
                 conditionsSatisfied++;
                 }
                 
                 for(var indiIndex in globalAttributArray[holdingIndex]){
                 
//                  console.log("globalAttributArray - "+globalAttributArray[holdingIndex][indiIndex]);
                 
                 
                 if(encodedJSON.rows[index].value.specs)
                 if(encodedJSON.rows[index].value.specs[productAttributeForSpec] == globalAttributArray[holdingIndex][indiIndex]){
                 
                 conditionsSatisfied++;
                 
                 
                 
                 totalProductsFoundAfterFilter++;
                 }
                 
                 }
                 
                 
                 
                 }
                 console.log("conditions satisfied - "+conditionsSatisfied+" globalAttributArray[holdingIndex] -"+globalArrtHoldingArray.length);
                 
                 
                 if(conditionsSatisfied == globalArrtHoldingArray.length){
                 countT++;
                 
                 
                 matchingProductsArray.push(encodedJSON.rows[index]);
                 
                 
                 }
                 console.log("total product found - "+countT);
                 
                 }
                 
                 for(index1 in matchingProductsArray){
                 
                  
                  baseCateghtml += "<tr>"+
                  "<td style=\"width: 39%;\" onclick=\"showProductSpecForPartPrefix('"+matchingProductsArray[index1].id+"','"+number+"');\">"+matchingProductsArray[index1].value.title+"</td>"+
                  "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+matchingProductsArray[index1].id+"','"+number+"');\">"+matchingProductsArray[index1].value.pno+"</td>"+
                  "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+matchingProductsArray[index1].id+"','"+number+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                  "<td style=\"width: 16%;\" onclick=\"showProductSpecForPartPrefix('"+matchingProductsArray[index1].id+"','"+number+"');\">"+matchingProductsArray[index1].value.package_qty+"</td>"+
                  "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                  "<div class=\"span7\">"+
                  "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                  "</div>"+
                  "<div class=\"span4\" style=\"margin-top:5px;\">"+
                  "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                  "</div>"+
                  "</td>"+
                  "</tr>";

                 
                 
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 for(index_key in matchingProductsArray[index1].value.specs){
                 
//                 console.log("111****** "+JSON.stringify(matchingProductsArray[index1].value.specs));
                 
                  var t=0;
                  
                  t = arrayOfProducts.indexOf(index_key);
                  
                  if(t < 0)
                  {
                  t = arrayOfProducts.length;
                  arrayOfProducts.push(index_key);
                  var temp_1 = parseInt(arrayOfProducts.length)-1;
                  arrayOfHoldingArrays[temp_1]=new Array();
                  
                  arrayOfHoldingArrays[temp_1].push(matchingProductsArray[index1].value.specs[index_key]);
                  }
                  else
                  {
                  var product_index= arrayOfProducts.indexOf(index_key);
                  var q = arrayOfHoldingArrays[product_index].indexOf(matchingProductsArray[index1].value.specs[index_key]);
                  
                  if(q < 0)
                  {
                  arrayOfHoldingArrays[product_index].push(matchingProductsArray[index1].value.specs[index_key]);
                  }
                  }
                 
                 }
                 
                 
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index1)+1;
                 if(matchingProductsArray.length == temp_2){
                 
                
                  
                  
                  var temp_html;
                  var html_hoalder_Array =new Array();
                  var bg_color_product_id_Array =new Array();
                  
                  for(attribute in arrayOfProducts){
                  
                  globalAttributArray[attribute] = new Array();
                  
                  
                  
                  for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                  console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                  if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[attribute]){
                  globalAttributArray[attribute].push(lastGlobalAttrArray[temp]);
                  
                  }
                  }
                  
                  temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                  temp_html += "<h3  id=\""+attribute+"_h\"><strong>"+arrayOfProducts[attribute]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                  "<fieldset data-role=\"controlgroup\">";
                  
                  arrayOfHoldingArrays[attribute].sort();
                  
                  
                  for(var attIndex in arrayOfHoldingArrays[attribute]){
                  
                  
                  var isRadio = false;
                  var tt=0;
                  for(;tt<selectedRadio.length;tt++){
                  
                  console.log(tt+" ++ "+selectedRadio.length+" ++ "+arrayOfProducts[attribute]+" ++ "+arrayOfHoldingArrays[attribute][attIndex]);
                  var tempSelectedStr = arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex];
                  if(selectedRadio[tt]== tempSelectedStr){
                  isRadio = true;
                  break;
                  }
                  }
                  if(tt == selectedRadio.length){
                  isRadio = false;
                  }
                  
                  
                  
                  
                  if(!isRadio){
                  temp_html += "<input onclick=\"filterMultipleProductsForPartPrefix("+attribute+",'"+arrayOfProducts[attribute]+"','"+arrayOfHoldingArrays[attribute][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[attribute]+"\" name=\"checkbox-"+arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\" />"+
                  "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\">"+arrayOfHoldingArrays[attribute][attIndex]+"</label>";
                  }
                  else{
                  
                  console.log(selectedRadio+" selectedRadio -"+arrayOfHoldingArrays[attribute][attIndex]);
                   bg_color_product_id_Array.push(attribute+"_h");
                  
                  temp_html += "<input onclick=\"filterMultipleProductsForPartPrefix("+attribute+",'"+arrayOfProducts[attribute]+"','"+arrayOfHoldingArrays[attribute][attIndex]+"');\" checked=\"checked\" type=\"radio\" name=\"radio-"+arrayOfProducts[attribute]+"\" name=\"checkbox-"+arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\" />"+
                  "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\">"+arrayOfHoldingArrays[attribute][attIndex]+"</label>";
                  
                  }
                  
                  
                  
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
                  
                  
//                                                   "<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                 
                 $("#filter_options_ul").trigger( "create" );
                  console.log("bg_color_product_id_Array - "+bg_color_product_id_Array);
                  for(var rr=0;rr<bg_color_product_id_Array.length;rr++){
                  document.getElementById(bg_color_product_id_Array[rr]).style.backgroundColor="gray";
                  }
                  
                  
                 }
                 
                 
                  
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 
                 }
                 
                 
                 
                 
                 
                 
                  baseCateghtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(baseCateghtml);
                 $("#totalProductsCount").html("<font size=\"1\">"+countT+" Items</font>");
                 $("#filterBradcrum").html(htmlForFilterBradcrum);
                 $("#baseCategwf").trigger('create');
                  var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });
                 loadingWithMsg( 'hide','' );
                 console.log("Filter Method call hide loader...");
                 });

    
    
}

var lastGlobalAttrHoldingArray = [];
var lastGlobalAttrArray = [];
var selectedRadio = [];
function filterMultipleProducts(arrayIndex,prodAttribute,attributeVal){
   
    
    
    var currentProductFoundAfterFilter = 0;
    var matchingProductsArray = [];
    loadingWithMsg( 'show','Searching products' );
    
    
    globalArrtHoldingArray = arrayOfProducts;
    
    
    makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex);
    
     var temp_match_str = prodAttribute+attributeVal;
    
    if(eleContainsInArray(selectedRadio,temp_match_str)){
    
        var tempSelectedRadioArray = [];
    for(var tempA=0;tempA<selectedRadio.length;tempA++){
        
        var tempStr = attributeVal;
        
        if(selectedRadio[tempA]== temp_match_str){
            for(indexlast in globalAttributArray){
                //console.log(attributeVal+" - lastGlobalAttrArray - "+globalAttributArray[indexlast][0]);
                if(globalAttributArray[indexlast][0]==attributeVal){
                    globalAttributArray[indexlast][0] = "";
                }
            }
    
        }
        else
        {
            tempSelectedRadioArray.push(selectedRadio[tempA]);
        }
        
        
        
    }
        selectedRadio = tempSelectedRadioArray;
        
    }
    else
    selectedRadio.push(temp_match_str);
    
    console.log("**** --"+globalAttributArray);
    
    
    var htmlForFilterBradcrum = "";
    
    lastGlobalAttrHoldingArray = globalArrtHoldingArray;
    lastGlobalAttrArray = [];
    
    
//    alert(globalAttributArray+" ===== "+selectedRadio);
    
    for(var kk=0;kk<globalAttributArray.length;kk++){
        lastGlobalAttrArray.push(globalAttributArray[kk]);
    }
    
    
    
    
    
    
    
    
    console.log("global array after assign- "+lastGlobalAttrArray);
    
    console.log("global array after assign- "+globalAttributArray);

    
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    
    
    
    for (var i=0;i<globalAttributArray.length; i++){
        if(globalAttributArray[i]!=""){
            htmlForFilterBradcrum += globalArrtHoldingArray[i]+"-"+globalAttributArray[i]+" > ";
        }
    }
//    console.log("after globalAttributArray1");

    var countT = 0;
    var qwer=0;
//    alert("currentLastLevelCategory - "+currentLastLevelCategory);
    config.views(["listsOfProductsByCatSeq",{startkey:[currentLastLevelCategory,null], endkey:[currentLastLevelCategory,"\u0fff"]}], function(err, encodedJSON) {
                 
                 
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:96%;padding:0px;\">";
                 
                 
                 
                 baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 35%;\">Description</th>"+
                 "            <th style=\"width: 15%;\">Part No.</th>"+
                 "            <th style=\"width: 12%;\">Price</th>"+
                 "            <th style=\"width: 13%;\">Pkg Qty.</th>"+
                 "            <td style=\"width: 13%;\" id=\"totalProductsCount1\">"+
                 "<div id=\"currentProductFound\" style='width: 20px; font-size: 10px; padding-left: 25px;'></div><div id=\"totalProductCountForTheCategory\" style='width: 80px; font-size: 10px; position: absolute; top: 18px; right: 10px;'>of xxx Items</div>"+
                 "</td>"+
                 "        </tr>"+
                 "</thead>"+
                 "</table>"+
                 "<div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">";
                 
                 
                 baseCateghtml +=  "<tr bgcolor=\"#f5f5f5\">"+
                 "            <th colspan=\"3\" style=\"width: 35%;\" id=\"filterBradcrum\"></th>"+
                 "            <th></th>"+
                 "            <th></th>"+
                 "        </tr>";
                 
                 
                 
               
                 var totalProductsFoundAfterFilter = 0;
                 var count_2=0;
                 for(index in globalArrtHoldingArray){
                 
                 if(globalAttributArray[index].length>0){
                 break;
                 }
                 count_2++;
                 }
                 
                 if(count_2 == globalArrtHoldingArray.length){
                 getProductsForTheParentWithoutFilters(currentLastLevelCategory);
                 }
                 try{
                 for(index in encodedJSON.rows){
                 
                 
                        var conditionsSatisfied = 0;
                 
                 
                 
                 for (var holdingIndex in globalArrtHoldingArray){
                 
                 
                 var isProductMatch = false;
                 
                 
                 var productAttributeForSpec = globalArrtHoldingArray[holdingIndex];
                 
                 
                 if(globalAttributArray[holdingIndex].length==0 || globalAttributArray[holdingIndex][0]==""){
                 conditionsSatisfied++;
                 }
                 else{
                 for(var indiIndex in globalAttributArray[holdingIndex]){

                 if(encodedJSON.rows[index].value.specs)
                 if(encodedJSON.rows[index].value.specs[productAttributeForSpec] == globalAttributArray[holdingIndex][indiIndex]){
                 
                            conditionsSatisfied++;
                 }
                 }
                 }
                 }
                 if(conditionsSatisfied == globalArrtHoldingArray.length){
                 countT++;
                 matchingProductsArray.push(encodedJSON.rows[index]);
                 
                
                 }
                 }
                 }catch(exception){
                 
                 }
                 
                 for(index1 in matchingProductsArray){
                 
                 if(index1<100){
                 baseCateghtml += "<tr>"+
                 "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.title+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.pno+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.package_qty+"</td>"+
                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                 "<div class=\"span7\">"+
                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                 "</div>"+
                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                 "</div>"+
                 "</td>"+
                 "</tr>";
                 currentProductFoundAfterFilter++;
                 }
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                  globalAttributArray = new Array();
                 for(index_key in matchingProductsArray[index1].value.specs){
                 
                 
                 var t=0;
                 
                 t = arrayOfProducts.indexOf(index_key);
                 
                 if(t < 0)
                 {
                 t = arrayOfProducts.length;
                 arrayOfProducts.push(index_key);
                 var temp_1 = parseInt(arrayOfProducts.length)-1;
                 arrayOfHoldingArrays[temp_1]=new Array();
                 
                 arrayOfHoldingArrays[temp_1].push(matchingProductsArray[index1].value.specs[index_key]);
                 }
                 else
                 {
                 var product_index= arrayOfProducts.indexOf(index_key);
                 var q = arrayOfHoldingArrays[product_index].indexOf(matchingProductsArray[index1].value.specs[index_key]);
                 
                 if(q < 0)
                 {
                 arrayOfHoldingArrays[product_index].push(matchingProductsArray[index1].value.specs[index_key]);
                 }
                 }
                 }
                 
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index1)+1;
                 if(matchingProductsArray.length == temp_2){
                 
                 var temp_arr = [];
                 
                 var temp_html;
                 var html_hoalder_Array =new Array();
                 var bg_color_product_id_Array =new Array();
                 
                 for(attribute in arrayOfProducts){
                 
                 
                 globalAttributArray[attribute] = new Array();
                 
                 
                
                 for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                 console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                 if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[attribute]){
                 globalAttributArray[attribute].push(lastGlobalAttrArray[temp]);
               
                 }
                 }
                 
                 
//
                 
                 temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                 temp_html += "<h3  id=\""+attribute+"_h\"><strong>"+arrayOfProducts[attribute]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                 "<fieldset data-role=\"controlgroup\">";
                 
                 
                 arrayOfHoldingArrays[attribute].sort();
                 
                 
                 for(var attIndex in arrayOfHoldingArrays[attribute]){
                
                 var isRadio = false;
                 var tt=0;
                 for(;tt<selectedRadio.length;tt++){
           
                 console.log(tt+" ++ "+selectedRadio.length+" ++ "+selectedRadio[tt]+" ++ "+arrayOfHoldingArrays[attribute][attIndex]);
                 var tempSelectedStr = arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex];
                 if(selectedRadio[tt]==tempSelectedStr){
                 isRadio = true;
                 break;
                 }
                 }
                 if(tt == selectedRadio.length){
                 isRadio = false;
                 }
                 
                 
                 console.log(isRadio+" ** "+selectedRadio+" ** "+arrayOfHoldingArrays[attribute][attIndex]+" **  "+arrayOfHoldingArrays);
                 if(!isRadio)
                 temp_html += "<input onclick=\"filterMultipleProducts("+attribute+",'"+arrayOfProducts[attribute]+"','"+arrayOfHoldingArrays[attribute][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[attribute]+"\" name=\"checkbox-"+arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\" />"+
                 "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\">"+arrayOfHoldingArrays[attribute][attIndex]+"</label>";
                 else{
                 
                  console.log(arrayOfProducts[attribute]+" selectedRadio -"+arrayOfHoldingArrays[attribute][attIndex]);
//                 document.getElementById(arrayOfProducts[attribute]).className = "active";
                  bg_color_product_id_Array.push(attribute+"_h");
                 temp_html += "<input onclick=\"filterMultipleProducts("+attribute+",'"+arrayOfProducts[attribute]+"','"+arrayOfHoldingArrays[attribute][attIndex]+"');\" type=\"radio\" checked=\"checked\" name=\"radio-"+arrayOfProducts[attribute]+"\" name=\"checkbox-"+arrayOfProducts[attribute]+arrayOfHoldingArrays[attribute][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\" />"+
                 "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[attribute][attIndex]+"\">"+arrayOfHoldingArrays[attribute][attIndex]+"</label>";
                 }
                 
                 }
                                  console.log("lastGlobalAttrArray*** - "+lastGlobalAttrArray);
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
                 
                 $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilter();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
//                                                   "<div onclick=\"resetFilter();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                 
                 $("#filter_options_ul").trigger( "create" );
                 
                 for(var rr=0;rr<bg_color_product_id_Array.length;rr++){
                 document.getElementById(bg_color_product_id_Array[rr]).style.backgroundColor="gray";
                 }
                 
                 }
                 
                 
                 
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 
                 }
                 
                 
                 
                 
                 
                 
                 baseCateghtml += "</tbody></table></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(baseCateghtml);
//                 $("#totalProductsCount").html(""+currentProductFoundAfterFilter+" of "+countT+" Items");
                 $("#currentProductFound").html(currentProductFoundAfterFilter);
                 $("#totalProductCountForTheCategory").html("of "+countT+" Items.");
                 $("#filterBradcrum").html(htmlForFilterBradcrum);
                 $("#baseCategwf").trigger('create');
                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true, desktopCompatibility:true });
                 loadingWithMsg( 'hide','' );
                 
                 
                 myScroll.on('scrollEnd', function(){
                             var clientHeight = document.getElementById('table_body').clientHeight;
                             var finalDiff = clientHeight+this.y;
                             
                             var isProductLoading = false;
                             
                             
                             if(this.y==0){
                             console.log("top");
                             }
                             else if(finalDiff == 420 && !isProductLoading){
                            
                             var extraRowsToBeAdded = "";
                             
                             var lastIndexForAlreadyDisplayedProducts = currentProductFoundAfterFilter;
                             var limitToExtend = lastIndexForAlreadyDisplayedProducts + 100;
                             
                             
                             if(matchingProductsArray.length==currentProductFoundAfterFilter){
                             showCustomAlert("No more products to show...");
                             return;
                             }
                             
                             
                             
                             for(var index1=lastIndexForAlreadyDisplayedProducts;index1<=limitToExtend;index1++){
                             
                             if(index1<matchingProductsArray.length){
                             extraRowsToBeAdded += "<tr>"+
                             "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.title+"</td>"+
                             "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.pno+"</td>"+
                             "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                             "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+matchingProductsArray[index1].id+"');\">"+matchingProductsArray[index1].value.package_qty+"</td>"+
                             "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                             "<div class=\"span7\">"+
                             "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                             "</div>"+
                             "<div class=\"span4\" style=\"margin-top:5px;\">"+
                             "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                             "</div>"+
                             "</td>"+
                             "</tr>";
                             currentProductFoundAfterFilter++;
                             }
                             else{
                             break;
                             }
                             
                             }
                             
                             $("#currentProductFound").html(currentProductFoundAfterFilter);
                             $("#table_body").append(extraRowsToBeAdded);
                             $("#baseCategwf").trigger('create');
                             myScroll.refresh();
                             }
                             
                             });//my scroll bind end..
                 
                 
                 
                 
                 
                 console.log("Filter Method call hide loader...");
                 });
    
    
    
}


function filterProducts(arrayIndex,encodedJSON1,prodAttribute,attributeVal){
    loadingWithMsg( 'show','Searching products' );
    
    console.log("encodedJSON - "+arrayIndex+" prodAttribute "+prodAttribute+" attributeVal "+attributeVal);
   
    makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex);
    
    

    console.log("productAttributeArray - "+productAttributeArray);
    console.log("productAttributeValueArray - "+productAttributeValueArray);
    
    var totalProductCount = 0;
     config.views(["listsOfProductsByCatSeq",{startkey:[currentLastLevelCategory,null], endkey:[currentLastLevelCategory,"\u0fff"]}], function(err, encodedJSON) {
    var lastIndexForProducts = 20;
                  
                  

    var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:96%;padding:0px;\">";
    
    
    
    baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
    "     <thead>"+
    "        <tr>"+
    "            <th style=\"width: 35%;\">Description</th>"+
    "            <th style=\"width: 15%;\">Part No.</th>"+
    "            <th style=\"width: 12%;\">Price</th>"+
    "            <th style=\"width: 13%;\">Pkg Qty.</th>"+
    "            <td style=\"width: 13%;\" id=\"totalProductsCount\">xxx Items</td>"+
    "        </tr>"+
    "</thead>"+
                  "</table>"+
    "<div id=\"wrapper\" style=\" height: 400px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">"+
                  "        <tr bgcolor=\"#C4BFBF\">"+
                  "            <th id=\"filterLineHeading"+arrayIndex+"\" style=\"width: 35%;\">"+globalArrtHoldingArray[arrayIndex]+"</th>"+
                  "            <th></th>"+
                  "            <th></th>"+
                  "            <th></th>"+
                  "            <th id=\"filterHeading"+arrayIndex+"\"></th>"+
                  "        </tr>";
    
      
    
                  
    
    for(index in encodedJSON.rows){
                  var isProductMatch = false;
                  
                  
                  
                  console.log("specs -*** "+ encodedJSON.rows[index].value.specs[prodAttribute]);
                  
                  console.log("global array index -"+globalAttributArray[arrayIndex]);
                  for(var i=0;i<globalAttributArray[arrayIndex].length;i++){
                  var attrSpecs = globalArrtHoldingArray[arrayIndex];
                  console.log("encodedJSON.rows[index].value.specs["+attrSpecs+"] - "+encodedJSON.rows[index].value.specs[attrSpecs]);
                  console.log("globalAttributArray[arrayIndex][i] - "+globalAttributArray[arrayIndex][i]);
                  if(encodedJSON.rows[index].value.specs[attrSpecs]==globalAttributArray[arrayIndex][i])
                            isProductMatch = true;
                  $("#filterLineHeading").html("hiiii");
                  }
//                  }
                  
                  
//                                    console.log("product specs - "+JSON.stringify(encodedJSON.rows[index].value.specs));
            if(isProductMatch){
                  
                 
                  
            baseCateghtml += "<tr>"+
            "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+encodedJSON.rows[index].id+"');\">"+encodedJSON.rows[index].value.title+"</td>"+
            "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+encodedJSON.rows[index].id+"');\">"+encodedJSON.rows[index].value.pno+"</td>"+
            "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+encodedJSON.rows[index].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
            "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+encodedJSON.rows[index].id+"');\">"+encodedJSON.rows[index].value.package_qty+"</td>"+
            "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
            "<div class=\"span7\">"+
            "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
            "</div>"+
            "<div class=\"span4\" style=\"margin-top:5px;\">"+
            "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
            "</div>"+
            "</td>"
            "</tr>";
                  
                  totalProductCount++;
                  
                  }
        
        
        
        
        lastIndexForProducts = encodedJSON.rows[index].value.pno;
        
    }
    
    
    baseCateghtml += "</tbody></table></div></div></div></div><div class=\"clearfix\"></div>";
    $("#baseCategwf").html(baseCateghtml);
    $("#baseCategwf").trigger('create');
    
    
    var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true, desktopCompatibility:true });
    
    
    
    $("#totalProductsCount").html(totalProductCount+" Items");
                  
    
                 
                  
                  });
    loadingWithMsg( "hide","" );
    $("#login").trigger( "pagecreate" );
    
}
var totalProductsInTheCategory = 0;

function getProductsForTheParentWithPredefinedFilters(findsubCategFor){
   
    
    var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
    
    var temp_html;
    var html_hoalder_Array =new Array();

    
    for(index in jsondataForThirdLevelCateg){
        if(jsondataForThirdLevelCateg[index].value.cat_title==findsubCategFor){
            for(attributeIndex in jsondataForThirdLevelCateg[index].value.attributes){
                
                temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                temp_html += "<h3><strong>"+attributeIndex+"</strong></h2><div  data-role=\"fieldcontain\">"+
                "<fieldset data-role=\"controlgroup\">";
                
                
                var tempArray = jsondataForThirdLevelCateg[index].value.attributes[attributeIndex];
                arrayOfHoldingArrays.push(tempArray);
                
                for(var attIndex in jsondataForThirdLevelCateg[index].value.attributes[attributeIndex]){
                    
                    
                    
                    temp_html += "<input onclick=\"filterMultipleProducts("+arrayOfProducts.length+",'"+attributeIndex+"','"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][attIndex]+"')\" type=\"radio\" name=\"radio-"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][attIndex]+"\" name=\"checkbox-"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][attIndex]+"\" id=\"checkbox-"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][attIndex]+"\" />"+
                    "<label style=\"width: 120%;\" for=\"checkbox-"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][attIndex]+"\">"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][attIndex]+"</label>";
                    
                    
                    
                }
                
                
                console.log("---------------------"+jsondataForThirdLevelCateg[index].value.attributes[attributeIndex][0]);
               
                
                 arrayOfProducts.push(attributeIndex);
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
        }
    }
    
    
    
    
    for(index1 in arrayOfHoldingArrays){
        globalAttributArray[index1] = new Array();
    }
    
    
    console.log("filter options set");
    
    $("#filter_options_ul").html(attributeKeyHtml);
    $("#filter_options_ul").trigger( "create" );
    
    
    
    if(arrayOfProducts.length==0){
        $("#filter_options_ul").html("<font size='2' style='padding-left: 6px;'>No filter options are available.</font>");
    }

    
}


function getProductsForTheParentWithoutFilters(findsubCategFor){
//    loadingWithMsg( 'show','Getting products' );
    console.log("getting products ...."+findsubCategFor);
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    selectedRadio = [];
    
    getProductsForTheParentWithPredefinedFilters(findsubCategFor)
    
    
    var lastIndexForProducts = 20;
    var totalProductsFound = 0;
    currentLastLevelCategory = findsubCategFor;
   // config.views(["listsOfProducts",{key: findsubCategFor,limit:100}], function(err, view)
    
    config.views(["listsOfProductsByCatSeq",{startkey:[findsubCategFor,null], endkey:[findsubCategFor,"\u0fff"],limit:100}], function(err, view)
                 
    {
                 if(err){
                 loadingWithMsg( "hide","" );
                 return;
                 }
                 
                 if(view.rows.length==0)
                 {
                 showCustomAlert("No products found for selected category...");
                 loadingWithMsg( "hide" ,"");
                 return;
                 }
                 
                 console.log("prducts found...");
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:96%;padding:0px;\">";
                 
                 baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 35%;\">Description</th>"+
                 "            <th style=\"width: 15%;\">Part No.</th>"+
                 "            <th style=\"width: 12%;\">Price</th>"+
                 "            <th style=\"width: 13%;\">Pkg Qty.</th>"+
                 "            <td style=\"width: 13%;\" id=\"totalProductsCount1\">"+
                 "<div id=\"currentProductFound\" style='width: 20px; font-size: 10px; padding-left: 25px;'></div><div id=\"totalProductCountForTheCategory\" style='width: 80px; font-size: 10px; position: absolute; top: 18px; right: 10px;'>of xxx Items</div>"+
                 "</td>"+
                 "        </tr>"+
                 "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">";
                 
                 
                 
                 bradcrumArry.push(findsubCategFor);
                 
                 getchildcategorieswithBradcrum(findsubCategFor);
                 
                 document.getElementById("b").style.left="0px";
                 document.getElementById("accordion_b").style.backgroundImage="url('img/arrow_right.png')";

                 
                 for(index in view.rows){
                 if(index<100){
                 baseCateghtml += "<tr>"+
                 "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pno+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.package_qty+"</td>"+
                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                 "<div class=\"span7\">"+
                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                 "</div>"+
                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                 "</div>"+
                 "</td>"
                 "</tr>";
                 
                 totalProductsFound++;
                 
                 
                 if(index==view.rows.length-1)
                 lastIndexForProducts = view.rows[index].value.pno;
                 }
                 }
                 
                 
                 loadingWithMsg( "hide","" );
                 baseCateghtml += "</tbody></table></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(baseCateghtml);
                 //                 alert(totalProductsInTheCategory);
                 $("#currentProductFound").html(totalProductsFound);
                 
                 $("#baseCategwf").trigger('create');
                 
                 
                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true, desktopCompatibility:true });
                 
                 
                 myScroll.on('scrollEnd', function(){
                             var clientHeight = document.getElementById('table_body').clientHeight;
                             var finalDiff = clientHeight+this.y;
                             
                             var isProductLoading = false;
                             
                             if(this.y==0){
                             console.log("top");
                             }
                             else if(finalDiff == 420 && !isProductLoading){
                             console.log("bottom");
                             loadingWithMsg('show','Loading products..');
                             
                             
                             isProductLoading = true;
                             //053.10.85
                             if(isProductLoading)
                             config.views(["listsOfProductsWithPno",{startkey:[findsubCategFor,null], endkey:[findsubCategFor,"\u0fff"], limit:100, skip:totalProductsFound}], function(err, view) {
                                          
                                          if(!err){
                                          
                                          
                                          console.log("success -------"+JSON.stringify(view));
                                          
                                          if(view.rows.length==0)
                                          {
                                          showCustomAlert("No more products to show..");
                                          isProductLoading = false;
                                          loadingWithMsg('hide','');
                                          return;
                                          }
                                          
                                          
                                          
                                          var extraRows = "";
                                          var prodIndexCount = 0
                                          for(index in view.rows){
                                          prodIndexCount++;
                                          if(view.rows[index].value.mprod)
                                          if(view.rows[index].value.mprod.ABPLVL1 == bradcrumArry[1] && prodIndexCount != 1)
                                          extraRows += "<tr>"+
                                          "<td onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                                          "<td>"+view.rows[index].value.pno+"</td>"+
                                          "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td>"+view.rows[index].value.package_qty+"&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td style=\"padding-bottom: 0px; padding-top: 2px;\">"+
                                          "<div class=\"span7\">"+
                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                          "</div>"+
                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                          "</div>"+
                                          "</td>"
                                          "</tr>";
                                          
                                          lastIndexForProducts = view.rows[index].value.pno;
                                          
                                          totalProductsFound++ ;
                                          }
                                         // totalProductsFound--;
                                          loadingWithMsg('hide','');
                                           $("#currentProductFound").html(totalProductsFound);
                                          $("#table_body").append(extraRows);
                                          $("#baseCategwf").trigger('create');
                                          myScroll.refresh();
                                          isProductLoading = false;
                                          }
                                          else{
                                          isProductLoading = false;
                                          }
                                          
                                          
                                          });//end of config.views for scroll
                             
                             }//end if else if
                             
                             });//end of scroll bind
                 
                 
                 });
    
    
    config.views(["listsOfProductsByCatSeq",{startkey:[findsubCategFor,null], endkey:[findsubCategFor,"\u0fff"]}], function(err, view){
                 
                  $("#totalProductCountForTheCategory").html("of "+view.rows.length+" Items");
                
                 });
}


function getProductsForTheParent(findsubCategFor)
{
    
    loadingWithMsg( 'show','Getting products' );
    console.log("getting products ...."+findsubCategFor);
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    selectedRadio = [];
    
    getProductsForTheParentWithPredefinedFilters(findsubCategFor)
    
   
    
    var totalProductsFound = 0;
    currentLastLevelCategory = findsubCategFor;
    config.views(["listsOfProductsByCatSeq",{startkey:[findsubCategFor,null], endkey:[findsubCategFor,"\u0fff"]}], function(err, view)
                 {
                 if(err){
                 loadingWithMsg( "hide","" );
                 return;
                 }
                 
                 console.log("saiiiiii - "+view.rows.length);
                 totalProductsInTheCategory = view.rows.length;
                 
                 var lastIndexForProducts = 20;
                 
                 if(view.rows.length==0)
                 {
                 showCustomAlert("No products found for selected category...");
                 loadingWithMsg( "hide" ,"");
                 return;
                 }
                 
                 console.log("prducts found...");
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:96%;padding:0px;\">";
                 
                 baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 35%;\">Description</th>"+
                 "            <th style=\"width: 15%;\">Part No.</th>"+
                 "            <th style=\"width: 12%;\">Price</th>"+
                 "            <th style=\"width: 13%;\">Pkg Qty.</th>"+
                 "            <td style=\"width: 13%;\" id=\"totalProductsCount\">xxx Items</td>"+
                 "        </tr>"+
                 "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">";
                 
                 
                 
                 bradcrumArry.push(findsubCategFor);
                 
                 getchildcategorieswithBradcrum(findsubCategFor);
                 
                 document.getElementById("b").style.left="0px";
                 document.getElementById("accordion_b").style.backgroundImage="url('img/arrow_right.png')";
                 for(index in view.rows)
                 {
                 if(view.rows[index].value && view.rows[index].value.mprod &&  view.rows[index].value.mprod.ABPLVL1 == bradcrumArry[1])
                 {
                 for(index_key in view.rows[index].value.specs)
                 {
                 var t=0;
                 t = arrayOfProducts.indexOf(index_key);
                 
                 if(t < 0)
                 {
                 t = arrayOfProducts.length;
                 arrayOfProducts.push(index_key);
                 var temp_1 = parseInt(arrayOfProducts.length)-1;
                 arrayOfHoldingArrays[temp_1]=new Array();
                 
                 arrayOfHoldingArrays[temp_1].push(view.rows[index].value.specs[index_key]);
                 }
                 else
                 {
                 var product_index= arrayOfProducts.indexOf(index_key);
                 var q = arrayOfHoldingArrays[product_index].indexOf(view.rows[index].value.specs[index_key]);
                 if(q < 0)
                 {
                 arrayOfHoldingArrays[product_index].push(view.rows[index].value.specs[index_key]);
                 }
                 }
                 }
                 
                 if(index<100){
                 console.log("index for 100 products - "+index)
                 baseCateghtml += "<tr>"+
                 "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pno+"</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.package_qty+"</td>"+
                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                 "<div class=\"span7\">"+
                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                 "</div>"+
                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                 "</div>"+
                 "</td>"
                 "</tr>";
                 }
                 }
                 console.log("index for product level - "+totalProductsFound);
                 
                 
                 }
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index)+1;
                 var temp_html;
                 var html_hoalder_Array =new Array();
                 
                 for(index1 in arrayOfProducts){
                 
                 globalAttributArray[index1] = new Array();
                 
                 temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                 temp_html += "<h3><strong>"+arrayOfProducts[index1]+"</strong></h2><div  data-role=\"fieldcontain\">"+
                 "<fieldset data-role=\"controlgroup\">";
                 arrayOfHoldingArrays[index1].sort();
                 for(var attIndex in arrayOfHoldingArrays[index1]){
                 
                 temp_html += "<input onclick=\"filterMultipleProducts("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
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
                 
                 $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilter();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                 
                 
                 $("#filter_options_ul").trigger( "create" );
                 if(totalProductsInTheCategory>100)
                 {
                 totalProductsFound = 100;
                 lastIndexForProducts = view.rows[99].value.pno;
                 }
                 else
                 {
                 totalProductsFound = totalProductsInTheCategory;
                 lastIndexForProducts = view.rows[totalProductsInTheCategory - 1].value.pno
                 }
                 
                 
                 loadingWithMsg( "hide","" );
                 baseCateghtml += "</tbody></table></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(baseCateghtml);
                 //                 alert(totalProductsInTheCategory);
                 $("#totalProductsCount").html("<font size=\"1\">"+totalProductsFound+" of "+totalProductsInTheCategory+" Items </font>");
                 $("#baseCategwf").trigger('create');
                 
                 
                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true, desktopCompatibility:true });
                 
                 
                 
                 
                 
                 myScroll.on('scrollEnd', function(){
                             var clientHeight = document.getElementById('table_body').clientHeight;
                             var finalDiff = clientHeight+this.y;
                             
                             var isProductLoading = false;
                             
                             if(this.y==0){
                             console.log("top");
                             }
                             else if(finalDiff == 420 && !isProductLoading){
                             console.log("bottom");
                             loadingWithMsg('show','Loading products..');
                             isProductLoading = true;
                             
                             if(isProductLoading)
                             config.views(["listsOfProductsWithPno",{startkey:[findsubCategFor,lastIndexForProducts], endkey:[findsubCategFor,"\u0fff"], limit:101}], function(err, view) {
                                          if(!err){
                                          if(view.rows.length==1)
                                          {
                                          showCustomAlert("No more products to show..");
                                          isProductLoading = false;
                                          loadingWithMsg('hide','');
                                          return;
                                          }
                                          
                                          
                                          
                                          var extraRows = "";
                                          var prodIndexCount = 0
                                          for(index in view.rows){
                                          prodIndexCount++;
                                          if(view.rows[index].value.mprod.ABPLVL1 == bradcrumArry[1] && prodIndexCount != 1)
                                          extraRows += "<tr>"+
                                          "<td onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                                          "<td>"+view.rows[index].value.pno+"</td>"+
                                          "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td>"+view.rows[index].value.package_qty+"&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                          "<td style=\"padding-bottom: 0px; padding-top: 2px;\">"+
                                          "<div class=\"span7\">"+
                                          "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                          "</div>"+
                                          "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                          "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                          "</div>"+
                                          "</td>"
                                          "</tr>";
                                          
                                          lastIndexForProducts = view.rows[index].value.pno;
                                          
                                          totalProductsFound++ ;
                                          }
                                          totalProductsFound--;
                                          loadingWithMsg('hide','');
                                          $("#totalProductsCount").html("<font size=\"1\">"+totalProductsFound+" of "+totalProductsInTheCategory+" Items </font>");
                                          $("#table_body").append(extraRows);
                                          $("#baseCategwf").trigger('create');
                                          myScroll.refresh();
                                          isProductLoading = false;
                                          }else{
                                          isProductLoading = false;
                                          }
                                          });
                             
                             
                             
                             }
                             
                             });
                 
                 $("#login").trigger( "pagecreate" );
                 
                 
                 loadingWithMsg( "hide","" );
                 });
}


function getProductsForTheParent1(findsubCategFor){
    
    loadingWithMsg( 'show','Getting products' );
    console.log("getting products ...."+findsubCategFor);
    arrayOfProducts=new Array();
    arrayOfHoldingArrays=[];
    selectedRadio = [];
    
    
    
    
    
    
    var totalProductsFound = 0;
    currentLastLevelCategory = findsubCategFor;
    
    
             config.views(["listsOfProductsByCatSeq",{startkey:[findsubCategFor,null], endkey:[findsubCategFor,"\u0fff"]}], function(err, view) {
                 if(!err){
//                 
//                          console.log("-----------------"+JSON.stringify(view));
//                 
                 var lastIndexForProducts = 20;
//
//                 if(view.rows.length==0)
//                 {
//                 showCustomAlert("No products found for selected category...");
//                 loadingWithMsg( "hide" ,"");
//                 return;
//                 }
//                 
//                 console.log("prducts found...");
//                 
//                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:96%;padding:0px;\">";
//                 
//                 
//                 
//                 baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
//                 "     <thead>"+
//                 "        <tr>"+
//                 "            <th style=\"width: 35%;\">Description</th>"+
//                 "            <th style=\"width: 15%;\">Part No.</th>"+
//                 "            <th style=\"width: 12%;\">Price</th>"+
//                 "            <th style=\"width: 13%;\">Pkg Qty.</th>"+
//                 "            <td style=\"width: 13%;\" id=\"totalProductsCount\">xxx Items</td>"+
//                 "        </tr>"+
//                 "</thead></table><div id=\"wrapper\" style=\" height: 440px;\"><div id=\"scroller\"><table class=\"table\"><tbody id=\"table_body\">";
                 
                 
                 
//                 bradcrumArry.push(findsubCategFor);
//                 
//                 getchildcategorieswithBradcrum(findsubCategFor);
                 
                 document.getElementById("b").style.left="0px";
                 document.getElementById("accordion_b").style.backgroundImage="url('img/arrow_right.png')";
                 
                 
                 
                 for(index in view.rows){
                          
                          totalProductsFound++;
                 var totalProductMatchingLeve = 0;
//                        if(view.rows[index].value.mprod)
//                        if(view.rows[index].value.mprod.ABPLVL1 == bradcrumArry[1]){
//                            totalProductMatchingLeve++;
//                            }
//                 console.log("TOTAL PRODUCTS "+totalProductMatchingLeve);
//                 if(view.rows[index].value.mprod)
//if(view.rows[index].value.mprod.ABPLVL1 == bradcrumArry[1]){
                 
                 
                 
                 
                 
        for(index_key in view.rows[index].value.specs){
                 
                
                 
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
                  console.log("success -5"+temp_2+"---"+totalProductMatchingLeve);
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
                 
                 temp_html += "<input onclick=\"filterMultipleProducts("+index1+",'"+arrayOfProducts[index1]+"','"+arrayOfHoldingArrays[index1][attIndex]+"');\" type=\"radio\" name=\"radio-"+arrayOfProducts[index1]+"\" name=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" id=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\" />"+
                 "<label style=\"width: 120%;\" for=\"checkbox-"+arrayOfProducts[index1]+arrayOfHoldingArrays[index1][attIndex]+"\">"+arrayOfHoldingArrays[index1][attIndex]+"</label>";
                 
                 
                 //                 attributeKeyHtml += "<input type=\"radio\" name=\"radio-\" name=\"checkbox-\" id=\"checkbox-\" class=\"custom\" />"+
                 //                 "<label style=\"width: 120%;\" for=\"checkbox-\">helllo</label>";
                 
                 }
                 
                 temp_html += "</fieldset></div></div>";
                 
                  html_hoalder_Array.push(temp_html);
                 
                 }
                 
                                  console.log("success -6");
                 var temp_arrayOfProducts_Array =new Array();
                 for(var ww=0;ww<arrayOfProducts.length;ww++){
                 temp_arrayOfProducts_Array[ww] =arrayOfProducts[ww];
                 
                 }
                 
                 
                                  console.log("success -7");
                 
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
                 
                                  console.log("success -8");
                 
                 for(var ww=0;ww<html_hoalder_Array.length;ww++){
                 attributeKeyHtml += html_hoalder_Array[ww];
                 
                 }
                 
                 attributeKeyHtml += "</div>";
                 
                 
                 
                 
                 console.log("filter options set");
                 
                 $("#filter_options_ul").html(attributeKeyHtml);
                 
                 filterOptionsHtml = attributeKeyHtml;
                 
                  $("#filter_options_buttons").html("<img src=\"img/reset-button.jpg\" onclick=\"resetFilter();\" data-role=\"button\" style=\"margin-left:25px;\"></img>");
                 
                 
                 $("#filter_options_ul").trigger( "create" );
                 
                 console.log("success -9"+arrayOfProducts);
                 
        }

                 console.log("success -9"+arrayOfProducts);
//                 if(view.rows[index].value.mprod)
//                 if(index<100 && view.rows[index].value.mprod.ABPLVL1 == bradcrumArry[1]){
//                 console.log("index for 100 products - "+view.rows[index].value.title)
//                 baseCateghtml += "<tr>"+
//                 "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
//                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pno+"</td>"+
//                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
//                 "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.package_qty+"</td>"+
//                 "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
//                 "<div class=\"span7\">"+
//                 "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
//                 "</div>"+
//                 "<div class=\"span4\" style=\"margin-top:5px;\">"+
//                 "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
//                 "</div>"+
//                 "</td>"
//                 "</tr>";
//                 }
//    }
//                 console.log("index for product level - "+totalProductsFound);
                 
//                 if(totalProductsInTheCategory>100){
//                 totalProductsFound = 100;
//                 lastIndexForProducts = view.rows[99].value.pno;}
//                 else{
//                 totalProductsFound = totalProductsInTheCategory;
//                 lastIndexForProducts = view.rows[index].value.pno
//                 }
                 }
                 
                 
                 loadingWithMsg( "hide","" );
                 baseCateghtml += "</tbody></table></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#totalNoOfProduct").html("of "+totalProductsFound+" Items </font>");
                 
                 
//                 totalNoOfProduct
                 
//                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true, desktopCompatibility:true });
                 
                 
                 
                 
                 
                          
                 $("#login").trigger( "pagecreate" );
                 
                 
                 }
                 else
                 {
                 
                 }
                 loadingWithMsg( "hide","" );
                 });
             
//               });
}


function arraysEqual(a, b) {
    
    
    
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    
    
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


// ************** Update Bradcrum  *************** //

function getchildcategorieswithBradcrum(categFor){
    //    alert(bradcrumArry);
    var findArrayBelow = findIndexForName(categFor);
    //    alert("index for the name - "+categFor+" is -"+findArrayBelow);
    var tempArry = [];
    
    for(index in bradcrumArry){
        
        //                 alert(index+"for the element "+bradcrumArry[index]+" but index to be find "+findArrayBelow);
        
        if(index <= findArrayBelow){
            tempArry.push(bradcrumArry[index]);
        }
        
    }
    $("#bradcrumMain").html("");
    bradcrumArry = tempArry;
    for(index in tempArry){
        
        var fontStyle;
        
        if(index == tempArry.length-1)
            fontStyle = "#000000";
        else
            fontStyle = "#808080";
        
        
        
        if(index==0)
            $("#bradcrumMain").append("<strong> <a onclick=\"getchildcategories('"+tempArry[index]+"');\"><font color=\""+fontStyle+"\">"+tempArry[index]+"</font></a></strong>");
        else
            $("#bradcrumMain").append("<strong><font color=\"#808080\"> > </font><a onclick=\"getchildcategories('"+tempArry[index]+"');\"><font color=\""+fontStyle+"\">"+tempArry[index]+"</font> </a></strong>");
        
    }
   
}

function findIndexForName(cat){
    
    var tempIndex = 0;
    
    for(index in bradcrumArry)
    {
        if(bradcrumArry[index]==cat){
            tempIndex = index;
            break;
        }
    }
    return index;
}

function getArrayBelowIndex(tempIndex){
    var tempArry = [];
    
    for(index in bradcrumArry){
        if(index <= tempIndex){
            tempIndex.push(bradcrumArry[index]);
        }
        else
            break;
    }
    
    return tempArry;
    
}

// ************** Getting Product Specifications  *************** //




function showProductSpec(prod){
//    $("#mainHeadCatalog").html("Catalog: Line Details");
    console.log(prod);
    var productSpecHtml = "";
    config.db.get(prod, function(err, doc){
                  if(!err){
                  console.log("doc found"+JSON.stringify(doc));
                  var tempSpecArry = "";
                  var tempSpecValueArry = "";
                  addToCart_doc = doc;
                  for(index in doc.specs){
                  
                  
                  tempSpecArry += "<div data-theme=\"a\" class=\"ui-grid-a\"><div class=\"ui-block-a\">"+index+"</div><div class=\"ui-block-b\">"+doc.specs[index]+"</div></div>";
                  
                  tempSpecValueArry += doc.specs[index]+"<br/>";
                  }
                  
                  var msds_file_tag;
                  if(doc.msds_file=="")
                  msds_file_tag = "";
                  else{
                  msds_file_tag = "<a onclick=\"showInAppBrowser('"+doc.msds_file+"')\">MSDS Sheet</a>";
                  }
                  var parentCategHtml = "";
                  for(catIndex in doc.cat_paths[0]){
                  console.log("cat - "+doc.cat_paths[0][catIndex]);
                  
                  parentCategHtml +=  doc.cat_paths[0][catIndex]+" > "
                  
                  }
                  
                productSpecHtml =  "<div id=\"productSpecScroll\" style=\"vertical-align: middle; position: relative; overflow: hidden; height: 520px; width: 100%; \"><div class=\"hero-unit row-fluid\" style=\"background-image: none; height:100% !important;\">"+
                                                    "<div class=\"hero_inner_box2 span12\" >"+
                                                    "<p style=\"padding-top:10px;\" class=\"pull-right\"><strong>Part #"+doc.pno+"</strong></p>"+
                                                    "<p><strong>"+parentCategHtml+"</strong></p>"+
                                                    "<h4><strong>"+doc.long_desc+"</strong></h4>"+
                                                    "<div class=\"span4\">"+
                                                    "<img id=\""+doc.title+"img\" style=\"max-height:120px;\"  src=\"img/animated_loading.gif\" width=\"auto\" height=\"auto\" onError=\"this.src = 'images/img_not_available_160_160.jpg'\" class=\"img-polaroid\">"+
                                                    "<p style=\"padding-top:10px;\"><strong>Features and Benefits</strong></p>"+
                                                    "<p>"+doc.features+"</p>"+
                                                    "</div>"+
                                                    "<div class=\"span7\">"+
                                                    "<p><strong>Specifications</strong></p>"+
                                                    "<div data-theme=\"a\" class=\"ui-grid-a\"><div class=\"ui-block-a\">Short Description</div><div class=\"ui-block-b\">"+doc.short_desc+"</div></div>"+
                                                    "<p>"+tempSpecArry+"</p><br/><div class=\"span8\">"+
                                                    "<p><strong>Price:</strong>  <strong  class=\"text-success\">Change Price</strong></p>"+
                                                    "<p ><strong>Package Qty</strong>: "+doc.package_qty+"</p>"+
                                                    "<p><strong>Qty:</strong><input data-role=\"none\" id=\"addtocart_qty_id\" style=\"padding-top:9px;width:30px;\" type=\"number\" data-mini=\"true\" data-inline=\"true\"></p>"+
                                                    "<div class=\"span5\" style=\"top: -45px; left: 80px; position: relative;\"><p class=\"text-success\"><strong>Add to Cart</strong></p></div>"+
                                                    "<div class=\"span3\" style=\"top:-50px; position: relative; left: 70px; \"><img src=\"img/add_button.jpg\" onclick=\"catalog_addToCart();\" width=\"30px\" height=\"30px\"></div>"+
                                                    "</div>"+
                                                    "<div class=\"span3\">"+
                                                    "<div class=\"pull-right\">"+
                                                    "<p><strong>Downloads</strong></p>"+
                                                    "<p class=\"text-info\"><strong>"+msds_file_tag+"</strong></p>"+
                                                    "<p><strong>References</strong> </p>"+
                                                    "<p>Printed Catalog Page </p>"+
                                                    "</div>"+
                                                    "</div></div>"+
//                                                    "<div class=\"clearfix\"></div>"+
                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+
                                                    "</div>"+
                                                    "<div class=\"hero-unit\">"+
                                                    "<div class=\"hero_inner_box2\">"+
//                                                    "<h4>Related Products</h4>"+
                                                    "<div id=\"related_product_div\">"+
                                                  /*  "<div class=\"span1 dashbord\">"+
                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
                                                    "<p><strong>Product Name</strong><br>"+
                                                    "686.6.19071</p>"+
                                                    "</div>"+
                                                    "<div class=\"span1 dashbord\">"+
                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
                                                    "<p><strong>Product Name</strong><br>"+
                                                    "686.6.19071</p>"+
                                                    "</div>"+
                                                    "<div class=\"span1 dashbord\">"+
                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
                                                    "<p><strong>Product Name</strong><br>"+
                                                    "686.6.19071</p>"+
                                                    "</div>"+
                                                    "<div class=\"span1 dashbord\">"+
                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
                                                    "<p><strong>Product Name</strong><br>"+
                                                    "686.6.19071</p>"+
                                                    "</div>"+
                                                    "<div class=\"span1 dashbord\">"+
                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
                                                    "<p><strong>Product Name</strong><br>"+
                                                    "686.6.19071</p>"+
                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+*/
                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+
                                                    "</div>"+
                                                    "</div>";
    
     $("#catalogProduct_Details").html(productSpecHtml);
                  
                  var relatedProdHtml = "";
                  if(doc.related_items){
                  
                  
                  if(doc.related_items[0].length>0){
               relatedProdHtml  += "<h4>Related Products</h4>";
                  for(index1 in doc.related_items[0]){
                  config.db.get("id-"+doc.related_items[0][index1]+"", function(err, doc){
                                
                                
                                if(!err){
//                                alert(doc._id);
                                relatedProdHtml += "<div onclick=\"showProductSpec(id"+doc._id+");\" class=\"span2 dashbord\">"+
                                                    "<div class=\"inner_dashbord\"><img id=\""+doc.title+"img\" src=\"img/img2.jpg\" max-width=\"135\" max-height=\"115\"></div>"+
                                                    "<p><strong>Product Name</strong><br>"+
                                                    ""+doc.short_desc+"</p>"+
                                                    "</div>";
                                
//                                var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
//                                var imageCounts =   parseInt(localStorage.imageCount);
//                                if(imageSyncCountInLocalDb>=imageCounts)
                                getImage64withId(doc.img,doc.title+"img");
                                
                                
                                $("#related_product_div").append(relatedProdHtml);
                                
                                }
                                
                                });
                  
                  
                  }
                  }
                 }
    
   
    
                  $('#productSpecScroll').slimScroll({
                                                     height: '520px'
                                                     });
                  $("#baseCategwf").trigger('create');
                  
                  
//                  var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
//                  var imageCounts =   parseInt(localStorage.imageCount);
//                  if(imageSyncCountInLocalDb>=imageCounts)
                  getImage64withId(doc.img,doc.title+"img");
                  
                    $( "#catalogProduct_Details_popup" ).popup( "open",{ transition: 'flip' } );
                  }
                  else
                  {
//                  showCustomAlert("Unable to retrieve products, please try again...");
                  }
                  });
    
  
}

function showPurchaseHistory(){
    showCustomAlert("This feature is coming soon.");
}

function showPdfCatalog(){
   // showCustomAlert("This feature is coming soon.");
    showInAppBrowser('http://goeserv.com/winzer_cat');

}

function showInAppBrowser(url){
     var ref = window.open(url, '_blank', 'location=no');
}

function catalog_addToCart(){
    
    
    
    var qua=document.getElementById("addtocart_qty_id").value;
    var cartData="";
    
    if(qua>0){
        
        if(addToCart_arr.length==0){
            addToCart_arr.push(addToCart_doc);
            addToCart_Quaarr.push(qua);
            cartData="  <div  style=\"border-bottom:solid 1px #666; padding-bottom:12px; padding-top:12px; text-align:text-align: center;\"class=\"span12 \">                    <div class=\"span2\" style=\"height: 30px;     width: 32px;\"> <img src=\"img/button.png\" width=\"37\" height=\"49\"> </div>                    <div class=\"span9\">                    <p>"+addToCart_doc.title+"<br>Part #"+addToCart_doc.pno+"</p>"+
            "<div class=\"span4\" style=\"height:47px;\"> <img  id=\""+addToCart_doc.title+"\" style=\"height:40px;\"  src=\"images/"+addToCart_doc.img+"\"onError=\"this.src = 'images/img_not_available_160_160.jpg'\" class=\"img-polaroid\"> </div><div class=\"span6\">"+
            "<p>"+"$"+addToCart_doc.price+" x "+"<input type=\"number\" name=\"search-mini\" data-inline=\"true\" class=\"addToQtyTxt\" style=\"width:50px;height:35px;\" value=\""+addToCart_Quaarr[0]+"\" data-mini=\"true\" />"+
            "<div style=\"width:65px; word-wrap:break-word;\" id=\"totalSum"+0+"\">$"+(addToCart_doc.price * addToCart_Quaarr[0]).toFixed(2)+"<div></p></div>                    </div>                    </div> ";
            
            $("#cartDataItem").html(cartData);
            
            var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
            var imageCounts =   parseInt(localStorage.imageCount);
//            if(imageSyncCountInLocalDb>=imageCounts)
//                getImage64withId(addToCart_doc.img,addToCart_doc.title);
            
            $(".addToQtyTxt").bind('input', function() {
                                   $(this).val() // get the current value of the input field.
                                   
                                   //alert($(this).val() * addToCart_doc.price);
                                   document.getElementById('totalSum'+0).innerHTML="$"+($(this).val() * addToCart_doc.price).toFixed(2);
                                   addToCart_Quaarr[0]=$(this).val();
                                   });
            
            
            
            
        }else{
            
            
            var tempCount=0;
            for(;tempCount<addToCart_arr.length;tempCount++){
                
                var temp=addToCart_arr[tempCount].pno;
                
                if(temp==addToCart_doc.pno){
                    
                    break;
                }
                
            }
            
            //            alert(tempCount+" / "+addToCart_arr.length);
            if(tempCount==addToCart_arr.length){
                //                alert("add in cart");
                addToCart_arr.push(addToCart_doc);
                addToCart_Quaarr.push(qua);
                
                
                
                for(index in addToCart_arr){
                    //      alert(addToCart_arr[index].title);
                    console.log(addToCart_arr[index].title);
                    
                    cartData+="   <div  style=\"border-bottom:solid 1px #666; padding-bottom:12px; padding-top:12px; text-align:text-align: center;\"class=\"span12 \">                   <div class=\"span2\" style=\"height: 30px;     width: 32px;\"> <img src=\"img/button.png\" width=\"37\" height=\"49\"> </div>                    <div class=\"span9\">                    <p>"+addToCart_arr[index].title+"<br>Part #"+addToCart_arr[index].pno+"</p>"+
                    "<div class=\"span4\" style=\"height:47px;\"> <img  id=\""+addToCart_arr[index].title+"\" style=\"height:40px;\"  src=\"images/"+addToCart_arr[index].img+"\"onError=\"this.src = 'images/img_not_available_160_160.jpg'\" class=\"img-polaroid\"> </div><div class=\"span6\">"+
                    "<p>"+"$"+addToCart_arr[index].price+" x "+"<input type=\"number\" name=\"search-mini\" data-inline=\"true\" class=\"addToQtyTxt\" id=\'addToQty"+index+"\' style=\"width:50px;height:35px;\" value=\""+addToCart_Quaarr[index]+"\" data-mini=\"true\" />"+ "<div  id=\'totalSum"+index+"\' style=\"width:65px; word-wrap:break-word;\"  \">"+"$"+(addToCart_arr[index].price * addToCart_Quaarr[index]).toFixed(2)+         "</div></p></div></div></div> ";
                    
                    
                    
//                    var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
//                    var imageCounts =   parseInt(localStorage.imageCount);
//                    if(imageSyncCountInLocalDb>=imageCounts)
                        getImage64withId(addToCart_arr[index].img,addToCart_arr[index].title);
                    
                    
                }
                
                
                $("#cartDataItem").html(cartData);
                $("#cartDataItem").trigger('create');
                
                
                $(".addToQtyTxt").bind('input', function() {
                                      
                                       var str=$(this).attr('id');
                                       
                                      //  alert("* "+addToCart_arr[str.substring(8,str.length)].price);
                                      document.getElementById('totalSum'+str.substring(8,str.length)).innerHTML = "$"+($(this).val() * addToCart_arr[str.substring(8,str.length)].price).toFixed(2);
                                      addToCart_Quaarr[str.substring(8,str.length)]=$(this).val();
                                       
                                       });
                
                
            }else{
                showCustomAlert("Product already exist in Cart");
                
            }
            
            
        }
        
    }else{
        //        alert("Not a valid quantity");
        showCustomAlert("Not a valid quantity");
    }
}

function catalogProduct_Details_popup_left(){
    alert("Left");
    
}

function catalogProduct_Details_popup_right(){
    
    alert("Right");
}


