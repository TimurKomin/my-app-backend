const resolvers = require("../resolvers");
const Sequelize = require("sequelize");
const { ApolloError } = require("apollo-server-express");
const sequelize = require("../models/index").sequelize;
const Task = require("../models/task")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
  );

beforeAll(async () => {
    await Task.sequelize.query(`DELETE FROM tasks`)
  })

const task = {
    done:true,
    title: "123123",
};
const invalidTask = {
    done:false,
    title:"qweeqw",
    uuid:"dfqdwqw"
}

describe("check remove Task", () => {
    test(`remove Task`, async () => {
    const uuid = await resolvers.Mutation.addTask(null, task, null);
    console.log("added",uuid)
    const res = await resolvers.Mutation.removeTask(null, uuid, null);
    console.log("remove",res);
    expect(uuid).toEqual(res);
    });
    test(`remove Task validation`, async () => {
    const res = await resolvers.Mutation.removeTask(null, invalidTask, null);
    console.log("ErrorRemove", res);
    expect(new ApolloError("q")).toEqual(res);
    });
});
