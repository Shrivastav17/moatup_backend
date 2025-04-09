import sendMaterialModel from "../Models/sendMaterialModel.js";

// === CREATE ===
const createSendMaterial = async (req, res) => {
  try {
    if (!req.files || !req.files.attachedDocuments || !req.files.dbAttachment) {
      return res.status(400).json({ error: 'Files are required (documents & DB attachment)' });
    }

    const { fileType, year, quarter, emails,message, } = req.body;

    if (!fileType || !year || !quarter || !emails || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailList = emails.split(',').map(email => email.trim());

    const attachedDocs = req.files.attachedDocuments.map(file => ({
      name: file.originalname,
      url: file.path,
    }));

    const dbAttach= {
      name: req.files.dbAttachment[0].originalname,
      url: req.files.dbAttachment[0].path,
    };

    const newMaterial = new sendMaterialModel({
      fileType,
      year,
      quarter,
      emails: emailList,
      attachedDocuments: attachedDocs,
      dbAttachment: dbAttach,
      message,
    });

    const savedMaterial = await newMaterial.save();

    res.status(201).json({
      message: "Material created successfully",
      data: savedMaterial,
    });
    console.log("REQ.FILES =>", req.files);
    console.log("REQ.BODY =>", req.body);
    
  } 

  catch (error) {
    console.error("Send Material Error:", error);
    res.status(500).json({ error: "An error occurred while sending material" });
  }
};

// === READ ALL ===
const getAllSendMaterials = async (req, res) => {
  try {
    const materials = await sendMaterialModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: materials });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch materials" });
  }
};

// === UPDATE ===
const updateSendMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await sendMaterialModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Material not found" });
    }

    res.status(200).json({ message: "Material updated", data: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Failed to update material" });
  }
};

// === DELETE ===
const deleteSendMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await sendMaterialModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Material not found" });
    }

    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Failed to delete material" });
  }
};

export {
  createSendMaterial,
  getAllSendMaterials,
  updateSendMaterial,
  deleteSendMaterial,
};
