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


}