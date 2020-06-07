Feature: Sign in with existing creds

  Scenario: Sign in - Success
    When I navigate to the "root" page
    And I accept the cookies
    And I initiate the Sign in process
    And I provide my Sign in credentials
    And I submit my Sign in credentials
    Then I have the option to log out

  Scenario: Sign in - Incorrect password
    When I navigate to the "root" page
    And I accept the cookies
    And I initiate the Sign in process
    And I provide my Sign in credentials as:
      | Password | myIncorrectPassword |
    And I submit my Sign in credentials
    Then Sign in fails with a message saying: "Érvénytelen"

