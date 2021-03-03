function displayerror(jqXHR,exception){
	 var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        return msg;
}
function userlogin(){
	var mobile= $('#L_Mobile').val();
	var password = $('#L_Password').val();
		var registrationId = window.localStorage.getItem("registrationId");
	if(mobile.length!=10){
		$("#loginerrror").html("Enter Valid 10 Digit Mobile Number");
		alert("Enter Valid 10 Digit Mobile Number");
	}else if(password.length<4){
		$("#loginerrror").html("Enter Valid Password");
		alert("Enter Valid Password");
	}else{
	$.ajax({
				type : 'post',
				url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
				data : {'type':'002','password':password, 'mobile':mobile,'registrationId':registrationId},
				beforeSend:function(){
						$('.loader').show(); $("#login-btn").attr("disabled", true);
				},
				success : function (res){
							$('.loader').hide(); $("#login-btn").attr("disabled", false);
						
							if(res=="Error: Mobile Or Password is Wrong"){
					            	alert(res); $("#signup-error").html(res);  
					        }else{
					            var data  = jQuery.parseJSON(res);						
        						var userid=data[0]; var UserName=data[1];
					             
        						//	alert("Signup Successful");
								    window.localStorage.setItem('userid', userid); window.localStorage.setItem('UserName', UserName);
								    window.localStorage.setItem("login", "true");
								    window.localStorage.setItem('saved_Mobile', mobile);

								    window.location.href="home.html";
						        }
	
						},
						error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#loginerrror").html(msg);
							$('.loader').hide(); $("#login-btn").attr("disabled", false);
						},	
					});
	}
}
function verifyrefcode(){
	var Ref_Code = $('#Ref_Code').val();
$('.loader').show();
	$.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'018','Ref_Code':Ref_Code},
					beforeSend:function(){	},
					success : function (res){
							$('.loader').hide();
							if(res!="404"){//apply-btn
								$("#signup-error").html("Code Applied");  
								alert("Code Applied");
								 $("#apply-btn").attr("disabled", true);

								  var ref_bal  = window.localStorage.getItem("ref_bal");
								    window.localStorage.setItem('WalletBalance', ref_bal); 


								    window.localStorage.setItem('Ref_Code', Ref_Code);
							}else{
								$("#signup-error").html("Invalid Code");  
								alert("Invalid Code");
							}
						
						
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg);  $('.loader').hide();
						},
					
					
				});

}	

function usersignup(){
	$('.loader').show();  $("#signup-btn").attr("disabled", true);
	var name = $('#S_name').val();
	var mobile= $('#S_mobile').val();
	var password = $('#S_password').val();
	var registrationId = window.localStorage.getItem("registrationId");
	var Ref_Code = window.localStorage.getItem("Ref_Code");
	
	
	if(name==''||name.length<3){
		alert('Enter Valid User Name'); $("#signup-error").html("Enter Valid User Name");  
		$("#signup-btn").attr("disabled", false); $('.loader').hide();
	}else if(mobile.length!=10){
		alert('Enter Valid 10 Digit Mobile Number'); $("#signup-error").html("Enter Valid 10 Digit Mobile Number");  
		$("#signup-btn").attr("disabled", false); $('.loader').hide();
	}else if(password.length<4){
		alert('Enter Valid Password'); $("#signup-error").html("Enter Valid Password");  
		$("#signup-btn").attr("disabled", false); $('.loader').hide();
	}else{
		$.ajax({
				type : 'post',
				url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
				data : {'type':'001','name':name,'password':password, 'mobile':mobile,'registrationId':registrationId,'Ref_Code':Ref_Code},
				beforeSend:function(){
					$('.loader').show();  $("#signup-btn").attr("disabled", true);
					//alert(0);
					console.log();
				},
				success : function (res){
					$('.loader').hide();  $("#signup-btn").attr("disabled", false);
					console.log(res);
						if(res=="Error: Signup Failed Please Try Again"){
					            	alert(res); $("#signup-error").html(res);  
					        }else if(res=="Error: Mobile Number Already Registered"){
					                alert(res); $("#signup-error").html(res);  
					        }else{
					            var data  = jQuery.parseJSON(res);						
        						var userid=data[0]; var UserName=data[1]; 
        							alert("Signup Successful");
        							window.localStorage.setItem('saved_Mobile', mobile);
								    window.localStorage.setItem('userid', userid); window.localStorage.setItem('UserName', name);
								    window.localStorage.setItem("login", "true");
								    window.location.href="home.html";
					        }
					
						/*	if(isNaN(res)==false){
								alert("Signup Successful");
								
								window.localStorage.setItem('userid', res);
								window.localStorage.setItem("login", "true");
								window.location.href="home.html";		
							}else{
								alert(res); $("#signup-error").html(res);  
								
							} */
	
						},
						error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#signup-error").html(msg);
							$('.loader').hide(); $("#signup-btn").attr("disabled", false);
						},		
					});
	}
				
}
function forgetpassword(){
	$('.loader').show();  $("#forgetpassword-btn").attr("disabled", true);
	var mobile= $('#forget_pass').val();
	if(mobile.length!=10){
		alert('Enter Valid 10 Digit Mobile Number'); $("#forgetpass-error").html("Enter Valid 10 Digit Mobile Number");  
		$("#forgetpassword-btn").attr("disabled", false); $('.loader').hide();
	}else{
		$.ajax({
				type : 'post',
				url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
				data : {'type':'013', 'mobile':mobile},
				beforeSend:function(){
					$('.loader').show();  $("#forgetpassword-btn").attr("disabled", true);	
				},
				success : function (res){
							$('.loader').hide();  $("#forgetpassword-btn").attr("disabled", false);

							if(isNaN(res)==false){
								alert("Password Sent On Your Phone"); $("#forgetpass-error").html("Password Sent On Your Phone");  
							
							}else{
								alert(res);
								$("#forgetpass-error").html(res); $("#forgetpass-error").html(res);  
							}
	
						},
						error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#forgetpass-error").html(msg);
							$('.loader').hide(); $("#forgetpassword-btn").attr("disabled", false);
						},		
					});
	}
}
function UserLogout(){
	window.localStorage.clear();
	window.localStorage.removeItem("IDFR");
	window.location.href="index.html";
}


