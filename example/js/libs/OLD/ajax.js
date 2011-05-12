$(document).ready(function(){

var str2 = "distritos";
$("#paises").change(function () {
	var dropValue = $("#paises").val();	
	$("#localidades").html("");
	$("#concelhos").html("");
	if (dropValue == "PT"){
		$.post("script/busca.php",{
			codDist: 0,
			codConcelho: 0,
			tab: "distritos"}, function(data){
			$("#distritos").html(data);
		
		});
	}
	else{
		$("#localidades").html("");
		$("#concelhos").html("");
		$("#distritos").html("");
	}
	
}).change();


$("#distritos").change(function () {
	var dropValue = $("#distritos").val();
	str2 = dropValue;
	$("#concelhos").html("");
	$("#localidades").html("");
	if (dropValue == null){}
	else{		
	$.post("script/busca.php",{ 
			codDist: str2,
			codConcelho: 0,
			tab: "concelhos"},function(data){
		$("#concelhos").html(data);
		$("#localidades").html("");
	
	});
	}
}).change();


$("#concelhos").change(function () {
	var dropValue = $("#concelhos").val();
	$("#localidades").html("");
	if (dropValue == null){}
	else{
	$.post("script/busca.php",{ 
			codDist: str2,
			codConcelho: dropValue,
			tab: "localidades"},function(data){
		$("#localidades").html(data);
		
	
	});
	}
}).change();



});
