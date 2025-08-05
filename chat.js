// const mongoose = require("mongoose");
// const chatschema = new mongoose .Schema({
//     from:{
//         type:String,
//         required:true
//     },
//     to:{
// type:String,

//     },
//     msg:{
//         type:String,
//         maxlength:50
//     },
//     created_at:{
//         type:Date,
//         required :true
//     },

// }) ;

// const chat = mongoose.model("chat",chatschema);
// module.exports = chat;


const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String
    },
    msg: {
        type: String,
        maxlength: 50
    },
    created_at: {
        type: Date,
        default: Date.now   // Auto-generate date if not provided
    }
});

// Create and export the Chat model
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
