function deleteItem(event){
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if (xhr.status === 200){
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }
    }
    xhr.open('DELETE', `/STWDelete/${event.target.value}`);
    xhr.send();
}

setTimeout(function getItems() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() { //callback function that will be called later
        const items = JSON.parse(xhr.response);
        const itemContainer = document.getElementById('itemDisplay');
        const available = document.getElementById('available');
        const capacity = document.getElementById('capacity')
        let count = 0;
        if (xhr.status === 200){
            //unpack data
            for(item of items){
                count++
                if (count === 15){
                    const disableButton = document.getElementById('subButton')
                    disableButton.remove()
                    capacity.innerText = 'MAX CAPACITY REACHED PLEASE DELETE ITEMS'
                }
            }
            for(item of items){
                const div = document.createElement('div');
                div.innerText = `\nItem Name: ${item.itemName}\n SKU: ${item.SKU}\n`
                div.className = 'col'
                const form = document.createElement('form');
                form.id = item.itemName;
                const Deletebutton = document.createElement('button')
                Deletebutton.value = item.itemName;
                Deletebutton.innerText = 'Delete'
                Deletebutton.onclick = deleteItem;
                div.append(Deletebutton);
                const Updatebutton = document.createElement('button')
                Updatebutton.innerText = 'Edit'
                Updatebutton.value = item.itemName;
                Updatebutton.onclick = fields;
                div.append(Updatebutton);
                itemContainer.append(div);
                div.append(form);
            }
        }else{
            //handles error
            available.innerText = `${items.error}`;
        }
    }
    xhr.open('GET', '/STWRead');
    xhr.send();
}, 800)

function fields(e) {
    const formContainer = document.getElementById(e.target.value);
    const input1 = document.createElement('input');
    input1.id = 'input1'
    input1.placeholder = 'Item Name';
    input1.maxLength = 20;
    input1.required = true;
    const input2 = document.createElement('input');
    input2.id = 'input2'
    input2.placeholder = 'SKU'
    input2.maxLength = 15;
    input2.required = true;
    const submitButton = document.createElement('button')
    submitButton.innerText = 'submit'
    submitButton.value = e.target.value;
    formContainer.append(input1);
    formContainer.append(input2);
    formContainer.append(submitButton);
    submitButton.onclick = updateItem;
}

function updateItem(e) {
    const xhr = new XMLHttpRequest();
    const input1 = document.getElementById('input1')
    const input2 = document.getElementById('input2')
    const oriName = e.target.value;
    const newName = input1.value;
    const newSku = input2.value;
    const param = [oriName, newName, newSku]
    
    xhr.open('PUT', `/STWUpdate/${param}`);
    xhr.send();
}

addEventListener('DOMContentLoaded', () => {
    getItems();
})