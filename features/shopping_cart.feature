Feature: Shopping Cart

  I browse through available books, and add/remove items to
  my shopping cart that I'd like to purchase

  Background: Logged on, searched for HHGU
    Given I am logged on with my credentials
    And I searched for "galaxis úti"
    And I cleared my shopping cart

  Scenario: Add to cart, remove item
    Then My shopping cart is empty
    When I put the first item in my cart
    Then I get a confirmation about my item being placed into the cart
    And I have 1 item in my cart
    When I remove the item from my cart
    Then My shopping cart is empty
