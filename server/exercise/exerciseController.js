const exercise = require("./exerciseModel");

const addexercise = (req, res) => {
  var validationerror = []
  if (!req.body.exerciseName) 
    validationerror.push("exerciseName is required");
  if(!req.body.thumbnail)
    validationerror.push("thumbnail is required");
  if (!req.body.description) 
    validationerror.push("description is required");
  if (validationerror.length>0) {
    res.send({
      status:420,
      success:false,
      message: "validation error occur",
      error: validationerror,
    })
  } 

  else {
    exercise.findOne({exerciseName:req.body.exerciseName})
    .then(exerciseData=>{
      if(!exerciseData){
        let exerciseObj = new exercise()
        exerciseObj.exerciseName=req.body.exerciseName
        exerciseObj.thumbnail="exerciseimages/" + req.body.thumbnail
        exerciseObj.description=req.body.description
        exerciseObj.save()
        .then(
          res.send({

            status:200,
            success:true,
            message:"exercise added successfully",
            data:exerciseData
          })
        )
        .catch((err)=>{
          res.send({
            status:500,
            success:false,
            message:"Internal server error",
            error:err.message
          })
        })
      }else{
        res.send({
          status:400,
          success:false,
          message:"Record is already exist",
          data:exerciseData
        })
      }
    })
  }
}
const getallexercise = (req, res) => {
  exercise.find()
    .then((exerciseData) => {
      if (!exerciseData) {
        res.send({
          status: 404,
          success: false,
          message: "Data is not Found",
          data: exerciseData,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "Data Loaded",
          data: exerciseData,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 500,
        success: false,
        message: "Interval server error",
        error: err.message,
      });
    });
};

singleexercise = (req, res) => {
  var validationerror = [];
  if (!req.body._id) {
    validationerror.push("_id is required");
  }
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "validationerror",
      error: validationerror,
    });
  } else {
    exercise
      .findOne({ _id: req.body._id })
      .then((exercise) => {
        res.send({
          status: 200,
          sccess: true,
          message: "Single exercise is Found",
          data: exercise,
        });
      })
      .catch((err) => {
        res.send({
          staus: 500,
          success: false,
          message: "Interval server error",
          error: err.message,
        });
      });
  }
};
updateexercise = (req, res) => {
  var validationerror = [];
  if (!req.body._id) validationerror.push("_id is required");
  if (validationerror.length) {
    res.send({
      status: 420,
      success: false,
      message: "validation error",
      error: validationerror,
    });
  } else {
    exercise
      .findOne({ _id: req.body._id })
      .then((exerciseData) => {
        if (!exerciseData) {
          res.send({
            status: 404,
            success: false,
            message: "Data not Found",
          });
        } else {
          if (req.body.exerciseName)
            exerciseData.exerciseName = req.body.exerciseName;
          if (req.body.description)
            exerciseData.description = req.body.description;
          exerciseData
            .save()
            .then((exerciseData) => {
              res.send({
                status: 200,
                success: true,
                message: "Record is update!!",
                data: exerciseData,
              });
            })
            .catch((err) => {
              res.send({
                status: 500,
                success: false,
                message: "Internal Server error",
                error: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error",
          error: err.message,
        });
      });
  }
};
deleteexercise = (req, res) => {
  var validationerror = [];
  if (!req.body._id) validationerror.push("_id is required");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Validation error occur",
      error: validationerror,
    });
  } else {
    exercise
      .deleteOne({ _id: req.body._id })
      .then((exerciseData) => {
        res.send({
          status: 200,
          success: true,
          message: "Deleted Sucessfully !!",
          data: exerciseData,
        });
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error",
          error: err.message,
        });
      });
  }
};

module.exports = {
  addexercise,
  getallexercise,
  singleexercise,
  updateexercise,
  deleteexercise,
};
