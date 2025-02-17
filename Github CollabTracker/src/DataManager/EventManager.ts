import * as models from "../Models";

export class EventManager {

  public static createAssigneeEvents(pastIssue: models.IssueModel, newIssue: models.IssueModel, events: models.RepoCollaborations)  {
    let pastAssignees: string[] = [];
    if(pastIssue != undefined)
      pastAssignees = pastIssue.getAssignees();
    const newAssignees = newIssue.getAssignees();
    let detectedNew = this.detectNewAssignees(pastAssignees, newAssignees);
    for(let i = 0; i < detectedNew.length; i++) {
      for(let j= i + 1; j < detectedNew.length; j++) {
        events[detectedNew[i]] = events[detectedNew[i]] || {};
        events[detectedNew[j]] = events[detectedNew[j]] || {};
        (events[detectedNew[i]])[detectedNew[j]] = (events[detectedNew[i]])[detectedNew[j]] || new models.EventModel(0, 0, 0);
        (events[detectedNew[j]])[detectedNew[i]] = (events[detectedNew[j]])[detectedNew[i]] || new models.EventModel(0, 0, 0);
        (events[detectedNew[i]])[detectedNew[j]].incrementAdmin(1);
        (events[detectedNew[j]])[detectedNew[i]].incrementAdmin(1);
      }
    }
    const cpy = newAssignees;
    let subtraction= cpy.filter(item => detectedNew.indexOf(item) < 0);
    for(let i = 0; i < detectedNew.length; i++)
      for(let j = 0; j < subtraction.length; j++) {
        events[detectedNew[i]] = events[detectedNew[i]] || {};
        events[subtraction[j]] = events[subtraction[j]] || {};
        (events[detectedNew[i]])[subtraction[j]] = (events[detectedNew[i]])[subtraction[j]] || new models.EventModel(0, 0, 0);
        (events[subtraction[j]])[detectedNew[i]] = (events[subtraction[j]])[detectedNew[i]] || new models.EventModel(0, 0, 0);
        (events[detectedNew[i]])[subtraction[j]].incrementAdmin(1);
        (events[subtraction[j]])[detectedNew[i]].incrementAdmin(1);
      }
    
  }
    
  public static createAssigneeCommentator(pastIssue: models.IssueModel, newIssue: models.IssueModel, events: models.RepoCollaborations) {
    let pastCommenters: models.CommentersObject = {};
    console.log("this is the past issue", pastIssue)
    if (pastIssue) 
      pastCommenters = pastIssue.getCommenters();
    
  
    const newAssignees = newIssue.getAssignees();
    const newCommenters = newIssue.getCommenters();
    const detectedNewCommenters = this.detectNewComments(pastCommenters, newCommenters);
    const commenterKeys = Object.keys(detectedNewCommenters);

    commenterKeys.forEach((commenter1) => {
      if(this.checkLoneInvolvementAssignee(newAssignees, commenter1) && this.checkLoneInvolvementCommentator(newCommenters, commenter1))
        return
      const commenter1Count = detectedNewCommenters[commenter1];
      const isCommenter1Admin = newAssignees.includes(commenter1);
      if(commenterKeys.length > 1) {

        commenterKeys.forEach((commenter2) => {
          if (commenter1 == commenter2) return;
          
          const commenter2Count = detectedNewCommenters[commenter2];
          const isCommenter2Admin = newAssignees.includes(commenter2);
          
          events[commenter1] = events[commenter1] || {};
          events[commenter1][commenter2] = events[commenter1][commenter2] || new models.EventModel(0, 0, 0);
          const event = events[commenter1][commenter2];
          console.log(event);
          
          if (isCommenter1Admin) {
            event.incrementAdmin(commenter1Count);
          } else {
            event.incrementCommentator(commenter1Count);
          }
          
          if (isCommenter2Admin) {
            event.incrementAdmin(commenter2Count);
          } else {
            event.incrementCommentator(commenter2Count);
          }
        });
      } else {
        Object.keys(events).forEach((user) => {
          if (user === commenter1) {
            // Update for all commenters of commenter1
            Object.keys(events[commenter1]).forEach((commenter2) => {
              if (!(this.checkLoneInvolvementAssignee(newAssignees, commenter2) && this.checkLoneInvolvementCommentator(newCommenters, commenter2))) 
                this.updateEvents(events, commenter1, commenter2, commenter1Count, isCommenter1Admin);
            });
          } else if (!(this.checkLoneInvolvementAssignee(newAssignees, user) && this.checkLoneInvolvementCommentator(newCommenters, user))) {
            // Update for other users targeting commenter1
            Object.keys(events[user]).forEach((commenter2) => {
              if (commenter2 === commenter1) 
                this.updateEvents(events, user, commenter1, commenter1Count, isCommenter1Admin);
            });
          }
        });
      }
    });
  }
    
    
  private static detectNewAssignees(oldArray: string[], newArray: string[]) : string[] {
    let detectedNew: string[] = [];
    newArray.forEach(element => {
      if(!oldArray.includes(element))
        detectedNew.push(element)
    })
    return detectedNew;
  }

