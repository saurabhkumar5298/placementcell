const Student = require('../models/studentSchema');
const Company = require('../models/companySchema');

// to render company page
module.exports.companyPage = async function (req, res) {
  try {
    const students = await Student.find({});
    return res.render('company', { students });
  } catch (error) {
    console.log(`Error in rendering page: ${error}`);
    return res.redirect('back');
  }
};

// to allocate interview
module.exports.allocateInterview = async function (req, res) {
  try {
    const students = await Student.find({});

    let array = [];

    for (let student of students) {
      array.push(student.batch);
    }
    // filter out duplicate batches
    array = [...new Set(array)];

    return res.render('allocateInterview', { students, array });
  } catch (error) {
    console.log(`Error in allocating interview: ${error}`);
    return res.redirect('back');
  }
};

// to schedule an interview
module.exports.scheduleInterview = async function (req, res) {
  const { id, company, date } = req.body;
  try {
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: id,
      date,
      result: 'Pending',
    };
    // if company doesn't exist
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      for (let student of existingCompany.students) {
        // if student id already exists
        if (student.student._id === id) {
          return res.redirect('back');
        }
      }
      existingCompany.students.push(obj);
      existingCompany.save();
    }

    const student = await Student.findById(id);

    if (student) {
      const interview = {
        company,
        date,
        result: 'Pending',
      };
      student.interviews.push(interview);
      student.save();
    }
    return res.redirect('/company/home');
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};

// update status of interview
module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          student.save();
          break;
        }
      }
    }
    const company = await Company.findOne({ name: companyName });

    if (company) {
      for (let std of company.students) {
        /// compare student id and id passed in params
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.save();
        }
      }
    }
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
};
