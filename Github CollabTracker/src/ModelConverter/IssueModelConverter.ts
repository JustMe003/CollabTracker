import { IssueApiModel } from "../ApiModels/IssueApiModel";
import { IssueModel } from "../Models";
import { CommentersObject } from "../Models/GenericStringObject";

export class IssueModelConverter {
  public static convert(apiModel: IssueApiModel, commenters: CommentersObject = {}): IssueModel {
    const assignees: string[] = [];
    apiModel.assignees.forEach((e) => {
      assignees.push(e.login);
    });
    const reviewers: string[] = [];
    (apiModel.reviewers || []).forEach((e) => {
      reviewers.push(e.login);
    });
    console.log("Double check",commenters)
    const newObj = new IssueModel(apiModel.number, apiModel.html_url, apiModel.user.login, assignees, apiModel.comments,commenters, reviewers, apiModel.updated_at, apiModel.repository.id, apiModel.pull_request != undefined);
    console.log("Before return", newObj)
    return newObj
  }
}