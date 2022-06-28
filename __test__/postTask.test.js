const { ApolloError } = require("apollo-server-express")
const resolvers = require("../resolvers")
const Sequelize = require("sequelize");
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
  title: "123123"
}



describe("check Post Task", () => {
  test(`Post Task`, async () => {
    const res = await resolvers.Mutation.addTask(null, task, null)
  // console.log(res)
  expect(task.title).toEqual(res.title);
  expect(false).toEqual(res.done);
  })
  test(`Post Task validation`, async () => {
    const res = await resolvers.Mutation.addTask(null, task, null)
    // console.log(res);
    expect(new ApolloError('Validation error')).toEqual(res)
  })
}


)