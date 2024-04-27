# InternshipTestAssignmentBackend
This is one of the repos used for my internship test assignment, namely the backend. The other repo (the frontend) with a bigger (and better) README can be found here:\ https://github.com/DonDuck1/InternshipTestAssignment.

The website is uploaded using Render, and can be accessed from the following link:\
https://internshiptestassignmentbackend.onrender.com

Because the version of Render used is the free one, the backend will go down when no traffic is detected within 2 minutes. When accessing the previous link, the backend will go up again, which can take up to 5 minutes.

The potential links are (when ":" is used, it announces an paramater, for example for "/posts/likedby/:user_id" you'd use "/posts/likedby/8"):\
(GET Request to:) "/posts/likedby/:user_id"\
(GET Request to:) "/posts/:blog_id/totallikes"\
(POST Request to:) "/posts". Body must consist of an object with variables "email", "likes", "reposts" and "views". All 4 variables must be strings.
