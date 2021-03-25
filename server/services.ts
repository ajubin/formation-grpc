import { status, ServerUnaryCall, sendUnaryData, ServiceError } from "grpc";
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
    console.log(object);
    if (isValidUser(userToClass(object))) {
      users.push(userToClass(object))
      callback(null, new Empty());
    } else {
      const error: ServiceError = {
        message: 'user is not valid',
        name: 'server.createUser',
        code: status.INVALID_ARGUMENT
      }
      callback(error, null);
    }
  }
}


const isValidUser = (user: User) => {
  if (user.getAge() < 10) {
    return false;
  }
  return true
}
