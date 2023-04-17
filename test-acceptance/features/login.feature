# Como rodar: alterar username e password de usuário com permissão user em todos os testes para um existente; alterar username e password de usuário com permissão de admin para um existente.
# Known bug: Pela forma que a aplicação foi construída, a medida que o número de usuários aumenta, os testes começam a ter inconsistências por race condiotions.

Feature: Login
    As um usuário cadastrado na aplicação
    I want to inserir minhas credênciais de acesso e enviá-las para o servidor de forma segura
    So that eu consiga acessar todas as features internas apenas cabíveis ao meu nível de acesso e ao meu usuário particular, as quais são apenas acessiveis após
    um processo de autenticação bem sucedido

Scenario: Acesso ao Initial-Page sem realizar um login bem sucedido na aplicação
    Given eu estou na página "login" da aplicação
    When eu insiro incorretamente os dados do campo "Usuário" como "placeholder"
    And eu insiro incorretamente os dados do campo "Senha" como "placeholder"
    And eu envio as credênciais para o servidor
    And eu insiro corretamente o caminho para a página "initial-page" diretamenta na URL
    Then eu sou redirecionado para a página "login"
    And eu vejo um erro genérico na tela escrito "Por favor, faça login para acessar essa página!"

Scenario: Login Usuário bem sucedido na aplicação
    Given o usuário "5biiibiii" de senha "123123" está corretamente registrado no sistema com permissões de "user"
    And eu estou na página "login" da aplicação
    When eu insiro corretamente os dados do campo "Usuário" como "5biiibiii"
    And eu insiro corretamente os dados do campo "Senha" como "123123"
    And eu envio as credênciais para o servidor
    Then eu sou redirecionado para a página "initial-page"
    And eu vejo que estou logado com o usuário "5biiibiii"
    And eu vejo que estou logado com permissões de "user"

Scenario: Login Usuário mal sucedido na aplicação senha inválida
    Given eu estou na página "login" da aplicação
    When eu insiro incorretamente os dados do campo "Usuário" como "5biiibiii"
    And eu insiro incorretamente os dados do campo "Senha" como "placeholder"
    And eu envio as credênciais para o servidor
    Then eu vejo um erro genérico na tela escrito "Credênciais Inválidas ou Usuário não existente"

Scenario: Login Usuário mal sucedido na aplicação usuário inválido
    Given eu estou na página "login" da aplicação
    When eu insiro incorretamente os dados do campo "Usuário" como "placeholder"
    And eu insiro incorretamente os dados do campo "Senha" como "placeholder"
    And eu envio as credênciais para o servidor
    Then eu vejo um erro genérico na tela escrito "Credênciais Inválidas ou Usuário não existente"

Scenario: Usuário com permissão user não consegue acessar página administrativa
    Given eu estou corretamente logado na aplicação como o usuário "5biiibiii" de senha "123123" e permissão "user"
    And eu estou na página "initial-page" da aplicação
    When eu insiro corretamente o caminho para a página "lista-usuarios" diretamenta na URL
    Then eu sou redirecionado para a página "initial-page"
    And eu vejo um erro genérico na tela escrito "Usuário não autorizado."

Scenario: Usuário com permissão admin consegue acessar página administrativa
    Given eu estou corretamente logado na aplicação como o usuário "bibiadmin" de senha "123123" e permissão "admin"
    And eu estou na página "userAdmin" da aplicação
    When eu insiro corretamente o caminho para a página "lista-usuarios" diretamenta na URL
    Then eu sou redirecionado para a página "lista-usuarios"
