import express from "express";

const app = express();

// to make app understand json
app.use(express.json());

let productList = [
  {
    id: 1,
    name: "Rice",
    price: 3500,
    quantity: 30,
  },
  {
    id: 2,
    name: "Wheat",
    price: 1500,
    quantity: 60,
  },
];

// apis

// add product
app.post("/product/add", (req, res) => {
  const newProduct = req.body;

  productList.push(newProduct);

  return res.status(201).send({ message: "Product is added successfully." });
});

// get product list
app.get("/product/list", (req, res) => {
  return res.status(200).send(productList);
});

// add multiple product

app.post("/product/multiple/add", (req, res) => {
  const multipleProductList = req.body;

  productList = [...productList, ...multipleProductList];

  return res
    .status(201)
    .send({ message: "Multiple products are added successfully." });
});

// delete a product
app.delete("/product/delete/:id", (req, res) => {
  const productIdToBeDeleted = Number(req.params.id);

  const newProductList = productList.filter((item) => {
    return item.id !== productIdToBeDeleted;
  });

  productList = structuredClone(newProductList);

  return res.status(200).send({ message: "Product is deleted successfully." });
});

// edit a product
// id
// new Value

app.put("/product/edit/:id", (req, res) => {
  console.log(req.params);
  const productIdToBeEdited = Number(req.params.id);

  const requiredProduct = productList.find((item, index, self) => {
    return item.id === productIdToBeEdited;
  });

  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  const newValues = req.body;

  const newProductList = productList.map((item) => {
    if (item.id === productIdToBeEdited) {
      item.name = newValues.name;
      item.price = newValues.price;
      item.quantity = newValues.quantity;

      return item;
    }

    return item;
  });

  productList = structuredClone(newProductList);

  return res.status(200).send({ message: "Product is edited successfully." });
});
// server port

const port = 4000;

app.listen(port, () => {
  console.log(`App is listening on port  ${port}`);
});
