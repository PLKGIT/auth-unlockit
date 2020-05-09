exports.allAccess = (req, res) => {
  res.status(200).send("App Landing Page");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Student Content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content");
};

exports.teacherBoard = (req, res) => {
  res.status(200).send("Teacher Content");
};