import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Buscar todos os Usuarios no DB
app.get("/usuarios", async (req, res) => {

	let users = []

	if(req.query){
		users = await prisma.user.findMany({
			where:{
				name: req.query.name,
				email:req.query.email,
				age: req.query.age
			}
		});
		
	} else {
		users = await prisma.user.findMany({});
    
	}

  res.status(200).json(users);
});

// Criar um Usuario no DB
app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

// Editar um usuario no DB
app.put("/usuarios/:id", async (req, res) => {

  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

	res.status(202).json({msg: "editado com success"})
});

// Deletar um usuario no DB
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ msg: "usuario deletado com sucesso" });
});

app.listen(3000, () => {
  console.log("rodando na porta 3000");
});