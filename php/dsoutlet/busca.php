<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php 

	$vetor   = array();
		$the_request = &$_GET;
		if (isset($_GET["id"])){
			if ($_GET["id"] == ""){
				$sql = "SELECT * FROM usuario ORDER BY nome";
				$result = $con->query($sql);
				while($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				echo json_encode($vetor);
			}
		} else if (isset($_GET["prod"])){
			if ($_GET["prod"] == ""){
				$sql = "SELECT * FROM produto WHERE ativo = '0' ORDER BY marca ASC";
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
				$sql = "SELECT c.id, c.nome, c.cpf, c.Telefone, sum(d.valor) dividaTotal from cliente c left join divida d on (c.id = d.cliente_IDCliente) group by cpf ORDER BY c.nome";
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
					
					$sql = "SELECT * FROM divida WHERE cliente_IDCliente = '$id' ORDER BY vencimento ASC";
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
		} else if (isset($_GET['relatorio'])) {
			if ($_GET['relatorio'] == "") {
				$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente)";
				$result = $con->query($sql);
			
				while ($row=$result->fetch_assoc()){
					$venda[] = $row;
				}
			
				$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id";
				$result = $con->query($sql);
			
				while ($row=$result->fetch_assoc()){
					$estoque[] = $row;
				}
				$dados = array();
				array_push($dados, $venda, $estoque);
				echo json_encode($dados);
			}
		} else if (isset($_GET['notificacoes'])){
			if ($_GET['notificacoes'] == ""){
				$today = date('Y-m-d');
				$day   = date('Y-m-d', strtotime('+ 2 day', strtotime($today)));
				$sql = "SELECT c.id, c.nome, d.vencimento, d.valor, d.parcelasApagar from divida d, cliente c where d.cliente_IDCliente = c.id and d.vencimento <= '$day' ORDER BY d.vencimento ASC";
				$result = $con->query($sql);
				$divida = array();
				while ($row=$result->fetch_assoc()){
					$value = $row['valor'];
					$p     = $row['parcelasApagar'];
					$x = $value / $p;
					$row['valorParcela'] = $x;
					$divida[] = $row;
				}
				$sql = "SELECT id, marca, modelo, tamanho, quantidade, minimo from produto where ativo = '0' and quantidade <= minimo";
				$result = $con->query($sql);
				$estoque = array();
				while ($row=$result->fetch_assoc()){
					$row['estado'] = "Falta";
					$estoque[] = $row;
				}
				$dados = array();
				array_push($dados, $divida, $estoque);
				
				echo json_encode($dados);
			}
		}
	
?>