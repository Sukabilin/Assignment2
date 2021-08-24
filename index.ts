// First name, Middle name, Last name, email, phone number, role, address
// data = [
// 	{ id: "1", fname: "Aniket", mname: "Pratap", 	lname: "Suresh", 	email: "anikelsuresh@gmail.com",  pno: "8582803048", role: "Full Stack Engineer", 	address: "38697 Dortha Village" },
// 	{ id: "2", fname: "Rajesh", mname: "Deepak", 	lname: "Grewal", 	email: "rajeshgrewal@gmail.com",  pno: "5855544316", role: "Trainee", 				address: "38846 Jerrell Unions" },
// 	{ id: "3", fname: "Rani", 	mname: "Ayush", 	lname: "Bedi", 		email: "ranibedi@gmail.com", 	  pno: "3797197883", role: "Network Engineer", 		address: "435 Prosacco Station" },
//  { id: "4", fname: "Amit", 	mname: "Siddharth", lname: "Kothari", 	email: "amitkothari@gmail.com",   pno: "5233239902", role: "Accountant", 			address: "620 Peyton Vista" },
//  { id: "5", fname: "Apurva", mname: "Vihaan", 	lname: "Chauhan", 	email: "apurvachauhan@gmail.com", pno: "5954109588", role: "HR", 					address: "120 Erdman Islands" }
// ];
class User {
	constructor(
		public id: number,
		public fname: string,
		public mname: string,
		public lname: string,
		public email: string,
		public pno: string,
		public role: Role,
		public address: string
	) {}
}

enum Role {
	SuperAdmin = "SuperAdmin",
	Admin = "Admin",
	Subscriber = "Subscriber"
}

class UserState {
	users: User[];
	constructor(data: User[]) {
		this.users = data;
	}

	update() {

	}

	delete() {
		
	}

}

let oXHR = new XMLHttpRequest();
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", "./data.json", true);
oXHR.send();
let data: User[];
function reportStatus(this: any) {
	if (oXHR.readyState == 4) {
		data = JSON.parse(this.responseText);
	}
}

let editRowElement: string[];

const fillTable = () => {
	for (let i = 0; i < data.length; i++) {
		const user = data[i]
		const id = user.id;
		document.getElementById("tableBody")!.innerHTML += `<tr id="row${id}">
            <td><div class="row${id}">${user.fname}</div></td>
            <td><div class="row${id}">${user.mname}</div></td>
            <td><div class="row${id}">${user.lname}</div></td>
            <td><div class="row${id}">${user.email}</div></td>
            <td><div class="row${id}">${user.pno}</div></td>
            <td><div class="row${id}">${user.role}</div></td>
            <td><div class="row${id}">${user.address}</div></td>
            <td><button id="editRow${id}" type="button" onclick="editRow(${id})" class="btn btn-success">Edit</button></td>
            <td><button id="deleteRow${id}" type="button" onclick="deleteData(${id})" class="btn btn-danger delete${id}">Delete</button></td>
        </tr>`;
	}
};

const editRow = (rowID: number | string) => {
	const row = document.getElementsByClassName(
		"row" + rowID
	) as unknown as HTMLElement[];
	editRowElement = [];
	for (let i = 0; i < row.length; i++) {
		row[i].contentEditable = "true";
		editRowElement.push(row[i].innerHTML);
	}

	const editButton = document.getElementById("editRow" + rowID);
	if (editButton) {
		editButton.innerHTML = "Save";
		editButton.setAttribute("onclick", "saveRow(" + rowID + ")");
	}

	const deleteButton = document.getElementById("deleteRow" + rowID);
	if (deleteButton) {
		deleteButton.innerHTML = "Cancel";
		deleteButton.setAttribute("onclick", "cancelRowEdit(" + rowID + ")");
	}
};

const cancelRowEdit = (id: number | string) => {
	let row = document.getElementsByClassName(
		"row" + id
	) as unknown as HTMLElement[];
	for (let i = 0; i < 7; i++) {
		row[i].innerHTML = editRowElement[i];
		row[i].contentEditable = "false";
	}

	const editButton = document.getElementById("editRow" + id);
	if (editButton) {
		editButton.innerHTML = "Edit";
		editButton.setAttribute("onclick", "editRow(" + id + ")");
	}

	const deleteButton = document.getElementById("deleteRow" + id);
	if (deleteButton) {
		deleteButton.innerHTML = "Delete";
		deleteButton.setAttribute("onclick", "deleteData(" + id + ")");
	}
};

const saveRow = (id: number | string) => {
	const row = document.getElementsByClassName(
		"row" + id
	) as unknown as HTMLElement[];
	for (let i = 0; i < row.length; i++) {
		row[i].contentEditable = "false";
	}

	const editButton = document.getElementById("editRow" + id);
	if (editButton) {
		editButton.innerHTML = "Edit";
		editButton.setAttribute("onclick", "editRow(" + id + ")");
	}

	const deleteButton = document.getElementById("deleteRow" + id);
	if (deleteButton) {
		deleteButton.innerHTML = "Delete";
		deleteButton.setAttribute("onclick", "deleteData(" + id + ")");
	}
};

const deleteData = (id: number | string) => {
	const rowID = document.getElementById("row" + id);
	if (rowID) rowID.remove();
};

const loadData = () => {
	fillTable();
	const loadData = document.getElementById("loadData")!;

	loadData.innerHTML = "Refresh Data";
	loadData.id = "refreshData";
	document
		.getElementById("refreshData")!
		.setAttribute("onclick", "refreshData()");
};

const refreshData = () => {
	document.getElementById("tableBody")!.innerHTML = "";
	fillTable();
};
