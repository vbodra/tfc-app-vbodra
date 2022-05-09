import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  team_name!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
