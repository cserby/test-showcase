Feature: Sign up for Libri.hu

   I'm a new user of Libri.hu, I'd like to sign up
   in order to be able to make purchases for books

  Scenario: Sign up - Existing email
    Sign up fails if the email provided is already in user

    When I navigate to the "root" page
    And I accept the cookies
    And I initiate the Signup process
    Then I land on the "Create Account" page
    When I fill my account details as:
      | Name           | Test User               |
      | Password       | myInsecurePassword      |
      | Password Again | myInsecurePassword      |
    And I accept the terms and conditions
    And I submit the Create Account form
    Then Signup fails with an email validation error saying: "Ilyen e-mail címmel már regisztráltak"