  private static detectNewComments(oldArray: models.CommentersObject, newArray: models.CommentersObject) : models.CommentersObject {
    let detectedNew: models.CommentersObject = {};
    console.log("Previous commentators", oldArray)
    console.log("new commentators", newArray)
    Object.entries(newArray).forEach((pair: [string, number]) => {
      if(oldArray[pair[0]]) {
        if(oldArray[pair[0]] != pair[1])
        detectedNew[pair[0]] = pair[1] - oldArray[pair[0]]

      } else 
        detectedNew[pair[0]] = pair[1]
    });
    return detectedNew;
  }


  private static checkLoneInvolvementCommentator(oldArray: models.CommentersObject, commentator: string) {
    const commentatorKeys = Object.keys(oldArray);
    commentatorKeys.forEach(participant => {
      if(participant != commentator)
        return false;
    })
    return true;
  }

  private static checkLoneInvolvementAssignee(oldArray: string[], commentator: string) {
    const copy = oldArray
    copy.filter(participant => {
      commentator == participant;
    })
    if (copy.length > 0)
      return false
    else 
      return true
  }

  private static updateEvents(events: models.RepoCollaborations, user: string, target: string, count: number, isAdmin: boolean) {
    events[user] = events[user] || {};
    events[user][target] = events[user][target] || new models.EventModel(0, 0, 0);
    const event = events[user][target];
  
    if (isAdmin) {
      event.incrementAdmin(count);
    } else {
      event.incrementCommentator(count);
    }
  }

  public static updateCommitEvents(repo: models.RepoModel, branch: models.BranchObject) {
    models.getStringKeys(branch).forEach((key) => {
      const commits = branch[key].getCommits();
      const map = new Map<string, number>();
      commits.forEach(commit => {
        const author = commit.getAuthor();
        map.set(author, (map.get(author) || 0) + 1);
      });

      const events = repo.getCollaborations();
      // const newCommiters = EventManager.filterCommiters(events, commits);
      // const oldCommiters = EventManager.filterCommiters(events, commits, false);
      // const numCommitsPerUser = EventManager.mapNumCommitsToUser(repo.getBranches()[repo.getDefaultBranch()].getCommits());

      // newCommiters.forEach(author => {
      //   events[author] = {};
      //   oldCommiters.forEach((oldAuthor) => {
      //     events[author][oldAuthor] = new models.EventModel(0, 0, 0);
      //     events[author][oldAuthor].incrementDeveloper(numCommitsPerUser.get(oldAuthor) || 0);
      //     events[oldAuthor][author] = new models.EventModel(0, 0, 0);
      //     events[oldAuthor][author].incrementDeveloper(numCommitsPerUser.get(oldAuthor) || 0);
      //   });
      // });


      map.forEach((n1, author1) => {
        events[author1] = events[author1] || {};
        map.forEach((n2, author2) => {
          if (author1 === author2) return;
          events[author1][author2] = events[author1][author2] || new models.EventModel(0, 0, 0);
          events[author1][author2].incrementDeveloper(n1 + n2);
        });
      });
    });
  }

  public static filterCommiters(events: models.RepoCollaborations, commits: models.CommitsModel[], reverse: boolean = false): string[] {
    const arr: string[] = [];
    commits.forEach(commit => {
      if (reverse) if (!events[commit.getAuthor()]) arr.push(commit.getAuthor());
      else if (events[commit.getAuthor()]) arr.push(commit.getAuthor());
    });
    return arr;
  }

  public static mapNumCommitsToUser(commits: models.CommitsModel[]): Map<string, number> {
    const map = new Map<string, number>();
    commits.forEach((commit) => {
      map.set(commit.getAuthor(), 1 + (map.get(commit.getAuthor()) || 0));
    });
    return map;
  }
}