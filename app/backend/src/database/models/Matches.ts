import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  id!: number;
  home_team!: number;
  home_team_goals!: number;
  away_team!: number;
  away_team_goals!: number;
  in_progress!: number;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    },
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
  },
  away_team: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    },
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
  },
  in_progress: {
    type: DataTypes.INTEGER,
  }
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
