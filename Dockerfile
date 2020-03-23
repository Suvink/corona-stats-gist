FROM alpine:3.11

ENV NODE_VERSION 12.16.1

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="bird-box"
LABEL "com.github.actions.description"="Update a pinned gist to contain the latest tweets of a user"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="clipboard"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="blue"

# Copy the package.json and package-lock.json
COPY package*.json ./

RUN npm install --save request-promise
# Install dependencies
RUN npm ci

# Copy the rest of your action's code
COPY . .

# Run `node index.js`
ENTRYPOINT ["node", "index.js"]
