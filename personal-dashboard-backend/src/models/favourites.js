import query from "../db/index.js"

export async function getFavourites(){
    const result = await query('SELECT * FROM favourites;');
    return result.rows;
}

export async function getFavouriteById(id){
    const result = await query('SELECT * FROM favourites WHERE id = $1;', [id]);
    return result.rows;
}

export async function addNewFavourite(favourite){
    await query('INSERT INTO favourites(link, display, starred) VALUES ($1, $2, $3);', [favourite.link, favourite.display, favourite.starred]);
    return favourite;
}

export async function deleteFavourite(id){
    const deletedFavourite = await query('SELECT * FROM favourites WHERE id = $1', [id]);
    await query('DELETE FROM favourites WHERE id = $1;', [id]);
    return deletedFavourite.rows[0];
}