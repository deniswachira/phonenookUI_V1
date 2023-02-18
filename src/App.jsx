
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import './App.css'


function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phonenumber, setPhone] = useState();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get('https://phonebook-api-v1.azurewebsites.net/api').then((response) => {
          setContacts(response.data);
        })

      } catch (err) { }
    }

    fetchContact();

  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://phonebook-api-v1.azurewebsites.net/api/contacts', { name, phonenumber })
      .then(res => {
        setContacts([...contacts, res.data]);
        setName('');
        setPhone('');
      })
      .catch(err => console.error(err));
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://phonebook-api-v1.azurewebsites.net/api/contacts/${_id}`);
      setContacts(contacts.filter(contact => contact._id !== _id));
    } catch (err) {
      console.error(err);
    }

  };
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Phonebook App</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <input style={{ flex: "1", padding: "10px", marginRight: "10px" }} type="text" placeholder="Name" name="name" value={name} onChange={e => setName(e.target.value)} />
        <input style={{ flex: "1", padding: "10px", marginRight: "10px" }} type="text" placeholder="Phone" name="phonenumber" value={phonenumber} onChange={e => setPhone(e.target.value)} />
        <button type="submit" style={{ padding: "10px" }}> Add Contact   </button>
      </form>
      <table style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Phone</th>
            <th style={{ textAlign: "left" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td style={{ textAlign: "left" }}>{contact.name}</td>
              <td style={{ textAlign: "left" }}>{contact.phonenumber}</td>
              <td style={{ textAlign: "left", }}><button style={{ cursor: "pointer" }} id={contact._id} value={contact._id} onClick={() => handleDelete(contact._id)}><FaTrashAlt /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default App;
