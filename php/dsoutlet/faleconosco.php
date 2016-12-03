<?php
	include 'mySQL.php';
	require 'mySQL.php';
	
?>

<?php
	
	$the_request = &$_POST;
	
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$email     = $request->email;
		$assunto   = $request->assunto;
		$nome      = $request->nome;
		$texto     = $request->texto;
		$telefone  = $request->telefone;
		
		$emailDS   = "dsoutlet@hotmail.com";
		
		$mensagem = "$nome , <br>
					Numero de Contato: $telefone . <br><br>
					$texto";
		
		
		$header = "MIME-Version: 1.0\n";
		$header .= "Content-type: text/html; charset=iso-8859-1\n";
		$header .= "FROM: $email\n";
		
		//mail($emailDS,$assunto, $mensagem, $header);
		echo json_encode(true);
		
	}
?>