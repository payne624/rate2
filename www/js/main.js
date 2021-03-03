function loginTab(){
	document.getElementById('signup_Tab').style.display = 'none';
	document.getElementById('login_Tab').style.display = 'block';
	$('.logintabBtn').addClass('border-white');
	$('.signuptabBtn').removeClass('border-white');
}

function signupTab(){
	document.getElementById('signup_Tab').style.display = 'block';
	document.getElementById('login_Tab').style.display = 'none';
	$('.signuptabBtn').addClass('border-white');
	$('.logintabBtn').removeClass('border-white');
}

function forgetModal(){
	$("#Modal").modal("show");
}