function itisloading(on){
if( on ){
$(document).on('pagebeforecreate', '[data-role="page"]', function(){     
    setTimeout(function(){

  var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });



        //$.mobile.loading('show');
    },1);    
});
}else{
	$.mobile.loading('hide');
}

}
function updateduoshinfo(){
	var registrationId = window.localStorage.getItem("registrationId");
			var userid = window.localStorage.getItem("userid"); $('.loader').show();
			//alert(registrationId);
	$.ajax({
					type : 'post',
					async:false,
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'017','UID':userid,'tokan':registrationId},
					beforeSend:function(){
						$('.loader').show();
					},
					success : function (res){
						//alert(res);
						return 1;
						$('.loader').hide();
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#loginerrror").html(msg);
							$('.loader').hide(); $("#login-btn").attr("disabled", false);
							return 0;
						},	
				});		 
}
function backgroundworker(){
//	var PIN_Load  = window.localStorage.getItem("PIN_Load");
	var CAT_Load  = window.localStorage.getItem("CAT_Load");
	var PRO_Load  = window.localStorage.getItem("PRO_Load");
	var BAN_Load  = window.localStorage.getItem("BAN_Load");
	var userid  = window.localStorage.getItem("userid");
	
//	var SLOT_Load = window.localStorage.getItem("SLOT_Load");
//	var ConLoad  = window.localStorage.getItem("ConLoad");
	var chk =0; var Update_Load= "1.0.0";
		   	$.ajax({
		   			async: false,
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'0100100','userid':userid},
					beforeSend:function(){	
						
					},
					success : function (res){
						var data  = jQuery.parseJSON(res);						
						var ban_chk=data[0][2]; var cat_chk=data[1][2]; var pro_chk=data[2][2];
						var Ser_Charge=data[3][2];
						window.localStorage.setItem('Ser_Charge', Ser_Charge);
						window.localStorage.setItem('Whatsapp', data[4][2]);
						window.localStorage.setItem('Mobile', data[5][2]);
						window.localStorage.setItem('Email', data[6][2]);
						window.localStorage.setItem('ref_bal', data[7][2]);
						// console.log(PIN_chk);
					if(BAN_Load!=ban_chk){ 
							$("#load_status").html("");
							$("#load_status").html("Banner Change Detected <br> Loading New Banner.."); 
							$.ajax({
								async: false,
								type : 'post',
								url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
								data : {'type':'015'},
								success : function (res){
									var data  = jQuery.parseJSON(res);		var the_table = '';
									$.each(data, function (i, item) {
									    
										the_table += '<div class="carousel-cell"><img src='+data[i][1]+' class="d-block w-100 img-fluid" alt="..." style="border-radius: 10px;"></div>'; //console.log(data[i][0]);
									});
									the_table = the_table+"";
									window.localStorage.setItem('BAN_Load', ban_chk); window.localStorage.setItem('BAN_List', the_table);
								}
							});	
						}if(CAT_Load!=cat_chk){ 
							$("#load_status").html("");
							$("#load_status").html("Service Change Detected <br> Updating Services.."); 
							$.ajax({
								async: false,
								type : 'post',
								url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
								data : {'type':'003'},
								success : function (res){
								    window.localStorage.setItem('CAT_List', res);
								    window.localStorage.setItem('CAT_Load', cat_chk);
/*								    
									var data  = jQuery.parseJSON(res);		var the_table = '';
									$.each(data, function (i, item) {
									    
										the_table += ' <div onclick="gotoservice('+data[i][0]+',`'+data[i][5]+'`)" class="card shadow-sm mb-3" style="border-radius: 0.75rem;border-bottom: 5px solid #fd6734; style="overflow:hidden;""><div class="row no-gutters"><div class="col-4" style="padding: 8px;"><a href="#"><img src="'+data[i][5]+'" class="img-fluid" alt="Image not available" width="170"></a></div><div class="col-8"><div class="card-body" style="padding: 0.5rem;"><div class="d-flex"><div class="flex-grow-1"><h6 class="font-weight-bold">'+data[i][1]+'</h6></div><div class=""><!--<span><i class="fa fa-star text-primary"></i> 4.7</span>--></div></div><p class="card-text mb-2" style="font-size: 15px;line-height: 18px;">'+data[i][2].substring(0, 58)+'</p><h6 class="mb-0 font-weight-bold">Price Starts From <span class="text-danger">&#8377; '+data[i][4]+'</span></h6></div></div></div></div>'; 
									});
									the_table = the_table+"";
									window.localStorage.setItem('CAT_Load', cat_chk); window.localStorage.setItem('CAT_List', the_table);
*/									
								} 
							});	
						}if(PRO_Load!=pro_chk){ 
							$("#load_status").html("");
							$("#load_status").html("Banner Change Detected <br> Loading New Banner.."); 
							$.ajax({
								async: false,
								type : 'post',
								url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
								data : {'type':'004'},
								success : function (res){
									
									window.localStorage.setItem('PRO_Load', pro_chk); window.localStorage.setItem('PRO_List', res);
								}
							});	
						}										
					},	error: function (jqXHR, exception) { 
									var msg=displayerror(jqXHR, exception);
									alert(msg); $("#load_status").html(msg);
									exit;
					},
				});	
			if(chk=="0"){setTimeout(sendtopage, 500);}else{setTimeout(gotoupdate, 500);}
 }
