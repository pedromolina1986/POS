let productList = [];
let checkout = [];
if (!localStorage.getItem("productList")) {
    productList = [
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
    localStorage.setItem("productList",JSON.stringify(productList));
} else {
    productList = JSON.parse(localStorage.getItem("productList"));
};

/*ADMIN SETTINGS PAGE SCRIPTS*/
let productForm = document.getElementById("productForm");
let productFormInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productsBrowse = document.getElementById("productsBrowse");
let productPriceForm = document.getElementById("productPriceForm");
let productSelect = document.getElementById("productSelect");
let productPriceUpdate = document.getElementById("productPriceUpdate");
let checkoutForm = document.getElementById("checkoutForm");

fillProductTable(productList);

if (window.location.pathname.indexOf("admin") > -1){
    productForm.addEventListener('submit', function (event) {

        // Prevent the default action of sending the form data to the server
        event.preventDefault();
    
        let newItem = {
            name: productNameInput.value,
            price: parseFloat(productPriceInput.value)
        }
        saveProduct(newItem);
        productFormInput.value = "";
        productPriceInput.value = "";        
    });
    
    productPriceForm.addEventListener('submit', function (event) {
    
        // Prevent the default action of sending the form data to the server
        event.preventDefault();
    
        if (productSelect.value > 0 ) {
            let updatedItem = {
                id: productSelect.value,            
                price: parseFloat(productPriceUpdate.value)
            }            
            let newPrice = document.getElementById("PRODUCTPRICE" + updatedItem.id);
            newPrice.value = parseFloat(updatedItem.price);
            saveProduct(updatedItem);
            productPriceUpdate.value = 0;            
        } else {
            alert("Please select a product!");
            productSelect.focus();
        };
    
        
    });
            
}

function fillSelect() {

    while (productSelect.lastElementChild) {
        productSelect.removeChild(productSelect.lastElementChild);
    }

    let newOption = document.createElement("option");
    newOption.value = 0;
    newOption.textContent = "";
    productSelect.appendChild(newOption);
    productList.map(product => {
        newOption = document.createElement("option");
        /*
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        */
        newOption.value = product.id;
        newOption.textContent = product.name + " - $" + product.price;
        productSelect.appendChild(newOption);
    })
};

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
    fillSelect();
}

//create a new item in browse
function createItemnBrowse(item) {
    let newItem = document.createElement("tr");
    newItem.id = "PRODUCT" + item.id;
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
    inputPrice.step = "0.01";
    inputPrice.value = parseFloat(item.price).toFixed(2);;
    inputPrice.id = "PRODUCTPRICE" + item.id;
    price.appendChild(inputPrice);

    let actions = document.createElement("td");
    actions.classList.add("productActionsItem");
    let btnSave = document.createElement("button");
    let btnDelete = document.createElement("button");
    btnSave.classList.add("saveButton");
    btnSave.innerText = "Save";
    btnSave.id = "saveButton" + item.id;
    btnSave.onclick = function (event) {
        event.preventDefault();
        saveProduct(item);
    };
    btnDelete.classList.add("deleteButton");
    btnDelete.innerText = "Delete";
    btnDelete.id = "deleteButton" + item.id;
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

    if (window.location.pathname.indexOf("admin") > -1){
        productsBrowse.appendChild(newItem);
    }    
}

