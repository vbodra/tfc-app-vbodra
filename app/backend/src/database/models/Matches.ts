import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  id!: number;

  homeTeam!: number;

  homeTeamGoals!: number;

  awayTeam!: number;

  awayTeamGoals!: number;

  inProgress!: number;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'awayTeam' });

export default Matches;
