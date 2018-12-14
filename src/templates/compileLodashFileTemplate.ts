
import * as fs from 'fs';
import { compileLodashTemplate } from './compileLodashTemplate';

export const compileLodashFileTemplate = (templateFilePath: any, context: any) => {
    const template: any = fs.readFileSync(templateFilePath);
    return compileLodashTemplate(template, context);
};