function gotoupdate(){
	window.location.href="https://play.google.com/store/apps/details?id=com.ungalmaligaikadai.ungalmaligaikadai";
	exit;
}
function gotoservice(ser_id,ser_img,ser_name){
    window.localStorage.setItem('ser_id', ser_id);
    window.localStorage.setItem('ser_img', ser_img);
    window.localStorage.setItem('ser_name', ser_name);
    window.location.href="services.html";
}
function loadadnwithproduct(){
      var ser_id  = window.localStorage.getItem("ser_id");
       var res  = window.localStorage.getItem("PRO_List");
       	var data  = jQuery.parseJSON(res); var baseaddon=""; var SerAddon=""; var baseN=0; var addN=0;
		   
    	$.each(data, function (i, item) {
			if(data[i][1]==ser_id){ 
				if(data[i][4]=="Base"){
				    //base price
				   baseN=1;  
			    baseaddon+='<div class="col-8"><div class="form-check"><input class="form-check-input text-danger" onclick="chkedvalue()" type="checkbox" value="'+data[i][3]+'" name="serAddonname" id="defaultCheck1"><label class="form-check-label" style="font-weight: 500;" for="defaultCheck1">'+data[i][2]+'</label></div></div><div class="col-4 text-right"><h6>&#8377; '+data[i][3]+'</h6></div>';
				}else{
				    //Addon
				     addN=1;
				 SerAddon+='<div class="col-8"><div class="form-check"><input class="form-check-input text-danger" onclick="chkedvalue()" type="checkbox" value="'+data[i][3]+'" name="serAddonname" id="defaultCheck1"><label class="form-check-label" style="font-weight: 500;" for="defaultCheck1">'+data[i][2]+'</label></div></div><div class="col-4 text-right"><h6>&#8377; '+data[i][3]+'</h6></div>'; 
				}
			}//else{ baseN=0;   addN=0;  }	
			});
		//	$('.loader').hide();
		if(baseN==0){$("#baseaddon").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>No Basic is required for this service.</p>"); }else{$("#baseaddon").html(baseaddon); }
		if(addN==0){$("#SerAddon").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>No Addon is required for this service.</p>"); }else{	$("#SerAddon").html(SerAddon); }
			
			 
}
function chkedvalue(){
    var yourArray = []; var total=0;
    var res  = window.localStorage.getItem("PRO_List");
    var data  = jQuery.parseJSON(res);

    $("input:checkbox[name=serAddonname]:checked").each(function(){
    yourArray.push($(this).val());
    total=parseInt(total)+parseInt($(this).val());
	//es=
});
 window.localStorage.setItem('total', total);
 window.localStorage.setItem('adnIds', yourArray);
 	$("#totalofsel").html("| ₹ " +total+""); 
	 

}
function gotochecckout(){
    var yourArray = [];
    $("input:checkbox[name=serAddonname]:checked").each(function(){yourArray.push($(this).val());}); 
    if(yourArray.length<1){
        alert("Select atleast one option");
    }else{
        window.location.href="checkout.html";
    }
}
function loadTotal(){
    //Ser_Charge
    var Ser_Charge  = window.localStorage.getItem("Ser_Charge");
    var WalletBalance  = window.localStorage.getItem("WalletBalance");

    var total  = window.localStorage.getItem("total"); 
     var fntotal=parseInt(Ser_Charge) + parseInt(total);
     //WalletBalance
     $( "#proTotal" ).html( total );
     $( "#SerCharge" ).html( Ser_Charge );
    //  $( "#SubTotal" ).html( fntotal );
      
//      window.localStorage.setItem('SubTotal', fntotal);

            if(parseInt(WalletBalance)>parseInt(fntotal)){
					
					$("#SubTotal").html("₹ 00");
					window.localStorage.setItem('SubTotal', 0);
					window.localStorage.setItem('wal_pay', fntotal);
					window.localStorage.setItem('WalletBalance', parseInt(WalletBalance-fntotal));
					
					window.localStorage.setItem('WalletBalance', parseInt(WalletBalance-fntotal));
					$("#wal_bal").html(" "+fntotal); 


				}else{		
					$("#SubTotal").html("₹ "+parseInt(fntotal-WalletBalance));
					window.localStorage.setItem('SubTotal', parseInt(fntotal-WalletBalance));
					$("#wal_bal").html(" "+WalletBalance); 

					if(parseInt(fntotal) > parseInt(WalletBalance)){
						window.localStorage.setItem('WalletBalance', 0);
						window.localStorage.setItem('wal_pay', WalletBalance);
					}else{
					    window.localStorage.setItem('WalletBalance', parseInt(WalletBalance-fntotal));
					    window.localStorage.setItem('wal_pay', WalletBalance);
					}
					
				}

    
    
    
}
function loadserimg(){
     var ser_img  = window.localStorage.getItem("ser_img");
    $( "#ser_img" ).html( "<img src="+ser_img+" class='d-block w-100' alt='...'>" );
    
     var res  = window.localStorage.getItem("CAT_List");
      var ser_id  = window.localStorage.getItem("ser_id");
    	var data  = jQuery.parseJSON(res);
    	
    	    $( "#serviceName" ).html( data[ser_id-1][1] );
    	    $( "#serviceDesc" ).html( data[ser_id-1][2] );
    	    $( "#serviceInfo" ).html( data[ser_id-1][3] ); 
    	
    	
}
function loadcategory(){
    	var res  = window.localStorage.getItem("CAT_List");
    	var data  = jQuery.parseJSON(res);		var the_table = '';
		var num=0;
    	$.each(data, function (i, item) {			
			num++;						    						
			//the_table += ' <div class="ks-category" onclick="gotoservice('+data[i][0]+',`'+data[i][5]+'`,`'+data[i][1]+'`)"><div class="ks-c"><img src="'+data[i][5]+'" class="img-fluid" alt="Image not available"></div><h5 class="ks-c-text">'+data[i][1]+'<p class="ks-c-text2">Starting from &#8377; '+data[i][4]+'</p></h5></div>';
			the_table += ' <div class="col-4 ks-c-padding"><div class="ks-category" onclick="gotoservice('+num+',`'+data[i][5]+'`,`'+data[i][1]+'`)"><div class="ks-c"><img src="'+data[i][5]+'" class="img-fluid" alt="Image not available"></div><h5 class="ks-c-text">'+data[i][1]+'<p class="ks-c-text2">From &#8377; '+data[i][4]+'</p></h5></div></div>';
		});
		the_table = the_table+"";
    	$( "#allser" ).html( the_table );
}
function searchFucntion(){
	$('.loader').show();
	var usersearchtext = $('#searchtxt').val();
	var res  = window.localStorage.getItem("CAT_List");
    var data  = jQuery.parseJSON(res);		var the_table = ''; chk=0;
		$.each(data, function (i, item) {	
		pro_name = data[i][1];
			if(pro_name.toLocaleLowerCase().includes(usersearchtext.toLocaleLowerCase())==true){
				chk=1;
				the_table += ' <div class="ks-category" onclick="gotoservice('+data[i][0]+',`'+data[i][5]+'`,`'+data[i][1]+'`)"><div class="ks-c"><img src="'+data[i][5]+'" class="img-fluid" alt="Image not available"></div><h5 class="ks-c-text">'+data[i][1]+'<p class="ks-c-text2">Starting from &#8377; '+data[i][4]+'</p></h5></div>';
			}	
			
		});
	if(chk==1){
		$( "#newbanner" ).html("");
    	$( "#allser" ).html( the_table );
    	$('.loader').hide();
	}else{
		$( "#newbanner" ).html("");
    	$( "#allser" ).html( "😐" );
    	$('.loader').hide();
	}
		


}
 function loadbanner(){
 	var BAN_List  = window.localStorage.getItem("BAN_List");
 	$( "#newbanner" ).html( BAN_List );	
}


function sendtopage(){
    window.location.href="login.html";
 }


function saveaddress(){
			var fullName = $('#fullName').val(); var MobName = $('#MobName').val(); var FullAdr = $('#FullAdr').val(); 
			var AdrPin =$('#AdrPin').val(); 

				window.localStorage.setItem('saved_name', fullName);
				window.localStorage.setItem('saved_Mobile', MobName);
				window.localStorage.setItem('saved_Address', FullAdr);
				window.localStorage.setItem('saved_pin', AdrPin);
			
}

function setfiledsforOrder(){
    window.localStorage.removeItem("couponoff"); 	window.localStorage.removeItem("couponcode");
    
			var fullName1  = window.localStorage.getItem("saved_name");
			var MobName1  = window.localStorage.getItem("saved_Mobile");
			var FullAdr1  = window.localStorage.getItem("saved_Address");
			var AdrPin1  = window.localStorage.getItem("saved_pin");
		
			//console.log(saved_name);
			if(fullName1){
				$('#fullName').val(fullName1);
			}else{	
				var fullName = $('#fullName').val();
				window.localStorage.setItem('saved_name', fullName);
				}
			if(MobName1){
				$('#MobName').val(MobName1);
			}else{	
				var MobName = $('#MobName').val();
				window.localStorage.setItem('saved_Mobile', MobName);
				}
			if(FullAdr1){
				$('#FullAdr').val(FullAdr1);
			}else{	
				var FullAdr = $('#FullAdr').val();
				window.localStorage.setItem('saved_Address', FullAdr);
				}
			if(AdrPin1){
				$('#AdrPin').val(AdrPin1);
			}else{	
				var AdrPin = $('#AdrPin').val();
				window.localStorage.setItem('saved_pin', AdrPin);
				}
	
}
function PlaceOrder(){
		saveaddress();
		$("#placeorder-error").html("Placing Your Order Please Wait..");
		$("#placeorder-btn").attr("disabled", true); $('.loader').show();
		
		
		 var couponoff = window.localStorage.getItem("couponoff");	
			var couponcode = window.localStorage.getItem("couponcode");	
		
		    var ser_name = window.localStorage.getItem("ser_name");	
			var Ser_Charge = window.localStorage.getItem("Ser_Charge");	
			var total  = window.localStorage.getItem("total");
			var userid = window.localStorage.getItem("userid");	
			var adnIds = window.localStorage.getItem("adnIds");	
			var wal_pay = window.localStorage.getItem("wal_pay");	
			var WalletBalance  = window.localStorage.getItem("WalletBalance");

			
		    if(couponoff>0){var fntotal=parseInt(Ser_Charge) + parseInt(total) - parseInt(couponoff);}else{var fntotal=parseInt(Ser_Charge) + parseInt(total);}
			
			var fullName = $('#fullName').val();
			var MobName = $('#MobName').val();
			var FullAdr = $('#FullAdr').val();
			var AdrPin = $('#AdrPin').val();
			var payoption = $('#payoption').val();
			var Bdate=$('#date').val(); //fake email for orders ser_name
			var time = $('#time').val();
		//	console.log(fntotal); console.log(parseInt(couponoff));

		
//alert(total);
			if(total < 1){
			    	alert('Your have not selected any service'); $("#placeorder-error").html("Your have not selected any service");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
				window.location.href="home.html";
			}else if(fntotal<0){
				alert('Your have not selected any service'); $("#placeorder-error").html("Your have not selected any service");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
				window.location.href="home.html";
			}else if(fullName.length<3){
				alert('Please Enter Valid Full Name'); $("#placeorder-error").html("Please Enter Valid Full Name");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
			}else if(MobName.length<10){
			alert('Enter Valid 10 Digit Mobile Number'); $("#placeorder-error").html("Enter Valid 10 Digit Mobile Number");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
			}else if(FullAdr.length<15){
				alert("Length of Address can't Less Then 15 Character"); $("#placeorder-error").html("Length of Address can't Less Then 15");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
			}else if(AdrPin.length!=6){
			alert("Enter Valid PIN Code"); $("#placeorder-error").html("Enter Valid PIN Code");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
			}
			else if(Bdate.length<2){
				alert("Select Booking Date"); $("#placeorder-error").html("Select Booking Date");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
			}else if(payoption.length<1){
				alert("Select Payment Option"); $("#placeorder-error").html("Select Payment Option");
				$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
			}else if(payoption=='COD'){
				$("#login").attr("disabled", true);
				window.localStorage.setItem('saved_name', fullName);
				window.localStorage.setItem('saved_Mobile', MobName);
				window.localStorage.setItem('saved_Address', FullAdr);
				window.localStorage.setItem('saved_pin', AdrPin);
				$.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'005','fullName':fullName,'MobName':MobName,'FullAdr':FullAdr,'saved_pin':AdrPin,'fntotal':fntotal,'Ser_Charge':Ser_Charge,'total':total,'userid':userid,'adnIds':adnIds,'payoption':payoption,'Bdate':Bdate,'ser_name':ser_name,'time':time,'couponoff':couponoff,'couponcode':couponcode,'wal_pay':wal_pay,'WalletBalance':WalletBalance},
					beforeSend:function(){
						$("#placeorder-error").html("Placing Your Order Please Wait..");
						$("#placeorder-btn").attr("disabled", true); $('.loader').show();
					},
					success : function (res){					
					$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
						if(res=="Success"){
							alert("Booking Placed Sucessfully");
								window.localStorage.removeItem("adnIds");
								window.localStorage.removeItem("total"); 	window.localStorage.removeItem("couponoff"); 	window.localStorage.removeItem("couponcode");
							window.location.href="booking.html";
						}else{alert(res); $("#placeorder-error").html(res);}
					
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#placeorder-btn").attr("disabled", false); $('.loader').hide();
						},
				});
			}else if(payoption=='PREPAID'){
				$('.loader').hide(); $("#placeorder-btn").attr("disabled", false); $("#placeorder-error").html("");
 total_price=fntotal*100;
 var options = {
    "key": "", // 
    "amount": total_price, // Example: 2000 paise = INR 20
    "name": "Homecare",
    "description": "Homecare",
    "image": "https://kaserviceapp.in/app/Homecare/icon.png",// COMPANY LOGO
    "handler": function (response) {
        //console.log(response);
        // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
        
        if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
            //redirect_url = '/you-owe-money.html';
            alert("Payment Failed Please Try Again");
        } else {
          //  redirect_url = '/thnx-you-paid.html';
          alert("Payment Sucessful Please Wait...");
          	window.localStorage.setItem('saved_name', fullName);
				window.localStorage.setItem('saved_Mobile', MobName);
				window.localStorage.setItem('saved_Address', FullAdr);
				window.localStorage.setItem('saved_pin', AdrPin);
          $.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'005','fullName':fullName,'MobName':MobName,'FullAdr':FullAdr,'saved_pin':AdrPin,'fntotal':fntotal,'Ser_Charge':Ser_Charge,'total':total,'userid':userid,'adnIds':adnIds,'payoption':payoption,'Bdate':Bdate,'ser_name':ser_name,'time':time,'couponoff':couponoff,'couponcode':couponcode,'wal_pay':wal_pay,'WalletBalance':WalletBalance},
					beforeSend:function(){
							$("#placeorder-error").html("Placing Your Order Please Wait..");
							$("#placeorder-btn").attr("disabled", true); $('.loader').show();
					},
					success : function (res){					
					$("#placeorder-btn").attr("disabled", false); $('.loader').hide();
						if(res=="Success"){
							alert("Booking Placed Sucessfully");
								window.localStorage.removeItem("adnIds");
								window.localStorage.removeItem("total"); window.localStorage.removeItem("couponoff"); 	window.localStorage.removeItem("couponcode");
							window.location.href="booking.html";
						}else{alert(res); $("#placeorder-error").html(res);}
					
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#placeorder-btn").attr("disabled", false); $('.loader').hide();
						},
				});


        }
        //location.href = redirect_url;
        
        
    },
    "prefill": {
        "name": fullName, // pass customer name
        "email": '',// customer email
        "contact": MobName //customer phone no.
    },
    "notes": {
        "address": FullAdr //customer address 
    },
    "theme": {
        "color": "#15b8f3" // screen color
    }
};
//console.log(options);
var propay = new Razorpay(options);
propay.open();






			}	
}


