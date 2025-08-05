// const express = require("express");
// const app = express();

// const port = 8080;
// const path = require("path");
// const chat =require ("/.models/chat.js");
// const mongoose = require("mongoose");


// main().then((res)=>{
//     console.log("connection successful");
    
// })
// .catch(err => console.log(err));

// let chat1 = new chat({
//     from: "tanisha",
//     to:"rajveer",
//     msg:"i love it ",
//     created_at: new Date()
// });
// chat1.save().then((res)=>{
//     console.log("res");
    
// })


// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


// app.set("views",path.join(__dirname,"views"));
// app.set("view engine ", "ejs");

// app.get("/",(req,res)=>{
//     console.log("working");
//     res.send("its working");

    
// });


// app.listen(port,()=>{
//     console.log("app is listening");
    
// });

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat"); // Correct import for model
const { log } = require("console");
const  methodOverride = require("method-override")

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public"))); // ✅ CORRECT
app.use(express.urlencoded({extended:true}));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsaap");
}

app.get  ("/chats", async(req,res)=>{
    let chats =  await Chat.find();
    console.log("working");
    res.render("index.ejs",{chats});
})


main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));


//


// Create a new chat document
// let chat1 = new Chat({
//   from: "tanisha",
//   to: "rajveer",
//   msg: "I love it",
//   created_at: new Date(),
// });

// chat1.save().then((res) => {
//   console.log("Chat saved:", res);
// }).catch((err)=>{
//     console.log(err);
// });

// EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  console.log("working");
  res.send("Server is working!");
});

//new route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});
//create route
app.post("/chats",(req,res)=>{
let {from,to, msg} = req.body;


let newChat = new Chat({
  from:from,
  to:to,
  msg:msg,
  created_at: new Date()
});
newChat.save().then((res)=>{
  console.log(res);
  
}).catch((err)=>{
  console.log(err);
  
})
res.redirect("/chats");

});

//edit route
app.get("/chats/:id/edit", async(req,res)=>{
  let{id} = req.params;
   let chat =  await Chat.findById(id);
  res.render("edit.ejs",{chat});
});

//update routenodemon in
// app.put("/chats/:id",(req,res)=>{
//   let {id} = req.params;
//   let{newMsg} = req.body;
//   let updatedChat = chat.findByIdAndUpdate{
//     id,
//     {msg:newMsg,
//       runValidators: true,new:true

//     };
//   console.log(updatedChat);
  
// });
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body; // must match textarea name

  try {
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: msg },
      { runValidators: true, new: true }
    );

    console.log("Updated Chat:", updatedChat);
    res.redirect("/chats"); // redirect to all chats after update
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating chat");
  }
});

//destroy route

app.delete("/chats/:id", async(req,res)=>{
let {id} = req.params;
 let delchat = Chat.findByIdAndDelete(id);
console.log(delchat);
res.redirect("/chats");

})
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
