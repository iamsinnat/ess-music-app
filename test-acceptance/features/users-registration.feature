Feature: Registration and maintenance of Users (insert, remove, update)
    As a "Dizer" employee
    I want to insert new users
    And remove existing users
    And update existing users information
    So that users could login at the "Dizer"
    And users could update theirs information at the "Dizer"

Scenario: Registering new users
    Given I am on the "Registro de novo usuário" page
    When I write "pcsb" in "Usuário"
    And I write "Pedro Basilio" in "Nome"
    And I write "pcsb01" in "Senha"
    And I write "pcsb@cin.ufpe.br" in "Email"
    And I click on "Enviar"
    Then I see a registration completed message

Scenario: Register new User with an invalid email
    Given I am on the "Registro de novo usuário" page
    When I write "pcsb" in "Usuário"
    And I write "Pedro Basilio" in "Name"
    And I write "pcsb" in "email"
    And I write "pcsb01" in "Password"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted


Scenario: Register new User with password less than 6 digits
    Given I am on the "Registro de novo usuário" page
    When I write "dri" in "Usuário"
    And I write "Drielle" in "Name"
    And I write "drielle@cin.ufpe.br" in "email"
    And I write "dri01" in "Password"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Registering new users without user
    Given I am on the "Registro de novo usuário" page
    When I write "Pedro Basilio" in "Nome"
    And I write "pcsb01" in "Senha"
    And I write "pcsb@cin.ufpe.br" in "Email"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Usuario" field highlighted

Scenario: Registering new users without email
    Given I am on the "Registro de novo usuário" page
    When I write "pcsb" in "Usuário"
    And I write "Pedro Basilio" in "Nome"
    And I write "pcsb01" in "Senha"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Registering new users without password
    Given I am on the "Registro de novo usuário" page
    When I write "pcsb" in "Usuário"
    And I write "Pedro Basilio" in "Nome"
    And I write "pcsb@cin.ufpe.br" in "Email"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Registering new users without name
    Given I am on the "Registro de novo usuário" page
    When I write "pcsb" in "Usuário"
    And I write "pcsb01" in "Senha"
    And I write "pcsb@cin.ufpe.br" in "Email"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nome" field highlighted

Scenario: User logged in wants to change his password
    Given I am on the "Editar Perfil" page
    And I am logged in with user "pcsb" and password "pcsb01"
    When I click on "Alterar Senha" option
    And I write "01pcsb" in "Nova Senha"
    And I click on "Alterar"
    Then I see a password changed successfully message

Scenario: Logged in user wants to delete his account
    Given I am on the "Editar Perfil" page
    And I am logged in with email "pcsb@cin.ufpe.br" and password "01pcsb"
    When I click on "Deletar Perfil" option
    And I click "Sim"
    Then I get a message that the user "pcsb@cin.ufpe.br" has been deleted
    And I am logged out on the "Pagina Inicial" page

Scenario: Administrator wants to remove a User from the system
    Given I am logged in with an "admin" account with email "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "e-mail" user "pcsb@cin.ufpe.br"
    When I click on the "Remover" button on the "e-mail" user "pcsb@cin.ufpe.br"
    And I click "Sim"
    Then I check that the "e-mail" user "pcsb@cin.ufpe.br" is no longer on the list of system users