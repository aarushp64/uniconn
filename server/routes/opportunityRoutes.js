const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Opportunity = require('../models/Opportunity');

// @route   GET api/opportunities
// @desc    Get all opportunities
router.get('/', async (req, res) => {
    try {
        const dbOpportunities = await Opportunity.find().sort({ createdAt: -1 });

        const dummyOpps = [
            {
                _id: 'mit_opp_1',
                title: 'Project Management Intern',
                company: 'Philips India (MIT ADTU Partner)',
                location: 'Loni Kalbhor, Pune',
                type: 'Internship',
                description: 'Collaborate on healthcare technology projects as part of the MIT ADTU / Philips India MoU initiative.',
                tags: ['Management', 'Healthcare', 'MoU'],
                stipend: '₹25,000/mo',
                deadline: new Date(Date.now() + 604800000).toISOString()
            },
            {
                _id: 'mit_opp_2',
                title: 'Aerodynamics Engineer',
                company: 'Team Speedtail Racing',
                location: 'MIT SOE Labs',
                type: 'Part-time',
                description: 'Join the winning team of Formula Bharat 2026. Looking for passionate engineers to design our next electric racer.',
                tags: ['Racing', 'Aerodynamics', 'Mechanical'],
                stipend: 'Unpaid / Experience',
                deadline: new Date(Date.now() + 2592000000).toISOString()
            },
            {
                _id: 'mit_opp_3',
                title: 'Persona Fest Event Manager',
                company: 'MIT ADTU Cultural Committee',
                location: 'Main Campus',
                type: 'Part-time',
                description: 'Manage logistics for the upcoming concerts and tech events during Persona Fest 2026. Great for leadership skills!',
                tags: ['Management', 'Events', 'Leadership'],
                stipend: 'Certificates + Perks',
                deadline: new Date(Date.now() + 172800000).toISOString()
            },
            {
                _id: 'mit_opp_4',
                title: 'EV Research Assistant',
                company: 'MITSOE Research Lab',
                location: 'Engineering Building',
                type: 'Internship',
                description: 'Work on the new electric vehicle battery management system. Background in Electrical or Electronics preferred.',
                tags: ['EV', 'Research', 'Engineering'],
                stipend: '₹12,000/mo',
                deadline: new Date(Date.now() + 1209600000).toISOString()
            }
        ];

        res.json([...dummyOpps, ...dbOpportunities]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/opportunities
// @desc    Create an opportunity (Admin/Faculty only in production, but open for now)
router.post('/', auth, async (req, res) => {
    try {
        const newOpp = new Opportunity({
            ...req.body,
            postedBy: req.user.id
        });

        const opportunity = await newOpp.save();
        res.json(opportunity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
