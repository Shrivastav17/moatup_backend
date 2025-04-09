import inviteInvestorModel from "../Models/inviteInvestorModel.js";

const createInvestorInvite = async (req, res) => {
  try {
    // Ensure files are uploaded
    if (!req.files || !req.files.inviteFile || !req.files.databaseFile) {
      return res.status(400).json({ error: 'Files are required' });
    }

    const { eventName, eventDate, eventTime, eventPlace, emails, message } = req.body;

    // Ensure all required fields are present
    if (!eventName || !eventDate || !eventTime || !eventPlace || !emails || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Parse the emails into an array
    const emailList = emails.split(',').map((email) => email.trim());

    // Create a new InviteInvestor document
    const newInvite = new inviteInvestorModel({
      eventName,
      eventDate,
      eventTime,
      eventPlace,
      emails: emailList,
      message,
      inviteFile: req.files.inviteFile[0].path, // Access the uploaded file's path
      databaseFile: req.files.databaseFile[0].path, // Access the uploaded file's path
    });

    // Save the document to MongoDB
    const savedInvite = await newInvite.save();

    res.status(201).json({ message: 'Investor invitation created successfully', data: savedInvite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the invitation' });
  }
};

export default createInvestorInvite ;

