const { ApolloError } = require("apollo-server-express");
const resolvers = require("../../resolvers");
const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const Task = require("../../models/task")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
);

beforeAll(async () => {
    await Task.sequelize.query(`DELETE FROM tasks`);
});


describe("check get Task", () => {
    test(`get Task`, async () => {
        const tasksList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        const task = { title: `12` };
        const newGenerate = tasksList.map((item) => (item = task));
        const newTitleGenerate = newGenerate.map((item) => {
        return { ...item, title: Math.random() };
        });
        const queryGenerate = newTitleGenerate.map((item) => `('${item.title}')`);
        await Task.sequelize.query(
        `INSERT INTO tasks (title) VALUES ${queryGenerate}`
        );

        const getArrayTasks = await resolvers.Query.tasks(null,{filterBy:"" , allPerPage:40 , page:0, order: 'ASC' }, null
        );
        expect(newTitleGenerate.length).toEqual(
        getArrayTasks.task.length
        );
    });
});
