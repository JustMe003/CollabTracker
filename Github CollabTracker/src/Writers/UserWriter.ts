import { Writer } from "./Writer";
export class UserWriter extends Writer {

  constructor(){
    super("../../Storage/users.json");
  }

}