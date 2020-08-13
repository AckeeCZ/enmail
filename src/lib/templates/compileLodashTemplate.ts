import { template } from 'lodash';
import { withDefaultContext } from './withDefaultContext';

export const compileLodashTemplate = (templateString: string, context: any) => {
    return (
        (...args: any[]) =>
            template(templateString, {
                imports: withDefaultContext(context),
            })(...args).replace(/^\s*[\r\n]/gm, '')
    );
};
