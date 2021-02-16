import { UsersClient } from "../proto/build/users_grpc_pb";
import { credentials } from "grpc";

const port = 3000;

export const client = new UsersClient(
  `localhost:${port}`,
  credentials.createInsecure()
);

export const noop = () => {};
