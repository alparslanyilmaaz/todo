# Todo Tracker app

First of all thank you for landing here again :)

### Content
1. - [Accessing Deployed Project](#accessing-deployed-project)
2. - [Installing Project to Local](#requirements)  
     2.1 \* [Installation Steps](#installation-steps)
3. - [Development Steps](#development-steps)
4. - [Existing Bugs](#existing-bugs)
5. - [Things I Could Add](#things-i-could-add)
6. - [Places Where I Improved Project](#improved)

Let's get started!

<a name="accessing-deployed-project">

## Accesing Deployed Project

<a name="requirements"/>

## Installing Project to Local

To run this project in your local environment, you should have install higher versions of `nodejs v16.13.0`.

## Installation Steps

- clone this repo` git clone https://github.com/alparslanyilmaaz/bizcuit-todo-challange.git`

After clone process you should do two more installation

- Go inside `todo-challange-client` folder and run `yarn install` command
- Go inside `todo-challange-server` folder and run `yarn install` command

After completing this steps you will be able to run both of projects.
asd

- Go inside `todo-challange-client` folder and run `yarn start` command
- Go inside `todo-challange-server` folder and run `yarn start` command

After this steps, client project will be run at `http://localhost:3000`, server project will be run at `http://localhost:8080`. Please be sure both of the projects are running on exact same port which defined in upperside. Otherwise you can face with some errors.

<a name="development-steps"/>

## Development Steps
- Reviewed the designs on Behance, selected one and created DB models with their relationships on the backend. Also set up an AWS Free Tier Database Service and connected it.
- Developed login and register endpoints with JWT authentication, and implemented Todo and Group endpoints. Added services and Transformer classes to work on the UI components.
- Wrote tests for the user login and register endpoints to ensure their functionality.

<a name="existing-bugs"/>

## Existing Bugs

- The client does not have an AuthGuard. Although I added an AxiosProvider to handle 401 requests, it could have been better.
- In the edit Todo form, the default date is not visible because of a wrong type conversion. It expects to be a string, but the value it receives is probably typed as a Date.
- If you enter more than 500 characters for the todo text, you will face an error. Although it is automatically handled on the backend, there are no warnings on the UI.
- Unfortunately, there is no way to view your old todos on the UI. This is a missing feature, but due to time constraints, I had to drop it.

<a name="things-i-could-add"/>

## Things I Could Add

- The idea of separating todos by date, such as filtering by "Today," "Tomorrow," and "20 April 2023," is cool and necessary, but I wish I had implemented it on the backend. It is causing some rendering issues on the UI.
- Pagination or infinite scroll on posts would make more sense.
- Adding social login would be a great addition.
- The ability to delete and update groups is needed.
- Animations such as easing in or out, or staggered animations, would enhance the look of the todo cards.
- Although it was developed quickly, the mobile version of the app looks a bit outdated. It could be improved.
- The ability to drag and drop tasks to change their dates would be a fantastic feature.
- Filtering todos by their group would also be a great feature.

<a name="improved"/>

## Places Where I Improved Project

- The AxiosProvider was a really nice touch on the UI.
- I used TypeORM on the backend.
- I established relations such as Many-to-Many and One-to-Many.
- React Query was used for caching.
- JWT authentication was implemented.
- I used Transformer classes on the UI.
