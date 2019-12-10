// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var db = firebase.firestore();
var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var counter;

const myTable = document.querySelector("#myTable");
counter = 0;
db.collection("books").orderBy("purchaseDate", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

		const timestamp = doc.data().purchaseDate;
  		const date = timestamp.toDate();
  		var month = date.getMonth();
		var dateString = date.getDate() + " " + strArray[month] + " " + date.getFullYear();

		$('#myTable').append("<tr><td>"+doc.data().title+"</td><td>"+doc.data().author+"</td><td>"+doc.data().editor+
			"</td><td>"+dateString+"</td><td><button class='btn edit-book' data-toggle='modal' data-target='#myModal' "+
			"data-id='" + doc.id + "'>Edit</button></td><td><button class='btn delete-book' data-toggle='modal' data-target='#myDelete' "+
										"data-id='" + doc.id + "'>Del</button></td></tr>");
		counter += 1;
    });
    $('#main-title').text("Libreria di "+counter+" libri");
});



