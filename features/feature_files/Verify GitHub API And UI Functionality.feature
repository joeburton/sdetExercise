@acceptanceTests
@verifyGitHubAPIAndUIFunctionality
Feature: Verify GitHub API And UI Functionality

  In order to verify GitHub API and UI functionality
  As a user
  I want to run the following acceptance tests

  @happyPath
  Scenario Outline: Return A Users Full Name
    When I make a GET API call to GitHub for <username>
    Then the correct <username> is returned

    Examples:
      |username      |
      |Jamie Oliver  |

  @errorPath
  Scenario Outline: Show Correct Availability of Username
    Given I launch the GitHub application
    When I sign up with <username>
    Then the <errorMessage> is displayed

    Examples:
      |username   |errorMessage              |
      |Jamie      |Username is already taken |