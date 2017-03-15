@googleSearch
Feature: Google Search

Scenario: Searching Google

  Given I open Google's search page
  Then the title is "Google"
  And I search for "Cambridge English"
  Then I should see search results