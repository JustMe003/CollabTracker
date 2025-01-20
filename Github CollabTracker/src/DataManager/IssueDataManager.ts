import { Scraper } from "../ApiScraper/Scraper";
import * as models from "../Models";
import { IssueModelConverter } from "../ModelConverter";

export type IssuePullRequestObject = { issues: models.IssueObject, pullRequests: models.IssueObject };


export class IssueDataManager {
  
  public static seperateIssuesPullRequests(all: models.IssueObject | null | undefined): IssuePullRequestObject  {
    const issues: models.IssueObject = {};
    const pullReqs: models.IssueObject = {};
    if (all) {
      models.getNumberKeys(all).forEach((key: number) => {
        const issue = all[key];
        console.log(issue.getIsPullRequest());
        if (issue.getIsPullRequest()) {
          pullReqs[key] = issue;
        } else {
          issues[key] = issue;
        }
      });
    }
    return {
      issues: issues,
      pullRequests: pullReqs
    };
  }

  public static async scrapeIssues(scraper: Scraper, lastUpdated: Date): Promise<Map<number, models.IssueObject>> {
    const res = await scraper.scrapeIssues(lastUpdated);
    const issues = new Map<number, models.IssueObject>();

    res.forEach((issue) => {
      const res = IssueModelConverter.convert(issue);
      let issueMap = issues.get(res.getRepoID());
      if (!issueMap) {
        issueMap = {};
        issues.set(res.getRepoID(), issueMap);
      }
      issueMap[res.getID()] = res;
    });
    return issues;
  }

  public static async checkCollaborator(issue: models.IssueModel, user:string): Promise<boolean> {
    let isCollaborator = false;
    for(let i=0; i<issue.getAssignees().length; i++) {
      if(issue.getAssignees()[i] == user){
        isCollaborator = true;
        break;
      }
    }
    for(let i=0; i<issue.getReviewers().length; i++) {
      if(issue.getReviewers()[i] == user) {
        isCollaborator = true;
        break
      }
    }
    if(issue.getCommenters()[user]) {
      isCollaborator = true;
    }
    return isCollaborator;
  }

  public static async createCommentsEvents(events: models.EventModel[], pastIssue: models.IssueModel, newIssue: models.IssueModel, user: models.UserModel) : Promise<models.EventModel[]> {
    const newComments: Map<string, number> = new Map<string, number>();
    const commenters = newIssue.getCommenters();
    models.getStringKeys(commenters).forEach((key: string) => {
      const commenter = commenters[key];
      if (pastIssue != undefined) {
        const pastComments = pastIssue.getCommenters();
        if (pastComments[key])
          newComments.set(key, commenter - pastComments[key]);
      } else {
        newComments.set(key, commenter);
      }
    });
    let userNewComments: number | undefined = newComments.get(user.getLogin()) ;
    newComments.delete(user.getLogin())
    for (let [key, value] of newComments) {
      let totalEvents: number = 0;
      if (userNewComments != undefined)
        totalEvents  = userNewComments;
      else
      totalEvents = 0;
      totalEvents += value;
      console.log(key, totalEvents);
      for (let i = 0; i < totalEvents; i++) {
        const event = new models.EventModel(key, "COMMENTER-COMMENTER", undefined, newIssue.getID())
        console.log("FOUND EVENT", event)
        events.push(event);
      }
    }
    return events;
  }

  public static async createAssigneeEvents(events: models.EventModel[], pastIssue: models.IssueModel, newIssue: models.IssueModel, user: models.UserModel) : Promise<models.EventModel[]> {
    let newAssignees: string[] = [];
    const assignees = newIssue.getAssignees();
    let pastAssignees: string[] = [];
    if(pastIssue != undefined)
      pastAssignees = pastIssue.getAssignees()
    console.log(pastAssignees.length)
    for(let i = 0; i< pastAssignees.length; i++) {
      if(!assignees.includes(pastAssignees[i])) {
        console.log("removed event")
        events = events.filter(event => event.getParticipant() != pastAssignees[i] && (event.getType() != "ASSIGNEE-ASSIGNEE" || event.getType() != "ASSIGNEE-COMMENTER" || event.getType() != "COMMENTER-ASSIGNEE" ))
        console.log("removed event2", events)
      }
    }
    if(assignees.includes(user.getLogin())) {
      for(let i = 0; i< assignees.length; i++) 
        if(!pastAssignees.includes(assignees[i])) 
          newAssignees.push(assignees[i])
      if(newAssignees.includes(user.getLogin()))
        newAssignees = assignees;
      newAssignees = newAssignees.filter(assignee => assignee != user.getLogin())
      for(let i=0; i< newAssignees.length; i++)
        events.push(new models.EventModel(newAssignees[i], "ASSIGNEE-ASSIGNEE", undefined, newIssue.getID()))
    
    }
    console.log("EXITED ASSSIGNE", events)
    return events;
  }


  public static async createAssigneeCommentatorEvents(events: models.EventModel[], pastIssue: models.IssueModel, newIssue: models.IssueModel, user: models.UserModel) : Promise<models.EventModel[]> {
    let newAssignees: string[] = [];
    const newComments: Map<string, number> = new Map<string, number>();
    const assignees = newIssue.getAssignees();
    let pastAssignees: string[] = [];
    if(pastIssue != undefined)
      pastAssignees = pastIssue.getAssignees()
    const commenters = newIssue.getCommenters()
    models.getStringKeys(commenters).forEach((key: string) => {
      const commenter = commenters[key];
      if (pastIssue != undefined) {
        const pastComments = pastIssue.getCommenters();
        if (pastComments[key] && pastComments[key] < commenter)
          newComments.set(key, commenter - pastComments[key]);
      } else {
        newComments.set(key, commenter);
      }
    });
    if(assignees.includes(user.getLogin())) {
      for (let [key, value] of newComments) {
        if(key == user.getLogin())
          assignees.forEach(assignee => {
            if(assignee != user.getLogin())
              events.push(new models.EventModel(assignee, "COMMENTER-ASSIGNEE", undefined, newIssue.getID()))
          })
        else
          events.push(new models.EventModel(key, "ASSIGNEE-COMMENTER", undefined, newIssue.getID()))
      }
    } else {
      for(let i = 0; i<assignees.length; i++) 
        if(!pastAssignees.includes(assignees[i])) 
          newAssignees.push(assignees[i])
      for(let i = 0; i<newAssignees.length; i++) 
          for(let j=0; j< commenters[user.getLogin()]; j++)
            events.push(new models.EventModel(newAssignees[i], "COMMENTER-ASSIGNEE", undefined, newIssue.getID()))
    }
    return events;
  }

}