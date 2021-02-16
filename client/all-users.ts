import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { UserList } from "../proto/build/users_pb";
import { client } from "./utils";

export default function allUsers() {
  return new Promise<UserList>((resolve, reject) => {
    client.getUsers(new Empty(), (err, users) => {
      if (err) reject(err);
      else resolve(users);
    });
  });
}
