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
?>
