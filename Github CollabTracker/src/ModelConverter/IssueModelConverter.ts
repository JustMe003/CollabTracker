import { CommentApiModel } from "../ApiModels";
import { IssueApiModel } from "../ApiModels/IssueApiModel";
import { IssueModel } from "../Models";

export class IssueModelConverter {
  public static convert(apiModel: IssueApiModel, comments: CommentApiModel[] = []): IssueModel {
    const assignees: string[] = [];
    apiModel.assignees.forEach((e) => {
      assignees.push(e.login);
    });
    const reviewers: string[] = [];
    (apiModel.reviewers || []).forEach((e) => {
      reviewers.push(e.login);
    });
    const commenters: string[] = [];
    (comments || []).forEach((e) => {
      commenters.push(e.user.login);
    });

    return new IssueModel(apiModel.number, apiModel.html_url, apiModel.user.login, assignees, apiModel.comments,commenters, reviewers, apiModel.updated_at, apiModel.repository.id, apiModel.pull_request != undefined);
  }
}