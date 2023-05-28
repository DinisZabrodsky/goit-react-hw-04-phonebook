import {  useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import {ContactForm} from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

import cssPhone from "./Phonebook.module.css";

export function App () {


    const [contacts, setContacts] = useState([
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ])

    const [first, setFirst] = useState(true)

    const [filterEl, setFilterEL] = useState('')


    useEffect(() => {
        const localData = localStorage.getItem('localContact')
        if(localData) {
            setContacts(JSON.parse(localData))
        }
    },[])

    useEffect(() => {
        if(!first) {
            localStorage.setItem('localContact', JSON.stringify(contacts))
        } 
    },[contacts, first])

    const addContact = (e) => {
        e.preventDefault()
        const newContact = {
            id: 'id-' + nanoid(5),
            name: e.target.name.value,
            number: e.target.number.value,
        }

        if(contacts.find(contact => contact.name === e.target.name.value)) {
            alert(`${newContact.name} is already in contacts.`)
            return
        }

        setContacts((prev) => ([
            ...prev,
            newContact
        ])) 

        setFirst(false)

        e.currentTarget.reset();
    }

    const onFilter = ({target: {value}}) => {
        setFilterEL(value)
    }

    const getContacts = () => {
        if(filterEl !== "") {
            return contacts.filter((contact) => contact.name.toLowerCase().includes(filterEl.toLowerCase()))
        }
        
    }

    const deleteContact = (e) => {
        if(first) {
            setFirst(false)
        }

        const id = e.target.dataset.id
        setContacts((prev) => {
            return prev.filter((contact) => contact.id !== id)
        })
    }


    return (
        <div className={cssPhone.conteiner}>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact}/>

            <h2>Contacts</h2>
            <Filter onFilter={onFilter} filterValue={filterEl} />

            <ul>
                <ContactList formContacts={contacts} filterValue={filterEl} getContacts={getContacts()} deleteContact={deleteContact}/>
            </ul>
    </div>
    )
}
