import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/config.js";
import { cllctFirestore } from "./config/setup.js";

export const addData = async (data, response) => {
  console.log(data);
  await addDoc(collection(db, cllctFirestore), {
    amount: data.amount,
    category: data.category,
    date: data.date,
    mutation: data.mutation,
    paymentmethod: data.paymentmethod,
    title: data.title,
  })
    .then(() => {
      console.log("Document successfully written!");
      response.send({
        success: true,
        message: "Document successfully written!",
      });
    })
    .catch((err) => {
      console.error("Error writing document: ", err);
      response.send({ success: false, error: err.message });
    });
};

export const editData = async (id, data, response) => {
  console.log(id, data);
  await updateDoc(doc(db, cllctFirestore, id), {
    amount: data.amount,
    category: data.category,
    date: data.date,
    mutation: data.mutation,
    paymentmethod: data.paymentmethod,
    title: data.title,
  })
    .then(() => {
      console.log("Document successfully edited!");
      response.send({
        success: true,
        message: "Document successfully edited!",
      });
    })
    .catch((err) => {
      console.error("Error editing document: ", err);
      response.send({ success: false, error: err.message });
    });
};

export const deleteData = async (id, response) => {
  await deleteDoc(doc(db, cllctFirestore, id))
    .then(() => {
      console.log("Document successfully deleted!");
      response.send({
        success: true,
        message: "Document successfully deleted!",
      });
    })
    .catch((err) => {
      console.error("Error deleting document: ", err);
      response.send({ success: false, error: err.message });
    });
};
