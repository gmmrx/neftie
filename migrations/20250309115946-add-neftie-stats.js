"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("nefties", "hp_min", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "hp_max", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "atk_min", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "atk_max", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "def_min", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "def_max", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "speed_min", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("nefties", "speed_max", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Now update existing records with the stat data
    const neftieStats = [
      {
        name: "Bitebit",
        hp: [120, 144],
        atk: [70, 84],
        def: [50, 60],
        speed: [65, 78],
      },
      {
        name: "Dipking",
        hp: [105, 126],
        atk: [80, 96],
        def: [55, 66],
        speed: [65, 78],
      },
      {
        name: "Shiba Ignite",
        hp: [145, 174],
        atk: [50, 60],
        def: [60, 72],
        speed: [50, 60],
      },
      {
        name: "Dinobit",
        hp: [155, 186],
        atk: [45, 54],
        def: [70, 84],
        speed: [35, 42],
      },
      {
        name: "Zzoo",
        hp: [105, 126],
        atk: [75, 90],
        def: [50, 60],
        speed: [75, 90],
      },
      {
        name: "Block Choy",
        hp: [145, 174],
        atk: [55, 66],
        def: [65, 78],
        speed: [40, 48],
      },
      {
        name: "Unika",
        hp: [145, 174],
        atk: [40, 48],
        def: [70, 84],
        speed: [50, 60],
      },
      {
        name: "Axobubble",
        hp: [130, 156],
        atk: [60, 72],
        def: [65, 78],
        speed: [50, 60],
      },
      {
        name: "Number 9",
        hp: [125, 150],
        atk: [70, 84],
        def: [70, 84],
        speed: [40, 48],
      },
      {
        name: "Chocomint",
        hp: [120, 144],
        atk: [60, 72],
        def: [50, 60],
        speed: [75, 90],
      },
      {
        name: "Cybertooth",
        hp: [135, 162],
        atk: [60, 72],
        def: [70, 84],
        speed: [40, 48],
      },
      {
        name: "Wassie",
        hp: [115, 138],
        atk: [60, 72],
        def: [50, 60],
        speed: [80, 96],
      },
      {
        name: "Shibark",
        hp: [120, 144],
        atk: [60, 72],
        def: [70, 84],
        speed: [55, 66],
      },
      {
        name: "Raccoin",
        hp: [125, 150],
        atk: [65, 78],
        def: [60, 72],
        speed: [55, 66],
      },
      {
        name: "Unikirin",
        hp: [105, 126],
        atk: [65, 78],
        def: [65, 78],
        speed: [70, 84],
      },
      {
        name: "Keybab",
        hp: [130, 156],
        atk: [65, 78],
        def: [50, 60],
        speed: [60, 72],
      },
      {
        name: "Chocorex",
        hp: [115, 138],
        atk: [60, 72],
        def: [55, 66],
        speed: [75, 90],
      },
      {
        name: "Beeblock",
        hp: [145, 174],
        atk: [50, 60],
        def: [45, 54],
        speed: [65, 78],
      },
      {
        name: "Bloomtail",
        hp: [105, 126],
        atk: [65, 78],
        def: [70, 84],
        speed: [65, 78],
      },
      {
        name: "Walpuff",
        hp: [115, 138],
        atk: [65, 78],
        def: [80, 96],
        speed: [45, 54],
      },
      {
        name: "Ghouliath",
        hp: [130, 156],
        atk: [70, 84],
        def: [60, 73],
        speed: [45, 54],
      },
      {
        name: "Dinotusk",
        hp: [180, 192],
        atk: [35, 42],
        def: [75, 90],
        speed: [35, 42],
      },
      {
        name: "Tokoma",
        hp: [140, 168],
        atk: [55, 66],
        def: [55, 66],
        speed: [55, 66],
      },
      {
        name: "Whuskube",
        hp: [150, 180],
        atk: [45, 54],
        def: [75, 90],
        speed: [35, 42],
      },
      {
        name: "Dracurve",
        hp: [130, 156],
        atk: [65, 78],
        def: [65, 78],
        speed: [45, 54],
      },
      {
        name: "Hollowoo",
        hp: [130, 156],
        atk: [65, 78],
        def: [60, 72],
        speed: [50, 60],
      },
    ];

    for (const neftie of neftieStats) {
      await queryInterface.sequelize.query(
        `UPDATE nefties 
         SET hp_min = ${neftie.hp[0]}, 
             hp_max = ${neftie.hp[1]}, 
             atk_min = ${neftie.atk[0]}, 
             atk_max = ${neftie.atk[1]}, 
             def_min = ${neftie.def[0]}, 
             def_max = ${neftie.def[1]}, 
             speed_min = ${neftie.speed[0]}, 
             speed_max = ${neftie.speed[1]} 
         WHERE name = '${neftie.name}'`
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("nefties", "hp_min");
    await queryInterface.removeColumn("nefties", "hp_max");
    await queryInterface.removeColumn("nefties", "atk_min");
    await queryInterface.removeColumn("nefties", "atk_max");
    await queryInterface.removeColumn("nefties", "def_min");
    await queryInterface.removeColumn("nefties", "def_max");
    await queryInterface.removeColumn("nefties", "speed_min");
    await queryInterface.removeColumn("nefties", "speed_max");
  },
};
