Feature: DuckDuckGo Demo

  Scenario: DuckDuckGo1

    When I open the test enviroment
    Then the title should be DuckDuckGo
     And I should see a search box
     And I should see a search button
     And I type foobar in the search box

  Scenario: Google12

    When I open the test enviroment
    Then the title should be DuckDuckGo
     And I should see a search box
     And I should see a search button
     And I should see a #logo_homepage_link
