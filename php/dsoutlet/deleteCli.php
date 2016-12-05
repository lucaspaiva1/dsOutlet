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
				$dados = $result->fetch_assoc();
				$endID = $dados['enderecoIDEndereco'];
				
				$sql = "DELETE FROM divida WHERE cliente_IDCliente = '$id'";
				$con->query($sql);
				
				$sql = "DELETE FROM cliente WHERE id = '$id'";
				$con->query($sql);
							
				$sql = "DELETE FROM endereco WHERE id = '$endID'";
				$con->query($sql);
								
				echo json_encode(true);
			}
	}
?>