import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";
import { MailProviderInMemory } from "./in-memory/MailProviderInMemory";

const mailType = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
  test: MailProviderInMemory,
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  container.resolve(mailType[process.env.MAIL_TYPE])
);
