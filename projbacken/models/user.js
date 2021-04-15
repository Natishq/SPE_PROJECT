const crypto = require('crypto');
const moongoose = require("mongoose");
const uuidv1 = require('uuid/v1');

const schema = new moongoose.Schema;

var userSchema = schema(

    {
        name :  {
                    type:String,
                    require:true,
                    maxlength:32,
                    trim:true

                },

        lastname :  {
                        type : String,
                        require : true,
                        maxlength:32,
                        trim : true

                    },

        userinfo : {
                        type:String,
                        trim:true
                    },

        email : {
                    type : String,
                    required :true,
                    unique:true
                },

        encry_password : {
                        type:String,
                        require:true
                         },

        salt : String,
        
        role : {
            type:Number,
            default : 0
        },

        purchases : {
            type:Array,
            default:[]
        }
    },
    { timestamps:true }
);

// this is the method to the schema that we definig to set cypted password using the plain text password we are getting 
userSchema.method = {
    securePassword : function(plainstring)
                    {
                        if(!plainstring) return "";
                        
                        try{
                            
                            return crypto.createHmac("sha256",this.salt).update(plainstring).digest('hex');

                        }
                        catch(err)
                        {
                            return "";
                        }
                    },
    authenticate : function(plainstring)
                    {
                        return this.securePassword(plainstring) === this.encry_password ;
                     }
};


userSchema.virtual('password')
    .set(
        function(password)
            {
                this._password = password;
                this.salt = uuidv1();
                this.encry_password = this.securePassword(password);
            }
        )
    .get(
        function()
        {
            return this._password;
        }
    )

// now we are going to use virtuals for cumputing stuff on the fly ! Note they are not stored in mongodb and they are not part 
// of json object by default  

module.exports = mongoose.model("user",userSchema);
