const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(

{
    firstName:{
        type: String,
        required: true,
    },

    lastName: {
        type:String,
        required: true,
    },

    email: {
        type:String,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true,
    },

    profileImagePath: {
        type:String,
        required:true,
        default: "",

    },

    phoneNumber: {
        type:String,
        required:true,
        default:"",
    },

    role: {
        type:String,
        required:true,
        enum:[ 'Offering Sublet', 'Looking for Sublet'],
    },

    addListing: [mongoose.Schema.Types.Mixed],
    removeListing: [mongoose.Schema.Types.Mixed],
    interestedRenters: [mongoose.Schema.Types.Mixed],
    subletsAvailable: [mongoose.Schema.Types.Mixed],
    messages: [mongoose.Schema.Types.Mixed],
    upcomingAppointments: [mongoose.Schema.Types.Mixed]
},



    { timestamps: true}
 
);

UserSchema.methods.addRoleSpecificFields = function (){
    if(this.role === 'Offering Sublet') {
        this.addListing = [];
        this.removeListing = [];
        this.interestedRenters = [];

    } else if (this.role === 'Looking for Sublet'){
        this.subletsAvailable = [];
    }
};

const User = mongoose.model("User", UserSchema)
module.exports = User