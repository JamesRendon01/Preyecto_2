const { By, until } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  URL = "http://localhost:4000/turista";

  selectors = {
    correo: By.name("correo"),
    contrasena: By.name("contrasena"),
    btnSubmit: By.css("button[type='submit']"),
  };

  async abrir() {
    await this.driver.get(this.URL);
  }

  async iniciarSesion(correo, contrasena) {
    await this.driver.wait(until.elementLocated(this.selectors.correo), 5000);
    await this.driver.findElement(this.selectors.correo).sendKeys(correo);

    await this.driver.wait(until.elementLocated(this.selectors.contrasena), 5000);
    await this.driver.findElement(this.selectors.contrasena).sendKeys(contrasena);

    await this.driver.wait(until.elementLocated(this.selectors.btnSubmit), 5000);
    await this.driver.findElement(this.selectors.btnSubmit).click();
  }
}

module.exports = LoginPage;
