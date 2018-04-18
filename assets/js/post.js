//ASP
function post_asp(){
	error = document.getElementById('error');
	error.innerHTML = "";
	var inflow, in_bod, ef_bod, mlvss, mlss, ss, a_mlvss, mcrt, efficiency;

	inflow = $("#inflow").val();
	in_bod = $("#in_bod").val();
	ef_bod = $("#ef_bod").val();

	if(inflow <= 0){
		error.innerHTML += "Please enter inflow quantity.<br/>";
	}
	if(in_bod <= 0){
		error.innerHTML += "Please enter influent BOD.<br/>";
	}
	if(ef_bod <= 0){
		error.innerHTML += "Please enter effluent BOD.<br/>";
	}

	// Assumptions
	n_var = 0.8; // n_var = mlvss/mlss
	ss = 10000;
	x = 3500; // MLVSS in aeration tank
	mcrt = 10;

	efficiency = ((in_bod - ef_bod) / in_bod) * 100;

	kd = 0.06;
	y = 0.5;
	vol = (inflow*mcrt*y*(in_bod - ef_bod)) / (x*(1 + kd*mcrt));

	hrt = (vol*24) / inflow;
	do{
		if(hrt > 5){
			vol = vol * 0.95;
			hrt = (vol*24) / inflow;
		}
		if(hrt < 3){
			vol = vol * 1.05;
			hrt = (vol*24) / inflow;
		}
	}while(hrt < 3 && hrt > 5)

	fm = (inflow*in_bod) / (vol*x);
	if(fm > 0.05 && fm < 0.15){
		error.innerHTML += "F/M ratio is between 0.05 and .15, Extended Aeration Process is recommended.<br/>";
	}else if(fm > 0.2 && fm < 0.6){
		// ASP
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}

	vol_loading = (inflow * in_bod) / (vol*1000);

	//sludge waste
	yobs = y/(1 + kd*mcrt);
	px = (yobs*inflow*(in_bod - ef_bod))/1000;
	sludge_waste = px/n_var;

	//Sludge waste volume based on mean cell residence time
	q_w = (vol*x)/(mcrt*ss*n_var);

	//Recirculation ratio
	rec_ratio = x/(ss*n_var - x);

	//Estimation of air requirement 
	req_oxygen = (inflow*(in_bod - ef_bod))/(0.68*1000) - (1.42*q_w*ss*n_var)/1000;

	//Volume of air required
	vol_air = req_oxygen/(1.201 * 0.23*.08);
	air_req = (vol_air/(24*60))*2;

	//Check for air volume
	air_req_p_vol = vol_air/inflow;


	//Ouput
	document.getElementById('efficiency').value = efficiency.toFixed(2);
	document.getElementById('vol').value = vol.toFixed(2);
	document.getElementById('hrt').value = hrt.toFixed(2);
	document.getElementById('fm').value = fm.toFixed(2);
	document.getElementById('vol_loading').value = vol_loading.toFixed(2);
	document.getElementById('sludge_waste').value = sludge_waste.toFixed(2);
	document.getElementById('q_w').value = q_w.toFixed(2);
	document.getElementById('rec_ratio').value = rec_ratio.toFixed(2);
	document.getElementById('req_oxygen').value = req_oxygen.toFixed(2);
	document.getElementById('air_req').value = air_req.toFixed(2);

}

//Extended Aeration
function post_extended(){
	error = document.getElementById('error');
	error.innerHTML = "";
	var inflow, in_bod, ef_bod, mlvss, mlss, ss, a_mlvss, mcrt, efficiency;

	inflow = $("#inflow").val();
	in_bod = $("#in_bod").val();
	ef_bod = $("#ef_bod").val();

	if(inflow <= 0){
		error.innerHTML += "Please enter inflow quantity.<br/>";
	}
	if(in_bod <= 0){
		error.innerHTML += "Please enter influent BOD.<br/>";
	}
	if(ef_bod <= 0){
		error.innerHTML += "Please enter effluent BOD.<br/>";
	}

	// Assumptions
	n_var = 0.7; // n_var = mlvss/mlss
	ss = 10000;
	x = 2800; // MLVSS in aeration tank
	mcrt = 30;

	efficiency = ((in_bod - ef_bod) / in_bod) * 100;

	kd = 0.07;
	y = 0.6;
	vol = (inflow*mcrt*y*(in_bod - ef_bod)) / (x*(1 + kd*mcrt));

	hrt = (vol*24) / inflow;
	do{
		if(hrt > 36){
			vol = vol * 0.95;
			hrt = (vol*24) / inflow;
		}
		if(hrt < 18){
			vol = vol * 1.05;
			hrt = (vol*24) / inflow;
		}
	}while(hrt < 18 && hrt > 36)

	fm = (inflow*in_bod) / (vol*x);
	if(fm < 0.05 || fm > 0.2){
		error.innerHTML += "F/M ratio is not in between 0.05 and .15, Extended Aeration Process is not recommended.<br/>";
	}else if(fm > 0.05 && fm <= 0.2){
		// Extended
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}

	vol_loading = (inflow * in_bod) / (vol*1000);

	//sludge waste
	yobs = y/(1 + kd*mcrt);
	px = (yobs*inflow*(in_bod - ef_bod))/1000;
	sludge_waste = px/n_var;

	//Sludge waste volume based on mean cell residence time
	q_w = (vol*x)/(mcrt*ss*n_var);

	//Recirculation ratio
	rec_ratio = x/(ss*n_var - x);

	//Estimation of air requirement 
	req_oxygen = (inflow*(in_bod - ef_bod))/(0.68*1000) - (1.42*q_w*ss*n_var)/1000;

	//Volume of air required
	vol_air = req_oxygen/(1.201 * 0.23*.08);
	air_req = (vol_air/(24*60))*2;

	//Check for air volume
	air_req_p_vol = vol_air/inflow;


	//Ouput
	document.getElementById('efficiency').value = efficiency.toFixed(2);
	document.getElementById('vol').value = vol.toFixed(2);
	document.getElementById('hrt').value = hrt.toFixed(2);
	document.getElementById('fm').value = fm.toFixed(2);
	document.getElementById('vol_loading').value = vol_loading.toFixed(2);
	document.getElementById('sludge_waste').value = sludge_waste.toFixed(2);
	document.getElementById('q_w').value = q_w.toFixed(2);
	document.getElementById('rec_ratio').value = rec_ratio.toFixed(2);
	document.getElementById('req_oxygen').value = req_oxygen.toFixed(2);
	document.getElementById('air_req').value = air_req.toFixed(2);

}