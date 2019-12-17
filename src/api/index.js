import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { performances, sessions } from 'Base/api/data';

const mock = new MockAdapter(axios, { delayResponse: 250 });

mock.onGet('/api/performances').reply(200, {
  data: performances,
});

mock.onGet('/api/sessions').reply(200, {
  data: sessions,
});

mock.onPost('/api/orders').reply(({ data }) => {
  const {
    data: {
      attributes: {
        payment: { type, card },
      },
    },
  } = JSON.parse(data);

  const errorResponse = { errors_tree: { data: { payment: { card: {} } } } };

  if (type === 'card' && card.valid_thru === '11/11')
    errorResponse.errors_tree.data.payment.card.valid_thru = ['expired'];
  if (type === 'card' && card.number === '1111-1111-1111-1111')
    errorResponse.errors_tree.data.payment.card.number = ['invalidNumber'];

  return errorResponse.errors_tree.data.payment.card.valid_thru ||
    errorResponse.errors_tree.data.payment.card.number
    ? [400, errorResponse]
    : [201];
});

export default axios;
