module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    code: { type: DataTypes.STRING(20), unique: true },
    name: DataTypes.STRING(200),
    seats: DataTypes.INTEGER,
    seats_filled: { type: DataTypes.INTEGER, defaultValue: 0 },
    schedule: DataTypes.JSONB,
    syllabus: DataTypes.ARRAY(DataTypes.TEXT)
  });

  Course.associate = models => {
    Course.belongsTo(models.ElectiveGroup);
    Course.belongsTo(models.User, { as: 'Teacher' });
  };

  return Course;
};
