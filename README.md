# Assignment2Web322
Welcome to my Meal Delivery App.

This app contains a list of menu items, a registration and login form validated on the server side.
<h2>Login Form</h2>

<p>For the login form please fill out all the fields and click the submit button.
This form will: </p>
<ol style="list-style-type: numbered">
<li>
Validate the email field is not empty
</li>
<li>
Validate the password field is not empty
</li>
</ol>
  <h3>Response</h3>
  <h4>Validated Submission</h4>
  <p>If the request made is valid, submitting the form will redirect you to the meal_packages page.</p>
  <h4>Invalid Submission</h4>
  <p>If the submission is invalid, submitting the form will save either the field values for the inputs fields that are not empty and will provide an error message below the input field that is empty, asking you to fill out the field resubmit the form</p>


<h2>Registration Form</h2>

<p>For the registration form please fill out all the fields and click the submit button.
This form will: </p>
<ol style="list-style-type: numbered">
<li>
Validate the first name field is not empty
</li>
<li>
Validate the last name field is not empty
</li>
<li>
Validate the email is not emoty, matches the required format of an email using regular expressions
</li>
<li>
Validate the email is not empty, matches the required format for a phone number (10 digits) seperated by space/dash
(###-###-#### OR ########## OR ### ### ####)
</li>
<li>Validate the password is not empty and matches the format where it is between 8 and 32 charcters long and contains 
  at least one Capital letter, one number and one special character (!@#$%^&*-+{})</li>

<li>Validate the password is not empty, the password matches with the first password entry in the input field above and it matches the format where it is between 8 and 32 charcters long and contains 
  at least one Capital letter, one number and one special character (!@#$%^&*-+{})</li>
  </ol>
    <h3>Response</h3>
   <h4>Validated Submission</h4>
  <p>If the request made is valid, submitting the form will render the dashboard page welcoming you by your name as entered in the form.</p>
  <h4>Invalid Submission</h4>
  <p>If the submission is invalid, submitting the form will save the field values for the inputs fields that are not empty and will provide an error message below the input field that is empty, asking you to fill it out and resubmit the form</p>

  
