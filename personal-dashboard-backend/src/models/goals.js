import query from "../db/index.js"

export async function getGoals(){
    const result = await query('SELECT * FROM goals;');
    return result.rows;
}

export async function getGoalById(id){
    const result = await query('SELECT * FROM goals WHERE id = $1;', [id]);
    return result.rows;
}

export async function addNewGoal(goal){
    await query('INSERT INTO goals(goal, progress, starred) VALUES ($1, $2, $3);', [goal.goal, goal.progress, goal.starred]);
    return goal;
}

export async function editGoal(id, goal) {

    await query('UPDATE goals SET (goal, progress, starred) = ($1, $2, $3) WHERE id = $4;', [goal.goal, goal.progress, goal.starred, id]);

    const editedGoal = await query('SELECT * FROM goals WHERE id = $1', [id])
    return editedGoal.rows[0];
}

export async function deleteGoal(id){
    const deletedGoal = await query('SELECT * FROM goals WHERE id = $1', [id]);
    await query('DELETE FROM goals WHERE id = $1;', [id]);
    return deletedGoal.rows[0];
}