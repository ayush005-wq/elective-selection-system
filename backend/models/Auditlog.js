module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AuditLog', {
    action: DataTypes.STRING(50),
    target_type: DataTypes.STRING(50),
    target_id: DataTypes.INTEGER,
    details: DataTypes.JSONB
  });
};
