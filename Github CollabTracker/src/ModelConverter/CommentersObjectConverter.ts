import { CommentApiModel } from "../ApiModels";
import { CommentersObject } from "../Models/GenericStringObject";

export class CommentersObjectConverter {
  public static convert(models: CommentApiModel[]): CommentersObject {
    const commenters: CommentersObject = {};
    models.forEach((e) => {
      if(commenters[e.user.login]) {
        commenters[e.user.login]++;
      } else {
        commenters[e.user.login] = 1;
      }
    });
    return commenters;
  }
}