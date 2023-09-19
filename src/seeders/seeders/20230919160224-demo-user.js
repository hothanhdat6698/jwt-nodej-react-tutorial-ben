"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "John Doe",
                    password: "123",
                    username: "fake 1",
                },
                {
                    email: "John Doe 2",
                    password: "123",
                    username: "fake 2",
                },
                {
                    email: "John Doe 3",
                    password: "123",
                    username: "fake 3",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
