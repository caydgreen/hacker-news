Created by Cayla Green using next.js

## System Requirements

- Node.js 10.13 or later
- MacOS, Windows (including WSL), and Linux are supported

## Prompt

- Display stories in a paginated fashion, being able to select between showing 10, 25, or 50 stories per page
- Have a way to open the link to the story
- Have a way to toggle showing up to 5 comments on a story (hidden by default).
- Have a way to switch between viewing top stories, best stories, new stories, ask stories, show stories, job stories
- Have a way to prefix search currently displayed titles (not case sensitive) - e.g. [“Apples, Bananas, Cherries and More”, “Application of Javascript”] - searching for “app” would display the both stories, searching for “ban” would display the 1st story, searching for “erries” would display neither story. Hacker News doesn’t have a way to search through their API so you’ll only need to search based on what’s currently displayed (i.e. client side search).
- Have a way to sort by score, title, date. Hacker News doesn’t have a way to sort through their API so you’ll only need to sort based on what’s currently displayed (i.e. client side sort).
- Have some styling to the UI - You don’t have to spend a ton of time on this, but try to make the UI/UX fairly usable


## Running the App

```bash
npm run dev
# or
yarn dev
```
