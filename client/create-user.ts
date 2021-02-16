import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { User } from "../proto/build/users_pb";
import { client } from "./utils";

export default function createNewUser(user: User) {
  return new Promise<Empty>((resolve, reject) => {
    client.createUser(user, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}
