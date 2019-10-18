module.export = app => {

	const Tasks = app.models.Tasks;


	app.route("/tasks") //Middleware de pré-execução das rotas
		.get((req, res) => { // "/Tasks": Lista todas as Tasks
			Tasks.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Tasks.create(req.body) // "/Tasks": Cadastra uma nova task
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/tasks/:id")
		.get((req, res) => { // "/Tasks/1": Consulta apenas uma task expecífica
			Tasks.findOne({where: req.params})
				.then(result => {
					if (result){
						res.json(result);
					} else{
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => { // "/Tasks/1":Atuliza a pergunta
			Tasks.update(req.body,{where:req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/Tasks/1":Exclui a pergunta
			Tasks.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}