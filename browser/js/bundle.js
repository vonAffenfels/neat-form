!function(n){function e(o){if(r[o])return r[o].exports;var i=r[o]={exports:{},id:o,loaded:!1};return n[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};e.m=n,e.c=r,e.p="/neat-form/js/",e(0)}([function(n,e,r){"use strict";!function(n,e){r(1);var o=e.module("neat-form",["neat-api"]);o.templateRoot="./templates/",r(2)(o),r(5)(o),r(8)(o),r(9).keys().forEach(function(n){var e=n.split("/");e.shift();var i="neatFormField"+e.shift();i=i.replace(/\.js$/i,""),n=n.replace(/^\.\//i,""),o.directive(i,r(26)("./"+n)(o))})}(window,window.angular)},function(n,e){!function(n){function e(o){if(r[o])return r[o].exports;var i=r[o]={exports:{},id:o,loaded:!1};return n[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};e.m=n,e.c=r,e.p="/neat-form/js/",e(0)}([function(n,e){"use strict";window,window.angular.module("neat-api",[]).service("neatApi",["$resource","$location",function(n,e){var r="//"+e.host()+":"+e.port();return n(r,{},{login:{url:r+"/auth/login",method:"POST",isArray:!1,params:{}},logout:{url:r+"/auth/logout",method:"POST",isArray:!1,params:{}},resendActivation:{url:r+"/auth/resend-activation",method:"POST",isArray:!1,params:{}},activate:{url:r+"/auth/activate-account",method:"POST",isArray:!1,params:{}},resetPassword:{url:r+"/auth/do-reset-password",method:"POST",isArray:!1,params:{}},requestResetPassword:{url:r+"/auth/reset-password",method:"POST",isArray:!1,params:{}},find:{url:r+"/api/:model/find",method:"POST",isArray:!0,params:{model:"@model"}},findOne:{url:r+"/api/:model/findOne",method:"POST",params:{model:"@model"}},versions:{url:r+"/api/:model/versions",method:"POST",isArray:!0,params:{model:"@model"}},save:{url:r+"/api/:model/save",method:"POST",params:{model:"@model"}},update:{url:r+"/api/:model/update",method:"POST",params:{model:"@model"}},remove:{url:r+"/api/:model/remove",method:"POST",params:{model:"@model"}},count:{url:r+"/api/:model/count",method:"POST",params:{model:"@model"}},pagination:{url:r+"/api/:model/pagination",method:"POST",params:{model:"@model"}},schema:{url:r+"/api/:model/schema",method:"POST",params:{model:"@model"}},dropdownoptions:{url:r+"/api/:model/dropdownoptions",method:"POST",isArray:!0,params:{model:"@model"}},form:{url:r+"/form-api/:form/:_id",method:"GET",isArray:!0,params:{form:"@form",_id:"@_id"}},formSubmit:{url:r+"/form-api/:form",method:"POST",isArray:!0,params:{form:"@form"}}})}])}])},function(n,e,r){"use strict";n.exports=function(n){n.directive("neatForm",[function(){return{restrict:"E",template:r(3)(n.templateRoot+"neatForm.html"),scope:{id:"=",form:"="},controller:"neatFormCtrl"}}]),n.controller("neatFormCtrl",["$scope","neatApi",function(n,e){n.reset=function(){n.loading||(n.loading=!0,e.form({form:n.form,_id:n.id},function(e){n.loading=!1,n.config=e,n.error=null}))},n.reset(),n.getValues=function(e,r){if(r=r||{},e instanceof Array)for(var o=0;o<e.length;o++){var i=e[o];n.getValues(i,r)}else if(e.fields)for(var a=0;a<e.fields.length;a++){var t=e.fields[a];n.getValues(t,r)}else r[e.id]=e.value;return r},n.submit=function(){n.loading||(n.loading=!0,e.formSubmit({_id:n.id,data:n.getValues(n.config),form:n.form},function(e){n.loading=!1,n.config=e},function(e){n.loading=!1}))}}])}},function(n,e,r){function o(n){return r(i(n))}function i(n){return a[n]||function(){throw new Error("Cannot find module '"+n+"'.")}()}var a={"./templates/neatForm.html":4};o.keys=function(){return Object.keys(a)},o.resolve=i,n.exports=o,o.id=3},function(n,e){n.exports='<style>\r\n    .neat-form-section-body {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n    }\r\n\r\n    .neat-3-col-form {\r\n        width: 33%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-2-col-form {\r\n        width: 50%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-1-col-form {\r\n        width: 100%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n</style>\r\n<form ng-submit="submit()" class="form form-horizontal panel neat-form" ng-class="{\'panel-loading\': loading}">\r\n    <div class="panel-body">\r\n        <div class="panel-loader" ng-if="loading">\r\n            <div class="spinner-small"></div>\r\n        </div>\r\n        <div class="row" ng-repeat="conf in config">\r\n            <neat-form-section config="conf" ng-if="conf.fields">\r\n            </neat-form-section>\r\n        </div>\r\n        <div class="row">\r\n            <div class="panel panel-inverse">\r\n                <div class="panel-body">\r\n                    <div class="col-md-10" style="padding-left: 0">\r\n                        <button type="submit" class="btn btn-primary btn-block col-md-10">{{config.renderOptions.saveButtonLabel || "Save"}}</button>\r\n                    </div>\r\n                    <div class="col-md-2" style="padding-right: 0">\r\n                        <button type="button" ng-click="reset()" class="btn btn-white btn-block col-md-2">{{config.renderOptions.resetButtonLabel || "Reset"}}</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>'},function(n,e,r){"use strict";n.exports=function(n){n.directive("neatFormSection",[function(){return{restrict:"E",template:r(6)(n.templateRoot+"neatFormSection.html"),scope:{config:"="},controller:"neatFormSectionCtrl"}}]),n.controller("neatFormSectionCtrl",["$scope",function(n){}])}},function(n,e,r){function o(n){return r(i(n))}function i(n){return a[n]||function(){throw new Error("Cannot find module '"+n+"'.")}()}var a={"./templates/neatFormSection.html":7};o.keys=function(){return Object.keys(a)},o.resolve=i,n.exports=o,o.id=6},function(n,e){n.exports='<div class="panel panel-inverse">\r\n    <div class="panel-heading">\r\n        <h4 class="panel-title">{{config.label}}</h4>\r\n    </div>\r\n    <div class="panel-body neat-form-section-body">\r\n        <div ng-repeat="conf in config.fields" ng-class="{\r\n            \'neat-3-col-form\': config.columns === 3,\r\n            \'neat-2-col-form\': config.columns === 2,\r\n            \'neat-1-col-form\': config.columns === 1\r\n        }">\r\n            <neat-form-section config="conf" ng-if="conf.fields">\r\n            </neat-form-section>\r\n            <neat-form-field config="conf" ng-if="!conf.fields">\r\n            </neat-form-field>\r\n        </div>\r\n    </div>\r\n</div>'},function(n,e){"use strict";n.exports=function(n){n.directive("neatFormField",["$compile",function(n){return{restrict:"E",scope:{config:"="},link:function(e,r){try{n("<neat-form-field-"+e.config.type+' config="config"></neat-form-field-'+e.config.type+">")(e,function(n,e){r.append(n)})}catch(n){console.error("Error compiling field "+e.config.type,e.config),console.error(n)}}}}])}},function(n,e,r){function o(n){return r(i(n))}function i(n){return a[n]||function(){throw new Error("Cannot find module '"+n+"'.")}()}var a={"./Address.js":10,"./Booleanplus.js":12,"./Email.js":14,"./Gps.js":16,"./Input.js":18,"./Password.js":20,"./Radio.js":22,"./Select.js":24};o.keys=function(){return Object.keys(a)},o.resolve=i,n.exports=o,o.id=9},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(11),scope:{config:"="},controller:["$scope",function(n){var e=n.config.errors||{};n.countryConfig={type:"Select",id:n.config+".country",value:n.config.value?n.config.value.country:null,label:n.config.label.country,errors:e.country,renderOptions:n.config.renderOptions,options:{AF:"Afghanistan",AX:"Alandinseln",AL:"Albanien",DZ:"Algerien",UM:"Amerikanisch-Ozeanien",AS:"Amerikanisch-Samoa",VI:"Amerikanische Jungferninseln",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarktis",AG:"Antigua und Barbuda",AR:"Argentinien",AM:"Armenien",AW:"Aruba",AZ:"Aserbaidschan",AU:"Australien",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesch",BB:"Barbados",BY:"Belarus",BE:"Belgien",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivien",BA:"Bosnien und Herzegowina",BW:"Botsuana",BV:"Bouvetinsel",BR:"Brasilien",VG:"Britische Jungferninseln",IO:"Britisches Territorium im Indischen Ozean",BN:"Brunei Darussalam",BG:"Bulgarien",BF:"Burkina Faso",BI:"Burundi",CL:"Chile",CN:"China",CK:"Cookinseln",CR:"Costa Rica",CI:"Côte d’Ivoire",CD:"Demokratische Republik Kongo",KP:"Demokratische Volksrepublik Korea",DE:"Deutschland",DM:"Dominica",DO:"Dominikanische Republik",DJ:"Dschibuti",DK:"Dänemark",EC:"Ecuador",SV:"El Salvador",ER:"Eritrea",EE:"Estland",FK:"Falklandinseln",FJ:"Fidschi",FI:"Finnland",FR:"Frankreich",GF:"Französisch-Guayana",PF:"Französisch-Polynesien",TF:"Französische Süd- und Antarktisgebiete",FO:"Färöer",GA:"Gabun",GM:"Gambia",GE:"Georgien",GH:"Ghana",GI:"Gibraltar",GD:"Grenada",GR:"Griechenland",GL:"Grönland",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard- und McDonald-Inseln",HN:"Honduras",IN:"Indien",ID:"Indonesien",IQ:"Irak",IR:"Iran",IE:"Irland",IS:"Island",IM:"Isle of Man",IL:"Israel",IT:"Italien",JM:"Jamaika",JP:"Japan",YE:"Jemen",JE:"Jersey",JO:"Jordanien",KY:"Kaimaninseln",KH:"Kambodscha",CM:"Kamerun",CA:"Kanada",CV:"Kap Verde",KZ:"Kasachstan",QA:"Katar",KE:"Kenia",KG:"Kirgisistan",KI:"Kiribati",CC:"Kokosinseln",CO:"Kolumbien",KM:"Komoren",CG:"Kongo",HR:"Kroatien",CU:"Kuba",KW:"Kuwait",LA:"Laos",LS:"Lesotho",LV:"Lettland",LB:"Libanon",LR:"Liberia",LY:"Libyen",LI:"Liechtenstein",LT:"Litauen",LU:"Luxemburg",MG:"Madagaskar",MW:"Malawi",MY:"Malaysia",MV:"Malediven",ML:"Mali",MT:"Malta",MA:"Marokko",MH:"Marshallinseln",MQ:"Martinique",MR:"Mauretanien",MU:"Mauritius",YT:"Mayotte",MK:"Mazedonien",MX:"Mexiko",FM:"Mikronesien",MC:"Monaco",MN:"Mongolei",ME:"Montenegro",MS:"Montserrat",MZ:"Mosambik",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NC:"Neukaledonien",NZ:"Neuseeland",NI:"Nicaragua",NL:"Niederlande",AN:"Niederländische Antillen",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolkinsel",NO:"Norwegen",MP:"Nördliche Marianen",OM:"Oman",TL:"Osttimor",PK:"Pakistan",PW:"Palau",PS:"Palästinensische Gebiete",PA:"Panama",PG:"Papua-Neuguinea",PY:"Paraguay",PE:"Peru",PH:"Philippinen",PN:"Pitcairn",PL:"Polen",PT:"Portugal",PR:"Puerto Rico",KR:"Republik Korea",MD:"Republik Moldau",RW:"Ruanda",RO:"Rumänien",RU:"Russische Föderation",RE:"Réunion",SB:"Salomonen",ZM:"Sambia",WS:"Samoa",SM:"San Marino",SA:"Saudi-Arabien",SE:"Schweden",CH:"Schweiz",SN:"Senegal",RS:"Serbien",CS:"Serbien und Montenegro",SC:"Seychellen",SL:"Sierra Leone",ZW:"Simbabwe",SG:"Singapur",SK:"Slowakei",SI:"Slowenien",SO:"Somalia",HK:"Sonderverwaltungszone Hongkong",MO:"Sonderverwaltungszone Macao",ES:"Spanien",LK:"Sri Lanka",BL:"St. Barthélemy",SH:"St. Helena",KN:"St. Kitts und Nevis",LC:"St. Lucia",MF:"St. Martin",PM:"St. Pierre und Miquelon",VC:"St. Vincent und die Grenadinen",SD:"Sudan",SR:"Suriname",SJ:"Svalbard und Jan Mayen",SZ:"Swasiland",SY:"Syrien",ST:"São Tomé und Príncipe",ZA:"Südafrika",GS:"Südgeorgien und die Südlichen Sandwichinseln",TJ:"Tadschikistan",TW:"Taiwan",TZ:"Tansania",TH:"Thailand",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad und Tobago",TD:"Tschad",CZ:"Tschechische Republik",TN:"Tunesien",TM:"Turkmenistan",TC:"Turks- und Caicosinseln",TV:"Tuvalu",TR:"Türkei",UG:"Uganda",UA:"Ukraine",ZZ:"Unbekannte oder ungültige Region",HU:"Ungarn",UY:"Uruguay",UZ:"Usbekistan",VU:"Vanuatu",VA:"Vatikanstadt",VE:"Venezuela",AE:"Vereinigte Arabische Emirate",US:"Vereinigte Staaten",GB:"Vereinigtes Königreich",VN:"Vietnam",WF:"Wallis und Futuna",CX:"Weihnachtsinsel",EH:"Westsahara",CF:"Zentralafrikanische Republik",CY:"Zypern",EG:"Ägypten",GQ:"Äquatorialguinea",ET:"Äthiopien",AT:"Österreich"}},n.$watch("countryConfig.value",function(e){n.config.value||(n.config.value={}),n.config.value.country=e})}]}}]}},function(n,e){n.exports='<neat-form-field config="countryConfig">\r\n</neat-form-field>\r\n<div class="form-group" ng-class="{\r\n    \'has-error\': config.errors.zip || config.errors.city\r\n}">\r\n    <label class="col-md-2 control-label">{{config.label.zip}} / {{config.label.city}}</label>\r\n    <div class="col-md-10">\r\n        <div class="col-md-4" style="padding-left: 0;">\r\n            <input type="text" ng-readonly="config.readonly" ng-model="config.value.zip" class="form-control">\r\n        </div>\r\n        <div class="col-md-8" style="padding-right: 0;">\r\n            <input type="text" ng-readonly="config.readonly" ng-model="config.value.city" class="form-control">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class="form-group" ng-class="{\r\n    \'has-error\': config.errors.street || config.errors.streetnumber\r\n}">\r\n    <label class="col-md-2 control-label">{{config.label.street}} / {{config.label.streetnumber}}</label>\r\n    <div class="col-md-10">\r\n        <div class="col-md-10" style="padding-left: 0;">\r\n            <input type="text" ng-readonly="config.readonly" ng-model="config.value.street" class="form-control ">\r\n        </div>\r\n        <div class="col-md-2" style="padding-right: 0;">\r\n            <input type="text" ng-readonly="config.readonly" ng-model="config.value.streetnumber" class="form-control">\r\n        </div>\r\n    </div>\r\n</div>'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(13),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors}">\r\n    <label class="col-md-2 control-label">{{config.label}}</label>\r\n    <div class="col-md-10">\r\n        <label class="radio-inline">\r\n            <input type="radio" name="{{config._id}}" ng-value="null" ng-model="config.value">\r\n            {{config.renderOptions.labels.null || "Unknown"}}\r\n        </label>\r\n        <label class="radio-inline">\r\n            <input type="radio" name="{{config._id}}" ng-value="true" ng-model="config.value">\r\n            {{config.renderOptions.labels.true || "Yes"}}\r\n        </label>\r\n        <label class="radio-inline">\r\n            <input type="radio" name="{{config._id}}" ng-value="false" ng-model="config.value">\r\n            {{config.renderOptions.labels.false || "No"}}\r\n        </label>\r\n    </div>\r\n</div>'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(15),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors}">\r\n    <label class="col-md-2 control-label">{{config.label}}</label>\r\n    <div class="col-md-10">\r\n        <input type="email" ng-readonly="config.readonly" ng-model="config.value" class="form-control">\r\n    </div>\r\n</div>'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(17),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors.lat || config.errors.lon}">\r\n    <label class="col-md-2 control-label">{{config.label.lat}} / {{config.label.lon}}</label>\r\n    <div class="col-md-10">\r\n        <div class="col-md-6" style="padding-left: 0;">\r\n            <input type="text" ng-readonly="config.readonly" ng-model="config.value.lat" class="form-control ">\r\n        </div>\r\n        <div class="col-md-6" style="padding-right: 0;">\r\n            <input type="text" ng-readonly="config.readonly" ng-model="config.value.lon" class="form-control">\r\n        </div>\r\n    </div>\r\n</div>'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(19),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors}">\r\n    <label class="col-md-2 control-label">{{config.label}}</label>\r\n    <div class="col-md-10">\r\n        <input type="text" ng-readonly="config.readonly" ng-model="config.value" class="form-control">\r\n    </div>\r\n</div>\r\n\r\n'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(21),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors}">\r\n    <label class="col-md-2 control-label">{{config.label}}</label>\r\n    <div class="col-md-10">\r\n        <input type="password" ng-readonly="config.readonly" ng-model="config.value" class="form-control">\r\n    </div>\r\n</div>'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(23),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors}">\r\n    <label class="col-md-2 control-label">{{config.label}}</label>\r\n    <div class="col-md-10">\r\n        <div class="radio" ng-repeat="(value, label) in config.options">\r\n            <label>\r\n                <input type="radio" name="{{config._id}}" ng-value="value" ng-model="config.value">\r\n                {{label}}\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>'},function(n,e,r){"use strict";n.exports=function(n){return[function(){return{restrict:"E",template:r(25),scope:{config:"="},controller:["$scope",function(n){}]}}]}},function(n,e){n.exports='<div class="form-group" ng-class="{\'has-error\': config.errors}">\r\n    <label class="col-md-2 control-label">{{config.label}}</label>\r\n    <div class="col-md-10">\r\n        <select class="form-control" ng-model="config.value" ng-options="key as label for (key, label) in config.options">\r\n            <option value="">{{config.renderOptions.emptySelectLabel || "Choose..."}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n'},function(n,e,r){function o(n){return r(i(n))}function i(n){return a[n]||function(){throw new Error("Cannot find module '"+n+"'.")}()}var a={"./Address":10,"./Address.html":11,"./Address.js":10,"./BooleanPlus.html":13,"./Booleanplus":12,"./Booleanplus.js":12,"./Email":14,"./Email.html":15,"./Email.js":14,"./Gps":16,"./Gps.html":17,"./Gps.js":16,"./Input":18,"./Input.html":19,"./Input.js":18,"./Password":20,"./Password.html":21,"./Password.js":20,"./Radio":22,"./Radio.html":23,"./Radio.js":22,"./Select":24,"./Select.html":25,"./Select.js":24};o.keys=function(){return Object.keys(a)},o.resolve=i,n.exports=o,o.id=26}]);