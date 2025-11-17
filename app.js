import express from 'express';
import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const contacts = [];

const PORT = 3004;

app.get('/', (req, res) =>{
    res.render('home');

});

app.get('/contact-me', (req, res) =>{
    res.render('contact');

});

app.get('/confirm', (req, res) => {

    res.render('confirmation');
});

app.get('/admin', async(req, res) => {

    try {
        const [contacts] = await 
        pool.query('SELECT * FROM contacts ORDER BY date_added desc');
        res.render('admin', { contacts });
    } catch(err) {
        console.error('Database error:', err);
    }
});

app.get('/db-test', async(req, res) => {
    try {
        const [contacts] = await pool.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch(err) {
        console.error('Database error:', err);
    }
});

app.post('/submit-contact', async(req, res) => {

    const contact = req.body;
    contact.timestamp = new Date()

    const sql = "insert into contacts (first_name, last_name, job, company, linkedin, email, how_we_met, other, date_added) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    console.log(contacts);

    const params = [
        contact.fname,
        contact.lname,
        contact.jobname,
        contact.companyinput,
        contact.linkedinput,
        contact.emailinput,
        contact.howmeetinput,
        contact.otherinput,
        contact.timestamp
    ]

    try {
        const [result] = await pool.execute(sql, params);
        
        // Send user to confirmation page
        res.render('confirmation', { contact });
    } catch(err) {
        console.log("Database Error")
    }
});

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);

}); 