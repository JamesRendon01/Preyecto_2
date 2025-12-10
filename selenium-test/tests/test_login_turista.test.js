jest.setTimeout(200000);

const { Builder, By, until } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");

// pausas visuales
function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Flujo completo realista: login → agregar favorito → menú → favoritos", () => {
  let driver;
  let loginPage;

  beforeAll(async () => {
    driver = await new Builder()
      .usingServer("http://localhost:50486")
      .forBrowser("chrome")
      .build();

    loginPage = new LoginPage(driver);
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test("flujo completo con pausas visuales", async () => {
    // 1️⃣ Login
    await loginPage.abrir();
    await pause(1500);

    await loginPage.iniciarSesion("gabyh0541@gmail.com", "Gaby12345+");
    await pause(1500);

    // 2️⃣ Token cargado
    await driver.wait(
      async () => (await driver.executeScript("return localStorage.getItem('token')")) !== null,
      15000
    );

    // 3️⃣ Página /inicio
    await driver.wait(until.urlContains("/inicio"), 20000);
    
    await pause(1500);

    // 4️⃣ Agregar favorito (primer card)
    const botonFavorito = By.css("button.absolute.top-3.right-3");

    await driver.wait(until.elementLocated(botonFavorito), 15000);
    const favButton = await driver.findElement(botonFavorito);

    // Click realista
    await driver.actions({ async: true })
      .move({ origin: favButton })
      .pause(800)
      .press()
      .pause(300)
      .release()
      .perform();

    await pause(1500);

    // 5️⃣ Abrir menú hamburguesa
    const botonHamburguer = By.css("button"); // luego ajustamos si tu botón tiene clase

    await driver.wait(until.elementLocated(botonHamburguer), 10000);
    const menuBtn = await driver.findElement(botonHamburguer);

    await driver.actions({ async: true })
      .move({ origin: menuBtn })
      .pause(900)
      .click()
      .perform();

    await pause(1500);

    // 6️⃣ Clic en Favoritos dentro del menú
    const linkFavoritos = By.xpath("//a[contains(., 'Favoritos')]");

    await driver.wait(until.elementLocated(linkFavoritos), 10000);
    await driver.findElement(linkFavoritos).click();

    await pause(1500);

    // 7️⃣ Validar que favoritos tenga datos
    const favoritosLocal = await driver.executeScript(
      "return JSON.parse(localStorage.getItem('favoritos'))"
    );

    expect(favoritosLocal).not.toBeNull();
    expect(favoritosLocal.length).toBeGreaterThan(0);


    // 8️⃣ Validar card visualmente
    const cardFavorito = By.css("div.w-\\[260px\\]");

    await driver.wait(until.elementLocated(cardFavorito), 15000);

    const cardsUI = await driver.findElements(cardFavorito);
    expect(cardsUI.length).toBeGreaterThan(0);

  });
});
