import { Strategy as LocalStrategy } from "passport-local"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Load User Models
import { Customer , Vendor, Shipper } from "./src/models/User.js"

export const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "username"}, async (username, password, done) => { 
            // // Match User
            // const results = await Promise.all([
            //     Customer.findOne({ username: username}).exec(),
            //     Vendor.findOne({ username: username}).exec(),
            //     Shipper.findOne({ username: username}).exec(),
            //     ])
            //     .then(results => {
            //         const user = results.find(result => result !== null)
            //         if (!user) {
            //             return done(null, false, { message: "That username is not registered" })
            //         }
            //     })
            //     .catch(err => console.log(err));
            
            //     // Match password
            //     bcrypt.compare(password, user.password, (err, isMatch) => {
            //         if (err) throw err;
            //         if (isMatch) {
            //             return done(null, user);
            //         } else {
            //             return done(null, false, { message: "Username or password is incorrect" })
            //         }
            //     })
            try {
                const results = await Promise.all([
                    Customer.findOne({ username }).exec(),
                    Vendor.findOne({ username }).exec(),
                    Shipper.findOne({ username }).exec(),
                ]);
                const user = results.find(result => result !== null);
            
                if (!user) {
                    return done(null, false, { message: 'That username is not registered' });
                }
            
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                    throw err;
                    }
            
                    if (isMatch) {
                    return done(null, user);
                    } else {
                    return done(null, false, { message: 'Username or password is incorrect' });
                    }
                });
                } catch (err) {
                console.log(err);
                }
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        Promise.all([
            Customer.findById(id).exec(),
            Vendor.findById(id).exec(),
            Shipper.findById(id).exec(),
          ])
            .then((results) => {
              const user = results.find((result) => result !== null);
              done(null, user);
            })
            .catch((err) => done(err));
    });
} 