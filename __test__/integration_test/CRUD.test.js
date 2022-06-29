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

    describe("check integer Task", () => {
    test(`integerTest`, async () => {
        const tasksList = [1, 2, 3, 4, 5, 6];
        const newTitleGenerate = tasksList.map((item) => `('${Math.random()}')`)
        const newData = await Task.sequelize.query(
        `INSERT INTO tasks (title) VALUES ${newTitleGenerate} returning tasks`
        );
        const getArrayTasks = await resolvers.Query.tasks(null,{filterBy:"" , allPerPage:40 , page:0, order: 'ASC' }, null
        );
        const changingTask = await resolvers.Mutation.changeTask(
        null,
        { done: false, title: "lel", uuid: getArrayTasks.task[2].uuid },
        null
        );

        expect("lel").toEqual(changingTask.title);
        const resRemove = await resolvers.Mutation.removeTask(
        null,
        getArrayTasks.task[3],
        null
        );
        const getArrayTasksAfterRemove = await resolvers.Query.tasks(null,{filterBy:"" , allPerPage:40 , page:0, order: 'ASC' }, null
        );
        expect(newTitleGenerate.length - 1).toEqual(
        getArrayTasksAfterRemove.task.length
        );
    });
});
