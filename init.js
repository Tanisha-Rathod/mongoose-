const mongoose = require("mongoose");
const Chat = require("./models/chat"); // Correct import for model

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

  async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsaap");
  }

  let allChats=[{
from:"tarun",
to:"ganesh",
msg:"hello!",
created_at :new Date()

  },
  {
  from:"tanvii",
to:"ganu",
msg:"helloguyssss!",
created_at :new Date()

  },

  {
    from:"timmi",
to:"rakesh",
msg:"heyyy everyone",
created_at :new Date()
  },
  {
  from:"vinayak",
to:"heera",
msg:"i like it",
created_at :new Date()

  }
]

Chat.insertMany(allChats);

