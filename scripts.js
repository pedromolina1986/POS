let productList = [
    {
        id: 1,
        name: "Milk",
        price: 1.75    
    },
    {
        id: 2,
        name: "Rice",
        price: 2.60    
    }
];

/*ADMIN SETTINGS PAGE SCRIPTS*/
let productForm = document.getElementById("productForm");
let productFormInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productsBrowse = document.getElementById("productsBrowse");

fillProductTable(productList);

productForm.addEventListener('submit', function (event) {

    // Prevent the default action of sending the form data to the server
    event.preventDefault();    

    let newItem = {
        name: productNameInput.value,
        price: productPriceInput.value
    }
    saveProduct(newItem);
    productFormInput.value = "";  
    productPriceInput.value = 0;    
});

function fillProductTable(items) {
/*
HTML EXAMPLE
<tr class="productItem">
    <td class="productIdItem">1</td>
    <td class="productNameItem">Milk</th>
    <td class="productPriceItem">
        <input id="productPriceItem1" type="number" size="20" minlength="1" pattern="^\$?\d+(\.\d{1,2})?$" value=1.75>
    </td>
    <td class="productActionsItem">
        <button class="saveButton" onclick="saveProduct()">Save</button>
        <button class="deleteButton">Delete</button>
    </td>
</tr>           
*/ 

//read all items from items parameters and create rows
    items.map(item => {
        createItemnBrowse(item);
    });
}

//create a new item in browse
function createItemnBrowse(item) {
    let newItem = document.createElement("tr");
    newItem.id="PRODUCT"+item.id;
    newItem.classList.add("productItem");
    
    let id = document.createElement("td");
    id.classList.add("productIdItem");    
    id.innerText = item.id;

    let name = document.createElement("td");
    name.classList.add("productNameItem");
    name.innerText = item.name;
    
    let price = document.createElement("td");
    price.classList.add("productPriceItem");
    let inputPrice = document.createElement("input");    
    inputPrice.type = "number";
    inputPrice.size = 10;
    inputPrice.step= "0.01";    
    inputPrice.value = item.price;
    inputPrice.id = "PRODUCTPRICE"+item.id;
    price.appendChild(inputPrice);
    
    let actions = document.createElement("td");    
    actions.classList.add("productActionsItem");
    let btnSave = document.createElement("button");
    let btnDelete = document.createElement("button");
    btnSave.classList.add("saveButton");
    btnSave.innerText = "Save";
    btnSave.id = "saveButton"+item.id;
    btnSave.onclick = function (event) {
        event.preventDefault();    
        saveProduct(item);
    };
    btnDelete.classList.add("deleteButton");
    btnDelete.innerText = "Delete";
    btnDelete.id = "deleteButton"+item.id;
    btnDelete.onclick = function (event) {
        event.preventDefault();    
        deleteProduct(item.id)
    };
    actions.appendChild(btnSave);
    actions.appendChild(btnDelete);

    newItem.appendChild(id);
    newItem.appendChild(name);
    newItem.appendChild(price);
    newItem.appendChild(actions);

    productsBrowse.appendChild(newItem);
}

function saveProduct(item){
    
    //if item exists then update els insert a new item
    let productIndex = -1;    
    if (item.id){
        productIndex = productList.findIndex(f => f.id == item.id);
    };    
    if (productIndex > -1) {        
        let newPrice = document.getElementById("PRODUCTPRICE"+item.id);        
        productList[productIndex].name = item.id;
        productList[productIndex].price = parseFloat(newPrice.value);        
        let button = document.getElementById("saveButton"+productList[productIndex].id);
        button.classList.add("saved");  // Add animation class
        button.textContent = "✔"; // Change button text        
        // Optionally remove animation after a few seconds
        setTimeout(() => {
            button.classList.remove("saved");
            button.textContent = "Save"; // Revert text back
        }, 2000);
    } else {        
        let newItem = {
            id: productList.length > 0 ? productList[productList.length-1].id+1 : 1,
            name: item.name,
            price: item.price
        }
        productList.push(newItem);
        createItemnBrowse(newItem);  
        let button = document.getElementById("submitButton");
        button.classList.add("saved");  // Add animation class
        button.textContent = "✔"; // Change button text        
        // Optionally remove animation after a few seconds
        setTimeout(() => {
            button.classList.remove("saved");
            button.textContent = "Add"; // Revert text back
        }, 2000);      
    };                
    
};

function deleteProduct(id){        
    let productIndex = productList.findIndex(f => f.id == id);
    if (productIndex > -1){
        //remove from list
        productList.splice(productIndex,1);
        //remove from DOM
        document.getElementById("PRODUCT"+id).remove();        
    };
    
}
/*ADMIN SETTINGS PAGE SCRIPTS*/
