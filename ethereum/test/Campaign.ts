import {
	time,
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Campaign", function () {
	async function deployCampaignFixture() {
		const minimumContribution = 5;
		const [owner, otherAccount] = await hre.ethers.getSigners();

		const CampaignFactory = await hre.ethers.getContractFactory(
			"CampaignFactory"
		);
		const campaignFactory = await CampaignFactory.deploy();

		const Campaign = await hre.ethers.getContractFactory("Campaign");
		const campaign = await Campaign.deploy(5, owner);

		return {
			campaign,
			campaignFactory,
			owner,
			otherAccount,
			minimumContribution,
		};
	}

	describe("Campaigns", function () {
		it("marks caller as the campaign manager", async function () {
			const { campaign, owner } = await loadFixture(deployCampaignFixture);
			const manage = await campaign.manager();

			expect(manage).to.equal(owner.address);
		});

		it("allows people to contribute money and marks them as approvers", async function () {
			const { campaign, otherAccount } = await loadFixture(
				deployCampaignFixture
			);

			await campaign.connect(otherAccount).contribute({ value: "200" });
			const isContributor = await campaign.approvers(otherAccount.address);
			expect(isContributor).to.equal(true);
		});

		it("requires a minimum contribution", async function () {
			const { campaign, otherAccount } = await loadFixture(
				deployCampaignFixture
			);
			try {
				await campaign.connect(otherAccount).contribute({ value: "2" });
				expect(false);
			} catch (error) {
				expect(error);
			}
		});

		it("allows a manager to make a payment request", async function () {
			const { campaign, owner, otherAccount } = await loadFixture(
				deployCampaignFixture
			);

			await campaign
				.connect(owner)
				.createRequest("Buy batteries", "100", otherAccount.address, {
					gasLimit: 1000000,
				});

			const request = await campaign.requests(0);
			expect(request.description).to.equal("Buy batteries");
		});

		it("processes requests", async function () {
			// todo
		});
	});
});
