# Scoreboard Module Specification: 

## 1. Overview
The software module support for managing user scores and a live-updating top-10 leaderboard. It ensures secure, real-time updates while preventing unauthorized score manipulation.

## 2. Database Design
- UserScores Table

| Column    | Type     | Description           |
| --------- | -------- | --------------------- |
| userId    | string   | Primary key           |
| score     | integer  | Current total score   |
| updatedAt | datetime | Last update timestamp |

- Users Table

| Column       | Type         | Description                                 |
| ------------ | ------------ | ------------------------------------------- |
| userId       | string       | Primary key, unique identifier (e.g., UUID) |
| username     | string       | User’s display name                         |
| email        | string       | User email, unique                          |
| accessToken  | string       | JWT access token for authentication         |
| refreshToken | string       | JWT refresh token                           |
| createdAt    | datetime     | User creation timestamp                     |
| updatedAt    | datetime     | Last update timestamp                       |

- ActionScores Table

| Column            | Type     | Description           |
| ----------------- | -------- | --------------------- |
| actionId          | string   | Primary key           |
| actionName        | string   | Action name           |
| scoreIncrease     | integer  | increase score        |

## 3. System Components
**1. Frontend (Website)**

- Shows the top 10 scoreboard.
- Sends authorized requests to update score when a user completes an action.
- Receives live updates via WebSocket.

**2. Backend (Application Server)**

- API endpoint to update user scores.
- Validates user authorization.

**3. Socket**
- Broadcast updated top 10 scores to connected clients.

**4. Database**
- Stores user info and scores.


## 4. Functional Requirements

### 1. Login

**Responsibility**: Handle user login

**API spec**:
    Method: POST

    Endpoint:  /api/auth/login

    Request:

    {
        username: string,
        password: string
    }
    
    Response: 

    {
        user: {} // user information,
        accessToken: string,
        refreshToken: string
    }


### 2. Update User Score by Action

**Responsibility**: 
- Update the score in the database according to action type.
- Validate that the user is authorized to update the score.
- Emit a live update event to clients if the user is in the top 10.

**API spec**:
    Method: POST

    Endpoint: /api/score/update

    Header: access-token is required

    Request:

    {
        userId: string,
        actionId: string
    }
    
    Response: 

    {
        "userId": string,
        "score": integer
    }


### 3. Fetch Top 10 User’s Score

**Responsibility**: Fetch top 10 user’s scores

**API spec**:
    Method: GET

    Endpoint: /api/score/top

    Header: access-token is required
    
    Response: 

    [{
        userId: string,
        userName: string,
        score: number,
        userData, // Additional user's information need to deplay on score board
        ...
    }]


### 4. Real-Time Updates via socket

**Responsibility**: 
- Use WebSockets to broadcast leaderboard changes.
- Only push updates when top 10 changes occur.

**API spec**:
    Method: Socket

    Endpoint:  via socket 

    Auth: access-token is required
    
    Payload: 

    {
        "event": "scoreboardChange",
        "data": [
            {"userId": string, "username": string, "score": number},
            ...
        ]
    }

### 5. Security
**1.  Authentication**
- Only authenticated users can submit score updates.
- Use JWT tokens.

**2. Authorization**

- Users can only update their own score.

**3. Rate Limiting / Anti-Cheating**

- Limit number of score updates per user per minute to prevent spamming.
- Avoid client-side score calculation; only server updates scores(That why we need an Actions table in database to define the scoreIncrease according to specific action, client just pass actionId into API, server will increase user's score base on it).

## 5. Main Flow Diagram
[ Click here to view diagram](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Scoreboard%20Main%20Flow&dark=auto#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22yvELXFXFmgzVzmuQjB2Z%22%3E3ZpbU5wwFMc%2FDY863MKuj7rW1o62tqujPnUixCUjS5gQ9tJP3wTCLUFXtwi2L%2BzmhITwyz8nOWfXcGbLzWcKk%2FCSBCgybDPYGM6pYduW6dr8Q1i2hQXYk8KwoDiQN9WGOf6NypbSmuEApa0bGSERw0nb6JM4Rj5r2SClZN2%2B7ZFE7acmcIE0w9yHkW69xQELC%2BsUmLX9C8KLsHyyZcqaJSxvloY0hAFZN0zOJ8OZUUJY8W25maFIwCu5FO3OnqmtBkZRzF7TwFuB7beNdw5%2BrX6xL08XlwfHPw5kLysYZfKFb1LEDRdkgWM5brYtYVCSxQES%2FVmGc7IOMUPzBPqids2nn9tCtoxktewZUYY2zw7ZqkBwBSGyRIxu%2BS2ygSvRSe2UJNf1RFilLWxMgidtUM79ouq4xsO%2FSEJvoGV30aLcMiPLJEKMC5U%2FlXMzj32GyfgAnY9G0NEInlESMxQHAhT%2FEASvvs%2BvDTGsM5hgfk19QgXasywJIEP5%2BPnwbfPr7fXoiIG3E3HlzAZB7GqIT6D%2FVBDmb4ofcS7TnB0XqzDDjIWE4t%2FwQ4gWTCeHoMXUcjt0C8CAUMELUAtVCqa5UEVXwgWcnoxP8kgl6XR5AGdIkp5OkhIY%2BDBlFcsg3%2BUTfhUrxyzXv7nCkF9v0cOccPhsdL6O1V77XTq1zSEX%2F%2BQl%2F0qRj%2FAqJxmjdQn2gUAqajl4WHmEWtM356NjdndTtiZDUp5qlGch8p%2B46fxRICsOBTgtXcF1pWWVZEiWD1k6jFiBslEdvfIwUBl753ikcdQIceUei2M8L%2FkRTFPst8HUWjR5iaOg27tm4V4UuBOUxdNNs%2FJ0K0vFY1GgxQIKXO6WIF0g9sI72d2T0IAMOhiXNooivgmv2sPo4i6fcEVwzOo5tpTDCFBmLiUZ9ZFs1IwVlH6qE0vZsHhtrWE%2B69Vb7i%2BE8nH%2FlRKcMZXg9qQEMLQS9Ii0NyUcut60pYYdWshLV%2FzIzF%2BKe%2FTeBeKOKRBPEch0T4Go%2FVjOwILRg%2FIeBQPcpmAOzEPTG1k04COJpjrc%2Fq1qnKHdjJ6I%2BFvVbDC7a3xvbDe8VItFFN6%2B2RRcd8niFfKZjikf4Cjy2dfpgKnS0dBOR0%2By9Od0QNPlWMOdV7xRzytKKF1FJ2%2BVhnrwqaLHoaShp4ruRSCtqIPHcaytBxjhRSzEwidObBwnItrDPoyOZcUSB4Fo3hkrttVk9BAuHoFujg09eB16UFdib8GipWeORnDZ1Tq1jHeKK3a6eu%2BV63ky5nq21WPhvq5ey7EN7er1lNpPxDIq8jpp5vsoTXNaaUJi8dOZmuEZOiWpZHlcoC%2FbYX%2FysfRs2TvtlbviuR73SmvUxaVulq56et53s3RUFbz34tIzgN%2FIv7hXPjMf%2Fe%2BVhkjol38ZKKah%2FuOF8%2BkP%3C%2Fdiagram%3E%3C%2Fmxfile%3E)