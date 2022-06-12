document.querySelector("#login").addEventListener("submit",event=>{
    event.preventDefault();
    console.log(event.target)
    const userObj = {
        username:document.querySelector("#loginUser").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(userObj)
    fetch("/api/users/login",{
        method:"POST",
        // body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Success! User is logged in")
            location.href="/dashboard"
        } else {
            alert("Error - please try again")
        }
    })
})