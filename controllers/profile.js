const handleProfile = (req, res, db) => {
	const {id} = req.params;
	db('users').where({id})
		.then(user => {
			if(user.length){
				res.json(user[0]);
			}
			else{
				res.status(400).json('error finding profile');
			}
		})
}

module.exports = {
	handleProfile : handleProfile
}