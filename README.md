## Inspiration

There are many reasons to track your meals - to lose weight, to go on a bulk, etc. For many people, including myself (Jacob), meal tracking is such a tedious process, having to research into the caloric and nutritional content of a meal, and manually entering them into a spreadsheet. How could we solve this?

## What it does

Our software, MealSnap, makes it incredibly easy to track meals. Take a picture with your webcam, and MealSnap will automatically break down the calories and other nutritional content in your meal, and this gets saved to your feed along with all the other meals you've logged. 

## How we built it

We were inspired by the multi-modal capabilities of Google Gemini - we specifically used their Vertex AI API to send images to it and break down the nutritional content back as a convenient .json object. 

We used MongoDB to hold our meals collection as .json documents - storing info about a meal's name, description, timestamp, and all the nutritional info. We can't really store images in MongoDB, so we also use the Google Cloud Platform as a way to upload and store images to then display on the feed. 

For frontend libraries, we used Material UI. And ChatGPT was a huge help in figuring out some errors and how to parse inputs. 

For the rest of the tech stack, we used React for the Frontend, and Express for the Backend, and Node.js to run our app.

## Challenges we ran into

Between me (Jacob) and my partner (Juan), I am very new to web development, and spent the whole night learning and debugging a ton of backend. There was always new issues arising, from setting up the CRUD routes and URI formatting, to a bunch of parsing and formatting issues with the meal .jsons. 

## Accomplishments that we're proud of / What we learned

There were many issues we ran into throughout the night, but we persevered and even for as small of a prototype we have now, we're proud that we have it working to share it for this hackathon - this is my (Jacob) first hackathon I was able to submit :o. Hopefully this inspires other people to keep learning and keep trying!

## What's next for MealSnap

We actually really like this idea for personal use and want to expand it further. 
- Comprehensive table view; filter by nutritional value, dates, etc.
- Dashboard for weekly / monthly views; meeting your nutritional goals
- User profiles; share meals with other users : )
