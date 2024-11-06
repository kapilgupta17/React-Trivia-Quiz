import { Question } from "../types";
import unreliableAxios from "./unreliableAxios";

// const AMOUNT = "5";
// const CATEGORY = "11";
// const DIFFICULTY = "medium";
const TYPE = "multiple";

export default class APIClient {
  baseURL: string;

  constructor(params: { baseURL: string }) {
    if (!params.baseURL) throw new Error("NO_API_BASE_URL_FOUND");
    this.baseURL = params.baseURL;
  }

  public async getQuestions(amount:string,category:string,difficulty:string) {
    const res = (await unreliableAxios.get(
      this.baseURL +
        `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${TYPE}`
    )) as unknown as { data: { results: Question[] } };

    return res.data.results;
  }
}
