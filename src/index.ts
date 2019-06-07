import { get } from 'lodash';
import { instances } from './createOffice';
import { Office } from './offices/Office';

export { createOffice, ServiceOptions, ServiceType, WrappedOffice } from './createOffice';
export { Mail, MailType } from './Mail';
export { FcmMailer, FcmOffice, FcmOfficeOptions } from './offices/FcmOffice';
export { GmailAuthType, GmailOffice, GmailOfficeOptions } from './offices/GmailOffice';
export { OnesignalMailer, OnesignalOffice, OnesignalOfficeOptions } from './offices/OnesignalOffice';
export { Mailer, Office, OfficeOptions, OfficeResult } from './offices/Office';
export { SendgridMailer, SendgridOffice, SendgridOfficeOptions } from './offices/SendgridOffice';
export { compileLodashFileTemplate } from './templates/compileLodashFileTemplate';
export { compileLodashTemplate } from './templates/compileLodashTemplate';
export { withDefaultContext } from './templates/withDefaultContext';

export const getWrappedOffice = (ident?: string) => instances.get(ident || 'default');
export const getOffice = (ident?: string) => get(instances.get(ident || 'default'), 'office') as Office;
