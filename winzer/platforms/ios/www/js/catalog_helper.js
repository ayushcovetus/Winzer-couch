
var catalogIndexingComplete = false;
var addToCart_arr= new Array();
var addToCart_Quaarr=new Array();
var addToCart_doc;


function catalogIndexing(){
     $("#syncState").html("Catalog indexing...Please wait...");
    loadingWithMsg("show","Setting up Catalog...");
    config.views(["listTopLevelCateg"], function(err, view) {
                 
                 if(err){
//                  loadingWithMsg('hide','');
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
    var endK = "038"+"\u9999"
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
                                  listOfProductswithPno();
                 }
                 
                 });
}

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
                 
                 setupImageDbTrigger();
                 
                 localStorage.catalogIndexingComplete = "true";
                 
                 console.log("localStorage.catalogIndexingComplete- "+localStorage.catalogIndexingComplete);
                 
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
    config.views(["lists",{limit:20}], function(err, view) {
                 
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
    config.views(["listsOfProducts",{key: "CV Boot"}], function(err, view) {
                 
                 
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

function getBaseCategFromLocalDb(page){

    
    var recordSyncCountInLocalDb = parseInt(localStorage.seq);
    var recordCounts = parseInt(localStorage.catalogCount);
   
    document.getElementById("liProductcatalog").className = "active";
    document.getElementById("liQuickSearch").className = "";
    document.getElementById("liPartPrefix").className = "";
    
    console.log("ocalStorage.seq:"+localStorage.seq+"--localStorage.catalogCount:"+localStorage.catalogCount);
    
    if(recordSyncCountInLocalDb<recordCounts)
    {
        showCustomAlert("Sync is in progress, please wait..");
        return 0;
    }
    
    
    
    
        
//   if(localStorage.catalogCallCount==0)
    
    console.log("localStorage.isCatalogIndexingComplete - "+localStorage.catalogIndexingComplete);
    localStorage.catalogIndexingComplete="true";
    if(localStorage.catalogIndexingComplete=="true")
    {
    
    $("#bradcrumMain").html("<strong><a onclick=\"getBaseCategFromLocalDb('login')\"><font color=\"#000\">Catalog</font></a></strong>");
    loadingWithMsg("show","Loading Products...");
    
    
    $("#mainHeadCatalog").html("Catalog");
    
   
    
    
    
    
    config.views(["listTopLevelCateg",{decending:true}], function(err, view) {
                 
                 
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
                 
                bradcrumArry = ["Catalog"];
//                 alert(imageFromDB);
//                 listsIndexing();
                 tempPathArray = [];
                 $("#sync_status").html("");
                 $("#content").html("");
                 $("#content1").html("");
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"> <div id=\"wrapper\"><div id=\"scroller\" style=\"padding-left:25px;padding-top:15px;\"> ";
                 
                 for(index in view.rows){
                 
                 
                 if(view.rows[index].value.cat_title!="Home" && view.rows[index].value.cat_title!="Business Supplies" && view.rows[index].value.cat_title!="")
                 baseCateghtml += "<div  onclick=\"getchildcategories('"+view.rows[index].value.cat_title+"');\" class=\"span3 main_product\" style=\"height:145px;margin-left:-1%;\">"
                 +"<div style=\"height:20px;\"><p>"+view.rows[index].value.cat_title+"</p></div>"
                 +"<div class=\"inner_dashbord\"><img style=\"height:70px;\"  src=\"img/"+view.rows[index].value.cat_image+"\"  onError=\"this.src = 'images/img_not_available_160_160.jpg'\" height=\"195\"></div>"
                 +"</div>";
                 
                 }
                 
                 baseCateghtml +="</div></div></div></div><div class=\"clearfix\"></div>";
                 
                 loadingWithMsg('hide','');
                 $("#baseCategwf").html(baseCateghtml);
                 
                 $.mobile.changePage( $("#login"), { transition: "slide", reverse: true,  reloadPage:true, changeHash:true});
                 $("#login").trigger( "pagecreate" );
                 
//                 var element = document.getElementById("liProductcatalog");
//                 element.className += "active";
                 
//                 $("#liProductcatalog").css('background-image', "url('../img/footer_nav.png')");
//                 $("#liProductcatalog").css('background-repeat', "repeat-x");
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
    console.log("finding image for - "+srcId);
    
    if(id!=null){
    configImg.dbimages.get(imgId, function(err, view){
                           
                           
                           if(err){
                            console.log("err - "+ JSON.stringify(err));
                           }
                           else{
//                           console.log("Image data - "+JSON.stringify(view));
                           document.getElementById(srcId).setAttribute( 'src', 'data:image/jpg;base64,'+view.image_data);
                           }
                           });
    }
    
    
   
    
    
}



// ************** Getting Child Categories and product list  *************** //

var imageArray = [];
var tempPathArray = [];
function getchildcategories(findsubCategFor){
    
    loadingWithMsg('show','Loading Products for '+findsubCategFor);
    
    document.getElementById("liProductcatalog").className = "active";
    document.getElementById("liQuickSearch").className = "";
    document.getElementById("liPartPrefix").className = "";
    
    console.log("rrrrrrr"+findsubCategFor);
    
    if(findsubCategFor=="Catalog"){
        getBaseCategFromLocalDb('login');
        bradcrumArry = ["Catalog"];
        return;
    }
    
//    alert("find sub-categ for - "+findsubCategFor);
    
    $("#mainHeadCatalog").html("Catalog");
    
    config.views(["lists",{key: [findsubCategFor]}], function(err, view) {
                 if(!err){
                 $("#contentOneLvl").html("");
                 
//                 alert("response - "+JSON.stringify(view));
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
                 
                 if(view.rows.length==0)
                 {
                 console.log("getting products ....");
                 config.views(["listsOfProducts",{key: findsubCategFor, limit:20}], function(err, view) {
                              if(!err){
                              
                              
                              
                              
                              var lastIndexForProducts = 20;
                              
                              if(view.rows.length==0)
                              {
                              showCustomAlert("No products found for selected category, sync is in progress, please try after sometime...");
                              loadingWithMsg( "hide" ,"");
                              return;
                              }
                              
                              console.log(JSON.stringify(view));
                              
                              var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:96%;padding:0px;\">";
                              
//                              baseCateghtml += "<div align=\"center\" data-theme=\"a\" class=\"ui-grid-d\"><div class=\"ui-block-a\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description</strong></div>"+
//                              "<div class=\"ui-block-b\" style=\"padding-left:40px;\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Part No.</strong></div>"+
//                              "<div class=\"ui-block-c\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price</strong></div>"+
//                              "<div class=\"ui-block-d\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pkg Qty.</strong></div><div class=\"ui-block-e\"></div></div><div id=\"productSlimScroll\">";
//                              
                              
                              
//                              baseCateghtml += "<div id=\"productSlimScroll\"><table class=\"table\">"+
//                                               "     <thead>"+
//                                                "        <tr>"+
//                              "            <th style=\"padding-left:40px;\">Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>"+
//                                                "            <th style=\"padding-left:10px;\">Part No.</th>"+
//                                                "            <th style=\"padding-left:10px;\">Price</th>"+
//                                                "            <th>Pkg Qty.</th>"+
//                                                "            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>"+
//                                                "        </tr>"+
//                                                "</thead></table><table><tbody>";

                              
                              baseCateghtml += "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                              "     <thead>"+
                              "        <tr>"+
                              "            <th style=\"width: 39%;\">Description</th>"+
                              "            <th style=\"width: 16%;\">Part No.</th>"+
                              "            <th style=\"width: 16%;\">Price</th>"+
                              "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
                              "            <th style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>"+
                              "        </tr>"+
                              "</thead></table><div id=\"productSlimScroll\"><table class=\"table\"><tbody id=\"table_body\">";

                              
                              
                              bradcrumArry.push(findsubCategFor);
                              
                              getchildcategorieswithBradcrum(findsubCategFor);
                              
                              for(index in view.rows){
                              
                              baseCateghtml += "<tr>"+
                                                    "<td style=\"width: 39%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                                                    "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pno+"</td>"+
                                                    "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                                    "<td style=\"width: 16%;\" onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.pkgq+"</td>"+
                                                    "<td style=\"padding-bottom: 0px; padding-top: 2px; width: 16%;\">"+
                                                        "<div class=\"span7\">"+
                                                            "<input data-type=\"none\" style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" />"+
                                                       "</div>"+
                                                        "<div class=\"span4\" style=\"margin-top:5px;\">"+
                                                            "<img src=\"img/add_button.jpg\" width=\"20px\" height=\"20px\">"+
                                                        "</div>"+
                                                    "</td>"
                                                "</tr>";

                              lastIndexForProducts = view.rows[index].value.pno;
                              
//                              baseCateghtml += "<hr style=\"margin:2px 0px;\"><div onclick=\"showProductSpec('"+view.rows[index].id+"');\" align=\"center\" data-theme=\"a\" class=\"ui-grid-d\"><div class=\"ui-block-a\">"+view.rows[index].value.title+"</div>"+
//                              "<div class=\"ui-block-b\">"+view.rows[index].value.pno+"</div>"+
//                              "<div class=\"ui-block-c\">"+view.rows[index].value.price+"</div>"+
//                              "<div class=\"ui-block-d\">"+view.rows[index].value.pkgq+"</div>"+
//                              "<div class=\"ui-block-e\"><div class=\"span7\"><input style=\"width:41px; margin:0px;\" type=\"number\" placeholder=\"qty.\" /></div>"+
//                              "<div class=\"span4\" style=\"margin-top:2px;\"><img src=\"img/add_button.jpg\" width=\"30px\" height=\"20px\"></div></div></div>";
//                              
                              }
                              loadingWithMsg( "hide","" );
                              baseCateghtml += "</tbody></table></div></div></div></div><div class=\"clearfix\"></div>";
                              $("#baseCategwf").html(baseCateghtml);
                              $("#baseCategwf").trigger('create');
                              $('#productSlimScroll').slimScroll({
                                                                 height: '435px',
                                                                 wheelStep: 100
                                                                 });
                              
                              
                            
                              $('#productSlimScroll').slimScroll().bind('slimscroll', function(e, pos){
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        if(pos=="bottom"){
                                                                        
//                                                                        alert("bottom");
//                                                                        var endKkey = lastIndexForProducts+20;
                                                                        
//                                                                        loadingWithMsg('show','Loading Products for '+findsubCategFor);
                                                                        
                                                                        console.log(findsubCategFor+"--"+lastIndexForProducts);
                                                                        config.views(["listsOfProductsWithPno",{startkey:[findsubCategFor,lastIndexForProducts], endkey:[findsubCategFor,"\u0fff"], limit:20}], function(err, view) {
                                                                                     if(!err){
//                                                                                     alert(view.rows.length);
                                                                                     if(view.rows.length==1)
                                                                                     {
                                                                                     showCustomAlert("No more products to show..");
                                                                                     return;
                                                                                     }
                                                                                     
                                                                                     
                                                                                     
                                                                                     var extraRows = "";
                                                                                     
                                                                                     for(index in view.rows){
                                                                                     
                                                                                     extraRows += "<tr>"+
                                                                                     "<td onclick=\"showProductSpec('"+view.rows[index].id+"');\">"+view.rows[index].value.title+"</td>"+
                                                                                     "<td>"+view.rows[index].value.pno+"</td>"+
                                                                                     "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
                                                                                     "<td>"+view.rows[index].value.pkgq+"&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
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
                                                                                    
                                                                                     }
                                                                                     
                                                                                     
                                                                                     $("#table_body").append(extraRows);
                                                                                     $("#baseCategwf").trigger('create');
//                                                                                     $('#productSlimScroll').slimScroll({
//                                                                                                                        height: '435px',
//                                                                                                                        wheelStep: 80
//                                                                                                                        });
                                                                                     
                                                                                     }else{
//                                                                                     showCustomAlert("Unable to retrieve products, please try again...");
                                                                                     }
                                                                                     });
                                                                        
                                                                        }
                                                                        
                                                                        
                                                                        });
                              
                              
                              
                              
                              console.log("html- "+baseCateghtml);
//                              alert("html recieved..");
                              
                              }
                              else
                              {
                              
                              }
//                              showCustomAlert("Unable to retrieve products, please try again...");
                              loadingWithMsg( "hide","" );
                              });
                 
                 return;
                 }
                 
                 console.log("tempPathArray - "+tempPathArray);
                 
                 
                 
                 
                 $("#baseCategwf").html("<div class=\"hero-unit\"><div class=\"hero_inner_box12\">");
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div id=\"wrapperSlimScroll\">";
                 
                 bradcrumArry.push(findsubCategFor);
                 
                 getchildcategorieswithBradcrum(findsubCategFor);
                 
                 console.log(JSON.stringify(view.rows[0].value));
                 
                 for(index in view.rows){
                 tempPathArray.push(view.rows[index].value.cat_title);
                 
                 console.log("document path for "+findsubCategFor+" - "+view.rows[index].value.cat_paths+" and the tempArray - "+tempPathArray);
                 
//                 setTimeout(getImage64withId(view.rows[index].value.cat_image), 500 * index);
                 
                 var catPathArray = view.rows[index].value.cat_paths[0];
                 
                 console.log("array equals - "+arraysEqual(catPathArray,tempPathArray));
                 
                 
                 console.log("img -"+imageArray);
                 
                 
                 if(arraysEqual(catPathArray,tempPathArray))
                 baseCateghtml += "<div   onclick=\"getchildcategories('"+view.rows[index].value.cat_title+"');\" class=\"span3 main_product\" style=\"height:165px;margin-left:-1%;\">"
                 +"<div style=\"height:35px;display:table-cell; vertical-align:bottom; position:relative;\">"+view.rows[index].value.cat_title+"</div>"
                 +"<div class=\"inner_dashbord\"><img style=\"height:70px;\"  id=\""+view.rows[index].value.cat_title+"\" src=\"images/"+view.rows[index].value.cat_image+"\" onError=\"this.src = 'images/img_not_available_160_160.jpg'\" width=\"auto\" height=\"auto\"></div>"
                 +"</div>";
                 
                 
                 tempPathArray.pop();
                 
                 
                 var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
                 var imageCounts =   parseInt(localStorage.imageCount);
                 if(imageSyncCountInLocalDb>=imageCounts)
                 getImage64withId(view.rows[index].value.cat_image,view.rows[index].value.cat_title);
                 
                 }
                 baseCateghtml += "</div></div></div><div class=\"clearfix\"></div>";
                 
                 $("#baseCategwf").html(baseCateghtml);
                 $('#wrapperSlimScroll').slimScroll({
                                                    height: '485px',
                                                    alwaysVisible: true
                                                    });
                 loadingWithMsg('hide','');
                 }
                 else
                 showCustomAlert("Unable to retrieve products, please try again...");
                 
                 loadingWithMsg('hide','');
                 });
    
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
    
    config.db.get(prod, function(err, doc){
                  if(!err){
                  console.log("doc found"+JSON.stringify(doc));
                  var tempSpecArry = "";
                  var tempSpecValueArry = "";
                  addToCart_doc = doc;
                  for(index in doc.specs){
                  
                  
                  tempSpecArry += "<div data-theme=\"a\" class=\"ui-grid-a\"><div class=\"ui-block-a\">"+index+"</div><div class=\"ui-block-b\">"+doc.specs[index]+"</div></div>"
                  
                  tempSpecValueArry += doc.specs[index]+"<br/>";
                  }
                  
                  var msds_file_tag;
                  if(doc.msds_file=="")
                  msds_file_tag = "";
                  else
                  msds_file_tag = "MSDS Sheet";
                  
                  $("#catalogProduct_Details").html("<div id=\"productSpecScroll\" style=\"vertical-align: middle;\"><div class=\"hero-unit\" style=\"background-image: none;\">"+
                                                    "<div class=\"hero_inner_box2\" >"+
                                                    "<p style=\"padding-top:10px;\" class=\"pull-right\"><strong>Part #"+doc.pno+"</strong></p>"+
                                                    "<h4><strong>"+doc.title+"</strong></h4>"+
                                                    "<div class=\"span3\">"+
                                                    "<img id=\""+doc.title+"\" style=\"height:120px;\"  src=\"images/"+doc.img+"\" width=\"auto\" height=\"auto\" onError=\"this.src = 'images/img_not_available_160_160.jpg'\" class=\"img-polaroid\">"+
                                                    "<p style=\"padding-top:10px;\"><strong>Features and Benefits</strong></p>"+
                                                    "<p>"+doc.features+"</p>"+
                                                    "</div>"+
                                                    "<div class=\"span4\">"+
                                                    "<p><strong>Specifications</strong></p>"+
                                                    "<p>"+tempSpecArry+"</p></div><br/><div class=\"span2\">"+
                                                    "<p><strong>Price:</strong>  <strong  class=\"text-success\">Change Price</strong></p>"+
                                                    "<p ><strong>Package Qty</strong>: "+doc.pkgq+"</p>"+
                                                    "<p><strong>Qty:</strong><input data-role=\"none\" id=\"addtocart_qty_id\" style=\"padding-top:9px;width:30px;\" type=\"number\" data-mini=\"true\" data-inline=\"true\"></p>"+
                                                    "<div class=\"span4\"><p class=\"text-success\"><strong>Add to Cart</strong></p></div>"+
                                                    "<div class=\"span3\" style=\"margin-top:-5px;\"><img src=\"img/add_button.jpg\" onclick=\"catalog_addToCart();\" width=\"30px\" height=\"30px\"></div>"+
                                                    "</div>"+
                                                    "<div class=\"span2\">"+
                                                    "<div class=\"pull-right\">"+
                                                    "<p><strong>Downloads</strong></p>"+
                                                    "<p class=\"text-info\"><strong>"+msds_file_tag+"</strong></p>"+
//                                                    "<p class=\"text-info\"><strong>Tech Sheet</strong> </p>"+
                                                    "<p><strong>References</strong> </p>"+
                                                    "<p>Printed Catalog Page </p>"+
                                                    "</div>"+
                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+
//                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+
//                                                    "</div>"+
//                                                    "<div class=\"hero-unit\">"+
//                                                    "<div class=\"hero_inner_box2\">"+
//                                                    "<h4>Related Products</h4>"+
//                                                    "<div class=\"span1 dashbord\">"+
//                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
//                                                    "<p><strong>Product Name</strong><br>"+
//                                                    "686.6.19071</p>"+
//                                                    "</div>"+
//                                                    "<div class=\"span1 dashbord\">"+
//                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
//                                                    "<p><strong>Product Name</strong><br>"+
//                                                    "686.6.19071</p>"+
//                                                    "</div>"+
//                                                    "<div class=\"span1 dashbord\">"+
//                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
//                                                    "<p><strong>Product Name</strong><br>"+
//                                                    "686.6.19071</p>"+
//                                                    "</div>"+
//                                                    "<div class=\"span1 dashbord\">"+
//                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
//                                                    "<p><strong>Product Name</strong><br>"+
//                                                    "686.6.19071</p>"+
//                                                    "</div>"+
//                                                    "<div class=\"span1 dashbord\">"+
//                                                    "<div class=\"inner_dashbord\"><img src=\"img/img2.jpg\" width=\"135\" height=\"115\"></div>"+
//                                                    "<p><strong>Product Name</strong><br>"+
//                                                    "686.6.19071</p>"+
//                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+
//                                                    "</div>"+
//                                                    "<div class=\"clearfix\"></div>"+
//                                                    "</div>"+
                                                    "</div>");
                  $('#productSpecScroll').slimScroll({
                                                     height: '520px'
                                                     });
                  $("#baseCategwf").trigger('create');
                  
                  
                  var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
                  var imageCounts =   parseInt(localStorage.imageCount);
                  if(imageSyncCountInLocalDb>=imageCounts)
                  getImage64withId(doc.img,doc.title);
                  
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
    showCustomAlert("This feature is coming soon.");
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
            if(imageSyncCountInLocalDb>=imageCounts)
                getImage64withId(addToCart_doc.img,addToCart_doc.title);
            
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
                    
                    
                    
                    var imageSyncCountInLocalDb = parseInt(localStorage.imgseq);
                    var imageCounts =   parseInt(localStorage.imageCount);
                    if(imageSyncCountInLocalDb>=imageCounts)
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

