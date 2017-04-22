<?php

// variable
$fromemail = 'any_site@my_site_com'; // from mail
$to = "your_email@site.com"; // to mail


// check data
$fields = $_POST["fields"];

if (!isset($_POST["fields"])) {
	die("No data"); 
}

if( empty($fields['first_name']) ) { 
	die("No first name"); 
}

if( empty($fields['last_name']) ) { 
	die("No last name"); 
}

if( empty($fields['email']) ) { 
	die("No email address"); 
}

if( empty($fields['phone']) ) { 
	die("No phone number"); 
}

if (!empty( $fields['code'] ) ) {
	die("ok"); 
}


// content massage
$from   = 'Mail from'."<".$fromemail.">";
$message = "<b>Client name: </b> " . $fields['first_name'] . " " . $fields['last_name'] . "<br>";
$message .= "<b>Client email: </b> " . $fields['email'] . "<br>";
$message .= "<b>Client phone: </b> " . $fields['phone'] . "<br>";
$message .= "Sent: ".strftime("%a, %d %b %Y %H:%M:%S");
// end content massage

$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: Site Mail <" . $fromemail . ">\r\n"; 

if(mail($to, $message, $headers)){
	print 'The message was successfully sent';
} else {
	print 'Email not send';
}

?>