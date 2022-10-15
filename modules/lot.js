require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db");
const methodOverride = require("method-override");
const crypto = require("crypto");
const session = require("express-session");
const cors = require("cors");
router.use(express.json(), cors());
router.use(methodOverride("_method"));
router.options("*", cors());
router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.send("lots");
});

router.post("/createLot", async (req, res) => {
  if (req.session.user) {
    const lotName = req.body.lotName;
    const address = req.body.address;
    const spots = req.body.spots;
    const price = req.body.price;
    try {
      const client = await pool.connect();
      var insertQuery = `INSERT INTO ${process.env.PG_LOT_TABLE} (owner, lot_name, price, address, spots_total) values (${req.session.user.id}, '${lotName}', ${price}, '${address}', ${spots})`;
      const result = await client.query(insertQuery);
      client.release();
      res.redirect('/lots');
    } catch (err) {
      console.error(err);
      res.json({ message: "YOUR LOT FAILED TO BE CREATED! NOW YOU DIE" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.get("/getAllForUser", async (req, res) => {
  if (req.session.user) {
    try {
      const client = await pool.connect();
      const getLotsQuery = `SELECT * FROM ${process.env.PG_LOT_TABLE} WHERE owner = ${req.session.user.id}`;
      const result = await client.query(getLotsQuery);
      const results = { results: result ? result.rows : null };
      res.json(results.results);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const client = await pool.connect();
    const getLotsQuery = `SELECT * FROM ${process.env.PG_LOT_TABLE}`;
    const result = await client.query(getLotsQuery);
    const results = { results: result ? result.rows : null };
    res.json(results.results);
  } catch (err) {
    console.error(err);
    res.json({ message: "You failed" });
  }
});

router.get("/getSpecificLot/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    const client = await pool.connect();
    const getLotQuery = `SELECT * FROM ${process.env.PG_LOT_TABLE} WHERE id = ${id}`;
    const result = await client.query(getLotQuery);
    const results = { result: result ? result.rows[0] : null };
    res.json(results.result);
  } catch (err) {
    console.error(err);
    res.json({ message: "You failed" });
  }
});

router.post("/addSpot/:ID", async (req, res) => {
  if (req.session.user) {
    const id = req.params.ID;
    try {
      const client = await pool.connect();
      const getLotQuery = `SELECT spots_filled FROM ${process.env.PG_LOT_TABLE} WHERE id = ${id}`;
      const result = await client.query(getLotQuery);
      const results = { result: result ? result.rows[0] : null };
      const spotsfilled = results.result.spots_filled;
      const insertQuery = `UPDATE ${
        process.env.PG_LOT_TABLE
      } SET spots_filled = ${spotsfilled + 1} WHERE id = ${id}`;
      const result2 = await client.query(insertQuery);
      res.json(result2);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.post("/removeSpot/:ID", async (req, res) => {
  if (req.session.user) {
    const id = req.params.ID;
    try {
      const client = await pool.connect();
      const getLotQuery = `SELECT spots_filled FROM ${process.env.PG_LOT_TABLE} WHERE id = ${id}`;
      const result = await client.query(getLotQuery);
      const results = { result: result ? result.rows[0] : null };
      const spotsfilled = results.result.spots_filled;
      const insertQuery = `UPDATE ${
        process.env.PG_LOT_TABLE
      } SET spots_filled = ${spotsfilled - 1} WHERE id = ${id}`;
      const result2 = await client.query(insertQuery);
      res.json(result2);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.post("/closeLot/:ID", async (req, res) => {
  if (req.session.user) {
    const id = req.params.ID;
    try {
      const client = await pool.connect();
      const insertQuery = `UPDATE ${process.env.PG_LOT_TABLE} SET closed = true WHERE id = ${id}`;
      const result = await client.query(insertQuery);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.post("/maintainLot/:ID", async (req, res) => {
  if (req.session.user) {
    const id = req.params.ID;
    try {
      const client = await pool.connect();
      const insertQuery = `UPDATE ${process.env.PG_LOT_TABLE} SET maintenance = true WHERE id = ${id}`;
      const result = await client.query(insertQuery);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.post("/openLot/:ID", async (req, res) => {
  if (req.session.user) {
    const id = req.params.ID;
    try {
      const client = await pool.connect();
      const insertQuery = `UPDATE ${process.env.PG_LOT_TABLE} SET closed = false WHERE id = ${id}`;
      const result = await client.query(insertQuery);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

router.post("/finishMaintenance/:ID", async (req, res) => {
  if (req.session.user) {
    const id = req.params.ID;
    try {
      const client = await pool.connect();
      const insertQuery = `UPDATE ${process.env.PG_LOT_TABLE} SET maintenance = false WHERE id = ${id}`;
      const result = await client.query(insertQuery);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.json({ message: "You failed" });
    }
  } else {
    res.json({ message: "You are not signed in" });
  }
});

module.exports = router;
