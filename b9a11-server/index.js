const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 9000;
const app = express();
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://assignment-11-c7c9c.web.app",
    "https://assignment-11-c7c9c.firebaseapp.com",
    "",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63qrdth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb://localhost:27017`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const logger = (req, res, next) => {
  // console.log("hi", req.method, "hello", req.url);
  next();
};
const middleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        console.log(error);
        return res.status(401).send({ message: "unauthorized access" });
      }
      console.log("decoded", decoded);
      req.user = decoded;
      console.log("token", token);
      next();
    });
  }
};
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
async function run() {
  try {
    const servicesCollection = client.db("ASS-11").collection("tutor");
    const bidesCollection = client.db("ASS-11").collection("bides");
    //  jwt token generate
  
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      // Create the JWT token
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });

      // Send the token in a cookie
      res
        .cookie("token", token, cookieOptions)
        .send({ success: true });
    });

    // clear token on  logout
   
    app.get("/logout", async (req, res) => {
      const user = req.body;
      console.log("logoutOut", user);
      res
        .clearCookie("token", {
          maxAge: 0,
        })
        .send({ success: true });
    });
    // Services All product count pagination
    app.get("/productsCount", async (req, res) => {
      const result = await servicesCollection.estimatedDocumentCount();
      res.send({ result });
    });
    //  get all services data from db start
    app.get("/tutor", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });
    // get single job data from db using job id
    app.get("/tutor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send(result);
    });
    // get All service posted by a specific user
    app.get("/tutors/:email", async (req, res) => {
      // const tokenData = req.user.email;
      const email = req.params.email;
      // if (tokenData !== email) {
      //   return res.status(403).send({ message: "forbidden access" });
      // }
      const query = { providerEmail: email };
      const result = await servicesCollection.find(query).toArray();
      res.send(result);
    });
    // delete a service posted by a specific user
    app.delete("/tutor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      res.send(result);
    });
    // save a service date in db
    app.post("/tutor", async (req, res) => {
      const addService = req.body;
      const result = await servicesCollection.insertOne(addService);
      res.send(result);
    });
    // updated a post in service
    app.put("/tutor/:id", async (req, res) => {
      const id = req.params.id;
      const updatedService = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          ...updatedService,
        },
      };
      const result = await servicesCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // save a bides data in db
    app.post("/bides", async (req, res) => {
      const bidsData = req.body;
      const result = await bidesCollection.insertOne(bidsData);
      res.send(result);
    });
    // get all bid request from bd
    app.get("/bides", async (req, res) => {
      const bidsData = req.body;
      const result = await bidesCollection.find().toArray();
      res.send(result);
    });
    // get all bid request from bd by a specific user servicesToDo
    app.get("/bides-request/:email", async (req, res) => {
      console.log(req.query.email);
      console.log("coocies", req.cookies);
      const email = req.params.email;
      const query = { providerEmail: email };
      console.log(query);
      const result = await bidesCollection.find(query).toArray();
      res.send(result);
    });
    // updated status from db
    app.patch("/bid/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      const query = { _id: new ObjectId(id) };
      const result = await bidesCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // get all my bid /booked  from bd by a specific user
    app.get("/my-bides/:email", async (req, res) => {
      const email = req.params.email;
      const query = { bidesEMail: email };
      const result = await bidesCollection.find(query).toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send(
    "You successfully connected to MongoDB! Hello from tutore server........"
  );
});
app.listen(port, () => console.log(`server running or port ${port}`));
