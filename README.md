
# Github CollabTracker
By (Just_A_Dutchman_)[https://github.com/JustMe003] and (R-Selaru)[https://github.com/R-Selaru]
## How to set up

Step 1:
First go to the link [https://github.com/apps/collabtracker] and install the 
extenstion on your github account.

Step 2:
Clone the code 

Step 3:
Using PowerShell go to the "CollabTracker" folder

Step 4
Use the following commands in PowerShell:
```bash
  npm install 
  npm run tauri dev
```
    
## Demo

Step 1:
Press the login button

Step 2:
Continue the authentification on github till it asks you for a code

Step 3:
Take the code shown in the app and paste on the github authentification page

Step 4:
Close the github authentication page. You will now be taken to the main page

Step 5:
Now the application is running, requesting the GitHub API and storing data locally. This may take a while

Step 6:
Await the application until it shows a table with repositories. The application is now ready for use


## Use cases
Currently the application can show the following things:
1. The number of GitHub users with whom we have collaborated
2. All collaborations between users in a repository
3. The biggest collaborator in a repository
