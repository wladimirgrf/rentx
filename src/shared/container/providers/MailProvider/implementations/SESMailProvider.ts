import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: SES;

  constructor() {
    this.client = new SES({
      region: process.env.AWS_REGION,
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const ToAddresses = [to];

    const Html = {
      Charset: "UTF-8",
      Data: templateHTML,
    };

    const Subject = {
      Charset: "UTF-8",
      Data: subject,
    };

    const message = await this.client
      .sendEmail({
        Destination: { ToAddresses },
        Source: "Bitchain <wladimir@bitchain.com.br>",
        Message: {
          Body: { Html },
          Subject,
        },
      })
      .promise();

    console.log("Message sent: %s", message.MessageId);
  }
}

export { SESMailProvider };
