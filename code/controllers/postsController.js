import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const db = new Database(process.env.DB_PATH, { verbose: console.log });

function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate); // "17-6-2022"
  return currentDate;
}

export async function getPostsUserLiked(req, res) {
  try {
    const params = [req.params.user_id];
    const stmnt = db.prepare(`SELECT * FROM blog_posts WHERE blog_id IN 
			(SELECT blog_id FROM likes WHERE user_id = ?)`);
    const rows = stmnt.all(params);
    const jsonToSend = {
      meta: {
        name: `All posts that were liked by user with id ${params[0]}`,
        title: `All posts that were liked by user with id ${params[0]}`,
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: rows
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}