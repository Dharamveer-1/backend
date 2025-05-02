const booking = require("./bookingModel");

const addbooking = (req, res) => {
  var validationerror = [];
  if (!req.body.userId) validationerror.push("userId is required");

  if (!req.body.cardno) validationerror.push("cardno is required");
  if (!req.body.cvp) validationerror.push("cvp is required");
  if (!req.body.expiredate) validationerror.push("expiredate is required");
  if (!req.body.dateofBooking)
    validationerror.push("dateofBooking is required");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "validation error occur",
      error: validationerror,
    });
  } else {
    booking.findOne({ cardno: req.body.cardno })
    .then((bookingData) => {
        if (!bookingData) {
          let bookingObj = new booking();
          bookingObj.userId = req.body.userId;

          bookingObj.cardno = req.body.cardno;
          bookingObj.cvp = req.body.cvp;
          bookingObj.expiredate = req.body.expiredate;
          bookingObj.dateofBooking = req.body.dateofBooking;
          bookingObj
            .save()
            .then((data) => {
              res.send({
                success: true,
                message: "booking added successfully",
                data: data,
              });
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
            data: bookingData,
          });
        }
      }
    );
  }
};

const getallbooking = (req, res) => {
  booking.find()
    .then((bookingData) => {
      if (!bookingData) {
        res.send({
          status: 404,
          success: false,
          message: "Data is not Found",
          data: bookingData,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "Data Loaded",
          data: bookingData,
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

  singlebooking=(req,res)=>{
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
    booking.findOne({_id:req.body._id})
    .then((booking)=>{
      res.send({
        status:200,
        sccess:true,
        message:"Single booking is Found",
        data:booking
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

//  updatebooking=(req,res)=>{
//    var validationerror = []
//    if (!req.body._id)
//      validationerror.push("_id is required")
//    if(validationerror.length){
//      res.send({
//        status:420,
//        success:false,
//        message:"validation error",
//        error:validationerror
//      })
//    }
//    else{
//      booking.findOne({_id: req.body._id})
//      .then(bookingData=>{
//        if(!bookingData){
//          res.send({
//            status:404,
//            success:false,
//            message:"Data not Found"
//          })
//        }else{
//         //  if(req.body.userId)
//         //    bookingData.userId=req.body.userId
//          if(req.body.cardno)
//            bookingData.cardno=req.body.cardno
//          bookingData.save()
//          .then((bookingData)=>{
//            res.send({
//              status:200,
//              success:true,
//              message:"Record is update!!",
//              data:bookingData
//            })
//          })
//          .catch(err=>{
//            res.send({
//              status:500,
//              success:false,
//              message:"Internal Server error",
//              error:err.message
//            })
//          })
//        }
//      })
//      .catch(err=>{
//        res.send({
//          status:500,
//          success:false,
//          message:"Internal server error",
//          error:err.message
//        })
//      })
//    }
//  }

 deletebooking=(req,res)=>{
   var validationerror=[]
   if(!req.body._id)
     validationerror.push("_id is required")
   if(validationerror.length>0){
     res.send({
       status:420,
       success:false,
       message:"Validation error occur",
       error:validationerror
     })
   }
   else{
     booking.deleteOne({_id:req.body._id})
     .then(bookingData=>{
       res.send({
         status:200,
         success:true,
         message:"Deleted Sucessfully !!",
         data:bookingData
       })
     })
     .catch((err)=>{
       res.send({
         status:500,
         success:false,
         message:"Internal server error",
         error:err.message
       })
     }
   )
   }
 }

module.exports = {
  addbooking,
  getallbooking,
  singlebooking,
  // updatebooking,
  deletebooking,
};
