
<center>
   <img  width="600"  src="https://i.imgur.com/BfvMCb6.png">
   <h3  align="center">Corona-Stats-box</h3>
   <p  align="center">🦠 Update a gist to show Coronavirus stats </p>
</center>

---

## Setup

### Prep work

1. Create a new public GitHub Gist (https://gist.github.com/)

2. Create an access token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)

3. Edit the environment variables in .github/workflows/main.yml:
      - GIST_ID: The ID portion from your gist url: `https://gist.github.com/matchai/6d5f84419863089a167387da62dd7081`.
      

### Project setup


1. Fork this repo

2. Go to the repo **Settings > Secrets**

3. Add the following environment variables:

-  **GH_TOKEN:** The GitHub access token generated above.

-  **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/Suvink/`**`6d5f84419863089a167387da62dd7081`**

4. Use Github Actions to automate the updates. Copy the contents in `.github/workflows/schedule.yaml` file and paste in a new Github Actions Workflow.
##### Based on joshghent's Rescue-Box! Happy Coding!