export const performances = [
  {
    id: 1,
    type: 'performances',
    attributes: {
      title: 'Волк и семеро козлят',
      genres: ['Комедия', 'Сказка', 'Для детей'],
    },
  },
  {
    id: 2,
    type: 'performances',
    attributes: {
      title: 'Иисус Христос суперзвезда',
      genres: ['Мюзикл', 'Сказка'],
    },
  },
];

export const sessions = [
  {
    id: 1,
    type: 'sessions',
    attributes: {
      from: '2019-01-01 12:00',
      to: '2019-01-01 13:00',
    },
    relationships: {
      performance: {
        data: {
          type: 'performances',
          id: 1,
        },
      },
    },
  },
  {
    id: 2,
    type: 'sessions',
    attributes: {
      from: '2019-01-01 14:00',
      to: '2019-01-01 15:00',
    },
    relationships: {
      performance: {
        data: {
          type: 'performances',
          id: 1,
        },
      },
    },
  },
  {
    id: 3,
    type: 'sessions',
    attributes: {
      from: '2019-01-01 16:00',
      to: '2019-01-01 17:00',
    },
    relationships: {
      performance: {
        data: {
          type: 'performances',
          id: 1,
        },
      },
    },
  },
  {
    id: 4,
    type: 'sessions',
    attributes: {
      from: '2019-01-03 12:00',
      to: '2019-01-03 13:00',
    },
    relationships: {
      performance: {
        data: {
          type: 'performances',
          id: 2,
        },
      },
    },
  },
  {
    id: 5,
    type: 'sessions',
    attributes: {
      from: '2019-01-03 14:00',
      to: '2019-01-03 15:00',
    },
    relationships: {
      performance: {
        data: {
          type: 'performances',
          id: 2,
        },
      },
    },
  },
  {
    id: 6,
    type: 'sessions',
    attributes: {
      from: '2019-01-03 16:00',
      to: '2019-01-03 17:00',
    },
    relationships: {
      performance: {
        data: {
          type: 'performances',
          id: 2,
        },
      },
    },
  },
];
