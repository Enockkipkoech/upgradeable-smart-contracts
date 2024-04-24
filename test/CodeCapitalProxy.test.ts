import { expect } from "chai";
import hre, { upgrades } from "hardhat";
import { LegacyCodeCapital } from "../typechain-types/contracts/LegacyCodeCapital";

describe("CodeCapitalProxy", () => {
  it("Should deploy LegacyCodeCapital and ModernCodeCapital", async () => {
    const LegacyCodeCapitalFactory = await hre.ethers.getContractFactory(
      "LegacyCodeCapital"
    );

    const legacyCCToken = (await upgrades.deployProxy(
      LegacyCodeCapitalFactory
    )) as unknown as LegacyCodeCapital;

    const addr = await legacyCCToken.getAddress();
    console.log("LegacyCodeCapital deployed to:", addr);

    const owner = await legacyCCToken.getOwner();
    expect(addr).to.properAddress;
  });
});
