import { WebSocket } from "./WebSocket.js";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/config.js";
import { Emitter } from "./config/setup.js";
import { addData, deleteData, editData } from "./Firetools.js";

const IO = new WebSocket();
const colRef = collection(db, "MoneyTracker");

onSnapshot(colRef, (querySnapshot) => {
  let temp = [];
  querySnapshot.docs.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() });
  });
  IO.data = temp;
  IO.emitData(Emitter.data2UI, temp);
  IO.emitData(Emitter.income, IO.getDailyInOut(0));
  IO.emitData(Emitter.outcome, IO.getDailyInOut(1));
});

IO.socket.of("/chart").on("connection", (socket) => {
  console.log("a user connected");

  socket.on(Emitter.data2Server, (msg) => {
    console.log("chat message ", msg);
  });

  socket.emit(Emitter.data2UI, IO.data);
  socket.emit(Emitter.income, IO.getDailyInOut(0));
  socket.emit(Emitter.outcome, IO.getDailyInOut(1));

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// localhost:9090/add
IO.APP.post("/add", async (req, res) => {
  try {
    await addData(req.body, res);
  } catch (err) {
    console.log(err);
  }
  // await addData(req.body, res);
});

// localhost:9090/edit?id="20123802010"
IO.APP.put("/edit", async (req, res) => {
  try {
    await editData(req.query.id, req.body, res);
  } catch (err) {
    console.log(err);
  }
});

// localhost:9090/delete?id="20123802010"
IO.APP.delete("/delete", async (req, res) => {
  try {
    await deleteData(req.query.id, res);
  } catch (err) {
    console.log(err);
  }
});
