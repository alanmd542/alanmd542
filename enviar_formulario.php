<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $tema = htmlspecialchars($_POST['tema']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Correo de destino (tu dirección de correo)
    $destinatario = 'alandelucam@gmail.com';

    // Asunto del correo
    $asunto = 'Nuevo mensaje de contacto desde Utopic Word';

    // Componer el mensaje
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    // Cabeceras del correo
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Enviar el correo
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        // Redirigir al usuario a una página de confirmación
        header('Location: confirmacion.html');
    } else {
        echo "Error al enviar el mensaje. Inténtalo de nuevo.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>