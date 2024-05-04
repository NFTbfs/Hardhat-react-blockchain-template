import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    const initTx = await greeter.initialize("Hello, world!");
    await initTx.wait();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("GreeterV2", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("GreeterV2");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    const initTx = await greeter.initialize("Hello, world!");
    await initTx.wait();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("Should return version", async function () {
    const Greeter = await ethers.getContractFactory("GreeterV2");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    const initTx = await greeter.initialize("Hello, world!");
    await initTx.wait();

    expect(await greeter.version()).to.equal("2.0");
  });
});