//-----------------------------------
// START OF TABLE FUNCTIONS

let createTable = {
	headers : new Set(),
	getColumnHeaders() {
	/*
	Fungsi ini dibuat untuk mendapatkan setiap unique keys yang ada pada object dalam books yang nantinya akan dipakai sebagai baris table this.headers (kolom teratas).
	kenapa dibutuhkan fungsi ini? karena ada kemungkinan suatu buku memiliki parameter-parameter ang berbeda satu sama lain, contoh: buku1 punya parameter 'harga', sedangkan yang lain tidak. Begitu juga dengan buku2 yang punya param 'Stok', sedangkan buku lain tidak.
	keys-keys ini akan di simpan dalam variabel header yang berupa Set
	kenapa pakai Set? untuk menghindari pengulangan penambahan kolom this.headers dengan isi yang sama. Misalnya, buku1 dan buku2 sama-sama punya param 'judul', jadi, ketika kolom 'judul' dari buku1 sudah ditambahkan, kolom 'judul' dari buku2 tidak akan ditambahkan lagi.
	*/
		
		for (let obj of books) {	// pake of karena books berupa array
			for (let param in obj) {	// pake for in karena dia object
				this.headers.add(param)
			}
		}
	},

	assignEmptyParam() {
		// ketika suatu object, misal, buku1, tidak memiliki parameter 'harga', sedangkan parameter tersebut ada dalam this.headers, maka fungsi ini akan menambahkannya dan memberikan value "" (kosong).
		// ini dilakukan untuk memudahkan pembuatan table nantinya, agar semua object memiliki rangkaian parameter yang sama, walaupun value nya berbeda.
		for (let obj of books) {
			for (let key of this.headers) {
				if (typeof obj[key] === "undefined") {
					obj[key] = ""
				}
			}
		}
	},

	generateTableHead(table) {
		let thead = table.createTHead();  
		let row = thead.insertRow();  
		for (let key of this.headers) {  
			let th = document.createElement("th");  
			let text = document.createTextNode(key);  
			th.appendChild(text);  
			row.appendChild(th);  
		}  
	}  ,

	generateTable(table) {
		this.assignEmptyParam()	// menjalankan fungsi assignEmptyParam
		for (let obj of books) {	// untuk semua object dalam array books, lakukan: ...  
			let row = table.insertRow();  
			for (let key of this.headers) {  
			// kenapa pakai (let key of this.headers)?, bukannyaa (let param in obj)?
			// berkat ungsi assignEmptyParam, semua object memiliki rangkaian parameter-parameter yang sama, walaupun value-nya berbeda.
			// dengan kata lain, setiap object punya semua parameter-parameter yang tercantum pada this.headers
			// (let key of this.headers) dipakai untuk menghindari kolom yang tidak berurutan
				let cell = row.insertCell();  
				let text = document.createTextNode(obj[key]);  
				// perhatikan penggunaan obj[key] diatas, ini untuk menghindari kesalahan penempatan value pada kolom table yang dikarenakan perbedaan urutan parameter tiap object
				cell.appendChild(text);  
			}  
		}  
	}  ,

	/*
	let table = document.querySelector("table")
	variabel table di atas sudah  di define langsung di dalam file HTML. kalau di define disini, gak tau kenapa error terus. 
	prediksi saya karena DOM tidak bisa di assign di script terpisah
	Mungkin mas Yudi/Om Iksan/Mas Giyo/Mas Budi bisa tolong jawab.
	*/

	main() {
		this.getColumnHeaders()
		this.generateTable(table)
		this.generateTableHead(table)
	},
	update() {
		document.getElementById("table").innerHTML = ''
		createTable.main()
		
	}
}
// END OF TABLE FUNCTIONS
//--------------------------------------------
// START OF HTML SCRIPT

function unhide(item) {
	let id, defaultValue, valueOnClick;
	switch (item.id) {
		case "1":
			id = "formAddBook"
			defaultValue = 'Tambah Buku'
			valueOnClick = 'Sembunyikan...'
			break;
		case "2":
			id = "addColumn"
			defaultValue = 'Tambahkan Kolom Baru...'
			valueOnClick = 'Batalkan kolom baru...'

			break;
	}
	const div = document.getElementById(id)
	if (div.hidden === true) {
		div.hidden = false
		item.value = valueOnClick
	} else {
		div.hidden = true
		item.value = defaultValue
	}
}
let isEmpty = false	// untuk menandakan form kosong dan function addBook dibatalkan
function getBukuBaru() {
	if (elements2[0].value === '') {
		alert('Setidaknya, Judul harus diisi.')
		isEmpty = true
		return;
	} else {
		for (let i = 0; i < elements2.length; i++) {
			keyAndValue.push(`${elements2[i].name} : ${elements2[i].value}`)
		}
	}
}
function getKolomBaru() {
	if (document.getElementById('addColumn').hidden === true) {
		return;
	} else {
		for (let i = 0; i < elements1.length; i+=2) {
			if (elements1[0].value === '' || elements1[1].value === '') {
				alert('Nama dan Isi Kolom Baru Tidak Boleh Kosong!')
				isEmpty = true
				return;
			} 
			keyAndValue.push(`${elements1[i].value} : ${elements1[i+1].value}`)
		}
	}
}

function addBook() {
	isEmpty = false
	getBukuBaru()
	getKolomBaru()
	if (isEmpty ===true) {
		return
	} else {
		let newBook = new Book()
		newBook.addBookData(...keyAndValue)
		manageBooks.addBooks(newBook)
		createTable.update()
	}
}


function addFormField() {
	const div = document.createElement('div')
	div.innerHTML = `<label>Nama Kolom: <input type ="text"></label> <label>Isi Kolom: <input type ="text" maxlength="100"></label><br>`
	document.getElementById('kolomBaru').appendChild(div)
}
