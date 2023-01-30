<?php

require("class.phpmailer.php");
require("class.smtp.php");

if(!$_POST){
	echo "Error POST";
} else{
	// Email address verification, do not edit.
	function isEmail($email) {
		return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i",$email));
	}

	$name     = $_POST['name'];
	$email    = $_POST['email'];
	$subject  = $_POST['subject'];
	$message  = $_POST['message'];

	if(trim($name) == '') {
		echo '<div class="error_message">Tenés que ingresar tu nombre.</div>';
		exit();
	} else if(trim($email) == '') {
		echo '<div class="error_message">Ingresá una cuenta de correo válida.</div>';
		exit();
	} else if(!isEmail($email)) {
		echo '<div class="error_message">Has ingresado una cuent de correo inválida. Intentá nuevamente.</div>';
		exit();
	}
	if(trim($message) == '') {
		echo '<div class="error_message">Escribí tu mensaje.</div>';
		exit();
	}


	// Configuration option.
	// Enter the email address that you want to emails to be sent to.
	// Example $address = "joe.doe@yourdomain.com";

	//$address = "example@example.net";
	$address = "contacto@rodolfodev.com.ar";

	// Datos de la cuenta de correo utilizada para enviar vía SMTP
	$smtpHost = "c1451991.ferozo.com";  // Dominio alternativo brindado en el email de alta 
	$smtpUsuario = "contacto@rodolfodev.com.ar";  // Mi cuenta de correo
	$smtpClave = "/oBmGs17tQ";  // Mi contraseña

	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->Port = 465; 
	$mail->IsHTML(true); 
	$mail->CharSet = "utf-8";
	$mail->SMTPSecure = 'ssl';

		// VALORES A MODIFICAR //
		$mail->Host = $smtpHost; 
		$mail->Username = $smtpUsuario; 
		$mail->Password = $smtpClave;

		$mail->From = $email; // Email desde donde envío el correo.
			$mail->FromName = $name;
			$mail->AddAddress($address); // Esta es la dirección a donde enviamos los datos del formulario

			$mail->Subject = 'Has sido contactado por ' . $name . '.'; // Este es el titulo del email.

			$mensajeHtml = nl2br($message);

			$mail->Body = "<html> 
								<body>
									<main style='display: inline-block; border: 1px solid black; padding: 10px 30px 30px; background-color: ghostwhite; border-radius: 5px; width: 350px;'>
										<h2 style='margin: 10px; color: #1A5276;'>Consulta de {$name}. Enviada desde su usuario</h2>
										<hr>
										<div style='display: flex; justify-content: space-between;'>
											<p style='display: inline-block; font-size: 0.9em; margin: 5px;'>E-mail: </p><p style='display: inline-block; font-size: 1.4em; border: 1px solid black; box-shadow: 2px 2px 5px black; padding: 2px; border-radius: 5px; background-color: #A9CCE3; margin: 5px;'><b>{$email}</b></p>
										</div>
										<hr>
										<div style='display: flex; justify-content: space-between;'>
											<p style='display: inline-block; font-size: 0.9em; margin: 5px;'>Mensaje: </p><p style='display: inline-block; font-size: 1.4em; border: 1px solid black; box-shadow: 2px 2px 5px black; padding: 2px; border-radius: 5px; background-color: #A9CCE3; margin: 5px;'><b>{$message}</b></p>
										</div>
										<hr>
										<div style='display: flex; justify-content: space-between;'>
											<a href='www.rodolfodev.com.ar' style='font-weight: bold; text-decoration: none;'>RodolfoDev<span style='color: #A9CCE3;'>.com.ar</span></a>
										</div>
									</main>
								</body>
							</html>";

		// Texto del email en formato HTML
		$mail->AltBody = "{$message} \n\n "; // Texto sin formato HTML
		// FIN - VALORES A MODIFICAR //

		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
		);

		$estadoEnvio = $mail->Send(); 
			if($estadoEnvio){
				echo "OK";
				/*
				echo "<fieldset>";
				echo "<div id='success_page'>";
				echo "<h3>El mensaje fue enviado con éxito!</h3>";
				echo "<p>Gracias <strong>$name</strong>, hemos recibido tu mensaje.</p>";
				echo "</div>";
				echo "</fieldset>";*/
			} else {
				echo 'ERROR!';
			};
}
