import * as intl from 'intl';
import { defaults } from 'lodash';
import moment = require('moment');

export const withDefaultContext = (context: any = {}) => {
    const locale: string = context.locale || 'en-US';
    const defaultTz = context.tz || 'UTC';
    const dateTimeFormat = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' };

    const defaultContext: object = {
        // common var for translation
        __: ((...args: any[]) => (context.__ ? context.__(...args) : String(args))),
        currencyFormat: (n: any, currency: any) => {
            const decimals = 2;
            if (!currency) {
                const numFormatter = new intl.NumberFormat(locale, { maximumFractionDigits: decimals });
                return numFormatter.format(n);
            }
            const currencyOpts = {
                currency,
                maximumFractionDigits: decimals,
                style: 'currency',
            };
            const numberFormatter = new intl.NumberFormat(locale, currencyOpts);
            return numberFormatter.format(n);
        },
        dateTimeFormat: (date: any, tz = defaultTz) => {
            const format = (d: any) => {
                if (!d || !new Date(d).getTime()) {
                    return d;
                }
                return new intl.DateTimeFormat(locale, dateTimeFormat).format(d);
            };
            return format(shiftUtcDate(date, tz));
        },
    };
    return defaults(defaultContext, context);
};

const shiftUtcDate = (d: any, t: any) => {
    if (!d) {
        return d;
    }
    if (t) {
        return new Date(moment.utc(d).tz(t).format('YYYY-MM-DD HH:mm:ss'));
    }
    return new Date(moment.utc(d).format('YYYY-MM-DD HH:mm:ss'));
};
