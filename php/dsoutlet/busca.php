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
				$sql = "SELECT * FROM produto ORDER BY marca ASC";
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
						$valor = $row['valor'];
						$parcelas = $row['parcelasAPagar'];
						$value = $valor / $parcelas;
						$row['valorPorParcela'] = $value;
						$dividas[] = $row;
					}
					
					array_push($vetor, $dados, $end, $dividas);
					echo json_encode($vetor);
				}	
			}
		} else if (isset($_GET['reg'])) {
			if ($_GET['reg'] == ""){
				$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id";
				$result = $con->query($sql);
				
				while ($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				
				echo json_encode($vetor);
			}
		} else if (isset($_GET['venda'])){
			if ($_GET['venda'] == ""){
				$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente)";
				$result = $con->query($sql);
				
				while ($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				
				echo json_encode($vetor);
			}
		}
	
?>