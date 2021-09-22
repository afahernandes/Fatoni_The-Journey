const express = require('express');

const router = express.Router();
 
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile');

const {login ,register, checkAuth}=require('../controllers/auth');
const {getUsers,getUser,updateUser,deleteUser, getProfile} =require('../controllers/user');
const { getJourney, updateJourney, deleteJourney, addJourney, getJourneys, getUserJourney, getLastJourney } = require('../controllers/journey');
const { addBookmark, getBookmarks, getBookmark, getUserBookmark, updateBookmark, deleteBookmark } = require('../controllers/bookmark');

router.post('/login',login);
router.post('/register',register);
router.get("/check-auth", auth, checkAuth);

router.get('/users',getUsers);
router.get('/user/:id',getUser);
router.patch('/user',auth,updateUser);
router.get('/profile',auth,getProfile);
router.delete('/user/:id',deleteUser);

router.post('/journey',auth,uploadFile('image'),addJourney);
router.get('/journey',getLastJourney);
router.get('/journeys',getJourneys);
router.get('/journey/:id',getJourney);
router.get('/userjourney/',auth,getUserJourney);
router.patch('/journey/:id',auth,updateJourney);
router.delete('/journey/:id',deleteJourney);

router.post('/bookmark',auth,addBookmark);
router.get('/bookmarks',getBookmarks);
router.get('/bookmark/:id',getBookmark);
router.get('/userbookmark/',auth,getUserBookmark);
router.patch('/bookmark/:id',auth,updateBookmark);
router.delete('/bookmark/:id',deleteBookmark);

module.exports =router;