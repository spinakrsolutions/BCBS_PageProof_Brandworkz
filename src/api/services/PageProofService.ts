import { pageProofSetup } from "../credentials/PageProofSetup";
import PageProof from "@pageproof/sdk";
var NodeRequestAdapter = require("@pageproof/sdk/lib/adapters/NodeRequestAdapter").default;
var ClusterCryptoAdapter = require("@pageproof/sdk/lib/adapters/ClusterCryptoAdapter").default;

export class PageProofService {
  private readonly client: PageProof;
  constructor() {
    this.client = new PageProof({
      adapters: [
        new NodeRequestAdapter({
          endpoint: pageProofSetup.endpoint,
          applicationId: pageProofSetup.applicationId,
          subscriptionKey: pageProofSetup.subscriptionKey,
        }),
        new ClusterCryptoAdapter({
          limit: 1,
        }),
      ],
    });
  }

  async downloadFile(fileId: string): Promise<Blob | Buffer> {
    try {
      await this.client.accounts.login(pageProofSetup.username,pageProofSetup.password);
      const blob = await this.client.files.download({ fileId });
      return blob;
    } catch (error) {
      console.error("File download failed:", error);
      throw error; // Re-throw for upper layers to handle
    }
  }
}