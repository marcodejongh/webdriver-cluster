Feature: DuckDuckGo Demo

  Scenario: DuckDuckGo

    When I open the test enviroment
    Then the title should be DuckDuckGo
     And I should see a search box
     And I should see a search button
     And I type foobar in the search box

  Scenario: Google

    When I open the test enviroment
    Then the title should be DuckDuckGo
     And I should see a search box
     And I should see a search button
     And I should see a #logo_homepage_link

Scenario: DuckDuckGo2

  When I open the test enviroment
  Then the title should be DuckDuckGo
   And I should see a search box
   And I should see a search button
   And I type test12345 in the search box

Scenario: Google2

  When I open the test enviroment
  Then the title should be DuckDuckGo
   And I should see a search box
   And I should see a search button
   And I should see a #logo_homepage_link


   Scenario: DuckDuckGo3

     When I open the test enviroment
     Then the title should be DuckDuckGo
      And I should see a search box
      And I should see a search button
      And I type blabla in the search box

   Scenario: Google4

     When I open the test enviroment
     Then the title should be DuckDuckGo
      And I should see a search box
      And I should see a search button
      And I should see a #logo_homepage_link