function ApplyCoupon(){
	var Coupon= $('#Coupon').val(); $('.loader').show();
	var userid  = window.localStorage.getItem("userid");
	$('#couponbtn').attr("disabled", true);
	$.ajax({
				type : 'post',
				url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
				data : {'type':'016', 'Coupon':Coupon,'userid':userid},
				beforeSend:function(){
						
				},
				success : function (res){	
						$('.loader').hide();
						console.log(res);
						if(res!='null' ){
								var data  = jQuery.parseJSON(res);
								var i=0;	var min_order=data[i][3]; var SubTotal = window.localStorage.getItem("SubTotal");	var off=data[i][2];
								//console.log(totalamt);
								if(parseInt(SubTotal) < parseInt(min_order)){
									alert("Minimum Order Must Be Rs:"+min_order+" To Use This Coupon");
									$('#couponbtn').attr("disabled", false);
								}else{
									alert("Coupon Applied");
									var rs=parseInt(SubTotal)-parseInt(off);
									window.localStorage.setItem('couponoff', off);
									$("#copdiscount").html(""+off);
									$("#SubTotal").html(""+rs);
									window.localStorage.setItem('couponID', data[i][0]); 
									window.localStorage.setItem('couponcode', data[i][1]); 
									
								}
							}else{alert("Invalid/Expired/Used Coupon Code"); $('#couponbtn').attr("disabled", false); }	
							
						},error: function (jqXHR, exception) {var msg=displayerror(jqXHR, exception); alert(msg); $('.loader').hide(); },	
					});
}




