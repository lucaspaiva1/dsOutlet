<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_PUT;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id = $request->id;
		
		$sql = "SELECT * FROM cliente WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1){
				echo json_encode(false);
			}else{
				$sql = "UPDATE cliente SET ativo = '1' WHERE id = '$id'";
				$con->query($sql);			
				echo json_encode(true);
			}
	}
?>