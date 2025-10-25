// import "dotenv/config";
const port = process.env.PORT||4000;
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");
const { ref } = require("process");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(
 "mongodb+srv://irfan_DB:Pratapgarh_100@irfancluster.ak2xgdr.mongodb.net/e-commerce"
).then(data=>console.log("mongodb connected successfully")).catch(err=>console.log("mongodb connection failed"));

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running, do you get that");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating upload Endpoints for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  const backendBaseUrl = "https://back-end-1gp5.onrender.com" ;

  res.json({
    success: 1,
    image_url: `${backendBaseUrl}/images/${req.file.filename}`,
  });
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      // console.log(token);
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};
//schema for promoCode
const Promocode=mongoose.model('Promocode',{
   promocode:{
    type:String,
    required:true,
    unique:true
   },
   offamount:{
    type:Number,
    required:true
   },
   date: {
    type: Number,
    default: Date.now,
  },

})


// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
  popular: {
    type: Boolean,
    default: false
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});
// schema creating for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likedItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false
    }
  ]

});
//schema for orders
const Order=mongoose.model("Order",{
  email:{
    type:String,
    required:true,
  },
  contactNumber:{
    type:Number,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  totalAmount:{
    type:Number,
    required:true
  },
  orderProduct: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  }
]
,
  enrolledUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:false,
  }
})
app.post('/addpromocode',async(req,res)=>{
   const {promocode,offamount}=req.body;
   try {
   const promoCode=new Promocode({
      promocode,offamount
   })
   await promoCode.save();
   res.json({success:true,message:"promocodeAdded"}); 
   } catch (error) {
    console.log("promocode addition error");
   res.json({success:false,message:"promocodeAdditionFailed"}); 

   }
   

})

app.post("/getOffamountByPromocode",async(req,res)=>{
  const promo=await Promocode.findOne({promocode:req.body.promoValue});
  res.json(promo);
})
app.post('/uploadOrder',fetchUser,async(req,res)=>{
  // const productID=new mongoose.Types.ObjectId(req.body.productID);
  const {orderProduct,email,phoneNumber,address,totalAmount}=req.body;
  const userID=new mongoose.Types.ObjectId(req.user.id);
  const order=new Order({
      email,
      address,
      totalAmount,
      contactNumber:phoneNumber,
      orderProduct,     
      enrolledUser:userID
  });
  console.log(order);
  await order.save();
   let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  await Users.findOneAndUpdate({_id:req.user.id},{
    cartData:cart
  })
  res.json({success:true});
  
  
})
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
 
  await product.save();
  console.log("Saved");

  res.json({
    success: true,
    name: req.body.name,
  });
});
app.post('/addpopuler',async(req,res)=>{
   const item=await Product.findOneAndUpdate({ _id: req.body.id },{
     popular:true  
   });
   console.log("updated",item.id);
    res.json({success:true});   
})
app.post('/removepopuler',async(req,res)=>{
   const item=await Product.findOneAndUpdate({ _id: req.body.id },{
     popular:false  
   });
   console.log("updated",item.id);
    res.json({success:true});   
})
// Creating API For deleting Products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API For getting all Products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Reserved");

  res.send(products);
});



// creating endpoint for registring the users
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    const data = {
    user: {
      id:check.id,
    },
  };
  console.log(check.id);
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
  }
  else{
   let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id:user.id,
    },
  };
  console.log(user.id);
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
  }
  
});


// Creating endpoint for newcollection data
app.get("/newcollectioned", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
});

//Endpoint for popular section
app.get("/popularinmen", async (req, res) => {
  let products = await Product.find({ popular: true });
  
  console.log("Popular in men Fetched");
  res.send(products);
});


// Creating endpoint for adding product in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);

  // console.log(req.body,req.user);

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});
app.post('/likedItem',fetchUser,async(req,res)=>{
   await Users.findOneAndUpdate({_id:req.user.id},{
    $addToSet:{likedItem:req.body.productID}},
    {new:true});
    res.json({success:true});
    
})
app.post('/removeLikedItem',fetchUser,async(req,res)=>{
  console.log(req.body.productID);
  const productID=new mongoose.Types.ObjectId(req.body.productID);
  console.log(productID);
   await Users.findOneAndUpdate( {_id:req.user.id}, { $pull: { likedItem:productID } }, { new: true } ); 
    res.json({success:true});   
    
});
app.post("/isLikedItem",fetchUser,async (req,res)=>{
  const isLikedItem=await Users.findOne({_id:req.user.id,likedItem:req.body.likedItemID})
  if(isLikedItem){
    console.log("islikedItem",isLikedItem);
  res.json({success:true,isLikedItem});
  }
  else{
    console.log("islikedItem",isLikedItem);
  res.json({success:false,isLikedItem});
  }
}) 
app.get('/getLikedItem',fetchUser,async(req,res)=>{
  const likeditems=await Users.findOne({_id:req.user.id}).populate('likedItem');
  res.json({success:true,likedItems:likeditems.likedItem});
})

// creating endpint to remove cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

// creating endpoint to get cart
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port,async(error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
const orders = await Order.find({})
  .populate('enrolledUser') // populate user
  .populate('orderProduct.productId');
  console.log(orders);
  } else {
    console.log("Error : " + error);
  }
});
