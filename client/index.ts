import { User, UserStatus } from "../proto/build/users_pb";
import createUser from "./create-user";
import allUsers from "./all-users";

async function run() {
  const oldUsers = await allUsers();
  console.log(`\nListing all ${oldUsers.getUserList().length} users`);

  const jim = new User();
  jim.setName("Jim");
  jim.setAge(10);
  jim.setId(20);
  jim.setStatus(UserStatus.OFFLINE);
  createUser(jim);

  console.log(`\nCreated user ${jim.toString()}`);

  const users = await allUsers();
  console.log(`\nListing all ${users.getUserList().length} users`);
  for (const user of users.getUserList()) {
    console.log(user.toString());
  }
}

run();
