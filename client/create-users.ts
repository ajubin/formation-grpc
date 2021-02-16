import { User } from "../proto/build/users_pb";
import { client, noop } from "./utils";

export default function createNewUsers(users: User[]) {
  const stream = client.createUser(noop);
  for (const user of users) {
    stream.write(user);
  }
  stream.end();
}
