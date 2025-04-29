app.post('/api/events', async (req, res) => {
  const { title, date, location } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO events (title, date, location) VALUES (?, ?, ?)',
      [title, date, location]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      date,
      location
    });
  } catch (error) {
    console.error("💥 DB INSERT ERROR:", error); // <-- log real error
    res.status(500).json({ error: error.message }); // <-- return message
  }
});
