import { Writer } from "./Writer";
export class RepoWriter extends Writer {

  constructor(){
    super("../../Storage/repos.json");
  }

}