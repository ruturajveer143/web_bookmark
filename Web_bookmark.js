function handleFormSubmit(event){
    event.preventDefault();
    const web_data={
        web_title : event.target.web_title.value,
        web_url:event.target.web_url.value
    };

    axios.post("https://crudcrud.com/api/81e4075c2307483cbd3a7c06f55fee1f/bookmark",web_data)
    .then(res=>displayOnScreen(res.data))
    .catch(err=>console.log(err))

    document.getElementById("web_title").value = "";
    document.getElementById("web_url").value = "";
    

}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/81e4075c2307483cbd3a7c06f55fee1f/bookmark")
    .then(res=>{
        for (let i = 0; i < res.data.length; i++) {
            displayOnScreen(res.data[i])
            //console.log(res.data[i])
        }
    })
    .catch(err=>console.log(err))
})

function displayOnScreen(displayData){

const li = document.createElement('li');
li.appendChild(document.createTextNode(`${displayData.web_title} > `))

const a = document.createElement('a');
a.href = `${displayData.web_url}`;
a.textContent = `${displayData.web_url} `;

li.appendChild(a);

const delBtn = document.createElement('button');
delBtn.appendChild(document.createTextNode("Delete"));
li.appendChild(delBtn);

const editBtn = document.createElement('button');
editBtn.appendChild(document.createTextNode("Edit"));
li.appendChild(editBtn);

const List = document.querySelector("ul");
    List.appendChild(li);

delBtn.addEventListener("click",function(){
    List.removeChild(li);
    deleteData(displayData._id);

})

editBtn.addEventListener("click",function(){
    List.removeChild(li);
    deleteData(displayData._id);

    document.getElementById("web_title").value = displayData.web_title;
    document.getElementById("web_url").value = displayData.web_url;    

})



}

function deleteData(id){
    axios.delete(`https://crudcrud.com/api/81e4075c2307483cbd3a7c06f55fee1f/bookmark/${id}`);
    

}