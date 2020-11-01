const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '8579e1a87a10476c974e7ee9543f8308'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, 
		req.body.input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=',id)
		.increment('entries', 1)
		.returning('entries') 
	.then(entries => res.json(entries))
	.catch(err => res.status(400).json('error getting information'))
}

module.exports = {
	handleImage,
	handleApiCall
}