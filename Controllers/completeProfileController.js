import completeProfileModel from '../Models/completeProfileModel.js'

// Create a new complete profile
export const createCompleteProfile = async (req, res) => {
    try {
        const newProfile = new completeProfileModel(req.body);
        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully', data: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create profile', error });
    }
};

// Get all profiles
export const getAllCompleteProfiles = async (req, res) => {
    try {
        const profiles = await completeProfileModel.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profiles', error });
    }
};

// Get a profile by ID
export const getCompleteProfileById = async (req, res) => {
    try {
        const profile = await completeProfileModel.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
};

// Update a profile by ID
export const updateCompleteProfile = async (req, res) => {
    try {
        const updatedProfile = await completeProfileModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error });
    }
};

// Delete a profile by ID
export const deleteCompleteProfile = async (req, res) => {
    try {
        const deletedProfile = await completeProfileModel.findByIdAndDelete(req.params.id);
        if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete profile', error });
    }
};
