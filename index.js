import express from "express";
const app = express();
app.use(express.json());
//? API
// Create product array
let laptopList = [
  {
    id: 1,
    brand: "Lenovo",
    model: "yoga fold",
    price: 220000,
  },
  {
    id: 2,
    brand: "Asus",
    model: "zenbook oled",
    price: 350000,
  },
];
//? add laptop
app.post("/laptop/add", (req, res) => {
  let newLaptop = req.body;
  laptopList.push(newLaptop);
  return res.status(201).send({ message: "Product added successfully" });
});

//? get laptop list

app.get("/laptop/list", (req, res) => {
  return res.status(200).send(laptopList);
});

//? get laptop list, searching by id
app.get("/laptop/list/:id", (req, res) => {
  const laptopID = Number(req.params.id);
  //console.log(typeof laptopID);
  const requiredLaptop = laptopList.find((item) => {
    if (item.id === laptopID) {
      return item;
    }
  });
  console.log(requiredLaptop);
  if (!requiredLaptop) {
    return res.status(404).send({ message: "Laptop doesn't exist" });
  }

  return res.status(200).send({ message: "Laptop Details", requiredLaptop });
});

//? delete laptop
app.delete("/laptop/delete/:model", (req, res) => {
  const laptopModel = req.params.model;

  const requiredLaptop = laptopList.find((item) => {
    //console.log(typeof item.model);

    if (item.model === laptopModel) {
      return item;
    }
  });
  if (!requiredLaptop) {
    return res.status(200).send({ message: "Laptop Model doesn't exist" });
  }

  const newLaptopList = laptopList.filter((item) => {
    if (item.model !== laptopModel) {
      return item;
    }
  });
  laptopList = structuredClone(newLaptopList);

  return res
    .status(200)
    .send({ message: "Laptop deleted successfully", laptopList });
});

//? update laptop details
app.put("/laptop/update/:id", (req, res) => {
  const laptopID = +req.params.id;

  const requiredLaptop = laptopList.find((item) => {
    //console.log(typeof item.model);

    if (item.id === laptopID) {
      return item;
    }
  });
  if (!requiredLaptop) {
    return res.status(200).send({ message: "Laptop doesn't exist" });
  }
  //extract laptop new details from body
  const newValues = req.body;
  //edit laptop details
  const newLaptopList = laptopList.map((item) => {
    if (item.id === laptopID) {
      let newItem = { id: laptopID, ...newValues };
      return newItem;
    } else {
      return item;
    }
  });

  laptopList = structuredClone(newLaptopList);

  return res
    .status(200)
    .send({ message: "Laptop details updated successfully", laptopList });
});

// assign network and port
const PORT = 4040;
app.listen(PORT, () => {
  console.log(`App is listening on Port : ${PORT}`);
});
