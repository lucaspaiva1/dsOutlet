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
				$sql = "SELECT min(id) id, p.marca, p.modelo, p.tamanho,sum(quantidade) quantidade, sum(quantidade*precoEntrada)/sum(quantidade) precoEntrada, p.precoSaidaPadrao, p.maximo, p.minimo, p.dataUltimaCompra FROM produto p group by p.marca, p.modelo, p.tamanho;";
				$result = $con->query($sql);
				while($row=$result->fetch_assoc()){
					$maxx   = $row['maximo'];
					$minn   = $row['minimo'];
					$qnt    = $row['quantidade'];
					$estado = "";
					
					if ($qnt <= $minn){
						$estado = "Falta";
					} else if ($qnt > $maxx){
						$estado = "excesso";
					} else {
						$estado = "certo";
					}
					
					$row['estado'] = $estado;
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
				$id = $_GET['cli'];
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
					
					$sql = "SELECT * FROM divida WHERE cliente_IDCliente = '$id'";
					$result = $con->query($sql);
					$dividas = array();
					
					while ($row=$result->fetch_assoc()){
						$dividas[] = $row;
					}
					
					array_push($vetor, $dados, $end, $dividas);
					echo json_encode($vetor);
				}	
			}
		}
	
?>