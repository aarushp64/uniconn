const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// @route   POST api/posts
// @desc    Create a post
router.post('/', auth, async (req, res) => {
    try {
        const newPost = new Post({
            content: req.body.content,
            type: req.body.type || 'update',
            media: req.body.media || [],
            tags: req.body.tags || [],
            userId: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts
// @desc    Get all posts
router.get('/', async (req, res) => {
    try {
        const dbPosts = await Post.find().sort({ createdAt: -1 }).populate('userId', ['name', 'username', 'avatar']);

        // Mock MIT ADTU Posts
        const mitAdtuUser = { name: 'MIT ADTU Official', username: 'mit_adtu', avatar: '' };
        const dummyPosts = [
            {
                id: 'mit_post_1',
                content: "🏆 Victory at Formula Bharat 2026! Team Speedtail Racing from MIT ADTU clinches top honors in Pune. Proud moment for the entire campus! #TeamSpeedtail #MITADTU #FormulaBharat",
                type: 'update',
                media: ['https://images.unsplash.com/photo-1547025603-ef918201b1cb?q=80&w=1000&auto=format&fit=crop'],
                tags: ['Racing', 'Innovation', 'Victory'],
                createdAt: new Date().toISOString(),
                userId: mitAdtuUser
            },
            {
                id: 'mit_post_2',
                content: "🤝 MIT-ADT University signs a landmark MoU with Philips India to integrate professional project management into our engineering curriculum. Enhancing student readiness for the global stage! #PhilipsXMIT #ProjectManagement #IndustryConnect",
                type: 'update',
                media: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop'],
                tags: ['Placement', 'MoU', 'Industry'],
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                userId: mitAdtuUser
            },
            {
                id: 'mit_post_3',
                content: "🎭 Persona Fest 2026 is LIVE! Join us for Pune's biggest techno-cultural extravaganza. Star performances, technical hackathons, and global food tech events starting now at Loni Kalbhor campus. #PersonaFest #MITADTU #CampusLife",
                type: 'event',
                media: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop'],
                tags: ['Events', 'Fest', 'Culture'],
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                userId: mitAdtuUser
            },
            {
                id: 'mit_post_4',
                content: "🚀 GDSC MIT ADTU is hosting a 'Flutter Forward' workshop this Friday! Learn to build cross-platform apps from scratch. Limited seats available at MITSOE Lab 4. #GDSC #MITADTU #Flutter",
                type: 'update',
                media: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'],
                tags: ['Workshop', 'Coding', 'GDSC'],
                createdAt: new Date(Date.now() - 43200000).toISOString(),
                userId: mitAdtuUser
            },
            {
                id: 'mit_post_5',
                content: "🏔️ Weekend vibes! The MIT ADTU Adventure Club (Trek N Trail) is heading to Rajmachi Fort this Sunday. Register at the student center by Thursday. #TrekNTrail #Adventure #PuneTrekking",
                type: 'update',
                media: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop'],
                tags: ['Trekking', 'Adventure', 'Weekend'],
                createdAt: new Date(Date.now() - 3600000).toISOString(),
                userId: { name: 'Adventure Club', username: 'trek_n_trail', avatar: '' }
            },
            {
                id: 'mit_post_6',
                content: "🚩 Celebrating the spirit of Swarajya! Shiv Jayanti celebrations at MIT ADTU main gate were grand today. Grateful to be part of such a vibrant culture. #ShivJayanti #MITADTU #Culture",
                type: 'event',
                media: ['https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=1000&auto=format&fit=crop'],
                tags: ['ShivJayanti', 'Tradition', 'Pune'],
                createdAt: new Date(Date.now() - 7200000).toISOString(),
                userId: mitAdtuUser
            },
            {
                id: 'mit_post_7',
                content: "🗣️ 'The future is tech-led but human-centered.' Inspiring words from the Persona Fest Oratory finals today. Congrats to all participants! #PersonaFest #Oratory #MITADTU",
                type: 'event',
                media: ['https://images.unsplash.com/photo-1475721027464-572750821ec0?q=80&w=1000&auto=format&fit=crop'],
                tags: ['PublicSpeaking', 'PersonaFest', 'Excellence'],
                createdAt: new Date(Date.now() - 14400000).toISOString(),
                userId: { name: 'Oratory Club', username: 'mit_oratory', avatar: '' }
            }
        ];

        res.json([...dummyPosts, ...dbPosts]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
