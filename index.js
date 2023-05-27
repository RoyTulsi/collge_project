const express = require('express');
const mongoose = require('mongoose');
const expf=require("express-fileupload");
const cors = require('cors');
const Model = require('./EventSchema');
const Admin=require('./Admin');
const BookingRequest=require('./BookingRequest')
const Gallery = require('./Eventgallery');
const mongoString = "mongodb+srv://tulsi:12345@cluster0.y2jwvvd.mongodb.net/test";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(expf());
app.use(express.static('uploads'))
/*--------------------Event---------------------*/ 

//Add Event
app.post('/addEvent', async (req, res) => {
   
    var imgobj=req.files.img;

    imgobj.mv("./uploads/event_img/"+imgobj.name, async (err)=>{
        if(err){
            throw err;
        }else{
            var insobj={

                ename:req.body.ename,
                edate:req.body.edate,
                evenue:req.body.venue,
                discp:req.body.discp,
                img:imgobj.name
           
            }
      await Model.create(insobj);

      res.json({msg:"Submit"});


        }
    })


})

//get all Event
app.get('/getAllEvent', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})




//Update Event by Id
app.post('/updateEvent', async (req, res) => {
    try {
        const updateEvent= await Model.findById(req.body.id);
        res.json(updateEvent);
    }
    catch (error) {
        res.status(error)
    }
})
//Edit Event by Id

app.post('/updateEventById', async (req, res) => {
   
        var id = req.body.id;

if(req.files!=null){
    var imgobj=req.files.img;

    imgobj.mv("./uploads/event_img/"+imgobj.name, async (err)=>{
        if(err){
            throw err;
        }else{
            var insobj={

                ename:req.body.ename,
                edate:req.body.edate,
                evenue:req.body.venue,
                discp:req.body.discp,
                img:imgobj.name
           
            }
      await Model.findByIdAndUpdate(id,insobj);

      res.json({msg:"Submit"});


        }
    })

}
else{

    var insobj={

        ename:req.body.ename,
        edate:req.body.edate,
        evenue:req.body.venue,
        discp:req.body.discp,
        
   
    }
await Model.findByIdAndUpdate(id,insobj);

res.json({msg:"Submit"});

}
})

//Delete Event by Id
app.delete('/deleteEvent/:id', async (req, res) => {
    try {
        
        const deleteEvent = await Model.findByIdAndDelete( req.params.id);
        res.status(400).json('item deleted');
    }
    catch (error) {
        res.status(error);
    }
})

//get event by id
app.get('/getEventById/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/*---------------------------Gallery-------------------------*/

//Add  images to event gallary
app.post('/addImageGallery', async (req, res) => {
   
    var imageobj=req.files.image;

    imageobj.mv("./uploads/Gallery/"+imageobj.name, async (err)=>{
        
        if(err){
            throw err;
        }else{
            var insobj={
                image:imageobj.name
           
            }
      await Gallery.create(insobj);

      res.json({msg:"Submit"});


        }
    })


})

//get all images
app.get('/getAllImages', async (req, res) => {
    try {
        const data = await Gallery.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})

//delete images
app.delete('/deleteImage/:id', async (req, res) => {
    try {
        
        const deleteImage = await Gallery.findByIdAndDelete( req.params.id);
        res.status(400).json('item deleted');
    }
    catch (error) {
        res.status(error);
    }
})

/*-----------------------Admin--------------------------*/

//Register admin
app.post('/registerAdmin', async (req, res) => {
    const data = new Admin({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//login Admin

app.post('/loginAdmin', async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    try{
        const data = await Admin.find({email:email,password:password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message:"Email or password is not valid"})
    }
})

/*-------------------------Booking Request-----------------------------*/

// add Booking Request
app.post('/bookingRequest', async (req, res) => {
    const data = new BookingRequest({
        ename: req.body.ename,
        name: req.body.name,
        contact: req.body.contact,
        email:req.body.email,
        address: req.body.address,
        date: req.body.date,
        
        budget: req.body.budget,
        guest: req.body.guest,
        
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//get all booking Request
app.get('/getAllBookingRequest', async (req, res) => {
    try {
        const data = await BookingRequest.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})


//Delete Booking Request by Id
app.delete('/deleteBookingRequest/:id', async (req, res) => {
    try {
        
        const deleteBookingRequest = await BookingRequest.findByIdAndDelete( req.params.id);
        res.status(400).json('item deleted');
    }
    catch (error) {
        res.status(error);
    }
})

//Update Event Date by Id
app.post('/updateEventDate', async (req, res) => { 
 var id = req.body.id;

    
        var insobj={ 
            date:req.body.date, 
        }
  await BookingRequest.findByIdAndUpdate(id,insobj);

  res.json({msg:"Submit"});
    

})





app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
    
})