const allocateSeats = async (electiveGroupId) => {
  const transaction = await sequelize.transaction();
  
  try {
    const preferences = await Preference.findAll({
      where: { elective_group_id: electiveGroupId },
      order: [['created_at', 'ASC']],
      transaction
    });

    for (const preference of preferences) {
      for (const courseId of preference.course_order) {
        const course = await Course.findByPk(courseId, {
          lock: true,
          transaction
        });

        if (course.seats_filled < course.seats) {
          await Enrollment.create({
            student_id: preference.student_id,
            course_id: courseId,
            enrollment_type: 'enrolled'
          }, { transaction });

          course.seats_filled += 1;
          await course.save({ transaction });
          break;
        } else {
          await Enrollment.create({
            student_id: preference.student_id,
            course_id: courseId,
            enrollment_type: 'waitlist'
          }, { transaction });
        }
      }
    }
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
