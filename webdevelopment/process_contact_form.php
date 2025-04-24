<?php
    echo "PHP is working!";
    // Check if the request method is POST
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Retrieve and sanitize form inputs
        $firstName = isset($_POST["firstName"]) ? htmlspecialchars($_POST["firstName"]) : "";
        $lastName = isset($_POST["lastName"]) ? htmlspecialchars($_POST["lastName"]) : "";
        $email = isset($_POST["email"]) ? filter_var($_POST["email"], FILTER_SANITIZE_EMAIL) : "";
        $message = isset($_POST["message"]) ? htmlspecialchars($_POST["message"]) : "";

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400); // Bad request
            exit("Invalid email format. Please enter a valid email address.");
        }

        // Determine the subject line based on the website type (if provided)
        $websiteType = isset($_POST["websiteType"]) ? $_POST["websiteType"] : "";
        $subject = ($websiteType === "portfolio") ?
            "Portfolio/Professional Website Contact" : "Educational Website Contact";

        // Prepare email headers
        $to = "emwcd7@umsystem.edu"; // Change to your email address
        $subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?';
        $headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/plain; charset=UTF-8";

        // Prepare email body
        $body = "First Name: $firstName\n";
        $body .= "Last Name: $lastName\n";
        $body .= "Email: $email\n";
        $body .= "Message:\n$message\n";

        // Send email
        if (mail($to, $subjectEncoded, $body, $headers)) {
            http_response_code(200); // Success
            echo "Thank you for your message. We will contact you soon!";
        } else {
            http_response_code(500); // Internal server error
            echo "Sorry, there was an error sending your message. Please try again later.";
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo "Method Not Allowed";
    }
?>
