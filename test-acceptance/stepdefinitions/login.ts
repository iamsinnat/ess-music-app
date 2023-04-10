import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import * as http from 'http';


var base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

export async function getUserFromDb(user_id: string) {
    return new Promise<any>((resolve, reject) => {
        const options: http.RequestOptions = {
            method: 'GET',
            hostname: 'localhost',
            port: 3000,
            path: '/user/' + user_id
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

async function getUserRoleFromDb(user_id: string) {
    const res = await getUserFromDb(user_id);
    const userRole = res.role;
    return userRole;
}

async function criarUsuario(id, name, password, email) {
    //Navegar até página de registro
    await browser.get(base_front_url);
    await element(by.buttonText('Cadastro')).click();
    await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + '/register');
    //Cria usuário
    await $("input[formControlName='id']").sendKeys(<string>id);
    await $("input[formControlName='name']").sendKeys(<string>name);
    await $("input[formControlName='password']").sendKeys(<string>password);
    await $("input[formControlName='email']").sendKeys(<string>email);
    await element(by.buttonText('Enviar')).click();
}

export function getSessionStorageItem(key: string) {
    return browser.executeScript(`return sessionStorage.getItem('${key}');`);
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^o usuário "([^\"]*)" de senha "([^\"]*)" está corretamente registrado no sistema com permissões de "([^\"]*)"$/, async (username: string, password: string, role: string) => {
        await criarUsuario(username, username, password, username + "@email.com")
        await browser.wait(ExpectedConditions.urlIs(base_front_url + '/login'), 10000, 'URL não é ' + base_front_url + '/login');
        const actualRole = await getUserRoleFromDb(<string>username);
        expect(actualRole).to.equal(<string>role)
    })

    Given(/^eu estou na página "login" da aplicação$/, { timeout: 10000 }, async () => {
        await browser.get(base_front_url);
        await expect(browser.getTitle()).to.eventually.equal('Dizer');
        await element(by.buttonText('Login')).click();
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + '/login');
    })

    When(/^eu insiro corretamente os dados do campo "Usuário" como "([^\"]*)"$/, async (username) => {
        await $("input[formControlName='username']").sendKeys(<string>username);
    })

    When(/^eu insiro corretamente os dados do campo "Senha" como "([^\"]*)"$/, async (password) => {
        await $("input[formControlName='password']").sendKeys(<string>password);
    })

    When(/^eu insiro incorretamente os dados do campo "Usuário" como "([^\"]*)"$/, async (username) => {
        await $("input[formControlName='username']").sendKeys(<string>username);
    })

    When(/^eu insiro incorretamente os dados do campo "Senha" como "([^\"]*)"$/, async (password) => {
        await $("input[formControlName='password']").sendKeys(<string>password);
    })

    When(/^eu envio as credênciais para o servidor$/, async () => {
        await element(by.buttonText('Login')).click();
    })

    When(/^eu insiro corretamente o caminho para a rota "initial-page" diretamenta na URL$/, async () => {
        await browser.get(base_front_url + '/initial-page');
    })

    Then(/^eu sou redirecionado para a rota "initial-page"$/, async () => {
        await browser.wait(ExpectedConditions.urlIs(base_front_url + "/initial-page"), 10000);
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/initial-page");
    })

    Then(/^eu sou redirecionado para a rota "login"$/, async () => {
        await browser.wait(ExpectedConditions.urlIs(base_front_url + "/login"), 10000);
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/login");
    })

    Then(/^eu vejo que estou logado com o usuário "([^\"]*)"$/, async (username) => {
        const actualLoggedInUser = await getSessionStorageItem("username");
        expect(actualLoggedInUser).to.equal(<string>username);
    })

    Then(/^eu vejo que estou logado com permissões de "([^\"]*)"$/, async (role) => {
        const actualUserRole = await getSessionStorageItem("userrole");
        expect(actualUserRole).to.equal(<string>role);
    })

    Then(/^eu vejo um erro genérico na tela escrito "Credênciais Inválidas ou Usuário não existente"$/, async () => {
        await browser.wait(ExpectedConditions.presenceOf(element(by.css('#toast-container'))), 2000, 'Elemento não apareceu na tela');
    })
})
