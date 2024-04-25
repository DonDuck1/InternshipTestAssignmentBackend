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

export async function getTotalLikesOfPost(req, res) {
  try {
    const params = [req.params.blog_id];
    const stmnt = db.prepare(`SELECT SUM(like) FROM (SELECT like FROM likes WHERE blog_id = ?);`);
    const likes = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: `Net amount of likes on post with id ${params[0]}`,
        title: `Net amount of likes on post with id ${params[0]}`,
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: likes
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

function addNewPostErrorHandler(body) {
  let errors = [];

  if (!(body.email.length > 0)) {
    errors.push({
      errorComponent: 'email',
      errorMessage: "The email must not be empty"
    })
  } else {
    if (!body.email.includes('@')) {
      errors.push({
        errorComponent: 'email',
        errorMessage: "The email must include an '@'"
      })
    } else {
      if (body.email.split('@').length > 2) {
        errors.push({
          errorComponent: 'email',
          errorMessage: "The email must only include a single '@'"
        })
      } else {
        if (body.email.split('@')[0].length > 50) {
          errors.push({
            errorComponent: 'email',
            errorMessage: "The part in front of the '@' may not be longer than 50 characters"
          })
        }
        if(!(/[a-zA-Z]/.test(body.email.split('@')[0]))) {
          errors.push({
            errorComponent: 'email',
            errorMessage: "The part in front of the '@' must contain at least one letter"
          })
        }
        if (body.email.split('@')[1].length > 30) {
          errors.push({
            errorComponent: 'email',
            errorMessage: "The part after the '@' may not be longer than 30 characters"
          })
        }
        if (!body.email.split('@')[1].includes('.')) {
          errors.push({
            errorComponent: 'email',
            errorMessage: "The part after the '@' must contain one (and only one) '.'"
          })
        } else {
          if (body.email.split('@')[1].split('.').length > 2) {
            errors.push({
              errorComponent: 'email',
              errorMessage: "The part after the '@' must only include a single '.'"
            })
          }
          if(!(/[a-zA-Z]/.test(body.email.split('@')[1].split('.')[0]))) {
            errors.push({
              errorComponent: 'email',
              errorMessage: "The part between the '@' and '.' must contain at least one letter"
            })
          }
          if(!(/[a-zA-Z]/.test(body.email.split('@')[1].split('.')[1]))) {
            errors.push({
              errorComponent: 'email',
              errorMessage: "The part between after the last '.' must contain at least one letter"
            })
          }
        }
      }
    }
  }
  
  if (!(body.likes.length > 0)) {
    errors.push({
      errorComponent: 'likes',
      errorMessage: "The likes must not be empty"
    })
  } else {
    if (!(/^\d+$/.test(body.likes))) {
      errors.push({
        errorComponent: 'likes',
        errorMessage: "The likes may consist of only numbers"
      })
    } else {
      if (Number(body.likes) < 1 || Number(body.likes) > 10) {
        errors.push({
          errorComponent: 'likes',
          errorMessage: "The number of likes must lie between 1 and 10, 1 and 10 included"
        })
      }
    }
  }
  

  if (!(body.reposts.length > 0)) {
    errors.push({
      errorComponent: 'reposts',
      errorMessage: "The reposts must not be empty"
    })
  } else {
    if (!(/^\d+$/.test(body.reposts))) {
      errors.push({
        errorComponent: 'reposts',
        errorMessage: "The reposts may consist of only numbers"
      })
    } else {
      if (Number(body.reposts) < 1 || Number(body.reposts) > 10) {
        errors.push({
          errorComponent: 'reposts',
          errorMessage: "The number of reposts must lie between 1 and 10, 1 and 10 included"
        })
      }
    }
  }

  if (!(body.views.length > 0)) {
    errors.push({
      errorComponent: 'views',
      errorMessage: "The views must not be empty"
    })
  } else {
    if (!(/^\d+$/.test(body.views))) {
      errors.push({
        errorComponent: 'views',
        errorMessage: "The views may consist of only numbers"
      })
    } else {
      if (Number(body.views) < 1 || Number(body.views) > 10) {
        errors.push({
          errorComponent: 'views',
          errorMessage: "The number of views must lie between 1 and 10, 1 and 10 included"
        })
      }
    }
  }

  return errors;
}

export async function addNewPost(req, res) {
  const errors = addNewPostErrorHandler(req.body);

  const jsonToSend = {
    meta: {
      name: `New post added (not currently actually implemented)`,
      title: `New post added (not currently actually implemented)`,
      date: getToday(),
      originalUrl: `${req.originalUrl}`,
    },
    data: errors
  }
  res.status(200).json(jsonToSend);
}