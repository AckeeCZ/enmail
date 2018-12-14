import { createOffice, instances, ServiceType } from './createOffice';
import * as Mail from './Mail';
import { GmailAuthType } from './offices/GmailOffice';
import { compileLodashFileTemplate } from './templates/compileLodashFileTemplate';
import * as compileLodashTemplate from './templates/compileLodashTemplate';

declare global {
    type Nullable<T> = T | null;
}

export = {
    compileLodashFileTemplate,
    compileLodashTemplate,
    GmailAuthType,
    Mail,
    ServiceType,

    createOffice,
    getOffice: (ident: string) => instances.get(ident),
};
