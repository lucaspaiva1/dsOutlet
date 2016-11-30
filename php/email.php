<?php
	include 'mySQL.php';
	require 'mySQL.php';
	
?>

<?php
	
	$the_request = &$_GET;
	
	if (isset($_GET['email'])){
		
		$email = $_GET['email'];
		
		$sql = "SELECT * FROM usuario WHERE email = '$email'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1){
				echo json_encode(false);
			}else{
				$dados    = $result->fetch_assoc();
				$nome     = $dados['nome'];
				$login    = $dados['login'];
				$senha    = $dados['senha'];
				$assunto  = "DS OUTLET - RECUPERAR SENHA";
				
				$mensagem = "Login: $login <br> Senha: $senha";
				
				$header = "MIME-Version: 1.0\n";
				$header .= "Content-type: text/html; charset=iso-8859-1\n";
				$header .= "FROM: no-reply@dsoutlet.com\n";
				mail($email, $assunto, $mensagem, $header);
				echo json_encode(true);
			}
	} else{
		echo json_encode(false);
	}
?>