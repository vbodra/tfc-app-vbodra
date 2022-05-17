import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  id!: number;

  homeTeam!: number;

  homeTeamGoals!: number;

  awayTeam!: number;

  awayTeamGoals!: number;

  inProgress!: boolean;
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
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'teamAway' });

export default Matches;
