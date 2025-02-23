//GET
// const path = "https://personal-dashboard.onrender.com/api/"
const url = "http://localhost:3000/api/"

export async function getItems(router){
    const data = await fetch(`${url}${router}/`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const response = await data.json();
    return response.payload;
}


//GET BY ID
export async function getItemById(router, id){
    const response = await fetch(`${url}${router}/${id}/`)
    const data = await response.json()
    return data.payload[0]
}

//POST
export async function addItem(router, item){
    const data = await fetch(`${url}${router}/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const response = await data.json();
    return response;
}

export async function editItem(router, item, id) {
    console.log("hi")
    const data = await fetch(`${url}${router}/${id}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const response = await data.json();
    return response;
}

//DELETE
export async function deleteItem(router, id){
    await fetch(`${url}${router}/${id}/`,
    {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
    })
}