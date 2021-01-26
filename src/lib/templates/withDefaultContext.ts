import { formatToTimeZone } from 'date-fns-timezone';
import { DateTimeFormat, NumberFormat } from 'intl';
import { defaults } from 'lodash';

export const withDefaultContext = (context: any = {}) => {
    const locale: string = context.locale || 'en-US';
    const defaultTz = context.tz || 'UTC';
    const dateTimeFormat = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' };

    const defaultContext = {
        __: ((...args: any[]) => (context.__ ? context.__(...args) : String(args))),
        currencyFormat: (n: any, currency: any) => {
            const decimals = 2;
            if (!currency) {
                const numFormatter = new NumberFormat(locale, { maximumFractionDigits: decimals });
                return numFormatter.format(n);
            }
            const currencyOpts = {
                currency,
                maximumFractionDigits: decimals,
                style: 'currency',
            };
            const numberFormatter = new NumberFormat(locale, currencyOpts);
            return numberFormatter.format(n);
        },
        dateTimeFormat: (date: any, tz = defaultTz) => {
            const format = (d: any) => {
                if (!d || !new Date(d).getTime()) {
                    return d;
                }
                return new DateTimeFormat(locale, dateTimeFormat).format(d);
            };
            return format(shiftUtcDate(date, tz));
        },
    };
    return defaults(defaultContext, context);
};

const shiftUtcDate = (d: any, t: string) => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    if (!d) {
        return d;
    }
    if (t) {
        t = t.toLowerCase() !== 'utc' ? t : 'UTC'; // IANA tz alias for Etc/UTC
        return new Date(formatToTimeZone(d, dateFormat, { timeZone: t }));
    }
    return new Date(d);
};
