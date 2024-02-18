import validate from "uuid-validate";
import { v4 as uuidv4 } from "uuid";

class Step {

  constructor(stepObj: any) {
    this.#core = stepObj;
    this.#validate();
  }

  #validate() {
    const title = this.#core.title || "";
    const summary = this.#core.summary || ""; 
    let id = stepObj.id || uuidv4();
    if (!validate(stepObj.id, 4)) {
      id = uuidv4();
    }
    
  }



}
