const createCourse = async (req, res) => {
  try {
    const { code, name, seats, semester, branch } = req.body;
    const course = await Course.create({
      code,
      name,
      seats,
      semester,
      branch,
      teacher_id: req.body.teacher_id,
      elective_group_id: req.body.elective_group_id
    });
    
    await AuditLog.create({
      user_id: req.user.id,
      action: 'CREATE_COURSE',
      target_type: 'Course',
      target_id: course.id,
      details: req.body
    });
    
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Course creation failed' });
  }
};
