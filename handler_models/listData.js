import server from "../server/server.js";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const topic = process.env.TOPIC;

class TheThings {
  async listenData(req, res) {
    const test = new server({
      url: url,
      username: username,
      password: password,
      topic: topic,
    });
    // test.editTopic("stm32-motor-current-8");
    // const client = test.innit();
    await test.ChangeAttribute();

    // test.customeDevice("");

    res.send("da thanh cong");
  }
}
const thething = new TheThings();

export default thething;
