
function searchProductsForPartPrefixBottom(arrayIndex,prodAttribute,attributeVal){
    
    
    
    var matchingProductsArray = [];
    loadingWithMsg( 'show','Searching products' );
    
    globalArrtHoldingArray = arrayOfProducts;
    
    makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex);
    
    
    if(eleContainsInArray(selectedRadio,attributeVal)){
        
        var tempSelectedRadioArray = [];
        for(var tempA=0;tempA<selectedRadio.length;tempA++){
            
            
            
            if(selectedRadio[tempA]==attributeVal){
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
    
    //    lastActionOnPrefix
    
    
    
    
    
    
    
    
    var number = latestProductToSearchForPartPrefix;
    var startK = number;
    var endK = number+"\u9999";
    console.log("start key - "+startK);
    
    
    
     config.views(["getProductForFilterWithNumber",{startkey:number, limit:100}], function(err, encodedJSON){
//    config.views(["getProductForFilterWithNumber",{startkey:startK, endkey:endK, limit:100}], function(err, encodedJSON) {
                 
//                 console.log("encodedJSON for partprefix -"+JSON.stringify(encodedJSON));
                 
                 var baseCateghtml = "<div class=\"hero-unit\"><div class=\"hero_inner_box12\"><div style=\"width:97%;padding:0px;\">"+
                 "<div class=\"some-content-related-div\">"+
                 "<table style=\"margin-bottom:0px;\" class=\"table\">"+
                 "     <thead>"+
                 "        <tr>"+
                 "            <th style=\"width: 39%;\">Description</th>"+
                 "            <th style=\"width: 16%;\">Part No.</th>"+
                 "            <th style=\"width: 16%;\">Price</th>"+
                 "            <th style=\"width: 16%;\">Pkg Qty.</th>"+
                 "            <th style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>"+
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
                 getProductsForTheParent(currentLastLevelCategory);
                 }
                 
                 for(index in encodedJSON.rows){
                 
                 
                 var conditionsSatisfied = 0;
                 
                 
                 for (var holdingIndex in globalArrtHoldingArray){
                 
                 var isProductMatch = false;
                 
                 
                 
                 var productAttributeForSpec = globalArrtHoldingArray[holdingIndex];
                 
                 if(globalAttributArray[holdingIndex].length==0 || globalAttributArray[holdingIndex][0]==""){
                 conditionsSatisfied++;
                 }
                 
                 for(var indiIndex in globalAttributArray[holdingIndex]){
                 
                 
                 
                 
                 
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
                 for(;t<arrayOfProducts.length;t++){
                 if(arrayOfProducts[t] == index_key){
                 break;
                 }
                 }
                 
                 //                 console.log("success---1");
                 
                 if(t == arrayOfProducts.length){
                 
                 arrayOfProducts.push(index_key);
                 var temp_1 = parseInt(arrayOfProducts.length)-1;
                 arrayOfHoldingArrays[temp_1]=new Array();
                 
                 }
                 var product_index= arrayOfProducts.indexOf(index_key);
                 
                 
                 var q=0;
                 for(;q<arrayOfHoldingArrays[product_index].length;q++){
                 if(arrayOfHoldingArrays[product_index][q] == matchingProductsArray[index1].value.specs[index_key]){
                 break;
                 }
                 }
                 if(q == arrayOfHoldingArrays[product_index].length){
                 arrayOfHoldingArrays[product_index].push(matchingProductsArray[index1].value.specs[index_key]);
                 }
                 
                 }
                 
                 
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index1)+1;
                 if(matchingProductsArray.length == temp_2){
                 
                 
                 
                 
                 var temp_html;
                 var html_hoalder_Array =new Array();
                 
                 for(attribute in arrayOfProducts){
                 
                 globalAttributArray[attribute] = new Array();
                 
                 
                 
                 for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                 console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                 if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[attribute]){
                 globalAttributArray[attribute].push(lastGlobalAttrArray[temp]);
                 
                 }
                 }
                 
                 temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                 temp_html += "<h3><strong>"+arrayOfProducts[attribute]+"</strong></h2><div  data-role=\"fieldcontain\">"+
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
                 
                 $("#filter_options_buttons").html("<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; width:135px;\">Reset</div>");
                 //                                                   "<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                 
                 $("#filter_options_ul").trigger( "create" );
                 
                 }
                 
                 
                 
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 
                 }
                 
                 
                 
                 
                 
                 
                 baseCateghtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(baseCateghtml);
                 $("#totalProductsCount").html(countT+" Items");
                 $("#filterBradcrum").html(htmlForFilterBradcrum);
                 $("#baseCategwf").trigger('create');
                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });
                 loadingWithMsg( 'hide','' );
                 console.log("Filter Method call hide loader...");
                 });
    
    
    
}

