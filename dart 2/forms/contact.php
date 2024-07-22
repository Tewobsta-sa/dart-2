<?php

class PHP_Email_Form
{
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $message;
    
    public function send()
    {
        // Check if all required fields are set
        if (empty($this->to) || empty($this->from_name) || empty($this->from_email) || empty($this->subject) || empty($this->message)) {
            return 'Error: All fields are required';
        }
        
        // Set email headers
        $headers = "From: {$this->from_name} <{$this->from_email}>" . "\r\n";
        $headers .= "Reply-To: {$this->from_email}" . "\r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        
        // Send email
        if (mail($this->to, $this->subject, $this->message, $headers)) {
            return 'success';
        } else {
            return 'Error: Unable to send email';
        }
    }
}

// Email configuration
$receiving_email_address = 'info@dartdigitaltech.com';

// Create a new instance of the PHP_Email_Form class
$contact = new PHP_Email_Form();
$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];
$contact->message = "From: {$_POST['name']} <{$_POST['email']}>\r\nSubject: {$_POST['subject']}\r\nMessage: {$_POST['message']}";

// Send the email
$result = $contact->send();

// Handle the result
if ($result === 'success') {
    echo 'Success: Your message has been sent. Thank you!';
} else {
    echo 'Error: ' . $result;
}

