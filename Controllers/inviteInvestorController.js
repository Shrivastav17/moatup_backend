import inviteInvestorModel from "../Models/inviteInvestorModel.js";
import nodemailer from "nodemailer";

 export const createInvestorInvite = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("FILES RECEIVED:", req.files);

    if (!req.files || !req.files.inviteFile || !req.files.databaseFile) {
      return res.status(400).json({ error: 'Files are required' });
    }

    const { eventName, eventDate, eventTime, eventPlace, emails, message } = req.body;

    if (!eventName || !eventDate || !eventTime || !eventPlace || !emails || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailList = emails.split(',').map(email => email.trim());

    // Save to DB
    const newInvite = new inviteInvestorModel({
      eventName,
      eventDate,
      eventTime,
      eventPlace,
      emails: emailList,
      message,
      inviteFile: req.files.inviteFile[0].path,
      databaseFile: req.files.databaseFile[0].path,
    });

    const savedInvite = await newInvite.save();

    // ✅ Setup Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail or SMTP
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // ✅ Email Attachments
    const attachments = [
      {
        filename: req.files.inviteFile[0].originalname,
        path: req.files.inviteFile[0].path,
      },
      {
        filename: req.files.databaseFile[0].originalname,
        path: req.files.databaseFile[0].path,
      },
    ];

    // ✅ Send Email to All
    for (const toEmail of emailList) {
      await transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `You're Invited: ${eventName}`,
        html: `
          <h3>${eventName}</h3>
          <p><strong>Date:</strong> ${eventDate}</p>
          <p><strong>Time:</strong> ${eventTime}</p>
          <p><strong>Place:</strong> ${eventPlace}</p>
          <p>${message}</p>
        `,
        attachments: attachments,
      });
    }

    return res.status(201).json({
      message: "Investor invitation created and emails sent successfully",
      data: savedInvite,
    });

  } catch (error) {
    console.error("❌ Error in createInvestorInvite:", error);
    res.status(500).json({ error: 'Something went wrong while creating invitation or sending email' });
  }
};
export const getAllInvestorInvites = async (req, res) => {
  try {
    const invites = await inviteInvestorModel.find().sort({ createdAt: -1 });
    res.status(200).json(invites);
  } catch (error) {
    console.error("❌ Error in getAllInvestorInvites:", error);
    res.status(500).json({ error: 'Failed to fetch investor invites' });
  }
};

// GET Investor Invite by ID
export const getInvestorInviteById = async (req, res) => {
  try {
    const { id } = req.params;
    const invite = await inviteInvestorModel.findById(id);

    if (!invite) {
      return res.status(404).json({ error: 'Invite not found' });
    }

    res.status(200).json(invite);
  } catch (error) {
    console.error("❌ Error in getInvestorInviteById:", error);
    res.status(500).json({ error: 'Failed to fetch the investor invite' });
  }
};

// DELETE Investor Invite by ID
export const deleteInvestorInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvite = await inviteInvestorModel.findByIdAndDelete(id);

    if (!deletedInvite) {
      return res.status(404).json({ error: 'Invite not found' });
    }

    res.status(200).json({ message: "Investor invite deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteInvestorInvite:", error);
    res.status(500).json({ error: 'Failed to delete investor invite' });
  }
};

// export default createInvestorInvite;