function searchProductsForPartPrefixTop(arrayIndex,prodAttribute,attributeVal){
    
    alert("searchProductsForPartPrefixTop");
    
    var matchingProductsArray = [];
    loadingWithMsg( 'show','Searching products' );
    
    globalArrtHoldingArray = arrayOfProducts;
    
    makeAttributeAndValueArry(prodAttribute,attributeVal,arrayIndex);
    
    
    if(eleContainsInArray(selectedRadio,attributeVal)){
        
        var tempSelectedRadioArray = [];
        for(var tempA=0;tempA<selectedRadio.length;tempA++){
            
            
            
            if(selectedRadio[tempA]==attributeVal){
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
    
    //    lastActionOnPrefix
    
    
    
    
    
    
    
    
    var number = latestProductToSearchForPartPrefix;
    var startK = number;
    var endK = number+"\u9999";
    console.log("start key - "+startK);
    
    
    
    config.views(["getProductForFilterWithNumber",{startkey:number, descending:true, limit:100}], function(err, encodedJSON){
//    config.views(["getProductForFilterWithNumber",{startkey:startK, endkey:endK, limit:100}], function(err, encodedJSON) {
                 
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
                 "            <th style=\"width: 16%;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>"+
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
                 getProductsForTheParent(currentLastLevelCategory);
                 }
                 
                 for(index in encodedJSON.rows){
                 
                 
                 var conditionsSatisfied = 0;
                 
                 
                 for (var holdingIndex in globalArrtHoldingArray){
                 
                 var isProductMatch = false;
                 
                 
                 
                 var productAttributeForSpec = globalArrtHoldingArray[holdingIndex];
                 
                 if(globalAttributArray[holdingIndex].length==0 || globalAttributArray[holdingIndex][0]==""){
                 conditionsSatisfied++;
                 }
                 
                 for(var indiIndex in globalAttributArray[holdingIndex]){
                 
                 
                 
                 
                 
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
                 for(;t<arrayOfProducts.length;t++){
                 if(arrayOfProducts[t] == index_key){
                 break;
                 }
                 }
                 
                 //                 console.log("success---1");
                 
                 if(t == arrayOfProducts.length){
                 
                 arrayOfProducts.push(index_key);
                 var temp_1 = parseInt(arrayOfProducts.length)-1;
                 arrayOfHoldingArrays[temp_1]=new Array();
                 
                 }
                 var product_index= arrayOfProducts.indexOf(index_key);
                 
                 
                 var q=0;
                 for(;q<arrayOfHoldingArrays[product_index].length;q++){
                 if(arrayOfHoldingArrays[product_index][q] == matchingProductsArray[index1].value.specs[index_key]){
                 break;
                 }
                 }
                 if(q == arrayOfHoldingArrays[product_index].length){
                 arrayOfHoldingArrays[product_index].push(matchingProductsArray[index1].value.specs[index_key]);
                 }
                 
                 }
                 
                 
                 var attributeKeyHtml = "<div class=\"filterCollapse\" data-role=\"collapsible-set\">";
                 var temp_2 = parseInt(index1)+1;
                 if(matchingProductsArray.length == temp_2){
                 
                 
                 
                 
                 var temp_html;
                 var html_hoalder_Array =new Array();
                 
                 for(attribute in arrayOfProducts){
                 
                 globalAttributArray[attribute] = new Array();
                 
                 
                 
                 for(var temp=0;temp<lastGlobalAttrHoldingArray.length;temp++){
                 console.log("lastGlobalAttrArray[temp] - "+lastGlobalAttrArray[temp]);
                 if(lastGlobalAttrHoldingArray[temp]==arrayOfProducts[attribute]){
                 globalAttributArray[attribute].push(lastGlobalAttrArray[temp]);
                 
                 }
                 }
                 
                 temp_html = "<div  data-role=\"collapsible\" data-theme=\"b\">";
                 temp_html += "<h3><strong>"+arrayOfProducts[attribute]+"</strong></h2><div  data-role=\"fieldcontain\">"+
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
                 
                 $("#filter_options_buttons").html("<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; width:135px;\">Reset</div>");
                 //                                                   "<div onclick=\"resetFilterPartPrefix();\" data-role=\"button\" style=\"float:left; padding:2px; margin-left:8px; width:60px;\">Clear</div>");
                 
                 $("#filter_options_ul").trigger( "create" );
                 
                 }
                 
                 
                 
                 
                 
                 
                 //*********************** RESET FILTERS *********************//
                 
                 
                 
                 }
                 
                 
                 
                 
                 
                 
                 baseCateghtml += "</div></table></div></div></div></div></div></div><div class=\"clearfix\"></div>";
                 $("#baseCategwf").html(baseCateghtml);
                 $("#totalProductsCount").html(countT+" Items");
                 $("#filterBradcrum").html(htmlForFilterBradcrum);
                 $("#baseCategwf").trigger('create');
                 var myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, useTransition:true });
                 loadingWithMsg( 'hide','' );
                 console.log("Filter Method call hide loader...");
                 });
    
    
    
}

