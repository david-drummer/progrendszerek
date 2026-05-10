const express = require('express');
const router = express.Router();

const bookclubService = require('../services/bookclubService');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// összes bookclub listázása
router.get('/bookclubs', auth, async (req, res) => {
  try {
    const bookclubs = await bookclubService.findAll();
    res.status(200).json(bookclubs);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// bejelentkezett user bookclubjai
router.get('/bookclubs/my', auth, async (req, res) => {
  try {
    console.log('REQ USER:', req.user);
    console.log('REQ USER ID:', req.user.id);

    const bookclubs = await bookclubService.findMyBookclubs(req.user.id);
    res.status(200).json(bookclubs);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// adott bookclub könyvei, opcionális kategória filterrel
router.get('/bookclubs/:id/books', auth, async (req, res) => {
  try {
    const books = await bookclubService.findBooksByCategory(
      req.params.id,
      req.query.categoryId
    );

    res.status(200).json(books);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// egy bookclub lekérése id alapján
router.get('/bookclubs/:id', auth, async (req, res) => {
  try {
    const bookclub = await bookclubService.findById(req.params.id);
    res.status(200).json(bookclub);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// új bookclub létrehozása
router.post('/bookclubs', auth, role('admin'), async (req, res) => {
  try {
    const newBookclub = await bookclubService.create(req.body);
    res.status(201).json(newBookclub);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// bookclub módosítása
router.put('/bookclubs/:id', auth, role('admin'), async (req, res) => {
  try {
    const updated = await bookclubService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// bookclub törlése
router.delete('/bookclubs/:id', auth, role('admin'), async (req, res) => {
  try {
    await bookclubService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// member hozzáadása adott bookclubhoz
router.post('/bookclubs/:id/members', auth, role('admin'), async (req, res) => {
  try {
    const updated = await bookclubService.addMember(
      req.params.id,
      req.body.userId
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// member törlése adott bookclubból
router.delete('/bookclubs/:id/members/:userId', auth, role('admin'), async (req, res) => {
  try {
    const updated = await bookclubService.removeMember(
      req.params.id,
      req.params.userId
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// könyv hozzáadása adott bookclubhoz
router.post('/bookclubs/:id/books', auth, role('admin'), async (req, res) => {
  try {
    const updated = await bookclubService.addBook(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;