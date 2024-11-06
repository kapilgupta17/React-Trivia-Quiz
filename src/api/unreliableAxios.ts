import axios from "axios";


class UnreliableAxios {
  public async get(path: string) {
    const res = await axios.get(path);

    if (Math.random() < 0.2) {
      throw new Error("UNKNOWN_ERROR");
    }

    return res;
  }
}

export default new UnreliableAxios();
