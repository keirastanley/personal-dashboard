import query from "../db/index.js"

export async function getIdeas(){
    const result = await query('SELECT * FROM ideas;');
    return result.rows;
}

export async function getIdeaById(id){
    const result = await query('SELECT * FROM ideas WHERE id = $1;', [id]);
    return result.rows;
}

export async function addNewIdea(idea){
    await query('INSERT INTO ideas(idea) VALUES ($1);', [idea.idea]);
    return idea;
}

export async function deleteIdea(id){
    const deletedIdea = await query('SELECT * FROM ideas WHERE id = $1', [id]);
    await query('DELETE FROM ideas WHERE id = $1;', [id]);
    return deletedIdea.rows[0];
}