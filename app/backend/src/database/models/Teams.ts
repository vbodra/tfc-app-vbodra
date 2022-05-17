import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;

  teamName!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
});

export default Teams;