function loadallCoupons(){
			$('.loader').show();
			var userid  = window.localStorage.getItem("userid");
			$.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'010'},
					beforeSend:function(){},
					success : function (res){
						$('.loader').hide();
						var data  = jQuery.parseJSON(res);	var table = ''; var ttl=0; var copsts;
						$.each(data, function (i, item) {
							if(data[i][6]=='Active'){copsts="<strong class='ks-c-active'>"+data[i][6]+"</strong>"}else{copsts='<strong class="ks-c-expired">'+data[i][6]+'</strong>'}
						table +='<div class="card mt-3 shadow-sm"><div class="row no-gutters"><div class="col-8"><div class="card-body"><h6 class="card-title ks-coupon-code">'+data[i][1]+'</h6><p class="card-text mb-2"><normal>&#8377; '+data[i][2]+' off on selected items</normal></p><p class="card-text mb-2"><normal>The minimum cart value should be &#8377;'+data[i][3]+' or above.</normal></p><p class="card-text mb-2">Status: '+copsts+'</p></div></div><div class="col-4" ><div class="mt-3 coupon_img"></div></div></div></div>';
						});					
						$('#allcoupon').html(table);
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg);  $('.loader').hide();
						},
				});		 
}

function OrderCancel(oid){
    var k=confirm("Cancel Order?");
    if(k){
        $('.loader').show();
        $.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'011','oid':oid},
					beforeSend:function(){
						
					},
					success : function (res){
						$('.loader').hide();
						alert(res);
						loadPrvOrder();
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg);  $('.loader').hide();
							loadPrvOrder();
						},
				});
    }
}

