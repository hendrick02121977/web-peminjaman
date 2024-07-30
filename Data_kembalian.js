// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYrOZobxfJLeu6wczZ5BLqaF1FfuXbgwY",
    authDomain: "pinjam-barang-7e8f5.firebaseapp.com",
    databaseURL: "https://pinjam-barang-7e8f5-default-rtdb.firebaseio.com",
    projectId: "pinjam-barang-7e8f5",
    storageBucket: "pinjam-barang-7e8f5.appspot.com",
    messagingSenderId: "1088129867576",
    appId: "1:1088129867576:web:3015304b52a10418ac2bcd"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let namaV = document.getElementById("nama");
let nohpV = document.getElementById("nohp");
let kelasV = document.getElementById("kelas");
let jamV = document.getElementById("jam");
let tanggalV = document.getElementById("tanggal");
let barangV = document.getElementById("barang");
let tbody = document.getElementById("tbody");
let editnama = document.getElementById("editnama");
let editnohp = document.getElementById("editnohp");
let idV = document.getElementById("id");
//Create Data

function createData() {
  let data = {
    nama: namaV.value,
    nohp: nohpV.value,
	kelas: kelasV.value,
	jam: jamV.value,
	tanggal: tanggalV.value,
	barang: barangV.value
  };
  database.ref("Data_Pengembalian").push(data);
  namaV.value = "";
  nohpV.value = "";
  kelasV.value = "";
  jamV.value = "";
  tanggalV.value = "";
  barangV.value = "";
}

// Read Data
database.ref("Data_Pengembalian").on("value", ambildata);
function ambildata(snapshoot) {
  let table = "";
  let no = 1;
  snapshoot.forEach((data) => {
	console.log(id);
    console.log(data.val());
	
	let barangall = "" ;
	let count = 0;
	for (let i = 0; i < data.val().barang.length; i++) {
     barangall += data.val().barang[i];
	if(data.val().barang[i] == ',')
	{
		count++;
		barangall += '   ';
	}
	if(count == 5)
	{
		barangall += '<br>'
		count = 0;
	}
    }
	console.log(barangall);
    table += `
          <tr>   
            <td scope="row">${no}</th>
            <td>${data.val().nama}</td>
            <td>${data.val().nim}</td>
			      <td>${data.val().kelas}</td>
			      <td>${data.val().jam}</td>
			      <td>${data.val().tanggal}</td>
			      <td class="text-uppercase">${barangall}</td>
            <td>
            <button type="button" class="btn-edit" onclick="editRow('${data.key}')"> Edit </button>
            <button type="button" class="btn-hapus" onclick="deleteRow('${data.key}') "> Hapus </button>
            </td>
          </tr>
    
    `;
    no++;
  });

  tbody.innerHTML = table;
}

//show data edit
function editRow(id) {
  database.ref("Data_Pengembalian/" + id).on("value", function (snapshoot) {
    editnama.value = snapshoot.val().nama;
    editnohp.value = snapshoot.val().nohp;
	editkelas.value = snapshoot.val().kelas;
    editjam.value = snapshoot.val().jam;
	edittanggal.value = snapshoot.val().tanggal;
    editbarang.value = snapshoot.val().barang;
    idV.value = id;
  });
}

//update data
function updateData() {
  let updateData = document.getElementById("updateData");
  let data = {
    nama: editnama.value,
    nohp: editnohp.value,
	kelas: editkelas.value,
    jam: editjam.value,
	tanggal: edittanggal.value,
    barang: editbarang.value
	
  };
  database.ref("Data_Pengembalian/" + idV.value).update(data);
  updateData.setAttribute("data-bs-dismiss", "modal");
}

function deleteRow(id) {
  database.ref("Data_Pengembalian/" + id).remove();
}
