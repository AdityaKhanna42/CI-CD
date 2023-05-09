Feature: Cases Page Module

    Background:
        When User provides correct credentials
        And User clicks on login button

    Scenario: TC_01 Verify that user can view the analytic assessment of the case under cases page
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        Then Verify user is able to see the anayltic assessment of that case under cases page

    Scenario: TC_02 Verify that user can view the full details of a user and a patient under cases page
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "User & Patient Details" tab under cases page
        Then Verify user is able to see the details of the user and the patient under cases page

    Scenario: TC_03 Verify user can add, modify or remove a note on the case under cases page
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Add Note" value from "Add to case" dropdown under cases page
        And User "Add" a note in case under cases page
        And User click on "Save" action button under cases page
        Then Verify note is "Added" successfully under case
        And User click on "Edit" action button under cases page
        And User "Modifies" a note in case under cases page
        And User click on "Save" action button under cases page
        Then Verify note is "Modified" successfully under case
        And User click on "Delete" action button under cases page
        And User click on "Confirm Delete" action button under cases page
        Then Verify note is "Deleted" successfully under case

    Scenario: TC_04 Verify users can add a note from a note template to the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Add Note From Template" value from "Add to case" dropdown under cases page
        And User click on "Create New Template" action button under template header
        And User creates a new template under cases page
        And User click on "Create New Template" action button under template header
        Then Verify user is able to see "Successfully created a new template" success message toast
        And User selects the newly added template from list under "Add Note From Template" option
        And User click on "Save & Add to Case" action button under template header
        Then Verify note from template is "Added" successfully under cases page
        And User click on "Delete" action button under cases page
        And User click on "Confirm Delete" action button under cases page
        Then Verify note from template is "Deleted" successfully under cases page

    Scenario: TC_05 Verify users can record an action on the case which includes the action, a date, and an optional comment
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Add Action" value from "Add to case" dropdown under cases page
        And User select value from "Select An Action" dropdown under cases page
        And User "Add" a note in case under cases page
        And User click on "Save" action button under cases page
        Then Verify action is added successfully on case under cases page

    Scenario: TC_06 Verify users can attach files to the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Add Attachments" value from "Add to case" dropdown under cases page
        And User uploads a file under cases page
        And User click on "Save" action button under cases page
        Then Verify file is attached and downloaded successfully under case

    Scenario: TC_07 Verify users can send an email based on a template and the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Send an Email from Template" value from "Add to case" dropdown under cases page
        And User click on "Create New Template" action button under template header
        And User creates a new email template under cases page
        And User click on "Create New Template" action button under template header
        And User selects the newly added template from list under "Send an Email from Template" option
        And User enters the receiver email under cases page
        And User click on "Send Email" actions button under email template header
        Then Verify confirmation email text is visible to user under cases page

    Scenario: TC_08 Verify users can resolve the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Resolve Case" value from "Add to case" dropdown under cases page
        And User Selects a "Resolution" value from dropdown under cases page
        And User Selects a "Resolution Description" value from dropdown under cases page
        And User click on "Save" action button under cases page
        Then Verify a case is marked as resolved successfully
        And User reopens the case under cases page

    Scenario: TC_09 Verify users can set a final assessment on the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Set Final Assessment" value from "Add to case" dropdown under cases page
        And User adds a final assessment note under cases page
        And User click on "Save" action button under cases page
        Then Verify a final assessment set is created successfully for that case
        And User click on "Delete" action button under cases page
        And User click on "Confirm Delete" action button under cases page

    Scenario: TC_10 Verify users can assign the case to another user
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User selects an Owner value from dropdown under cases page
        Then Verify case is assigned to another user successfully

    Scenario: TC_11 Verify users can set a user type on the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User selects an User type value from dropdown under cases page
        And User Clicks on "UPDATE CASE" button under case page
        Then Verify user is able to see the case using updated user type filter

    Scenario: TC_12 Verify users can change the case category
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User selects a Case type value from dropdown under cases page
        And User Clicks on "UPDATE CASE" button under case page
        Then Verify user is able to see the case using updated case type filter
        And User changes the case type to "Self Access" under case information
        And User Clicks on "UPDATE CASE" button under case page

    Scenario: TC_13 Verify users can synchronize the case to 3rd party applications including Radar and Compliance 360
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on radar incident "Create Now" button under cases page
        Then Verify radar incident is created successfully for this case

    Scenario: TC_14 Verify users can view other cases involving the user
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "USER'S OTHER CASES" case aside tab under cases page
        Then Verify selected case has the same EMR user name

    Scenario: TC_15_16 Verify users can add the case to a case bundle
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "BUNDLES" case aside tab under cases page
        And User creates a new "Bundle" under cases page
        And User click on "Create Bundle" button under cases page
        Then Verify case is added successfully to the bundle
        And User expands the "Delete Bundle" tab under case bundles page
        And User enters "DELETE" under case sensitive confirm deletion field
        And User click on "Delete Bundle" button under case bundles page

    Scenario: TC_17_18 Verify users can add an access authorization between the user and patient
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "AUTHORIZATIONS AND PERMISSIONS" case aside tab under cases page
        And User click on "Add Authorization" button under cases page
        And User enters the authorization details from cases page
        And User click on "Submit" button under auth permissions page
        When User click on Authorization and Permissions tab
        Then Verify user is able to see added access authorization between the user and patient
        And User click on "Delete Authorization" icon under auth permissions page
        And User enters "DELETE" under case sensitive confirm deletion field
        And User click on "Delete Authorization" button under auth permissions page

    Scenario: TC_19 Verify users can view a case log of events related to the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Add to Case" dropdown under cases page
        And User select "Add Note" value from "Add to case" dropdown under cases page
        And User "Add" a note in case under cases page
        And User click on "Save" action button under cases page
        And User click on "CASE LOG" case aside tab under cases page
        Then Verify user is able to view case log of events related to case
        And User click on "Delete" action button under cases page
        And User click on "Confirm Delete" action button under cases page

    Scenario: TC_20 Verify users can leave a comment in the case log
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "CASE LOG" case aside tab under cases page
        And User enters the comment in case log field under cases page
        And User click on save comment button under case log
        Then Verify a comment is added successfully under case log window

    Scenario: TC_21 Verify users can print the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "PRINT" case aside tab under cases page
        Then Verify user is able to print the case details

    Scenario: TC_22 Verify users can customize which segments of the case are printed
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "PRINT" case aside tab under cases page
        And User selects the "User Details" dropdown value under print tab
        And User selects the "Assessments" dropdown value under print tab
        And User selects the "Caseflow" dropdown value under print tab
        Then Verify user is able to print the case details

    Scenario: TC_23 Verify users can delete the case
        When User click on cases tab
        And User click on Add new case button
        And User creates a new testing case under cases page
        And User click on "Delete Case" button for newly added case under case page
        And User enters "DELETE" under case sensitive confirm deletion field
        And User enters the "Reason" for deletion under cases page
        And User click on "Delete case" button under delete case tab
        Then Verify case is deleted successfully under cases page

    Scenario: TC_24 Verify users can view the accesses related to the case
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Accesses" tab under cases page
        Then Verify user is able to view the accesses related to the case

    Scenario: TC_25 Verify users can export the list of accesses as a CSV file
        When User click on cases tab
        And User apply the advanced filter and select "Self Access" as case type under cases page
        And User opens the "Access" case from the list under cases page
        And User click on "Accesses" tab under cases page
        And User click on "Export CSV" icon
        Then Verify user is able to see downloaded csv file

    Scenario: TC_26 Verify users can view the incidents related to the case
        When User click on cases tab
        And User apply the advanced filter and select "Diversion Suspicious Activity" as case type under cases page
        And User opens the "Activity" case from the list under cases page
        And User click on "Incidents" tab under cases page
        Then Verify user can view the incidents related to the case