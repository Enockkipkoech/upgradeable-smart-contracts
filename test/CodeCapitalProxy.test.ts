import { expect } from "chai";
import hre, { upgrades } from "hardhat";
import { LegacyCodeCapital } from "../typechain-types/contracts/LegacyCodeCapital";
import { ModernCodeCapital } from "../typechain-types/contracts/ModernCodeCapital";

describe("CodeCapitalProxy", () => {
  it("Should deploy LegacyCodeCapital and ModernCodeCapital", async () => {
    const LegacyCodeCapitalFactory = await hre.ethers.getContractFactory(
      "LegacyCodeCapital"
    );

    const legacyCCToken = (await upgrades.deployProxy(
      LegacyCodeCapitalFactory
    )) as unknown as LegacyCodeCapital;

    const LegacyAddr = await legacyCCToken.getAddress();
    console.log("LegacyCodeCapital deployed to:", LegacyAddr);
    const LegacyOwner = await legacyCCToken.getOwner();
    expect(LegacyAddr).to.properAddress;

    // Legacy Functions
    const legacyName = await legacyCCToken.name();
    console.log("Legacy Name:", legacyName);

    const ModernCodeCapitalFactory = await hre.ethers.getContractFactory(
      "ModernCodeCapital"
    );
    const modernCCToken = (await upgrades.upgradeProxy(
      LegacyAddr,
      ModernCodeCapitalFactory
    )) as unknown as ModernCodeCapital;
    const modernAddr = await modernCCToken.getAddress();
    console.log("ModernCodeCapital deployed to:", modernAddr);
    const modernOwner = await modernCCToken.getOwner();

    expect(modernAddr).to.properAddress;
    expect(modernAddr).to.equal(LegacyAddr);
    expect(LegacyOwner).to.equal(modernOwner);
    expect(await modernCCToken.balanceOf(modernAddr)).to.equal(
      await legacyCCToken.balanceOf(LegacyAddr)
    );
    expect(await modernCCToken.totalSupply()).to.equal(
      await legacyCCToken.totalSupply()
    );

    console.log(
      "Balances:",
      (await modernCCToken.balanceOf(modernAddr)).toString(),
      (await legacyCCToken.balanceOf(LegacyAddr)).toString()
    );
    console.log(
      "Total Supplies:",
      (await modernCCToken.totalSupply()).toString(),
      (await legacyCCToken.totalSupply()).toString()
    );
    // Modern Functions
    const modernName = await modernCCToken.name();
    console.log("Modern Name:", modernName);
  });
});
