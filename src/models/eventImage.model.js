const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db');
const Event = require('./event.model');


const EventImage = sequelize.define(
  'EventImages',
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    caption: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'EventImages',
    timestamps: false
  }
);

// Association
Event.hasMany(EventImage, { as: 'images', foreignKey: 'event_id', onDelete: 'CASCADE' });
EventImage.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = EventImage;