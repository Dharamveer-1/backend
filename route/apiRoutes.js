const router = require("express").Router();
const exerciseController = require("../server/exercise/exerciseController");
const categoryController = require("../server/category/categoryController");
const packageController = require("../server/package/packageController");
const customerController=require("../server/customer/customerController");
const bookingController=require("../server/booking/bookingController");

const multer=require("multer");

const packagestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/packageimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var newname=file.fieldname + '-' + uniqueSuffix+ file.originalname
      req.body['thumbnail']=newname
      cb(null, newname)
    }
  })
  const packageupload = multer({ storage: packagestorage})

  const exercisestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/exerciseimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now + '-' + Math.round(Math.random() * 1E9)
      var newname=file.fieldname + '-' + uniqueSuffix+ file.originalname
      req.body['thumbnail']=newname
      cb(null, newname)
    }
  })
  
  const exerciseupload = multer({ storage: exercisestorage})

  const categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/categoryimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now + '-' + Math.round(Math.random() * 1E9)
      var newname=file.fieldname + '-' + uniqueSuffix+ file.originalname
      req.body['thumbnail']=newname
      cb(null, newname)
    }
  })
  
  const categoryupload = multer({ storage: categorystorage})

  

router.post("/exercise/add", exerciseupload.single('thumbnail'),exerciseController.addexercise);
router.post("/exercise/getall", exerciseController.getallexercise);
router.post("/exercise/getsingle", exerciseController.singleexercise);
router.post("/exercise/update", exerciseController.updateexercise);
router.post("/exercise/delete", exerciseController.deleteexercise);

router.post("/category/add", categoryupload.single('thumbnail'),categoryController.addCategory);
router.post("/catgory/getall", categoryController.getallCategory);
router.post("/category/getsingle", categoryController.singleCategory);
router.post("/category/update", categoryController.updateCategory);
router.post("/category/delete", categoryController.deleteCategory);

router.post("/package/add", packageupload.single('thumbnail'),packageController.addpackage);
router.post("/package/getall", packageController.getallpackage);
router.post("/package/getsingle", packageController.singlepackage);
router.post("/package/update", packageController.updatepackage);
router.post("/package/delete", packageController.deletepackage);

router.post("/booking/add", bookingController.addbooking);
router.post("/booking/getall", bookingController.getallbooking);
router.post("/booking/getsingle", bookingController.singlebooking);
// router.post("/booking/update", bookingController.updatebooking);
router.post("/booking/delete", bookingController.deletebooking);

router.post("/customer/register",customerController.register);
router.post("/customer/login",customerController.login);
router.post("/customer/getall",customerController.getall);

module.exports = router;
