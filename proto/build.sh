#!/bin/bash
BUILD_DIR=./proto/build
PROTO_DIR=./proto

mkdir -p ${BUILD_DIR}

# Generate JavaScript code
yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:$BUILD_DIR \
    --grpc_out=$BUILD_DIR \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I $PROTO_DIR \
    proto/*.proto

# Generate TypeScript code (d.ts)
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=$BUILD_DIR \
    -I $PROTO_DIR \
    proto/*.proto
    