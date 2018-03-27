// ------------------------------------------------------------------------------------------------
// ADD DATA
class CloudFireStoreHelper {
	constructor(db) {
		this.db = db;
	}
	// Add Document
	add() {
		var data = {
			'name':'Stir-fried chickpeas with gai lan',
			'generality':'Give the most boring of legumes a much-needed chilli whack. This is a great dish for midweek meals too. ',
			'essentialIngredients':[
				'4 cloves garlic, bruised ',
				'¼ cup vegetable oil ',
				'2 x 400g cans chickpeas, rinsed and drained ',
				'2 tbs soy sauce  ',
				'1 tbs caster sugar  ',
				'2 bunches gai lan, cut into 3cm pieces ',
				'½ cup bang bang relish, plus extra to serve (see below) ',
				'½ cup coconut water',
				'2 large red chillies, roll cut (see below)',
				'½ can beer (whatever you’re drinking)',
			],
			'descriptions': 'Add the gai lan, bang bang relish (if you’ve got vegetarian mates you can leave this out and just serve it on the side), coconut water and chillies, and stir-fry for 1-2 minutes to heat and combine (you don’t want the gai lan to be overcooked). Check the seasoning and adjust if necessary. Transfer to a serving bowl. Put the extra bang bang relish on the side, so guests can add it at will.' ,
			'image': 'https://i.guim.co.uk/img/media/78d925a7330029c62dd639abdf360f450109a437/0_1056_3612_4362/master/3612.jpg?w=605&q=55&auto=format&usm=12&fit=max&s=714b13b96bb10983c5a8be9170ce91f3'
		};
	
		var docRef = this.db.collection('products').add(data);
		console.log(data);
	}

	// Update Document
	update() {
		var docRef = this.db.collection('images').doc("POKuvbni0KBlXGj0wwdr")
	
		var result = docRef.set({
			'title': 'Danang City',
			'subTitle': 'Beautiful city',
			'text': '',
			'imageUrl': "https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
		});
	}

	// Update Document Fields
	updateField() {
		var updateDocRef = this.db.collection('images').doc('POKuvbni0KBlXGj0wwdr');
		var updateSingle = updateDocRef.update({
			subTitle: 'New SubTitle'
		});
	}

	// Get All Documents
	getAllDocuments() {
		this.db.collection('products').get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					console.log(doc.id, '=>', doc.data());
					console.log("===========================================================================");
				});
			})
			.catch((err) => {
				console.log('Error getting documents', err);
			});
	}

	// Get A Document
	getDocumentById(id) {
		var imagesRef = this.db.collection('images').doc(id);
		var getProduct = imagesRef.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('No such document!');
				} else {
					console.log('Document data (images):', doc.data());
				}
			})
			.catch(err => {
				console.log('Error getting document', err);
			});
	}

	// Get Multiple Documents
	getMultipleDocuments() {
		var imagesRef = this.db.collection("images");
		var query = imagesRef.where('title', '==', 'Danang City').get()
			.then(snapshot => {
				console.log('Document data (images):');
				snapshot.forEach(doc => {
					console.log(doc.id, '=>', doc.data());
				});
			})
			.catch(err => {
				console.log('Error getting documents', err);
			});
	}

	realtimeUpdate() {
		var doc = this.db.collection('images').where('title', '==', 'Danang City');

		var observer = doc.onSnapshot(docSnapshot => {
			console.log(`Received doc snapshot: ${docSnapshot}`);
			docSnapshot.docChanges.forEach(function (change) {
				if (change.type === "added") {
					console.log("New: ", change.doc.data());
				}
				if (change.type === "modified") {
					console.log("Modified: ", change.doc.data());
				}
				if (change.type === "removed") {
					console.log("Removed: ", change.doc.data());
				}
			});
			// ...
		}, err => {
			console.log(`Encountered error: ${err}`);
		});
	}
};

module.exports = CloudFireStoreHelper;