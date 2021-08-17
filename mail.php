<?php
if (isset($_POST['Email'])) {

    // EDIT THE FOLLOWING TWO LINES:
    $email_to = "contato@vandaquino.com.br";
    $email_subject = "Email de Formulário";

    function problem($error)
    {
        echo "We're sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br><br>";
        echo $error . "<br><br>";
        echo "Please go back and fix these errors.<br><br>";
        die();
    }

    // validation expected data exists
    if (
        !isset($_POST['Nome']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Mensagem'])
    ) {
        problem('Were sorry, but there appears to be a problem with the form you submitted.');
    }

    $name = $_POST['Nome']; // required
    $email = $_POST['Email']; // required
    $message = $_POST['Mensagem']; // required

    $error_message = "MENSAGEM DE ERRO1";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email)) {
        $error_message .= 'Insira um endereço de e-mail válido<br>';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if (!preg_match($string_exp, $name)) {
        $error_message .= 'The Name you entered does not appear to be valid.<br>';
    }

    if (strlen($message) < 2) {
        $error_message .= 'The Message you entered do not appear to be valid.<br>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Nome: " . clean_string($name) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Mensagem: " . clean_string($message) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
?>

    <!-- INCLUDE YOUR SUCCESS MESSAGE BELOW -->

    Thanks for getting in touch. We'll get back to you soon.

<?php
}
?>