const app = require('./socket')
const PORT = process.env.PORT || '3001';

/** Listen */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})