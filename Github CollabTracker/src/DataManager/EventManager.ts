import * as models from "../Models";

export class EventManager {

  public static createAssigneeEvents(pastIssue: models.IssueModel, newIssue: models.IssueModel, events: models.RepoCollaborations)  {
    let pastAssignees: string[] = [];
    if(pastIssue != undefined)
      pastAssignees = pastIssue.getAssignees();
    const newAssignees = newIssue.getAssignees();
    let detectedNew = this.detectNewAssignees(pastAssignees, newAssignees);
    for(let i = 0; i < detectedNew.length; i++) 
      for(let j = 0; j < newAssignees.length; i++)
        if(detectedNew[i] != newAssignees[j]) 
          (events[detectedNew[i]])[newAssignees[j]].incrementAdmin(1);
    
  }
    
  public static createAssigneeCommentator( pastIssue: models.IssueModel, newIssue: models.IssueModel, events: models.RepoCollaborations) {
    let pastCommenters: models.CommentersObject = {};
    if (pastIssue) 
      pastCommenters = pastIssue.getCommenters();
    
  
    const newAssignees = newIssue.getAssignees();
    const newCommenters = newIssue.getCommenters();
    const detectedNewCommenters = this.detectNewComments(pastCommenters, newCommenters);
  
    // Use an array of new commenters for single loop processing
    const commenterKeys = Object.keys(detectedNewCommenters);
  
    commenterKeys.forEach((commenter1) => {
      const commenter1Count = detectedNewCommenters[commenter1];
      const isCommenter1Admin = newAssignees.includes(commenter1);
  
      commenterKeys.forEach((commenter2) => {
        if (commenter1 === commenter2) return;
  
        const commenter2Count = detectedNewCommenters[commenter2];
        const isCommenter2Admin = newAssignees.includes(commenter2);
  
        const event = events[commenter1][commenter2];
  
        if (isCommenter1Admin) {
          event.incrementAdmin(commenter1Count);
        } else {
          event.incrementDeveloper(commenter1Count);
        }
  
        if (isCommenter2Admin) {
          event.incrementAdmin(commenter2Count);
        } else {
          event.incrementDeveloper(commenter2Count);
        }
      });
    });
  }
  

  private static detectNewAssignees(oldArray: string[], newArray: string[]) : string[] {
    let detectedNew: string[] = [];
    newArray.forEach( element => {
      if(!oldArray.includes(element))
        detectedNew.push(element)
    })
    return detectedNew;
  }

  private static detectNewComments(oldArray: models.CommentersObject, newArray: models.CommentersObject) : models.CommentersObject {
    let detectedNew: models.CommentersObject = {};
    Object.entries(newArray).forEach((pair: [string, number]) => {
      if(!(oldArray[pair[0]] && oldArray[pair[0]] == pair[1]))
        detectedNew[pair[0]] = pair[1] - oldArray[pair[0]]
    });
    return detectedNew;
  }
}