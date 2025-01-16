import { Scraper } from "../ApiScraper/Scraper";
import { IssueModelConverter } from "../ModelConverter";
import { getNumberObjectList, IssueModel, IssueObject } from "../Models";

export type IssuePullRequestObject = { issues: IssueObject, pullRequests: IssueObject };


export class IssueDataManager {
  
  public static seperateIssuesPullRequests(all: IssueObject | null | undefined): IssuePullRequestObject  {
    const issues: IssueObject = {};
    const pullReqs: IssueObject = {};
    if (all) {
      getNumberObjectList<IssueModel, IssueObject>(all).forEach((pair) => {
        console.log(pair[1].getIsPullRequest());
        if (pair[1].getIsPullRequest()) {
          pullReqs[pair[1].getID()] = pair[1];
        } else {
          issues[pair[1].getID()] = pair[1];
        }
      });
    }
    return {
      issues: issues,
      pullRequests: pullReqs
    };
  }

  public static async scrapeIssues(scraper: Scraper, lastUpdated: Date): Promise<Map<number, IssueObject>> {
    const res = await scraper.scrapeIssues(lastUpdated);
    const issues = new Map<number, IssueObject>();

    res.forEach((issue) => {
      console.log(issue);
      const res = IssueModelConverter.convert(issue);
      console.log("res: ", res);
      let issueMap = issues.get(res.getRepoID());
      if (!issueMap) {
        issueMap = {};
        issues.set(res.getRepoID(), issueMap);
      }
      issueMap[res.getID()] = res;
    });
    console.log(issues);
    return issues;
  }

}