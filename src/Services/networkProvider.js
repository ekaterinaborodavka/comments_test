const headers = {
    'content-type': 'application/json',
  }

export const get = async () => {
    return fetch( 'http://localhost:3000/comments?_embed=replies',
      headers).then((res) => res.json())
        .then((res) => {
          return res;
        });
  };

  export const create = async (item) => {
    const result = await fetch( 'http://localhost:3000/comments',
      { headers, body: JSON.stringify(item), method: 'POST'})
    let data ={};
    if (result.ok) {
      data = await result.json();
    } else {
      throw new Error('Something went wrong');
    }
    return data;
  };

  export const remove = async (id) => {
    const result = await fetch( `http://localhost:3000/comments/${id}`,
      { headers, method: 'DELETE'})
    return result;
  };

  export const update = async (id, item) => {
    const result = await fetch( `http://localhost:3000/comments/${id}`,
      { headers, body: JSON.stringify(item), method: 'PUT'})
    let data ={};
    if (result.ok) {
      data = await result.json();
    } else {
      throw new Error('Something went wrong');
    }
    return data;
  };

  export const createReplies = async (item, id) => {
    const result = await fetch( `http://localhost:3000/comments/${id}/replies`,
      { headers, body: JSON.stringify(item), method: 'POST'})
    let data ={};
    if (result.ok) {
      data = await result.json();
    } else {
      throw new Error('Something went wrong');
    }
    return data;
  };