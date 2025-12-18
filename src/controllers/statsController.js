const User = require('../models/userSchema');
const Appointment = require('../models/appointmentSchema');
const Admission = require('../models/admissionSchema');
const Report = require('../models/reportSchema');
const Task = require('../models/taskSchema');

const getDayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return { start, end };
};

const getAdminStats = async (req, res) => {
    try {
        const { start, end } = getDayRange();

        const totalPatients = await User.countDocuments({ 'role.name': 'patient' });
        const totalDoctors = await User.countDocuments({ 'role.name': 'doctor' });
        const totalNurses = await User.countDocuments({ 'role.name': 'nurse' });

        const todayAppointments = await Appointment.countDocuments({
            date: { $gte: start, $lte: end }
        });

        const activeAdmissions = await Admission.countDocuments({ status: 'Admitted' });

        res.status(200).json({
            success: true,
            data: {
                patients: totalPatients,
                medicalStaff: totalDoctors + totalNurses,
                appointments: todayAppointments,
                admissions: activeAdmissions
            }
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getDoctorStats = async (req, res) => {
    try {
        const { start, end } = getDayRange();
        const doctorId = req.user._id;

        const totalPatients = await User.countDocuments({ 'role.name': 'patient' });

        const appointmentsToday = await Appointment.countDocuments({
            doctor: doctorId,
            date: { $gte: start, $lte: end }
        });

        const pendingReports = await Report.countDocuments({
            doctor: doctorId,
            status: 'Pending Review'
        });

        res.status(200).json({
            success: true,
            data: {
                totalPatients: totalPatients,
                appointmentsToday: appointmentsToday,
                pendingReports: pendingReports,
                avgWaitTime: "12m" 
            }
        });
    } catch (error) {
        console.error("Error fetching doctor stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getReceptionistStats = async (req, res) => {
    try {
        const { start, end } = getDayRange();

        const totalDoctors = await User.countDocuments({ 'role.name': 'doctor' });

        const newRegistrations = await User.countDocuments({
            createdAt: { $gte: start, $lte: end },
            'role.name': 'patient'
        });

        const todayAppointments = await Appointment.countDocuments({
            date: { $gte: start, $lte: end }
        });

        res.status(200).json({
            success: true,
            data: {
                newRegistrations: newRegistrations,
                todayAppointments: todayAppointments,
                callsInQueue: 2, 
                doctorAvailability: `${totalDoctors} active`
            }
        });
    } catch (error) {
        console.error("Error fetching receptionist stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getNurseStats = async (req, res) => {
    try {
        const admittedPatients = await Admission.countDocuments({ status: 'Admitted' });

        const pendingTasks = await Task.countDocuments({
            assignedTo: req.user._id,
            isCompleted: false
        });

        res.status(200).json({
            success: true,
            data: {
                assignedPatients: admittedPatients,
                pendingTasks: pendingTasks,
                wardOccupancy: "85%", 
                notifications: 3 
            }
        });
    } catch (error) {
        console.error("Error fetching nurse stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAdminStats,
    getDoctorStats,
    getReceptionistStats,
    getNurseStats
};
