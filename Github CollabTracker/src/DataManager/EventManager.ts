import * as models from "../Models";

export class EventManager {

  public static createAssigneeEvents(pastIssue: models.IssueModel, newIssue: models.IssueModel, events: models.RepoCollaborations)  {
    let pastAssignees: string[] = [];
    if(pastIssue != undefined)
      pastAssignees = pastIssue.getAssignees();
    const newAssignees = newIssue.getAssignees();
    let detectedNew = this.detectNewAssignees(pastAssignees, newAssignees);
    console.log(events);
    for(let i = 0; i < detectedNew.length; i++)
      for(let j = 0; j < newAssignees.length; j++)
        if(detectedNew[i] != newAssignees[j]) {
          events[detectedNew[i]] = events[detectedNew[i]] || {};
          (events[detectedNew[i]])[newAssignees[j]] = (events[detectedNew[i]])[newAssignees[j]] || new models.EventModel(0, 0, 0);
          (events[detectedNew[i]])[newAssignees[j]].incrementAdmin(1);
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
      commenterKeys.forEach((commenter2) => {
        if (commenter1 === commenter2) return;
        
        const commenter2Count = detectedNewCommenters[commenter2];
        const isCommenter2Admin = newAssignees.includes(commenter2);
        
        events[commenter1] = events[commenter1] || {};
        events[commenter1][commenter2] = events[commenter1][commenter2] || new models.EventModel(0, 0, 0);
        const event = events[commenter1][commenter2];
        console.log(event);

        // const event = events[commenter1][commenter2];
  
        console.log("Will incremeent first for issue",newIssue.getID(), newIssue.getRepoID(), commenter1Count)
        if (isCommenter1Admin) {
          event.incrementAdmin(commenter1Count);
        } else {
          event.incrementCommentator(commenter1Count);
        }
        
        console.log("Will incremeent second for issue",newIssue.getID(), newIssue.getRepoID(), commenter2Count)
        if (isCommenter2Admin) {
          event.incrementAdmin(commenter2Count);
        } else {
          event.incrementCommentator(commenter2Count);
        }
      });
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
}