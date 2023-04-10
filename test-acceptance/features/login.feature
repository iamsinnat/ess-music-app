Feature: Login
    As um usuário cadastrado na aplicação
    I want to inserir minhas credênciais de acesso e enviá-las para o servidor de forma segura
    So that eu consiga acessar todas as features internas apenas cabíveis ao meu nível de acesso e ao meu usuário particular, as quais são apenas acessiveis após um processo de autenticação bem sucedido

Scenario: Acesso ao Initial-Page sem realizar um login bem sucedido na aplicação
    Given eu estou na página "login" da aplicação
    When eu insiro incorretamente os dados do campo "Usuário" como "placeholder"
    And eu insiro incorretamente os dados do campo "Senha" como "placeholder"
    And eu envio as credênciais para o servidor
    And eu insiro corretamente o caminho para a rota "Dashboard" diretamenta na URL
    Then eu sou redirecionado para a página "Login Usuário"
    And eu vejo um erro genérico na tela escrito "Por favor, faça login para acessar essa página!"

Scenario: Login Usuário bem sucedido na aplicação
    Given o usuário "23biiibiii" de senha "123123" está corretamente registrado no sistema com permissões de "user"
    And eu estou na página "login" da aplicação
    When eu insiro corretamente os dados do campo "Usuário" como "23biiibiii"
    And eu insiro corretamente os dados do campo "Senha" como "123123"
    And eu envio as credênciais para o servidor
    Then eu sou redirecionado para a rota "initial-page"
    And eu vejo que estou logado com o usuário "23biiibiii"
    And eu vejo que estou logado com permissões de "user"

Scenario: Login Usuário mal sucedido na aplicação senha inválida
    Given eu estou na página "login" da aplicação
    When eu insiro incorretamente os dados do campo "Usuário" como "23biiibiii"
    And eu insiro incorretamente os dados do campo "Senha" como "placeholder"
    And eu envio as credênciais para o servidor
    Then eu vejo um erro genérico na tela escrito "Credênciais Inválidas ou Usuário não existente"

Scenario: Login Usuário mal sucedido na aplicação usuário inválido
    Given eu estou na página "login" da aplicação
    When eu insiro incorretamente os dados do campo "Usuário" como "placeholder"
    And eu insiro incorretamente os dados do campo "Senha" como "placeholder"
    And eu envio as credênciais para o servidor
    Then eu vejo um erro genérico na tela escrito "Credênciais Inválidas ou Usuário não existente"