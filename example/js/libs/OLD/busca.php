<?php

include ("../dal.class.php");
$class = new dal();
$codDist = 0;
$codConcelho = 0;


$codDist=$_POST["codDist"];
$codConcelho=$_POST["codConcelho"];
$tab = $_POST["tab"];
if ($codDist == 0){
	$seg_campo="id";
	$str = "";
	
}
else
{
	
if ($codConcelho == 0){
	$str = " WHERE codDist=$codDist";
	$seg_campo = "codConcelho";
}
else{

	$str = " WHERE codDist=$codDist AND codConcelho=$codConcelho";
	$seg_campo="id";
}
}


$res = $class->returnOpt("nome",$seg_campo,$tab,$str,$str);

echo utf8_encode($res);

?>
