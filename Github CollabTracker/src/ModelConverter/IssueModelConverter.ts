import { IssueApiModel } from "../ApiModels/IssueApiModel";
import { IssueModel } from "../Models";

export class IssueModelConverter {
  public static convert(apiModel: IssueApiModel): IssueModel {
    const assignees: number[] = [];
    apiModel.assignees.forEach((e) => {
      assignees.push(e.id);
    });
    const reviewers: number[] = [];
    (apiModel.reviewers || []).forEach((e) => {
      reviewers.push(e.id);
    });
    return new IssueModel(apiModel.number, apiModel.html_url, apiModel.user.id, assignees, apiModel.comments, reviewers, apiModel.updated_at, apiModel.repository.id, apiModel.pull_request != undefined);
  }
}