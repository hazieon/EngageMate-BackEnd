# EngageMate
Your companion tool to track and measure engagement in real time! 
A four week, full stack project for School of Code, aiming to improve remote teaching. Our team of 6 was called The Callback Cats(). 
We built a remote learning companion tool in React, Node and websockets to form features such as the 'Thumbometer™', raise hand, live poll and an admin section.

Our School of Code final project, we worked in week-long agile sprints to ideate, research, plan and build an MVP (minimum viable product) of our solution.
Once the MVP with React components, a postgreSQL Heroku database and socket.io websockets, we deployed the application to Heroku and Netlify with continuous deployment.
We continued developing the application to MLP (minimum LOVEABLE product)!

view the front end repository: https://github.com/hazieon/EngageMate-FrontEnd


## View the application
https://engagemate.netlify.app/

Note: users must currently be added to the database as either a Coach or Bootcamper in order to use the app.

## Demo Day Presentation
After 4 weeks (the deadline!), we presented our MLP of EngageMate to a live audience of bootcampers, coaches, and professional developers.
Watch our presentation and live application demo here:
https://youtu.be/p23oB7cUReQ


## EngageMate features
### Thumbometer™
A 'thumbs up or thumbs down' temperature checking tool to get consensus from a group.
Get visual, anonymous feedback from a group of participants quickly.
We used React components and websockets to build this feature, with results being posted to the PostgreSQL database.

### Raise Hand
Aiming to improve Zoom's native feature, we created a tool for learners to indicate when they have a question and the topic of their question.
Our user research told us that Zoom's raise hand feature:
is not prominent or easy to find, 
doesn't alert speakers when someone raises their hands, 
is NOT chronologically ordered as to who raised their hand first,
does not give context or topics for the questions waiting to be asked.

Our app aims to provide a solution to these issues.

### Live Poll
Our user research showed that although learner participants enjoy the interactive nature of (Zoom) polls, they are underused.
Similarly, coaches told us that this feature was hard to find and set up.
We implemented a live quiz feature in EngageMate.

### Dj deck 
A single resource for our client, the School of Code, to access, organise and play musical jingles, voice notes or music tracks to keep bootcampers energised.

### Admin page
The point of the application that allows viewing and editing of EngageMate database data. Here, session data can be filtered, sorted and deleted. 
Users can also be removed or new users added, with the option to do this in bulk from an external file to save time upon the uptake of a new bootcamp cohort.

## Core Technologies:
- React 
- Node
- Socket.io
- Auth0
- Push.js
- Chakra UI
