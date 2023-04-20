import { Server } from "socket.io";
import Express from "express";
import Http from "http";
import { port_web_socket } from "./config/setup.js";
import cors from "cors";

export class WebSocket {
  socket;
  port = port_web_socket;
  data = [];
  APP = Express();

  constructor() {
    const THAT = this;
    const SERVER = Http.createServer(this.APP);
    THAT.socket = new Server(SERVER, {
      cors: {
        origins: ["http://localhost:5173", "*"],
      },
    });
    this.APP.use(Express.json());
    this.APP.use(Express.urlencoded({ extended: true }));
    this.APP.use(cors());
    SERVER.listen(THAT.port, () => {
      console.log(`listening on port socket: ${THAT.port}`);
    });

    this.APP.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  emitData(emitter, data) {
    const THAT = this;
    THAT.socket.of("/chart").emit(emitter, data);
  }

  getDailyInOut(index) {
    const THAT = this;
    let temp = [];
    THAT.data.forEach((item) => {
      temp.push({ ...item });
    });

    // console.log(temp);

    if (index == 0) {
      temp = temp.filter((item) => item.mutation === 0);
    } else {
      temp = temp.filter((item) => item.mutation === 1);
    }

    // get daily income
    let dailyIncome = [];
    temp.forEach((item) => {
      let date = item.date;
      let amount = item.amount;
      let index = dailyIncome.findIndex((item) => {
        return item.date == new Date(parseInt(date)).getFullYear();
      });
      if (index === -1) {
        dailyIncome.push({
          date: new Date(parseInt(date)).getFullYear(),
          amount: amount,
        });
      } else {
        dailyIncome[index].amount += amount;
      }
    });

    return dailyIncome;
  }
}