function loadPrvOrder(){
			$('.loader').show();
			var userid  = window.localStorage.getItem("userid");
			$.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'006','userid':userid},
					beforeSend:function(){},
					success : function (res){
						$('.loader').hide();
						//console.log(res);
						var data  = jQuery.parseJSON(res);	var table = ''; var ttl=0; var FUB; var ordrcncl; var stsdisplay;
						var showreview;
						const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
						//console.log(data); 
						$.each(data, function (i, item) {
							data[i][21]=null;
						//	<button type="button" class="btn btn-outline-danger btn-sm rounded-pill">Cancel</button>
							const d = new Date(data[i][11]); var str=monthNames[d.getMonth()]; var mo = str.substring(0, 3);
							if(data[i][16]==0){FUB="Agent will be assigned 😐"}else{FUB=' '+data[i][17]+' <a href=tel:'+data[i][18]+'> '+data[i][18]+'</a> will serve you🙂'}
							if(data[i][14]=='Cancel'){stsdisplay='Cancelled'}else{stsdisplay=data[i][14]}
							if(data[i][14]=="Booked"){ordrcncl="<button type=button class='btn btn-outline-danger btn-sm rounded-pill' onclick='OrderCancel("+data[i][0]+");'>Cancel</button>";}else{ordrcncl=''}
							if(data[i][14]=="Completed"){
								
							    if(data[i][21]==null){
							        showreview='<fieldset class="rating"> <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" title="Awesome - 5 stars"></label> <input type="radio" id="star4half" name="rating" value="4.5" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label> <input type="radio" id="star4" name="rating" value="4" /><label class="full" for="star4" title="Pretty good - 4 stars"></label> <input type="radio" id="star3half" name="rating" value="3.5" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label> <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label> <input type="radio" id="star2half" name="rating" value="2.5" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label> <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label> <input type="radio" id="star1half" name="rating" value="1.5" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label> <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" title="Sucks big time - 1 star"></label> <input type="radio" id="starhalf" name="rating" value="0.5" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label> <input type="radio" class="reset-option" name="rating" value="reset" /> </fieldset><br><span class="rating"><span id="rating">3.0</span>/5 Review</span></span><p class="mb-2 font-weight-bold"><strong><input type="text" id="reviews'+data[i][0]+'" class="ks-coupon2" placeholder="Reviews"></strong></p><button class=\'btn btn-success btn-sm \' onclick="UpdateReview('+data[i][0]+')">Give Reviews</button>';
							    }else{
									var arr= [];
									for(j=0.5;j<5.5;j=j+0.5){
										console.log(j);
										if(data[i][21]==j){
											arr.push('checked');
											console.log(data[i][21]+" "+j);
											//console.log(j);
										}else{
											arr.push(' ');
											
										}
									}
									console.log(arr);
							        showreview='<fieldset class="rating"> <input type="radio" id="star5"  name="rating" value="5" '+arr[9]+'  disabled /><label class="full" for="star5" title="Awesome - 5 stars"></label> <input type="radio" id="star4half"  name="rating" value="4.5" '+arr[8]+' disabled /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label> <input type="radio" id="star4" name="rating" value="4"'+arr[7]+' disabled/><label class="full" for="star4" title="Pretty good - 4 stars"></label> <input type="radio"  id="star3half" name="rating" value="3.5" '+arr[6]+' disabled /><label class="half" for="star3half" title="Meh - 3.5 stars"></label> <input type="radio" id="star3"  name="rating" value="3"'+arr[5]+' disabled /><label class="full" for="star3" title="Meh - 3 stars"></label> <input type="radio" id="star2half"  name="rating" value="2.5" '+arr[4]+' disabled /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label> <input type="radio"  id="star2" name="rating" value="2"'+arr[3]+' disabled /><label class="full" for="star2" title="Kinda bad - 2 stars"></label> <input type="radio" id="star1half"  name="rating" value="1.5" '+arr[2]+' disabled /><label class="half" for="star1half" title="Meh - 1.5 stars"></label> <input type="radio" id="star1"  name="rating" value="1" '+arr[1]+' disabled /><label class="full" for="star1" title="Sucks big time - 1 star"></label> <input type="radio" id="starhalf" name="rating" value="0.5"'+arr[0]+' disabled /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label> <input type="radio" class="reset-option" name="rating" value="reset" disabled /> </fieldset><p>'+data[i][22]+"</p>";
							    }
							}else{
							    showreview='';
							}
						table +='<div class="card mt-3 shadow-sm"><div class="row no-gutters"><div class="col-8"><div class="card-body"><h6 class="card-title">'+data[i][13]+'</h6><p class="card-text mb-2">Booking ID <strong>#'+data[i][0]+'</strong></p><p class="card-text mb-2">Booked On <strong>('+data[i][12]+')</strong></p><p class="card-text mb-2">Booked For <strong>('+data[i][11]+' : '+data[i][15]+')</strong></p><p class="card-text mb-2">Est. Budget <strong>&#8377;'+data[i][7]+'/-</strong></p><p class="card-text mb-2 text-danger" >'+FUB+'</p><button type="button" class="btn btn-outline-success btn-sm rounded-pill ks-view" onclick="forgetModal(); loadProducts('+data[i][0]+','+data[i][8]+','+data[i][19]+')">View</button>'+ordrcncl+'<br><br>'+showreview+'</div></div><div class="col-4" ><div class="mt-3" id="calendar_img"><p class="calendar_month">'+mo+'</p><p class="calendar_date">'+d.getDate()+'</p><p class="calendar_year">'+d.getFullYear()+'</p></div></div><div class="col-12 text-center"><h6 class="text-info booking_status"><strong>'+stsdisplay+'</strong></h6></div></div></div>';
						/*Put this code after 2 <br> for review option to appear
						
						
						
						*/
						});	
						//console.log(table);				
						$('#listv').html(table);
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg);  $('.loader').hide();
						},
				});		 
}
function UpdateReview(id){
   var rate= $('input[name="rating"]:checked').val();
   console.log(rate); //reviews
   var reviews = $('#reviews'+id).val();
   console.log(rate);
   if(rate == undefined){
       alert("Enter valid rating");
   }else{
            $.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'022','BKID':id,'rate':rate,'reviews':reviews},
					beforeSend:function(){	},
					success : function (res){
						$('.loader').hide();
						
						alert(res);
						loadPrvOrder();
						
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg);  $('.loader').hide();
						},
					
					
				});

        }


}
function loadProducts(IDFR,ser_charge,cop_off){
	$('.loader').show();
	
	$.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'009','BKID':IDFR},
					beforeSend:function(){	},
					success : function (res){
						$('.loader').hide();
						var data  = jQuery.parseJSON(res);	var the_table = '<table>';
						$.each(data, function (i, item) {
							the_table +='<tr><td class="ks-book">'+data[i][0]+'</td><td class="ks-book">&#8377;'+data[i][1]+'</td></tr>';
						});
						the_table=the_table+'<tr><td class="ks-book">Service Charge</td><td class="ks-book">&#8377;'+ser_charge+'</td></tr><tr><td class="ks-book">Coupon off</td><td class="ks-book">&#8377;'+cop_off+'</td></tr></table>';
						$("#abcdtls").html(the_table);
						
						
						
						
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg);  $('.loader').hide();
						},
					
					
				});
}

