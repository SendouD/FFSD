const express = require("express");
const nodemailer = require("nodemailer");
let volunteer = express.Router();
const volunteerdata = require('../Models/volunteer_schema');
const trustInfo = require("../Models/TrustInfo_schema");
const user_volunteer = require("../Models/user_volunteer");

const mail = require('./email_backend');
volunteer.route('/').get(async (req, res) => {
    const trusts = await trustInfo.find({}, { name: 1, _id: 0 });
    res.render("volunteer", { trust_name: null, trusts: trusts,trustid:null });
}).post(async (req, res) => {
    try {
        const newvolunteerdata = new volunteerdata({
            Trust_name: req.body.Trust_name,
            full_name: req.body.full_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            message: req.body.message

        });

        const savedFormData = await newvolunteerdata.save();
        mail.volunteer(req.body.email);


        res.redirect("/confirmation");
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Internal Server Error');
    }
});


volunteer.route('/:id/volunteer')
    .get(async (req, res) => {
        let trustId = req.params.id;
        let trust;
        await trustInfo.find({ trust_unique_no: trustId }).then((data) => trust = data);
        res.render("volunteer", { trust_name: trust[0].name ,trustid:trustId});
    })
    .post(async (req, res) => {
        try {
            
            const new_vol = {
                trust_id: req.params.id,
                trust_name: req.body.Trust_name,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                no_of_hours:"25",
                user_id: req.cookies.id
            }
            const newvolunteerdata = new volunteerdata({
                Trust_name: req.body.Trust_name,
                full_name: req.body.full_name,
                email: req.body.email,
                phone_number: req.body.phone_number,      
                
                address: req.body.address,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                message: req.body.message

            });

            const savedFormData = await newvolunteerdata.save();
            await user_volunteer.create(new_vol);
            mail.volunteer(req.body.email);


            res.redirect("/confirmation");
        } catch (error) {
            console.error('Error saving form data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
async function formatDate(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);

    // Get the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    // Construct and return the formatted date string (YYYY-MM-DD)
    return `${year}-${month}-${day}`;
}

module.exports = volunteer;
