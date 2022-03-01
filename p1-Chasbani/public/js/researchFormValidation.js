function validate(form) {
	var err = "";
	if(isNaN(form.phoneFirstPart.value) || isNaN(form.phoneSecondPart.value)
	 || isNaN(form.phoneThirdPart.value) || form.phoneFirstPart.value.length != 3 || form.phoneSecondPart.value.length != 3
	 || form.phoneThirdPart.value.length != 4) {
		err += "Invalid phone number\n"
	}
	
	var hbp = form.highBloodPressure.checked;
	var dia = form.diabetes.checked;
	var gla = form.glaucoma.checked;
	var as = form.asthma.checked;
	var non = form.none.checked;
	
	if(non && (hbp || dia || gla || as)) {
		err += "Invalid conditions selection\n";
	} else if (!(non || hbp || dia || gla || as)) {
		err += "No conditions selected\n";
	}
	var checked = false;
	var radio = form.period;
	for(i = 0; i < radio.length; i++) {
		if(radio[i].checked) {
			checked = radio[i].checked;
		}
	}
	if(!checked) {
		err += "No time period selected\n"
	}
	var id1 = form.firstFourDigits.value;
	var id2 = form.secondFourDigits.value;
	if(id1[0] != 'A' || id1.length != 4 || isNaN(id1.substring(1))) {
		err += "Invalid study id";
	} else if (id2[0] != 'B' || id2.length != 4 || isNaN(id2.substring(1))) {
		err += "Invalid study id";
	}
	if (err == "") {
		var confirm = window.confirm("Do you want to submit the form data?");
		if(confirm) {
			return true;
		} else {
			return false;
		}	
	} else {
		alert(err);
		return false;
	}	

}