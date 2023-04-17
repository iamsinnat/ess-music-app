Feature: Registration and maintenance of Users (insert, remove, update)
    As a "Dizer" employee
    I want to insert new users
    And remove existing users
    And update existing users information
    So that users could login at the "Dizer"
    And users could update theirs information at the "Dizer"

Scenario: Registering new users
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb4", "Pedro Basilio", "pcsb01" and "pcsb4@cin.ufpe.br"
    And I click on "Enviar"
    Then I see a registration completed message

Scenario: Register new User with an invalid email
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb01" and "pcsb1"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Register new User with password less than 6 digits
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb1" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Registering new users without user
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "", "Pedro Basilio", "pcsb01" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Usuario" field highlighted

Scenario: Registering new users without email
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb01" and ""
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Registering new users without password
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Registering new users without name
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "", "pcsb01" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nome" field highlighted

Scenario: User logged in wants to change his password
    Given I am logged in with user "pcsb1" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha"
    And I write "01pcsb" in "Nova Senha"
    And I click on "Alterar"
    Then I see a password changed successfully message

Scenario: Logged in user wants to delete his account
    Given I am logged in with user "pcsb2" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Deletar Perfil"
    And I click "Sim"
    Then I am logged out on the "Pagina Inicial" page

Scenario: User logged in wants to change his password to a less than 6 digits password
    Given I am logged in with user "pcsb" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha"
    And I write "01pcs" in "Nova Senha"
    And I click on "Alterar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nova Senha" field highlighted

Scenario: User logged in wants to change his password without password
    Given I am logged in with user "pcsb" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha"
    And I write " " in "Nova Senha"
    And I click on "Alterar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nova Senha" field highlighted

Scenario: Administrator wants to edit a User from the system
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb1", "Pedro Santos", "pcsbasilio@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb1" line
    And I write "Pedro Costa" in "Nome" field, "pcsb02" in "Senha" field, "pcsbasilio2@cin.ufpe.br" in "Email" field
    And I click "Atualizar"
    Then I see a success message "Informação alterada com sucesso!"
    And I see a list of system users
    And I see the collumns fields "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb1", "Pedro Costa", "pcsbasilio2@cin.ufpe.br", "user" and "Ativo"

Scenario: Administrator wants to edit a User password to a password less than 6 digits
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Basilio", "pcsb@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro" in "Nome" field, "0" in "Senha" field, "pcostasb@cin.ufpe.br" in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor, insira um dado válido!"
    And I see the "Senha" field highlighted

Scenario: Administrator wants to edit a User email to a invalid email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Basilio", "pcsb@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field, "pcsb01" in "Senha" field, "pcsb2" in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor, insira um dado válido!"
    And I see the "Email" field highlighted

Scenario: Administrator wants to edit a User information without email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Basilio", "pcsb@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field, "pcsb01" in "Senha" field, " " in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor, insira um dado válido!"
    And I see the "Email" field highlighted

Scenario: Administrator wants to edit a User information without password
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Basilio", "pcsb@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro" in "Nome" field, " " in "Senha" field, "pcostasb@cin.ufpe.br" in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor, insira um dado válido!"
    And I see the "Senha" field highlighted

Scenario: Administrator wants to edit a User information without name
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Basilio", "pcsb@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write nothing in "Nome" field, "pcsb01" in "Senha" field, "pcsb@cin.ufpe.br" in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to add a new User
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    When I click on "Adicionar Novo Usuario" 
    And I write "drielle" in "Usuario" field, "Drielle" in "Nome" field, "dri012" in "Senha" field, "dri@cin.ufpe.br" in "Email" field and select "Usuario" in "Tipo de Usuario"
    And I click "Adicionar"
    Then I see a success message "Usuário cadastrado com sucesso"

Scenario: Administrator wants to add a new User without user field
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    When I click on "Adicionar Novo Usuario"
    And I write nothing in "Usuario" field, "Drielle" in "Nome" field, "dri012" in "Senha" field, "dri@cin.ufpe.br" in "Email" field and select "Usuario" in "Tipo de Usuario"
    And I click "Adicionar"
    Then I get a Error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to add a new User without name
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    When I click on "Adicionar Novo Usuario"
    And I write "drielle" in "Usuario" field, nothing in "Nome" field, "dri012" in "Senha" field, "dri@cin.ufpe.br" in "Email" field and select "Usuario" in "Tipo de Usuario"
    And I click "Adicionar"
    Then I get a Error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to add a new User without password   
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    When I click on "Adicionar Novo Usuario"
    And I write "drielle" in "Usuario" field, "Drielle" in "Nome" field, nothing in "Senha" field, "dri@cin.ufpe.br" in "Email" field and select "Usuario" in "Tipo de Usuario"
    And I click "Adicionar"
    Then I get a Error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to add a new User without email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    When I click on "Adicionar Novo Usuario" 
    And I write "drielle" in "Usuario" field, "Drielle" in "Nome" field, "dri012" in "Senha" field, nothing in "Email" field and select "Usuario" in "Tipo de Usuario"
    And I click "Adicionar"
    Then I get a Error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to remove a User from the system
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "email" user "pcsb@cin.ufpe.br"
    When I click on the "Remover" button on the "Email" user "pcsb@cin.ufpe.br" line
    And I click on "Sim"
    Then I check that the email user "pcsb@cin.ufpe.br" is no longer on the list of system users
