import { createServer } from 'miragejs';

// imported inbuilt command for 3rd party pagination
//import 'antd/dist/antd.css';


import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });
  },
});


