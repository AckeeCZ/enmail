import { template } from 'lodash';
import { withDefaultContext } from './withDefaultContext';

export const compileLodashTemplate = (templateString: string, context: any) => {
    // Wrap the func only to remove blank lines from the result
    return ((...args: any[]) => template(
        templateString,
        { imports: withDefaultContext(context) })
        (...args).replace(/^\s*[\r\n]/gm, '')
    );
};
