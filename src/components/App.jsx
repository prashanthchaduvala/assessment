// import React, { useEffect, useState } from 'react'

// import { Pagination } from 'antd';

import DataTable from 'react-data-table-component';

import data from '../mock/data.json'

console.log(data)


const columns = [
  {
      name: 'Title',
      selector: row => row.title,
  },
  {
      name: 'PublishDate',
      selector: row => row.publishDate,
  },
  {
    name: 'Author',
    selector: row => row.author.name,
    },
    {
      name: 'Avatar',
      selector: row => row.author.avatar,
    },
    {
      name: 'Summary',
      selector: row => row.summary,
    },
    {
      name: 'categories_id',
      selector: row => row.categories[0].id,
    },
    {
      name: 'categories_name',
      selector: row => row.categories[1].name,
    },
    ];


function MyComponent() {
  return (
      <DataTable
          columns={columns}
          data={data.posts}
          pagination={true}
      />
  );
};

export default MyComponent