function saveProduct(item) {

    //if item exists then update els insert a new item
    let productIndex = -1;
    if (item.id) {
        productIndex = productList.findIndex(f => f.id == item.id);
    };
    //UPDATE
    if (productIndex > -1) {        
        let newPrice = document.getElementById("PRODUCTPRICE" + item.id);
        productList[productIndex].name = item.name ? item.name : productList[productIndex].name;
        productList[productIndex].price = parseFloat(newPrice.value);
        
        //animation
        let button = document.getElementById("saveButton" + productList[productIndex].id);
        button.classList.add("saved");  // Add animation class
        button.textContent = "✔"; // Change button text        
        // Optionally remove animation after a few seconds
        setTimeout(() => {
            button.classList.remove("saved");
            button.textContent = "Save"; // Revert text back
        }, 2000);
    } /*NEW ITEM*/else {
        let newItem = {
            id: productList.length > 0 ? productList[productList.length - 1].id + 1 : 1,
            name: item.name,
            price: parseFloat(item.price)
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
    fillSelect();
    localStorage.setItem("productList",JSON.stringify(productList));

};

function deleteProduct(id) {
    let productIndex = productList.findIndex(f => f.id == id);
    if (productIndex > -1) {
        //remove from list
        productList.splice(productIndex, 1);
        //remove from DOM
        document.getElementById("PRODUCT" + id).remove();
    };
    fillSelect();
    localStorage.setItem("productList",JSON.stringify(productList));
}
/*END - ADMIN SETTINGS PAGE SCRIPTS*/

/*CHECKOUT*/
function keyboardPress(valuePressed) {
    let unitInput = document.getElementById("productUnit");
    unitInput.value = valuePressed;
};

if (window.location.pathname == "/index.html"){
    checkoutForm.addEventListener('submit', function (event) {
        
        // Prevent the default action of sending the form data to the server
        event.preventDefault();
        let productSelect = document.getElementById("productSelect");
        if (productSelect.value > 0) {
            let item = productList.find(f => f.id == productSelect.value);
            let unitInput = document.getElementById("productUnit");
            item.qty = parseInt(unitInput.value);
            unitInput.value=0;
            productSelect.value=0;
            checkout.push(item);
            
            //insert item on checkout area
            let checkoutArea = document.getElementById("checkoutArea");
            let newCheckout = document.createElement("div");
            let newCheckoutTitle = document.createElement("h2");
            newCheckoutTitle.textContent = item.name; 
            let newCheckoutPrice = document.createElement("span");
            newCheckoutPrice.textContent = myCurrency(item.price);
            let newCheckoutQty = document.createElement("span");
            newCheckoutQty.textContent = "x" + item.qty;
            let newCheckoutTotal = document.createElement("span");
            newCheckoutTotal.textContent = myCurrency(item.price * item.qty);
            newCheckout.appendChild(newCheckoutTitle);
            newCheckout.appendChild(newCheckoutPrice);
            newCheckout.appendChild(newCheckoutQty);
            newCheckout.appendChild(newCheckoutTotal);
            newCheckout.classList.add("checkoutItem");
            checkoutArea.appendChild(newCheckout);

            //update subtotal
            let payButton = document.getElementById("payButton");
            payButton.innerText = "Pay - $" + subTotal();


        } else {
            alert("Please select a product!")
        }        
    });
}

function subTotal() {
    let total = 0;
    checkout.map(item => {
        total += item.price * item.qty;
    });
    return parseFloat(total).toFixed(2);
}

function newTransction() {
    let checkoutArea = document.getElementById("checkoutArea");    
    while (receiptArea.lastElementChild) {
        receiptArea.removeChild(receiptArea.lastElementChild);
    }; 
    while (checkoutArea.lastElementChild) {
        checkoutArea.removeChild(checkoutArea.lastElementChild);
    };    
    checkout=[];

     //hiide all div from chechout leaving just the new transaction button    
     let payButton = document.getElementById("payButton");
     let keyboard = document.getElementById("keyboard");     
 
     checkoutForm.style.visibility = "visible";
     payButton.style.visibility = "visible";
     keyboard.style.visibility = "visible";
     checkoutArea.style.visibility = "visible";
}

function payCheckout() {
    if (subTotal() > 0){        
        printReceipt();
        alert("Thank you for your purchase! We hope to see you back soon!");
        checkout=[];
    };
};

function printReceipt() {
    //hiide all div from chechout leaving just the new transaction button    
    let payButton = document.getElementById("payButton");
    let keyboard = document.getElementById("keyboard");
    let checkoutArea = document.getElementById("checkoutArea");

    checkoutForm.style.visibility = "hidden";
    payButton.style.visibility = "hidden";
    keyboard.style.visibility = "hidden";
    checkoutArea.style.visibility = "hidden";
    
    let receiptArea = document.getElementById("receiptArea");
    
    /*
    <table>
        <tr>
            <td colspan="4">Date: April 4, 2025</td>
        </tr>
        <tr>
            <td colspan="4">Time: 8:49 PM</td>
        </tr>
        <tr>
            <th>Product</th>
            <th>$/Unit</th>
            <th>Unit(s)</th>
            <th>Price</th>
        </tr>
        <tr>
            <td>Milk</td>
            <td>1.75</td>
            <td>2</td>
            <td>3.50</td>
        </tr>
        <tr>
            <td colspan="4">Total Price: 3.50</td>
        </tr>
        <tr>
            <td colspan="4">Taxes (5%): 0.18</td>
        </tr>
        <tr>
            <td colspan="4">Total Price: 3.68</td>
        </tr>
    </table>
    */
    let table = document.createElement("table");
    
    let trDate = document.createElement("tr");    
    let tdDate = document.createElement("td");
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', optionsDate);
    tdDate.textContent = "Date: " + currentDate;
    tdDate.colSpan = 4;
    trDate.appendChild(tdDate);
    table.appendChild(trDate);

    let trTime = document.createElement("tr");
    let tdTime = document.createElement("td");
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const currentTime = new Intl.DateTimeFormat('en-US', options).format(now);    
    tdTime.textContent = "Date: " + currentTime;
    tdTime.colSpan = 4;
    trTime.appendChild(tdTime);
    table.appendChild(trTime);    

    let trProducts;
    let tdProductsName;
    let tdProductsPrice;
    let tdProductsUnits;
    let tdProductsTotal;

    trProducts = document.createElement("tr");
    tdProductsName = document.createElement("th");
    tdProductsPrice = document.createElement("th");
    tdProductsUnits = document.createElement("th");
    tdProductsTotal = document.createElement("th");

    tdProductsName.textContent = "Product";
    tdProductsPrice.textContent = "$/Unit";
    tdProductsUnits.textContent = "Unit(s)";
    tdProductsTotal.textContent = "Price";

    trProducts.appendChild(tdProductsName);
    trProducts.appendChild(tdProductsPrice);
    trProducts.appendChild(tdProductsUnits);
    trProducts.appendChild(tdProductsTotal);
    table.appendChild(trProducts);

    let subTotal = 0;
    checkout.map(product => {
        trProducts = document.createElement("tr");
        tdProductsName = document.createElement("td");
        tdProductsPrice = document.createElement("td");
        tdProductsUnits = document.createElement("td");
        tdProductsTotal = document.createElement("td");

        tdProductsName.textContent = product.name;
        tdProductsPrice.textContent = myCurrency(product.price);
        tdProductsUnits.textContent = parseInt(product.qty);
        tdProductsTotal.textContent = myCurrency(product.price*product.qty);

        subTotal += parseFloat(product.price*product.qty);

        trProducts.appendChild(tdProductsName);
        trProducts.appendChild(tdProductsPrice);
        trProducts.appendChild(tdProductsUnits);
        trProducts.appendChild(tdProductsTotal);

        table.appendChild(trProducts);
    })    

    let trSubtotal = document.createElement("tr");
    let tdSubtotal = document.createElement("td");
    tdSubtotal.textContent = "Total Price: " + myCurrency(subTotal);
    tdSubtotal.colSpan = 4;
    trSubtotal.appendChild(tdSubtotal);
    table.appendChild(trSubtotal);

    let trTaxes = document.createElement("tr");
    let tdTaxes = document.createElement("td");
    let taxes = parseFloat(subTotal*0.05).toFixed(2);
    tdTaxes.textContent = "Taxes: " + myCurrency(subTotal*0.05);
    tdTaxes.colSpan = 4;
    trTaxes.appendChild(tdTaxes);
    table.appendChild(trTaxes);

    let trTotal = document.createElement("tr");
    let tdTotal = document.createElement("td");
    tdTotal.textContent = "Amount Due: " + myCurrency(subTotal+taxes);
    tdTotal.colSpan = 4;
    trTotal.appendChild(tdTotal);
    table.appendChild(trTotal);

    receiptArea.appendChild(table);
}
/*END - CHECKOUT*/

/*HELPER*/
function myCurrency(value) {
    const formattedAmount = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
    return formattedAmount;
}