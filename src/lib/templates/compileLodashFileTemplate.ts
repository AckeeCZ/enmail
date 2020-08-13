import { readFileSync } from 'fs';
import { compileLodashTemplate } from './compileLodashTemplate';

export const compileLodashFileTemplate = (templateFilePath: string, context: any) => {
    const template = readFileSync(templateFilePath);
    return compileLodashTemplate(template.toString(), context);
};
