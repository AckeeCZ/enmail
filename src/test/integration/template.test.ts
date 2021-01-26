import { compileLodashTemplate } from '../../index';

describe('Template', () => {
    it('Compile lodash template', () => {
        const template = `
            <a href="<%= url %>">#<%= id %> Invoice (<%= dateTimeFormat(receivedAt, 'Europe/Berlin') %>)</a>
            <span>Price: <strong><%= currencyFormat(price, 'EUR') %></strong></span>
        `;
        const compiled = compileLodashTemplate(template, {
            url: 'https://ackee.cz',
            receivedAt: new Date('2020-07-01T14:50:32Z'),
            price: 125.78,
            id: 202001,
        })();
        expect(compiled).toMatchSnapshot();
    });
});
