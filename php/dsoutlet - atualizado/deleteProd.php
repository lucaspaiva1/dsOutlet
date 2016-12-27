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
		$user = $request->user;
		
		$sql = "SELECT * FROM produto WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1){
				echo json_encode(false);
			}else{
				
				$today = date('Y-m-d H:i:s');
				$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo, quantidade, produto_id) 
				VALUES ('$today','1', '$user', 'd', (Select quantidade from produto where produto.id = $id), '$id')";
				
				$con->query($sql);
				
				$sql = "UPDATE produto SET ativo = '1', quantidade = '0' WHERE id = '$id'";
				$con->query($sql);
				
				echo json_encode(true);
			}
	}
?>