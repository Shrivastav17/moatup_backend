import investorModel from "../Models/homeinvestorModel.js";
import express from "express";

const selectinvestor = async (req, res) => {
  try {
    const { sector, investor, state, city } = req.body;

    // Validate required fields
    if (!sector || !investor || !state || !city) {
      return res.status(400).json({ error: "Sector, Investor, State, and City are required fields." });
    }

    // Create a new investor
    const newInvestor = new investorModel({ sector, investor, state, city });

    // Save the investor to the database
    const savedInvestor = await newInvestor.save();

    res.status(201).json({
      message: "Investor created successfully.",
      data: savedInvestor,
    });
  } catch (error) {
    console.error("Error creating investor:", error);
    res.status(500).json({ error: "An error occurred while creating the investor." });
  }
};

export default selectinvestor;
