import express from 'express';

const app = express();

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

app.get('/admin', (req, res) => {

    res.render('admin', { contacts });
});

app.post('/submit-contact', (req, res) => {

    const contact = req.body;
    contact.timestamp = new Date()

    contacts.push(contact);
    console.log(contacts);

    res.render('confirmation', { contact });
});

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);

}); 