
const save_changes=document.getElementById("save_changes");
const details=document.querySelectorAll(".detail_info p");


function toggleEditMode(event, fieldId) {
  event.preventDefault();
  var detailInfo = document.getElementById(fieldId);
  var editButton = detailInfo.nextElementSibling.querySelector("a");
  console.log(editButton);
  
  if (detailInfo.contentEditable === "true") {
    var newValue = detailInfo.innerText;
    console.log("New value:", newValue);

    detailInfo.contentEditable = "false";
    editButton.innerText = "Edit";
  } else {
    detailInfo.contentEditable = "true";
    detailInfo.focus();
    editButton.innerText = "Save";
  }
}
function show() {
  document.querySelector(".hamburger").classList.toggle("open");
  document.querySelector(".navigation").classList.toggle("active");
}
const accept=document.querySelectorAll("#accept");
accept.forEach((ele) => {

  ele.addEventListener("click",async(event)=>{
    const email=event.target.parentNode.classList[1];
    
  const detail={
    type:"accept", 
    email:email
  }
  const result=await fetch("/trust/volunt_req",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(detail)
  })
  
  if(result.ok){
    window.location.href="/trust/account";
  }else{
    console.log("error: ");
  }
})})





const decline=document.querySelectorAll("#reject");
decline.forEach((ele) => {

  ele.addEventListener("click",async(event)=>{
    const email=event.target.parentNode.classList[1];
    
  const detail={
    type:"decline", 
    email:email
  }
  const result=await fetch("/trust/volunt_req",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(detail)
  })
  
  if(result.ok){
    window.location.href="/trust/account";
  }else{
    console.log("error: ");
  }
})})


save_changes.addEventListener("click", async()=>{
  const updatedDetails = [];
  details.forEach(detail => {
    updatedDetails.push(detail.textContent.trim());
  });
  const detail ={
    name:updatedDetails[0],
    trust_unique_no:updatedDetails[1],
    phonenumber:updatedDetails[2], 
    state:updatedDetails[3],
    email:updatedDetails[4],
    address:updatedDetails[5],
    contri_received:updatedDetails[6],
    Date_Joined:updatedDetails[7],
  
  


  }
  console.log(detail);
  
  const result=await fetch("/trust/account",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(detail)
  })
  
  if(result.ok){
    window.location.href="/trust/account";
  }else{
    console.log("error: ");
  }
});
