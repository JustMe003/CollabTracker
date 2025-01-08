Committing to a branch: All commits between a certain timeframe. 
    If there are less than X commits, take up to X commits outside that timeframe

Developer -> Commiting to a branch
Commenter -> Comments on issues/commits
Moderator -> Merges and closes pull requests

relations:
    YOU         THEY
Developer -> Developer      Both YOU and THEY committed to the same branch
Developer -> Commenter      YOU committed to the branch in issue/pull request where THEY commented in, or where THEY commented on a commit made by YOU
Developer -> Moderater      YOU committed to the branch in pull request which THEY reviewed, closed or approved

Commenter -> Developer      YOU commented on commit THEY made, or YOU commented on issue/pull request with related branch where THEY committed 
Commenter -> Commenter      Both YOU and THEY commented on same commit, issue or pull request
Commenter -> Moderator      YOU commented on pull request which THEY reviewed, closed or merged

Moderator -> Developer      YOU reviewed, closed or approved pull request with branch where THEY committed
Moderator -> Commenter      YOU reviewed, closed or approved pull request which THEY commented on
Moderator -> Moderator      Both YOU and THEY reviewed, closed or approved same pull request

Owner creates branch -> Initial commit, is this a developer action?
Branch creator same thing
Issue creation --> First message, is a commenter action
Pull request creation --> Developer action