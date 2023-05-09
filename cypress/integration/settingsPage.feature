Feature: Settings Page Module

    Background:
        When User provides correct credentials
        And User clicks on login button

    Scenario: Verify user is able to create a case successfully
        Given Case Creation 7-day Limits > 10k
        And Case Creation Assignment to App User X
        When Raw Clarity files are dropped into S3
        And User click on cases tab
        Then Verify A new case should be created
        And Verify that email has been received to App User X