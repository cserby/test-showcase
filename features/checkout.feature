Feature: Checkout

  I'm finished with browsing, and ready to make a purchase

  Background: Logged on, searched for HHGU
    Given I am logged on with my credentials
    And I searched for "galaxis úti"
    And I cleared my shopping cart

  Scenario: Add to cart, proceed to checkout
    Then My shopping cart is empty
    When I put the first item in my cart
    Then I get a confirmation about my item being placed into the cart
    And I have 1 item in my cart
    When I proceed to checkout
    Then I land on the "Checkout Summary" page
