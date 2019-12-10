jQuery(document).ready(function() {
	$.backstretch("prato.jpg");

	var edit_doc_id;
	var delete_doc_id;
	var title;
	var author;
	var editor;
	var note;
	var dateString;
	var pages;
	var price;
	var location;


	$(document).on("click", ".add-book", function () {
		$('#input-title').val("");
        $('#input-author').val("");
        $('#input-editor').val("");
        $('#input-note').val("");
        $('#datePicker').val("");
        $('#input-pages').val("");
        $('#input-price').val("");
        $('#input-location').val("");
		$('.save-changes').hide();
		$('.save-book').show();
	});

	$(document).on("click", ".edit-book", function () {
		edit_doc_id = $(this).data('id');

		var docRef = db.collection("books").doc(edit_doc_id);
		docRef.get().then(function(doc) {
		    if (doc.exists) {
		        title = doc.data().title;
		        author = doc.data().author;
		        editor = doc.data().editor;
		        note = doc.data().note;
		        const timestamp = doc.data().purchaseDate;
  				const date = timestamp.toDate();
				var month = ("0"+(date.getMonth() + 1)).slice(-2);
				var day = ("0"+date.getDate()).slice(-2);			
				var dateString = date.getFullYear()  + "-" + month + "-" + day;
				pages = doc.data().pages;
				price = doc.data().price;
				location = doc.data().location;
		        $('#input-title').val(title);
		        $('#input-author').val(author);
		        $('#input-editor').val(editor);
		        $('#input-note').val(note);
		        $('#datePicker').val(dateString);
		        $('#input-pages').val(pages);
		        $('#input-price').val(price);
		        $('#input-location').val(location);
		        $('.save-book').hide();
		        $('.save-changes').show();
		    } 
		})
	});

	$(document).on("click", ".delete-book", function () {
		delete_doc_id = $(this).data('id');
		var docRef = db.collection("books").doc(delete_doc_id);
		docRef.get().then(function(doc) {
		    if (doc.exists) {
		        title = doc.data().title;
		        $('#para-delete').text("Vuoi cancellare "+"'"+ title +"' ?");
		    } 
		})
	});

	$(document).on("click", ".yes-delete", function () {
		db.collection("books").doc(delete_doc_id).delete().then(function() {
			window.location.reload();
		});	
	});

	$(document).on("click", ".save-book", function () {
		
		var title = $('#input-title').val();
		var author = $('#input-author').val();
		var editor = $('#input-editor').val();
		var note = $('#input-note').val();
		var date = $('#datePicker').val();
		var pages = $('#input-pages').val();
		var price = $('#input-price').val();
		var location = $('#input-location').val();

		db.collection("books").add({
			title: title,
			author: author,
			editor: editor,
			note: note,
			purchaseDate: new Date(date),
			pages: Number(pages),
			price: Number(price),
			location: location
		})
		.then(function() {
    		window.location.reload();
		});
		
	});


	$(document).on("click", ".save-changes", function () {
		
		var title = $('#input-title').val();
		var author = $('#input-author').val();
		var editor = $('#input-editor').val();
		var note = $('#input-note').val();
		var date = $('#datePicker').val();
		var pages = $('#input-pages').val();
		var price = $('#input-price').val();
		var location = $('#input-location').val();

		db.collection("books").doc(edit_doc_id).set({
			title: title,
			author: author,
			editor: editor,
			note: note,
			purchaseDate: new Date(date),
			pages: Number(pages),
			price: Number(price),
			location: location
		})
		.then(function() {
    		window.location.reload();
		});
	});

	
});