function notlogedin(){
	alert("You Must Login to see the content");
}
function loadMYAccount(){
	$('.loader').show();
	var userid  = window.localStorage.getItem("userid");
	$.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'007','userid':userid},
					beforeSend:function(){
						
					},
					success : function (res){
						$('.loader').hide();
						var data  = jQuery.parseJSON(res); var i=0;	
						
						$('#S_name').val(data[i][1]);
						$('#S_mobile').val(data[i][2]);

						window.localStorage.setItem('pwd', data[i][3]);
					}
				});
}
function userupdate(){
	$("#userupdate-error").html("Placing Your Order Please Wait..");
	$("#userupdate-btn").attr("disabled", true); $('.loader').show();

	var userid  = window.localStorage.getItem("userid");
	var name = $('#S_name').val();
	var mobile= $('#S_mobile').val();
	var EOpassword = $('#SO_password').val();
	var password = $('#S_password').val();
	var pwd  = window.localStorage.getItem("pwd");
	if(name==''||name.length<3){
		alert('Please Enter valid Name'); $("#userupdate-error").html("Please Enter valid Name");
		$("#userupdate-btn").attr("disabled", false); $('.loader').hide();
	}else if(mobile.length!=10){
		alert('Enter Valid 10 Digit Mobile Number'); $("#userupdate-error").html("Enter Valid 10 Digit Mobile Number");
		$("#userupdate-btn").attr("disabled", false); $('.loader').hide();
	}else if(password.length<4){
		alert('Please Enter valid Password'); $("#userupdate-error").html("Please Enter valid Password");
		$("#userupdate-btn").attr("disabled", false); $('.loader').hide();
	}else if(EOpassword!=pwd){
		alert("Your Entered Password Did not match to Current password"); $("#userupdate-error").html("Your Entered Password Did not match to Current password");
		$("#userupdate-btn").attr("disabled", false); $('.loader').hide();
	}else{
		$.ajax({
				type : 'post',
				url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
				data : {'type':'008','name':name,'password':password, 'mobile':mobile, 'userid':userid},
				beforeSend:function(){
						
				},
				success : function (res){
					$("#userupdate-btn").attr("disabled", false); $('.loader').hide();
							if(isNaN(res)==false){
								alert("Update Successful");	
								$("#userupdate-error").html("Update Successful");		
								window.location.href="home.html";		
							}else{
								alert("Update Failed");
								$("#userupdate-error").html("Update Failed");
								
								
							}
	
						}	
					});
	}
}
function loadpinvalue(){
	var the_table = window.localStorage.getItem("PIN_List");					
	$("#pin").html(the_table);
}

