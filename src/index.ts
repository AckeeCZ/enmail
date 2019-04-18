import { get } from 'lodash';
import { instances } from './createOffice';
import { Office } from './offices/Office';

export * from './createOffice';
export * from './Mail';
export * from './offices/FcmOffice';
export * from './offices/GmailOffice';
export * from './offices/OnesignalOffice';
export * from './offices/Office';
export * from './offices/SendgridOffice';
export * from './templates/compileLodashFileTemplate';
export * from './templates/compileLodashTemplate';
export * from './templates/withDefaultContext';

declare global {
    type Nullable<T> = T | null;
}

export const getWrappedOffice = (ident?: string) => instances.get(ident || 'default');
export const getOffice = (ident?: string) => get(instances.get(ident || 'default'), 'office') as Office;
