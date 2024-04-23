const route=require("express").Router();
const trust_data_insert=require("./trust_data");
const database_model=require("../../Models/Trust_Schema");
route.get("/",(req,res)=>{
    res.render("trust_login");

})
route.use('/data',trust_data_insert);



route.get("/account",async (req,res)=>{
    const details = await database_model.findOne({ _id: req.cookies.id });
    const newuser = {
        name: details.name,
        state:details.state,
        email:details.email,
        phonenumber: details.phonenumber,
        trust_unique_no:details.trust_unique_no,
        password:details.password,
        address: details.address,
        contri_received:details.contri_received,
        Date_Joined:details.Date_Joined
    };
    res.render("trust_account", { trust: newuser });

})
route.post("/account",async(req, res)=>{
    const user = await database_model.findOne({ _id: req.cookies.id });
    console.log(req.body);
    const changes_data = {
        name: req.body.name,
        state:req.body.state,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        trust_unique_no:req.body.trust_unique_no,
        password:user.password,
        address: req.body.address,
        contri_received:req.body.contri_received,
        Date_Joined:req.body.Date_Joined
    };

    res.clearCookie('id');
    await database_model.deleteOne({ _id: user._id });
    const resl= await database_model.create(changes_data);
    res.cookie("id", resl._id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(200).redirect("/");
  
  })
  

module.exports=route;
