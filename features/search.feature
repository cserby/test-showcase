Feature: Search for books

  I have a specific book in mind that I want to purchase

  Background: Logged on
    Given I am logged on with my credentials

  Scenario: Search suggestions
    When I put "galaxis úti" in the search field
    Then I get a book with title "Galaxis útikalauz stopposoknak" as a search suggestion

  Scenario: Search with filter on price
    When I put "galaxis úti" in the search field
    And I submit my search
    Then I land on the "Search Results" page
    When I restrict the search results by price to "4500 Ft felett"
    Then All books in my search results have prices higher than 4500

  Scenario: Advanced search
    When I initiate advanced search
    Then I land on the "Advanced Search" page
    When I fill my advanced search criteria as:
      | Author     | Douglas |
      | Title      | Galaxis |
      | Price Low  | 4500    |
    And I submit my advanced search
    Then I get a search result with title "Galaxis útikalauz stopposoknak"
