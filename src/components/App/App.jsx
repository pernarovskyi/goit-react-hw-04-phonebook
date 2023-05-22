import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Container, MainTitle, Title } from './App.styled';
import { useLocalStorage } from 'hooks';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [contacts, setContacts] = useLocalStorage('phoneBook', []);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const isNewContact = contacts.some(contact => {
      return contact.name.toLowerCase() === newContact.name.toLowerCase();
    });

    if (isNewContact) {
      notifyContactExist();
      return;
    } else {
      setContacts([...contacts, newContact]);
    }
  };

  const deleteContact = id => {
    setContacts(state => {
      state.filter(contact => contact.id !== id);
    });
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const notifyContactExist = () => toast('Contact aleady exist');

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={formSubmitHandler} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts()}
        onDeleteContact={deleteContact}
      />
      <ToastContainer />
    </Container>
  );
}
