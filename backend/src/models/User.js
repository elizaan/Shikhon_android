const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        sparse: true
    },
    userType: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    mobileno: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },

    userDetails: {
        type: [{
            code: {
                type: String,
                unique: true,
                sparse: true
                    // required: true

            },
            education: {
                type: String,
                // required: true
            },
            institute: {
                type: String,
                // required: true
            },
            department: {
                type: String,
                // required: true
            },
            hscPassyear: {
                type: Number,
                // required: true
            },
            subject1: {
                type: String,
                // required: true
            },
            subject2: {
                type: String,
                // required: true

            },
            subject3: {
                type: String,
                // required: true
            },
            cv: {
                type: String
            }
        }],
        required: false
    }
    // code: {
    //     type: String,
    //     unique: true,
    //     required: true
    // },
    // education: {
    //     type: String,
    //     // required: true,
    // },
    // passyear: {
    //     type: Number,
    //     // required: true
    // },
    // registration: {
    //     type: Number,
    //     // unique: true,
    //     // required: true
    // }
})

userSchema.pre('save', function(next) {
    // Hash the password before saving the user model
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();

        })

    })


})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(err);
            }

            resolve(true);
        })
    })

}

// userSchema.methods.compareCode = function(candidateCode) {
//     console.log("dhukse?")
//     const user = this;


//     // return new Promise((resolve, reject) => {
//     //     console.log("dhukse?")
//         try {
//             if (!candidateCode.localeCompare(user.userDetails.code)) {


//                 // return reject(err);
//             }
//             resolve(true);
//         } catch (err) { return reject(err); }




//     // })
// }

// userSchema.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({
//             _id: user._id
//         }, process.env.JWT_KEY)
//         // user.tokens = user.tokens.concat({
//         //     token
//         // })
//         //await user.save()
//     return token
// }

// userSchema.statics.findByCredentials = async(email, password) => {
//     // Search for a user by email and password.
//     const user = await User.findOne({
//         email
//     })
//     if (!user) {
//         throw new Error('Invalid login credentials')
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password)
//     if (!isPasswordMatch) {
//         throw new Error('Invalid login credentials')
//     }
//     return user
// }

// const User = mongoose.model('User', userSchema)

// module.exports = User

mongoose.model('User', userSchema);