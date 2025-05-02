const Category = require("./categoryModel");

const addCategory = (req, res) => {
  var validationerror = [];
  if (!req.body.categoryName) validationerror.push("categoryName is required");
  if(!req.body.thumbnail)
    validationerror.push("thumbnail is required");
  if (!req.body.description) validationerror.push("description is required");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "validation error occur",
      error: validationerror,
    });
  } else {
    Category.findOne({ categoryName: req.body.categoryName })
    .then((categoryData) => {
        if (!categoryData) {
          let categoryObj = new Category();
          categoryObj.categoryName = req.body.categoryName;
          categoryObj.thumbnail="categoryimages/" + req.body.thumbnail
          categoryObj.description = req.body.description;
          categoryObj.save()
            .then(data=>{
              res.send({
                success: true,
                message: "category added successfully",
                data: data,
              })
            })
            .catch((err) => {
              res.send({
                status: false,
                message: "Internal server error",
                error: err.message,
              });
            });
        } else {
          res.send({
            status: 400,
            success: false,
            message: "Record is already exist",
            data: categoryData,
          });
        }
      }
    );
  }
};

const getallCategory = (req, res) => {
  Category.find()
    .then((categoryData) => {
      if (!categoryData) {
        res.send({
          status: 404,
          success: false,
          message: "Data is not Found",
          data: categoryData,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "Data Loaded",
          data: categoryData,
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

const singleCategory = (req, res) => {
  var validationerror = [];
  if (!req.body._id) validationerror.push("_id is required");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "validationerror",
      error: validationerror,
    });
  } else {
    Category.findOne({ _id: req.body._id })
      .then((category) => {
        res.send({
          status: 200,
          sccess: true,
          message: "Single category is Found",
          data: category,
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

const updateCategory = (req, res) => {
  var validationerror = [];
  if (!req.body._id) 
    validationerror.push("_id is required");
  if (validationerror.length>0) {
    res.send({
      status: 420,
      success: false,
      message: "validation error",
      error: validationerror,
    });
  } else {
    Category.findOne({ _id: req.body._id })
      .then((categoryData) => {
        if (!categoryData) {
          res.send({
            status: 404,
            success: false,
            message: "Data not Found",
          });
        } else {
          if (req.body.categoryName)
            categoryData.categoryName = req.body.categoryName;
          if (req.body.description)
            categoryData.description = req.body.description;
          categoryData
            .save()
            .then((categoryData) => {
              res.send({
                status: 200,
                success: true,
                message: "Record is update!!",
                data: categoryData,
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

const deleteCategory = (req, res) => {
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
    Category.deleteOne({ _id: req.body._id })
      .then((categoryData) => {
        if(!categoryData){
          res.send({
            status: 420,
            success: false,
            message: "data not found",
            data: categoryData,
          });
        }
        else{
          res.send({
            status: 200,
            success: true,
            message: "Deleted Sucessfully !!",
            data: categoryData,
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

module.exports = {
  addCategory,
  getallCategory,
  singleCategory,
  updateCategory,
  deleteCategory,
};
