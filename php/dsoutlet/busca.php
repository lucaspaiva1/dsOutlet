<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php 

	$vetor   = array();
		$the_request = &$_GET;
		if (isset($_GET["id"])){
			if ($_GET["id"] == ""){
				$sql = "SELECT * FROM usuario";
				$result = $con->query($sql);
				while($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				echo json_encode($vetor);
			}
		} else if (isset($_GET["prod"])){
			if ($_GET["prod"] == ""){
				$sql = "SELECT * FROM produto";
				$result = $con->query($sql);
				while($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				echo json_encode($vetor);
			}
		} else if (isset($_GET["cli"])){
			if ($_GET["cli"] == ""){
				$sql = "SELECT * FROM cliente";
				$result = $con->query($sql);
				while($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				echo json_encode($vetor);
			} else {
				$id = $_GET['id'];
				$sql = "SELECT * FROM cliente WHERE id = '$id'";
				$result = $con->query($sql);
				
				$numrow = $result->num_rows;
				if($numrow !== 1){
					echo json_encode(false);
				}else{
					$dados = $result->fetch_assoc();
					$endID = $dados['enderecoIDEndereco'];
					$sql = "SELECT * FROM endereco WHERE id = '$endID'";
					$result = $con->query($sql);
					$end = $result->fetch_assoc();
					array_push($vetor, $dados, $end);
					echo json_encode($vetor);
				}	
			}
		}
	
?>