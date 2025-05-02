const Package = require("./packageModel");

const addpackage = (req, res) => {
  var validationerror = []
  if (!req.body.packageName) 
    validationerror.push("packageName is required");
  if(!req.body.thumbnail)
    validationerror.push("thumbnail is required");
  if (!req.body.description) 
    validationerror.push("description is required");
  if (!req.body.cost) 
    validationerror.push("cost is required");
  if (!req.body.duration) 
    validationerror.push("duration is required");
  if (validationerror.length>0) {
    res.send({
      status:420,
      success:false,
      message: "validation error occur",
      error: validationerror,
    })
  } 

  else {
    Package.findOne({packageName:req.body.packageName})
    .then(packageData=>{
      if(!packageData){
        let packageObj = new Package()
        packageObj.packageName=req.body.packageName
        packageObj.thumbnail= "packageimages/" + req.body.thumbnail
        packageObj.description=req.body.description
        packageObj.cost=req.body.cost
        packageObj.duration=req.body.duration
        packageObj.save()
        .then((packageData=>{
          res.send({
            status:200,
            success:true,
            message:"package added successfully",
            data:packageData
          })
        })
       
        )
     
      }else{
        res.send({
          status:400,
          success:false,
          message:"Record is already exist",
          
        })
      }
    })
    .catch((err)=>{
      res.send({
        status:500,
        success:false,
        message:"Internal server error",
        error:err.message
      })
    })
  }
}

const getallpackage = (req, res) => {
  Package.find()
    .then((packageData) => {
      if (!packageData) {
        res.send({
          status: 404,
          success: false,
          message: "Data is not Found",
          data: packageData,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "Data Loaded",
          data: packageData,
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

  singlepackage=(req,res)=>{
   var validationerror=[]
   if(!req.body._id){
    validationerror.push("_id is required")
   }
   if(validationerror.length>0){
    res.send({
      status:420,
      success:false,
      message:"validationerror",
      error:validationerror,
    })
   }
   else{
    Package.findOne({_id:req.body._id})
    .then((package)=>{
      res.send({
        status:200,
        sccess:true,
        message:"Single package is Found",
        data:package
      })
    })
    .catch((err)=>{
      res.send({
        staus:500,
        success:false,
        message:"Interval server error",
        error:err.message
      })
    })
 
   }
 }

 updatepackage=(req,res)=>{
   var validationerror = []
   if (!req.body._id)
     validationerror.push("_id is required")
   if(validationerror.length){
     res.send({
       status:420,
       success:false,
       message:"validation error",
       error:validationerror
     })
   }
   else{
     Package.findOne({_id: req.body._id})
     .then(packageData=>{
       if(!packageData){
         res.send({
           status:404,
           success:false,
           message:"Data not Found"
         })
       }else{
         if(req.body.packageName)
           packageData.packageName=req.body.packageName
         if(req.body.description)
           packageData.description=req.body.description
         packageData.save()
         .then((packageData)=>{
           res.send({
             status:200,
             success:true,
             message:"Record is update!!",
             data:packageData
           })
         })
         .catch(err=>{
           res.send({
             status:500,
             success:false,
             message:"Internal Server error",
             error:err.message
           })
         })
       }
     })
     .catch(err=>{
       res.send({
         status:500,
         success:false,
         message:"Internal server error",
         error:err.message
       })
     })
   }
 }

const deletepackage = (req, res) => {
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
    Package.deleteOne({ _id: req.body._id })
      .then((packageData) => {
        if(!packageData){
          res.send({
            status: 420,
            success: false,
            message: "data not found",
            data: packageData,
          });
        }
        else{
          res.send({
            status: 200,
            success: true,
            message: "Deleted Sucessfully !!",
            data: packageData,
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

module.exports = { addpackage,getallpackage,singlepackage,updatepackage,deletepackage };