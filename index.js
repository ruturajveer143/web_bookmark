function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/68221d7b309d43019fd3c680e231eccb/appoinmnetData",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/68221d7b309d43019fd3c680e231eccb/appoinmnetData")
    .then(res=>{
        for(let i=0;i<res.data.length;i++){
            displayUserOnScreen(res.data[i]);
        }
    })
    .catch(error=>{
        console.log(error)
    })
  })
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(document.createTextNode(` ${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`));
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener('click', function () {
        userList.removeChild(userItem); // Remove the entire list item
        deleteUserData(userDetails._id); // Call a function to delete the user data
    });

    editBtn.addEventListener('click', function () {
        userList.removeChild(userItem); // Remove the entire list item
        deleteUserData(userDetails._id); // Call a function to delete the user data
        document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;


    });

  
    function deleteUserData(userId) {
        axios.delete(`https://crudcrud.com/api/68221d7b309d43019fd3c680e231eccb/appoinmnetData/${userId}`)
            .then((response) => {
                console.log('User data deleted:', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

   
  }
  
  // Do not touch code below
 // module.exports = handleFormSubmit;