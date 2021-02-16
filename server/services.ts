import { ServerUnaryCall, sendUnaryData } from "grpc";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { IUsersServer } from "../proto/build/users_grpc_pb";
import { User, UserList } from "../proto/build/users_pb";
import { users, userToClass } from "./db";

export class UsersServer implements IUsersServer {

  getUsers(call: ServerUnaryCall<Empty>, callback: sendUnaryData<UserList>) {
    console.log(`getUsers: sending all users.`);
    const userList = new UserList()
    userList.setUserList(users);
    callback(null, userList);
  }

  createUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<Empty>
  ) {
    console.log(`createUser: creating new users.`);
    const object = call.request.toObject();
    users.push(userToClass(object))
    callback(null, new Empty());
  }
}

