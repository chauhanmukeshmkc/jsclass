let users = [
    {id: 1, name: 'John', address: 'Kathmandu', phone: '9841234567'},
    {id: 2, name: 'Ram', address: 'Pokhara', phone: '9841234567'},
    {id: 3, name: 'Sita', address: 'Dharan', phone: '9841234567'}
];
function $(id){
    return document.getElementById(id);
}
function showData(users) {
    let output = '';
    users.forEach((user, index) => {
        output += `<tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.address}</td>
            <td>${user.phone}</td>
            <td>
                <button class="btn btn-success" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>`;
    });
    $('show_record').innerHTML = output;
}
showData(users);
let increment = 4;
document.querySelector('#add_record').addEventListener('click',(e) => {
    e.preventDefault();
    let name = $('name').value;
    let address = $('address').value;
    let phone = $('phone').value;
    let criteria = $('criteria').value;
    if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    if(criteria == ''){
        let user = {id:increment,name,address,phone};
        users.push(user);
        increment++; 
    }else{
        let userId = parseInt(criteria);
        let user = getById(userId);  
        user.name = name;
        user.address = address;
        user.phone = phone;
    }
    showData(users);
    $('name').value = '';
    $('address').value = '';
    $('phone').value = '';
    $('add_record').innerHTML == 'Add';
});

function getById(id) {
    return users.find(user => user.id === id);
}
function editUser(id)
{
  let user = getById(id);
  $('name').value = user.name;
  $('address').value = user.address;
  $('phone').value = user.phone;
  $('criteria').value = user.id; 
  $('add_record').innerHTML = 'Update'; 
}
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    showData(users); 
}


// Select all checkboxes
$('#select_all').addEventListener('change', (e) => {
    let checkboxes = document.querySelectorAll('.user_checkbox');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
    });
});

// Delete selected users
$('#delete_selected').addEventListener('click', () => {
    let selectedIds = [];
    let checkboxes = document.querySelectorAll('.user_checkbox:checked');
    checkboxes.forEach((checkbox) => {
        selectedIds.push(parseInt(checkbox.getAttribute('data-id')));
    });

    // Remove users with the selected IDs
    users = users.filter(user => !selectedIds.includes(user.id));
    showData(users);
});