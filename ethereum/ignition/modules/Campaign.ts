import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MINIMUM_CONTRIBUTION_DEFAULT = 100;

const CampaignModule = buildModule("CampaignModule", (m) => {
	const minimumContribution = m.getParameter(
		"minimumContribution",
		MINIMUM_CONTRIBUTION_DEFAULT
	);

	const campaignFactory = m.contract("CampaignFactory");

	m.call(campaignFactory, "createCampaign", [minimumContribution]);

	return { campaignFactory };
});

export default CampaignModule;
