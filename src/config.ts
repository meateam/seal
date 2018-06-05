type Config = {
  port: number,
  db: {
    host: string,
    port: string,
    name: string,
<<<<<<< HEAD
  };
=======
  },
>>>>>>> d5b1779cca0cc004628e35c72b3827426e164266
};

const dev: Config = {
  port: 3000,
  db: {
    host: 'localhost',
    port: '27017',
    name: '',
  },
};

// Change to Production Enviorment
const prod: Config = {
  port: 3000,
  db: {
    host: 'localhost',
    port: '27017',
    name: 'prodDB',
  },
};

function getConfig(type: string) {
  switch (type) {
    case 'dev':
      return dev;
    case 'prod':
      return prod;
    default:
      return dev;
  }
}

export const config = getConfig(process.env.NODE_ENV || 'dev');
