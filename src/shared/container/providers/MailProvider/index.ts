import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";
import { MailProviderInMemory } from "./in-memory/MailProviderInMemory";

const mailType = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  test: container.resolve(MailProviderInMemory),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailType[process.env.MAIL_TYPE]
);