function MYChoice(){
	$('.loader').show();  $("#MYChoice-btn").attr("disabled", true);
	var Name = $('#Name').val();
	var Mobile= $('#Mobile').val(); //pro_req
	var pro_req= $('#pro_req').val(); 
	var userid  = window.localStorage.getItem("registrationId");
	if(Name==''||Name.length<3){
		alert('Enter Valid User Name'); $("#MYChoice-Error").html("Enter Valid User Name");  
		$("#MYChoice-btn").attr("disabled", false); $('.loader').hide();
	}else if(Mobile.length!=10){
		alert('Enter Valid 10 Digit Mobile Number'); $("#MYChoice-Error").html("Enter Valid 10 Digit Mobile Number");  
		$("#MYChoice-btn").attr("disabled", false); $('.loader').hide();
	}else if(pro_req.length<4){
		alert('Enter Valid Product'); $("#MYChoice-Error").html("Enter Valid Product");  
		$("#MYChoice-btn").attr("disabled", false); $('.loader').hide();
	}else{
		$.ajax({
				type : 'post',
				url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
				data : {'type':'01909','Name':Name, 'Mobile':Mobile,'pro_req':pro_req, 'userid':userid},
				beforeSend:function(){
					$('.loader').show();  $("#MYChoice-btn").attr("disabled", true);
				},
				success : function (res){
					$('.loader').hide();  $("#MYChoice-btn").attr("disabled", false);
						alert("Success"); $("#MYChoice-Error").html("Success");
						window.location.href="home.html";
						},
						error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $("#MYChoice-Error").html(msg);
							$('.loader').hide(); $("#MYChoice-btn").attr("disabled", false);
						},		
					});
	}
}
function addtowallet(){
	var userid  = window.localStorage.getItem("userid");
	var amttoadd= $('#amttoadd').val();
	
	var saved_name  = window.localStorage.getItem("saved_name");
	var saved_Mobile  = window.localStorage.getItem("saved_Mobile");
	var saved_email  = window.localStorage.getItem("saved_email");
	var saved_Address  = window.localStorage.getItem("saved_Address");
if(amttoadd<10){
alert("You must add atleat Rs 10/- to your wallet ");
$('.loader').hide(); $("#addtowallet-btn").attr("disabled", false);
}else{
$('.loader').hide(); $("#addtowallet-btn").attr("disabled", false); $("#placeorder-error").html("");
 total_price=amttoadd*100;
 var options = {
    "key": "PQR", // 
    "amount": total_price, // Example: 2000 paise = INR 20
    "name": "Homecare",
    "description": "Homecare",
    "image": "https://kaserviceapp.in/app/Homecare/icon.png",// COMPANY LOGO
    "handler": function (response) {  
        if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
            alert("Payment Failed Please Try Again"); $('.loader').hide(); $("#addtowallet-btn").attr("disabled", false);
        } else {
          alert("Payment Sucessful Please Wait...");
          $('.loader').show(); $("#addtowallet-btn").attr("disabled", true);
          $.ajax({
					type : 'post',
					url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',
					data : {'type':'020','userid':userid,'amttoadd':amttoadd},
					beforeSend:function(){
							$("#placeorder-error").html("Adding Money To Your Wallet. Please Wait....");
							$("#addtowallet-btn").attr("disabled", true);
					},
					success : function (res){					
						$('.loader').hide(); $("#addtowallet-btn").attr("disabled", false);
						if(res=="Success"){
							alert("Added Successfully");
							show_wal_bal();
							window.location.href="wallet.html";
						}else{alert(res); $('.loader').hide(); $("#addtowallet-btn").attr("disabled", false); $("#placeorder-error").html(res);}
					
					},error: function (jqXHR, exception) {
							var msg=displayerror(jqXHR, exception);
							alert(msg); $('.loader').hide(); $("#addtowallet-btn").attr("disabled", false);
						},
				});
        }      
    },
    	"prefill": {"name": saved_name, "email": saved_email, "contact": saved_Mobile},
    	"notes": { "address": saved_Address },
    	"theme": {"color": "#15b8f3"}
	};
//console.log(options);
	var propay = new Razorpay(options);
	propay.open();
      }
}	
function show_wal_bal(){
	var userid  = window.localStorage.getItem("userid");
							$.ajax({
								async: false,
								type : 'post',
								url : 'https://kaserviceapp.in/app/Homecare/App_api/app_api.php',async:false,
								data : {'type':'0019','userid':userid},
								success : function (res){
									if(res!=404){window.localStorage.setItem('WalletBalance', res);}
								}
							});	
	var WalletBalance  = window.localStorage.getItem("WalletBalance");
	$( "#wal_bal" ).html( "Wallet: ₹ "+WalletBalance );	
}
