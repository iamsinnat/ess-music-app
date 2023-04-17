Feature: CRUD de artista
    Como usuário Administrador
    Quero cadastrar, alterar e remover artistas
    Para cadastrar álbuns e músicas

Scenario: Cadastrando artista com sucesso
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Bruno Miranda", "Pop music" e "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Artista cadastrado!"

Scenario: Cadastrando artista com nome vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "", "Rock" e "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=400"
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Campo inválido!"

Scenario: Cadastrando artista com link para foto vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Cadastrar novo artista"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Ivete Saganlo", "Alternativa/indie" e ""
    And Clico em "Adicionar"
    Then O sistema mostra uma mensagem de "Campo inválido!"

Scenario: Atualizando um artista com sucesso
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Rihanna"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Riri", "Pop music" e "https://c7.alamy.com/comp/W033FE/rihanna-makes-a-funny-face-when-she-sees-she-is-being-photographed-as-the-miami-heat-play-the-brooklyn-nets-at-barclays-center-in-new-york-city-on-january-10-2014-upijohn-angelillo-W033FE.jpg"
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Artista alterado!"

Scenario: Atualizando um artista com nome vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Doja cat"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "", "Country" e "http://www.quickmeme.com/img/4a/4a21c5bc00505da501ea1b77966a17ffeac2f9dceb63c0e861696f864864e62b.jpg"
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Campo inválido!"

Scenario: Atualizando um artista com url_foto vazio
    Given Estou logado como o usuário Administrador de email "admin@dizer.com" e senha "admin"
    And Estou na página de "Editar artista" do artista "Arctic Monkeys"
    When Preencho os campos "nome do artista", "gênero musical" e "url_foto" com os valores "Attic Mocks", "Hip-Hop/rap" e ""
    And Clico em "Salvar Alterações"
    Then O sistema mostra uma mensagem de "Campo inválido!"