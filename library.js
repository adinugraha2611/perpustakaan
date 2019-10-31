let books = [	// Misalnya ini diambil dari API.
	{
		"judul" : "Kimia",
		"sub judul" : "Jilid III",
		"pengarang" : "Suraji",
		"penerbit" : "Pelita",
		"jam baca" : "15",
		"jam edit" : "44",
	},
	{
		"judul" : "fisika",
		"penerbit" : "Yudhistira"
	}
]

class Book {
	get bookData() {
		// fungsi ini nantinya akan me-return sebuah object yang berisi semua param yang terdapat dalam suatu buku
		let temp = {}
		for (let param in this) {
			temp[param] = this[param]
		}
		return temp;
	}
	addBookData(...properties) {
		let temp;
		for (let item of properties) {
			temp = item.split(' : ') 	// menerima value 'key : value' dan memecahnya jadi array [key, value] 
			this[temp[0]] = temp[1];	// memasukkan nama property baru dan valuenya.
		}
	}
}

let manageBooks = {	// Object yang berisi method method yang berkaitan pengaturan daftar buku
	showBooks() {
		for (let book of books) {
			console.log(book)
		}
	},

	addBooks(book) {
	// menambahkan buku ke dalam JSON books 
		books.push(book.bookData)
	}
}

