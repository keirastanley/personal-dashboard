import query from "../db/index.js"

export async function getPoems(){
    const result = await query('SELECT * FROM poems;');
    return result.rows;
}

export async function getPoemById(id){
    const result = await query('SELECT * FROM poems WHERE id = $1;', [id]);
    return result.rows;
}

export async function addNewPoem(poem){
    await query('INSERT INTO poems(title, author, lines) VALUES ($1, $2, $3);', [poem.title, poem.author, poem.lines]);
    return poem;
}

export async function deletePoem(id){
    const deletedPoem = await query('SELECT * FROM poems WHERE id = $1', [id]);
    await query('DELETE FROM poems WHERE id = $1;', [id]);
    return deletedPoem.rows[0];
}