Feature: Login User Module

    Scenario: Verify User is able to login successfully
        When User provides correct credentials
        And User clicks on login button
        Then User is able to see list of all the navigation icons