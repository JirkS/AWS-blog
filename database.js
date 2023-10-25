import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
}).promise()


export async function getUsers() {
    const [rows] = await pool.query("select * from user")

    return rows
}

export async function getUser(u, p) {
    const [row] = await pool.query(`
        select * from user
        where username = ?
        and 
        password = ?
        `, [u, p])

    return row[0]
}

export async function getUserByID(id) {
    const [row] = await pool.query(`
        select * from user
        where ID = ?
        `, [id])

    return row[0]
}

export async function register(username, password, repassword) {
    if (password != repassword) {
        return 'Repeat password has to be the same as password'
    }

    const [result] = await pool.query(`
        insert into user(username, password)
        values(?,?)
        `, [username, password])

    const id = result.insertId

    return getUserByID(id)
}