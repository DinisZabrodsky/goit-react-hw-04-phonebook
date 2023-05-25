import { Component } from "react";
import { nanoid } from 'nanoid';
import {ContactForm} from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

import cssPhone from "./Phonebook.module.css";

export class App extends Component {
  state = {
    contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
}
componentDidMount = () => {
    const localData = localStorage.getItem('localContact')
  if(localData) {
    this.setState({contacts: JSON.parse(localData)})
  }
}


componentDidUpdate = (prevProps, prevState) => {
  if(prevState.contacts !== this.state.contacts) {
    localStorage.setItem('localContact', JSON.stringify(this.state.contacts))
  }
}


addContact = (e) => {
    e.preventDefault()
    const newContact = {
        id: 'id-' + nanoid(5),
        name: e.target.name.value,
        number: e.target.number.value,
    }

    if(this.state.contacts.find(contact => contact.name === e.target.name.value)) {
        alert(`${newContact.name} is already in contacts.`)
        return
    }

    this.setState((prev) => ({
        name: e.target.name.value,
        number: e.target.number.value,
        contacts: [...prev.contacts, newContact]
        })
    ) 

    e.currentTarget.reset();
}

onFilter = ({target: {value}}) => {
    this.setState({
        filter: value
    })
}

getContacts = () => {
    const {filter, contacts} = this.state
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
}

deleteContact = (e) => {
    const id = e.target.dataset.id
    this.setState((prev) => {
        return{
            contacts: prev.contacts.filter((contact) => contact.id !== id)
        }
    })
}

render() {
    return (
        <div className={cssPhone.conteiner}>
            <h1>Phonebook</h1>
            <ContactForm addContact={this.addContact}/>

            <h2>Contacts</h2>
            <Filter onFilter={this.onFilter} filterValue={this.state.filter} />

            <ul>
                <ContactList formContacts={this.state.contacts} filterValue={this.state.filter} getContacts={this.getContacts()} deleteContact={this.deleteContact}/>
            </ul>
    </div>
    )
  }
};
